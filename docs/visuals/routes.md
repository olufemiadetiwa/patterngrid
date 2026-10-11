# Visual upgrade — route-by-route record

Seventh pass, 11 October 2026. Brief: [`brief.md`](brief.md). Rules: [`.claude/skills/site-visual-language/SKILL.md`](../../.claude/skills/site-visual-language/SKILL.md). Captures: [`before/`](before/) and [`after/`](after/) (full pages, 1440 and 390 wide, taken with `tools/capture-visuals.sh`).

Every diagram-like explanation on the site is now a **workspace scene** built from `public/assets/js/scenes.js`: a framed, product-like surface with a title bar and `Illustrative demo` tag, a stepper or tabs where the scene has stages, layered surfaces, a linked action drawer that names the next step and its owner, and a footer line stating the chain and `Sample data · local interactions only`. One sample dataset (W36 net sales 9.6m vs plan 10.0m; Beverages −0.1, Snacks −0.3, Personal care 0.0, Household 0.0; Ikeja/Lekki/Surulere/Ikorodu) runs through all of them, and the arithmetic agrees across stages.

| Route | Section | Before | After | Interaction | Verified |
|---|---|---|---|---|---|
| `/` | Five services — sticky preview | Dark card with five hand-drawn panels (quadrant matrix, run table, metric card, queue, dot table) | The same five workspace scenes in a static `preview` form (no drawers), inside the ink card; swaps on hover/focus of a service row | Hover/focus a row; card is `inert` | Desktop 1440 ✓ (scene heights 480–620 px, card min 560) |
| `/` | Where is performance slipping? — sequence | Translucent dark panel, pill tabs, white-on-ink groups | `Connected view` scene chrome: title bar, numbered stepper, light surfaces, amber highlight for the Surulere row, drawer-style question card | Tabs, arrow keys, Replay, scroll-driven stage changes | Desktop ✓, 390 ✓ (stepper wraps) |
| `/services` | Five service rows — minis | Decorative, `aria-hidden` mini diagrams (matrix, boxes-and-arrows, bar chart…) | Compact, interactive workspace scenes mounted in each row (`data-scene-compact`): delivery and source scenes show a status line in place of the side drawer | All scene controls work | Desktop ✓, 390 ✓ |
| `/services/data-ai-strategy` | Worked example | Phase columns with outlined initiative boxes and a key-value panel | **Delivery workspace**: initiative rows with owner, dependency note, phase bar on a three-phase track, status chip; drawer with business question, prerequisites, acceptance, owner; `Try it: mark source integration complete` toggle | Toggle flips Source integration → Complete and Weekly commercial reporting → Ready to sequence; AI assistant stays Foundation needed until reporting is in use; select a row to change the drawer | Cascade verified in the browser; 390 ✓ |
| `/services/data-engineering` | Worked example | Pipeline run table with a held-record row | **Source workspace**: three source tiles with record previews and field chips (key highlighted), shared-model join rows, resulting view with the selected source's column emphasised, drawer for the quality gate | Select a source; `Trace the held record` opens the held-record drawer and back | Verified; 390 ✓ |
| `/services/business-intelligence` | Worked example | Inspectable metric card with a trace panel | **Decision workspace** (matches the brief's mock): stepper Performance → Trace sources → Assign action; KPI 9.6m, 0.4m below plan, weekly bars W31–W36 with plan line; `Needs review` drawer → `Trace this metric`; breakdown rows by product line with agreed definition and owner; follow-up action with owner, due date, linked evidence | Steps, breakdown rows, Assign, Start again; arrow keys on the stepper | Verified incl. reduced motion (repaint is synchronous); 390 ✓ |
| `/services/ai-automation` | Worked example | Work-item card with mode buttons | **Review workspace**: vertical flowline Input → Proposed → Checks → Human review with state dots, segmented sample picker (Normal week / Missing source), drawer with Approve / Return and a recorded decision | Decide, reset; missing-source sample stops at review with no release buttons | Verified; 390 ✓ |
| `/services/capability-building` | Worked example | Dot matrix by task | **Capability workspace**: role picker, task rows with a three-segment progression (baseline → guided → independent), drawer with evidence per role | Role and task selection | Verified; 390 ✓ |
| `/services/*` | Flow diagram | Always-open node-and-edge diagram | Kept as the deeper explanation: band chips stay visible, the diagram, legend and step list sit under `Open the full flow diagram` (`<details>`); it measures and plays when opened; Replay opens it | Toggle, replay | Edges drawn on open (6 on Strategy) |
| `/services/*` | Worked example composition | Text-left / artifact-right | Heading row (question + steps) above a full-width scene — the page now alternates: tabs (stages) → dark band with disclosure → wide scene → split technology → three-column questions | — | — |
| `/industries/*` | How the sources connect | Navy lineage box with five labels, curved SVG, two captions; separate dark record grid below | **Source workspace** per industry: five source tiles with record previews and the sector's field names, shared definition rows, resulting figure from the sector's sample grid, drawer with the sector question. The duplicate dark record grid and its text were folded into this section | Select a source | All four industries ✓; 390 ✓ |
| `/industries`, `/work`, `/about`, `/assessment`, `/contact`, legal | — | — | No diagram-like scenes on these routes; unchanged in this pass apart from shared tokens | — | 390 overflow sweep ✓ |

## Motion

Scene repaints settle the body to 40 % for 160 ms, swap, and enter over 240 ms; bars grow over 500 ms; selection and status changes 200–400 ms on `--ease`/`--ease-io`. Under `html.reduce-motion` the repaint is immediate and every transition is disabled; the final state is complete without animation. Nothing loops; the only timed sequences are the user-started Replay buttons.

## Checks run

- Every route loaded in Chrome with no console errors.
- 390 px sweep over 16 routes: `scrollWidth === innerWidth` everywhere; the only elements wider than the viewport sit inside their own horizontally scrollable containers (service subnav, scene steppers before wrapping).
- Keyboard: steppers are `role="tablist"` with roving `tabindex`, ArrowLeft/ArrowRight move and keep focus; every control is a real `<button>` or `<input>`; drawer CTAs are 44 px.
- Sample arithmetic: 9.1 + 9.4 + 9.8 + 10.1 + 10.3 + 9.6 series; −0.1 − 0.3 + 0 + 0 = −0.4 = 9.6 − 10.0; Snacks 118 credit notes referenced in trace, action and AI proposed text; Surulere 61 / 41 % / 1 delivery in engineering, home sequence and industry grid.

## Open items

- `prefers-reduced-motion` is honoured, but the site's own toggle persists in `localStorage`; a visitor who set it on another device will not carry it over (as before).
- The home preview card is static by design; the interactive versions live on `/services` and each service page.
- Hero and industry photography were not replaced in this pass (no new licensed assets); the existing art-directed set and crops remain.
