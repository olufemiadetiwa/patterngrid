---
name: site-visual-language
description: The Pattern Grid visual language — tokens, surfaces, scene components, motion rules and the review procedure. Read before changing any page, section or scene on the site; use it to keep every route on one system.
---

# Pattern Grid visual language

Direction: **precision, useful depth and human credibility.** The work itself is the visual: a metric with its definition, a source model, an exception that explains itself, a reviewer approving an action. Photography adds context and people where those are the point of a section; it never carries the proposition. Typography and spacing carry hierarchy; teal is a selective accent, never a wash.

Authorities, in order: `docs/ux/brief.md` (the October 2026 deep UX review — first screen, page order, images, motion, contact, static routes), `docs/visuals/brief.md` (scene direction), then this file. The earlier Visual Upgrade Prompt in `design-source/uploads/` is superseded where it asked for photography on every hero, a slideshow, a scroll-lit statement or near-square radii.

## Stack facts

- Plain HTML/CSS/JS. No framework, no build step. Templates are tagged `html\`\`` strings in `public/assets/js/pages/*.js`; the runtime is `core.js`.
- One stylesheet: `public/assets/css/site.css`. Tokens live in `:root`. Add new tokens there, never inline hex values in page modules.
- Scene components: `public/assets/js/scenes.js` (`PG.scene.*`). Reuse them; do not hand-build a workspace in a page module.
  - Primitives: `frame`, `kpi`, `bars`, `drawer` (renders `.action-drawer` — `.drawer` is the mobile nav), `records`, `chip`.
  - Scenes: `PG.scene.defs.{bi,strategy,engineering,ai,capability,lineage}`, each `{init, render(state, opts), act(state, key, value, el)}`.
  - Mount with `PG.scene.mount(host, name, opts)` on a `[data-scene="name"]` element (returns a disposer for `cleanup`); render statically with `PG.scene.render(name, opts)`.
  - `opts.compact` (overview columns: no side drawer on delivery/sources, status line instead); `opts.preview` (home sticky card: static, no drawers); `opts.industry` (lineage scene).
  - Controls are `data-act="key:value"` buttons/inputs; the mount repaints the body with a 160 ms settle + 240 ms enter (none under reduced motion). Layouts respond to the scene's own width with `@container scene` queries, so one scene works full-bleed, in a column and on a phone.
- Capture tool: `tools/capture-visuals.sh <base-url> <out-dir>` — full-page headless Chrome captures at 1440 and 390 for the scene routes (used for `docs/visuals/before|after`).
- Content model: `content.js` and `service-content.js`. Scenes read sample data from `PG.scene.data` so the same figures appear everywhere.

## Tokens

Ink `--ink #07131C`, navy `--navy #02203D`, teal text `--teal #17647D`, accent `--accent #38A0C3`, amber `--amber-ink #8A5A12` on `--amber-soft`, paper `--paper #F5F5F1`.

Scene surfaces (cool neutrals, distinct from the warm page paper):
`--surface-0` white · `--surface-1 #F6F8F9` · `--surface-2 #EDF1F4` · `--surface-line rgba(7,19,28,.08)`.
Depth: `--shadow-1` (resting card) · `--shadow-2` (raised drawer). Never larger.
Chart: `--bar #D7E3EB` (context) · `--bar-on #2E6E8E` (selected) · `--trend #38A0C3`.

Type: Geist. Scene UI text 13–15 px; values 28–44 px at weight 600, tabular numerals; labels 11 px uppercase 0.12 em (`.label-caps`). Mono (`--mono`) only for record ids, code and counters.

Radius by role: `--radius-sm 4px` chips and keys · `--radius 6px` controls and inner surfaces · `--radius-lg 12px` cards · `--radius-xl 16px` scene frames. Fine 1 px rules. No glass, no large shadows (`--shadow-2` is the ceiling), no gradients except the hero scrim. Content width `--wrap 1360px`.

## Scene grammar

Every explanatory visual is a **workspace scene**: a framed, product-like surface with
1. a title bar (wordmark glyph, scene name, an `Illustrative demo` tag),
2. a stepper or tabs when the scene has stages,
3. a body of layered surfaces: metric panel, chart, source tiles, record previews, timeline, dependency rows,
4. a linked **drawer** that names the next action and its owner,
5. a footer line stating the chain (`Measure → evidence → accountable action`) and `Sample data · local interactions only`.

Rules: the static first state must tell the whole story; every visible control has a visible result; sample numbers must agree across stages (a breakdown sums to its total; a prerequisite toggled off changes downstream readiness); conceptual scenes carry the `Illustrative demo` tag and never imply a live system or a client.

Scene families: **performance** (metric → trace → action), **delivery** (initiatives, owners, dependencies, timeline), **sources** (system tiles with record previews → shared definition → resulting view), **review** (work item → checks → human decision), **capability** (role → guided → independent).

## Motion

Tokens: `--dur-1 150ms` control feedback · `--dur-2 220ms` panels and selection · `--dur-3 300ms` drawers · `--dur-4 550ms` data explanation and the one-time hero entrance; travel `--travel-sm 6px` / `--travel-md 12px`; easings `--ease` and `--ease-io`. Route change fades 120 ms. Scene repaints settle the body 160 ms, patch, enter 240 ms — the frame and controls stay in place and focus is restored after the real render. Reveals are opacity plus 12 px rise, nothing else; no image zoom, no clip reveals, no scroll-driven word colouring, no slideshow. One photograph may settle from 1.02× over 10 s once, desktop only. The home sequence has a user-started Replay; a click or key press takes over from the scroll observer. `html.reduce-motion` and `prefers-reduced-motion` show every final state immediately.

## Page openings

- Home: `.hero-home` — category eyebrow, H1, one supporting sentence, two actions, beside the interactive BI decision workspace on a navy field. No photograph.
- Services, industries, about, approach: `.hero-photo` — one pre-cropped local photograph (`npm run images`), eyebrow, H1, supporting sentence, two actions. Height follows content (floor only above 720 px).
- Work, founder, insights: a photo-less compact hero (same markup, navy field).
- Contact, assessment, legal, 404, work detail: `.page-intro` — typographic, the task starts in the first screen.

Order on a service page: hero → example (the scene) → what you receive → approach → flow diagram (disclosure) → technology → questions → closing.

## Composition

Vary section layouts deliberately: scene-wide, text-left/scene-right, scene-left/text-right, stacked. Never three identical compositions in a row. Keep a one-line outcome statement visible next to every scene; move detail into the drawer, an expansion or a `<details>` block.

## Procedure for any visual change

1. Read this file and the brief sections it names.
2. Build with `PG.scene.*` components; add a component there if a new element is needed.
3. Check the sample arithmetic.
4. Run the site (`npm run dev`), view at 1440, 768 and 390 px; test the controls by keyboard; toggle reduced motion.
5. Record the route in `docs/visuals/routes.md` with what changed and a screenshot in `docs/visuals/after/`.
