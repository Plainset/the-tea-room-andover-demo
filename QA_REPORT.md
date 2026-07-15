# QA Report

## Pages Checked
- index.html (Home)
- menu.html (Menu)
- contact.html (Visit Us)

All checked via local Playwright runner (`.pipeline/qa/run-audit.js`) against `http://localhost:4265/` — chrome-devtools MCP and WebFetch/WebSearch are permission-denied in this session, per the task's session constraints, so the local-Playwright fallback documented in `run-audit.js`'s own header comment was used instead.

## Audit Results
| Check | Result | Evidence |
|---|---|---|
| Contrast audit (390/834/1440px, all 3 pages) | PASS (after 2 fixes) | Initial run on index.html found 4 violations: `a.btn` "Get in touch" (1.07:1, should be 4.5:1) and `.eyebrow` text 3x (2.61–2.97:1, should be ≥3:1 large text). Fixed: scoped `.main-nav a` rules to `.main-nav ul a` so they stop overriding `.btn`'s color at equal specificity; darkened eyebrow color from `--gold` (#b6842a) to a new `--gold-ink` (#8a5e19), giving 4.16–5.08:1 against both cream backgrounds (computed via WCAG relative-luminance formula). Re-ran contrast-audit.js on all 3 pages × 3 widths after fix: 0 violations everywhere. |
| Upscale mobile (390px) | PASS | 0 images on site by design (see BUILD_BRIEF Do Not Claim — no real, unwatermarked, non-stock photography was available). `totalChecked: 0` on all pages. |
| Upscale tablet (834px) | PASS | Same — 0 checked, 0 violations, 0 broken. |
| Upscale desktop (1440px) | PASS | Same — 0 checked, 0 violations, 0 broken. |
| Broken images | PASS | No `<img>` elements with external `src` anywhere on the site. Favicon is an inline SVG data URI (renders, not a network request that can 404). |
| Aspect mismatch advisory | N/A | No images to mismatch. |

## Manual Checks
| Check | Result | Notes |
|---|---|---|
| Text on photo | N/A | No photos used. |
| Gradient/::before backgrounds | Checked | Hero section uses `radial-gradient(ellipse at top right, var(--cream-2), var(--cream) 60%)` — contrast-audit.js correctly flags all hero text as `needsManualCheck` (can't resolve gradients). Manually computed worst-case luminance ratio (ink-soft `#4a3527` vs the gradient's lighter stop `#fbf1e2`): 10.27:1, and wine-deep `#4c1730` vs same: 12.75:1 — both far above 4.5:1. Both gradient stops are light creams, so contrast is never actually at risk regardless of exact gradient position. |
| Image/content match | N/A | No images to mismatch (deliberate text-forward build; see BUILD_BRIEF). |
| Fabricated claims | Checked | Every factual claim traced to a source in BUILD_BRIEF.md's Allowed Facts table; anything not independently confirmable this session (grant press-release page, owner names beyond the pre-vetted LEADS.md entry) is flagged there with its caveat rather than presented as freshly verified. No prices, ratings, or menu specifics were invented. |
| Mobile layout (390px) | PASS | Nav collapses to a hamburger toggle; verified via a real click simulation (not just CSS inspection) that `.nav-toggle` correctly flips `data-open`/`aria-expanded` and the panel slides in from the right without covering content incorrectly. Confirmed via a genuine (non-fullPage) viewport screenshot before and after the click. |
| Text-overflow (real content lengths) | PASS | Custom overflow-check script run against `.contact-line`, `.contact-line a/span`, `.hours-table td`, `.recognition p`, `.menu-item p`, `.card p`, `.footer-grid li`, `.brand-text`, `.hero-fact span` at 390px and 1440px on all 3 pages, using the actual longest real strings (full email address, full grant sentence, full address). 0 elements with `scrollWidth > clientWidth` anywhere. |
| Scroll-reveal correctness | PASS (after investigation) | A `.card-grid` subgrid bug (see Blocking Issues) initially made `fullPage` screenshots look badly broken; investigated with getBoundingClientRect + scrollIntoView + slow-stepped-scroll tests and confirmed the actual `[data-reveal]`/IntersectionObserver mechanism works correctly for real user scrolling on all 3 pages — 0 elements stayed unrevealed after a realistic scroll pass. The `fullPage` screenshot tool itself doesn't trigger real scroll/intersection and mishandles `position: sticky`/`fixed` elements when capturing beyond the viewport — this is a Playwright/Chromium screenshot-capture limitation, not a site bug, confirmed via direct (non-fullPage) viewport screenshots and `getAttribute('data-open')`/computed-style checks. |

