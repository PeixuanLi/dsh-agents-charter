# 贡献

[English](CONTRIBUTING.md) | 中文

本仓库是一份治理语料：文档与门禁脚本本身就是产出，因此大多数贡献修改的是文档、门禁或 Agent Note，而不是应用代码。[AGENTS.md](AGENTS.md) 中的约束体系约束每一项变更；[开发指南](docs/development.zh.md)拥有搭建教程与日常工作流。

## 一项变更承载什么

文档伴随每一项变更：在同一个 PR（Pull Request）中更新受影响的页面与约定（[文档标准](docs/AGENTS.md)）。双语配对两侧一起更新，再用 `pnpm run verify-translation-pairing --write <en-path>` 重录伴随记录（[配对约定](docs/i18n/README.zh.md)）；字数预算保持成立（[预算](docs/AGENTS.md#wordcount-budgets)）。按[测试策略](docs/testing.zh.md)与 [pre-push-checks](.agents/skills/pre-push-checks/SKILL.md) skill（技能）选取覆盖变更面的证据。

## 推送之前

运行覆盖你 diff 的检查：语料变更运行 `pnpm run doc-sync`，门禁变更运行所属的 Vitest spec。绝不静默门禁——红灯门禁标记的是缺陷或一条必须修改的规则，而不是需要绕开的障碍。

## Issue 与 pull request

请在 [GitHub](https://github.com/PeixuanLi/dsh-agents-charter) 上提交 issue 与 pull request。
