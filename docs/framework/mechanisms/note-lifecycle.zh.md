# 以目录路径编码的笔记生命周期

[English](note-lifecycle.md) | 中文

- 所属层：[L2 — 外部化记忆](../layers/l2-external-memory.zh.md)
- 管辖范围：决策理据沿 `proposed → implemented` 流转，`rejected` 与 `archived` 是终态，全部编码在路径中。

## 规则正文

[notes README 的「布局与命名」一节](../../../.agents/notes/README.zh.md#layout-and-naming)定义了两个维度，都编码在路径 `{lifecycle}/{class}/yyyy-mm-dd-topic-title.md` 中：生命周期文件夹是状态，笔记随状态变化在文件夹之间移动；类别文件夹是决策的种类，取自 `scripts/agent-note-tree.ts` 中的封闭集合。文件名中的日期是该主题首次提出的时间，以 git 历史为准。笔记之间的交叉引用使用相对 Markdown 链接，从不使用纯文字或编号，因此既可机械检查，也能在文件夹之间移动时保持有效。

## 执法

`pnpm run verify-agent-note-classification`（[scripts/verify-agent-note-classification.ts](../../../scripts/verify-agent-note-classification.ts)）遍历目录树，拒绝封闭生命周期/类别集合之外的路径——包括旧家目录（`docs/rfc/`、`docs/rfcs/`），它们保持禁止状态，新笔记无法无声逃出这棵树。

## 成本与前提

四个状态目录加一份封闭类别清单。只要不止一个人或会话写笔记，这套结构就开始产生回报；在那之前，个人作者可以把它塌缩为单目录模板。

## 档位建议

Solo ✗ · Small ✓ · Medium ✓ · Large ✓

## 移植清单

- 创建四个状态目录：`mkdir -p .agents/notes/{proposed,implemented,rejected,archived}`。
- 命名遵循 `{lifecycle}/{class}/yyyy-mm-dd-topic-title.md`，日期取 git 历史中的首次提出时间。
- 类别只从封闭集合（`feature`、`bug-fix`、`simplification`、`architecture`、`process`、`testing`）中选取；新增类别要在同一变更中同时更新门禁与 README 小节。
- 笔记之间用相对 Markdown 链接交叉引用，从不使用纯文字或编号。
- 验证：`pnpm run verify-agent-note-classification`。

## 失效模式

没有状态纪律，笔记树退化成无序日志：新提案、已交付决策与被否决的想法并肩而立，没有读者能分辨哪些结论仍然现行，同一个提案被反复重审，因为它的否决记录埋在无法区分的某处。
