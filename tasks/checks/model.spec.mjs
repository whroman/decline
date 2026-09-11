import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCatalog, selectChecks, reconcile, escapeRegex, shellQuote } from './model.mjs';
import metadataModule from './metadata.cjs';

const checks = validateCatalog([
    { runner: 'mocha', project: '', allureId: 'case.a', contracts: ['feature.save'] },
    { runner: 'playwright', project: 'chromium', allureId: 'case.b', contracts: ['feature.save'] },
]);
const ledger = (selected = checks) => ({ run: 'fixture', state: 'completed', catalog: checks, selected,
    suites: [{ state: 'completed', exitCode: 0 }], report: { exitCode: 0 } });
const passed = checks.map(c => ({ checkId: c.id, status: 'passed', start: 2 }));

test('metadata exists without running a body and distinguishes behavior from test identity', () => {
    assert.deepEqual(metadataModule.metadata('test @allure.label.story:feature.save @allure.id:case.a'), {
        contracts: ['feature.save'], allureId: 'case.a',
    });
    assert.throws(() => metadataModule.metadata('test @allure.label.story:feature.save'), /exactly one/);
    assert.throws(() => metadataModule.metadata('test @allure.label.story:Invalid @allure.id:case.a'), /Invalid/);
});

test('unknown contracts, unknown-only runner scope and empty catalogs fail closed', () => {
    assert.throws(() => selectChecks(checks, 'typo', undefined), /Unknown contract/);
    assert.throws(() => selectChecks(checks, 'feature.save', ['node']), /Empty selection/);
    assert.throws(() => selectChecks([], 'all'), /Empty selection/);
});

test('parameter cases must have unique IDs; projects and runners retain separate identities', () => {
    assert.throws(() => validateCatalog([checks[0], checks[0]]), /Duplicate/);
    const variants = validateCatalog([checks[0], { ...checks[0], runner: 'playwright' }, { ...checks[0], project: 'other' },
        { ...checks[0], allureId: 'case.parameter-two' }]);
    assert.equal(new Set(variants.map(c => c.id)).size, 4);
});

test('only all reported passing checks with successful processes verify a whole contract', () => {
    const summary = reconcile(ledger(), passed);
    assert.equal(summary.ok, true);
    assert.equal(summary.contracts[0].verified, true);
});

test('a passing partial selection never verifies the whole contract', () => {
    const summary = reconcile(ledger([checks[0]]), [passed[0]]);
    assert.equal(summary.ok, true);
    assert.equal(summary.contracts[0].verified, false);
    assert.equal(summary.contracts[0].fullSelection, false);
});

test('missing and unexpected results cannot masquerade as success even with equal totals', () => {
    const summary = reconcile(ledger(), [passed[0], { checkId: 'unexpected', status: 'passed' }]);
    assert.equal(summary.ok, false);
    assert.equal(summary.checks[1].status, 'unreported');
    assert.equal(summary.unexpected.length, 1);
});

for (const status of ['failed', 'broken', 'skipped', 'unknown']) {
    test(`${status} remains distinct and does not verify a contract`, () => {
        const summary = reconcile(ledger(), [passed[0], { ...passed[1], status }]);
        assert.equal(summary.checks[1].status, status);
        assert.equal(summary.ok, false);
        assert.equal(summary.contracts[0].verified, false);
    });
}

test('failed processes, interruption and unfinished report generation override passing results', () => {
    for (const change of [{ suites: [{ state: 'completed', exitCode: 1 }] }, { suites: [{ state: 'completed', exitCode: null, signal: 'SIGTERM' }] },
        { state: 'running' }, { state: 'reporting' }, { report: { exitCode: 1 } }]) {
        assert.equal(reconcile({ ...ledger(), ...change }, passed).ok, false);
    }
});

test('retries remain visible and do not turn separate cases into one result', () => {
    const summary = reconcile(ledger(), [...passed, { ...passed[1], start: 1, status: 'failed' }]);
    assert.equal(summary.checks[1].attempts.length, 2);
    assert.equal(summary.checks[1].flaky, true);
    assert.equal(summary.checks[0].attempts.length, 1);
});

test('native command quoting preserves punctuation without shell substitution', () => {
    const title = 'a (b) [c] $d `echo nope`';
    assert.equal(new RegExp(`^${escapeRegex(title)}$`).test(title), true);
    assert.equal(shellQuote("it's $safe"), "'it'\\''s $safe'");
});
