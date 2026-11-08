# Layer 2 — External memory

English | [中文](l2-external-memory.zh.md)

External memory replaces the tacit channel of asking a person or rereading a conversation: decisions and their rationale live in the repository as Agent Notes, so experience survives agent replacement and context limits. The system records what was decided, why, and what was given up, and it governs forgetting as deliberately as storage — deletion is routine maintenance. Its value lies in how much is removed, not in how much is kept; see the [framework paradigm](../paradigm.md) overview.

## Mechanisms in this layer

- [mechanisms/note-lifecycle.md](../mechanisms/note-lifecycle.md) — the note lifecycle encoded in directory paths: live notes move from proposed to implemented, and rejected and archived are terminal states
- [mechanisms/note-triplet.md](../mechanisms/note-triplet.md) — the English, Chinese, and fingerprint sidecar triplet that pairs every note with its translation
- [mechanisms/note-alternatives.md](../mechanisms/note-alternatives.md) — the mandatory `Alternatives considered` section: a decision record that omits what it beat is rejected because it invites re-litigation
- [mechanisms/note-freshness.md](../mechanisms/note-freshness.md) — the freshness obligation: note facts update in the same change as the code they describe, and a changed decision means a new note with cross-links, never appended history
- [mechanisms/archive-freeze.md](../mechanisms/archive-freeze.md) — archived notes are frozen: fingerprints enter an append-only manifest, and archived content is never edited or cited as current authority
- [mechanisms/delete-first.md](../mechanisms/delete-first.md) — deletion as routine maintenance: mechanical edits are deleted outright, superseded notes are consolidated into their successor and deleted, and only historically valuable notes are archived

## Porting analysis

The note lifecycle with its format gate is the small-team entry point, simplified to a single-directory template for solo work, and the freshness obligation applies unchanged at every tier. The triplet and the archive freeze are the two additions that need conditions: without sustained bilingual capacity the triplet is a standing tax, and the freeze pays for itself only when an audit chain matters. The minimal porting path is lifecycle plus freshness plus delete-first discipline, deferring the triplet and the freeze until their conditions hold.
