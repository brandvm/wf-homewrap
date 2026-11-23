# Audit: Homewrap (www.homewrap.ca)

Read-only baseline taken 2026-11-20 before the site moves onto wf-template.
Nothing was written to Webflow. Each point is marked *measured* or *read
from the code*. The earlier read-only audit of the same day (speed, SEO,
schema) is summarised in the Figma file "Documentations", page
`01 · Change tracker`; its numbers are not repeated here and were not
re-measured.

## What this baseline covers

| Check | Status |
| --- | --- |
| Visual baselines, 7 key pages × 4 widths, with noise floor | done (below) |
| Heading outline, 7 key pages | done (below) |
| Custom code inventory, word for word | done (`ROLLBACK.md`, `rollback/`) |
| Pages list (Webflow API) | done (below) |
| Speed (`wf:perf`, median of 5) | not run here; see tracker HW-05 for the earlier numbers |
| Accessibility, links, published HTML, SEO, tracking, domain | not run yet |

## Visual baselines (*measured*)

`pnpm wf:baseline save --live --dir .webflow-build/baselines`, then
`compare` straight away with no change made. Images stay out of git
(`.webflow-build/` is ignored); they live on this machine only.

- Pages: `/`, `/about`, `/services`, `/services/kitchen-renovations`,
  `/portfolio`, `/portfolio/full-home-renovation-newmarket`, `/contact`
  (`webflow-build.config.json`).
- Widths: 1440, 820, 667, 390.
- **Noise floor: 0.0 % of pixels on all 28 page × width pairs** (two
  untouched runs, minutes apart). Any later difference above 0.1 % is a
  real change.

## Heading outlines (*measured*, `pnpm wf:outline --live`)

| Page | H1 | Notes |
| --- | --- | --- |
| `/` | Engineer-Led Design-Build Contractor in Toronto | 8 H2s; section items have no H3s (HW-03) |
| `/about` | **2 H1s**: "Build different from the start." and "About Homewrap Construction" | "What We Do" H2 appears twice; the first H1 contains a zero-width joiner (HW-03) |
| `/services` | Our Services | no H2s at all (HW-03) |
| `/services/kitchen-renovations` | Kitchen Renovation in Toronto & GTA | 4 H2s |
| `/portfolio` | Our Projects | no H2s |
| `/portfolio/full-home-renovation-newmarket` | Newmarket Full Home Renovation | 5 H2s, 1 H3 |
| `/contact` | Get in Touch | no H2s |

Full output: `.webflow-build/outlines-all.txt` (local).

## Custom code (*read from the code*; Webflow API through `webflow-homewrap` and the published HTML)

- **Drafts match what is published.** Site head code, site footer code and
  the Home page code read through the API are identical, character for
  character, to the published HTML. No unpublished custom code is pending.
- Site head: viewport meta with `maximum-scale=1` (blocks pinch zoom, an
  accessibility problem), theme colour, font preload with `type="font/tff"`
  (typo; should be `font/ttf`), Ahrefs analytics, a `<style>` hiding
  `.w-webflow-badge` and Lenis CSS, the site-wide GeneralContractor JSON-LD.
- Site footer: Lenis 1.1.5 from **unpkg**, the **CodeSandbox** script
  `8n3dq9.csb.app/Homewrap/homewrap-main.js`, a UTM field populator, a
  first-touch attribution script.
- Page code: Home and Portfolio footers carry the same "See more" cursor
  (CSS + JS); the Thank You page head fires the Google Ads conversion
  (`AW-18142199123`, value 500 CAD). The other 12 pages have none.
- Canvas Embeds (from the published HTML; the API can't read Embeds): one
  Embed on every page links `8n3dq9.csb.app/Homewrap/homewrap-main.css` and
  four Phosphor 2.1.1 stylesheets; a "UTM Source Grabber" Embed appears 25
  times across 24 pages.
- **UTM fields are filled twice**: by the footer populator and by the
  Embed. Harmless today; one should go when the code moves to the repo.
- `homewrap-main.js` starts with `File: terawulf-main.js`: it began as a
  copy of another project's file.
- Registered (app) script: GA4 phone/email click tracking 1.0.0, site
  footer.
- Webflow-hosted libraries: GSAP 3.15, ScrollTrigger, SplitText (site
  settings), jQuery 3.5.1, webflow.js.

## Pages (*read from the API*)

15 static and template pages; Blog and Style Guide are drafts. CMS
templates: Services, Projects (portfolio), FAQs, Testimonials, Tags,
Permits, About Gallery. The sitemap lists 24 URLs (5 static, 8 services,
11 portfolio). Utility pages (404, password) are not readable through the
API. Full list: `rollback/designer-code-2026-11-20.md`.

## HW-01 parity simulation, 2026-11-23 (*measured*, no Webflow writes)

The planned batch was simulated on the live pages: each www.homewrap.ca
document was rewritten in the browser the way the batch would change the
custom code (loader head code with `RELEASE = "1.0.0"`, Embeds 2a/2b in
place of the sandbox `<link>`, the footer loader in place of the unpkg
Lenis tag, the Lenis start-up and the sandbox script), the bundle was
served from this repo's `dist/`, and `8n3dq9.csb.app` and `unpkg.com` were
blocked. Each page × width was shot three times in a row: live, rewritten,
live again.

- 7 pages × 4 widths: **0 changed**. Live vs live and live vs rewritten both
  0.00 % of pixels (one 7–13 px row band of a moving element on Home at 667
  and 390, inside the live-vs-live noise), page heights identical.
- Lenis active (`html.lenis`) and Swiper loaded on every page that had them.
- Run again 23 Nov with piece 2b in the site footer code instead of a
  second Embed (the batch as planned, `batches/hw-01/`): 0 of 28 changed,
  no page errors, no requests to the sandbox or unpkg.
- No page errors. Requests to the sandbox or unpkg from the rewritten pages: 0.
- `/contact` at 1440 varies between loads on its own: 2479 px on 20 Nov,
  2462 px in the morning of 23 Nov, 2479 px again later that day, with no
  publish in between (the API: live domain last published 26 Oct 2026). Its
  noise floor across time is not 0: up to 17 px of height and ~6 % of
  pixels. Compare it within one run (live, change, live), not against an
  old baseline alone.
- Publish state (API, 23 Nov): staging (homewrap.webflow.io) last published
  17 Oct 2026, live domains 26 Oct 2026, Designer last changed 19 Nov 2026.
  So there are unpublished Designer changes, and a publish of either target
  sends them.
- Baselines re-saved 23 Nov for live and staging (`.webflow-build/baselines-live`,
  `baselines-staging`); two untouched runs each: 0.0 % on all pairs.

## Findings, sorted

1. **The site depends on a CodeSandbox preview host** for its main script
   and stylesheet (HW-01). *Read from the code.* Gain: no silent breakage.
   Risk of the fix: low if moved byte-for-byte first (parity release).
   The copies are saved in `rollback/vendor/` with checksums.
2. **Lenis from unpkg** and **four Phosphor weights from jsDelivr** on
   every page. *Read from the code.* The template bundles libraries
   (`pnpm add lenis`, `pnpm phosphor`), and four icon weights are ~337 KB
   of CSS before fonts (HW-05).
3. **Two H1s on /about**; no H2s on /services, /portfolio, /contact
   (HW-03). *Measured.*
4. **Pinch zoom disabled** (`maximum-scale=1`). *Read from the code.* Not
   on the tracker yet; needs a decision.
5. UTM fields populated twice; font preload type typo. *Read from the
   code.* Cleanup, after parity.

*Gate:* the person has this report.
