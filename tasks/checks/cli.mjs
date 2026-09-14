import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import output from './output.cjs';
import net from 'node:net';
import { validateCatalog, selectChecks, reconcile, escapeRegex, shellQuote, failureKind } from './model.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
process.chdir(root);
const bin = name => path.join(root, name === 'playwright' ? 'app-e2e/node_modules/.bin' : 'node_modules/.bin', name);
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const write = (file, value) => {
    // Atomic ledger snapshots remain readable after interruption.
    fs.writeFileSync(`${file}.tmp`, JSON.stringify(value, null, 2) + '\n');
    fs.renameSync(`${file}.tmp`, file);
};
const uniqueDir = parent => {
    fs.mkdirSync(parent, { recursive: true });
    return fs.mkdtempSync(path.join(parent, `${new Date().toISOString().replaceAll(':', '-')}-`));
};
const cleanEnv = () => {
    const env = { ...process.env, BABEL_DISABLE_CACHE: '1' };
    // Ambient filtering/output from another run must never narrow or contaminate this run.
    for (const key of Object.keys(env)) {
        if (/^(ALLURE_|CHECKS_|PLAYWRIGHT_(JSON|HTML|OUTPUT))/.test(key)) delete env[key];
    }
    return env;
};

async function execute(command, log, env = cleanEnv()) {
    const stream = fs.createWriteStream(log);
    return new Promise(resolve => {
        let error;
        const child = spawn(command[0], command.slice(1), { cwd: root, env, stdio: ['ignore', 'pipe', 'pipe'] });
        child.stdout.on('data', data => stream.write(data));
        child.stderr.on('data', data => stream.write(data));
        child.on('error', value => { error = value.message; stream.write(error); });
        // A killed coordinator leaves a running ledger; inspect fails closed.
        child.on('close', (exitCode, signal) => stream.end(() => resolve({ exitCode, signal, error })));
    });
}

async function discover() {
    const dir = uniqueDir(path.join(root, '.checks/discovery'));
    const mochaFile = path.join(dir, 'mocha.json');
    const playwrightFile = path.join(dir, 'playwright.json');
    const probes = [
        { command: [process.execPath, 'tasks/checks/discover-mocha.cjs', mochaFile], file: mochaFile, env: cleanEnv() },
        { command: [bin('playwright'), 'test', '--config', 'app-e2e/playwright.config.ts', '--list', '--reporter', './tasks/checks/discover-playwright.cjs'],
            file: playwrightFile, env: { ...cleanEnv(), CHECKS_DISCOVERY_FILE: playwrightFile, CHECKS_SUITE_DIR: path.join(dir, 'playwright') } },
        ...fs.readdirSync('architecture').filter(file => file.endsWith('.spec.mjs')).sort().map(file => ({
            command: [process.execPath, '--test', '--test-name-pattern', '^$', `architecture/${file}`],
            file: path.join(dir, `${file}.json`), env: { ...cleanEnv(), CHECKS_DISCOVERY_FILE: path.join(dir, `${file}.json`) }
        })),
    ];
    const outcomes = await Promise.all(probes.map(async probe => {
        const log = `${probe.file}.log`;
        const result = await execute(probe.command, log, probe.env);
        if (result.exitCode !== 0 || result.error || !fs.existsSync(probe.file)) throw new Error(`Discovery failed; see ${log}`);
        return read(probe.file);
    }));
    return { checks: validateCatalog(outcomes.flatMap(o => o.checks)),
        ungrouped: { mocha: outcomes[0].ungrouped, playwright: outcomes[1].ungrouped, node: outcomes.slice(2).reduce((sum, o) => sum + o.ungrouped, 0) },
        unavailable: ['Storybook/component isolation: no Storybook, stories, or component runner configured'], discovery: path.relative(root, dir) };
}

