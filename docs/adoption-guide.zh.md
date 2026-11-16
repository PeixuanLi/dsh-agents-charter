# 采纳指南

[English](adoption-guide.md) | 中文

本指南面向三类读者——开发者、开发负责人与项目经理——用一页讲清楚：本章程解决什么问题、仓库里有什么、各机制落在软件开发的哪个阶段、同一套机制如何服务 AI 辅助运营、Claude Code 与 OpenCode 如何共用同一规则源、以及按什么顺序采纳。本文只做地图；每个事实的归属页都在链接的另一端。

## 场景、能力与依赖

场景：团队让 AI coding agent（编程智能体）产出代码、文档与评审。原本约束人的协作规则——谁必须批准、PR（Pull Request）里该有什么、哪些检查必须通过——以默契形式存在：口头约定、埋在聊天记录里的决定、个人清单。agent 继承不到这些默契，而 agent 的自述（"测试通过了、文档更新了"）也不构成证据。本章程 `dsh-agents-charter` 把这些规范变成机器可执行的约束：AI 产出，人类裁决，门禁执法，Agent Note 留存每条规则背后的理据。每条规则最终都是一条能让 CI 变红的命令。

仓库包含三个部分：

- 规范层——[docs/framework/](framework/README.zh.md)：框架范式、五个层章节、22 张机制卡片，以及 P0–P3 采纳 profile。
- 执行面（活参照）——`scripts/` 治理门禁、根目录 [AGENTS.md](../AGENTS.md) 规则体系、[Agent Note](../.agents/notes/README.zh.md) 语料，以及 `.agents/skills/` 下的 skill（技能）。
- 参照附录——[reference/github/](../reference/github/README.md)：逐字节恢复的上游 workflow（工作流）配置，覆盖加权评审、issue 生命周期与发布双闸。

依赖按活动匹配：

| 活动 | 需要 |
|---|---|
| 阅读规范层 | 一个 Markdown 阅读器，别无其他 |
| 运行本仓库的门禁 | git、Node.js >= 24.9、pnpm 11——不需要模型凭据，不需要 API key |
| 在规则下运行 agent | 任何读取 AGENTS.md 或 CLAUDE.md 的 coding agent，例如 Claude Code、OpenCode、Codex |
| 部署 P3 GitHub 机制 | 带 Issue Types 的 GitHub Issues 与 Projects、一个 GitHub App、仓库变量与 secrets；blame 分类 lane 需要 Python 3.10 |

## 贯穿软件开发各阶段

采纳以机制为单位。下表把每个开发阶段放进框架中定位；细节由链接的归属页承载。

| 阶段 | 在这里运行什么 | 归属页 |
|---|---|---|
| 规划 | 决策落成 Agent Note；工作项沿事件驱动的 issue 生命周期流转 | [第 5 层 — 流程自动化](framework/layers/l5-process-automation.zh.md)、[第 2 层 — 外部记忆](framework/layers/l2-external-memory.zh.md) |
| 实现 | 常驻规则经 AGENTS.md 树在每个会话生效；流程按需以 skill 加载 | [第 4 层 — 指令分层](framework/layers/l4-instruction-layering.zh.md) |
| 验证 | 门禁验证世界状态而不是 agent 的自述；本地只跑窄集，CI 拥有完整矩阵 | [第 3 层 — 机器验证](framework/layers/l3-machine-verification.zh.md) |
| 评审 | 每个 PR 一种变更 kind，area 多选；较大团队加上加权评审公式 | [PR 分类](framework/mechanisms/pr-classification.zh.md)、[加权评审](framework/mechanisms/weighted-review.zh.md) |
| 发布 | 每次变更先无凭证演练打包；发布由人从 tag 手动触发 | [发布双闸](framework/mechanisms/release-double-gate.zh.md) |
| 维护 | 事故产出事故复盘（postmortem）；笔记被删除或归档，语料保持信噪比 | [事故复盘](postmortem/README.zh.md)、[删除优先](framework/mechanisms/delete-first.zh.md) |

本仓库内的日常工作流由[开发指南](development.zh.md)承载。

