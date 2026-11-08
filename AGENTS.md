# AGENTS.md

`agents-collab-framework` is a dual-plane repository. The execution plane is the living constraint system this file governs — the `scripts/` governance gates and the `.agents/` corpus; the spec plane is [docs/framework/README.md](docs/framework/README.md), the five-layer mechanism catalog extracted from it. Read [scripts/AGENTS.md](scripts/AGENTS.md) before changing `scripts/`; documentation follows [docs/AGENTS.md](docs/AGENTS.md).

## Repository layout

```
.agents/   notes/: durable decision-rationale corpus; skills/: 5 framework skills + 16 reference skills
docs/      Process-governance corpus plus framework/: the spec plane — the five-layer mechanism catalog
scripts/   Governance gates and generators, run through the run-gates aggregate
(root)     Minimal Node base: package.json, tsconfig.json, vitest, lefthook, oxlint
```

## Commands

```sh
pnpm install               # pnpm, node >=24.9
pnpm run test              # vitest: unit and script specs
pnpm run typecheck         # tsc -p tsconfig.json
pnpm run lint | lint:fix   # oxlint over the repository; lint:fix applies fixes
# doc-sync runs every verify-* gate below through scripts/run-gates.ts
pnpm run doc-sync
pnpm run test:docs         # quick documentation aggregate (doc-quick)
pnpm run verify-md-wrap                 # one physical line per paragraph
pnpm run verify-md-links                # relative cross-links and fragments resolve
pnpm run verify-public-repository-links
pnpm run verify-repository-references
pnpm run verify-concrete-terms          # the banned origin label
pnpm run verify-doc-refs
pnpm run verify-mermaid
pnpm run verify-agent-note-classification
pnpm run verify-agent-note-format
pnpm run verify-archived-agent-notes
pnpm run verify-skill-invocation-metadata
pnpm run verify-upgrade-guides
pnpm run verify-translation-prompt
pnpm run verify-translation-pairing     # bilingual pairs match their .i18n.yaml records
pnpm run gen-translation-brief
pnpm run verify-doc-budgets             # manifest wordcount ceilings
```

### Host sandbox failures

If a required `gh`, `pnpm`, test, or generator command fails because the sandbox blocks credentials, network, IPC, watching, or nested `sandbox-exec`, retry unchanged with the narrowest host escalation. Require sandbox evidence; never bypass test failures or the sandbox.

### Run relevant checks locally

Before pushing, follow [pre-push-checks](.agents/skills/pre-push-checks/SKILL.md); report only commands run.

- Match evidence to the surface: focused behavior specs for `scripts/` changes, `doc-sync` for documentation, corpus, and mechanism-card changes.
- Run the smallest checks that cover the diff; never default to the full suite or repeat a passing check for commit or push.
- CI owns exhaustive coverage and the platform matrix; rehearse all locally only by explicit request, for CI diagnosis, or for an irreducibly repository-wide change.

## Secrets / .env

The translation and snapshot-replay workflows read `DEEPSEEK_API_KEY` ([key policy](docs/testing.md)); never commit credentials.

## Conventions