function nativeCommand(checks) {
    const check = checks[0];
    if (check.runner === 'mocha') return [bin('mocha'), '--no-config', '--require', 'babel-register', '--forbid-only',
        '--reporter', 'allure-mocha', ...new Set(checks.map(c => c.file))];
    if (check.runner === 'playwright') return [bin('playwright'), 'test', '--config', 'app-e2e/playwright.config.ts',
        ...new Set(checks.map(c => c.file)), ...(check.project ? ['--project', check.project] : [])];
    return [process.execPath, '--test', '--test-name-pattern', `^(?:${checks.map(c => escapeRegex(c.title)).join('|')})$`,
        '--test-reporter', 'spec', '--test-reporter-destination', 'stdout',
        '--test-reporter', 'allure-node-test/reporter', '--test-reporter-destination', 'stdout', ...new Set(checks.map(c => c.file))];
}

function reproduction(check) {
    if (check.runner === 'node') return ['node', '--test', '--test-name-pattern', `^${escapeRegex(check.title)}$`, check.file].map(shellQuote).join(' ');
    const command = check.runner === 'mocha'
        ? ['pnpm', 'exec', 'mocha', '--no-config', '--require', 'babel-register', '--forbid-only', check.file, '--grep', `^${escapeRegex(check.title)}$`]
        : ['pnpm', '--filter', '@decline/web-e2e', 'exec', 'playwright', 'test',
            path.relative('app-e2e', check.file), '--grep', escapeRegex(check.title) + '$', ...(check.project ? ['--project', check.project] : [])];
    return `BABEL_DISABLE_CACHE=1 ${command.map(shellQuote).join(' ')}`;
}

function readResults(dir, ledger) {
    const results = [];
    for (const suite of ledger.suites.filter(s => s.checkIds)) {
        const resultsDir = path.join(dir, suite.dir, 'allure-results');
        if (!fs.existsSync(resultsDir)) continue;
        for (const file of fs.readdirSync(resultsDir).filter(f => f.endsWith('-result.json'))) {
            let result;
            try { result = read(path.join(resultsDir, file)); }
            catch (error) {
                results.push({ status: 'broken', kind: 'result-error', statusDetails: { message: error.message }, result: `${suite.dir}/allure-results/${file}` });
                continue;
            }
            const allureId = result.labels?.find(l => l.name === 'ALLURE_ID')?.value;
            const checkId = suite.checkIds.find(id => ledger.selected.find(c => c.id === id)?.allureId === allureId);
            const attachments = [];
            const visit = item => {
                for (const a of item.attachments ?? []) attachments.push({ ...a, path: `${suite.dir}/allure-results/${a.source}`,
                    exists: fs.existsSync(path.join(resultsDir, a.source)) });
                for (const step of item.steps ?? []) visit(step);
            };
            visit(result);
            results.push({ checkId, status: result.status, uuid: result.uuid, start: result.start, stop: result.stop,
                kind: failureKind(result, ledger.selected.find(c => c.id === checkId)?.runner),
                name: result.name, fullName: result.fullName, parameters: result.parameters, statusDetails: result.statusDetails,
                attachments, result: `${suite.dir}/allure-results/${file}` });
        }
    }
    return results;
}

function inspect(dir) {
    const ledger = read(path.join(dir, 'run.json'));
    const summary = reconcile(ledger, readResults(dir, ledger));
    summary.runDirectory = dir;
    summary.suites = ledger.suites;
    for (const check of summary.checks) check.reproduce = reproduction(check);
    write(path.join(dir, 'summary.json'), summary);
    return summary;
}

async function freePort() {
    const server = net.createServer();
    await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
    const port = server.address().port;
    await new Promise(resolve => server.close(resolve));
    return port;
}

