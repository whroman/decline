const fs = require('node:fs');
const path = require('node:path');
const Mocha = require('mocha');
const { mochaChecks } = require('./metadata.cjs');
require('babel-register');

const mocha = new Mocha({ forbidOnly: true });
function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) visit(file);
        else if (entry.name.endsWith('.spec.js')) mocha.addFile(file);
    }
}
['app', 'generator', 'tables'].forEach(visit);
// Registration only: no tests or hooks are run, including skipped tests.
mocha.loadFiles();
fs.writeFileSync(process.argv[2], JSON.stringify(mochaChecks(mocha.suite), null, 2));
