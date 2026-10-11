---
name: site-visual-language
description: The Pattern Grid visual language — tokens, surfaces, scene components, motion rules and the review procedure. Read before changing any page, section or scene on the site; use it to keep every route on one system.
---

# Pattern Grid visual language

Direction: **calm, premium enterprise. Intelligence in the real world.** Photography and product-like scenes make the work tangible; typography and spacing carry hierarchy; teal is a selective accent, never a wash.

Authorities, in order: `design-source/uploads/Pattern_Grid_Visual_Upgrade_Prompt.md` (type, heroes, motion limits), `docs/visuals/brief.md` (scene direction), then this file.

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

Radius: 2 px on controls, 3 px on cards, 6 px on the scene frame. Fine 1 px rules. No glass, no large shadows, no gradients except the hero scrims.

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

Small interactions 180–240 ms; explanatory transitions 450–650 ms; one easing, `--ease` (`cubic-bezier(.22,1,.36,1)`); crossfades on `--ease-io`. Animate selection, expansion, highlighting and status changes only. Finite sequences; nothing loops; nothing runs offscreen. `html.reduce-motion` and `prefers-reduced-motion` must show every final state immediately.

## Composition

Vary section layouts deliberately: scene-wide, text-left/scene-right, scene-left/text-right, stacked. Never three identical compositions in a row. Keep a one-line outcome statement visible next to every scene; move detail into the drawer, an expansion or a `<details>` block.

## Procedure for any visual change

1. Read this file and the brief sections it names.
2. Build with `PG.scene.*` components; add a component there if a new element is needed.
3. Check the sample arithmetic.
4. Run the site (`npm run dev`), view at 1440, 768 and 390 px; test the controls by keyboard; toggle reduced motion.
5. Record the route in `docs/visuals/routes.md` with what changed and a screenshot in `docs/visuals/after/`.
