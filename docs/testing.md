# Behavior checks

From the repository root, install with `npm ci`. npm workspaces and
`package-lock.json` are authoritative (CI uses npm); `pnpm-lock.yaml` is historical.
Install the existing browser runtime with
`npm exec --workspace=@decline/web-e2e -- playwright install chromium`.

```sh
npm run checks -- list
npm run checks -- run adjectives.settings
npm run checks -- run all
npm run checks -- run adjectives.settings --runner mocha
npm run checks -- inspect .checks/runs/RUN
npm run checks -- inspect .checks/runs/RUN playwright:chromium:settings.save-reload
npm run checks -- rerun .checks/runs/RUN playwright:chromium:settings.save-reload
npm run test:harness
```

`list` returns JSON with contracts, check identities, files, titles, runners,
projects, skipped declarations, and counts of ungrouped tests. For JSON without
npm's banner, use `npm run --silent checks -- list`. A discovery error fails the
command and retains its logs in `.checks/discovery/`; it cannot produce a partial
catalog that looks complete. Registration must be deterministic and free of
side effects; discovery loads modules but never runs their tests or hooks.

`all` means all **grouped checks in the configured harness scope**. It does not
claim the entire repository is covered. `npm test` still runs all 116 existing
Mocha tests; `npm run verify` keeps the full import, architecture, and unit gates
and adds the harness regression tests. Native reporters remain enabled.

## Current scope

| Contract | Checks |
| --- | --- |
| `adjectives.settings` | Four existing Mocha checks for explicit/default settings and local-storage loading; one Playwright flow changes gender, saves settings, and verifies restoration after reload |
| `web.shell` | Existing Playwright application-shell smoke check |
| `web.delivery` | Existing executable delivery architecture specification, invoked as a command-level Node test with its native output attached |
| `web.imports` | Existing import-casing check, invoked as a command-level Node test |

The settings checks cover algorithm edge cases (`null` versus `undefined`, absent
storage) and foundational form interaction. No product code was changed.
Other generator algorithms remain in the native Mocha suite and can be grouped
incrementally. No new testing framework or property-test library was introduced.

There is **no Storybook installation, configuration, story, Vitest, Jest, or
isolated component runner** in this repository. Component isolation/Storybook is
reported as unavailable. The browser form check exercises the built React 15 app;
it is not a Storybook test. Allure support for Playwright or Vitest alone would not
establish compatibility with a future Storybook execution path.

## Metadata

Declare metadata on the individual test title, using Allure's static Metadata API:

```js
it('uses explicit filters @allure.label.story:adjectives.settings @allure.id:settings.explicit', () => {
    // Existing assertions.
});
```

`story` is the contract ID. `id` identifies **one test case**, independently of its
contract; multiple story tags allow membership in multiple contracts. Both use
lowercase letters/numbers separated by dots or hyphens. Grouped tests require
exactly one `@allure.id`. There is no TestOps dependency or meaning attached to
these IDs. Keep them stable when rewording a title.

The catalog comes from Mocha registration and Playwright's native `--list`
reporter lifecycle. Metadata must be in the test title, not a runtime call or a
suite title, so skipped tests and setup failures are discoverable. For generated
cases, interpolate a **distinct ID per parameter case**, including a stable case
key. Duplicate identities fail discovery rather than silently collapsing cases.
Identity is `runner:project:allureId` (`default` denotes the unnamed Mocha/Node
project). Multiple Playwright projects must have nonempty, distinct names.
Playwright `repeatEach` must be 1 in harness scope; native repeated execution is
still available. Retries are supported and remain separate attempts.

The only small manifest is `tasks/checks/engineering.mjs`: command-level
guarantees have no individual test registration of their own. Their underlying
specifications stay authoritative. The Node wrapper clears `NODE_TEST_CONTEXT`
before starting an independent Node test command, so Node does not suppress its
subtests. It attaches native output and asserts the command's exit code.

## Execution and evidence

Every invocation gets a fresh directory under `.checks/runs/`. Each runner/project
has its own Allure results, selection plan, process log, and browser artifacts.
No prior run directories are read or merged. Ambient Allure selection/output
variables are cleared. Independent suites continue after another suite fails.

For local browser runs, the harness builds once into that run's `browser-build/`
and previews it on an ephemeral loopback port. It does not overwrite `dist` or
reuse a preexisting server. A port collision fails the suite. Set `BASE_URL` to
test an existing deployment: this skips building/starting a server and records
the target URL. The source revision then identifies the test source, not proof
of the deployed application's revision.

- `run.json`: atomic execution ledger, complete catalog and selected checks,
  native command arrays, process exit codes/signals/errors, source SHA, dirty
  status, lockfile hash, Node version, target URL, and artifact paths.
- `summary.json`: reconciliation of selected checks with actual Allure results;
  contract coverage and verification, attempts, failure kinds, evidence paths,
  process errors, unexpected results, and native reproduction commands.
- `suite-*/allure-results/`: untouched Allure test results, hook containers,
  attachments, and global errors.
- `suite-*/process.log`: complete native console output, including setup failures.
- `suite-*/test-results/` and `playwright-report/`: native failure screenshots,
  traces, error context, and HTML report. Browser console/network events are in
  the Playwright trace.
