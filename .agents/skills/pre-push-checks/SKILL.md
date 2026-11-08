---
name: pre-push-checks
description: Use before pushing, force-pushing, marking ready for review, or claiming checks pass on a branch in this repository, and immediately after gh stack sync publishes rewritten branches, to select the smallest tests and checks that cover the outgoing or just-published diff without reflexively running the full repository suite.
---

# Pre-push checks

Use this skill to run relevant local evidence once before a push in this repository. The sole ordering exception is `gh stack sync`, which may publish a cascading rebase before the rewritten layers can be validated; validate them immediately afterward and do not merge until the evidence passes. Git hooks are intentionally narrow: pre-commit fixes staged lint, checks staged whitespace, and validates staged translation-pairing records and archive metadata; pre-push runs only the repository typecheck. The `doc-sync` aggregate owns the repository-wide gate matrix, and CI owns exhaustive coverage and the platform matrix.

## Inspect the outgoing change

1. Confirm the checkout and branch.

```sh
git status --short --branch
git rev-parse --show-toplevel
```

2. Verify the live PR base or stack parent, fetch that ref, and inspect the complete scope against it. Never guess or assume a base; use the ref verified from current remote or stack state, and use a range from `HEAD` only when the pushed tip is `HEAD`.

```sh
git fetch origin <verified-base-ref>
git diff --stat origin/<verified-base-ref>...HEAD
```

After merging a changed base, re-run the scope inspection, reassess which behavior the combined scope can affect, and rerun only checks invalidated by the merge.

## Select relevant evidence

There is no universal local baseline beyond the hooks. Every behavior change needs the narrowest available test or gate that would fail for its regression; add broader checks only for surfaces the diff actually reaches.

When the outgoing change adds or changes a resource-owning or asynchronous test, fixture, or CI execution path, use [dsh-ci-test-reliability](../dsh-ci-test-reliability/SKILL.md) first to decide whether restoration, negative-control, quiescent-teardown, or concurrent-process evidence applies. This skill still selects the commands and avoids repeating evidence that already passed.

- **Gate or script behavior:** run the owning Vitest spec under `scripts/` or the focused test name. Add adjacent specs when a shared module (`markdown.ts`, `repo-files.ts`, `run-gates.ts`) changes; leave the full suite to CI unless the change is genuinely cross-cutting or the user requests it.
- **Documentation, Agent Notes, skills, catalogs, or doc-linked comments:** run the owning focused gate — `verify-md-links`, `verify-md-wrap`, `verify-doc-budgets`, `verify-translation-pairing`, `verify-skill-invocation-metadata`, or `verify-agent-note-format` — or the quick aggregate `pnpm run test:docs`; run the full `pnpm run doc-sync` once at PR level.
- **Bilingual pairs:** re-record each edited pair with `pnpm run verify-translation-pairing --write <en-path>`; the no-arg run validates the whole corpus.
- **TypeScript sources:** `pnpm run typecheck` and, when scripts changed, `pnpm run lint`.

Do not manually repeat a passing check merely because commit or push follows. In particular, do not run typecheck immediately before pushing solely to duplicate the pre-push hook.

Pass Vitest file and name filters directly after the script name with `pnpm run`, and check the reported selected test count before treating a filtered run as focused evidence:

```sh
pnpm run test scripts/doc-standard.spec.ts -t 'kind'
```

## Full local rehearsal

Run the complete local approximation — `pnpm run test`, `pnpm run doc-sync`, `pnpm run lint`, and `pnpm run typecheck` — only when the user explicitly requests it, while diagnosing a CI failure, or when the change spans the repository so broadly that no narrower set is credible.

## Protect history-rewriting pushes

Rebase is allowed for standalone and stacked PR branches, including after review. Before a standalone history rewrite, fetch the current remote branch and record its exact OID; publish with `--force-with-lease=<branch>:<observed-oid>` so a concurrent update aborts the push. `gh stack push` and `gh stack sync` supply lease protection for their managed branches. Raw `--force` is never allowed.

After any rewritten push, fetch the live heads again and re-audit unresolved review threads, approvals, mergeability, and checks. Commit hashes and inline-comment anchors from before the rewrite are not current evidence.

### Post-sync validation

`gh stack sync` fetches, cascade-rebases, and pushes as one operation, so it cannot place local validation between rewrite and publication. Before running it, require a clean worktree and record the official stack order and exact remote heads. After it returns:

1. Re-query every branch head and the official GitHub stack order.
2. Inspect the changed scope of every rewritten layer against its live PR base.
3. Run the relevant evidence selected by this skill for each affected layer.
4. Keep every PR unmerged and report validation as pending until all selected checks pass.

If post-sync evidence fails, leave the lease-protected published heads in place, repair the failure, validate the repair, and publish the correction. Do not claim the sync made the stack ready merely because the command succeeded.

## Handle failures

If a relevant check fails before an ordinary push, stop and fix or explain the blocker. Do not push and hope CI differs. For the post-sync exception, block the merge and follow the repair procedure above.

If a failure looks environment-specific, prove it:

- Record the exact command, failing test, and platform-specific mismatch.
- Confirm the relevant non-platform evidence.
- Prefer fixing cross-platform nondeterminism when the check is required.
- Bypass a local hook only when the user explicitly asks or agrees, and report exactly what failed and why CI is expected to differ.

## Push procedure

For ordinary and standalone rebase pushes:

1. Run the selected relevant checks once.
2. Commit normally and inspect any files changed by the pre-commit fixer before continuing.
3. Push normally, or use the exact lease for an authorized rewritten branch, so the typecheck hook runs.
4. Verify the remote ref matches local `HEAD`.

```sh
git rev-parse HEAD origin/$(git branch --show-current)
```

For GitHub PRs, inspect remote CI after the push:

```sh
gh pr checks
```

Report pending checks as pending. Inspect failures before attributing them to the branch or the environment.

When `gh pr checks` reports "no checks reported" and `/actions/runs?head_sha=<sha>` returns `total_count: 0`, read mergeability before suspecting the push or a dropped GitHub event:

```sh
gh pr view <number> --json mergeable,mergeStateStatus
```

GitHub creates no `pull_request` workflow runs while a PR is `CONFLICTING`/`DIRTY`, so the absent signal is the conflict, not infrastructure. Resolving the conflict is the only fix; empty commits, `--allow-empty` pushes, draft/ready toggles, and revert-and-restore bounces all leave `total_count` at zero and add junk history. Confirm the conflicting paths with `git merge-tree --write-tree HEAD origin/<base>` when the branch cannot be merged locally yet.

For `gh stack sync`, use the post-sync validation sequence instead of pretending the ordinary order was possible.
