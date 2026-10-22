---
name: site-visual-language
description: The Pattern Grid visual language — tokens, surfaces, scene components, motion rules and the review procedure. Read before changing any page, section or scene on the site; use it to keep every route on one system.
---

# Pattern Grid visual language

Direction: **precision, useful depth and human credibility.** The work itself is the visual: a metric with its definition, a source model, an exception that explains itself, a reviewer approving an action. Photography adds context and people where those are the point of a section; it never carries the proposition. **Photographs are Nigerian/African: made in Nigeria by Nigerian photographers wherever possible, free-licence only (`images.unsplash.com/photo-…`, never `plus.unsplash.com/premium_photo-…`), people at real work, no Western stock offices, no AI-looking renders.** Credits stay in the registry; `npm run images` records provenance in `docs/assets/manifest.md`. Typography and spacing carry hierarchy; teal is a selective accent, never a wash.

Authorities, in order: `docs/ux/brief.md` (the October 2026 deep UX review — first screen, page order, images, motion, contact, static routes), `docs/visuals/brief.md` (scene direction), then this file. The earlier Visual Upgrade Prompt in `design-source/uploads/` is superseded where it asked for photography on every hero, a slideshow, a scroll-lit statement or near-square radii.

## Stack facts

- Plain HTML/CSS/JS. No framework, no build step. Templates are tagged `html\`\`` strings in `public/assets/js/pages/*.js`; the runtime is `core.js`.
- One stylesheet: `public/assets/css/site.css`. Tokens live in `:root`. Add new tokens there, never inline hex values in page modules.
- Report components: `public/assets/js/scenes.js` (`PG.scene.*`). Reuse them; do not hand-build a report in a page module.
  - Primitives: `frame`, `kpi`, `bars`, `drawer` (renders `.action-drawer` — `.drawer` is the mobile nav), `records`, `chip`.
  - Scenes: `PG.scene.defs.{bi,strategy,engineering,ai,capability,lineage}`, each `{init, render(state, opts), act(state, key, value, el)}`.
  - Mount with `PG.scene.mount(host, name, opts)` on a `[data-scene="name"]` element (returns a disposer for `cleanup`); render statically with `PG.scene.render(name, opts)`.
  - `opts.compact` (overview columns: no side drawer on delivery/sources, status line instead); `opts.preview` (home sticky card: static, no drawers); `opts.industry` (lineage scene).
  - Controls are `data-act="key:value"` buttons/inputs; the mount repaints the body with a 160 ms settle + 240 ms enter (none under reduced motion). Layouts respond to the scene's own width with `@container scene` queries, so one scene works full-bleed, in a column and on a phone.
- Capture tool: `tools/capture-visuals.sh <base-url> <out-dir>` (`npm run capture`) — full-page headless Chrome captures at 1440 and 390 (phone widths are framed through `/__frame` because headless Chrome cannot go below ~500 px). Captures and the static build load pages with `?pgstatic=1`, which adds `html.is-static` and skips entrance animations.
- Content model: `content.js` (services, industries, work scenarios, `PG.cases` case studies, `PG.team`) and `service-content.js`. Case studies are Pattern Grid engagements for named clients (Ledrop, Drinks.NG), written in the third person from the records; the client name is the headline; never add figures the records do not contain.
- Portraits: approved photographs go in `design-source/people/`, built by `npm run portraits` into `assets/img/people` and `PG.localPeople`; `C.portrait(person)` renders them black and white by default with colour on hover (a tap toggles on touch screens); portrait columns are 260–300 px, never a hero. The founder photograph is `founder-2025` (studio, grey backdrop, arms crossed). Scenes read sample data from `PG.scene.data` so the same figures appear everywhere.

## Tokens

Ink `--ink #07131C`, navy `--navy #02203D`, teal text `--teal #17647D`, accent `--accent #38A0C3`, amber `--amber-ink #8A5A12` on `--amber-soft`, paper `--paper #F5F5F1`.

Scene surfaces (cool neutrals, distinct from the warm page paper):
`--surface-0` white · `--surface-1 #F6F8F9` · `--surface-2 #EDF1F4` · `--surface-line rgba(7,19,28,.08)`.
Depth: `--shadow-1` (resting card) · `--shadow-2` (raised drawer). Never larger.
Chart: `--bar #D7E3EB` (context) · `--bar-on #2E6E8E` (selected) · `--trend #38A0C3`.

Type: Geist, self-hosted (`assets/fonts/*.woff2`, preloaded, `Geist Fallback` metric-matched to Arial). Scene UI text 13–15 px; values 28–44 px at weight 600, tabular numerals; labels 11 px uppercase 0.12 em (`.label-caps`). Two label roles only: `.eyebrow` (teal sentence case, opens a section) and `.label-caps` (data labels). Headings use `.h2`, `.h2-sm`, `.h3` — no inline clamps. Mono (`--mono`) only for record ids, code and counters.

Radius by role: `--radius-sm 4px` chips and keys · `--radius 6px` controls and inner surfaces · `--radius-lg 12px` cards · `--radius-xl 16px` scene frames. Fine 1 px rules. No glass, no large shadows (`--shadow-2` is the ceiling), no gradients except the hero scrim. Content width `--wrap 1360px`.

