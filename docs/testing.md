# Testing policy

English | [中文](testing.zh.md)

This repository is a governance corpus: the documents and gate scripts are the product. The documentation gates verify the corpus; the Vitest specs verify the gates. Commands live in root [AGENTS.md](../AGENTS.md).

## Tiers

- **Gate specs** (`pnpm run test`): vitest over the colocated `scripts/**/*.spec.ts` files that pin the gate implementations' own behavior — the run-gates scheduler and parallelism budget, translation pairing and link normalization, translation-prompt assembly, install-lefthook, the oxlint wrapper, markdown parsing, doc-standard, and concrete-terms discovery. A script under `scripts/` with behavior worth pinning gets a colocated `*.spec.ts`; tests describe behavior, not correctness.
- **Documentation gates** (`pnpm run doc-sync`; fast subset `pnpm run test:docs`): the full aggregate — markdown links and wrap, Mermaid, translation pairing and prompt, public-repository links, repository references, concrete terms, doc refs, Agent Note classification, format, and archive seal, skill invocation metadata, doc budgets, upgrade guides, and the doc-standard spec. Documentation is the product, so this aggregate is the corpus's acceptance surface: a rule that cannot fail a gate drifts ([machine verification](framework/layers/l3-machine-verification.md)).
- **Keyless golden** (`scripts/snapshots/translation-prompt-v4/`): `scripts/translation-prompt.expected.spec.ts` runs `verify-translation-prompt --snapshot` as a real Node subprocess, asserts empty stderr and JSON-parseable stdout, and compares stdout byte-for-byte against the committed `request-response.expected.json`. The golden holds the assembled translation request — system message, reviewed example pairs, then source — and the consumed response, which comes from a recorded fixture, so this tier never calls a model. Setting `ACF_SNAPSHOT=record` or `ACF_SNAPSHOT=refresh` rewrites the golden with current output before comparing. Regenerate only when the prompt workflow itself changes — prompt document, placeholder table, example fixtures, or request/response rendering; the examples are synthetic fixtures, so editing paired documents must not churn the golden. Review every resulting diff.

## Evidence selection

Git hooks stay narrow on purpose: pre-commit fixes staged lint and checks staged whitespace, pairing records, and archive metadata; pre-push runs only typecheck. Select the smallest checks that cover the changed surface: the owning Vitest spec for gate or script behavior, adding adjacent specs when a shared module such as `markdown.ts` or `run-gates.ts` changes; the owning focused gate or `pnpm run test:docs` for documentation and corpus changes, with the full `doc-sync` once at PR level; `pnpm run verify-translation-pairing --write <en-path>` after editing a bilingual pair. Never repeat a passing check because a commit or push follows; rehearse the full local set only by explicit request. [pre-push-checks](../.agents/skills/pre-push-checks/SKILL.md) owns the policy, including the `gh stack sync` exception ([local narrow, CI full](framework/mechanisms/local-narrow-ci-full.md)).

## How specs execute

Vitest runs the spec files in forked workers while `doc-sync` runs gates concurrently, so a spec can execute beside other gate processes. Only the process is isolated: a spec owns every port, temporary path, and child process it acquires, and a spec that passes only when it runs alone is a defect in the spec.

## What has no tier here

No coverage percentage, real-API tests, or platform matrix exist in this tree; those tiers belong to the adopting project — the [L3 porting analysis](framework/layers/l3-machine-verification.md) prices them — and the gates plus the Vitest suite are this corpus's full verification surface. Nothing in the tree reads model credentials ([secrets policy](../AGENTS.md#secrets--env)). The reference appendix's own restored suites run out-of-band through `node --test` ([reference/github/README.md](../reference/github/README.md)); they are not wired into this tree's gates.
