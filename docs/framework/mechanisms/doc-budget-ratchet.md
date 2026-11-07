# Per-file word budgets with a ratchet that only tightens

English | [中文](doc-budget-ratchet.zh.md)

- Layer: [L4 — Instruction layering](../layers/l4-instruction-layering.md)
- Governs: institutional-text volume as a governed resource — every budgeted document carries a word ceiling, and ceilings move down, never up without justification.

## Rule text

The budgeted files and their ceilings live in `scripts/doc-budgets.manifest.json`. [AGENTS.md](../../../AGENTS.md#editing-these-instructions) owns the editing rule: condense when clarity survives; raise a ceiling only when the required content genuinely needs more space, with the justification recorded in the PR. Down is the default direction: a ceiling tightens whenever its document shrinks, keeping roughly 5% headroom — the slack the manifest tolerates; upward moves use only the justified raise above. The manifest budgets the five standing docs: the two instruction files (root and docs/), the architecture overview, the Cordis primer, and the testing policy.

## Enforcement

`pnpm run verify-doc-budgets` ([scripts/verify-doc-budgets.ts](../../../scripts/verify-doc-budgets.ts)) holds the mechanical half: word count against ceiling for each listed file (`wc -w` style), failing any file over ceiling; a missing file fails too, so renaming or deleting a budgeted doc must update the manifest in the same change. `--list` reports usage against ceiling. The convention half — ratchet direction and raise justification — holds at review, not in the gate.

## Cost and prerequisites

One manifest entry per standing doc, plus the discipline of choosing where text lives — ceilings make relocation cheaper than accumulation. Not worth starting before documents compete for context: begin with the first resident file rather than retrofitting quotas onto an existing corpus, and a solo author may defer the manifest until a second standing doc appears.

## Team fit

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Enter each standing doc in `scripts/doc-budgets.manifest.json` with a ceiling at its current word count.
- Tighten a ceiling every time the doc shrinks; the ratchet only works if it is actually moved.
- Raise a ceiling only after condensing, with the justification in the PR.
- Check usage: `pnpm run verify-doc-budgets --list`.

## Failure mode

Without a ratchet, ceilings only move up: each PR that needs three more words raises the budget, the resident layer inflates linearly with history, and context economy erodes until the standing rules crowd out what an agent actually needs in every session.
