import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { validateCatalog, reconcile, failureKind } from './model.mjs';
import Mocha from 'mocha';
import metadataModule from './metadata.cjs';
import { createRequire } from 'node:module';

const root = process.cwd();
const base = path.join(root, '.checks/adapter-tests');
fs.mkdirSync(base, { recursive: true });
const browserRequire = createRequire(path.join(root, 'app-e2e/package.json'));
const bin = name => path.join(root, name === 'playwright' ? 'app-e2e/node_modules/.bin' : 'node_modules/.bin', name);
const results = dir => fs.readdirSync(dir).filter(f => f.endsWith('-result.json')).map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
const id = result => result.labels.find(l => l.name === 'ALLURE_ID')?.value;
const env = extra => {
    const value = { ...process.env };
    for (const key of Object.keys(value)) if (/^(ALLURE_|CHECKS_|NODE_TEST_CONTEXT)/.test(key)) delete value[key];
    return { ...value, ...extra };
};
function invoke(command, args, extra) {
    return spawnSync(command, args, { cwd: root, env: env(extra), encoding: 'utf8', timeout: 30_000 });
}

test('real Mocha test plans retain skipped/setup-failed membership and parameter cases', () => {
    const dir = fs.mkdtempSync(path.join(base, 'mocha-'));
    const file = path.join(dir, 'fixture.cjs');
    const resultDir = path.join(dir, 'results');
    const plan = path.join(dir, 'testplan.json');
    const ids = ['parameter.1', 'parameter.2', 'skip', 'setup'];
    fs.writeFileSync(plan, JSON.stringify({ version: '1.0', tests: ids.map(id => ({ id })) }));
    fs.writeFileSync(file, `
      const assert = require('node:assert/strict');
      for (const value of [1, 2]) it('parameter ' + value + ' @allure.label.story:fixture @allure.id:parameter.' + value, () => assert.ok(value > 0));
      it.skip('skip @allure.label.story:fixture @allure.id:skip', () => { throw Error('skipped body ran'); });
      describe('setup group', () => {
        beforeEach(() => { throw Error('deliberate setup failure'); });
        it('setup @allure.label.story:fixture @allure.id:setup', () => { throw Error('body must not run'); });
      });
      it('excluded @allure.label.story:fixture @allure.id:excluded', () => { throw Error('test plan leaked'); });
    `);
    const mocha = new Mocha();
    mocha.addFile(file);
    mocha.loadFiles();
    const catalog = validateCatalog(metadataModule.mochaChecks(mocha.suite).checks);
    assert.equal(catalog.length, 5);
    assert.equal(catalog.find(c => c.allureId === 'skip').skipped, true);
    const outcome = invoke(bin('mocha'), ['--no-config', '--reporter', 'allure-mocha', '--reporter-option', `resultsDir=${resultDir}`, file], { ALLURE_TESTPLAN_PATH: plan });
    assert.equal(outcome.status, 1, outcome.stdout + outcome.stderr);
    const actual = results(resultDir);
    // Allure Mocha 3.12.1 emits a hook container but no result for this beforeEach failure.
    // Require the ledger to expose the missing check; never synthesize a passing/skipped result.
    assert.deepEqual(actual.map(id).sort(), ['parameter.1', 'parameter.2', 'skip']);
    assert.equal(actual.find(r => id(r) === 'skip').status, 'skipped');
    const summary = reconcile({ state: 'completed', catalog, selected: catalog.filter(c => ids.includes(c.allureId)),
        suites: [{ state: 'completed', exitCode: outcome.status }] }, actual.map(r => ({ ...r, checkId: catalog.find(c => c.allureId === id(r)).id })));
    assert.equal(summary.checks.find(c => c.allureId === 'setup').status, 'unreported');
    assert.equal(summary.ok, false);
    assert.equal(summary.contracts[0].verified, false);
    const hooks = fs.readdirSync(resultDir).filter(f => f.endsWith('-container.json')).map(f => fs.readFileSync(path.join(resultDir, f), 'utf8')).join('\n');
    assert.match(hooks, /deliberate setup failure/);
});

