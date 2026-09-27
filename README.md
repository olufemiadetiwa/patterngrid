# Pattern Grid

The Pattern Grid marketing site — data, AI and business intelligence consulting.

Built from the Claude Design project `Pattern Grid.dc.html`, reproduced 1:1 and
re-implemented as a framework-free static site with real URLs.

```bash
npm run dev      # http://localhost:8780
```

No build step, no dependencies. `public/` is the deployable artifact.

---

## Deployment

Live on GitHub Pages: **https://olufemiadetiwa.github.io/patterngrid/**

`main` holds the whole project; the `gh-pages` branch is the `public/`
directory alone, published with:

```bash
git subtree push --prefix public origin gh-pages
```

The app detects a `*.github.io` host and serves itself from the repository
sub-path (`window.PG_BASE`, set in `index.html` before any asset loads); on any
root host — a custom domain, Netlify, Vercel — the base is empty and nothing
changes. Deep links on Pages arrive through `404.html`, which hands the path
back to the app; the response status is still 404, which is fine for people
and the client-side router but means crawlers see only the home page. When
the site moves to its own domain, prefer Netlify or Vercel (rewrite files
included) so every route answers 200, then regenerate `sitemap.xml` and
`robots.txt` for that origin with `node tools/build-sitemap.js <origin>`.

---

## Layout

```
public/                        deploy this directory
  index.html                   app shell: <head>, landmarks, script order
  404.html                     static-host fallback; hands the path back to the app
  favicon.svg  manifest.webmanifest  robots.txt  sitemap.xml
  _redirects  vercel.json      SPA rewrite rules for Netlify / Vercel
  assets/
    css/site.css               design tokens + every component style
    js/
      content.js               content model  ── carried over verbatim
      service-content.js       service model + icon set  ── verbatim
      core.js                  template helper, router, reveals, motion
      seo.js                   per-route head, Open Graph, JSON-LD
      shell.js                 header, mega menus, mobile drawer, footer
      hero.js                  carousel, headline, scroll-lit statement
      pages/*.js               one module per page
      app.js                   route table and page lifecycle

design-source/                 the imported Claude Design project (provenance)
  *.dc.html                    original components, exactly as imported
  runnable/                    same components with the design host's injected
                               blocks stripped, so the prototype runs locally
  uploads/                     the original authoring briefs

tools/
  serve.js                     dev server with the production SPA fallback
  build-sitemap.js             regenerates sitemap.xml from the content model
  make-reference.js            rebuilds design-source/runnable
  compare.js                   parity check against the prototype
```

`content.js` and `service-content.js` are unchanged from the design project, so
editing copy, services, industries, case scenarios, articles or assessment
questions is still a single-file change.

---

## Routing

Pages are real paths (`/services/data-ai-strategy`), driven by the History API.
The prototype's hash links (`#/services/...`) still resolve — `core.js` rewrites
them on click and on entry, so existing links and bookmarks keep working.

Any host serving this needs an SPA fallback so a deep link reaches
`index.html`. Three are included:

| Host | File |
|---|---|
| Netlify | `public/_redirects` |
| Vercel | `public/vercel.json` |
| Anything serving `404.html` (GitHub Pages, S3) | `public/404.html` |

For nginx: `try_files $uri $uri/ /index.html;`

---

## Content model

Everything on the site is generated from `window.PG`:

| Key | Drives |
|---|---|
| `services` | the five capability pages, nav, footer, home list |
| `servicesOverview` | services index intro, situations, feature copy |
| `industries` | four sector pages, home grid, nav |
| `work` | three illustrative scenarios |
| `articles` | the Insights index |
| `stages`, `beliefs`, `engagements` | About and Our Approach |
| `assessment`, `bands`, `priorityMap`, `tieOrder` | the readiness assessment |
| `heroes`, `img` | hero images, headlines and opening statements |
| `icons` | the 24-unit line icon set |

