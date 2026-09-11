import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import jsoncParser from 'jsonc-parser';
import { parse as parseYaml } from 'yaml';

import viteConfigDefinition from '../vite.config.mjs';

/*
    This file is the normative frontend delivery contract.
    Change its expectations only when the desired architecture changes, never merely to make an implementation change pass.
*/

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const previewWorkflow = readYaml('.github/workflows/web-preview.yaml');
const releaseWorkflow = readYaml('.github/workflows/web-release.yaml');
const wranglerConfig = readJsonc('wrangler.jsonc');
const viteConfig = viteConfigDefinition({ command: 'build', mode: 'production' });

function read(relativePath) {
    return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
}

function readYaml(relativePath) {
    return parseYaml(read(relativePath));
}

function readJsonc(relativePath) {
    const parseErrors = [];
    const value = jsoncParser.parse(read(relativePath), parseErrors, {
        allowTrailingComma: true
    });

    assert.deepEqual(parseErrors, [], `${relativePath} must contain valid JSONC`);
    return value;
}

function normalizeNeeds(needs) {
    if (!needs) return [];
    return Array.isArray(needs) ? needs : [needs];
}

function jobGraph(workflow) {
    return Object.fromEntries(
        Object.entries(workflow.jobs).map(([jobName, job]) => [
            jobName,
            normalizeNeeds(job.needs)
        ])
    );
}

function allRunCommands(workflow) {
    return Object.values(workflow.jobs).flatMap((job) =>
        job.steps.flatMap((step) => (step.run ? [step.run] : []))
    );
}

function findStep(job, predicate, description) {
    const step = job.steps.find(predicate);
    assert.ok(step, `Expected ${description}`);
    return step;
}

function findRunStep(job, pattern, description) {
    return findStep(job, (step) => pattern.test(step.run ?? ''), description);
}

function stepIndex(job, pattern) {
    return job.steps.findIndex((step) => pattern.test(step.run ?? ''));
}

test('pull requests follow the build -> preview delivery graph', () => {
    assert.deepEqual(jobGraph(previewWorkflow), {
        build: [],
        preview: ['build']
    });
    assert.deepEqual(previewWorkflow.on.pull_request.branches, ['master']);
    assert.deepEqual(previewWorkflow.on.pull_request.types, [
        'opened',
        'synchronize',
        'reopened'
    ]);
});

test('releases follow the build -> staging -> production delivery graph', () => {
    assert.deepEqual(jobGraph(releaseWorkflow), {
        build: [],
        staging: ['build'],
        production: ['build', 'staging']
    });
    assert.deepEqual(releaseWorkflow.on.push.branches, ['master']);
});

test('a release builds the frontend exactly once', () => {
    const buildCommands = allRunCommands(releaseWorkflow).filter((command) =>
        /(^|\n)\s*npm run build\s*($|\n)/.test(command)
    );

    assert.equal(buildCommands.length, 1);
    assert.match(releaseWorkflow.jobs.build.steps.find((step) => step.run === 'npm run build').name, /exactly once/i);
});

test('staging and production restore the same immutable release artifact', () => {
    const upload = findStep(
        releaseWorkflow.jobs.build,
        (step) => step.uses?.startsWith('actions/upload-artifact@'),
        'the build job to upload its artifact'
    );
    const stagingDownload = findStep(
        releaseWorkflow.jobs.staging,
        (step) => step.uses?.startsWith('actions/download-artifact@'),
        'staging to restore the release artifact'
    );
    const productionDownload = findStep(
        releaseWorkflow.jobs.production,
        (step) => step.uses?.startsWith('actions/download-artifact@'),
        'production to restore the release artifact'
    );

    assert.equal(upload.id, 'artifact');
    assert.equal(upload.with.path, 'dist');
    assert.match(upload.with.name, /github\.sha/);
    assert.match(upload.with.name, /github\.run_id/);
    assert.match(upload.with.name, /github\.run_attempt/);
    assert.equal(stagingDownload.with.name, upload.with.name);
    assert.equal(productionDownload.with.name, upload.with.name);
    assert.equal(stagingDownload.with.path, 'dist');
    assert.equal(productionDownload.with.path, 'dist');
    assert.equal(
        releaseWorkflow.jobs.build.outputs.artifact_digest,
        '${{ steps.artifact.outputs.artifact-digest }}'
    );
    assert.doesNotMatch(read('.github/workflows/web-release.yaml'), /web-preview-/);
});