- **Registrations are effects**: a registry's `register()` returns the disposer, directly or through its documented registration handle; contributions are never fire-and-forget.
- **Switch on discriminant tags.** Closed unions end in `assertNever`; merge-extensible unions fall through a documented default.
- **Prefer maintained dependencies over hand-rolling** when they genuinely delete owned code and tests ([policy](.agents/notes/implemented/process/2026-07-26-dependencies-over-hand-rolling.md)).
- **Explicit > implicit at boundaries**: defaulting is an explicit `resolve(request): Spec` step in the owning implementation, never a hidden `?? default` inside `run()`.
- **No hardcoded tunables**: deployment-varying choices are validated configuration fields; a `DEFAULT_*` constant or test hook is not configurability. Protocol constants, external specs, and security invariants stay fixed.
- **Misconfiguration fails loud** at load when self-contained, otherwise at the earliest resolvable point; never silently skip a missing referent.
- **Opaque cross-boundary ids are branded** (`Branded<B>`), never bare `string`.
- **Trust TypeScript at typed same-process boundaries.** Do not add runtime validation, fallback behavior, or hostile-input tests solely for values the static interface requires; validate at parser/config, durable-file, worker, process, and wire boundaries.
- **No new assertions to `unknown`** (`as unknown` or `<unknown>`). Preserve or reduce the exact legacy baseline; use typed values or validation for replacements ([rule](.agents/notes/implemented/process/2026-09-19-no-unknown-casts.md)).
- **Error handling:** use typed, structured failures and localized, actionable reports. Define handling ownership, containment, and failure guarantees; stop dependent work and visibly report untrusted state or unknown outcomes. Follow [dsh-error-handling](.agents/skills/dsh-error-handling/SKILL.md).
- **An empty `catch` names the error** and why; keep its `try` to one statement.
- **Keep comments local.** Do not restate code, expand unrelated comments, or explain distant behavior without local need ([rationale](.agents/skills/prose-standard/SKILL.md)).
- **Ban `prove` + `nance`** ([rule](.agents/notes/implemented/process/2026-08-26-ban-ambiguous-origin-label.md)).
- **Prefer symmetry for parallel values**; unexplained asymmetry usually signals a missed extraction.
- **Tests describe behavior, not correctness.** Change obsolete behavior with its tests; explain why in the PR.
- **Create Agent Notes only for durable decision rationale**, in the same PR as the change; mechanical/local edits are exempt ([scope](.agents/notes/README.md#when-to-write-one)). Archived notes are frozen: never edit or treat them as current authority ([archive policy](.agents/notes/README.md#archiving-and-deletion)).
- **Spec-implementation drift fails the gates.** `verify-md-links`, `verify-doc-refs`, `verify-doc-budgets`, and `verify-translation-pairing` catch it; a new rule lands in exactly one home — a `docs/framework/` mechanism card or this file (one home per fact).
- **Testing policy** — match evidence to the surface; [docs/testing.md](docs/testing.md) owns the policy.
- **Choose PR history deliberately.** Split independent changes and fix the introducing PR before propagation. Standalone/stack branches may merge-forward or rebase. Rewrites use `--force-with-lease`, abort on remote movement, never raw `--force`; preserve an in-progress merge-forward checkpoint before taking a newer base ([rationale](.agents/notes/implemented/process/2026-08-02-native-github-stacks-and-optional-rebases.md)).
- **PR descriptions:** write and update every PR description with [dsh-pr-description](.agents/skills/dsh-pr-description/SKILL.md).
- TODO markers: `FIXME`/`TODO`/`XXX` by urgency ([semantics](docs/development.md)).
- Files end with exactly one trailing newline; `git diff --cached --check` (pre-commit) gates it.

## Defensive patterns

Read [docs/defensive-patterns/README.md](docs/defensive-patterns/README.md) before changing a gate script, the documentation corpus, or the notes tree; its [review principles](docs/defensive-patterns/README.md#why-these-rules) apply per artifact.

## Type safety and documentation

`scripts/` compiles under `strict: true` with `noImplicitAny`; every remaining `any` explains why narrowing is infeasible.

Comments and docs state complete contracts and context, not reasoning transcripts. Use direct, concrete terms; do not use metaphors. Before writing `contract`, `boundary`, or `shape`, ask whether a more exact term names the subject: write `response fields`, `JSON validation`, or `ESM exports` instead of `response shape`, `validation boundary`, or `module shape`. Keep `contract` for preconditions, postconditions, invariants, compatibility promises, and other obligations that callers, implementers, producers, or consumers rely on; keep a literal process, wire, security, transaction, or lifecycle boundary. Do not narrate control flow or tests, preserve review history, or restate code; keep behavior, failure, timing, ownership, and safe-use facts, and link the rationale. Use [prose-standard](.agents/skills/prose-standard/SKILL.md) for decisions; `verify-concrete-terms` bans the `prove` + `nance` label. Wire mechanically checkable invariants into an executed top-level gate and prove each changed acceptance path rejects an invalid case. Use narrow, justified exceptions instead of disabling a rule globally.

Docs accompany every change: update affected README and JSDoc contracts together. Routine bilingual work follows [docs/AGENTS.md](docs/AGENTS.md); only explicit user invocation may run `dsh-translate-docs`. Current-state prose, one physical line per paragraph, one home per fact, and word budgets live there.

## Editing these instructions

`CLAUDE.md` is a symlink to `AGENTS.md`; edit the real file. Keep each rule self-contained while linking high-level docs. Condense when clarity survives; raise a `verify-doc-budgets` ceiling when the required content genuinely needs more space, and justify the manifest diff in the PR.
