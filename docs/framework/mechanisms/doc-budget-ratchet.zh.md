# 逐文件字数预算与只紧不松的棘轮

[English](doc-budget-ratchet.md) | 中文

- 所属层：[L4 — 指令分层](../layers/l4-instruction-layering.zh.md)
- 管辖范围：制度化文本的体量是受治理的资源——每份纳入预算的文档都有字数上限，上限只向下移动，没有正当理由不得上调。

## 规则正文

纳入预算的文件及其上限记录在 `scripts/doc-budgets.manifest.json` 中。[AGENTS.md](../../../AGENTS.md#editing-these-instructions) 拥有编辑规则：清晰度允许时就压缩；只有当必需内容确实需要更多空间时才上调上限，并在 PR（Pull Request）中记录理由。默认方向朝下：文档每次变短，上限随之收紧，收紧时保留约 5% 的余量——这是 manifest（元数据清单）容许的松弛量；向上移动只走上文那条有理由的上调。当前 manifest 预算常设文档：指令文件（根目录与 docs/）、架构概述、Cordis 入门、测试策略，以及框架自身页面（README、范式、profile 与五个层章节）。

## 执法

`pnpm run verify-doc-budgets`（[scripts/verify-doc-budgets.ts](../../../scripts/verify-doc-budgets.ts)）持有机械的一半：按 `wc -w` 口径统计每份在册文件的字数与上限对比，超过上限即失败；文件缺失同样失败，因此重命名或删除预算内文档必须在同一变更中更新 manifest。`--list` 报告用量与上限的对比。约定的一半——棘轮方向与上调理由——在评审时守住，不在门禁里。

## 成本与前提

每份常设文档一条 manifest 记录，外加「文本放在哪里」的取舍纪律——上限让迁移比堆积更便宜。文档尚未争夺上下文时不值得启动：从第一份常驻文件开始，而不是事后给既有语料补配额；个人作者可以把 manifest 推迟到第二份常设文档出现时再建。

## 档位建议

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## 移植清单

- 把每份常设文档登记进 `scripts/doc-budgets.manifest.json`，上限取当前字数。
- 文档每次变短就收紧上限；棘轮只有真的被推动才起作用。
- 只有先压缩并在 PR 中给出理由，才上调上限。
- 查看用量：`pnpm run verify-doc-budgets --list`。

## 失效模式

没有棘轮，上限只会上移：每个需要多写三个词的 PR 都把预算抬高一点，常驻层随历史线性膨胀，上下文经济被侵蚀，直到常设规则挤掉 agent（智能体）每次会话真正需要的东西。
