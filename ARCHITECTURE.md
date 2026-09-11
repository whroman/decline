# Architecture

This file is the repository-level architecture index. Delivery contracts are
executable specifications rather than duplicated descriptions of configuration.

## Deployables

### `app.web`

- Implementation: [`app`](./app/), [`generator`](./generator/) and [`tables`](./tables/)
- Delivery contract: [`architecture/frontend-delivery.spec.mjs`](./architecture/frontend-delivery.spec.mjs)
- Cloudflare configuration: [`wrangler.jsonc`](./wrangler.jsonc)
- PR preview workflow: [`.github/workflows/web-preview.yaml`](./.github/workflows/web-preview.yaml)
- Main release workflow: [`.github/workflows/web-release.yaml`](./.github/workflows/web-release.yaml)

The delivery contract is normative. Its graph data can be rendered as diagrams
when needed, but generated diagrams are not stored in the repository.
