# Stacked PRs rewrite under lease, and sync verifies immediately

English | [中文](stacked-pr.zh.md)

- Layer: [L5 — Process automation](../layers/l5-process-automation.md)
- Governs: dependent PR chains rewrite only with `--force-with-lease`, aborting on remote movement; `gh stack sync` is the one sanctioned publish-then-verify step and requires immediate validation.

## Rule text

Root [AGENTS.md](../../../AGENTS.md) states the convention under "Choose PR history deliberately": a pushed branch is rewritten only with `--force-with-lease` — the lease aborts the push when the remote moved underneath it — and raw `--force` is never allowed. GitHub's native stack object is the only authority for a chain's membership and order. `gh stack sync` is the single sanctioned publish-then-verify step: it fetches, cascade-rebases, and pushes as one operation, so validation cannot sit between rewrite and publication — record the stack order and exact remote heads before it runs, then re-query every head, run the affected layers' checks, and hold all merges until the evidence passes.

## Enforcement

`Convention — the pre-push checklist owns stack hygiene`. The drift surface is a pushed rewrite, which happens between commands no CI gate wraps; auditing outgoing stacks against the checklist is the natural gate when drift is first observed, and the [dsh-pre-push-checks skill](../../../.agents/skills/dsh-pre-push-checks/SKILL.md) states the sequence — lease-protected rewrites, sync followed immediately by post-sync validation, and no readiness claim before the evidence passes.

## Cost and prerequisites

The platform's native stack feature (the `gh stack` CLI) plus the discipline of validating after every sync. The cost only exists where parallel dependent work streams exist; a history without stacked dependencies gains nothing from the machinery.

## Team fit

Team fit follows the work's shape rather than headcount: wherever parallel dependent work streams exist, the lease-and-sync discipline pays for itself at any tier, including mixed human-agent teams; a linear history buys only ritual cost.

## Porting checklist

- Require the native stack object for every same-repository dependency chain, each PR based on the head branch immediately below it.
- Rewrite pushed branches only with `--force-with-lease`; treat raw `--force` as a blocked command.
- Before `gh stack sync`, require a clean worktree and record the official stack order with exact remote head OIDs.
- After sync, immediately re-query every head and the stack order, run the affected layers' checks, and hold merges until the evidence passes; on failure, repair and publish the correction on top of the published heads.
- Verify the prerequisite first: `gh stack --version` — hard-stop when the extension or server-side stack feature is unavailable.

## Failure mode

A raw `--force` destroys someone else's base: the concurrent advance the lease would have caught is overwritten silently. An unvalidated sync is the mirror failure — the rewrite ships to every downstream layer before anyone has run a check, and the break surfaces in the stack's top PR, where it is hardest to attribute.
