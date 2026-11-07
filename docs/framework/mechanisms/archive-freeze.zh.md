# 归档即冻结

[English](archive-freeze.md) | 中文

- 所属层：[L2 — 外部化记忆](../layers/l2-external-memory.zh.md)
- 管辖范围：归档即冻结——sha256 manifest（元数据清单）仅追加，归档内容永不修改，也不作为现行权威引用。

## 规则正文

[归档笔记的 AGENTS.md](../../../.agents/notes/archived/AGENTS.md) 固定了封存动作：归档变更只允许迁移完整三件套、在两行状态行下方插入相同的 `Archived: YYYY-MM-DD` 行、重录伴随记录、修复或删除入站链接——除此之外什么都不能做。每个被封存产物的 sha256 进入 `archived/manifest.json`，manifest 只会增长。被封存的产物是冻结的历史快照，不是现行权威：文档门禁跳过归档源文件（包括其中的出站链接），活跃正文只在有意引用历史时链接到归档笔记。

## 执法

`pnpm run verify-archived-agent-notes`（[scripts/verify-archived-agent-notes.ts](../../../scripts/verify-archived-agent-notes.ts)）校验封闭类别树、完整三件套、归档元数据与伴随记录 hash，并且只向前扩展 manifest：它从 git HEAD 读取基线 manifest（CI 提供其可信的变更前提交），因此任何被封存 hash 的变化或缺失都会失败。

## 成本与前提

只有在审计链重要的地方，冻结才物有所值——否则它就是纯粹的维护税。运行它需要仅追加的 manifest、归档时的 `--write` 封存步骤，以及永不触碰已封存文件的纪律。

## 档位建议

Solo ✗ · Small ✗ · Medium ✓ · Large ✓

## 移植清单

- 只在归档时封存：`pnpm run verify-archived-agent-notes --write` 追加新产物 hash；既有封存永不改变。
- 在两行 `Status: implemented` 下方插入相同的 `Archived: YYYY-MM-DD` 行。
- 在同一变更中迁移完整的英文/中文/伴随记录三件套；修复或删除入站链接。
- 验证：`pnpm run verify-archived-agent-notes`。

## 失效模式

可改写的历史不是历史：一旦被封存的产物可以被编辑，每个过去的决策都变得可否认，manifest 证明不了任何事。没有审计链需求的团队根本不该运行冻结；需要它却不设门禁的团队，得到的就是他们付出的历史——零。
