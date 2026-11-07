# Deletion as routine maintenance

English | [中文](delete-first.zh.md)

- Layer: [L2 — External memory](../layers/l2-external-memory.md)
- Governs: deletion is routine maintenance of the note system — signal-to-noise survives by forgetting, not by keeping everything.

## Rule text

[The notes README's "Archiving and deletion" section](../../../.agents/notes/README.md#archiving-and-deletion) sets the order of preference. Delete an implemented note that only describes mechanical or local changes — its three files together, inbound links repaired; a substantive decision does not qualify for deletion merely because its implementation is small. Archive other implemented notes only when they keep historical decision value, and keep one active while its alternatives, ownership boundary, negative guarantee, durable or wire semantics, security rule, or reintroduction condition remains useful. Never archive a proposal — reject it; keep a rejected note only while it prevents a plausible mistake. The calibrated archive skill decides, not word count, age, or quota.

## Enforcement

`Convention — the archive gate audits what remains, not what was deleted`. `pnpm run verify-archived-agent-notes` checks whatever the team chose to keep; the deletion itself is review judgment, calibrated by the [dsh-archive-agent-notes skill](../../../.agents/skills/dsh-archive-agent-notes/SKILL.md).

## Cost and prerequisites

A delete-first habit at review time and nothing else — deletion removes maintenance rather than adding it. The one prerequisite is the keep test above, so deletion does not eat rationale that still guides future work.

## Team fit

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Add to the review checklist: does this change make an existing note deletable? Delete it in the same change.
- Delete the complete triplet and repair inbound links — never a single file.
- Before archiving, run the keep test: alternatives, ownership boundary, negative guarantee, durable or wire semantics, security rule, reintroduction condition — any hit keeps it active.
- Never archive a proposal: reject it, then keep the rejected note only while it prevents a plausible mistake.

## Failure mode

Store-only systems bloat linearly with output: retrieval cost climbs until nobody searches the notes, and the store exists without functioning — kept, but no longer usable. The failure is invisible because every individual note looks worth keeping.
