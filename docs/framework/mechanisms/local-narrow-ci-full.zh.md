# 本地只跑窄集，CI 拥有完整矩阵

[English](local-narrow-ci-full.md) | 中文

- 所属层：[L3 — 机器验证](../layers/l3-machine-verification.zh.md)
- 管辖范围：本地只运行与变更匹配的检查，完整门禁矩阵属于 CI，已经通过的检查不重复运行。

## 规则正文

[lefthook.yml](../../../lefthook.yml) 把钩子保持得很窄——pre-commit 检查暂存的翻译配对记录、归档元数据、暂存 lint 与空白；pre-push 只运行一条增量 `pnpm run typecheck`——头部注释写明了分界：本地检查点保持快速，`doc-sync` 聚合拥有仓库级门禁矩阵。证据选择规则住在 [dsh-pre-push-checks skill（技能）](../../../.agents/skills/dsh-pre-push-checks/SKILL.md)：运行能对该回归失败的最窄检查，绝不手动重复已通过的检查；只有显式要求、诊断 CI 失败或变更宽到无法收敛时才完整演练。

## 执法

`Convention — the pre-push checklist owns evidence selection`。漂移面是钩子的宽度；首次观测到漂移时，对照清单审计钩子就是自然的门禁——pre-push 任务一旦超出快速检查点，就会逼出 `--no-verify` 旁路。

## 成本与前提

在钩子里已经付清：本地迭代保持秒级，CI 分钟数随矩阵伸缩而不是随每次提交伸缩。前提是 CI 真的运行完整矩阵——本地只跑窄集是安全的，因为有别的东西在穷尽。

## 档位建议

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## 移植清单

- 钩子只保留快速、暂存范围的任务：commit 时暂存 lint 与空白，push 时一条增量类型检查。
- 把分界写在钩子定义处：本地检查点快速；完整门禁矩阵在别处。
- 用成文的清单按变更选择证据：能对该回归失败的最窄检查。
- 不重复已通过的检查；只在显式要求或 CI 诊断时完整演练。
- 选择证据前先看变更范围：`pnpm run change-scope --base <verified-base-ref>`。

## 失效模式

两个对称的失败。本地跑全集让迭代慢到门禁被绕过，`--no-verify` 的习惯随后蔓延到真正要紧的检查；本地什么都不跑让评审被机器本可拒绝的提交淹没，人的注意力花在钩子本可以抓住的东西上。
