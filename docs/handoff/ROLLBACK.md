# Rollback: Homewrap

Rollback point before anything moves onto wf-template. Recorded 2026-11-20,
before any write to Webflow from this repo.

- Live domain: https://www.homewrap.ca (staging https://homewrap.webflow.io)
- Webflow site id: `69d94a56e6aede994cf58ad7`
- Git tag: `rollback-2026-11-20` (the commit that adds this file). Nothing in
  this repo is loaded by the site yet; the tag marks the state the copies
  below describe.
- Webflow backup: **[Person]** Site settings › Backups › create one named
  `2026-11-20 before wf-template` and tick it off here: [ ]

## What the live site loads today (all 24 sitemap pages, identical)

| What | From | Where it is pasted | Saved copy |
| --- | --- | --- | --- |
| `homewrap-main.js` (25,000 bytes, `defer`) | `https://8n3dq9.csb.app/Homewrap/homewrap-main.js` (CodeSandbox preview host) | Site footer code | `rollback/vendor/homewrap-main.js` |
| `homewrap-main.css` (11,894 bytes) | `https://8n3dq9.csb.app/Homewrap/homewrap-main.css` | Embed on every page (with the Phosphor links) | `rollback/vendor/homewrap-main.css` |
| Lenis 1.1.5 | `https://unpkg.com/lenis@1.1.5/dist/lenis.min.js` | Site footer code | `rollback/vendor/lenis@1.1.5.min.js` |
| Phosphor 2.1.1: bold, fill, light, regular | `https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/<weight>/style.css` | Same Embed as the sandbox CSS | `rollback/vendor/phosphor-2.1.1-*.css` (stylesheets only; their font files stay on jsDelivr, which keeps npm versions permanently) |
| GSAP 3.15, ScrollTrigger, SplitText | Webflow's own CDN (site settings) | Webflow | not copied: Webflow hosts them |
| Ahrefs analytics | `analytics.ahrefs.com` | Site head code | n/a |
| GA4 phone/email click tracking 1.0.0 | Webflow app script | Webflow app | n/a |

Checksums of the saved copies (downloaded 2026-11-20 15:17 ET): `rollback/vendor/SHA256SUMS`.

The sandbox host is the risk (tracker HW-01): CodeSandbox preview URLs can
change or disappear, and the site would lose its script and stylesheet with
no warning. The copies above are what it served on 2026-11-20. Note:
`homewrap-main.js` still carries the header comment `File: terawulf-main.js`
(copied from another project's starter); the contents are Homewrap's.

## The custom code, word for word

As **published** on 2026-11-20 (read from the live HTML of every sitemap
page; `rollback/published-html/` has all 24 pages):

| Block | File | Found on |
| --- | --- | --- |
| Site head code | `rollback/published-head-code.html` | all 24 pages, identical |
| Site footer code | `rollback/published-footer-code.html` | all 24 pages, identical |
| Page footer code (custom "See more" cursor) | `rollback/published-page-code-home-and-portfolio.html` | `/` and `/portfolio` only |
| Embeds with code (stylesheet links; UTM grabber) | `rollback/published-embeds.html` | stylesheet Embed on all 24 pages; UTM Embed 25 times (one page has it twice) |
| Webflow app script (after the footer code) | `rollback/published-webflow-app-scripts.html` | all pages |

| Thank You page head code (Google Ads conversion, `AW-18142199123`) | in `rollback/designer-code-2026-11-20.md` (and `published-html/thank-you.html`) | `/thank-you` only (not in the sitemap) |

**Drafts checked 2026-11-20** through `webflow-homewrap` (signed in to this
site only; it reaches one site, 69d94a56e6aede994cf58ad7). The site head,
site footer and Home page code in the Designer are identical to the
published files above: nothing unpublished is pending. The API's raw
output, every page included, is `rollback/designer-code-2026-11-20.md`.
The API cannot read canvas Embeds; those come from the published HTML only.

## Rollback steps

Each step undoes one kind of change. Nothing below is needed until a batch
changes the site.

1. **Custom code** (site head/footer, page code): paste the matching
   `rollback/published-*.html` file back into Site settings › Custom code
   (or Page settings for `/` and `/portfolio`), save, publish staging,
   check, then publish live after the person types "publish".
2. **Embeds:** paste the block from `rollback/published-embeds.html` back
   into the Embed it came from.
3. **If the sandbox host is gone before the move:** host the saved
   `vendor/homewrap-main.js` and `.css` from this repo (GitHub Pages
   staging bundle or a pinned jsDelivr tag of this repo) and point the two
   tags at them. Verify the checksum first.
4. **After the move to the loader:** set `RELEASE` in the head code back to
   the previous tag and publish (README › Release).
5. **Whole site:** restore the Webflow backup named above (Site settings ›
   Backups). It restores the Designer state, not this repo.

Each step was checked as possible on 2026-11-20: the files exist in this
repo, the Backups panel is a person step. *Gate:* the person confirms.
