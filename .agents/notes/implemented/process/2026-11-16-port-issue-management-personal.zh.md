# Agent Note: Port the issue mechanism to a personal account

Status: implemented

[English](2026-11-16-port-issue-management-personal.md) | 中文

## 问题

恢复的 issue-management 引擎经 `organization(login:)` 与 `repository(owner:)` 用同一个属主解析 Projects 看板，因此只有仓库与看板同处一个组织之下才能按原样部署。本仓库在个人账户之下，用的是用户级看板（`PeixuanLi` 的 project #1），而 P3 档的 issue 机制要在这里真实运行，不只是参照材料。

## 决策

issue 机制部署于 `.github/issue-management/`（引擎、配置、两个 issue workflow、issue 表单与 PR 模板），复制自 [reference/github/](../../../../reference/github/README.md) 并按个人账户适配。`github.mjs` 改经 `user(login:)` 查看板、读 `data.user?.projectV2`——唯一的结构性改动；REST 路径与 `repository(owner:)` 本就接受用户属主，无需改。`config.json` 载入部署值：`PeixuanLi`/`dsh-agents-charter`、#1 看板 `dsh-agents-charter-project`、`lifecycleActor` 为 `hello-issue-management`（App slug；测试套件把裸 slug 的 actor 比对钉在 `rules.mjs`）、字段名不变、`Asia/Shanghai`、七个状态值。两个 workflow 的 `create-github-app-token` 钉死值读 `PeixuanLi`/`dsh-agents-charter`。测试夹具随部署值走——GraphQL 响应形状挂在 `user:` 下、看板标题、REST 路径、actor 字面量——套件在仓库根目录跑 51/51，含附录映射下无法解析的模板-技能对齐测试。附录保持上游字节不动，并链接到本 Note 记录部署适配。

## 备选方案

**在组织之下部署、引擎零改动。** 否决：要满足共属主查询，必须迁移仓库并新建组织级看板——为一次部署付出迁移成本，只为省掉一行结构性改动。

**用 personal access token 代替 GitHub App 铸看板令牌。** 否决：把可撤销、按范围限权的 App 凭证换成长效用户令牌，且 `lifecycleActor` 保护依赖的是 App bot actor 而非用户登录名。

## 后果

部署树按设计偏离参照字节；参照附录仍是上游的规范副本，后续上游同步必须重放 `user(login:)` 适配。两个事实只能首跑验证、验证前保持开放：`lifecycleActor` 的 App slug 大小写，以及 App 令牌路径能否读用户级看板——App 缺少被请求的权限时 `create-github-app-token` 会大声失败，`issue-policy.yml` 里的 `permission-organization-projects: read` 钉死值正是该验证的一部分。在仓库变量与密钥就位之前，`Issue policy` 检查在 PR 上会失败，直到 `DSH_ISSUE_APP_CLIENT_ID` 与 `DSH_ISSUE_APP_PRIVATE_KEY` 设置完毕；把它设为 required check 属于首次绿灯之后的分支保护事项。移植换来的是：P3 的 issue 机制在本仓库真实运行，附录拿到第一次完整移植演练。

## 测试

`node --test .github/issue-management/policy.test.mjs` 在部署布局下从仓库根目录 51/51 通过，覆盖适配后的查询、部署配置值与 workflow 权限行断言。实路径的首跑验证——一次 changes-requested 评审触发 `In review` → `In progress` 退回——钉住 actor 比对与 App 看板访问。
