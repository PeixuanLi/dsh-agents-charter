# The mandatory Alternatives considered section

English | [中文](note-alternatives.zh.md)

- Layer: [L2 — External memory](../layers/l2-external-memory.md)
- Governs: decision records state what they beat — every note carries an `Alternatives considered` section.

## Rule text

[The notes README's "The file format" section](../../../.agents/notes/README.md#the-file-format) puts `## Alternatives considered` in every lifecycle's skeleton: each genuine alternative and why it lost, one bold-led paragraph per alternative or a `### Why not <X>?` subsection per contested one. Alternatives are recorded, never invented. A decision recorded without what it beat invites re-litigation — the failure Agent Notes exist to prevent. A pre-format note whose alternatives are not reconstructible carries the exact grandfather comment instead, which the gate accepts only for pre-format files.

## Enforcement

`pnpm run verify-agent-note-format` ([scripts/verify-agent-note-format.ts](../../../scripts/verify-agent-note-format.ts)) rejects a note missing the section — unless it carries the grandfather comment, valid only before the format adoption date.

## Cost and prerequisites

Nothing beyond the writing itself: the alternatives were weighed when the decision was made, and the section only commits them to the record while the reasoning is fresh.

## Team fit

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Put `## Alternatives considered` in the note template, between the decision and its consequences.
- Write one bold-led paragraph per alternative: what it was, why it lost.
- Give a contested alternative its own `### Why not <X>?` subsection.
- Verify: `pnpm run verify-agent-note-format`.

## Failure mode

Records without alternatives invite re-litigation: the same losing argument returns as a new note, gets re-reviewed by people who cannot see it lost before, and the debate repeats at full cost every cycle.
