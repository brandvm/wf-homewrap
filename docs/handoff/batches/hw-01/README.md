# Batch HW-01: parity release (sandbox and unpkg code from the repo)

One change a person can describe in a sentence: the site's own script and
stylesheet, and Lenis, load from this repo (release `v1.0.0` on jsDelivr)
instead of `8n3dq9.csb.app` and `unpkg.com`. Nothing a visitor can see
changes.

## What is written, and by whom

| # | Where | Change | Who | File |
| --- | --- | --- | --- | --- |
| 1 | Site settings › Custom code › Head code | Loader piece 1 added at the top, `RELEASE = "1.0.0"`. The existing head code follows unchanged. The template's `theme-color` meta is left out: the site already sets `#ffffff`. | Claude, `set_site_freeform_code` | `site-head-code.html` |
| 2 | Site settings › Custom code › Footer code | Removed: the unpkg Lenis tag, the Lenis start-up script, the CodeSandbox script (`removed-from-footer.html`). Added at the top: loader piece 2b, then piece 3. The UTM and attribution scripts stay as they are. | Claude, `set_site_freeform_code` | `site-footer-code.html` |
| 3 | Component **G \| Embed Code** (the HTML Embed at its root, on every page) | One line: the `<link … 8n3dq9.csb.app/Homewrap/homewrap-main.css" />` becomes the 2a link (`id="wfc-css"`, staging `styles.css?v=1`). Everything else in the Embed stays, in the same order. | **Person** in the Designer: the API can't edit an Embed's code | `g-embed-code.html` (the whole Embed after the change) |

Piece 2b sits in the footer code rather than in a second Embed after 2a
(template default) because `G | Embed Code` is a single Embed at the
component root; adding a sibling means restructuring the component. 2b
only swaps the stylesheet after it has loaded, so it doesn't need to come
right after 2a. Variant checked by simulation (AUDIT.md).

## Order

1. Person: Webflow backup (Site settings › Backups) named
   `2026-11-23 before HW-01`.
2. Claude: re-read site head/footer code; stop if it differs from
   `rollback/designer-code-2026-11-20.md` (someone changed it).
3. Claude: write 1 and 2 (after the go-ahead). Person: write 3.
4. Publish to **homewrap.webflow.io only**. Note: staging was last
   published 17 Oct 2026 and the Designer was last changed 19 Nov 2026,
   so this staging publish also carries every Designer change since 17 Oct.
   It does not touch www.homewrap.ca.
5. Verify on staging (below).
6. Person checks what else is pending for the live domain. The live
   domain was last published 26 Oct; Designer changes since then go live
   with this batch. Then types **publish**.
7. Publish to www.homewrap.ca and homewrap.ca; verify with `--live`.

## Checks

Staging and live, each:

- `wf:baseline compare` against the 2026-11-23 baselines (live:
  `.webflow-build/baselines-live`, staging: `.webflow-build/baselines-staging`):
  7 pages × 4 widths, inside the noise floor.
- `wf:film` on `/` and `/contact`: the load, not only the settled page.
- Network: no request to `csb.app` or `unpkg.com`; `index.js` and
  `styles.css` from GitHub Pages (staging) or jsDelivr `@1.0.0` (live).
- Console: no errors; `[wfc]` messages none; "Site Modules ready" logged.
- Behaviour: Lenis smooth scroll (`html.lenis`), Swiper carousels, go to
  top, nav shrink, the See more cursor (Home, Portfolio), UTM and
  attribution fields filled in a form (test with `?utm_source=test`,
  without submitting).

## Rollback

Paste `rollback/published-head-code.html`, `rollback/published-footer-code.html`
and the Embed from `rollback/published-embeds.html` back, publish. The
sandbox copies are in `rollback/vendor/` if the sandbox is gone by then.
