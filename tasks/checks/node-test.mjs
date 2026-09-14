import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import metadata from './metadata.cjs';

const discoveryFile = process.env.CHECKS_DISCOVERY_FILE;
const checks = [];
if (discoveryFile) process.once('beforeExit', () => {
    fs.writeFileSync(discoveryFile, JSON.stringify({ checks, ungrouped: 0 }));
});

// Register the same declarations for discovery and the native Node runner.
export function testsFor(fileURL, contract) {
    const file = path.relative(process.cwd(), fileURLToPath(fileURL));
    return (name, body) => {
        const title = `${name} @allure.label.story:${contract}`;
        const entry = metadata.metadata(title);
        if (discoveryFile) checks.push({ ...entry, runner: 'node', project: '', file, title });
        else return test(title, body);
    };
}
