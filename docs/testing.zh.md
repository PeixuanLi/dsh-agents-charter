# 测试策略

[English](testing.md) | 中文

本仓库是一份治理语料：文档与门禁脚本本身就是产出。文档门禁验证语料，Vitest spec（测试文件）验证门禁。命令见根目录 [AGENTS.md](../AGENTS.md)。

## 档位

- **门禁 spec**（`pnpm run test`）：vitest 运行与门禁实现同目录的 `scripts/**/*.spec.ts`，钉住门禁自身的行为——run-gates 调度器与并行预算、双语配对与链接归一化、翻译提示词组装、install-lefthook、oxlint 包装器、markdown 解析、doc-standard 与具体术语发现。`scripts/` 下凡有值得钉住的行为的脚本都有同目录的 `*.spec.ts`；测试描述行为，而非正确性。
- **文档门禁**（`pnpm run doc-sync`；快速子集 `pnpm run test:docs`）：完整的门禁聚合——markdown 链接与折行、Mermaid、双语配对与翻译提示词、公开仓库链接、仓库引用、具体术语、文档引用、Agent Note 分类、格式与归档封存、skill 调用元数据、文档预算、升级指南，以及 doc-standard spec。文档即产出，因此该聚合是语料的验收面：无法让检查失败的规则终将漂移（[机器验证](framework/layers/l3-machine-verification.zh.md)）。
- **无密钥快照**（`scripts/snapshots/translation-prompt-v4/`）：`scripts/translation-prompt.expected.spec.ts` 以真实的 Node 子进程运行 `verify-translation-prompt --snapshot`，断言 stderr 为空、stdout 可解析为 JSON，并将 stdout 与已提交的 `request-response.expected.json` 逐字节比较。快照保存组装出的翻译请求——system 消息、成对的评审示例、然后是源文本——以及被消费的响应；响应来自录制的 fixture，因此该档位从不调用模型。设置 `ACF_SNAPSHOT=record` 或 `ACF_SNAPSHOT=refresh` 会在比较前用当前输出改写快照。只有在翻译提示词工作流本身变化时才重新生成——提示词文档、占位符表、示例 fixture 或请求/响应渲染；示例是合成 fixture，因此编辑配对文档不得扰动快照。逐项评审由此产生的 diff。

## 证据选择

Git 钩子刻意保持很窄：pre-commit 修复暂存 lint 并检查暂存空白、配对记录与归档元数据；pre-push 只运行 typecheck。选取覆盖变更面的最小检查：门禁或脚本行为用所属的 Vitest spec，当 `markdown.ts` 或 `run-gates.ts` 这类共享模块变化时补上相邻 spec；文档与语料变更用所属的聚焦门禁或 `pnpm run test:docs`，PR 级再完整运行一次 `doc-sync`；编辑双语配对后用 `pnpm run verify-translation-pairing --write <en-path>` 重录。绝不因为接下来要提交或推送而重复一项已通过的检查；只有显式要求时才完整本地演练。[pre-push-checks](../.agents/skills/pre-push-checks/SKILL.md) 拥有该策略，含 `gh stack sync` 例外（[本地窄、CI 全](framework/mechanisms/local-narrow-ci-full.zh.md)）。

## spec 如何执行

Vitest 在 fork 出的 worker 中运行 spec 文件，`doc-sync` 并发运行门禁，因此一个 spec 可能与其他门禁进程并排执行。被隔离的只有进程：spec 需要自己负责它占用的每个端口、临时路径和子进程；只在单独运行时才通过的 spec 是 spec 自身的缺陷。

## 本树没有的档位

本树没有覆盖率百分比、真实 API 测试或平台矩阵；这些档位属于采纳本框架的项目——[L3 移植分析](framework/layers/l3-machine-verification.zh.md)为它们定价——而门禁加 Vitest 套件就是本语料的完整验证面。本树中没有任何脚本或 skill 读取模型凭据（[密钥策略](../AGENTS.md#secrets--env)）。参考附录自身恢复的测试套件通过 `node --test` 带外运行（[reference/github/README.md](../reference/github/README.md)）；它们不接入本树的门禁。
