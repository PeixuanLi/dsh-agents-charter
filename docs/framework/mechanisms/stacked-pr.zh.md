# 依赖式 PR（Pull Request）链在租约下重写，sync 后立即验证

[English](stacked-pr.md) | 中文

- 所属层：[L5 — 流程自动化](../layers/l5-process-automation.zh.md)
- 管辖范围：依赖式 PR 链（stacked PR）只用 `--force-with-lease` 重写，远端移动时中止；`gh stack sync` 是唯一被许可的「先发布后验证」步骤，且必须立即补验证。

## 规则正文

根目录 [AGENTS.md](../../../AGENTS.md) 在 "Choose PR history deliberately" 一条下写明这个约定：已推送的分支只用 `--force-with-lease` 重写——租约在远端移动时中止推送——raw `--force` 永不允许。GitHub 原生 stack 对象是链条成员与顺序的唯一权威。`gh stack sync` 是唯一被许可的「先发布后验证」步骤：它把抓取、级联变基与推送作为一次操作执行，验证无法插在重写与发布之间——因此在运行前记录 stack 顺序与精确的远端 head，运行后立即重查每个 head、跑受影响层的检查，并在证据通过前扣住所有合并。

## 执法

`Convention — the pre-push checklist owns stack hygiene`。漂移面是一次已推送的重写，它发生在任何 CI 门禁能包裹的命令之外；漂移首次出现时，对照清单审计出站 stack 就是自然的门禁，[dsh-pre-push-checks skill](../../../.agents/skills/dsh-pre-push-checks/SKILL.md) 写明了顺序——带租约的重写、sync 后立即补验证、证据通过前不得声称就绪。

## 成本与前提

平台的原生 stack 特性（`gh stack` CLI）加上每次 sync 之后验证的纪律。成本只存在于存在并行依赖工作流的场景；没有 stack 依赖的历史从这套机器里得不到任何东西。

## 档位建议

档位建议跟着工作的形状走，而不是人数：只要存在并行的依赖工作流，租约加验证的纪律在任何档位都物有所值，包括人机混合团队；线性历史买到的只有仪式成本。

## 移植清单

- 每条同仓库依赖链都要求原生 stack 对象，每个 PR 以紧邻其下的 head 分支为基——[dsh-merging-stacked-prs skill](../../../.agents/skills/dsh-merging-stacked-prs/SKILL.md) 是落地一条 stack 的执法配套。
- 已推送分支只用 `--force-with-lease` 重写；把 raw `--force` 当作被禁命令。
- `gh stack sync` 之前，要求干净的工作区并记录官方 stack 顺序与精确的远端 head OID。
- sync 之后立即重查每个 head 与 stack 顺序，跑受影响层的检查，证据通过前扣住合并；失败时在已发布的 head 之上修复并发布更正。
- 先验证前提：`gh stack --version`——扩展或服务端 stack 特性不可用时硬停。

## 失效模式

raw `--force` 会毁掉别人的基础分支：租约本可拦下的并发推进被无声覆盖。未验证的 sync 是镜像的失败——重写在没有任何人跑过检查的情况下就发往每个下游层，破坏在最顶层的 PR 现形，也最难归因。
