# AGENTS.md — The documentation standard

This file defines document structure, Markdown tiers, writing rules, and `verify-doc-budgets` ceilings. Use [doc](../.agents/skills/doc/SKILL.md) for placement and validation, and [prose-standard](../.agents/skills/prose-standard/SKILL.md) for required coverage and editorial judgment; the [archived doc-tiers Agent Note](../.agents/notes/archived/process/2026-07-04-doc-tiers-and-budgets.md) records the historical rationale.

## Document structure

These rules apply to human-facing documentation; [Agent Notes](../.agents/notes/README.md) remain outside their scope. A [postmortem](postmortem/README.md) is an incident-scoped reference; chronology records evidence, not a teaching sequence. A document's subject and tree position fix its scope: describe its own subject at appropriate detail and direct children only by purpose, responsibility, and high-level behavior; link to the owning descendant for lower-level detail. Document type does not widen that scope. A reference may be exhaustive only about its own subject. Testing mechanisms, fixtures, and harnesses belong at the lowest owning level; higher documents link there.

Classify every in-scope document as a tutorial or reference. Tutorials follow an ordered path to an outcome and introduce only what each step needs. References define a lookup scope and current behavior without a teaching sequence. Separate substantial tutorial and reference content; label a section when either part is small.

Before writing a tutorial, privately classify the reader's starting knowledge and each concept as beginner, intermediate, or advanced. Establish prerequisites before dependent concepts, increase difficulty gradually, and move unnecessary advanced material to a later tutorial or reference.

Author in this order: locate the document in the tree; set its permitted detail; choose tutorial or reference; for a tutorial, order concepts by prerequisite and difficulty; relocate descendant-owned detail; replace lower-level explanations with links to their owners.

## The tier taxonomy: one home per fact

Each fact has one home: the tier whose job it is; elsewhere, link there.

| Tier | Job | Does NOT belong there |
|---|---|---|
| Root `AGENTS.md` | Standing orders: rules an agent needs in context in every session, one to three lines each, linking its home | Stories, worked examples, situational procedures, anything restated from a linked home |
| Subtree `AGENTS.md` (`docs/`, `scripts/`, `.agents/notes/`) | Orders specific to that subtree | Repo-wide rules the root file already carries |
| [architecture.md](architecture.md) | Ordered map of the upstream DeepSeek Harness the corpus derives from: composition, core packages, loop, seams, extension points | Decision rationale (→ Agent Notes), framework mechanism specifications (→ framework/), implementation-status annotations |
| [framework/](framework/README.md) | The spec layer: the framework paradigm, five layer chapters, and self-contained mechanism cards; every page is a bilingual triplet (`.md`, `.zh.md`, `.i18n.yaml`) under the repository gates | Upstream-harness detail (→ architecture.md), decision rationale (→ Agent Notes), ungoverned pages |
| [Agent Notes](../.agents/notes/README.md) | Active decision records: the why, what-was-given-up, and required verification; `implemented/` notes describe shipped reality in present tense | Migration plans, acceptance-task checklists, fixture walkthroughs, and spec-speak ("should…") once the decision has shipped; archived notes are frozen history, never current authority |
| [defensive-patterns/](defensive-patterns/README.md) | Rules this repository enforces in review, split by artifact: one general bug-class page plus per-domain pages | Decision rationale (→ Agent Notes) |
| [postmortem/](postmortem/README.md) | Incident stories — the only tier where war-story narrative belongs | — |
| [cookbook/](cookbook/adding-a-package.md) | Step-by-step how-tos with numbered verify steps | Design rationale (→ the Agent Note each guide links) |
| [development.md](development.md) | Contributor setup, daily workflow, and a summary of CI; a bilingual pair under the [i18n contract](i18n/README.md) | Runtime/version rationale (→ Agent Notes), check-by-check lists that drift from `package.json` scripts |
| Skills (`.agents/skills/`) | Reusable workflows and specialized decision standards | Product and runtime contracts (→ docs or source) |

Placement: bugs → postmortems; rationale → Agent Notes; procedures → cookbooks; standing orders → root `AGENTS.md` with a rationale link; review-enforced rules → `defensive-patterns/`; framework mechanism specifications → `framework/`.

## Writing rules

