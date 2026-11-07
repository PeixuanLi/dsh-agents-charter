# The English, Chinese, and sidecar triplet

English | [中文](note-triplet.zh.md)

- Layer: [L2 — External memory](../layers/l2-external-memory.md)
- Governs: every note's language files and consistency record exist as a set — the `.md`, its `.zh.md` counterpart, and the fingerprint `.i18n.yaml` sidecar.

## Rule text

[The notes README's "The file format" section](../../../.agents/notes/README.md#the-file-format) fixes what stays English verbatim in both languages (`# Agent Note: ` and the `Status:` line); the Chinese counterpart mirrors the structure section-for-section under the [i18n contract](../../../docs/i18n/README.md). The sidecar ([README.i18n.yaml](../../../.agents/notes/README.i18n.yaml) is the in-tree example) records a hash per heading section for each side, so structural drift between the languages is detectable without a human re-read.

## Enforcement

`pnpm run verify-translation-pairing` ([scripts/verify-translation-pairing.ts](../../../scripts/verify-translation-pairing.ts)) rejects an incomplete pair, a structural mismatch, an unrecorded side, and links aimed at the wrong-locale sibling; `--write` re-records confirmed pairs after an edit.

## Cost and prerequisites

One extra file per note plus the translation itself. The standing cost is synchronization: every content edit updates the counterpart and re-records the sidecar in the same change. Pay it only where two languages are actually sustained — a monolingual team degrades to a single file plus the format gate.

## Team fit

Follows the bilingual choice rather than headcount: where the team sustains two languages, the triplet applies at every tier; a monolingual team runs a single file plus the format gate instead.

## Porting checklist

- Decide the language policy first; the triplet exists only where two languages are sustained.
- Generate the sidecar for a new pair: `pnpm run verify-translation-pairing --write <note>.md`.
- Keep the header tokens (`# Agent Note: `, `Status:`) English verbatim on both sides.
- Update the counterpart and re-record the sidecar in the same change as any content edit.

## Failure mode

A missing member voids the guarantee the set exists for: without the counterpart, cross-language readers cannot confirm the sides agree; without the sidecar, drift is invisible until someone reads both. A partial triplet is worse than none — it promises pairing and delivers stale halves.
