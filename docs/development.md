# Development guide

English | [中文](development.zh.md)

The daily workflow of this governance corpus: install dependencies once, edit documents and gate scripts, run the checks that cover the change, and commit through the hooks. The setup tutorial takes a new contributor from prerequisites to a verified checkout; the reference sections that follow own the TypeScript layout, the environment variables, the Git integrations, the daily command set, and the TODO-tag semantics. [testing.md](testing.md) owns evidence selection; [AGENTS.md](AGENTS.md) owns the documentation standard; root [AGENTS.md](../AGENTS.md) owns the standing orders.

## Setup tutorial

### Prerequisites

- Node.js 24.9 or newer (the `engines` field) and Corepack-enabled pnpm; `package.json` pins `pnpm@11.28.5` through `packageManager`. Run `corepack enable` if `pnpm --version` does not resolve through Corepack.
- Git 2.26 or newer; the hook installer enables Git's worktree-specific configuration extension.
- Nothing else: the tree has no build step, and nothing in it reads model credentials ([secrets policy](../AGENTS.md#secrets--env)), so no API key is needed.

### First-time setup

Install dependencies from the repo root; `postinstall` runs `scripts/install-lefthook.mjs`:

```sh
pnpm install
```

The installer writes worktree-local Lefthook hooks under `$GIT_DIR/acf-hooks`, marks that directory with an ownership marker, and points the worktree's `core.hooksPath` at it, so each worktree owns its hooks and no hook artifact lands in the working tree. It refuses to replace a user-owned `core.hooksPath` or overwrite an unowned hooks directory instead of forcing either; the [worktree-local hooks Agent Note](../.agents/notes/implemented/process/2026-07-27-worktree-local-lefthook.md) owns the hook-path safety contract. The installer handles the Windows specifics itself (`.cmd` shim quoting, CRLF-stripped Git output, delayed access to a deleted lock), so no separate toolchain or WSL setup is needed. If the hooks are missing because dependencies were restored from cache or `postinstall` was skipped, run `node scripts/install-lefthook.mjs`; after moving a checkout, rerun the wrapper to regenerate the owned path.

A checkout whose hooks predate the current marker owner, marker version, or hooks-directory name is refused. Remedy once per checkout, deleting the stale gitdir hooks directory:

```sh
git config --worktree --unset-all core.hooksPath; rm -rf "$(git rev-parse --absolute-git-dir)/acf-hooks"; pnpm install
```

Run `pnpm run typecheck` once on a fresh clone; setup is complete when it exits successfully.

## TypeScript project layout

This tree has one TypeScript program. `tsconfig.json` includes `scripts/**/*.ts` and nothing else, compiles under `strict` with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`, and never emits: scripts run through tsx and their specs through vitest, so there is no build output, no project references, and no source/artifact plane split. Each gate script's Vitest spec is colocated beside it as `*.spec.ts`.

The multi-package compiler-face layout — the Host and Client aggregates and the project-reference graph that ties them — is originating-harness reference: it describes the upstream harness this corpus derives from, not this tree. The pages linking here — including [adding a package](cookbook/adding-a-package.md), [adding a vendored package](cookbook/adding-a-vendored-package.md), and the [Typert Remote note](../.agents/notes/implemented/architecture/2026-08-02-typert-remote-method-calls.md) — document that layout; this section is its anchor point in this corpus.

## Environment variables

- `ACF_GATE_CONCURRENCY` — positive integer bounding concurrent gates in the `run-gates` aggregates; unset, the local worker budget applies, capped at 8 for the documentation aggregates because each gate spawns a full Node child.
- `ACF_GATE_FAIL_FAST` — set to `1` to stop the remaining gates at the first blocking failure; unset, a failure skips only its dependents, so independent failures are all reported.
- `ACF_GATE_VERBOSE` — set to `1` to print each passed gate's output too.
- `ACF_OXLINT_THREADS` — positive integer selecting the Oxlint thread count; unset, CI keeps Oxlint's own default and local runs use the worker budget. Use it instead of a direct `--threads` argument.
- `ACF_ARCHIVE_BASE_REF` — trusted pre-change commit the archive seal compares against; the default is `HEAD`, and CI supplies its own baseline.
- `ACF_SNAPSHOT` — `record` or `refresh` rewrites the translation-prompt golden before comparing.
- `ACF_LEFTHOOK_ALLOW_HOOKS_PATH_OVERRIDE` — set to `1` to let the hook installer proceed past an inherited `core.hooksPath` (system, global, or local scope) it would otherwise refuse.

## Git integrations

`lefthook.yml` is a fast local checkpoint; the `doc-sync` aggregate owns the repository-wide gate matrix.

- `pre-commit` verifies staged pairing records against the staged owner blobs, validates staged archived Agent Notes, applies staged Oxlint fixes (the wrapper's bounded second pass) and restages what it fixed, and checks the staged diff for whitespace errors.
- `pre-merge-commit` performs the same index-backed pairing and archive checks before Git creates an automatic merge commit.
- `pre-push` runs `pnpm run typecheck`.

Hooks execute from `$GIT_DIR/acf-hooks`, guarded by the ownership marker against foreign installs; an installer lock in the common gitdir serializes concurrent `pnpm install` runs. A `.i18n.yaml` record conflicts only when both branches changed language-specific content in the same heading section; resolve the Markdown, then rerun `pnpm run verify-translation-pairing --write <pair>`. If `pre-merge-commit` rejects an otherwise clean merge, Git leaves the complete result staged without a commit; repair the failure and run `git commit`, or run `git merge --abort`.

## Daily commands

[`package.json`](../package.json), root [AGENTS.md](../AGENTS.md#commands), and [scripts/run-gates.ts](../scripts/run-gates.ts) own the script and gate inventories. The working set:

- `pnpm install` — dependencies and hooks.
- `pnpm run test` — the Vitest specs over `scripts/**/*.spec.ts`.
- `pnpm run typecheck`, `pnpm run lint`, `pnpm run lint:fix` — static checks.
- `pnpm run doc-sync` — the full documentation aggregate; `pnpm run test:docs` is its fast subset.
- `pnpm run verify-<name>` — any single gate directly, for example `verify-md-links`.
- `pnpm run verify-translation-pairing --write <en-path>` — re-record a bilingual pair after editing it; `pnpm run gen-translation-brief <pair>` backs the user-invoked extended translation workflow.

Select the smallest checks that cover the changed surface; [testing.md](testing.md) owns the policy.

## TODO markers

Use one of three comment tags to flag known issues in the code, ordered by urgency:

- `FIXME` — an issue that should block a new release. A release should not ship with an open `FIXME` unless reviewers explicitly agree the change can be merged anyway.
- `TODO` — an issue that should be fixed soon, once we have the resources.
- `XXX` — an issue that we may fix someday; lowest priority, no commitment.

Pick the tag that matches the urgency so anyone scanning the code can tell a release blocker from a someday-maybe.

## What has no lane here

This tree has no build, coverage, or CI lanes: no bundling, no coverage percentage, no platform matrix. Those lanes belong to the upstream harness whose layout the reference pages describe, or to the adopting project — the [L3 porting analysis](framework/layers/l3-machine-verification.md) prices them. The verification surface that remains is [testing.md](testing.md)'s tiers and evidence.