test('real Playwright discovery and plans preserve project/case identity before skipped or failed setup', () => {
    const dir = fs.mkdtempSync(path.join(base, 'playwright-'));
    const config = path.join(dir, 'playwright.config.cjs');
    const discovery = path.join(dir, 'discovery.json');
    const plan = path.join(dir, 'testplan.json');
    fs.writeFileSync(config, `module.exports = { testDir: '.', projects: [{name:'alpha'}, {name:'beta'}],
      reporter: [[${JSON.stringify(browserRequire.resolve('allure-playwright'))}, {resultsDir: process.env.ALLURE_RESULTS_DIR}]] };`);
    fs.writeFileSync(path.join(dir, 'fixture.spec.cjs'), `
      const {test, expect} = require(${JSON.stringify(browserRequire.resolve('@playwright/test'))});
      for (const value of [1, 2]) test('parameter ' + value + ' @allure.label.story:fixture @allure.id:parameter.' + value, () => expect(value).toBeGreaterThan(0));
      test.skip('skip @allure.label.story:fixture @allure.id:skip', () => { throw Error('skipped body ran'); });
      test.describe('setup group', () => {
        test.beforeEach(() => { throw Error('deliberate setup failure'); });
        test('setup @allure.label.story:fixture @allure.id:setup', () => { throw Error('body must not run'); });
      });
      test('excluded @allure.label.story:fixture @allure.id:excluded', () => { throw Error('test plan leaked'); });
    `);
    let outcome = invoke(bin('playwright'), ['test', '--config', config, '--list', '--reporter', './tasks/checks/discover-playwright.cjs'], { CHECKS_DISCOVERY_FILE: discovery });
    assert.equal(outcome.status, 0, outcome.stdout + outcome.stderr);
    const catalog = validateCatalog(JSON.parse(fs.readFileSync(discovery, 'utf8')).checks);
    assert.equal(catalog.length, 10);
    assert.equal(new Set(catalog.map(c => c.id)).size, 10);
    assert.equal(catalog.filter(c => c.skipped).length, 2);
    const ids = ['parameter.1', 'parameter.2', 'skip', 'setup'];
    fs.writeFileSync(plan, JSON.stringify({ version: '1.0', tests: ids.map(id => ({ id })) }));
    for (const project of ['alpha', 'beta']) {
        const resultDir = path.join(dir, project);
        outcome = invoke(bin('playwright'), ['test', '--config', config, path.join(dir, 'fixture.spec.cjs'), '--project', project],
            { ALLURE_TESTPLAN_PATH: plan, ALLURE_RESULTS_DIR: resultDir });
        assert.equal(outcome.status, 1, outcome.stdout + outcome.stderr);
        const actual = results(resultDir);
        assert.deepEqual(actual.map(id).sort(), ids.sort());
        assert.equal(actual.find(r => id(r) === 'skip').status, 'skipped');
        assert.match(actual.find(r => id(r) === 'setup').statusDetails.message, /deliberate setup failure/);
        assert.equal(failureKind(actual.find(r => id(r) === 'setup'), 'playwright'), 'setup-error');
        assert.equal(actual.every(r => r.parameters.some(p => p.name === 'Project' && p.value === project)), true);
    }
});

test('delivery specifications are discovered and reported individually by the native Node runner', () => {
    const dir = fs.mkdtempSync(path.join(base, 'node-'));
    const discovery = path.join(dir, 'discovery.json');
    let outcome = invoke(process.execPath, ['--test', '--test-name-pattern', '^$', 'architecture/frontend-delivery.spec.mjs'],
        { CHECKS_DISCOVERY_FILE: discovery });
    assert.equal(outcome.status, 0, outcome.stdout + outcome.stderr);
    const catalog = validateCatalog(JSON.parse(fs.readFileSync(discovery, 'utf8')).checks);
    assert.ok(catalog.length > 1);
    assert.equal(catalog.every(c => c.contracts.includes('web.delivery')), true);
    outcome = invoke(process.execPath, ['--test', '--test-reporter', 'allure-node-test/reporter',
        'architecture/frontend-delivery.spec.mjs'], { ALLURE_RESULTS_DIR: dir });
    assert.equal(outcome.status, 0, outcome.stdout + outcome.stderr);
    const actual = results(dir);
    assert.deepEqual(actual.map(id).sort(), catalog.map(c => c.allureId).sort());
    assert.equal(actual.every(r => r.status === 'passed'), true);
});
