# Note lifecycle encoded in directory paths

English | [中文](note-lifecycle.zh.md)

- Layer: [L2 — External memory](../layers/l2-external-memory.md)
- Governs: decision rationale flows `proposed → implemented`, with `rejected` and `archived` as terminal states, encoded in the path.

## Rule text

[The notes README's "Layout and naming" section](../../../.agents/notes/README.md#layout-and-naming) defines the two axes, both in the path `{lifecycle}/{class}/yyyy-mm-dd-topic-title.md`: the lifecycle folder is the status, and notes move between folders as it changes; the class folder is the kind of decision, from the closed set in `scripts/agent-note-tree.ts`. The filename date is when the topic was first proposed, per git history. Cross-references between notes use relative markdown links, never bare prose or numbers, so they stay mechanically checkable and survive moves between folders.

## Enforcement

`pnpm run verify-agent-note-classification` ([scripts/verify-agent-note-classification.ts](../../../scripts/verify-agent-note-classification.ts)) walks the tree and rejects paths outside the closed lifecycle/class set — including the former homes (`docs/rfc/`, `docs/rfcs/`), which stay forbidden so new notes cannot silently escape the tree.

## Cost and prerequisites

Four state directories and the closed class list. The structure pays off as soon as more than one person or session writes notes; a solo author can collapse it to a single-directory template until then.

## Team fit

Solo ✗ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Create the four state directories: `mkdir -p .agents/notes/{proposed,implemented,rejected,archived}` — brace expansion needs a POSIX shell (Git Bash on Windows); cmd/PowerShell create one literal directory name and the classification gate then fails loudly.
- Name notes `{lifecycle}/{class}/yyyy-mm-dd-topic-title.md`, the date being first proposal per git history.
- Pick classes only from the closed set (`feature`, `bug-fix`, `simplification`, `architecture`, `process`, `testing`); adding one updates the gate and the README section in the same change.
- Cross-link notes with relative markdown links, never bare prose or numbers.
- Verify: `pnpm run verify-agent-note-classification`.

## Failure mode

Without state discipline the note tree degrades into an unordered log: new proposals, shipped decisions, and declined ideas sit side by side, no reader can tell which conclusions are current, and the same proposal gets re-reviewed because its rejection is buried somewhere undifferentiated.
