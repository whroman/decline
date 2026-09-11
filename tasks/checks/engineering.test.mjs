import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { engineering, engineeringTitle } from './engineering.mjs';

for (const check of engineering) {
    test(engineeringTitle(check), () => {
        const env = { ...process.env };
        // Node uses this to suppress recursive test discovery. This is an independent native command.
        delete env.NODE_TEST_CONTEXT;
        const result = spawnSync(check.command[0], check.command.slice(1), { env, encoding: 'utf8', timeout: 120_000 });
        // The Node Allure reporter attaches stdout/stderr, including native subtest failures.
        if (result.stdout) console.log(result.stdout);
        if (result.stderr) console.error(result.stderr);
        if (result.error) throw result.error;
        if (result.signal) throw new Error(`Command terminated by ${result.signal}`);
        assert.equal(result.status, 0, `${check.command.join(' ')} exited ${result.status}`);
    });
}