## 在 AI 辅助运营中

同一套角色分离也治理运营已上线应用的 agent。边界是：本章程治理运营周边的 agent 与流程——它不提供监控、告警或数据管道。应用到运营闭环，你得到：

- 反馈入口——缺陷与功能报告经 issue 表单进入，由从默认分支加载的策略代码按事件推动状态；agent 可以起草与分诊，人类裁决优先级（[issue 状态机](framework/mechanisms/issue-state-machine.zh.md)）。
- 事故学习——agent 起草事故复盘，人类拥有结论，固定结构让每次事故可对照（[事故复盘](postmortem/README.zh.md)）。
- 变更安全——运营变更走同一套评审与发布机制：加权评审量化关键区域必须由谁批准，每次变更在发布前演练打包（[加权评审](framework/mechanisms/weighted-review.zh.md)、[发布双闸](framework/mechanisms/release-double-gate.zh.md)）。
- 内容运营——面向用户的文档与 runbook 置于同样的 Markdown 门禁之下，链接可解析、结构不走样；双语配对只在翻译产能可持续时适用（[双语配对](i18n/README.zh.md)）。
- 知识留存——超出事故本身的决策落成 Agent Note，删除陈旧笔记是常规动作（[Agent Note](../.agents/notes/README.zh.md)、[删除优先](framework/mechanisms/delete-first.zh.md)）。

## Claude Code 与 OpenCode 共用同一规则源

一个人同时用两个工具，不需要维护两套规则。根目录 `AGENTS.md` 是唯一规则源；`CLAUDE.md` 是指向它的符号链接，因此所有读取 AGENTS.md 的工具（包括 OpenCode）与读取 CLAUDE.md 的工具（Claude Code）加载完全相同的规则。`.claude/skills` 符号链接进一步把 skill 层共享给 Claude Code；不读它的工具只是忽略它。

```sh
ln -sf AGENTS.md CLAUDE.md
mkdir -p .claude && ln -sfn ../.agents/skills .claude/skills
```

验证符号链接到位：`git ls-files -s CLAUDE.md` 必须显示 mode `120000`（Windows 需要 `core.symlinks=true` 与开发者模式）。永远编辑 `AGENTS.md`，绝不编辑 `CLAUDE.md`。完整清单见[机制卡片](framework/mechanisms/agents-md-symlink.zh.md)。

两个工具从不共享会话——它们共享仓库。无论哪个工具接手任务，加载的是同一套常驻规则，通过的是同一批门禁，因此任务可以从一个工具开始、在另一个工具收尾。验收由门禁与人类评审决定，从不由工具自述决定；这正是让 agent 成为可替换的常量而非稀缺变量的原因（[第 1 层 — 角色分离](framework/layers/l1-role-separation.zh.md)）。

## 采纳阶梯

按顺序采纳：前一档的习惯是后一档的前提，跳级引入的是执法，却没有它所预设的习惯（[profile](framework/profiles.zh.md)）。

1. **P0 — 原则，无脚本。** 一份短规则的 `AGENTS.md`、`CLAUDE.md` 符号链接、一份人工评审清单。验收：规则常驻每个会话，清单在评审中执行。
2. **P1 — 脚本级。** Markdown 门禁、以目录路径编码的笔记生命周期、一条聚合命令的门禁运行器，以及每次变更的打包演练。
3. **P2 — 工程级。** 笔记格式门禁、强制的 `Alternatives considered` 小节、只紧不松的逐文件字数预算棘轮、归档冻结、文风卫生，以及——仅在翻译产能可持续时——双语配对。
4. **P3 — 平台机制。** 加权评审、issue 状态机、PR 分类与 stacked PR，在 GitHub App、secrets 与稳定成员就位后从[参照配置](../reference/github/README.md)部署。

上阶梯前先读 profile 页的警告：没有双语人力的双语配对是僵尸税，没有删除优先纪律的覆盖率门禁会成为负担，与组织规模不匹配的重型流程会空转。单人开发者通常停在 P1；P3 机制在成员稳定、流转量真实的中型团队才开始产生收益。
