# 强制携带 `Alternatives considered` 小节

[English](note-alternatives.md) | 中文

- 所属层：[L2 — 外部化记忆](../layers/l2-external-memory.zh.md)
- 管辖范围：决策记录必须写明打败过什么——每份笔记都携带 `Alternatives considered` 小节。

## 规则正文

[notes README 的「文件格式」一节](../../../.agents/notes/README.zh.md#the-file-format)把 `## Alternatives considered` 放进每个生命周期的骨架：每个真实存在过的备选方案及其落选原因，每个方案一段加粗引导的段落，争议较大的方案各写一个 `### Why not <X>?` 子节。备选方案是记录下来的，不是凭空编造的。记录决策时不写它击败了什么，就是在邀请反复争论——这正是 Agent Note 要防止的失败。格式规范之前的老笔记若无法重建当时的备选方案，就用那个精确注释代替该章节，门禁仅对格式规范之前的文件接受它。

## 执法

`pnpm run verify-agent-note-format`（[scripts/verify-agent-note-format.ts](../../../scripts/verify-agent-note-format.ts)）拒绝缺失该小节的笔记——除非携带那个精确注释，而注释只在格式采纳日期之前有效。

## 成本与前提

写作本身之外没有成本：备选方案在做决策时就权衡过了，小节只是趁理据还新鲜时把它们落进记录。

## 档位建议

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## 移植清单

- 把 `## Alternatives considered` 放进笔记模板，位于决策与后果之间。
- 每个备选方案写一段加粗引导的段落：它是什么、为何落选。
- 争议较大的备选方案单独写一个 `### Why not <X>?` 子节。
- 验证：`pnpm run verify-agent-note-format`。

## 失效模式

不写备选方案的记录会招致重新翻案：同一个落选的论证以新笔记的身份回来，被看不到它曾经落选的人重新评审，辩论每个周期都以全额成本重复一次。
