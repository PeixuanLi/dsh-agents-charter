# dsh-agents-charter

English | [中文](README.zh.md)

`dsh-agents-charter` is the agents collaboration charter: collaboration norms that lived as human tacit understanding, reduced to machine-executable constraints — AI agents produce, humans decide, gates enforce. Every rule ends as a command that can turn CI red, and the rationale behind every rule stays in the repository. The repository is extracted from DeepSeek Harness as a living reference implementation with two planes: the execution plane enforces the constraints, and the spec layer specifies them.

## What is inside

| Part | Contents |
|---|---|
| Spec layer | [docs/framework/](docs/framework/README.md) — the framework paradigm, five layer chapters, 22 mechanism cards, and adoption profiles P0–P3 |
| Execution plane | The `scripts/` governance gates run through one aggregate, the `AGENTS.md` constraint system, the Agent Notes corpus under `.agents/notes/`, and the skills under `.agents/skills/` |
| Reference appendix | [reference/github/](reference/github/README.md) — the upstream L1/L5 GitHub-process configurations, restored byte-exact |

## Quick start

```sh
pnpm install        # Node.js >= 24.9, pnpm 11
pnpm run doc-sync   # expect all governance gates green
pnpm run test       # expect the full spec suite green
```

The tree has no build step, and nothing in it reads model credentials — no API key is needed.

## Start reading

Start at the [spec layer](docs/framework/README.md), continue with the [framework paradigm](docs/framework/paradigm.md), then pick an adoption tier in the [profiles](docs/framework/profiles.md). To contribute constraints to the execution plane, read [AGENTS.md](AGENTS.md); the [development guide](docs/development.md) owns the daily workflow.

## Sources and related

This charter derives from [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness); the reference pages and the reference skills inside keep their upstream text. [ai-mono-template](https://github.com/PeixuanLi/ai-mono-template) is a JS monorepo instance built on the same paradigm.

## License

[MIT](LICENSE)
