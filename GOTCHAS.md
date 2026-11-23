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
### 2026-11-23 · The MCP can't edit an HTML Embed's code (or read it)
- Area: mcp
- Scope: template-candidate
- Symptom: `get_all_elements` lists the HtmlEmbed in `G | Embed Code` but returns no code; no tool action writes Embed code. Site and page head/footer code can be read and written (`get_site_freeform_code`, `set_site_freeform_code`).
- Cause: Webflow Data/Designer API limits.
- Fix: Embed code is read from the published HTML and changed by a person in the Designer (MANUAL-TODO A). Loader piece 2b goes in the site footer code (before piece 3) instead of a second Embed, so the person edits one line only.
- Status: open
- Found by: claude

### 2026-11-23 · Template module tests fail when a starter module is switched off
- Area: ci
- Scope: template-candidate
- Symptom: `tests/modules.spec.mjs` failed 3 tests (aria-roles, placeholders, unique-form-ids) after the HW-01 parity release took the starter modules out of `src/index.ts`.
- Cause: the tests assume every starter module is in the bundle. A live site moved onto the template (webflow-audit › parity release) must not run code it didn't run before; `unique-form-ids` would rename the duplicate field ids of the two forms on /contact.
- Fix: each of those tests is skipped when `src/index.ts` has no `run('<name>'` for it. The template could do the same.
- Status: open
- Found by: claude

### 2026-11-20 · pnpm test fails right after new-project (update-skills check)
- Area: ci
- Scope: template-candidate
- Symptom: `pnpm test` in a fresh client repo: Playwright 20 passed, then `tests/update-skills.check.mjs` fails expecting "What's new since 0.2.0", because `new-project` deletes `CHANGELOG.md`. CI runs `pnpm test`, so the staging deploy is skipped until it passes.
- Cause: template 1.0.0 test assumes the template repo. A fix exists on the template's unmerged branch `fix/tests-in-client-repos` (local 1.0.1, not on `master`, not tagged).
- Fix: none here yet. Nothing on the live site loads from staging, so it blocks nothing until the parity release; take the template fix with `pnpm update-skills` once it is released.
- Status: fixed ac199d3 (tests copied from wf-template v1.0.1)
- Found by: claude