- **Document current state.** Keep history in commits, PRs, Agent Notes, or postmortems. Other prose names live mechanisms, not changes or stack positions. General Session-format prose links [version/status authority](session-format-status.md); retain numbers for version-specific contracts, examples, or evidence.
- **Apply the Agent Note creation criteria.** Mechanical/local edits are exempt, including local UI changes; keep existing owning notes accurate ([scope](../.agents/notes/README.md#when-to-write-one)).
- **One physical line per paragraph** (`verify-md-wrap`): use editor soft-wrap. Code blocks, tables, and list structure keep their formatting; code comments stay under the linter's column limit.
- **Pairs update together**: [Terminology-guided](i18n/terminology.md), single-pass active-agent work repositions first-use annotations, preserves untouched prose, and re-records; `dsh-translate-docs` remains user-invoked ([contract](i18n/README.md)).
- **Comments and JSDoc state complete contracts, not reasoning transcripts.** Preserve behavior, failure, timing, ownership, modality, exceptions, consequences, and non-obvious orientation; delete narration, test walkthroughs, review analysis, and code restatement. Keep the local contract and link its rationale. Use [prose-standard](../.agents/skills/prose-standard/SKILL.md) for details.
- Write directly: name actors and facts ([reference](../.agents/skills/prose-standard/SKILL.md)). Reserve `seam` for the defined capability. Name the exact check, type, API, operation, or behavior instead of metaphorical "gate", "vocabulary", or "surface".

## Wordcount Budgets

[scripts/doc-budgets.manifest.json](../scripts/doc-budgets.manifest.json) sets standing-doc ceilings; `pnpm run verify-doc-budgets` rejects excess or missing files.

When the gate goes red:

1. **Relocate** content that belongs in another tier; leave a one-line link if needed.
2. **Condense** content that belongs here but can be shorter.
3. **Raise** the ceiling only when the words need the space; justify the manifest diff in the PR. A too-low ceiling is a budget bug.

Ceilings are guardrails, not reduction targets. At or below target, retain at least 5% headroom; above target, freeze the ceiling until relocation or condensation brings the document under target. Lower a ceiling only when the document still has room. Targets: root `AGENTS.md` ≤ 1,180; this file ≤ 1,260; `architecture.md` ≤ 2,420; `cordis-primer.md` ≤ 605; `testing.md` ≤ 1,350; the framework pages `framework/README.md` ≤ 310, `framework/paradigm.md` ≤ 410, and the layer chapters `framework/layers/l1-role-separation.md` ≤ 230, `l2-external-memory.md` ≤ 350, `l3-machine-verification.md` ≤ 300, `l4-instruction-layering.md` ≤ 250, `l5-process-automation.md` ≤ 250. Review governs unbudgeted tiers.

## The slop checklist

Hunt these in any doc; [doc](../.agents/skills/doc/SKILL.md) runs this list as an audit:

- Duplicated rules: search a distinctive phrase; keep one home and link the rest.
- History outside its permitted tier: state current facts and link the historical owner.
- Implementation-status annotations in prose or diagrams ("implemented!", "future: …"). Status rots; the repo layout and package manifests carry it.
- Hand-restated catalogs, JSDoc, or inventories of tests, packages, and status when source or a generator is authoritative.
- Reasoning transcripts: step-by-step implementation narration, proof of obvious branches, test walkthroughs, or rejected local alternatives. Keep the resulting contract or durable rationale; delete the path used to derive it.
- Rationale repeated beside sibling methods instead of once at the owning capability or helper.
- Paragraph walls: one paragraph carrying several rules and parenthetical asides. Split it or demote the detail to its home.
- Emphasis inflation: bold, CAPS, or "critically" everywhere means nothing stands out. Reserve emphasis for the clause that changes behavior.
- Spec-speak in `implemented/` Agent Notes: "should", migration plans, acceptance checklists. An implemented Agent Note describes what is, per the [implemented-note instructions](../.agents/notes/implemented/AGENTS.md).

## Repository references

Use relative Markdown links for current files and tags or PR numbers for historical references. `verify-md-links` checks local targets. [Reference validation](../scripts/verify-repository-references.ts) rejects commit identifiers containing a hexadecimal letter and disallowed organization URLs in maintained files. Decimal-only tokens are ignored to avoid collisions with numeric data, even when they identify commits.
