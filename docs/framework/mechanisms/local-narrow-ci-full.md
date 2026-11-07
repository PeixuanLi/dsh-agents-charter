# Local runs stay narrow; CI owns the full matrix

English | [中文](local-narrow-ci-full.zh.md)

- Layer: [L3 — Machine verification](../layers/l3-machine-verification.md)
- Governs: local runs execute only the checks matched to the change, the full gate matrix belongs to CI, and a check that already passed is not re-run.

## Rule text

[lefthook.yml](../../../lefthook.yml) keeps the hooks narrow — pre-commit checks staged translation-pairing records, archive metadata, staged lint, and whitespace; pre-push runs one typecheck — and its header comment states the split: keep local checkpoints fast, the `doc-sync` aggregate owns the repository-wide gate matrix. The evidence-selection rule lives in the [dsh-pre-push-checks skill](../../../.agents/skills/dsh-pre-push-checks/SKILL.md): run the narrowest check that would fail for the regression, never manually repeat a passing check, and rehearse the full suite only on explicit request, for CI diagnosis, or for an irreducibly repository-wide change.

## Enforcement

`Convention — the pre-push checklist owns evidence selection`. The drift surface is hook breadth; auditing the hooks against the checklist is the natural gate when drift is first observed — pre-push jobs that outgrow fast checkpoints are what force `--no-verify` bypasses.

## Cost and prerequisites

Already paid at the hooks: local iteration stays seconds-fast, and CI minutes scale with the matrix rather than with every push. The prerequisite is a CI that actually runs the full matrix — local narrowness is only safe because something else is exhaustive.

## Team fit

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Keep hooks to fast, staged-scope jobs: staged lint and whitespace at commit, one typecheck at push.
- State the split where the hooks are defined: fast local checkpoints; the full gate matrix elsewhere.
- Select evidence per change with a written checklist: the narrowest check that would fail for the regression.
- Never repeat a passing check; full rehearsal only on explicit request or CI diagnosis.
- Inspect the outgoing scope with the linked skill's change-scope report before choosing evidence.

## Failure mode

Two symmetric failures. Local-full makes iteration slow enough that gates get bypassed, and the `--no-verify` habit then spreads to checks that mattered. Local-none floods review with pushes a machine could have rejected, and human attention is spent on what a hook could have caught.
