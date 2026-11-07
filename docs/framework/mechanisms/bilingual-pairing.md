# Bilingual documents as fingerprinted pairs

English | [中文](bilingual-pairing.zh.md)

- Layer: [L3 — Machine verification](../layers/l3-machine-verification.md)
- Governs: optional module — bilingual documents stay structurally aligned through per-section fingerprint records, so translation drift is immediately visible.

## Rule text

[The i18n contract](../../../docs/i18n/README.md) fixes the pair: every governed document is an English `.md` plus a Chinese `.zh.md` counterpart with a line-2 language switcher, and a `.i18n.yaml` sidecar records a hash per heading section for each side. The fingerprint makes structural drift between the languages detectable without a human re-read; the record is data, regenerated rather than hand-maintained.

## Enforcement

`pnpm run verify-translation-pairing` ([scripts/verify-translation-pairing.ts](../../../scripts/verify-translation-pairing.ts)) rejects an incomplete pair, a structural mismatch between sides, an unrecorded side, and links aimed at the wrong-locale sibling. After a legitimate edit, `--write <pair>` re-records the confirmed pair; the named-pair form keeps edit iteration off the corpus scan.

## Cost and prerequisites

One extra file per pair plus the translation itself, and the standing rule that every content edit updates the counterpart and re-records the sidecar in the same change. Adopt it only where two languages are actually sustained.

## Team fit

Follows bilingual capacity, not headcount: where a team sustains two languages, the pairing applies at every tier; without that capacity the module is a zombie tax and should not be adopted.

## Porting checklist

- Decide the language policy first; the module exists only where two languages are sustained.
- Write the switcher as line 2 of both sides, each pointing at its counterpart.
- Generate the sidecar: `pnpm run verify-translation-pairing --write <pair>`.
- Update the counterpart and re-record the sidecar in the same change as any content edit.
- Verify: `pnpm run verify-translation-pairing`.

## Failure mode

Without bilingual manpower the [English, Chinese, and sidecar triplet](../mechanisms/note-triplet.md) becomes zombie tax: records drift, the gate goes permanently red, and teams learn to ignore it — the red then stops protecting the pairs that still deserve protection.