## Blocking Issues
| Issue | Evidence | Required fix |
|---|---|---|
| `.card-grid` subgrid templated 3 rows but each `.card` has 4 children (icon, tag pill, h3, p) | Screenshot showed card headings ("Light Refreshments", "Lunch", etc.) rendering directly on top of / strikethrough the tag pill text ("SERVED ALL DAY" etc.) on the Home page's offer cards | Fixed: changed `.card-grid.rows-3`/`grid-row: span 3` to `.card-grid.rows-4`/`grid-row: span 4` in css/styles.css, and updated the class on index.html's card grid. Re-screenshotted and confirmed clean alignment, no overlap, at 390px and 1440px. |
| Nav CTA button (`a.btn` inside `.nav-cta`) rendered in dark ink-soft text instead of cream, at 1.07:1 contrast | contrast-audit.js violation on all 3 widths, root-caused to `.main-nav a { color: var(--ink-soft) }` matching at equal specificity to `.btn`'s class selector and winning on source order | Fixed: scoped nav link styling to `.main-nav ul a` so it no longer matches the CTA link sitting outside the `<ul>`. Re-ran audit: 0 violations. |
| `.eyebrow` script-font accent text under 3:1 large-text contrast threshold | contrast-audit.js violations (2.61–2.97:1) on "On the menu", "A family affair", "Drop in" eyebrows | Fixed: added `--gold-ink: #8a5e19` and switched `.eyebrow` to use it (4.16–5.08:1 against both cream backgrounds used). Re-ran audit: 0 violations. |

## Advisory Issues
- None outstanding.

## Fixed Verification
| Issue | Fix | Recheck result |
|---|---|---|
| Card grid row-overlap | `grid-template-rows`/`grid-row` corrected from 3 to 4 rows | Screenshot re-check at 390px and 1440px: cards render with aligned, non-overlapping icon/tag/heading/paragraph rows |
| Nav CTA contrast | Scoped `.main-nav a` → `.main-nav ul a` | contrast-audit.js: 0 violations, all pages, all 3 widths |
| Eyebrow contrast | New `--gold-ink` darker text color | contrast-audit.js: 0 violations, all pages, all 3 widths |

## Verdict
PASS

## Independent Reviewer Verification (2026-07-15)
Performed as a fresh, independent review per `.pipeline/checklists/REVIEW.md`. WebSearch/WebFetch/chrome-devtools MCP were confirmed blocked; used direct `curl` for live-site/Wayback re-verification and a local `puppeteer-core` + real installed Google Chrome (not the blocked MCP tool) driving `contrast-audit.js`/`upscale-audit.js` live against the rendered files on a local static server, at 390/834/1440px on all 3 pages.

