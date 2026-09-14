export function validateCatalog(checks) {
    const seen = new Set();
    return checks.map(check => {
        const id = `${check.runner}:${check.project || 'default'}:${check.allureId}`;
        if (seen.has(id)) throw new Error(`Duplicate check identity ${id}; parameterized cases need distinct @allure.id values`);
        seen.add(id);
        return { ...check, id };
    });
}

export function selectChecks(catalog, contract, runners) {
    if (contract !== 'all' && !catalog.some(c => c.contracts.includes(contract))) throw new Error(`Unknown contract: ${contract}`);
    const checks = catalog.filter(c => (contract === 'all' || c.contracts.includes(contract)) && (!runners || runners.includes(c.runner)));
    if (!checks.length) throw new Error('Empty selection: no checks match this contract and runner scope');
    return checks;
}

export function reconcile(ledger, results) {
    const unexpected = results.filter(r => !ledger.selected.some(c => c.id === r.checkId));
    const checks = ledger.selected.map(check => {
        const attempts = results.filter(r => r.checkId === check.id).sort((a, b) => (a.start ?? 0) - (b.start ?? 0) || (a.stop ?? 0) - (b.stop ?? 0));
        const status = attempts.at(-1)?.status ?? 'unreported';
        return { ...check, status, flaky: status === 'passed' && attempts.some(a => ['failed', 'broken'].includes(a.status)), attempts };
    });
    const processErrors = ledger.suites.filter(s => s.state !== 'completed' || s.exitCode !== 0 || s.signal || s.error);
    const reportingError = ledger.report && (ledger.report.exitCode !== 0 || ledger.report.signal || ledger.report.error);
    const complete = ledger.state === 'completed' && !unexpected.length && !processErrors.length && checks.every(c => c.status !== 'unreported');
    const contracts = [...new Set(ledger.selected.flatMap(c => c.contracts))].map(id => {
        const expected = ledger.catalog.filter(c => c.contracts.includes(id));
        const selected = checks.filter(c => c.contracts.includes(id));
        const fullSelection = expected.every(c => selected.some(s => c.id === s.id));
        return { id, expected: expected.length, selected: selected.length, fullSelection,
            verified: complete && !reportingError && fullSelection && selected.every(c => c.status === 'passed') };
    });
    const ok = complete && !reportingError && checks.length > 0 && checks.every(c => c.status === 'passed');
    return { schemaVersion: 1, run: ledger.run, state: ledger.state, source: ledger.source,
        scope: ledger.scope, complete, ok, contracts, checks, processErrors, unexpected,
        artifacts: ledger.artifacts, report: ledger.report };
}

export const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const shellQuote = value => `'${value.replaceAll("'", "'\\''")}'`;

export function failureKind(result, runner) {
    const failed = value => ['failed', 'broken'].includes(value.status);
    if (!failed(result)) return result.status;
    if (result.steps?.some(s => s.name === 'Before Hooks' && failed(s))) return 'setup-error';
    if (result.steps?.some(s => s.name === 'After Hooks' && failed(s))) return 'teardown-error';
    if (result.status === 'broken') return 'test-error';
    if (runner !== 'playwright' || /AssertionError|expect\(/.test(result.statusDetails?.message ?? '')) return 'assertion-failure';
    return 'test-failure';
}
