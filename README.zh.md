# dsh-agents-charter

[English](README.md) | 中文

`dsh-agents-charter` 是 Agents 协作章程：把此前依赖人类默契的协作规范转化为机器可执行的约束——AI 产出，人类裁决，门禁执法。每条规则最终都是一条能让 CI 变红的命令，每条规则背后的理据都留在仓库里。本仓库从 DeepSeek Harness 抽出，作为活的参照实现，具有两个面：执行面执行约束，规范层陈述约束。

## 内容一览

| 部分 | 内容 |
|---|---|
| 规范层 | [docs/framework/](docs/framework/README.zh.md)：框架范式、五个层章节、22 张机制卡片，以及采纳 profile（P0–P3） |
| 执行面 | `scripts/` 治理门禁经由一条聚合命令运行、`AGENTS.md` 约束体系、`.agents/notes/` 下的 Agent Note 语料，以及 `.agents/skills/` 下的 skill（技能） |
| 参照附录 | [reference/github/](reference/github/README.md)：上游 L1/L5 GitHub 流程配置，逐字节原样恢复 |

## 快速开始

```sh
pnpm install        # Node.js >= 24.9, pnpm 11
pnpm run doc-sync   # expect all governance gates green
pnpm run test       # expect the full spec suite green
```

本树没有构建步骤，也没有任何脚本或 skill 读取模型凭据——不需要 API key。

## 开始阅读

[采纳指南](docs/adoption-guide.zh.md)用一页为开发者、开发负责人与项目经理定位。从[规范层](docs/framework/README.zh.md)入手，接着读[框架范式](docs/framework/paradigm.zh.md)，再在[采纳 profile](docs/framework/profiles.zh.md) 中选择档位。要为执行面贡献约束，请阅读 [AGENTS.md](AGENTS.md)；日常工作流见[开发指南](docs/development.zh.md)。

## 来源与相关

本章程派生自 [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)；仓内的参照页面与参照 skill 保留上游原文。[ai-mono-template](https://github.com/PeixuanLi/ai-mono-template) 是基于同一范式构建的 JS monorepo 实例。

## 许可证

[MIT](LICENSE)
