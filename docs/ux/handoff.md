# UX pass 8 — handoff

Branch `ux-pass-8`, 19 October 2026. Brief: [`brief.md`](brief.md) (Part B executed in full). Visual rules: [`.claude/skills/site-visual-language/SKILL.md`](../../.claude/skills/site-visual-language/SKILL.md). Captures: [`before/`](before/) (commit `8c24a55`) and [`after/`](after/), full pages at 1440 and 390 px via `npm run capture`.

Not deployed. The live site is unchanged until this branch is merged and `npm run deploy` is run.

## Direction implemented

**Precision, useful depth and human credibility.** The first screen of every page now states the category, the proposition, one supporting sentence and two actions; on the home page the proposition sits beside the interactive decision workspace instead of a photograph. Explanatory visuals are the deliverables themselves (`scenes.js`), brought forward to the second screen of each service page; photography is one pre-cropped frame per marketing page, used for context only. Utility pages (contact, assessment, legal, 404, work detail) open typographically and start the task in the first screen.

## Behavioural changes

| Area | Before | After |
|---|---|---|
| Native links | `href="/work"` broke new-tab/copied links on the project-page host | The renderer prefixes every root-relative `href`/`src` with the base once (`core.absolutise`); `<base>` removed; `core.href`/`core.strip` are the only helpers; modified clicks, external links, files and same-page anchors are left to the browser; query strings and hashes survive navigation |
| Static routes | One app shell + `404.html` redirect for every deep link | `npm run build` renders every public route (23) to `dist/<route>/index.html` through the site's own code in headless Chrome, with per-route title, description, canonical, social card, JSON-LD and content; `404.html` stays for unknown paths; `npm run serve:dist` serves it like a static host (real 404s); `npm run deploy` publishes `dist/` to `gh-pages` from a temporary worktree |
| Contact | No endpoint; fallback text pointed at a footer email that does not exist | Full flow against a local mock: validation summary with field links, pending/duplicate guard, 422 server validation, server failure, network failure, 15 s timeout, draft preserved in `sessionStorage`, confirmed success with reference; honest "not open yet" state when no endpoint is configured. See [`contact-integration.md`](contact-integration.md) |
| Scenes | Whole scene host replaced after a delay; focus lost | Body-only patching; frame, title bar and stepper stay; focus restored after the real render; Home/End on steppers; industry figures are real buttons that open definition/period/unit/source/owner; sector-specific schemas (retail conversion = orders ÷ sessions, stores show none; sell-in and sell-out distinct; 30-day active customers; cohort retention "too young" where it is) |
| Hero | Three-image slideshow, scroll-lit statement, 8 s photo zoom | One frame, content-driven height, no slideshow, 10 s 1.02× settle once on desktop only; failed image → quiet navy surface |
| Motion | Six competing systems | Four duration tokens, two easings; reveals are opacity + 12 px; no image zoom/clip; route fade 120 ms; sequence Replay is user-started and manual selection overrides the scroll observer; reduced motion verified live |
| Images | Originals resized to 1920 wide at native ratio, quality down to 40 | Crop for the frame (16:9 desktop, 3:4 phone) around the recorded focal point, then encode; budgets 230/120/140 KiB with a quality floor of 60 (all frames landed at q74–82); billboard, architecture-as-founder, work and about stock photos removed; manifest in [`../assets/manifest.md`](../assets/manifest.md) |
| Founder | "Founder portrait to be supplied" frame | Text-led founder treatment on home, About and the founder page; a portrait renders only when `PG.team.founder.photo` is set |
| Insights | Out of navigation already; page read as a destination | Compact honest state, no hero, excluded from the static build and sitemap until an article is published |
| Naming | "Book a consultation", "Our Work" | "Request a consultation" everywhere (it is an enquiry, not a booking); "Work & demos" (URLs unchanged) |

## Route and status matrix

All checks run on this branch in the in-app Chromium (JS state reads) and the installed Chrome headless (renders). "Native" = direct load of the generated `dist/` route under `/patterngrid/` with the base pinned (`npm run serve:dist`).

