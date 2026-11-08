# Adoption profiles

English | [中文](profiles.zh.md)

Profiles are bundles of mechanism cards ordered by team investment: P0 needs only written rules, P1 adds scripts, P2 adds engineering, P3 adds platform machinery. Each profile builds on the previous one's acceptance.

## Read the warnings first

- The bilingual triplet without bilingual staffing is a zombie tax — adopt bilingual pairing only where translation capacity is sustained.
- Coverage gates without a [delete-first philosophy](mechanisms/delete-first.md) become a burden — the ratchet pays only where deletion is routine.
- Heavyweight process without a matching organization size spins idle — weighted review and issue state machines presume stable membership and real flow volume.

## P0 — principles

- [Agent instructions and the CLAUDE.md symlink](mechanisms/agents-md-symlink.md)
- [Verify the world, not the self-report](mechanisms/verify-the-world.md)
- [The freshness obligation](mechanisms/note-freshness.md)
- [Local runs stay narrow; CI owns the full matrix](mechanisms/local-narrow-ci-full.md)
- [AI produces, humans decide, machines enforce](mechanisms/role-separation.md)

Adoption looks like plain text rules plus a review checklist; no scripts. Acceptance: the rules are resident in every session and the checklist is applied in review.

## P1 — script level

- [Note lifecycle encoded in directory paths](mechanisms/note-lifecycle.md) — note-tree layout and classification become mechanical.
- [Documentation is machine-checked output](mechanisms/markdown-gates.md) — link resolution, paragraph wrapping, and diagram parsing become commands.
- [The gate runner as tested engineering code](mechanisms/gate-aggregate.md) — running the whole gate set becomes one aggregate command.
- [Rehearse every PR, dispatch the release by hand](mechanisms/release-double-gate.md) — packaging rehearsal and the manual release dispatch become CI jobs.

Acceptance: after porting, the corresponding gates run and pass in the adopting repository.

## P2 — engineering level

- [The English, Chinese, and sidecar triplet](mechanisms/note-triplet.md) — only where two languages are sustained; a monolingual team runs a single file plus the format gate instead.
- [The mandatory Alternatives considered section](mechanisms/note-alternatives.md)
- [Per-file word budgets with a ratchet that only tightens](mechanisms/doc-budget-ratchet.md)
- [Archived notes are frozen](mechanisms/archive-freeze.md) — only where an audit chain matters.
- [Prose hygiene: the slop checklist and the reasoning-trace criterion](mechanisms/prose-hygiene.md)
- [Bilingual documents as fingerprinted pairs](mechanisms/bilingual-pairing.md) — optional, only where translation capacity is sustained.

Acceptance: `verify-agent-note-format`, `verify-doc-budgets`, `verify-archived-agent-notes`, and `verify-concrete-terms` run green in the adopting repository, with `verify-translation-pairing` where the pairing is adopted.

## P3 — heavyweight

- [Review authority is a published formula](mechanisms/weighted-review.md)
- [Issue state is moved by events](mechanisms/issue-state-machine.md)
- [One kind per PR; areas are multi-select](mechanisms/pr-classification.md)
- [Stacked PRs rewrite under lease, and sync verifies immediately](mechanisms/stacked-pr.md)

These mechanisms deploy from the reference configurations restored under [reference/github/](../../reference/github/README.md), which lives outside this spec directory. Acceptance: the weighted-review workflow deploys with an org app, secrets, and stable membership in place; the issue workflows deploy only once the porter supplies the not-restored issue-management engine the reference README names.

## Porting order

Adopt P0 through P3 in order: each earlier profile's habits are the next one's prerequisite, and skipping ahead imports enforcement without the habits it presumes.

## Milestones

- M1 (done) — the spec skeleton: the paradigm, the five layer chapters, and the 22 cards.
- M2 (done) — de-DSH-ification of the reference implementation.
- M3 (done) — this profiles page and the `reference/github/` appendix.
- M4 (pending) — extraction to a standalone repository preserving history.
