# 常驻规则与按需 skill（技能）

[English](instruction-layering.md) | 中文

- 所属层：[L4 — 指令分层](../layers/l4-instruction-layering.zh.md)
- 管辖范围：规则正文如何在常驻文件（每次会话加载）与按需 skill（触发时加载）之间切分——上下文预算成为一种受治理的资源。

## 规则正文

[AGENTS.md](../../../AGENTS.md) 开头只承载常设规则：每条一到三行，并链接其归属文档获取细节。只在触发时适用的流程放在 skill 里——每个 `SKILL.md` 以 frontmatter 的 `description` 开篇，写明精确的触发条件，工具只在该条件成立时才加载正文。同样的分层也治理 Agent Note：常驻文件只保留一行规则——只为持久的决策理据写 Agent Note——完整规则由 [notes README 的「何时需要写一份」一节](../../../.agents/notes/README.zh.md#when-to-write-one)承载。

## 执法

`pnpm run verify-skill-invocation-metadata`（[scripts/verify-skill-invocation-metadata.ts](../../../scripts/verify-skill-invocation-metadata.ts)）保持两个工具命名空间一致：skill 的 Claude 侧调用策略（`disable-model-invocation`、`user-invocable`）必须与 Codex 侧策略（`policy.allow_implicit_invocation`）一致，因此没有任何 skill 以不同方式暴露给不同工具。`description` 是否写出了精确触发条件仍属评审判断——门禁检查结构，不检查措辞。

## 成本与前提

仓库之外没有任何成本。常驻层在每次会话支付它的字数，这正是它必须保持简短的原因；按需层在触发之前不产生任何成本。

## 档位建议

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## 移植清单

- 把超过三行的规则移出常驻文件，放进归属文档，原处留下链接。
- 为每项流程创建 skill，其 `description` 写明何时调用；只点名主题的 description 不是触发条件。
- 保持跨工具策略一致：`pnpm run verify-skill-invocation-metadata`。
- 工作流每次变化后重读常驻文件——只适用于某一类任务的内容是触发项，不是常设指令。

## 失效模式

流程细节囤积进常驻文件，让每次会话为通常用不上的上下文缴税；埋在 skill 正文里的规则永远不会加载，因为触发条件从不成立。两个方向都无声地失败——要么会话付费，要么规则缺席，任何地方都没有报错。