| Route | Renders, no console errors | Native load (dist) | 320 / 390 / 1363 overflow | Notes |
|---|---|---|---|---|
| `/` | pass | pass | none | 7,956 px at 1363×936 (was ≈10,492); hero scene interactive; 4 scenes mounted/rendered |
| `/services` | pass | pass | none | 5,536 px (was ≈9,069); comparison cards + one featured example |
| `/services/*` (5) | pass | pass | none | example at ≈1,680 px (was ≈4,516); jump nav includes Example |
| `/industries`, `/industries/*` (4) | pass | pass | none | inspectable source workspaces, sector schemas |
| `/work`, `/work/*` (3) | pass | pass | none | scene previews on the index; interactive scene at the top of each detail |
| `/about`, `/about/precious-celestine`, `/approach` | pass | pass | none | text-led founder; approach de-duplicated |
| `/assessment` | pass | pass | none | "what you get" before start; eight questions, back, results, print and contact handoff unchanged |
| `/contact` | pass | pass | none | form starts at 468 px (was ≈2,900); all states exercised against the mock |
| `/privacy`, `/terms` | pass | pass | none | typographic |
| unknown path | 404 page | HTTP 404 + 404.html | none | links to home, services, contact |
| URL state | `?service=` preselects and opens the context disclosure; `#svc-approach` scrolls under the sticky header; back/forward restore route and title | | | |

Keyboard and assistive checks: skip link and `main` landmark on every route; one `h1`, no heading-level jumps (the hero scene uses styled paragraphs); every image has alt; every control has a name; every input has a label; mega menu closes on Escape and returns focus; scene steppers keep focus through re-render (arrow keys, Home, End). Automated checks only — a full screen-reader pass is still recommended before launch.

Performance (lab, dev server, no compression, 1363×936): home 28 requests, 477 KiB transferred (JS 322 KiB uncompressed — GitHub Pages serves gzip; ≈90 KiB), CSS 88 KiB, fonts 52 KiB, images 15 KiB on first paint (hero scene is HTML; industry photos lazy), CLS 0. No field data exists; no INP/LCP claim is made.

## Images

`npm run images` rebuilds the 13 hero frames and `docs/assets/manifest.{json,md}`. Every frame is stock imagery used as context, labelled so in the manifest. Still needed from the founder: an approved portrait (the layouts switch automatically), and sector photography for retail (a merchant with merchandise) and distribution (an operator checking stock) — the current frames are the closest existing assets, not the ideal subjects.

## Commands

```
npm run dev          # http://localhost:8780 with the contact mock
npm test             # links, sample arithmetic, scene rules, contact validation, route list
npm run build        # root-hosted dist/
npm run build:pages  # dist/ for https://olufemiadetiwa.github.io/patterngrid
npm run serve:dist   # serve dist/ like a static host (add --base /patterngrid for the Pages build)
npm run capture      # before/after captures (ROUTES="name:/path …" to limit)
npm run images       # hero frames + asset manifest
npm run deploy       # build:pages and publish dist/ to gh-pages
```

## Blockers for the founder

1. An approved enquiry destination (form service or small serverless relay) — [`contact-integration.md`](contact-integration.md).
2. An approved founder portrait, and sector photography for retail and distribution if wanted.
3. A verified business email for the footer (none has been added).


---

## Pass 9 — stand-out (22 October 2026)

Implements [`standout-review.md`](standout-review.md) in full on the same branch.

