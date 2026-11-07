# agent（智能体）指令与 CLAUDE.md 符号链接

[English](agents-md-symlink.md) | 中文

- 所属层：[L4 — 指令分层](../layers/l4-instruction-layering.zh.md)
- 管辖范围：一份规则源服务所有 AI 工具命名空间，而不是各自漂移的逐工具副本。

## 规则正文

根目录 [AGENTS.md](../../../AGENTS.md) 是唯一的规则源；`CLAUDE.md` 是指向它的符号链接，因此 Claude Code、Codex 以及任何读取 AGENTS.md 的工具都加载完全相同的规则。`.claude/skills` 符号链接让按需的 skill（技能）层保持共享（Codex 不读取 `.claude/skills`）。在 monorepo 中，这一模式在每个受治理的目录里重复：每个目录有一份 AGENTS.md，外加一个同目录的 CLAUDE.md。编辑规则见 [AGENTS.md](../../../AGENTS.md) 中 "Editing these instructions" 一节。

## 执法

`Convention — gate on first observed drift`。漂移面只是一个符号链接；首次观测到漂移时，一次针对非符号链接 `CLAUDE.md` 的全仓搜索就是自然的门禁。

## 成本与前提

仓库之外没有任何成本。适用于任何读取 AGENTS.md 或 CLAUDE.md 的工具；两者都不读取的工具只会忽略它。

## 档位建议

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## 移植清单

- 创建 `AGENTS.md`，写入每个会话都必须常驻的规则。
- 把任何既有的 `CLAUDE.md` 替换为符号链接：`ln -sf AGENTS.md CLAUDE.md`。
- 若使用 skill，用 `mkdir -p .claude && ln -sfn ../.agents/skills .claude/skills` 创建 skills 符号链接。
- 在新人引导文档中加一行：编辑 `AGENTS.md`，永远不要编辑 `CLAUDE.md`。
- 验证完整性：`git ls-files -s CLAUDE.md` 必须显示模式 `120000`；Windows 上需要 `core.symlinks=true` 并开启开发者模式（Git Bash 的 `ln -s` 默认执行复制；设置 `MSYS=winsymlinks:nativestrict`）。

## 失效模式

用复制代替符号链接会重新引入漂移问题：规则在其中一个文件里修复而另一个没有，且没有任何信号。失败是无声的，这正是清单显式写明符号链接的原因。
