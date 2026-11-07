# Resident rules and on-demand skills

English | [中文](instruction-layering.zh.md)

- Layer: [L4 — Instruction layering](../layers/l4-instruction-layering.md)
- Governs: how rule text splits between resident files, loaded every session, and on-demand skills, loaded on trigger — the context budget as a governed resource.

## Rule text

The [AGENTS.md](../../../AGENTS.md) intro carries standing rules only: one to three lines each, each linking its owning document for detail. Procedure that applies only on trigger lives in skills instead — each `SKILL.md` opens with a frontmatter `description` stating the precise trigger condition, and the tool loads the body only when that condition holds. The same split governs Agent Notes: the resident file keeps the one-line rule that notes are only for lasting decision rationale, while [the notes README's "When to write one" section](../../../.agents/notes/README.md#when-to-write-one) owns the full rule.

## Enforcement

`pnpm run verify-skill-invocation-metadata` ([scripts/verify-skill-invocation-metadata.ts](../../../scripts/verify-skill-invocation-metadata.ts)) keeps the two tool namespaces aligned: a skill's Claude-side invocation policy (`disable-model-invocation`, `user-invocable`) must agree with its Codex-side policy (`policy.allow_implicit_invocation`), so no skill is exposed differently per tool. Whether a `description` states a precise trigger remains review judgment — the gate checks structure, not wording.

## Cost and prerequisites

None beyond the repository. The resident layer costs its word count on every session, which is exactly why it stays short; the on-demand layer costs nothing until its trigger fires.

## Team fit

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Move every rule longer than three lines out of the resident file into its owning document, leaving the link behind.
- For each procedure, create a skill whose `description` states when to invoke it; a description naming only the topic is not a trigger.
- Keep the cross-tool policies aligned: `pnpm run verify-skill-invocation-metadata`.
- Re-read the resident file whenever a workflow changes — anything that applies to one task only is a trigger, not a standing order.

## Failure mode

Process detail hoarded into resident files taxes every session with context that usually does not apply; rules buried inside skill bodies never load because the trigger never fires. Both directions fail silently — the session pays, or the rule is absent, with no error anywhere.
