# Review authority is a published formula

English | [中文](weighted-review.zh.md)

- Layer: [L1 — Role separation](../layers/l1-role-separation.md)
- Governs: review authority is a published formula — designated owners plus measured code ownership plus contribution history — not seniority or volume.

## Rule text

No rule text for this mechanism is resident: the formulas and their policy code live in the source repository's review configuration, so the porting material is the published formula itself. Merge requires 2 points. Each designated owner contributes 2 points; a write-permission review contributes 1 point, weighted by git-blame ownership of the changed lines to `min(2, 1 + 4×ownedLines/totalLines)` — 25% ownership of the diff already reaches the maximum. An author accumulates credit of `min(100, merged PRs) × 11/1000`, capped at 1.1, under the same rule for humans and agents and never enough to merge alone. A `CHANGES_REQUESTED` review from a write-permission reviewer is a hard block regardless of the point total.

## Enforcement

A required check recomputes every reviewer's weight from the formula on each PR and allows merge only at the threshold; the `CHANGES_REQUESTED` block applies independently of points. `Ported-config reference: reference/github/review-ownership/ and reference/github/weighted-approval*.yml` (restored in milestone M3).

## Cost and prerequisites

Configuration plus patience: the workflow needs review-weight plumbing, and the ownership and credit terms only weigh something after months of shared history — a freshly initialized repository has nothing to measure. Below a stable, mid-size membership, a designated-reviewer requirement serves the same protection more cheaply.

## Team fit

Solo ✗ · Small ✗ · Medium ✓ · Large ✓ — the formula reads history and membership stability; for small or unstable-membership teams the points weigh nothing and the ritual is empty.

## Porting checklist

- Designate the owner set and publish the point values alongside the formula, so review authority is computable before it is exercised.
- Adopt the formula while contribution volume is still growing, not after: the ownership and credit terms need accumulated history to mean anything.
- Weight write reviews by git-blame ownership of the changed lines, and cap author credit so a prolific author can never merge their own change alone.
- Make `CHANGES_REQUESTED` from a write-permission reviewer a hard block independent of the point total.
- Apply the formula to human and agent authors alike; a rule that exempts either side is not quantified trust.

## Failure mode

Authority without a formula ossifies into seniority or volume: the loudest or longest-tenured reviewer becomes the gate, and nobody can state by what rule. With the formula, review weight tracks actual ownership — the people who know the code are the ones whose review counts, and that property survives any individual's departure.
