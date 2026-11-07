# Archived notes are frozen

English | [中文](archive-freeze.zh.md)

- Layer: [L2 — External memory](../layers/l2-external-memory.md)
- Governs: archived means frozen — the sha256 manifest is append-only, and archived content is never edited or cited as current authority.

## Rule text

[The archived notes AGENTS.md](../../../.agents/notes/archived/AGENTS.md) fixes the seal: an archival change may only relocate a complete triplet, insert the identical `Archived: YYYY-MM-DD` line below both status lines, re-record the sidecar, and repair or delete inbound links — nothing else. Every sealed artifact's sha256 enters `archived/manifest.json`, and the manifest only ever grows. Sealed artifacts are frozen historical snapshots, not current authority: documentation gates skip archived sources including their outbound links, and active prose links to an archived note only when it intentionally cites history.

## Enforcement

`pnpm run verify-archived-agent-notes` ([scripts/verify-archived-agent-notes.ts](../../../scripts/verify-archived-agent-notes.ts)) validates the closed class tree, complete triplets, archive metadata, and sidecar hashes, and extends the manifest only forward: it reads the baseline manifest from git HEAD (CI supplies its trusted pre-change commit), so any changed or missing seal fails.

## Cost and prerequisites

The freeze pays for itself only where an audit chain matters — otherwise it is pure maintenance tax. Running it needs the append-only manifest, the `--write` seal step at archival time, and the discipline of never touching sealed files.

## Team fit

Solo ✗ · Small ✗ · Medium ✓ · Large ✓

## Porting checklist

- Seal only at archival time: `pnpm run verify-archived-agent-notes --write` appends new artifact hashes; existing seals never change.
- Insert the identical `Archived: YYYY-MM-DD` line below both `Status: implemented` lines.
- Move the complete English/Chinese/sidecar triplet in one change; repair or delete inbound links.
- Verify: `pnpm run verify-archived-agent-notes`.

## Failure mode

Rewritable history is no history: once a sealed artifact can be edited, every past decision becomes deniable and the manifest proves nothing. Teams without an audit-chain requirement should not run the freeze at all; teams that need it and skip the gate get exactly the history they paid for — none.
