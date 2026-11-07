# Rehearse every PR, dispatch the release by hand

English | [中文](release-double-gate.zh.md)

- Layer: [L5 — Process automation](../layers/l5-process-automation.md)
- Governs: every PR rehearses packaging without credentials; a human dispatches the release from a tag.

## Rule text

The mechanism has no resident rule text; it is two workflows. The first runs on every PR and rehearses the release's packaging steps with no credentials present, so packaging breaks surface as ordinary CI noise instead of release-day emergencies. The second is a manual dispatch: a human releases from a tag, and the workflow sets a pending state before it evaluates, so a failed setup cannot leave a previous success standing.

## Enforcement

Both gates are workflows: the rehearsal is a required check on every PR, and the release exists only as a manual dispatch on a tag — never an automatic step on push. `Ported-config reference: reference/github/release.yml` (restored in milestone M3).

## Cost and prerequisites

One credential-free job plus a dispatch entry point — the cheapest pair of gates that still removes a human memory step from releasing. The gate applies from the first tagged release onward: it needs a CI job that builds the release artifact without credentials, and before any release exists there is nothing to rehearse.

## Team fit

Solo ✓ · Small ✓ · Medium ✓ · Large ✓ — one CI job and one dispatch entry, worth running from the first tagged release onward; a repository with no release process yet has nothing for the rehearsal to cover.

## Porting checklist

- Run the packaging rehearsal on every PR with no credentials present: the same steps the release would run, minus every secret.
- Make the rehearsal a required check, so a packaging break blocks the merge.
- Release only from a manual dispatch on a tag; never release automatically on push.
- Set the pending state before the release workflow evaluates, so a failed setup cannot leave a previous success standing.
- Verify: open a PR that breaks packaging and confirm the rehearsal rejects it before merge.

## Failure mode

Release by memory misses a step exactly when pressure is highest: the rollout is today, the checklist lives in someone's head, and the missed step ships. The rehearsal makes packaging failures ordinary CI noise instead of release-day emergencies; the human dispatch keeps the decision to ship a decision.
