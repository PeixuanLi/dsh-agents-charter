# Agent Note: Port the issue mechanism to a personal account

Status: implemented

English | [中文](2026-11-16-port-issue-management-personal.zh.md)

## Problem

The restored issue-management engine resolves its Projects board through `organization(login:)` and `repository(owner:)` with one shared owner, so it deploys as-is only where the repository and the board sit under one organization. This repository lives under a personal account with a user-level board (`PeixuanLi` project #1), and the P3 profile's issue mechanisms were to run live here, not only as reference material.

## Decision

The issue mechanism is deployed at `.github/issue-management/` (engine, configuration, both issue workflows, the issue forms, and the pull-request template), copied from [reference/github/](../../../../reference/github/README.md) and adapted for the personal account. `github.mjs` looks the board up through `user(login:)` and reads `data.user?.projectV2` — the single structural change; REST paths and `repository(owner:)` accept a user owner unchanged. `config.json` carries the deployed values: `PeixuanLi`/`dsh-agents-charter`, project #1 titled `dsh-agents-charter-project`, `lifecycleActor` `hello-issue-management` (the App slug; the suite pins the bare-slug actor comparison at `rules.mjs`), the unchanged field names, `Asia/Shanghai`, and the seven statuses. Both workflows' `create-github-app-token` pins read `PeixuanLi`/`dsh-agents-charter`. The test fixtures follow the deployed values — the GraphQL response shape under `user:`, the board title, the REST paths, and the actor literal — and the suite runs 51/51 from the repository root, including the template-skill alignment test that the appendix mapping cannot resolve. The appendix keeps the canonical upstream bytes and links here for the deployed adaptation.

## Alternatives considered

**Deploy under an organization with the engine unchanged.** Rejected for this port: it requires moving the repository and creating an organization-level board to satisfy the shared-owner lookups, a migration cost the personal-account deployment avoids for one structural line.

**Mint the board token from a personal access token instead of a GitHub App.** Rejected: it replaces scoped, revocable App credentials with a long-lived user token, and `lifecycleActor` protection keys on the App bot actor rather than a user login.

## Consequences

The deployed tree drifts from the reference bytes by design; the reference appendix remains the canonical upstream copy, and future upstream syncs must re-apply the `user(login:)` adaptation. Two facts verify only at first run and stay open until then: the App slug's exact casing for `lifecycleActor`, and whether the App-token path can read a user-level board — `create-github-app-token` fails loud if the App lacks a requested permission, and the `permission-organization-projects: read` pin in `issue-policy.yml` is part of that verification. The `Issue policy` check runs on pull requests before the repository variable and secret exist, so it fails until `DSH_ISSUE_APP_CLIENT_ID` and `DSH_ISSUE_APP_PRIVATE_KEY` are set; making it a required check belongs to branch protection after the first green run. What the port buys: the P3 issue mechanisms run live on this repository, and the appendix has its first full port rehearsal.

## Testing

`node --test .github/issue-management/policy.test.mjs` passes 51/51 from the repository root in the deployed layout, covering the adapted lookup, the deployed configuration values, and the workflow permission-line assertion. First-run verification of the live path — a changes-requested review firing the `In review` → `In progress` retreat — pins the actor comparison and the App board access.
