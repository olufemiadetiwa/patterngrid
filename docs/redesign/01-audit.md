# Pattern Grid — website audit (Phase 1)

Audited 19 November 2026 against the staging copy (https://olufemiadetiwa.github.io/patterngrid-staging/, commit `c827b1e`) and the repository. Method: every route loaded in a real browser, DOM measured by script (headings, contrast, text size, calls to action, images), transfer sizes read from the live host with compression, source read for structure. Where a number could not be measured it is marked **unverified**.

## 1. What the site is today

| Area | Finding (evidence) |
|---|---|
| Stack | Plain HTML, CSS and JavaScript. No framework, no runtime dependencies, no `node_modules`. A tagged-template renderer and History router (`core.js`), page modules under `assets/js/pages`, content in `content.js` and `service-content.js`. Pre-rendered to 22 static routes by `tools/build-static.js` (headless Chrome), hosted on GitHub Pages. |
| Tooling | `npm test` (12 tests), `npm run audit` (static checks on every built page), production and staging deploys, image pipeline for hero frames and portraits. |
| Brand | Nine-cell mark, wordmark in Geist. Palette: ink `#07131C`, navy `#02203D`, teal `#17647D` / `#38A0C3`, gold `#E3A23A`, paper `#F5F5F1`. |
| Type | Geist and Geist Mono, self-hosted (29 KB + 23 KB WOFF2). 46 distinct font-size declarations in the stylesheet; mono is barely used. |
| Layout | 1360 px wrap, fluid gutters, three section rhythms. Breakpoints cluster at 959, 720 and 599 px (15, 5 and 7 media queries). 205 inline `style=""` attributes remain in page templates. |
| Components | Photographic hero and split hero, scroll statement, section head, tags and pipeline rails, document-style cards, case cards, at-a-glance panel, system map, service rows, founder banner, closing band, stepper, accordion, form. |
| Motion | Reveal on scroll, staggered card entrance, statement colour fill, portrait hover. All honour reduced motion. |
| Navigation | Services ▾, Industries ▾, Work, About ▾, Contact; Readiness assessment and Request a consultation at the right. Drawer on phones. Footer repeats the map. |

## 2. Measured results

| Measure | Result | Note |
|---|---|---|
| Routes built / audited | 22 + 404 | `npm run audit`: one `<h1>` per page, no heading jumps, unique titles and descriptions, canonical and social tags, valid JSON-LD, no duplicate ids, all images have alt and dimensions, no broken internal links. |
| Home document | 8.9 KB compressed | |
| Stylesheet | 99 KB raw, 20.3 KB compressed | one file |
| JavaScript | 20 files, 96 KB compressed | every page loads every page module (home loads the services, assessment and contact code) |
| Hero image | 77 KB (1200 px) / 99 KB (phone) | WebP, preloaded, blur placeholder |
| Requests on home | 30 | one third-party host: `images.unsplash.com` (industry card photographs) |
| CLS (home) | 0 | measured in the browser |
| LCP (home) | 0.7 s on the local server, 8 Nov | **Unverified on the live host**: the embedded browser reported an invalid value while its pane was hidden. No field data exists. |
| Lighthouse | **Unverified** | could not be run in this environment |
| Caching | `max-age=600` | GitHub Pages default; no long-lived asset caching, no fingerprinted filenames |
| Contrast | 2 failures in 13 pages sampled | "sets the order" label on navy (3.0:1, services index); a visually hidden portrait hint read as white on paper (not visible, harmless) |
| Text under 12 px | 4 to 28 elements per page | labels at 10.5 to 11.5 px; highest on service and case pages |
| Heading order | no jumps on any page | |
| Unlabelled controls | 0 | |
| Phone, 320 px | no horizontal overflow on any route; controls ≥ 44 px | checked 8 Nov, unchanged since |
| Tablet, 768 px | **partly verified**: layouts collapse at 959 px, so tablets get the phone layout | no tablet-specific composition |

Page weight in words and height (desktop): home 729 words / 10,400 px; a service page 776 / 10,600 px; a case study 839 / 9,700 px. The pages are long for what they say: roughly 14 px of scroll per word on a service page.

## 3. Strengths worth preserving

1. **True content.** Five clearly scoped services, two named client engagements written from the records, a real founder with a real portrait. Nothing is invented.
2. **The nine-cell mark** and the promise "See what matters."
3. **The readiness assessment**: ungated, eight questions, resumable, printable, hands off into the enquiry.
4. **Engineering hygiene**: no dependencies, static output, clean audit, reduced-motion support, keyboard support, base-path-aware build, staging.
5. **Nigerian context** in the photography and the worked examples (Lagos distributor, Surulere, Ikeja).
6. **Honest evidence language**: outcomes are stated as capabilities, not numbers.

## 4. Problems and what they cost

Priority: P0 blocks business, P1 weakens credibility or conversion, P2 polish. Effort: S under half a day, M about a day, L more.

| # | Problem (evidence) | Business implication | Recommendation | Pri / effort |
|---|---|---|---|---|
| 1 | **No working enquiry route.** `/contact` shows "The enquiry form is not open yet"; `formEndpoint` and `contactEmail` are empty. | Every call to action on the site ends at a dead end. | Connect a verified destination (form service or serverless function) with server-side validation and spam protection; until then keep the honest notice. Needs a business decision (parked as phase 2). | P0 / S once decided |
| 2 | **The site describes technical work but shows almost none.** After the removal of the sample reports, the only diagrams are tag rails and one system map per case study. | A technical buyer cannot judge capability; a design-literate visitor sees a brochure. | A coherent set of diagrams that show real information relationships: system map, fragmented-to-connected record, the five-stage canvas, one bespoke demonstration per service, an architecture diagram per case, a representative view per industry. All illustrative material labelled. | P1 / L |
| 3 | **Identity reads as a careful consultancy, not a technology firm.** Navy, teal, photographs of people at laptops, sentence-case eyebrows. Mono type, the strongest "engineering" signal available, is unused. | Undersells the engineering; indistinguishable from peers. | New palette (obsidian, porcelain, indigo, mint), tighter display type, mono annotations, the nine-cell grid as a composition device, dark technical sections on a light page. | P1 / M |
| 4 | **The home hero says what the firm values, not what it does.** "See what matters." over a bridge at night. | A first-time visitor needs the lead paragraph to learn the offer. | Lead with the offer ("Turn fragmented data into decisions you can defend.") beside a system map; keep "See what matters." as the brand line. | P1 / M |
| 5 | **No credibility strip.** Client names and platforms appear only inside case cards. | Delivery experience is not visible in the first screen and a half. | A restrained strip: the two named clients, the platforms used in those engagements, the five services. Text only; no logos without permission. | P1 / S |
| 6 | **Service pages are long and repetitive** (10,600 px; overview, deliverables, approach, flow, technology, questions) and contain no demonstration. | The buyer scrolls through description to find substance. | One template: outcome headline, challenge, demonstration, deliverables, architecture, method, technology, measures of success, supporting case, related services, contextual call to action. | P1 / L |
| 7 | **Industry pages repeat a generic pattern** and the "sources" section has copy but no visual. | Sector visitors do not see their own decisions and data. | Per industry: the decisions, the sources, the measures with definitions, where fragmentation bites, a representative view on sample data, applicable services, the related case. | P1 / M |
| 8 | **Case studies lack technical narrative.** Problem, system map, what was built, what changed. No processing approach, no design decisions, no view of the output. | The strongest proof on the site is under-told. | Add processing approach and design decisions from the records, a schematic of the report structure (clearly not a screenshot), and a reusable case model so a third engagement drops in. Real screenshots when the client approves. | P1 / M |
| 9 | **Assessment result is plain**: a number, a band, a list. | The one interactive product on the site ends weakly. | A result that shows the eight dimensions at a glance, explains the score, and keeps the self-assessment caveat. | P2 / M |
| 10 | **Every page loads every page's JavaScript** (20 files, 96 KB compressed). | Slower first load on phones than necessary. | Acceptable now; if weight grows, load page modules on demand. Add fingerprinted assets when a host with long caching is used. | P2 / M |
| 11 | **Type scale sprawl**: 46 font sizes, 205 inline styles. | Inconsistent rhythm; costly to restyle. | A documented scale and tokens; new work uses classes only. | P2 / M |
| 12 | **Small text**: labels at 10.5 to 11.5 px. | Readability on phones. | Minimum 12 px for labels, 13 px for mono annotations. | P2 / S |
| 13 | **No analytics or conversion events.** | Cannot tell which pages lead to enquiries. | A vendor-neutral event hook now (enquiry sent, assessment completed, call-to-action clicked); attach a provider when chosen. | P2 / S |
| 14 | **Tablet gets the phone layout.** | Wasted space at 768 to 959 px. | Two-column compositions from 760 px in the new sections. | P2 / S |

## 5. Search and metadata

Sound: unique titles and descriptions, canonical URLs on `patterngrid.ng`, Organization, Service, Person, ContactPage and CreativeWork structured data, sitemap and robots, static HTML for every route. Opportunities: descriptive page titles that name the outcome rather than the section; FAQ structured data on service pages (the questions already exist); an Insights section when articles are ready.

## 6. Conversion pathways today

Primary: "Request a consultation" (header, hero, closing band) → `/contact` → **blocked**. Secondary: readiness assessment → result → "Send my priorities with an enquiry" → `/contact` → **blocked**. There is no email address, phone number or booking link anywhere, by design, because none has been approved.

## 7. What the redesign must not change

Service scope, case study facts, founder identity, the absence of invented numbers, the static no-dependency architecture, accessibility behaviour, the staging-then-production workflow.

## 8. Decisions this brief reverses

Recorded so the change is deliberate:

- 8 November: all illustrative scenarios and sample report canvases were removed because they read as "a tool that does not exist". This brief asks for labelled illustrative demonstrations. They return as diagrams and sample views in the page's own design language, each marked "Illustrative · sample data", never framed as a product or a client delivery.
- 22 October: heroes were made photographic because a screenshot-like hero "passes off a wrong message of the availability of a SaaS product". This brief asks for a system visual in the home hero. It is drawn as an architecture diagram, not an application window.
- 8 November: gold was added as the secondary accent. The proposed palette replaces teal and gold with indigo and mint. The logo files exported on 8 November use navy and gold and will need re-exporting if this direction is approved.
