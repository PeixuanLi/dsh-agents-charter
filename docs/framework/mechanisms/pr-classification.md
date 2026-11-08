# One kind per PR; areas are multi-select

English | [中文](pr-classification.zh.md)

- Layer: [L5 — Process automation](../layers/l5-process-automation.md)
- Governs: one kind per PR, areas as multi-select, machine-aggregable through native Issue Types.

## Rule text

The classification has no resident rule text; its source is the pull request template plus the platform's native types. A PR declares exactly one kind — the template asks the question once, and the native Issue Type records the answer where machines read it — while areas are a multi-select naming everything the change materially touches. Both fields aggregate without parsing titles or free-form labels, which is what makes routing and metrics cheap to build on top.

## Enforcement

The template enforces at authoring time by asking the kind question once and only once, and every downstream consumer re-derives its view from the native types instead of re-parsing prose, which keeps the classification honest by giving it work to do. Ported-config reference: [pull_request_template.md](../../../reference/github/pull_request_template.md) and the `ISSUE_TEMPLATE/` forms, restored under [reference/github/](../../../reference/github/README.md).

## Cost and prerequisites

A taxonomy everyone agrees to hold still: the kind vocabulary must be small enough to choose from in seconds and stable enough for consumers to build against. The template is the cheap prerequisite; the real one is at least one consumer — routing, metrics, review assignment, or the [issue state machine](../mechanisms/issue-state-machine.md)'s `typed`/`untyped` listeners — because a classification with no reader is pure form-filling.

## Team fit

Solo ✗ · Small ✓ · Medium ✓ · Large ✓ — a taxonomy pays when someone other than the author consumes it; solo work has no such reader.

## Porting checklist

- Put the kind question in the pull request template as a single choice, and record the answer as a native Issue Type rather than a label naming convention.
- Record areas as a multi-select covering everything the change materially touches — one kind, many areas.
- Wire the first consumer before expanding the taxonomy; add a category only when a consumer asks for it.
- Verify: open a pull request and confirm exactly one kind is recorded and every materially touched area appears in the multi-select.

## Failure mode

Classification without a consumer is form-filling tax: authors pick the nearest value, the taxonomy rots, and nobody notices because nothing reads it; with consumers, routing and metrics compound on the same fields.
