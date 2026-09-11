const { mkdirSync, mkdtempSync } = require('node:fs');
const path = require('node:path');

exports.nativeOutput = (runner) => {
    const parent = path.resolve(__dirname, '../../.checks/native');
    mkdirSync(parent, { recursive: true });
    return mkdtempSync(path.join(parent, `${runner}-`));
};
