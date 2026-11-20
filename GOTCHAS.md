# Gotchas

A running log of things that cost time on this project. Agents read it at
the start of every session and add to it when they hit something new (see
the Session protocol in `AGENTS.md`). Never delete an entry — update its
`Status` instead.

Lessons from earlier builds are in the skill, not here:
`.claude/skills/webflow-build/lessons/` (one file per area). Read the file
for the area you work in. Entries tagged `Scope: template-candidate` are
collected from client repos into those files.

## Entry format

```md
### YYYY-MM-DD · Short title
- Area: designer | css | loader | release | mcp | ci | js | perf
- Scope: project | template-candidate
- Symptom: what was observed
- Cause: why it happened
- Fix: what was done, or the workaround
- Status: open | fixed <sha> | upstreamed wf-template <sha>
- Found by: claude | codex | human
```

## This project

<!-- Add new entries here, newest first. -->
### 2026-11-20 · pnpm test fails right after new-project (update-skills check)
- Area: ci
- Scope: template-candidate
- Symptom: `pnpm test` in a fresh client repo: Playwright 20 passed, then `tests/update-skills.check.mjs` fails expecting "What's new since 0.2.0", because `new-project` deletes `CHANGELOG.md`. CI runs `pnpm test`, so the staging deploy is skipped until it passes.
- Cause: template 1.0.0 test assumes the template repo. A fix exists on the template's unmerged branch `fix/tests-in-client-repos` (local 1.0.1, not on `master`, not tagged).
- Fix: none here yet. Nothing on the live site loads from staging, so it blocks nothing until the parity release; take the template fix with `pnpm update-skills` once it is released.
- Status: open
- Found by: claude