async function run(catalog, selected, scope) {
    const dir = uniqueDir(path.join(root, '.checks/runs'));
    const ledger = { schemaVersion: 1, run: path.basename(dir), state: 'running', started: new Date().toISOString(),
        source: output.sourceInfo(),
        scope, catalog: catalog.checks, selected, suites: [],
        artifacts: { ledger: 'run.json', summary: 'summary.json', agent: 'agent/index.md', humanReport: 'agent/awesome/index.html' } };
    const save = () => write(path.join(dir, 'run.json'), ledger);
    save();
    console.log(`Run: ${path.relative(root, dir)}`);
    const executeSuite = async (suite, env) => {
        fs.mkdirSync(path.join(dir, suite.dir), { recursive: true });
        suite.state = 'running';
        suite.log = `${suite.dir}/process.log`;
        ledger.suites.push(suite);
        save();
        console.log(`Running ${suite.name} (${suite.checkIds?.length ?? 'prerequisite'} checks)`);
        Object.assign(suite, await execute(suite.command, path.join(dir, suite.log), env), { state: 'completed' });
        save();
        console.log(`${suite.name}: exit ${suite.exitCode}; ${path.relative(root, path.join(dir, suite.log))}`);
        return suite.exitCode === 0 && !suite.error && !suite.signal;
    };
    const groups = Map.groupBy(selected, c => `${c.runner}:${c.project}`);
    // Each independent suite still runs after a previous suite fails.
    let index = 0;
    let browserBuild;
    for (const [name, checks] of groups) {
        const suiteDir = `suite-${index++}-${checks[0].runner}`;
        try {
            const absolute = path.join(dir, suiteDir);
            fs.mkdirSync(path.join(absolute, 'allure-results'), { recursive: true });
            const plan = path.join(absolute, 'testplan.json');
            write(plan, { version: '1.0', tests: checks.map(c => ({ id: c.allureId })) });
            const env = { ...cleanEnv(), CHECKS_SUITE_DIR: absolute, ALLURE_RESULTS_DIR: path.join(absolute, 'allure-results') };
            if (checks[0].runner === 'playwright' && env.BASE_URL !== undefined && !env.BASE_URL.trim()) {
                throw new Error('BASE_URL is set but empty; provide a deployment URL or unset it for local execution');
            }
            // Node 22 uses its native name filter; its reporter does not need the Node 26 runtime preload.
            if (checks[0].runner !== 'node') env.ALLURE_TESTPLAN_PATH = plan;
            if (checks[0].runner === 'playwright' && !env.BASE_URL) {
                const dist = path.join(dir, 'browser-build');
                if (browserBuild === undefined) browserBuild = await executeSuite({ name: 'browser-build', dir: 'build',
                    command: [bin('vite'), 'build', '--outDir', dist] }, cleanEnv());
                if (!browserBuild) {
                    ledger.suites.push({ name, dir: suiteDir, checkIds: checks.map(c => c.id), state: 'blocked', error: 'Browser build failed' });
                    save();
                    continue;
                }
                const port = await freePort();
                env.CHECKS_BASE_URL = `http://127.0.0.1:${port}`;
                env.CHECKS_PREVIEW_COMMAND = [bin('vite'), 'preview', '--outDir', dist, '--host', '127.0.0.1', '--port', String(port)].map(shellQuote).join(' ');
            }
            const command = nativeCommand(checks);
            if (checks[0].runner === 'mocha') command.push('--reporter-option', `resultsDir=${env.ALLURE_RESULTS_DIR}`, '--reporter-option', 'extraReporters=spec');
            await executeSuite({ name, dir: suiteDir, checkIds: checks.map(c => c.id), command,
                testplan: checks[0].runner === 'node' ? undefined : `${suiteDir}/testplan.json`, baseURL: env.BASE_URL || env.CHECKS_BASE_URL }, env);
        } catch (error) {
            ledger.suites.push({ name, dir: suiteDir, checkIds: checks.map(c => c.id), state: 'blocked', error: error.stack });
            save();
        }
    }
    ledger.state = 'reporting';
    save();
    // Allure supplies consolidated evidence, query, and the human report. The ledger adds execution completeness.
    const resultsDirs = ledger.suites.filter(s => s.checkIds).map(s => path.join(dir, s.dir, 'allure-results'));
    ledger.report = await execute([bin('allure'), 'agent', 'inspect', ...resultsDirs, '--output', path.join(dir, 'agent'),
        '--report', 'awesome', '--expect-tests', String(selected.length)], path.join(dir, 'agent.log'),
        { ...cleanEnv(), ALLURE_AGENT_STATE_DIR: path.join(dir, 'agent-state') });
    ledger.state = 'completed';
    ledger.finished = new Date().toISOString();
    save();
    const summary = inspect(dir);
    console.log(JSON.stringify({ run: path.relative(root, dir), ok: summary.ok, complete: summary.complete, contracts: summary.contracts,
        counts: Object.fromEntries(['passed', 'failed', 'broken', 'skipped', 'unreported'].map(s => [s, summary.checks.filter(c => c.status === s).length])),
        summary: path.relative(root, path.join(dir, 'summary.json')), agent: path.relative(root, path.join(dir, 'agent/index.md')) }, null, 2));
    return summary.ok && ledger.report.exitCode === 0 ? 0 : 1;
}

