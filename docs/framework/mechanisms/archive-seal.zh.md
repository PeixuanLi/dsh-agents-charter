# 归档封存对照 git 基线

[English](archive-seal.md) | 中文

- 所属层：[L3 — 机器验证](../layers/l3-machine-verification.zh.md)
- 管辖范围：冻结的归档 manifest（元数据清单）对照 git HEAD 基线，因此移除需要一个显式且公开的迁移动作。

## 规则正文

归档格式、三件套与不可变 manifest 的辅助逻辑在 [scripts/archived-agent-notes.ts](../../../scripts/archived-agent-notes.ts)；sha256 manifest 只追加，校验从 git 读取基线——`DSH_ARCHIVE_BASE_REF` 指定引用，默认 `HEAD`（CI 提供其可信的变更前提交）。封存把现存内容与基线封存的内容对比：任何变化或缺失的 hash 都会失败，归档历史因此无法被无声改写。

## 执法

`pnpm run verify-archived-agent-notes`（[scripts/verify-archived-agent-notes.ts](../../../scripts/verify-archived-agent-notes.ts)）只向前扩展 manifest，对任何基线不背书的封存失败。移除仍有形状：一次深思熟虑的批量移除以一条公开的 `--no-verify` 提交落地，封存随后改守新基线——本仓库自己瘦身为骨架时正是这样做的。

## 成本与前提

仅追加的 manifest 加上永不触碰已封存文件的纪律；除此之外的成本都属于[归档冻结](../mechanisms/archive-freeze.zh.md)，不属于封存本身。基线读取让移除成为一个决策而不是一次编辑——只要冻结历史需要挺过人员更替，它就物有所值。

## 档位建议

Solo ✗ · Small ✗ · Medium ✓ · Large ✓

## 移植清单

- 归档时封存：`pnpm run verify-archived-agent-notes --write`；既有封存永不改变。
- CI 中从可信引用读取基线：设置 `DSH_ARCHIVE_BASE_REF`；本地默认以 `HEAD` 为基线。
- 把移除当作迁移：一条公开的批量移除提交，封存随后改守新基线。
- 验证：`pnpm run verify-archived-agent-notes`。

## 失效模式

不能对照的基线把封存降级为自我报告：manifest 只说最后一位写入者写了什么，被删除或被改写的产物照样通过那道声称保护它的门禁。旁路不可见——门禁恰好在历史被抹除时保持绿色。
