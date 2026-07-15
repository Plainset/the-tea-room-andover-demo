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
