# Architecture

This file is the repository-level architecture index. Normative subsystem rules
live in the linked architecture documents.

## Deployables

### `app.web`

- Implementation: [`app`](./app/), [`generator`](./generator/) and [`tables`](./tables/)
- Delivery architecture: [`architecture/frontend-delivery-architecture.md`](./architecture/frontend-delivery-architecture.md)
- Cloudflare configuration: [`wrangler.jsonc`](./wrangler.jsonc)
- PR preview workflow: [`.github/workflows/web-preview.yaml`](./.github/workflows/web-preview.yaml)
- Main release workflow: [`.github/workflows/web-release.yaml`](./.github/workflows/web-release.yaml)
