# Pattern Grid — design system v2

Source of truth: `public/assets/css/site.css` (tokens in `:root`, the "v2 SYSTEM" block and the component blocks after it). No build step, no dependencies.

## Foundations

| Group | Tokens |
|---|---|
| Colour | `--ink #101114`, `--obsidian-2 #191B20`, `--paper #F6F7F4`, `--white`, `--accent #5965EF`, `--teal #3F49C9` (indigo ink for text on light, 6.5:1), `--accent-hi #9AA2F7` (indigo on dark, 8.0:1), `--accent-press #4B57E6`, `--accent-2-hi #C5F2D6` (mint, signal on dark, 15:1), `--accent-2-ink #1B6B45`, `--muted #5B616B` (5.8:1), `--slate #3A3F48`, `--slate-dark #A9AFB9` (8.6:1 on obsidian), `--amber #F2C063` / `--amber-ink #8A5300` on `--amber-soft #FFF4DF` (5.8:1), `--hair`, `--hair-dark` |
| Type | `--sans` Geist, `--mono` Geist Mono. `--h1-home` 44–104 px, `--h1` 42–88 px, `--h2` 32–60 px, `--h2-sm` 27–44 px, `--h3` 21–28 px, lead 18–21 px, body 17–19 px. Annotations (eyebrow, label, number cell, figure note) are mono, uppercase, 12–12.5 px, 0.06em. |
| Space | section rhythms `--sec-y`, `--sec-y-sm`, `--sec-y-xs`; wrap 1360 px; fluid gutters |
| Radius | 6 / 10 / 12 px |
| Motion | `--dur-1` 150 ms control feedback, `--dur-2` 220 ms selection, `--dur-3` 300 ms state change, `--dur-4` 550 ms explanation. Nothing loops. |
| Breakpoints | 599, 699/759, 899, 959/999, 1099 px. New sections become two-column from about 760 px. |

Rules: one accent per view; indigo is interaction, mint is signal on dark, amber is exception. Contrast figures above are computed, not estimated. White on `--accent` is 4.6:1 and is used for buttons at 16 px medium.

## Components

| Component | Class / function | Notes |
|---|---|---|
| Buttons | `.btn`, `.btn-accent`, `.btn-ghost`, `.arrow` | 52 px high, 44 px minimum target |
| Segmented control | `.seg` | `aria-pressed` buttons |
| Navigation | `.site-header` (`is-solid` on light pages), drawer, `.subnav` | tone is read from the rendered page, so no flash |
| Home hero | `.home-hero` | headline, lead, two actions, system map |
| Page hero | `.page-hero` | service pages: copy plus the service figure |
| Split hero | `.hero-split` | industries, case studies, About, Approach: copy on obsidian, photograph at the right |
| Section head | `.section-head` | eyebrow + heading at left, lead at right |
| System map | `PG.viz.system()` | five columns and the controlled-AI lane; one finite signal pass |
| Fragmented / connected | `PG.viz.fragment()` | three source records become one |
| Intelligence Canvas | `PG.viz.canvas()` | five tabbed stages with output and owner; stacked on phones |
| Method rail | `PG.viz.method()` | five stages; accordion on phones |
| Service figures | `PG.viz.mini(slug)` | one SVG per service |
| Sample views | `PG.scene.mount(host, name)` | strategy, engineering, bi, ai, capability, lineage. Always captioned "Illustrative · sample data". |
| Case card | `PG.caseCard(c)` | photograph, problem, outcome, architecture line |
| System map (case) | `.sysmap` | sources → pipeline → reporting, from the records |
| Report schematic | `.rs-fig` | report areas as wireframes; never a screenshot |
| Lists | `.measure-list`, `.caps`, `.method`, `.demo-steps` | hairline rows |
| Notes | `.note-block`, `.fig-note` | |
| Status | `.chip-state` (`ok`, `warn`), `.tag` | |
| Forms | `.form-bounded` | bounded inputs, inline errors, summary |
| Closing | `PG.closing({ tone })` | call to action plus "what happens next" |

## Accessibility behaviour

Tabs follow the ARIA pattern (arrow keys, Home, End, roving tabindex). Toggles use `aria-pressed`. Figures have text alternatives or are complete as text. Elements are buttons only when they act. Focus is visible on every control. Reduced motion (system setting or the footer switch) shows final states at once. Every figure is legible without interaction.

## Events

`PG.track(name, data)` raises a `pg-track` DOM event and pushes to `window.dataLayer` when one exists. Wired: hero and service calls to action (`data-track`), `assessment:completed`, `enquiry:sent`. No analytics vendor is loaded.