## Tags and pipes

Small labels are **tags** (`.tag`, in a `.tags` row): low-contrast filled pills, 28 px, 12.5 px medium, no outline. Variants `is-accent` (teal tint), `is-solid` (navy / white on dark), `is-warn` (amber), `is-dark` (white 9 % on navy). Never draw a boxed, outlined chip. A data flow is a **pipe** (`.pipe` > `.pipe-group` with a `small` label and `.tags`, joined by `.pipe-link` hairlines with an accent node dot), not arrows between boxes; `pipe.lg` on detail pages, `pipe.on-dark` on ink bands. Sources → pipeline → outputs is the standard grouping.

## Report canvases (the explanatory visuals)

Pattern Grid is a consultancy; its visuals show **the deliverable, not a product**. Every example is a **report canvas** (`.report`, built from `PG.scene.report/card/colChart/hBars/matrix/defRow/callout`): a title line with a sentence subtitle naming the demo dataset ("Week 36 · demo data: a Lagos FMCG distributor"), slicer chips, a row of KPI cards with sparklines, one large chart or a dense matrix on a 7:3 grid with a callout, page tabs along the bottom (Overview · Variance · Definitions…), and a caption *outside* the canvas. Dark ink canvas, one accent, semantic green/amber/red only for variance, tabular mono numbers at 12–13 px.

Never: window title bars, "Illustrative demo" pills inside the frame, numbered wizard steps, task-pane drawers with site buttons, status-bar footers, marketing copy inside the canvas, nested cards, tilted or device-framed mock-ups. Interaction is report interaction — switch a page tab, click a bar or a cell, select a row — and every click has a visible result. Sample numbers must agree across pages and with `PG.scene.data`; a matrix cell that opens a definition shows period, unit, source and owner. Thumbnails (`thumb:true`) show the head, cards and first visual only. Real anonymised client report pages replace rendered canvases wherever the client has consented.

## Motion

Tokens: `--dur-1 150ms` control feedback · `--dur-2 220ms` panels and selection · `--dur-3 300ms` drawers · `--dur-4 550ms` data explanation and the one-time hero entrance; travel `--travel-sm 6px` / `--travel-md 12px`; easings `--ease` and `--ease-io`. Route change fades 120 ms. Scene repaints settle the body 160 ms, patch, enter 240 ms — the frame and controls stay in place and focus is restored after the real render. Reveals are opacity plus 12 px rise, nothing else; no image zoom, no clip reveals, no scroll-driven word colouring, no slideshow. One photograph may settle from 1.02× over 10 s once, desktop only. The home sequence has a user-started Replay; a click or key press takes over from the scroll observer. `html.reduce-motion` and `prefers-reduced-motion` show every final state immediately.

## The mark as a system

The nine-cell mark is the brand's visual idea and it appears as three things: a faint grid texture (`.grid-field`, 4.5 % white lines at 96 px, masked to one corner) on navy and ink fields; the **cells device** (`C.cells(n)` — nine cells, cell n lit, wraps past nine) as section numbering (`.num-cell`), the scene title glyph, the next-steps list and sample cards; and the wordmark glyph. Never a wash, never on photographs, never more than one texture per screen.

## Page openings

Pattern Grid is a consultancy, not a product company: a hero never shows a product screenshot. Marketing pages open with **one full-bleed photograph, a strong two-line headline, a one-sentence subtext and two actions** (`.hero-photo`; home uses the `home` size and the brand line "See what matters."), followed by the **centred statement** (`.statement`) that fills in word by word on scroll — the second sentence of the pitch, with one emphasised phrase. Utility pages (contact, assessment, legal, 404, work detail, founder) open typographically with `.page-intro`.

The workspace scenes stay below the fold as worked examples; the guided walkthrough (`PG.scene.walk`, `PG.scene.BI_WALK`) lives on the services overview example, never in a hero. Thumbnails of scenes stand in for previews on home and the work index.

Every page ends with `PG.closing({h, p, cta, service})`: one headline, the same two actions and the three next steps. Thumbnails: `PG.scene.render(name, {thumb:true, plainHeading:true})`. Lists become evidence: industry measures open their definition from `PG.scene.industries`; stage outputs render as `.doc-mini`; the assessment intro shows a sample result card.

Order on a service page: hero → example (the scene) → what you receive → approach → flow diagram (disclosure) → technology → questions → closing.

## Composition

Vary section layouts deliberately: scene-wide, text-left/scene-right, scene-left/text-right, stacked. Never three identical compositions in a row. Keep a one-line outcome statement visible next to every scene; move detail into the drawer, an expansion or a `<details>` block.

## Procedure for any visual change

1. Read this file and the brief sections it names.
2. Build with `PG.scene.*` components; add a component there if a new element is needed.
3. Check the sample arithmetic.
4. Run the site (`npm run dev`), view at 1440, 768 and 390 px; test the controls by keyboard; toggle reduced motion.
5. Record the route in `docs/visuals/routes.md` with what changed and a screenshot in `docs/visuals/after/`.
