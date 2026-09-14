import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const pnpm = process.env.PNPM_BINARY || 'pnpm';
const shellPnpm = path.isAbsolute(pnpm) && fs.readFileSync(pnpm, 'utf8').includes('Shebang-less on purpose');
const pnpmCommand = shellPnpm ? '/bin/sh' : pnpm;
const pnpmPrefix = shellPnpm ? [pnpm] : [];
const pnpmEnvironment = environment => path.isAbsolute(pnpm)
    ? { ...environment, PATH: `${path.dirname(pnpm)}:${environment.PATH}` }
    : environment;

test('pnpm starts both lint watchers concurrently', () => {
    const root = process.cwd();
    const parent = path.join(root, '.checks/agent-tests');
    fs.mkdirSync(parent, { recursive: true });
    const dir = fs.mkdtempSync(path.join(parent, 'watch-'));
    fs.writeFileSync(path.join(dir, 'pnpm-workspace.yaml'), 'packages: []\n');
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ private: true, scripts: {
        'lint:watch': JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).scripts['lint:watch'],
        'lint:watch:client': 'node watcher.mjs client specs',
        'lint:watch:specs': 'node watcher.mjs specs client',
    } }));
    fs.writeFileSync(path.join(dir, 'watcher.mjs'), `
        import fs from 'node:fs';
        fs.writeFileSync(process.argv[2], 'started');
        const start = Date.now();
        const timer = setInterval(() => {
            if (fs.existsSync(process.argv[3])) clearInterval(timer);
            else if (Date.now() - start > 5000) process.exit(1);
        }, 20);
    `);
    const outcome = spawnSync(pnpmCommand, [...pnpmPrefix, '--dir', dir, 'run', 'lint:watch'],
        { cwd: root, env: pnpmEnvironment(process.env), encoding: 'utf8', timeout: 15_000 });
    assert.equal(outcome.status, 0, outcome.stdout + outcome.stderr);
});

test('native artifact paths are unique and repository-relative even from the browser workspace', () => {
    const root = process.cwd();
    const outcome = spawnSync(process.execPath, ['-e', `
        const {nativeOutput} = require('../tasks/checks/output.cjs');
        console.log(JSON.stringify([nativeOutput('playwright'), nativeOutput('playwright')]));
    `], { cwd: path.join(root, 'app-e2e'), env: { ...process.env, CHECKS_NATIVE_ROOT: '.checks/path-tests' }, encoding: 'utf8' });
    assert.equal(outcome.status, 0, outcome.stderr);
    const paths = JSON.parse(outcome.stdout);
    assert.notEqual(paths[0], paths[1]);
    assert.ok(paths.every(file => path.dirname(file) === path.join(root, '.checks/path-tests')));
    const source = JSON.parse(fs.readFileSync(path.join(paths[0], 'source.json'), 'utf8'));
    assert.match(source.revision, /^[a-f0-9]{40}$/);
    assert.equal(typeof source.dirty, 'boolean');
    assert.equal(source.packageManager, JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).packageManager);
});

test('CI Agent Mode preserves independent failures and isolates consecutive native runs', () => {
    const root = process.cwd();
    const parent = path.join(root, '.checks/agent-tests');
    fs.mkdirSync(parent, { recursive: true });
    const dir = fs.mkdtempSync(path.join(parent, 'ci-'));
    const reporter = path.join(root, 'tasks/checks/node-reporter.mjs');
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ private: true, scripts: {
        verify: JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).scripts.verify,
        'architecture:check': `node --test --test-reporter ${JSON.stringify(reporter)} first.test.mjs`,
        test: `node --test --test-reporter ${JSON.stringify(reporter)} second.test.mjs`,
        'test:harness': 'node -e "console.log(\'third independent script ran\')"',
    } }));
    fs.writeFileSync(path.join(dir, 'first.test.mjs'), `
        import test from 'node:test';
        import assert from 'node:assert/strict';
        test('first @allure.id:fixture.first', () => assert.ok(process.env.FIXTURE_RESTORED, 'deliberate CI assertion failure'));
    `);
    fs.writeFileSync(path.join(dir, 'second.test.mjs'), `
        import test from 'node:test';
        test('second @allure.id:fixture.second', () => {});
    `);
    const cleanEnv = { ...process.env };
    for (const key of Object.keys(cleanEnv)) if (/^(ALLURE_|CHECKS_|NODE_TEST_CONTEXT)/.test(key)) delete cleanEnv[key];
    for (const restored of [false, true]) {
        const run = fs.mkdtempSync(path.join(dir, 'run-'));
        const resultsRoot = path.join(run, 'native');
        const outcome = spawnSync(path.join(root, 'node_modules/.bin/allure'), [
            'agent', '--results-dir', `${resultsRoot}/*/allure-results`, '--output', path.join(run, 'agent'), '--report', 'off',
            '--', pnpmCommand, ...pnpmPrefix, '--dir', dir, 'run', 'verify',
        ], { cwd: root, env: pnpmEnvironment({ ...cleanEnv, CHECKS_NATIVE_ROOT: resultsRoot,
            ALLURE_AGENT_STATE_DIR: path.join(run, 'state'), FIXTURE_RESTORED: restored ? '1' : '' },
        ), encoding: 'utf8', timeout: 30_000 });
        assert.equal(outcome.status, restored ? 0 : 1, outcome.stdout + outcome.stderr);
        const runData = JSON.parse(fs.readFileSync(path.join(run, 'agent/manifest/run.json'), 'utf8'));
        assert.equal(runData.actual_exit_code, restored ? 0 : 1);
        assert.match(fs.readFileSync(path.join(run, 'agent', runData.paths.process_logs.stdout), 'utf8'), /third independent script ran/);
        const nativeDirs = fs.readdirSync(resultsRoot);
        assert.equal(nativeDirs.length, 2, 'both independent scripts must execute');
        const results = nativeDirs.flatMap(name => {
            const source = path.join(resultsRoot, name, 'allure-results');
            return fs.readdirSync(source).filter(file => file.endsWith('-result.json'))
                .map(file => JSON.parse(fs.readFileSync(path.join(source, file), 'utf8')));
        });
        assert.deepEqual(results.map(result => result.status).sort(), restored ? ['passed', 'passed'] : ['failed', 'passed']);
        const manifest = fs.readFileSync(path.join(run, 'agent/manifest/tests.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
        assert.equal(manifest.length, 2, 'no stale or nested fixture results may enter the report');
        assert.equal(manifest.every(result => result.retries === 0), true);
        if (!restored) assert.match(results.find(result => result.status === 'failed').statusDetails.message, /deliberate CI assertion failure/);
        const inspected = spawnSync(process.execPath, [path.join(root, 'tasks/checks/cli.mjs'), 'inspect', path.join(run, 'agent')],
            { cwd: root, env: cleanEnv, encoding: 'utf8', timeout: 10_000 });
        assert.equal(inspected.status, restored ? 0 : 1, inspected.stdout + inspected.stderr);
    }
});