| Item | Done | Notes |
|---|---|---|
| A1 Scene-led service heroes | reverted | Tried, then reverted on the founder's direction: a workspace in the hero reads as a SaaS product. Heroes are one full-bleed photograph with a strong headline and subtext, followed by the centred scroll-animated statement (restored from the original design). The Columbia frame is still gone (AI page uses the cabling photograph). |
| A2 Mark-derived system | ✓ | `.grid-field` texture on photo-less heroes and the footer; `C.cells(n)` device as section numbering, scene glyph, next steps and sample cards. |
| A3 Guided walkthrough | ✓ (moved) | On the services overview example, not the hero. "Watch how it works · 20 s" steps Performance → Trace → Beverages → Snacks → Assign → assigned over 21 s with a progress line; Stop/Replay; any click or key in the scene takes over. Verified: state advances, take-over resets the button. |
| A4 Thumbnail mode | ✓ | `thumb:true` renders bar + body only (KPI+bars, two source tiles, flowline, timeline rows, skill rows) at native size in a `surface-2` frame; home and work index. |
| A5 Sequence on paper | ✓ | Full-width scene, stage rail, narrative as four cards under the scene (phone: active only); Replay kept; scroll observer removed. |
| A6 One closing | ✓ | `PG.closing()` on every route: headline, two actions, three next steps. |
| B1 Flow strip | ✓ | Node chips with arrows above a real button `Open the full diagram`. |
| B2 Stage outputs | ✓ | `.doc-mini` document with the output name, cells glyph and Agreed/Drafted chips. |
| B3 Industry definitions | ✓ | Accordion opens the matching workspace metric (definition, period, unit, source, owner) with "Open in the workspace"; unmatched measures keep the generic note. |
| B4 Phone rails | ✓ | Source tiles scroll-snap; steppers scroll; FMCG at 390 px: 9,000 → 6,400 px. |
| B5 About | ✓ | Photo-less hero "Built around the decision.", founder first, then commitments (numbered with cells), then the path. |
| B6 Founder | ✓ | Typographic intro with breadcrumb; "How she defines a measure" drawer using the shared sample definition. |
| B7 Assessment | ✓ | Sample result card (58 · Connected · five dimension bars) beside Start. |
| B8 Contact | ✓ | Bounded `surface-1` fields. |
| B9 Work detail | ✓ | Enable → status chips; limitation → drawer. |
| C1 Headings | ✓ | Inline heading clamps replaced by `.h2/.h2-sm/.h3` (one remains in the AI scene body). |
| C2 Labels | ✓ | `.eyebrow-caps` and `.lbl` folded into `.label-caps`; CSS removed. |
| C3 Card hover | ✓ | One rule for compare, industry and work cards. |
| C4 Copy | ✓ | "nothing is sent or saved" everywhere. |
| C5 theme-color | ✓ | Set per route in `hero.mount`. |
| C6 Fonts | ✓ | Geist and Geist Mono latin subsets self-hosted and preloaded; Google Fonts removed; metric-matched fallback. |
| D Guidelines | ✓ | Placeholders end with …; summary styled as a button; footer text contrast raised to .72; segmented buttons 40 px. |

Not done: new photography for retail and distribution (needs sourced assets); screen-reader pass.

Verification on this pass: 19 routes render with no console errors; heading order intact (hero scenes use styled paragraphs); no horizontal overflow at 390 or 1363; walkthrough and take-over verified; industry definitions verified on FMCG; `npm test` 11/11; static build regenerated with `?pgstatic=1` so prerendered pages carry no mid-animation state.


---

## Pass 10 — founder portrait, case studies, statement motion (22 October 2026)

- **Statement under the hero**: words now rise into place with a 34 ms stagger the first time the section is seen (armed, then revealed on a later frame so it also plays when already on screen), on top of the scroll-driven colour fill. Reduced motion and static renders show the final state.
- **Founder portrait**: of the four photographs supplied, `IMG_7940` (grey backdrop, black lace dress, arms crossed, direct gaze) is used — the most composed and the one that reads best in black and white; `IMG_7939` is a close second; the brown-backdrop stool portrait is more casual and the close-up is 720 px. Built as 4:5 WebP at 1200 and 720 (`npm run portraits`, source kept in `design-source/people/`). Rendered **black and white by default, colour on click** (`button.portrait`, `aria-pressed`, hint label on hover/touch) on the home founder block, About and the founder page; the text-led layouts switch to the photo layouts automatically.
- **Work**: recommendation adopted — one Work & demos index with two sections (case studies first, illustrative scenarios second) and a **dedicated page per case study** (`/work/ledrop-distribution-visibility`, `/work/party-drinks-connected-reporting`), so each can be linked and featured. Both are written up in the third person from the supplied documents without adding figures, labelled "delivered by Precious Chinenye Celestine as a Business Intelligence and Data consultant". Template: typographic intro with client/role/focus/tools, a data-flow strip (sources → pipeline → outputs), the problem with its challenges, what was built as delivered steps, what it made possible, relevant services, closing. Home features the two case studies above the demos; both routes are in the static build and sitemap.
- **Needs the founder's confirmation before deploy**: naming Ledrop and Party Drinks (drinks.ng) publicly, and that the work may be described under Pattern Grid (the pages say it was delivered by Precious as a consultant). The founder page still says prior experience did not come from Pattern Grid; both statements are consistent, but check the wording you want.
