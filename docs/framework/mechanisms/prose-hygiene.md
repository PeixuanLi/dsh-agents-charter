# Prose hygiene: the slop checklist and the reasoning-trace criterion

English | [中文](prose-hygiene.zh.md)

- Layer: [L4 — Instruction layering](../layers/l4-instruction-layering.md)
- Governs: produced text carries no LLM pathologies — no reasoning transcripts, no metaphor terms standing in for exact subjects, no session traces.

## Rule text

The [dsh-prose-standard skill](../../../.agents/skills/dsh-prose-standard/SKILL.md) owns the standard: preserve the complete proposition, treat `contract`, `boundary`, and `shape` as terms to check before use rather than banned words, and keep a complete contract at the point of use with one home per explanation. The [dsh-trim-cot-leakage skill](../../../.agents/skills/dsh-trim-cot-leakage/SKILL.md) owns the one test: could a reader at HEAD, with no access to any session transcript, PR thread, or uncommitted draft, resolve every reference and verify every claim? Both skills are guidance applied at writing and review time; the machine-checked slice is the ambiguous origin label banned by convention (`prove` + `nance`, per AGENTS.md).

## Enforcement

`pnpm run verify-concrete-terms` ([scripts/verify-concrete-terms.ts](../../../scripts/verify-concrete-terms.ts)) rejects the banned label in every maintained tracked file — deliberately narrow, because no parser can judge whether a term names its exact subject. Everything else is a judgment pass: the two skills run at writing and review, and the gate holds only what is mechanically decidable.

## Cost and prerequisites

The skills must be resident and invoked during review — hygiene is a judgment pass at prose time, not a post-hoc batch job. Cost concentrates in the first sweep of inherited text; text written under the standard from the start carries almost none.

## Team fit

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Adopt both skills with trigger-precise descriptions (`dsh-prose-standard`, `dsh-trim-cot-leakage`).
- Sweep inherited prose once with the one test before trusting review to hold the line.
- Wire the banned-label gate into CI: `pnpm run verify-concrete-terms`.
- Re-run `pnpm run verify-concrete-terms` after every docs change.

## Failure mode

Ungated slop accumulates linearly with output: reasoning transcripts, dead citations, and hedged planning residue pile up until readers cannot separate conclusions from process. No single paragraph is bad enough to flag — which is exactly why the standard needs a named criterion and a gate for the machine-checkable slice.
