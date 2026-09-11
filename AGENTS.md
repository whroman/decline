# Agent bootstrap

Before planning or modifying architecture-significant code, read
[`ARCHITECTURE.md`](./ARCHITECTURE.md) and follow its references for the affected
subsystem.

Treat executable architecture specifications as constraints, not snapshots of
the current implementation. Do not modify a specification merely to make an
implementation pass. If requested behavior conflicts with a specification,
surface the conflict and update both only when the architecture change is
intentional.

Run `npm run architecture:check` before completing delivery-related work.
