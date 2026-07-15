# Build Brief

## Contact
- Email: thetearoomandover@gmail.com
- Email source URL: thetearoomandover.co.uk (own site) — live site returns Cloudflare 526 on every load, so re-verified via two Wayback Machine snapshots of the exact same domain: https://web.archive.org/web/20250223192712/https://thetearoomandover.co.uk/ and https://web.archive.org/web/20250907144247/https://thetearoomandover.co.uk/. Both snapshots' footer `cdn-cgi/l/email-protection` obfuscated string decodes (XOR against its own key byte) to `thetearoomandover@gmail.com`, matching LEADS.md exactly. Phone `07749070263` also matches in both snapshots.
- Rechecked date: 2026-07-15
- Phone: 07749 070263
- Address: 45 High Street, Andover, Hampshire, SP10 1LP (from archived site footer, both snapshots)

## Business State Check
- Status: still open at logged address (best available evidence; live site itself is unreachable so this is inferred, not directly observed today)
- Checked sources:
  - Direct curl of thetearoomandover.co.uk and www., both HTTP and HTTPS: all four return either a 301 (http→https) or Cloudflare error 526 "Invalid SSL Certificate" (`curl -v` shows Cloudflare's edge TLS handshake succeeds — valid Google Trust Services edge cert — but the origin responds 526, meaning Cloudflare's proxy is still active/paid and DNS still resolves; only the origin's own cert is broken). Independently reconfirms the exact LEADS.md finding.
  - web.archive.org CDX index for the domain: only the homepage was ever crawled (no subpages/images archived separately). Full 200-status homepage captures exist at 2024-04-26, 2024-08-30, 2025-02-23, and — most recently — 2025-09-07 (7276 bytes). A further capture on 2026-01-09 shows the domain still correctly redirecting (301, http→https) that recently, meaning the SSL breakage is a fairly recent event, sometime between Jan and Jul 2026.
  - The Sept 2025 capture (most recent full content) shows current-looking, non-stale opening hours (Tue–Sat 10am–4pm, Mon closed, Sun closed except private functions by prior arrangement) — different from the Feb 2025 capture's hours (Wed–Fri/Sat/Sun-prebooked), indicating the site was still being actively maintained as of Sept 2025.
  - Test Valley Borough Council £1,200 Independent Retailer Grant (May 2025): this fact is carried over from the pre-vetted LEADS.md entry. Attempted to independently re-confirm today via a direct curl of testvalley.gov.uk (newsroom page, site search endpoint, sitemap) but the council's site search is JS-rendered and returns no server-side results to curl, and no sitemap/press-release URL could be located this way. Not contradicted — just not independently re-fetched this session. Treated as previously-sourced pipeline data, not fabricated.
  - Owner names (Jackie Lusk & Hayley Rowbotham): also carried over from the pre-vetted LEADS.md entry (Google/Facebook lookups are session-blocked so could not be independently re-confirmed today). Not contradicted by anything found.
  - Companies House search for "The Tea Room Andover": no results — consistent with a sole-trader/partnership rather than a limited company (expected for a small independent tea room, doesn't indicate closure).
- Notes: No closure signals found anywhere. Domain/hosting is clearly still paid and active (Cloudflare proxy live), which is inconsistent with an abandoned business. The pitch (a broken website hurting an otherwise-active, recently-recognised local business) still holds.
- Build decision: proceed

## Page Plan
- Scope: 3-page default
- Pages: Home (index.html), Menu (menu.html), Contact/Visit Us (contact.html)
- Reason for any extra page: none added — content is genuinely sparse (one archived homepage's worth of copy, no prices, no real photography), so 3 pages is the right size, not a compromise.

## Pitch Hook
- Verified observation: The business's own site (thetearoomandover.co.uk) is completely unreachable — Cloudflare error 526 "Invalid SSL Certificate" on every load, both bare and www domains, both HTTP and HTTPS — independently reconfirmed today via direct curl (including `curl -v` showing the origin cert failure specifically, not just a generic error). Wayback Machine's most recent capture (2026-01-09) shows the domain was still redirecting correctly as recently as January, so this is a fairly new, unnoticed break — not something the business necessarily knows about yet.
- Source URL: https://thetearoomandover.co.uk/ (curl'd directly today, 2026-07-15) and https://web.archive.org/cdx/search/cdx?url=thetearoomandover.co.uk&matchType=domain (Wayback CDX index)

## Allowed Facts
| Fact | Source URL | Used where |
|---|---|---|
| Address: 45 High Street, Andover, Hampshire, SP10 1LP | Wayback snapshot of thetearoomandover.co.uk (footer, both 2025-02-23 and 2025-09-07 captures) | Home hero, Contact page, footer (all pages) |
| Phone: 07749 070263 | Same as above (footer tel: link, both captures) | Contact page, footer, nav CTA |
| Email: thetearoomandover@gmail.com | Same as above (decoded cf-email-protection string, both captures) | Contact page, footer |
| "Situated in the picturesque town of Andover in Hampshire within easy reach of Salisbury, Winchester and Basingstoke" | Wayback snapshot, About Us section, both captures | Home hero, Contact page-hero |
| Light Refreshments — served all day, "a selection of light refreshments" | Wayback snapshot homepage content block | Home card, Menu page |
| Lunch — served from 12pm noon, oven-baked jacket potato or fresh baguette, takeaway or eat in | Wayback snapshot homepage content block | Home card, Menu page |
| Cream Tea — served all day, scone with jam and clotted cream + pot of tea | Wayback snapshot homepage content block | Home card, Menu page |
| Afternoon Tea Experience — bookings required, "every day is a special day..." copy | Wayback snapshot homepage content block | Home card, Menu page |
| "Tea and Cake" exists as a named offering (nav item) | Wayback snapshot main nav / footer nav, both captures | Menu page (name only; no invented specifics beyond the category name itself) |
| Opening hours: Tue–Sat 10am–4pm, Mon closed, Sun closed except private functions by prior arrangement | Wayback snapshot footer, 2025-09-07 capture (most recent, superseding the older 2025-02-23 hours) | Home hero facts, Contact page hours table |
| Mother-and-daughter run by Jackie Lusk & Hayley Rowbotham | LEADS.md pre-vetted entry (compiled 2026-07-07); not independently re-confirmed this session (Google/Facebook blocked) | Home about section, Contact page |
| £1,200 Independent Retailer Grant, Test Valley Borough Council, May 2025 | LEADS.md pre-vetted entry; direct re-verification via testvalley.gov.uk attempted but inconclusive (JS-rendered search, no sitemap match) | Home recognition strip, Contact page |
| Own site unreachable — Cloudflare 526 "Invalid SSL Certificate", both domains, both protocols | Direct curl today (2026-07-15) + matches LEADS.md's own logged finding | Not shown on the demo site itself (per playbook, the pitch goes in the outreach email, not on the site) |

## Do Not Claim
| Claim or uncertainty | Reason |
|---|---|
| Any specific menu prices | Not found anywhere reachable (live site down, Wayback only archived the homepage, no separate menu/pricing page captured). Menu page includes an honest "prices can change, call or email" note instead of inventing numbers. |
| Any specific description of "Tea & Cake" beyond the category name | Nav/footer link text is the only evidence; no descriptive copy was ever archived for it. Copy on the Menu page is deliberately generic (a pot of tea + a slice of cake) and adds no unverified specifics (no cake flavours, no "homemade," etc). |
| Real photography of the venue, food, or owners | The business's own site used exclusively unmodified Unsplash stock photography (filenames like `alexandra-kusper-...-unsplash.jpeg`, `sebastian-coman-photography-...-unsplash.jpeg` — visible in the archived HTML `wp-content/uploads` paths), not authentic photos of this business. Even those stock images are not independently recoverable — Wayback's CDX index only archived the HTML page itself, not the linked image binaries, as separate captures. Per AGENTS.md step 5 (no forcing a mismatched/fabricated image) and the task's explicit fallback instruction, the site is built text-forward with hand-drawn inline SVG decoration instead of photography. |
| Review ratings / review counts | None sourced anywhere for this business. Not mentioned on the site. |
| Independent Retailer Grant and owner names as independently re-verified today | Carried over from the already-vetted LEADS.md entry; today's session could not independently re-confirm via Google/Facebook (blocked) or via the council's JS-rendered site search. Not contradicted by anything found — used with this caveat on record. |

## Asset Manifest
No images used. All visual decoration is hand-built inline SVG (teacup, steam, leaf/food icons, ribbon/medal icon) authored directly in the HTML/CSS — no external image files, no stock photography, no watermark risk. This was a deliberate choice (see Do Not Claim above): the only imagery ever on the business's own site was unattributed Unsplash stock, not real photos of this business, and even those aren't independently recoverable from Wayback. Google Maps embed iframe (`google.com/maps?q=...&output=embed`) used on the Contact page as a live, no-API-key map widget referencing the verified public address — not a scraped asset.

## Design Notes
- Palette: warm cream (#fbf1e2) background, deep wine/burgundy (#6d2340) primary, sage green (#6d7c58) secondary, antique gold (#b6842a decorative / #8a5e19 for text-weight gold, adjusted for contrast) accent. Fraunces (serif display) for headings, Caveat (script) for small eyebrow accents, Work Sans for body — a traditional English tea-room feel without leaning on stock photography.
- Image layout pattern: n/a — no raster images used (see Asset Manifest).
- Risk notes: Google Maps iframe embed depends on Google's public embed endpoint being reachable at deploy time; if it ever fails to load it degrades to an empty bordered box (no broken-image icon, no layout break) since it's an iframe, not an img.

## Builder QA
- Contrast: 2 real violations found and fixed (nav CTA button color got overridden by a higher-specificity `.main-nav a` rule; `.eyebrow` gold text was 2.6–2.97:1 against cream, under the 3:1 large-text threshold). Both fixed — see QA_REPORT.md for verification.
- Upscale mobile/tablet/desktop: 0 images on site (by design), so 0 checked / 0 violations / 0 broken images at all three widths.
- Broken images: none (no `<img>` tags with external sources; favicon is an inline data URI).
- Manual checks: found and fixed a real CSS Grid bug (`.card-grid` subgrid was templated for 3 rows but each card has 4 children — icon, tag, heading, paragraph — causing the heading to render on top of the tag pill). Fixed by correcting the row count to 4. Also independently verified the scroll-reveal IntersectionObserver behaves correctly for real user scrolling (via `scrollIntoView` and slow-stepped-scroll tests) after noticing that Playwright's `fullPage` screenshot capture does not itself trigger scroll-based intersection or correctly reposition `position: sticky`/`fixed` elements — those screenshot-only artifacts (duplicated sticky header, mobile nav appearing "open," a mid-CSS-transition color) were confirmed NOT to affect real visitors via direct viewport screenshots and computed-state checks.
