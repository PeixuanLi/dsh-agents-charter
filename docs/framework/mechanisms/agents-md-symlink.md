# Agent instructions and the CLAUDE.md symlink

English | [中文](agents-md-symlink.zh.md)

- Layer: [L4 — Instruction layering](../layers/l4-instruction-layering.md)
- Governs: one rule source serving every AI tool namespace, instead of per-tool copies that drift apart.

## Rule text

The root [AGENTS.md](../../../AGENTS.md) is the single rule source; `CLAUDE.md` is a symlink to it, so Claude Code, Codex, and any AGENTS.md-reading tool load identical rules. The `.claude/skills` symlink keeps the on-demand skill layer shared (Codex does not read `.claude/skills`). In a monorepo the pattern repeats in every governed directory, each holding an AGENTS.md plus a CLAUDE.md sibling. The editing rules live in [AGENTS.md](../../../AGENTS.md) under "Editing these instructions".

## Enforcement

`Convention — gate on first observed drift`. The drift surface is one symlink; a repository search for a non-symlink `CLAUDE.md` is the natural gate when drift is first observed.

## Cost and prerequisites

None beyond the repository. Works in any tool that reads AGENTS.md or CLAUDE.md; tools reading neither simply ignore it.

## Team fit

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Create `AGENTS.md` with the rules that must be resident in every session.
- Replace any existing `CLAUDE.md` with a symlink: `ln -sf AGENTS.md CLAUDE.md`.
- If skills are used, create the skills symlink with `mkdir -p .claude && ln -sfn ../.agents/skills .claude/skills`.
- Add one line to the onboarding doc: edit `AGENTS.md`, never `CLAUDE.md`.
- Verify integrity: `git ls-files -s CLAUDE.md` must show mode `120000`; on Windows require `core.symlinks=true` plus Developer Mode (Git Bash `ln -s` copies by default; set `MSYS=winsymlinks:nativestrict`).

## Failure mode

Copying instead of symlinking reintroduces the drift problem: rules fixed in one file but not the other, with no signal. The failure is silent, which is why the checklist pins the symlink explicitly.
