# Agent bootstrap

Start with `pnpm checks list`; use `pnpm checks --help` to run a
behavior and inspect its generated Allure evidence. Executable checks define the specifications.

Before planning or modifying architecture-significant code, read
[`ARCHITECTURE.md`](./ARCHITECTURE.md) and follow its references for the affected
subsystem.

Treat executable architecture specifications as constraints, not snapshots of
the current implementation. Do not modify a specification merely to make an
implementation pass. If requested behavior conflicts with a specification,
surface the conflict and update both only when the architecture change is
intentional.

Run `pnpm run architecture:check` before completing delivery-related work.
