# Adoption guide

English | [中文](adoption-guide.zh.md)

This guide orients three readers — the developer, the development lead, and the project manager — on one page: the problem this charter solves, what the repository contains, where each mechanism sits in the development lifecycle, how the same mechanisms serve AI-assisted operations, how Claude Code and OpenCode share one rule source, and the order to adopt in. Every fact named here has an owning page; this guide only maps them.

## Scenario, capabilities, and dependencies

The scenario: a team lets AI coding agents produce code, documents, and reviews. The collaboration rules that governed humans — who must approve, what a PR contains, which checks must pass — lived as tacit understanding: verbal conventions, decisions buried in chat, personal checklists. An agent inherits none of that, and an agent's self-report ("tests pass, docs updated") is not evidence. This charter, `dsh-agents-charter`, turns those norms into machine-executable constraints: AI produces, humans decide, gates enforce, and Agent Notes keep the rationale behind every rule. Every rule ends as a command that can turn CI red.

The repository holds three parts:

- The spec layer — [docs/framework/](framework/README.md): the framework paradigm, five layer chapters, 22 mechanism cards, and adoption profiles P0–P3.
- The execution plane as a living reference — the `scripts/` governance gates, the root [AGENTS.md](../AGENTS.md) rule system, the [Agent Notes](../.agents/notes/README.md) corpus, and the skills under `.agents/skills/`.
- The reference appendix — [reference/github/](../reference/github/README.md): restored upstream workflow configurations for weighted review, the issue lifecycle, and the release double gate.

Dependencies, matched to the activity:

| Activity | Requires |
|---|---|
| Reading the spec | Nothing beyond a Markdown reader |
| Running this repository's gates | git, Node.js >= 24.9, pnpm 11 — no model credentials, no API key |
| Running an agent under the rules | Any coding agent that reads AGENTS.md or CLAUDE.md, for example Claude Code, OpenCode, or Codex |
| Deploying the P3 GitHub machinery | GitHub Issues and Projects with Issue Types, a GitHub App, repository variables and secrets; Python 3.10 for the blame-classification lane |

## Across the development lifecycle

Adoption is per mechanism. The table locates each development phase inside the framework; the linked pages own the detail.

| Phase | What runs there | Owning page |
|---|---|---|
| Planning | Decisions land as Agent Notes; work items move through the event-driven issue lifecycle | [L5 — process automation](framework/layers/l5-process-automation.md), [L2 — external memory](framework/layers/l2-external-memory.md) |
| Implementation | Standing orders are resident in every session through the AGENTS.md tree; procedures load on demand as skills | [L4 — instruction layering](framework/layers/l4-instruction-layering.md) |
| Verification | Gates verify the state of the world instead of the agent's self-report; local runs stay narrow and CI owns the full matrix | [L3 — machine verification](framework/layers/l3-machine-verification.md) |
| Review | One change kind per PR and multi-select areas; larger teams add the weighted-review formula | [PR classification](framework/mechanisms/pr-classification.md), [weighted review](framework/mechanisms/weighted-review.md) |
| Release | Every change rehearses packaging without credentials; a human dispatches the release from a tag | [Release double gate](framework/mechanisms/release-double-gate.md) |
| Maintenance | Incidents produce postmortems; notes are deleted or archived so the corpus keeps its signal | [Postmortems](postmortem/README.md), [delete-first](framework/mechanisms/delete-first.md) |

The daily workflow inside this repository is owned by the [development guide](development.md).

## In AI-assisted operations

The same role separation governs agents that operate a shipped application. The boundary: this charter governs the agents and the process around operations — it does not provide monitoring, alerting, or data pipelines. Applied to the operate loop, it gives you:

- Feedback intake — bug and feature reports arrive through issue forms and move by events under policy code loaded from the default branch; agents can draft and triage, humans decide priority ([issue state machine](framework/mechanisms/issue-state-machine.md)).
- Incident learning — an agent drafts the postmortem, humans own the verdict, and the fixed structure keeps incidents comparable ([postmortems](postmortem/README.md)).
- Change safety — operational changes ride the same review and release machinery: weighted review quantifies who must approve a hot area, and every change rehearses packaging before release ([weighted review](framework/mechanisms/weighted-review.md), [release double gate](framework/mechanisms/release-double-gate.md)).
- Content operations — user-facing documents and runbooks sit under the same Markdown gates, so links resolve and structure holds; bilingual pairing applies only where translation capacity is sustained ([bilingual pairing](i18n/README.md)).
- Knowledge retention — a decision that outlives the incident becomes an Agent Note, and deleting stale notes is routine ([Agent Notes](../.agents/notes/README.md), [delete-first](framework/mechanisms/delete-first.md)).

## Claude Code and OpenCode from one rule source

One person running both tools does not maintain two rule sets. The root `AGENTS.md` is the single rule source; `CLAUDE.md` is a symlink to it, so every AGENTS.md-reading tool (OpenCode among them) and every CLAUDE.md-reading tool (Claude Code) loads identical rules. The `.claude/skills` symlink additionally shares the skill layer with Claude Code; tools that do not read it simply ignore it.

```sh
ln -sf AGENTS.md CLAUDE.md
mkdir -p .claude && ln -sfn ../.agents/skills .claude/skills
```

Verify the symlinks landed: `git ls-files -s CLAUDE.md` must show mode `120000` (on Windows, `core.symlinks=true` plus Developer Mode). Always edit `AGENTS.md`, never `CLAUDE.md`. The full checklist lives in the [mechanism card](framework/mechanisms/agents-md-symlink.md).

The two tools never share a session — they share the repository. Whichever tool picks up a task loads the same standing orders and passes through the same gates, so a task can start in one tool and finish in another. Acceptance is decided by gates and human review, never by a tool's self-report; that is what makes the agent a replaceable constant rather than a scarce variable ([L1 — role separation](framework/layers/l1-role-separation.md)).

## The adoption ladder

Adopt in order: each rung's habits are the next rung's prerequisite, and skipping ahead imports enforcement without the habits it presumes ([profiles](framework/profiles.md)).

1. **P0 — principles, no scripts.** An `AGENTS.md` of short rules, the `CLAUDE.md` symlink, and a human review checklist. Acceptance: the rules are resident in every session and the checklist is applied in review.
2. **P1 — scripts.** Markdown gates, the note lifecycle encoded in directory paths, the gate runner as one aggregate command, and a packaging rehearsal on every change.
3. **P2 — engineering.** Note-format gates, the mandatory `Alternatives considered` section, per-file word budgets with a ratchet that only tightens, frozen archives, prose hygiene, and — only where translation capacity is sustained — bilingual pairing.
4. **P3 — platform machinery.** Weighted review, the issue state machine, PR classification, and stacked PRs, deployed from the [reference configurations](../reference/github/README.md) once the GitHub App, secrets, and stable membership are in place.

Read the warnings on the profiles page before climbing: bilingual pairing without bilingual staffing is a zombie tax, coverage gates without delete-first discipline become a burden, and heavyweight process without matching organization size spins idle. A solo developer typically stops at P1; the P3 machinery begins to pay in a stable mid-size team with real flow volume.
