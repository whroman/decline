import assert from 'node:assert/strict';
import { testsFor } from '../tasks/checks/node-test.mjs';
import { checkImportCasing } from '../tasks/checkImportCasing.mjs';

const test = testsFor(import.meta.url, 'web.imports');

test('local imports resolve with exact filename casing @allure.id:delivery.import-casing', () => {
    assert.deepEqual(checkImportCasing(), []);
});