- `agent/index.md`, `agent/manifest/`, and `agent/awesome/index.html`: consolidated
  Allure Agent Mode evidence, JSON query data, and a standalone human report.

All generated data is ignored by Git. Standalone `npm test` and
`npm run test:e2e` write fresh results to `.checks/native/`. Watch mode is a native
development session; use a fresh harness invocation for an auditable run.
Artifacts can contain application data and logs; review them before sharing.

The CLI exits 0 only when every selected check ultimately passes, processes
succeed, and reporting succeeds. Exit 1 means unsuccessful/incomplete execution
(including skips); exit 2 means invalid input, discovery, or orchestration error.
Native exit codes/signals are retained in the ledger. A failed attempt followed
by a pass remains visible as flaky; native runner policy determines whether
flakiness itself fails the process. Unknown contracts, unknown runners, and empty
selections are errors. A successful runner-filtered or single-check rerun can
exit 0 while the contract's `fullSelection` and `verified` remain false.

`failed`, `broken`, `skipped`, and `unreported` remain distinct. Failure kinds also
identify Playwright hook/setup errors versus assertion failures. A killed run
retains its unfinished ledger; `inspect` reconciles the available evidence and
cannot mark it complete. Equal result counts are insufficient: identities must
match. Skips and never-reported checks never verify a contract.

Allure Mocha 3.12.1 can emit a failing `beforeEach` container without a test result.
The selected check remains `unreported`, the process failure is retained, and the
hook evidence remains in Allure. The harness does not invent a test outcome.
Allure Agent `inspect` itself reports the original process exit as unknown;
the execution ledger supplies that information. Always review both layers.
Its missing-global-logs advisory refers to Agent Mode's single-process log slot;
this harness retains each runner's full log separately in the ledger.

## Investigating failures

Start with `checks inspect RUN`: read `processErrors`, unreported checks, and the
contract's selected/expected counts. Then read `RUN/agent/index.md` and findings,
or use Allure's supported query interface:

```sh
npm exec -- allure agent query --from .checks/runs/RUN/agent summary
npm exec -- allure agent query --from .checks/runs/RUN/agent tests --status failed
npm exec -- allure agent query --from .checks/runs/RUN/agent findings
npm exec -- playwright show-trace .checks/runs/RUN/suite-1-playwright/test-results/TEST/trace.zip
```

Use `inspect RUN CHECK_ID` for assertion details, attachments and a quoted native
command. Browser native commands require `npm run build` first, or `BASE_URL`.
You can add `--headed`, `--debug`, or `--ui` to native Playwright commands, and use
Mocha's native debugging options. `checks rerun RUN CHECK_ID` runs the current
source through the native runner with a new isolated output directory and exact
Allure ID selection; it records its relationship to the original run and cannot
verify the rest of the contract. It never mutates the original evidence.

Allure's `agent select --from RUN/agent` and `agent --rerun-from ... -- COMMAND`
also provide supported test-plan selection. The repository command is preferable
for a cross-runner contract because it additionally retains the full expected
catalog and checks which runner/project actually reported each selected ID.

## CI and compatibility

The existing preview/release job graphs, full verification, one immutable release
build, deployed smoke tests, and production gates are retained. Build jobs record
the Mocha/Node contract slice; preview/staging jobs record the browser slice
against `BASE_URL`. This deliberately repeats the small grouped slice alongside
the original full native gates. Each slice reports partial contract coverage;
separate CI artifacts do not claim a single full-contract verification.
`actions/upload-artifact` runs with `always()` and includes hidden files under
`.checks`. Artifact names contain run/attempt identity. Download an artifact and
pass its `runs/RUN` directory to `checks inspect`; evidence paths in the ledger
are relative to that directory. Saved native command arrays describe the original
machine; generated reproduction commands use the current checkout.

Checked against the installed lockfile: Allure Report **3.17.0**, adapters
**3.12.1**, Mocha **12.0.0**, Playwright **1.63.0**, and the repository's Node **22**
CI line (local default Node 24). Report 3 is the npm CLI and requires no Java,
hosted account, or TestOps. Agent Mode is enabled through `allure agent inspect`
with an explicit per-run output and state directory.

Official references used for the compatibility decisions:

- [Allure Playwright supported versions](https://github.com/allure-framework/allure-js/tree/main/packages/allure-playwright): adapter 3.12+ requires Playwright 1.62+; the package range is raised to the actually installed 1.63 line.
- [Allure Mocha](https://allurereport.org/docs/mocha/): static metadata, test plans, and `extraReporters` preserve Mocha's console reporter. Mocha's removed `--compilers` flag is replaced by `require: babel-register` for the already-upgraded Mocha dependency.
- [Allure Node Test](https://allurereport.org/docs/node-test/): the reporter works on Node 22; the full runtime preload requires Node 26.1+. The harness uses native Node name filtering and reporter-only integration.
- [Allure Agent Mode](https://allurereport.org/docs/agent-mode/): supported in Report 3.12+, including inspection of existing results and JSON queries. It supplies the reporting layer; the small ledger supplies execution/selection completeness.

`npm run test:harness` exercises real adapter plans and discovery with temporary
fixture tests, skipped tests, setup failures, parameter cases and multiple
projects; it also checks missing/unexpected results, partial selections, retries,
process failures and unfinished ledgers. Fixture failures are intentional and
their expected outcomes are asserted by the passing harness tests.
