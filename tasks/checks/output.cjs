const { mkdirSync, mkdtempSync, readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '../..');

exports.sourceInfo = () => {
    const git = args => {
        const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
        if (result.status !== 0) throw new Error(`Cannot record source: ${result.stderr}`);
        return result.stdout.trim();
    };
    const status = git(['status', '--porcelain=v1']);
    return { revision: git(['rev-parse', 'HEAD']), dirty: !!status, status, node: process.version,
        packageManager: JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')).packageManager,
        lockHash: createHash('sha256').update(readFileSync(path.join(root, 'pnpm-lock.yaml'))).digest('hex') };
};

exports.nativeOutput = (runner) => {
    const parent = path.resolve(__dirname, '../..', process.env.CHECKS_NATIVE_ROOT || '.checks/native');
    mkdirSync(parent, { recursive: true });
    const dir = mkdtempSync(path.join(parent, `${runner}-`));
    const source = exports.sourceInfo();
    writeFileSync(path.join(dir, 'source.json'), JSON.stringify(source, null, 2) + '\n');
    mkdirSync(path.join(dir, 'allure-results'));
    writeFileSync(path.join(dir, 'allure-results/environment.properties'),
        Object.entries(source).filter(([key]) => key !== 'status').map(([key, value]) => `${key}=${value}`).join('\n'));
    return dir;
};
