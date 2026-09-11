const fs = require('node:fs');
const path = require('node:path');
const { metadata } = require('./metadata.cjs');

module.exports = class DiscoveryReporter {
    onBegin(config, suite) {
        if (config.projects.length > 1 && config.projects.some(project => !project.name)) {
            throw new Error('Multiple Playwright projects must have distinct nonempty names for exact selection');
        }
        if (config.projects.some(project => project.repeatEach !== 1)) {
            throw new Error('Harness scope requires repeatEach=1; use distinct parameter case IDs or native Playwright repetition');
        }
        const checks = [];
        let ungrouped = 0;
        for (const test of suite.allTests()) {
            const meta = metadata(test.title);
            if (!meta) { ungrouped++; continue; }
            checks.push({ ...meta, runner: 'playwright', project: test.parent.project().name,
                file: path.relative(process.cwd(), test.location.file), line: test.location.line,
                title: test.titlePath().slice(3).join(' '), skipped: test.expectedStatus === 'skipped' });
        }
        fs.writeFileSync(process.env.CHECKS_DISCOVERY_FILE, JSON.stringify({ checks, ungrouped }, null, 2));
    }
    onError(error) { console.error(error); process.exitCode = 1; }
};
