# Layer 5 — Process automation

English | [中文](l5-process-automation.zh.md)

Process automation replaces hand-driven procedure with event-driven execution whose trust boundaries are explicit. Process policy is code checked out from the default branch, and event data is input only, so a crafted event cannot carry policy with it. Releases pass a double gate — every change rehearses packaging without credentials, then a human dispatches the release from a tag — and dependency-chained reviews are governed by native stack objects; see the [framework paradigm](../paradigm.md) overview.

## Mechanisms in this layer

- [mechanisms/issue-state-machine.md](../mechanisms/issue-state-machine.md) — the event-driven work-item lifecycle: policy code loads from the default branch, and event data is input only
- [mechanisms/pr-classification.md](../mechanisms/pr-classification.md) — native Issue Types as the classification authority driving labels and process routing
- [mechanisms/stacked-pr.md](../mechanisms/stacked-pr.md) — dependency-chained reviews governed by native stack objects: rewrites use `--force-with-lease`, and verification completes after every publish
- [mechanisms/release-double-gate.md](../mechanisms/release-double-gate.md) — every change rehearses packaging without credentials, and a human dispatches the release from a tag

## Porting analysis

The release double gate applies at every tier and is this layer's one zero-cost adoption: a credential-free packaging rehearsal job plus a manual dispatch step. The issue lifecycle machinery, native type classification, and stack-based reviews presuppose a repository whose work already runs through that platform's full process; smaller setups have no corresponding problem to solve. This layer's reference configurations — the workflow definitions and the issue policy — are restored in milestone M3 under `reference/github/`.
