# Decisions: Homewrap

One line per decision: date, who, what, and what it means.

- 2026-11-20 · team · Move Homewrap onto wf-template (HW-06): repo
  `brandvm/wf-homewrap` (public, from the template), MCP server
  `webflow-homewrap`. The live site is not changed until a batch gets the
  go-ahead.

## Proposed, not decided yet

- The first change to the site is a parity release: the sandbox JS/CSS
  move byte-for-byte into the repo, nothing a visitor can see
  (webflow-audit › 5). Clean-ups come after, one batch each.