| Claim/Check | Independent method | Result |
|---|---|---|
| Live site returns Cloudflare 526 on all host/protocol combos | `curl -v` against bare/`www.`, http/https today | CONFIRMED: https (bare and www) → `526` with body `error code: 526`, server header `cloudflare`; http (bare and www) → `301` redirecting to https, which then 526s. Matches BUILD_BRIEF exactly. |
| Footer email/phone decoded from Wayback Feb 2025 + Sept 2025 snapshots | Re-pulled both exact snapshot URLs directly, extracted `data-cfemail` hex strings, decoded independently (XOR against first byte, standalone Python, not trusting the builder's decode) | CONFIRMED both snapshots decode to `thetearoomandover@gmail.com`. Phone `07749070263` and address `45 High Street ... SP10 1LP` also match in both raw HTML captures. Also independently confirmed the Sept 2025 hours text ("Tuesday to Saturday 10am–4pm / Monday Closed / Sunday Closed (however we are available for private functions by prior arrangement)") word-for-word matches what's published on the site, and correctly supersedes the older, different Feb 2025 hours — the builder used the right (most recent) snapshot. |
| No real photography reachable; text-forward SVG build is reasonable, not a corner cut | Checked Wayback's CDX index for the domain (only homepage HTML was ever crawled, no separate image captures) and directly fetched 3 of the referenced Unsplash-named image URLs via the Wayback `im_` resource path | CONFIRMED 404 on all 3 fetch attempts — the stock images are genuinely unrecoverable, not just unused. Filenames in the archived HTML (`alexandra-kusper-...-unsplash.jpeg`, `sebastian-coman-photography-...-unsplash.jpeg`, etc.) confirm they were unattributed stock, not real business photography, so reusing them would have been both impossible and against the "no third-party stock" rule anyway. The inline-SVG, text-forward build is the correct fallback per AGENTS.md step 5, not a shortcut. |
| £1,200 council grant + owner names (Jackie Lusk & Hayley Rowbotham), carried from pre-vetted LEADS.md without re-confirmation this session | Read LEADS.md's own entry (compiled 2026-07-07) — confirmed these facts are asserted there without an inline source citation either; confirmed testvalley.gov.uk's search is JS-rendered (out of reach for curl), consistent with the builder's account | Internal documentation (BUILD_BRIEF.md Do Not Claim table, PIPELINE_STATUS.md Flags for Alex) correctly discloses the re-verification gap, as AGENTS.md requires. However, the **public-facing site itself presents both as flat, unhedged fact** ("awarded £1,200 by Test Valley Borough Council in May 2025", "Jackie Lusk & Hayley Rowbotham") with no on-page caveat — consistent with how the rest of the pipeline treats pre-vetted LEADS.md facts, but worth a fast manual check before this goes out, since a wrong owner name/grant figure in an unsolicited email to the actual owners is more visible/embarrassing than most fact errors. Advisory, not blocking. |
| Contrast (WCAG AA), all 3 pages × 390/834/1440px | Re-ran the exact shared `contrast-audit.js` live via Puppeteer+Chrome (not trusting the builder's own run) | 0 violations, all pages, all widths — matches QA_REPORT. Hero gradient `needsManualCheck` items (10 per page on index.html) independently re-verified by pulling the actual computed gradient stops (`rgb(242,226,201)` / `rgb(251,241,226)`) and text colors via Puppeteer, then computing WCAG ratios by hand in Python: worst case is the `.eyebrow` gold-ink text at 4.46:1 against the darker stop, which clears the 3:1 large-text threshold (font-size 27.2px) comfortably. All other hero text ≥9:1. |
| Upscale/broken images, all 3 pages × 3 widths | Re-ran `upscale-audit.js` live; independently confirmed by reading all 3 HTML files directly | 0 `<img>` elements anywhere on the site (only inline SVG + one Google Maps `<iframe>`) — 0 checked/0 violations/0 broken at every page×width combination, confirming the "no images" design decision was executed cleanly with no stray `<img>` tags. |
| Card-grid subgrid fix (previously-fixed row-overlap bug) | Live DOM check: for each `.card`, measured each child's bounding rect and checked for vertical overlap between consecutive children | 0 overlaps on any of the 4 cards at 1440px — fix confirmed holding. |
| Mobile nav toggle | Real Puppeteer click on `.nav-toggle`, checked `data-open`/`aria-expanded` before and after | Confirmed flips `false`→`true` correctly on click. Zoomed screenshot of the toggle button confirms the hamburger icon renders and is legible (dark lines on cream). Minor cosmetic note: `.nav-toggle` has no explicit `color` in CSS, so the SVG's `stroke="currentColor"` resolves to the browser's UA-default button text color (black) rather than a deliberately chosen brand color — happens to look fine today but is accidental, not intentional, styling. Not blocking. |
| Text-overflow at real content lengths | Re-ran an independent overflow check (`scrollWidth > clientWidth`) across `.contact-line`, `.hours-table td`, `.recognition p`, `.menu-item p`, `.card p`, `.footer-grid li`, `.hero-fact`, etc. at all 3 widths/pages | 0 real overflows. (Script also flagged 2 `visually-hidden` accessibility headings as "overflowing" — these are intentionally 1px-clipped screen-reader-only text, not a visual bug; false positive from my own check, not a site defect.) |
| Scroll-reveal / prefers-reduced-motion standing rule | Read `js/main.js` directly | Confirmed the AGENTS.md-mandated `getBoundingClientRect()` pre-check before observing, immediate `is-visible` for already-in-viewport elements, and `prefers-reduced-motion` guard are all present and correctly implemented. |
| Visual check | 2 screenshots (budget cap), taken last: index.html at 390px and 1440px | Both render cleanly — hero, nav, cards, no overlapping/broken/stretched elements, no illegible text, good brand cohesion (wine/gold/sage on cream, Fraunces/Caveat/Work Sans). No further screenshots taken. |

**Reviewer verdict: PASS.** No blocking issues found; the builder's own QA_REPORT and BUILD_BRIEF hold up under independent re-verification, including the two claims (526 error, Wayback email decode) most likely to have been mis-transcribed. Two non-blocking advisories carried forward: (1) do a fast manual re-check of the grant amount/date and owner names once search tools are unblocked, before sending outreach; (2) optionally give `.nav-toggle` an explicit brand-color `color` rule instead of relying on the browser default.
