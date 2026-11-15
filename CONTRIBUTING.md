# Contributing

English | [中文](CONTRIBUTING.zh.md)

This repository is a governance corpus: documents and gate scripts are the product, so most contributions change documentation, gates, or Agent Notes rather than application code. The constraint system in [AGENTS.md](AGENTS.md) binds every change; [docs/development.md](docs/development.md) owns the setup tutorial and the daily workflow.

## What a change carries

Documentation accompanies every change: update the affected pages and contracts in the same PR ([documentation standard](docs/AGENTS.md)). A bilingual pair updates both sides together, then re-records its sidecar with `pnpm run verify-translation-pairing --write <en-path>` ([pairing contract](docs/i18n/README.md)); word budgets hold ([budgets](docs/AGENTS.md#wordcount-budgets)). Select the evidence that covers the changed surface per [docs/testing.md](docs/testing.md) and the [pre-push-checks](.agents/skills/pre-push-checks/SKILL.md) skill.

## Before you push

Run the checks that cover your diff: `pnpm run doc-sync` for corpus changes, the owning Vitest spec for gate changes. Never silence a gate — a red gate marks a defect or a rule that must change, not an obstacle to route around.

## Issues and pull requests

Open issues and pull requests on [GitHub](https://github.com/PeixuanLi/dsh-agents-charter).