Adding a service means adding an entry to `PG.services` and running
`npm run sitemap`. No template changes.

---

## The contact form

The form validates and reports but posts nothing until a destination is set:

```html
<body data-form-endpoint="https://your-endpoint.example/enquiries">
```

It POSTs JSON (`name`, `email`, `organisation`, `role`, `service`, `message`,
`process`, `time`, `optin`). Until then it shows the "not yet connected"
message the prototype used. A honeypot field is included; a filled one is
silently discarded.

---

## Parity check

`tools/compare.js` proves this build renders the same text as the original
prototype, route by route. To re-record the captures, run both servers and
collect the rendered text from each:

```bash
npm run dev        # :8780  this build
npm run reference  # :8781  the prototype
```

Then, in the browser console on each, POST the rendered text of every route to
the dev server's `/__dump` endpoint (see the snippet in `tools/compare.js`
header) and run:

```bash
npm run compare
```

The check ignores whitespace — the two renderers break lines between inline
elements differently — and a short list of deliberate differences that
`compare.js` documents inline.

Current result: **24/24 routes match**, with one prototype bug deliberately
fixed (below).

---

## Visual upgrade (second pass)

Applied from `design-source/uploads/Pattern_Grid_Visual_Upgrade_Prompt.md`, which the
prototype had only partly followed.

**Type.** Geist replaces Hanken Grotesk; Geist Mono is reserved for data values,
code and the slide counter. Section labels that were monospace "console" text
are now the sans at a small size with wide tracking (`.lbl`, `.eyebrow-caps`).
Display sizes follow the brief's table: home hero 56–152 px, inner heroes
48–120 px, statement 30–64 px, section headings 36–72 px, body 17–19 px.

**Photography pipeline.** Every photograph is now progressive:

- a 32 px, blurred preview (~3 KB) is painted as the frame's background first,
  so no image slot ever renders as an empty dark box;
- the full file fades over it once decoded (`.is-loaded`), with an explicit
  intrinsic size so layout never shifts;
- the first hero frame is `<link rel="preload">`-ed with `fetchpriority="high"`;
  the second frame is requested only after the first has arrived;
- hovering an internal link starts fetching that page's opening photograph,
  so the next hero usually arrives sharp;
- separate desktop and mobile focal points (`PG.img.reg[key][4]`) for the
  home frames, where the subject sits off-centre on a tall crop;
- the 2400 px hero export is served at q=65 (~220–400 KB), within the brief's
  budget; a hover-revealed photographer credit sits in each frame.

**Hero.** Headline reveals once by line through a mask (760 ms, 80 ms stagger);
images cross-fade over 1100 ms with a 1.00→1.04 push during the eight-second
dwell; a segmented progress line shows dwell and pause state; arrow keys move
between frames; a left-to-right scrim keeps the headline's quiet third legible
on busy frames. On the home page the two CTAs sit beneath the scroll statement
rather than on the photograph, as the brief specifies.

**Statement.** Fill now runs from `#646B70` to `#07131C` on warm white and
`#9AA4AC` to white on ink (the prototype started too pale), begins as the
paragraph enters the lower third and completes by the upper quarter, and
re-measures after fonts load.

**Home sequence.** The four narrative stages no longer occupy 48 vh each; they
sit on a rail with a dot per stage (32 vh minimum), so the sticky panel keeps
pace without the empty voids. The service-preview card settles out and in
(320 ms) when a capability row is selected.

**Motion timings** now match brief §08: reveals 560/720 ms, clip reveals
880 ms with a 1.08→1.00 settle on the image, menus 220 ms, route fade 200 ms,
one eased finish throughout.

**Navigation.** `/page#anchor` deep links scroll to the anchor on load.

## Premium pass (third pass)

Targeted at the sections that still read as "prototype" in review screenshots.