async function main() {
    const [command, target, ...rest] = process.argv.slice(2);
    if (command === '--help') {
        console.log('checks list\nchecks run CONTRACT|all [--runner mocha,playwright,node]\nchecks inspect RUN_DIRECTORY [CHECK_ID]\nchecks inspect AGENT_DIRECTORY [ALLURE_TEST_ID]\nchecks rerun RUN_DIRECTORY CHECK_ID\nchecks agent ...  (native Allure Agent commands, including query and select)');
        return 0;
    }
    if (command === 'agent') return spawnSync(bin('allure'), ['agent', ...process.argv.slice(3)], { stdio: 'inherit' }).status ?? 1;
    if (command === 'inspect') {
        if (!target || rest.length > 1) throw new Error('Usage: checks inspect RUN_DIRECTORY [CHECK_ID]');
        const nativeManifest = path.join(path.resolve(target), 'manifest/run.json');
        if (fs.existsSync(nativeManifest)) {
            const result = spawnSync(bin('allure'), ['agent', 'query', '--from', path.resolve(target),
                ...(rest[0] ? ['test', '--test', rest[0], '--include-markdown'] : ['summary'])], { stdio: 'inherit' });
            const run = read(nativeManifest);
            const stats = run.summary.stats;
            return result.status || (run.phase === 'done' && run.actual_exit_code === 0 && stats.total > 0 && stats.passed === stats.total ? 0 : 1);
        }
        const summary = inspect(path.resolve(target));
        if (rest[0]) {
            const check = summary.checks.find(c => c.id === rest[0]);
            if (!check) throw new Error(`Unknown check: ${rest[0]}`);
            console.log(JSON.stringify(check, null, 2));
        } else console.log(JSON.stringify({ ...summary, checks: summary.checks.map(c => ({ ...c, attempts: c.status === 'passed' && !c.flaky ? c.attempts.map(a => ({ status: a.status, result: a.result })) : c.attempts })) }, null, 2));
        return summary.ok ? 0 : 1;
    }
    if (!['list', 'run', 'rerun'].includes(command)) throw new Error('Usage: pnpm checks list | run CONTRACT|all [--runner mocha,playwright,node] | inspect RUN [CHECK_ID] | rerun RUN CHECK_ID');
    if (command === 'list' && (target || rest.length)) throw new Error('Usage: checks list');
    const catalog = await discover();
    if (command === 'list') {
        console.log(JSON.stringify({ ...catalog, contracts: [...new Set(catalog.checks.flatMap(c => c.contracts))].sort() }, null, 2));
        return 0;
    }
    if (command === 'rerun') {
        if (!target || rest.length !== 1) throw new Error('Usage: checks rerun RUN_DIRECTORY CHECK_ID');
        const previous = read(path.join(path.resolve(target), 'run.json'));
        if (!previous.selected.some(c => c.id === rest[0])) throw new Error(`Check was not selected in original run: ${rest[0]}`);
        const check = catalog.checks.find(c => c.id === rest[0]);
        if (!check) throw new Error('Check no longer exists in the current catalog');
        return run(catalog, [check], { rerunOf: path.resolve(target), check: check.id, partial: true });
    }
    if (!target || (rest.length && (rest.length !== 2 || rest[0] !== '--runner'))) throw new Error('Usage: checks run CONTRACT|all [--runner mocha,playwright,node]');
    const runners = rest[1]?.split(',');
    if (runners?.some(r => !['mocha', 'playwright', 'node'].includes(r))) throw new Error(`Unknown runner: ${rest[1]}`);
    return run(catalog, selectChecks(catalog.checks, target, runners), { contract: target, runners: runners ?? ['mocha', 'playwright', 'node'] });
}

main().then(code => { process.exitCode = code; }).catch(error => { console.error(error.stack); process.exitCode = 2; });