test('the browser artifact is environment-neutral', () => {
    assert.equal(viteConfig.envDir, false);
    assert.deepEqual(viteConfig.envPrefix, []);
    assert.equal(viteConfig.build.outDir, 'dist');
});

test('Cloudflare serves one SPA artifact through separate named environments', () => {
    assert.equal(wranglerConfig.name, 'decline-web');
    assert.deepEqual(wranglerConfig.assets, {
        directory: './dist',
        not_found_handling: 'single-page-application'
    });
    assert.equal(wranglerConfig.workers_dev, false);
    assert.equal(wranglerConfig.preview_urls, false);
    assert.deepEqual(Object.keys(wranglerConfig.env), [
        'preview',
        'staging',
        'production'
    ]);

    for (const environment of Object.values(wranglerConfig.env)) {
        assert.equal(environment.workers_dev, true);
        assert.equal(environment.preview_urls, true);
        assert.equal(environment.route, undefined);
        assert.equal(environment.routes, undefined);
    }

    assert.equal(wranglerConfig.route, undefined);
    assert.equal(wranglerConfig.routes, undefined);
});

test('pull-request previews are version uploads with a visible deployment URL', () => {
    const previewJob = previewWorkflow.jobs.preview;
    const upload = findRunStep(
        previewJob,
        /wrangler versions upload/,
        'the preview job to upload a Worker version'
    );

    assert.equal(previewJob.environment.name, 'preview');
    assert.equal(previewJob.environment.url, '${{ steps.upload.outputs.preview_url }}');
    assert.match(upload.run, /--env preview/);
    assert.match(upload.run, /--preview-alias "\$PREVIEW_ALIAS"/);
    assert.ok(
        stepIndex(previewJob, /wrangler versions upload/) <
            stepIndex(previewJob, /npm run test:e2e/),
        'Playwright must smoke-test the uploaded preview'
    );
});

test('staging is deployed by version tag and validated before production', () => {
    const stagingJob = releaseWorkflow.jobs.staging;
    const upload = findRunStep(
        stagingJob,
        /wrangler versions upload/,
        'staging to upload a Worker version'
    );
    const deploy = findRunStep(
        stagingJob,
        /wrangler versions deploy/,
        'staging to deploy a Worker version'
    );

    assert.equal(stagingJob.environment.name, 'staging');
    assert.match(upload.run, /--env staging/);
    assert.match(upload.run, /--tag "\$RELEASE_TAG"/);
    assert.match(deploy.run, /--env staging/);
    assert.match(deploy.run, /--version-tag "\$RELEASE_TAG"/);
    assert.match(deploy.run, /--percentage 100/);
    assert.ok(
        stepIndex(stagingJob, /wrangler versions deploy/) <
            stepIndex(stagingJob, /npm run test:e2e/),
        'Playwright must validate the deployed staging version'
    );
});

test('production deploys the smoke-tested candidate atomically and serially', () => {
    const productionJob = releaseWorkflow.jobs.production;
    const upload = findRunStep(
        productionJob,
        /wrangler versions upload/,
        'production to upload a Worker version'
    );
    const candidateSmoke = findRunStep(
        productionJob,
        /"\$PREVIEW_URL\/"/,
        'the production candidate preview to be smoke-tested'
    );
    const deploy = findRunStep(
        productionJob,
        /wrangler versions deploy/,
        'production to deploy a Worker version'
    );

    assert.equal(productionJob.environment.name, 'production');
    assert.deepEqual(productionJob.concurrency, {
        group: 'web-production',
        'cancel-in-progress': false
    });
    assert.match(upload.run, /--env production/);
    assert.match(upload.run, /--tag "\$RELEASE_TAG"/);
    assert.match(upload.run, /--preview-alias "\$PREVIEW_ALIAS"/);
    assert.match(candidateSmoke.run, /--fail/);
    assert.match(deploy.run, /--env production/);
    assert.match(deploy.run, /--version-tag "\$RELEASE_TAG"/);
    assert.match(deploy.run, /--percentage 100/);
    assert.ok(
        stepIndex(productionJob, /"\$PREVIEW_URL\/"/) <
            stepIndex(productionJob, /wrangler versions deploy/),
        'the exact production candidate must pass smoke testing before deployment'
    );
});

test('normal releases never create and deploy a version in one operation', () => {
    for (const command of allRunCommands(releaseWorkflow)) {
        assert.doesNotMatch(command, /wrangler\s+deploy(?:\s|\\|$)/);
    }
});
