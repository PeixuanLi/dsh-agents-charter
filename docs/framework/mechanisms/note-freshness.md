# The freshness obligation

English | [中文](note-freshness.zh.md)

- Layer: [L2 — External memory](../layers/l2-external-memory.md)
- Governs: the same PR that changes code updates affected notes; a changed decision is a new note with cross-links, never appended history.

## Rule text

Two rules compose. [AGENTS.md](../../../AGENTS.md#conventions) requires an Agent Note only for lasting decision rationale, updated in the same PR as the change it describes. [The notes README's "When to write one" section](../../../.agents/notes/README.md#when-to-write-one) owns the rest: updating the note that already owns the decision satisfies the rule; a note is never edited into a different decision — supersede it with a new one and keep both cross-linked; an implemented note is kept current with what actually shipped, facts only (paths, names, structure), not the decision itself.

## Enforcement

`Convention — enforced by the review checklist`. No gate can diff a note against the world it describes; the classification, format, and pairing gates hold structure and language consistency, while the same-change rule holds at review.

## Cost and prerequisites

One search per PR: find the note that owns the decision before writing code that touches it. Superseding is cheaper than editing — the new note stays clean and the old one keeps its original record.

## Team fit

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Add to the PR checklist: does this change touch a decided fact? Update its note in the same PR.
- Find the owning note before writing: `grep -rl '<topic>' .agents/notes/implemented/`.
- Supersede, don't append: a changed decision is a new note cross-linked to the old one.
- Update facts (paths, names, defaults) with the code; the decision text changes only via a superseding note.

## Failure mode

Notes fork from reality: the code moved and the note did not, and later readers act on stale rationale with no way to notice — nothing marks it stale, so it still reads as authoritative. Appended changelogs are the same failure in costume: history accretes while the opening decision paragraph silently rots.
