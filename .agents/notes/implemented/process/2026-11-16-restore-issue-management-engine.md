# Agent Note: Restore the issue-management engine into the reference appendix

Status: implemented

English | [中文](2026-11-16-restore-issue-management-engine.zh.md)

## Problem

The appendix restored the two issue workflows (`issue-lifecycle.yml`, `issue-policy.yml`) from revision `fcc0ad4621` but not the `.github/issue-management/` engine they invoke, so the enforcement behind the issue-state-machine and pr-classification cards existed in the reference set only as workflow configurations without the code they call. The exclusion had no recorded rationale — the restoration commit listed what came in, not what stayed out and why; the likely reasons, org-specific pins and the engine's bulk, were never written down. The P3 acceptance sentence in `docs/framework/profiles.md` therefore delegated the gap to the porter and left the restore an open decision.

## Decision

The complete engine tree — 11 files, 97,737 bytes — is restored byte-exact from `fcc0ad4621` under `reference/github/issue-management/`, verified by comparing each file's Git blob hash against the upstream tree. The appendix's restoration principle holds unchanged: `fcc0ad4621` is simultaneously the newest revision of every engine file (no upstream commit touches the tree after it), so the restore opened no exception. The appendix README now names the porter's operational prerequisites — the GitHub App keyed to `config.json`'s `lifecycleActor`, the org pins in the engine and both workflows, the repository Issue Types, the label set, and the Projects board with its Status and Priority fields — and the P3 acceptance sentence names the App and org pins instead of a missing engine.

## Alternatives considered

**Keep the engine out and record only the exclusion rationale.** Rejected because the reference set would stay incomplete and the P3 acceptance would keep naming a tree the porter must reconstruct from the upstream repository, which lives outside this extraction's preserved history.

**Restore without the 48,163-byte test.** Rejected because it breaks byte-exactness, opens an exception to the appendix principle, and drops the keyless suite a porter runs first.

**Defer to the M4 standalone extraction.** Rejected because M4 has no date and re-decides the appendix anyway; reference material carries no runtime cost in this repository, so waiting buys nothing.

## Consequences

The appendix grows from 224K to 322K, and the engine's bilingual README pair sits outside translation-pairing scope under the existing `reference/**` exclusion. Fifty of the engine suite's fifty-one tests run green from the repository root; the one failure is the alignment test that resolves the repository root at the upstream `.github/` depth, one directory level above the appendix mapping, and the appendix README documents it. What the restore buys: the L5 reference set is complete, both P3 cards' enforcement ships in-tree, and a porter copies one tree instead of reverse-engineering which files the workflows invoke.
