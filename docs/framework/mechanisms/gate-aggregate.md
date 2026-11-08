# The gate runner as tested engineering code

English | [中文](gate-aggregate.zh.md)

- Layer: [L3 — Machine verification](../layers/l3-machine-verification.md)
- Governs: gate orchestration itself is engineered and tested — dependency graphs, bounded concurrency, fail-fast, process-tree teardown — instead of scattered scripts nobody runs whole.

## Rule text

Package scripts own the public aggregate names; the runner [scripts/run-gates.ts](../../../scripts/run-gates.ts) owns what executes under them: validated dependency graphs, environment-selected scheduling, and process diagnostics. The two aggregates are `doc-sync`, the full documentation matrix, and `doc-quick`, its build-free subset exposed as `pnpm run test:docs`. Each gate declares its ordering with `needs`/`after` dependency edges; worker count is bounded — a default from available parallelism, overridden through `ACF_GATE_CONCURRENCY`; and `ACF_GATE_FAIL_FAST=1` stops the aggregate at the first blocking failure, terminating running children and tearing down each process tree, not just the direct child.

## Enforcement

Self-referential: `pnpm run doc-sync` is this mechanism running itself, and the scheduler has unit tests at [scripts/run-gates.spec.ts](../../../scripts/run-gates.spec.ts) covering dependency ordering, fail-fast teardown, and reporting. An orchestrator bug then fails a test like any other code, instead of silently corrupting the corpus's own enforcement path.

## Cost and prerequisites

One runner file plus a declared entry per gate with its dependency edges. It pays once the gate set outgrows what a single shell loop runs whole; below that, a plain sequential script is the same mechanism at lower cost.

## Team fit

Solo ✗ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Name the aggregate as a package script; the runner owns the graph, never an ad-hoc shell chain.
- Declare gate ordering as `needs`/`after` edges instead of launch order by luck.
- Keep concurrency bounded: a worker-cap default with an override knob (`ACF_GATE_CONCURRENCY`).
- Wire fail-fast with signal forwarding so the first blocking failure kills the whole process tree.
- Keep the runner under unit test; scheduling and teardown are code with regressions.
- Verify: `pnpm run doc-sync`.

## Failure mode

Without an orchestrator the set decays into a directory of scripts run piecemeal: each contributor runs the one they remember, nobody runs the whole, and coverage silently hollows out — drift accumulates in exactly the gaps no one executes.
