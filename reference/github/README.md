# GitHub process reference appendix

This tree is the L1/L5 GitHub-process reference configuration set of the upstream DeepSeek Harness: weighted review ownership, the issue policy lifecycle, the pull-request and issue templates, and the dsh release packaging workflow. The 22 files were restored byte-exact from revision `fcc0ad4621` — the last full tree before the skeleton strip, and simultaneously the newest revision of every file. Upstream they live under `.github/`; here `reference/github/<path>` corresponds to `.github/<path>`.

The tree is pure reference material. Nothing here is wired into this repository's CI or gates, and none of it is part of the governed corpus; it has the same status as the 16 reference-corpus skills under `.agents/skills/`, each marked with the "reference corpus material" banner. Files keep their upstream bytes, so they name upstream paths and scripts that do not exist in this tree.

## Contents

- Weighted review ownership (14 files): `workflows/weighted-approval.yml` and `workflows/weighted-approval-review-event.yml`, plus the 12 files of `review-ownership/` — the approval publisher and its tests (`check-approval.mjs`, `check-approval.test.mjs`), the scoring policy (`approval-policy.json`), blame classification and author credit (`blame-ownership.mjs`, `blame-ownership.test.mjs`, `blame-production.py`, `test_blame_production.py`, `author-weight.mjs`, `author-weight.test.mjs`), `requirements.txt`, `.gitignore`, and `README.md`.
- Issue process (7 files): `workflows/issue-lifecycle.yml`, `workflows/issue-policy.yml`, `pull_request_template.md`, and the four issue forms under `ISSUE_TEMPLATE/` (`bug.md`, `feature.md`, `task.md`, `config.yml`).
- Release (1 file): `workflows/release.yml`.

## Porting prerequisites

Each entry below names what a porter must supply beyond copying files; none of it exists in this tree.

- **`workflows/weighted-approval.yml` and `workflows/weighted-approval-review-event.yml`**: a GitHub App holding only `checks: write`, wired as `vars.DSH_APPROVAL_APP_CLIENT_ID`, `vars.DSH_APPROVAL_APP_SLUG`, and `secrets.DSH_APPROVAL_APP_PRIVATE_KEY`; a reviewer permission model in which counted reviewers hold repository `write` or `admin`; Python 3.10 with the Pygments lexer lane (`review-ownership/requirements.txt`) for blame classification; and the two-workflow event pattern kept intact — `pull_request_target` does not fire on `pull_request_review`, so the zero-permission `weighted-approval-review-event` stub is the only bridge from a review event to the trusted default-branch publisher: the stub records `pull_request_review` events, and its `workflow_run` completion re-triggers the publisher.
- **`review-ownership/approval-policy.json`**: encodes six specific reviewer logins (`07akioni`, `imccyu`, `tianyicui`, `tianyicui-bot`, `turtle1999`, `turtle2099`), and both approval workflows pin the token's `owner`/`repositories` to `deepseek-harness`. These org-specific values must be rewritten when porting.
- **`workflows/issue-lifecycle.yml` and `workflows/issue-policy.yml`**: hard-depend on the not-restored `.github/issue-management/` engine (`policy.mjs`, `rules.mjs`, `github.mjs`, `lifecycle.mjs`, `pull-request.mjs`, `config.json` — 11 files, 97,737 bytes upstream, including a 48,163-byte test) and on a GitHub Project App (`vars.DSH_ISSUE_APP_CLIENT_ID`, `secrets.DSH_ISSUE_APP_PRIVATE_KEY`). A porter needs both the engine tree and the App.
- **`pull_request_template.md`**: references the `dsh-pr-description` skill (restored in this repository at `.agents/skills/dsh-pr-description/`) and the external ai-declaration badge specification site. The template body is authored in Chinese, as upstream.
- **`workflows/release.yml`**: references the not-restored `release-publish.yml` (manual publication), build scripts that no longer exist in this tree (`release:verify`, `build:official`, `release:pack`, `release:verify-packed-install`, `verify-package-dependencies`, `verify-npm-install-layout`), the `vars.DSH_CI_FAILOVER_LINUX` runner-selection variable, and the `DSH_TELEMETRY_DISABLED` environment. Its mechanism is a credential-free packaging dry-run on every pull request and master push; publication happens by manually dispatching `release-publish.yml` from a `dsh-v*` tag.
- **CODEOWNERS**: no CODEOWNERS file exists anywhere in the upstream repository; there is nothing to port.

## Running the review-ownership tests

A porter can run the restored test suites directly. These commands are not wired into this repository's gates.

```sh
node --test 'reference/github/review-ownership/*.test.mjs'
```

```sh
pip install -r reference/github/review-ownership/requirements.txt
python -m unittest discover -s reference/github/review-ownership -p 'test_*.py'
```

The `.mjs` suites need only Node; on Node 24 the directory form of `node --test` is rejected as a module path, so pass the glob. The Python lane needs Python 3.10 and installs Pygments from `requirements.txt`.
