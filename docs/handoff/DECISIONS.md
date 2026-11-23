# Decisions: Homewrap

One line per decision: date, who, what, and what it means.

- 2026-11-20 · team · Move Homewrap onto wf-template (HW-06): repo
  `brandvm/wf-homewrap` (public, from the template), MCP server
  `webflow-homewrap`. The live site is not changed until a batch gets the
  go-ahead.

## Proposed, not decided yet

- Loader piece 2b goes at the top of the site footer code, not in a second
  Embed: `G | Embed Code` is one Embed at the component root and the API
  can't edit Embeds, so the person changes one line only. Simulated: no
  difference. `loader.html` in the repo keeps the template layout; this
  site's installed layout is in `batches/hw-01/`.

- The first change to the site is a parity release: the sandbox JS/CSS
  move byte-for-byte into the repo, nothing a visitor can see
  (webflow-audit › 5). Clean-ups come after, one batch each.