- **Flow diagrams** sit on an engineering-paper ground (24 px dot grid); nodes
  are top-lit cards with a kind marker (process = teal, decision = white,
  exception = amber, output/use = navy on white), a hover lift and a soft
  selection halo; the explanation aside carries a teal top rule; ownership
  chips have a marker square.
- **Five-stage approach** is a stepper on a baseline — light 34 px numerals,
  a 2 px navy rule on the selected stage — instead of five boxed tabs. The
  stage preview is presented as a document card with a short navy rule.
- **Decision path** (About) is five equal steps on a rule with numerals, the
  last step marked in teal, replacing the ragged 4+1 card grid.
- **Contact** is a split composition: navy aside with the three steps and a
  reassurance line; lined form on white with uppercase 12 px labels and a
  2 px underline on focus. Collapses to one column under 960 px.
- **People.** `PG.team` in `content.js` holds the founder and a `members`
  array. Portraits render through `PG.core.portrait()`: an approved photograph
  when `photo` is set, otherwise a clearly labelled reserved frame (hatched
  paper, wordmark glyph, "portrait to be supplied"). The founder feature
  appears on `/`, `/about` and `/about/precious-celestine`; `/about` also
  carries a team grid with `reservedSlots` placeholders. No stock face or
  generated likeness is ever substituted — add a photo key and the frame
  becomes the photograph.
- **FMCG hero** now opens on `wh-tablet-2` then `wh-ladder`, both with the
  subject right of centre and a quiet left third for the headline, replacing
  the centred forklift frame (`wh-pallets` stays as the section photograph).

## Critique fixes (fourth pass)

Everything raised by the `design:design-critique` review, applied:

- **Deliverables grid** — three columns above 960 px so six items fill exactly;
  hairlines moved to per-cell outlines so there are no painted blank cells.
- **First hero frames served locally** — `tools/build-hero-frames.js` pulls the
  first frame of all 24 heroes from Unsplash once and writes
  `public/assets/img/hero/<key>-d.webp` (1920 px, target ≤250 KB) and
  `<key>-m.webp` (900×1200 portrait crop around the mobile focal point, ≤150 KB),
  plus `assets/js/local-images.js` with paths, intrinsic sizes and an inline
  32 px blurred preview. The hero renders the first frame as a `<picture>` with
  a mobile source, preloaded per breakpoint; later frames still come from the
  CDN after the first is on screen. 5.3 MB on disk for 48 files. Two desktop
  frames stay over budget because their texture resists compression:
  `arch-interior` (371 KB at q40) and `lagos-civic-towers` (334 KB) — swap or
  crop those if the budget is firm. Unsplash's licence permits redistribution;
  the photographer credit remains in each frame.
- **Touch targets** — header links, footer links, breadcrumbs, sub-nav jumps,
  sequence tabs, arrow links, the motion toggle and the wordmark all present
  ≥44 px hit areas via padding or pseudo-elements; visual sizes are unchanged.
- **Two label roles** — `.eyebrow` (teal, sentence case, 13 px) and
  `.label-caps`/`.lbl` (muted, uppercase, 11 px, 0.12 em). Thirty-three labels
  were re-mapped; inline font sizes on them removed so the role sets the size.
  Dark card headers use the same meta-label style; monospace is now only in
  data grids, code and the slide counter.
- **Two button heights** — 52 px primary, 44 px compact (header, ghost, small).
- **One arrow** — a `currentColor` SVG via CSS mask replaces every text `→`
  inside `.chev`; the same 300 ms nudge everywhere; `.chev.down` for the
  artifact jump. Nav carets are 12 px chevrons that rotate when a menu is open.
- **Closing sections** — inner pages use weight 600 and the home page's
  primary + secondary ("Check your readiness") pattern.
- **Home industries grid** — Technology at 2:1 so both rows end level; no
  orphaned arrow.
- **Capability rows** — output chips are dot-separated muted text, so the row
  reads as one link.
