// Static Allure metadata: story identifies behavior; id identifies one test case.
exports.metadata = (title) => {
    const contracts = [...title.matchAll(/@allure\.label\.story:([^\s]+)/g)].map(m => m[1]);
    const ids = [...title.matchAll(/@allure\.id:([^\s]+)/g)].map(m => m[1]);
    if (!contracts.length) return null;
    if (ids.length !== 1) throw new Error(`Contract check needs exactly one @allure.id: ${title}`);
    for (const value of [...contracts, ...ids]) {
        if (!/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(value)) throw new Error(`Invalid metadata ID: ${value}`);
    }
    return { contracts: [...new Set(contracts)], allureId: ids[0] };
};

exports.mochaChecks = suite => {
    if (suite.hasOnly()) throw new Error('Focused Mocha tests would omit checks');
    const checks = [];
    let ungrouped = 0;
    suite.eachTest(test => {
        const meta = exports.metadata(test.title);
        if (!meta) { ungrouped++; return; }
        checks.push({ ...meta, runner: 'mocha', project: '', file: require('node:path').relative(process.cwd(), test.file),
            title: test.fullTitle(), skipped: Boolean(test.isPending()) });
    });
    return { checks, ungrouped };
};
