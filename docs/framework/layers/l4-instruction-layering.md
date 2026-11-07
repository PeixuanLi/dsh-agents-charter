# Layer 4 — Instruction layering

English | [中文](l4-instruction-layering.zh.md)

Instruction layering replaces the tacit judgment of what an agent needs in context with a governed economy. A resident layer of AGENTS.md files carries standing orders as one-to-three-line rules that link their owning document; an on-demand layer of skills carries procedures behind trigger-precise descriptions. Context itself is budgeted: one home per fact, per-file word budgets with a ratchet that only tightens, and a hygiene standard that strips session traces from output; see the [framework paradigm](../paradigm.md) overview.

## Mechanisms in this layer

- [mechanisms/agents-md-symlink.md](../mechanisms/agents-md-symlink.md) — one rules source serving multiple agent-tool namespaces through the CLAUDE.md → AGENTS.md symlink
- [mechanisms/instruction-layering.md](../mechanisms/instruction-layering.md) — resident AGENTS.md rules versus on-demand skills whose descriptions state precise trigger conditions
- [mechanisms/doc-budget-ratchet.md](../mechanisms/doc-budget-ratchet.md) — per-file word budgets with headroom and a ratchet that only tightens: context economy as an enforced resource
- [mechanisms/prose-hygiene.md](../mechanisms/prose-hygiene.md) — the slop checklist and the reasoning-trace criterion keep session traces and LLM prose pathologies out of output

## Porting analysis

This layer ports first and cheapest: the AGENTS.md tree with the CLAUDE.md symlink, the skill layer, and the slop and reasoning-trace hygiene need no infrastructure and apply at every tier, and together they form the core of the minimal porting package. Budgets and the ratchet become worthwhile as soon as more than one document competes for context — start them with the first resident file instead of retrofitting quotas onto an existing corpus.
