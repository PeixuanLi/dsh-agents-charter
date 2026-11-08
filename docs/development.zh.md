# 开发指南

[English](development.md) | 中文

本治理语料的日常工作流：安装一次依赖，编辑文档与门禁脚本，运行覆盖该变更的检查，再经钩子提交。搭建教程引导新贡献者从准备前置条件到通过校验的检出目录；其后的参考章节分别拥有 TypeScript 布局、环境变量、Git 集成、日常命令集与 TODO 标签语义。[testing.md](testing.zh.md)（测试策略）拥有证据选择；[AGENTS.md](AGENTS.md) 拥有文档标准；根目录 [AGENTS.md](../AGENTS.md) 拥有常设条款。

## 搭建教程

### 前置条件

- Node.js 24.9 或更高版本（`engines` 字段）与启用了 Corepack 的 pnpm；`package.json` 通过 `packageManager` 固定 `pnpm@11.28.5`。如果 `pnpm --version` 无法经 Corepack 解析，请先运行 `corepack enable`。
- Git 2.26 或更高版本；钩子安装器会启用 Git 的 worktree 专属配置扩展。
- 除此之外无需任何东西：本树没有构建步骤，也没有任何脚本或 skill（技能）读取模型凭据（[密钥策略](../AGENTS.md#secrets--env)），因此不需要 API key。

### 首次搭建

在仓库根目录安装依赖；`postinstall` 会运行 `scripts/install-lefthook.mjs`：

```sh
pnpm install
```

安装器把 worktree 本地的 Lefthook 钩子写入 `$GIT_DIR/acf-hooks`，在该目录中放置所有权标记，并把该 worktree 的 `core.hooksPath` 指向它，因此每个 worktree 拥有自己的钩子，工作树中不会出现任何钩子产物。遇到用户自有的 `core.hooksPath` 或无所有权标记的钩子目录时，安装器直接拒绝，而不是强行覆盖；[worktree 本地钩子 Agent Note](../.agents/notes/implemented/process/2026-07-27-worktree-local-lefthook.zh.md) 拥有钩子路径的安全约定。安装器自行处理 Windows 细节（`.cmd` shim 的引号解析、Git 输出的 CRLF 剥离、已删除锁文件的延迟访问），因此既不需要单独的工具链，也不需要 WSL。如果依赖从缓存恢复或 `postinstall` 被跳过导致钩子缺失，请运行 `node scripts/install-lefthook.mjs`；移动检出目录后，请重新运行安装器以重新生成自有路径。

如果检出的钩子早于 `dsh-hooks` → `acf-hooks` 改名，安装器会拒绝其 worktree `core.hooksPath`。每个检出修复一次即可（gitdir 下陈旧的 `dsh-hooks` 目录可以删除）：

```sh
git config --worktree --unset-all core.hooksPath && pnpm install
```

新克隆后请先运行一次 `pnpm run typecheck`；它成功退出即表示搭建完成。

<a id="typescript-project-layout"></a>

## TypeScript 项目布局

本树只有一个 TypeScript 程序。`tsconfig.json` 只包含 `scripts/**/*.ts`，以 `strict` 加 `noUncheckedIndexedAccess` 与 `exactOptionalPropertyTypes` 编译，且从不产出文件：脚本经 tsx 运行、spec 经 vitest 运行，因此没有构建产物、没有 project reference，也没有源码/产物面的拆分。每个门禁脚本的 Vitest spec 以 `*.spec.ts` 与之同目录存放。

多包 compiler-face 布局——Host 与 Client 两个聚合以及把它们联系起来的 project-reference 图——是 originating harness（本语料所源自的上游 harness）的参照内容，不属于本树。链接到这里的页面（包括 [实操手册：添加 workspace 包](cookbook/adding-a-package.zh.md)、[实操手册：添加一个 vendored 包](cookbook/adding-a-vendored-package.zh.md)与 [Typert Remote note](../.agents/notes/implemented/architecture/2026-08-02-typert-remote-method-calls.zh.md)）负责记录该布局；本节只是它在语料中的锚点。

## 环境变量

- `ACF_GATE_CONCURRENCY` — 正整数，限制 `run-gates` 各聚合的并发门禁数；未设置时使用本地 worker 预算，文档类聚合再以 8 为上限，因为每个门禁都会启动一个完整的 Node 子进程。
- `ACF_GATE_FAIL_FAST` — 设为 `1` 时在第一个阻断性失败后停止其余门禁；未设置时，失败只跳过依赖它的门禁，因此相互独立的失败都会被报告。
- `ACF_GATE_VERBOSE` — 设为 `1` 时同时打印每个通过门禁的输出。
- `ACF_OXLINT_THREADS` — 正整数，选择 Oxlint 线程数；未设置时，CI 保留 Oxlint 自身默认值，本地运行使用 worker 预算。请用它取代直接传 `--threads` 参数。
- `ACF_ARCHIVE_BASE_REF` — 归档封存比对所用的受信变更前提交；默认为 `HEAD`，CI 会提供自己的基线。
- `ACF_SNAPSHOT` — 设为 `record` 或 `refresh` 时先以当前输出改写翻译提示词快照再比较。
- `ACF_LEFTHOOK_ALLOW_HOOKS_PATH_OVERRIDE` — 设为 `1` 时，允许钩子安装器越过本会拒绝的继承式 `core.hooksPath`（system、global 或 local 作用域）继续执行。

## Git 集成

`lefthook.yml` 是快速的本地检查点；全仓库的门禁矩阵归 `doc-sync` 聚合所有。

- `pre-commit` 对照暂存的配对文档 blob 校验暂存的配对记录，校验暂存的已归档 Agent Note，应用暂存文件的 Oxlint 修复（包装器的有界第二遍）并重新暂存修复结果，然后检查暂存 diff 中的空白错误。
- `pre-merge-commit` 在 Git 创建自动合并提交之前执行同样的、基于索引的配对与归档检查。
- `pre-push` 运行 `pnpm run typecheck`。

钩子从 `$GIT_DIR/acf-hooks` 执行，由所有权标记防止外来安装；公共 gitdir 中的安装器锁让并发的 `pnpm install` 串行执行。`.i18n.yaml` 记录只在两个分支都改动同一标题分节中语言专属内容时才冲突；先解决 Markdown，再运行 `pnpm run verify-translation-pairing --write <pair>` 重新记录。如果 `pre-merge-commit` 拒绝了一个本应干净的合并，Git 会把完整结果暂存但不提交；修复失败项后运行 `git commit`，或运行 `git merge --abort`。

## 日常命令

[`package.json`](../package.json)、根目录 [AGENTS.md](../AGENTS.md#commands) 与 [scripts/run-gates.ts](../scripts/run-gates.ts) 拥有当前的脚本与门禁清单。日常工作集：

- `pnpm install` — 依赖与钩子。
- `pnpm run test` — 运行 `scripts/**/*.spec.ts` 的 Vitest spec。
- `pnpm run typecheck`、`pnpm run lint`、`pnpm run lint:fix` — 静态检查。
- `pnpm run doc-sync` — 完整的文档门禁聚合；`pnpm run test:docs` 是其快速子集。
- `pnpm run verify-<name>` — 直接运行任一单个门禁，例如 `verify-md-links`。
- `pnpm run verify-translation-pairing --write <en-path>` — 编辑双语配对后重新记录；`pnpm run gen-translation-brief <pair>` 支撑用户显式调用的扩展翻译工作流。

选取覆盖变更面的最小检查；[testing.md](testing.zh.md) 拥有该策略。

## TODO 标记

请使用以下三种注释标签之一标记代码中的已知问题，按紧急程度排序：

- `FIXME`：应当阻塞新版本发布的问题。除非评审者明确同意该更改可以合并，否则发布版本不应包含未解决的 `FIXME`；
- `TODO`：应当尽快修复的问题，等资源到位即可处理；
- `XXX`：也许某天会修复的问题，优先级最低，不作承诺。

请选择与紧急程度匹配的标签，让浏览代码的人一眼分清「发布阻塞」和「有空再说」。

## 本树没有的 lane

本树没有构建、覆盖率或 CI lane：没有打包、没有覆盖率百分比、没有平台矩阵。这些 lane 属于参照页面所描述的上游 harness，或属于采纳本框架的项目——[L3 移植分析](framework/layers/l3-machine-verification.zh.md)为它们定价。剩下的验证面就是 [testing.md](testing.zh.md)（测试策略）的档位与证据。
