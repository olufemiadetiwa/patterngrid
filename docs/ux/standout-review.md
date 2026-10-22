# Pattern Grid — stand-out review

Branch `ux-pass-8` (PR #1), 22 October 2026. Reviewed: every public route, rendered at 1363×936 and 390 px (captures in `docs/ux/after/`), plus the code against the Web Interface Guidelines. Stage: pre-launch. Question asked: what would make this site stand out among data and AI consultancies, not merely pass.

## Overall impression

The site is now correct, honest and fast to read. What it is not yet is *recognisable*. Strip the wordmark and most pages could belong to any competent consultancy: navy, Geist, white cards, a stock photograph on top. The one thing no competitor has is sitting in plain sight — the interactive deliverables — and the site still treats them as an illustration under the copy rather than the identity. The second missing ingredient is a brand motif: "Pattern Grid" has a nine-cell mark that appears only as a 6 px glyph.

The recommendation, in one sentence: **make the deliverable the hero on every page, derive a visible visual language from the mark, and turn every passive list into evidence rendered with the same scene primitives.** Everything below serves that.

## What already stands out (keep)

- The decision workspace beside the home proposition: real numbers, real arithmetic, a chain you can follow.
- Honest labelling everywhere (Illustrative demo, sample data, "not a client result") — rare and credible.
- The readiness assessment: ungated, local, printable, hands off into the enquiry.
- The services comparison and the problem-first cards: a visitor can choose without reading five pages.
- Typographic utility pages: the task starts in the first screen.

## Findings

Severity: 🔴 hurts credibility or conversion now · 🟡 visible rough edge · 🟢 polish. Effort: S < ½ day, M ≈ 1 day, L > 1 day.

### A. Distinctiveness

| # | Finding (route, evidence) | Why it matters | Recommendation | Sev / effort |
|---|---|---|---|---|
| A1 | Service heroes lead with stock photography (`/services/*`): a team at a table, a technician at a rack, and on AI & Automation a warehouse worker whose jacket shows a visible **Columbia** logo. Retail still uses a warehouse. | Photographs communicate "generic consultancy" before the service does; a third-party brand mark in the hero is the kind of thing a buyer notices. | Make the five service heroes **scene-led like the home**: eyebrow, H1, lead and two actions on the navy field, with that service's own compact scene (`PG.scene.render(name, {compact:true, preview:true})`) beside the copy. Keep photography for industries and About only, with the right subjects. Drop the Columbia frame regardless. | 🔴 M |
| A2 | The nine-cell mark is the brand's only idea and it is 6 px wide. Navy fields (home hero, founder hero, footer, closing bands) are flat. | Nothing on the page is ownable; the palette and typeface are shared with half the category. | A **mark-derived visual system**: a faint 3×3 grid texture (CSS/SVG, 2–3 % contrast) on navy fields; the grid as the section-number device (`01` becomes a nine-cell with one cell lit, the lit cell moving per section); the same device as the scene title glyph, the loading state, the 404, the empty assessment result. Secondary to content, never a wash. | 🟡 M |
| A3 | Home hero scene opens on "Performance" and stays there; "Explore a worked example" navigates away to `/services/business-intelligence#svc-artifact`. | The brief's signature sequence (source → measure → exception → owned action) exists on the home page only as a separate dark section further down; the hero does not *do* anything unless clicked. | Add a **guided walkthrough** to the hero scene: a "Watch how it works · 20 s" control that steps Performance → Trace → Assign with the drawer narrating; finite, pausable, any click takes over; reduced motion shows the three states as tabs. Point the secondary CTA at the walkthrough; keep a text link to the service page. | 🔴 M |
| A4 | Work & demos previews (`/`, `/work`): the scene is clipped at the right edge ("ILLUSTRATIVE DEMO" tag cut), sits on a black card with a black void below the scene. | Reads as broken; these are the three pieces of evidence the site has. | Give each scene a **thumbnail mode** (KPI + bars; three source tiles; the four-step flowline) rendered at native size inside a `surface-1` frame with the 12 px radius, no bezel, no transform scaling. Same component at the top of the work detail pages. | 🔴 S |
| A5 | Home "Where is performance slipping?" repeats the dark-panel composition of the hero: a white scene floating on ink, narrative pinned beside it with large voids between steps at tall viewports. | Two dark scene panels in the first three screens flatten the rhythm; the sticky narrative is the weakest-feeling part of the page. | Recompose on paper: a full-width scene with the four stages as a **horizontal stepper rail** and the narrative under the active stage; Replay stays. No sticky. On phone it is already stacked. | 🟡 M |
| A6 | Seven different closing sections (home, services, each service, work, about, founder, approach) with different headlines, layouts and rules. | Every page ends differently, so the last impression is unbranded. | One `closing` component: headline from content, the same two actions, and the **three "what happens next" steps** from the contact page as small chips. The repeated promise of a low-friction next step is itself a differentiator. | 🟡 S |

### B. Page-by-page

| # | Route · finding | Recommendation | Sev / effort |
|---|---|---|---|
| B1 | `/services/*` flow band: "Open the full flow diagram" is plain white text under floating ownership chips on an empty ink band. | Show a **collapsed preview strip** (the nodes as chips joined by arrows) with a real button `Open the full diagram`; or fold the band into the approach section. | 🟡 S |
| B2 | `/services/*` approach: the stage output card is a small white box with three bullets. | Render each stage's output as a **mini deliverable** (a KPI-dictionary row, a source contract line, a runbook step) using scene primitives, so the stepper becomes a tour of what you receive. | 🟢 M |
| B3 | `/industries/*` "Measures we would define with you": every `+` opens the same generic sentence (`DEFINITION_NOTE`), while the scene below now holds real definitions with period, unit, source and owner. | Bind the accordion to `PG.scene.industries[slug].metrics`; opening a measure shows its definition card, and "Open in the workspace" selects it in the scene. | 🟡 S |
| B4 | `/industries/*` phone: five source tiles stack full-width (the page runs ~9,000 px). | Source tiles as a **scroll-snap rail** on phone with the selected tile expanded; steppers as rails rather than wrapping. | 🟡 S |
| B5 | `/about`: hero "Clarity is our purpose" over a skyline is the most generic page; the founder appears only at the bottom. | Lead with the founder and the four commitments (people and principles are what buyers check); the skyline can go. Give the commitments the mark-derived numbering. | 🟡 S |
| B6 | `/about/precious-celestine`: breadcrumb sits under the hero; body is a column of text with no distinctive element. | Move the breadcrumb into the intro; add one artefact — a "how she defines a measure" row (definition · period · owner) rendered as a scene fragment — so the page shows the way of working, not just claims it. A portrait slots in when approved. | 🟢 S |
| B7 | `/assessment`: half the first screen is empty under the Start button; the payoff is described, not shown. | Render a **sample result card** (score, band, the three weakest areas as bars) with the scene primitives beside the Start button, labelled sample. | 🟡 S |
| B8 | `/contact`: underline-only fields on white read as unfinished next to the bounded scenes. | Bounded inputs (`surface-1`, 6 px radius, 48 px) consistent with the scene surfaces; keep the disclosure. | 🟢 S |
| B9 | `/work/*` detail: the question heading row and scene are good; the aside stack (enable / limitation / technology / services) is four grey labels in a column. | Turn "Designed to enable" into status chips and "Limitation" into the drawer style used in scenes, so the page is one system. | 🟢 S |

### C. System consistency

| # | Finding | Recommendation | Sev / effort |
|---|---|---|---|
| C1 | Ten distinct inline `font-size:clamp(…)` for section headings across page modules; 265 inline `style=""` attributes in page templates (90 in `services.js`). | Finish the token system: `.h2`, `.h2-sm`, `.h3` only; a `section-head` component (eyebrow + heading + lead, two-column variant); `kv` rows. Remove the inline clamps. | 🟡 M |
| C2 | Four label roles in use: `.eyebrow` (34), `.label-caps` (41), `.eyebrow-caps` (7), `.lbl` (10). | Two roles: `eyebrow` (teal sentence case, section opener) and `label-caps` (11 px uppercase, data labels). Alias and remove the other two. | 🟢 S |
| C3 | `.compare-card` has no hover/focus treatment; `.ind-card` and `.work-card` change only text colour. | One card interaction: border → navy, `shadow-1`, chevron travel 4 px, 150 ms. | 🟢 S |
| C4 | Home sequence footer still reads "Sample data · local interactions only" (`home.js:207`); scenes say "nothing is sent or saved". | Align the wording. | 🟢 S |
| C5 | `theme-color` is fixed `#07131C`; most pages open white, the home opens navy. | Set per route from the hero tone in `seo.js`. | 🟢 S |
| C6 | Geist loads from Google Fonts (third-party round trip; swap can shift the 76 px H1). | Self-host two WOFF2 files, `preload` the regular weight, keep `font-display: swap` with a tuned fallback (`size-adjust`). | 🟢 S |

### D. Web Interface Guidelines check

Code reviewed: `public/assets/css/site.css`, `public/assets/js/*.js`, `public/assets/js/pages/*.js`, `public/index.html`.

```
## public/assets/js/pages/contact.js
public/assets/js/pages/contact.js:120 - placeholder should end with "…" and show the pattern ("e.g. Finance exports three reports on Monday…")
public/assets/js/pages/contact.js:121 - placeholder should end with "…"
public/assets/js/pages/contact.js:121 - no unsaved-changes warning on navigation (draft is kept in sessionStorage, so acceptable; document it)

## public/assets/js/pages/home.js
public/assets/js/pages/home.js:207 - copy inconsistency "local interactions only" vs scenes

## public/assets/js/pages/industries.js
public/assets/js/pages/industries.js:194 - accordion opens identical text for every metric (content, not markup)

## public/index.html
public/index.html:8 - theme-color does not match most page backgrounds
public/index.html:30 - fonts from third-party stylesheet; no font preload

## public/assets/css/site.css
public/assets/css/site.css:767 - inputs use :focus (not :focus-visible); acceptable for text fields, replacement ring present
public/assets/css/site.css:1127 - <summary> styled as plain text; needs button affordance

✓ no transition: all · ✓ touch-action / tap-highlight set · ✓ drawer overscroll-behavior: contain · ✓ images carry width/height · ✓ reduced motion honoured at load and live · ✓ labels, aria-labels, skip link, heading order · ✓ tabular numerals in data · ✓ text-wrap: balance on headings · ✓ Intl not needed (no dates/currency rendered) · ✓ sentence-case buttons are a deliberate house style (guideline says Title Case)
```

### E. Accessibility notes

Contrast measured: muted `#646B70` on white 5.2:1 and on paper 4.9:1; teal `#17647D` on white 6.1:1; navy on accent buttons 6.0:1; footer `rgba(255,255,255,.6)` on navy ≈ 4.6:1 (borderline — raise to .72). Touch targets: the AI scene's segmented picker buttons are 36 px tall (fine under WCAG 2.2 AA, below the 44 px house target); the inline privacy link in the contact form is 17 px tall (acceptable as inline text). Screen-reader pass still recommended before launch.

## Priority recommendations (what I would do, in order)

1. **Scene-led service heroes + thumbnail mode** (A1, A4) — removes every stock hero but industries, fixes the broken-looking previews, and makes the deliverable the first thing on five more pages. One day.
2. **Guided walkthrough in the home hero** (A3) and the **paper recomposition of the sequence** (A5) — the site gets a single signature interaction that explains the business in 20 seconds. One day.
3. **Mark-derived visual system** (A2) + **one closing component** (A6) — the brand becomes recognisable without adding decoration. One day.
4. **Lists into evidence** (B3, B7, B2, B6) — industries definitions, sample assessment result, stage outputs, founder artefact. One day.
5. **System tidy** (C1–C6, B1, B4, B8, D) — tokens, labels, hovers, fonts, theme-color, phone rails. Half a day.

Roughly four and a half days of focused work; items 1–3 carry most of the stand-out value and can ship as a pass on their own.

## What this review did not do

No user research or analytics informed it; the judgement about "stand out" is a designer's read of the category, not measured preference. Performance and screen-reader checks from `handoff.md` were not repeated.