- **Data grids** — 12.5 px mono above 1600 px.
- **Placeholder policy** — the home founder feature shows the portrait only
  when `PG.team.founder.photo` is set (reserved frames stay on `/about`);
  Insights is removed from the primary nav, drawer and footer until an article
  has `published: true`, and the index states that nothing is published yet.

## What changed from the prototype

Same design, same words, same interactions. The differences are structural.

**Fixed**

- `/terms` rendered the **Privacy Notice**. The prototype's shell passed
  `view="{{ slug }}"` to the Legal component, but legal routes never have a
  slug, so the view always fell back to `privacy`. Terms now renders Terms.
- The assessment kept answers only in component memory on this build's first
  draft; it now re-reads the stored session when you enter the page, matching
  the prototype and surviving a second tab.
- The hero's 8-second Ken Burns transform could not be cancelled by CSS once in
  flight, so turning on "reduce motion" mid-slide did nothing until the next
  slide. It now stops immediately.
- The header read a cached scroll flag, so arriving on a page while scrolled
  drew a solid header over a hero that should have been transparent.
- Insights card artwork was positioned by the index within the *filtered* list,
  so changing category reshuffled the artwork of cards that hadn't moved. It is
  now derived from the article title.
- Disabled buttons put white text on `#9DB0BF` — 2.2:1. Darkened to 4.96:1.
  (WCAG exempts disabled controls; it was still hard to read.)

**Removed**

- React 18 UMD (~141 KB), the design runtime (`support.js`, 69 KB) and its
  `new Function` module loader. Nothing in this build is evaluated from a
  string, and there is no third-party runtime to keep current.
- Dead code in the hero: `dataSources`, `dataCards`, `traces` and `gridLine`
  were computed on every render and consumed by no markup.
- An unused `dots` array in the contact component, and a no-op ternary in the
  assessment's answer handler (`a[i === a[idx] ? idx : idx] = i`).

**Added**

- Real URLs, so every page is linkable, indexable and has its own history entry.
- Per-route `<title>`, description, canonical, Open Graph and Twitter cards, plus
  JSON-LD for the organisation, breadcrumbs, each service, the founder and the
  contact page. The prototype had one fixed title for all 24 routes.
- `sitemap.xml`, `robots.txt`, a web manifest and a favicon.
- Arrow-key support on both tablists (home sequence, service approach), which
  had click-only tabs.
- Focus moves to `<main>` on navigation; the mobile drawer traps Tab and
  restores focus on close.
- `fetchpriority="high"` on the first hero image, `preconnect` to the image CDN.
- Inline styles lifted into one cacheable stylesheet (47 KB raw, 9.5 KB gzipped)
  instead of being re-sent inside every component's markup.
- Desktop/mobile navigation swaps by media query rather than a JS width check, so
  it responds to a resize without re-rendering.
- A print stylesheet, so "Print or save result" on the assessment produces a
  usable page.

---

## Weight

Measured, not estimated:

| | raw | gzipped |
|---|---:|---:|
| This build — everything a page needs | 358 KB | **92 KB** |
| Prototype — home page only | ~399 KB | — |

Half of this build is the content model itself (`content.js` +
`service-content.js`, 99 KB raw), carried over unchanged.

Every page module loads upfront. That is a deliberate trade: one cached payload,
then client-side navigation with no further requests, rather than the
prototype's per-route component fetch. `services.js` is the largest module at
58 KB raw / 14.5 KB gzipped; if the site grows well past five services, that is
the first thing to split.

---

## Verified

- 24/24 routes render with no console errors, on load and via client navigation.
- No horizontal overflow on any route at 375 px.
- One `<h1>` per page, no heading-level jumps, every image has `alt`, every
  control has an accessible name, every input has a label.
- Text contrast at or above 4.5:1 for body text on every surface.
- Assessment scoring exercised end to end: 0/100 → Fragmented, 100/100 → AI
  ready, and the foundation rule that holds a 94/100 at Intelligent when data
  quality scores below 3.
