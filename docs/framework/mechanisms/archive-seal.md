# The archive seal compares against a git baseline

English | [中文](archive-seal.zh.md)

- Layer: [L3 — Machine verification](../layers/l3-machine-verification.md)
- Governs: the frozen archive manifest is compared against the git HEAD baseline, so removal requires an explicit, disclosed transition.

## Rule text

The archive-format, triplet, and immutable-manifest helpers live in [scripts/archived-agent-notes.ts](../../../scripts/archived-agent-notes.ts); the sha256 manifest is append-only, and verification reads its baseline from git — `DSH_ARCHIVE_BASE_REF` names the ref, defaulting to `HEAD` (CI supplies its trusted pre-change commit). The seal compares what remains against what the baseline sealed: any changed or missing hash fails, so archive history cannot be rewritten quietly.

## Enforcement

`pnpm run verify-archived-agent-notes` ([scripts/verify-archived-agent-notes.ts](../../../scripts/verify-archived-agent-notes.ts)) extends the manifest only forward and fails on any seal the baseline does not vouch for. Removal still has a shape: a deliberate mass removal lands as one disclosed `--no-verify` commit, and the seal then holds against the new baseline — this repository's own thinning to a skeleton did exactly that.

## Cost and prerequisites

The append-only manifest plus the discipline of never touching sealed files; everything beyond that is the [archive freeze](../mechanisms/archive-freeze.md)'s cost, not the seal's. The baseline read is what makes removal a decision instead of an edit — worth it wherever frozen history must survive team turnover.

## Team fit

Solo ✗ · Small ✗ · Medium ✓ · Large ✓

## Porting checklist

- Seal at archival time: `pnpm run verify-archived-agent-notes --write`; existing seals never change.
- Read the baseline from a trusted ref in CI by setting `DSH_ARCHIVE_BASE_REF`; locally the default `HEAD` is the baseline.
- Treat removal as a transition: one disclosed mass-removal commit, then the seal holds against the new baseline.
- Verify: `pnpm run verify-archived-agent-notes`.

## Failure mode

A baseline that cannot be compared degrades the seal into self-report: the manifest says whatever the last writer wrote, and a deleted or rewritten artifact passes the same gate that claims to protect it. The bypass is invisible — the gate stays green precisely when history is being erased.
