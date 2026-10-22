# Pattern Grid: deep UI/UX review and Claude Code implementation prompt

**Website:** https://olufemiadetiwa.github.io/patterngrid/  
**Review date:** 18 October 2026  
**Repository:** https://github.com/olufemiadetiwa/patterngrid  
**Source snapshot:** `8c24a559b070bd81eeab57161671637df06de052`

## How to use this document

Part A explains the findings and priorities. Part B is a self-contained implementation prompt: give it to Claude Code with the repository open. It tells Claude what to change, which existing skills to read, which additional tools are useful, and how to demonstrate that the work is finished. Part C contains primary references.

This is a review and implementation brief. The recommendations have not been applied to the website.

## Part A — Expert review

### Overall assessment

Pattern Grid already has several ingredients of a premium consulting website: confident typography, a restrained navy and teal identity, clear service categories, thoughtful explanations, and unusually useful interactive examples. The main problem is how these ingredients are arranged. Large photographic heroes, oversized statements and repeated explanations delay the evidence that makes the company interesting.

The current experience often resembles a cinematic corporate brochure. The opportunity is to make it feel like a precise, contemporary data and intelligence consultancy: immediately understandable, technically credible, visually distinctive and easy to contact.

The highest-return improvements are a clearer first screen, earlier demonstrations, better image relevance, fewer competing animations and dependable conversion paths. A new typeface or additional animation library will not, by itself, solve these problems.

### What was reviewed, and what was not measured

I inspected the live desktop homepage, services overview, Business Intelligence service page and demo, Work index, About, founder profile, Retail & Ecommerce, contact, and the complete eight-question assessment with its result-to-contact handoff. I also inspected the production HTML, CSS, JavaScript, image build process, routing and repository design instructions.

The desktop browser viewport was approximately 1,363 × 936 CSS pixels. Mobile recommendations are based on the responsive source and design assessment; this review did not independently execute a mobile browser matrix. I did not submit an external enquiry, run Lighthouse, measure Core Web Vitals, inspect analytics or conduct user research. Page heights below are DOM measurements at that desktop viewport, not performance measurements. The repository's older QA notes are historical claims, not independently repeated tests.

### What to retain

- The Pattern Grid name, nine-cell mark, navy/teal palette and strong typographic character.
- The five services and four industry groups, with plainer paths between problems and services.
- The existing interactive scene system. It contains more useful differentiation than the stock photography.
- Explicit labelling of illustrative work and sample data. Credibility improves when examples are honest and specific.
- The assessment's immediate, ungated results and its working local handoff into the contact message.
- Existing local WebP hero assets, mobile crops, image placeholders and responsive image support. These need refinement, not replacement with an entirely new system by default.
- Existing carousel pause controls and reduced-motion support. Accessibility work is already present, although some interactions need correction.

### Priority findings

| Priority | Finding and evidence | Why it matters | Recommended change |
|---|---|---|---|
| **P0** | The live contact page has no configured `data-form-endpoint`. `pages/contact.js` explicitly does not post an enquiry when this is empty. Its error directs visitors to an email address in the footer, but no email link was present in the inspected page. | The primary conversion journey cannot deliver an enquiry through the form as configured. | Connect an approved endpoint, validate server acknowledgements, preserve entered data on failure, and provide a verified alternative contact route. Do not invent an address or simulate success. |
| **P0** | Native links such as `href="/work"` omit the GitHub Pages project prefix. Normal clicks work through JavaScript, but opening `https://olufemiadetiwa.github.io/work` directly produced a GitHub Pages 404. | New-tab navigation, copied links and native browser behaviour fail even when ordinary clicking looks fine. | Generate correct base-aware `href` values everywhere, including navigation, footer, cards and breadcrumbs. Test native navigation independently from the SPA interceptor. |
| **P1** | The home hero leads with “See what matters.” over bridge/industrial/architectural imagery. Its fuller explanation and main content CTA arrive later. | The opening mood is stronger than the explanation of the business. | Put the category, specific proposition, supporting sentence and two useful actions in the first screen. Pair them with a readable decision example. |
| **P1** | The homepage measured about **10,492 px** tall; its signature interactive section began around **3,202 px**. The services overview measured about **9,069 px**. The BI worked example began around **4,516 px**. | Visitors must pass several screens of framing before seeing the strongest evidence. | Move a meaningful demonstration into the hero or next section. Consolidate repeated statements, deliverables and process explanations. Reduce height through editing and composition, not smaller body text. |
| **P1** | Work uses storage tanks and warehouse imagery; the founder hero uses architecture; the retail hero prominently features branded roadside billboards. | Images communicate other subjects before they communicate Pattern Grid's expertise. | Use actual example outputs for Work and BI, relevant business photography for industry context, and an approved founder portrait. Remove dominant third-party branding from crops. |
| **P1** | Desktop hero generation resizes originals to 1,920 px wide while retaining native aspect ratio, then lowers WebP quality to meet a size cap. Some portrait assets remain 2,560–3,413 px tall and reach quality 40. | Bytes and detail are spent on areas later cropped away, while visible areas risk unnecessary compression damage. | Crop for the actual display ratio and focal point before resizing and encoding; inspect the rendered result at desktop and phone sizes. |
| **P1** | The industry source scene claims that any figure opens to its definition, but the displayed result rows are plain non-interactive elements. Generic field mapping can visually map retail `sales` to `conversion`. | A data consultancy's demonstration must be semantically credible and deliver the interaction it promises. | Add genuine metric inspection, or change the promise. Use source-specific sample data, correct units and real formulas; conversion requires an appropriate numerator and denominator. |
| **P1** | Scene updates replace the complete scene host after a delay. In the BI interaction I inspected, focus was lost after the scene changed. | A visually working demo can still become difficult to use with a keyboard or assistive technology. | Preserve control nodes where possible, or restore focus after the actual render. Verify every tab, drawer and action in both motion modes. |
| **P1** | The About page exposes “Founder portrait to be supplied”; the content model has `photo: null`. | A production placeholder makes an otherwise polished company feel unfinished. | Use an approved real photograph, or intentionally design a text-led founder treatment without an empty reserved frame. |
| **P2** | Slideshow fades, photograph scaling, headline entry, scroll text effects, image reveals, route fades and demo transitions all contribute motion. | Individually restrained effects still compete when used together across the whole site. | Establish one signature demonstration and a small interaction motion system. Remove motion that does not explain a change or improve orientation. |
| **P2** | The contact form starts around **1,135 px** down the page. “Book a consultation” leads to an enquiry form rather than an actual booking calendar. | Extra scrolling and a mismatched expectation weaken conversion. | Use a compact contact layout; make “Discuss your project” or “Request a consultation” consistent with the actual workflow. |
| **P2** | Source for Insights describes every article as “in preparation”; there is no published article body in that page implementation. | A full editorial destination without readable articles adds little evidence of expertise. | Reduce its navigation prominence until substantive articles are approved; keep an honest compact state and links to useful examples. |
| **P2** | Route metadata is set by client-side JavaScript and the static project uses a 404 fallback for deep routes. | Initial HTML and HTTP responses can be less reliable for previews, crawlers and direct navigation. This is a structural risk, not a measured ranking loss. | Generate static HTML per public route with its metadata and meaningful content. Verify the actual hosting behaviour and preserve a real unknown-route 404. |

### The visual direction I recommend

**Precision, useful depth and human credibility.** Keep the confident brand, but make visual detail come from the work: a metric definition, a coherent data model, an exception that explains itself, a reviewer approving a proposed action, or a roadmap whose dependencies genuinely change.

A suitable homepage opening is a balanced split: concise messaging on the left and a large, crisp analytical scene on the right. The scene should be readable without opening a lightbox. It can sit on a light surface against a navy field, with restrained depth and a clearly labelled sample dataset. Photography should then add context and people where those are the point of the section.

Suggested opening copy, to refine against the existing content:

> **Turn complex data into clear business decisions.**  
> Pattern Grid helps organisations connect their data, build useful reporting and introduce practical AI and automation.  
> **Discuss your project** · **Explore a worked example**

“See what matters” can remain a brand line. It should not carry the entire burden of explaining the business.

### Image replacement and treatment plan

| Area | Current weakness | Recommended visual | Treatment |
|---|---|---|---|
| Homepage | Generic place and industrial mood dominates the proposition. | A polished, interactive executive performance scene. A relevant human photograph can support a later section. | HTML/SVG for the scene; stable dimensions; readable labels; one clear exception. |
| Services overview | Repetition of large imagery and full scenes makes comparison slow. | Five concise service previews with different output types. | A roadmap, source model, decision view, approval workflow and capability plan; same visual system, distinct content. |
| Data & AI Strategy | Strategy can look abstract or like another diagram. | An initiative roadmap with priorities, dependencies, owners and acceptance criteria. | A concrete, inspectable deliverable. Use short annotations instead of a long prose block. |
| Data Engineering | Warehouse/cable imagery does not demonstrate the engineering. | Source records, validation status, shared keys and a traceable output. | Real sample schemas; clear failed-record state; no unexplained animated connections. |
| Business Intelligence | Boardrooms and aerial imagery postpone proof. | The existing decision workspace, enlarged and brought forward. | Strong KPI hierarchy, trend, definition, breakdown and owned action. |
| AI & Automation | Industrial photography does not explain the automation. | Input → proposal → checks → human review → recorded outcome. | Show the missing-source scenario as well as the happy path. |
| Capability Building | Generic team photography alone cannot show the offer. | A realistic role-based learning and handover plan, supported by approved workshop photography. | Show evidence of capability, ownership and handover, not a decorative progress chart. |
| Financial Services & Fintech | Architecture is only indirect context. | A relevant operations/reconciliation setting plus a financial decision example. | No fabricated bank endorsement, client premises claim or confidential screen. |
| FMCG & Distribution | Warehouses fit this sector but are overused elsewhere. | A clearly relevant outlet, stock or distribution scene. | Credible local context, controlled colour, practical activity, minimal visible branding. |
| Retail & Ecommerce | Roadside billboards compete with the headline. | Merchandise, fulfilment or a merchant reviewing orders. | Desktop and mobile focal points; no dominant unrelated advertising. |
| Technology | Generic “technology” can become neon decoration. | Product review or an exact activation/retention example. | Ground it in product behaviour; avoid holograms and fictitious interfaces. |
| Work | Industrial stock images do not show the work being discussed. | Thumbnails of the actual illustrative deliverables. | Reuse the real scene state or render a faithful static preview; label illustrative work. |
| About / founder | Architecture and missing portrait placeholders weaken personal trust. | An approved founder portrait and concise, verified experience. | If no portrait is available, use an intentional text-led layout; never manufacture a substitute person. |
| Contact / assessment / legal | A cinematic introduction delays the task. | Mostly typography, helpful structure and small brand details. | No photographic carousel needed. |

Image quality should be judged at the rendered crop, not by file extension alone. A smaller, well-composed image is more valuable than a large stock asset darkened until all context disappears.

### Animation recommendation

The best signature interaction is already implicit in the business: **source records become an agreed measure; the measure reveals an exception; the exception becomes an owned action.** Make this one clear, optional, user-controlled sequence. Let visitors inspect a useful completed state immediately, then trace how it was formed.

| Interaction | Suggested timing | Behaviour |
|---|---|---|
| Button and control feedback | 120–180 ms | Colour/border/opacity; at most 2 px of movement where helpful. |
| Navigation panel | 180–240 ms | Small opacity and vertical transition; reliable focus handling. |
| Initial hero composition | 450–650 ms, once | A restrained reveal of secondary visual elements; headline and CTA remain immediately available. |
| Selected scene or metric | 180–240 ms | Show what changed without fading the whole interface into illegibility. |
| Evidence/action drawer | 240–320 ms | Short 8–16 px travel; preserve spatial relation to its trigger. |
| Data explanation | 450–650 ms per meaningful change | Highlight a source, reconcile a total or reveal a dependency. |
| Signature replay | Approximately 6–8 seconds total | Explicit Play/Replay, finite, pausable and immediately interruptible. |
| Photograph movement | Optional; at most 1.02× over 8–12 seconds | One pass on selected desktop imagery only; static on phones and reduced motion. |
| Route transition | 0–150 ms, if retained | Navigation should feel immediate; no forced cinematic delay. |

These are design starting points, not reasons to animate every element. Most sections should remain still. Reduced motion must show the same complete information with immediate state changes.

## Part B — Copy-ready Claude Code prompt

**Copy from START PROMPT through END PROMPT, or give Claude Code this document and ask it to execute Part B.**

---

### START PROMPT

You are the lead product designer, UX specialist and frontend engineer for Pattern Grid. Implement a substantial, cohesive modernization of this website in the existing repository. The outcome must be a working, visually reviewed site with stronger positioning, more credible images, useful demonstrations, purposeful animation and reliable user journeys.

Work through implementation and verification. Do not stop after a plan, a moodboard or a homepage-only reskin. Make routine design and implementation decisions autonomously. Preserve unrelated working-tree changes. Work in an isolated branch/worktree where appropriate. Do not publish, change production infrastructure or send real enquiries merely to test the redesign.

#### 1. Context and boundaries

- Live site: `https://olufemiadetiwa.github.io/patterngrid/`.
- Repository: `olufemiadetiwa/patterngrid`.
- Review reference commit: `8c24a559b070bd81eeab57161671637df06de052`. Recheck the current checkout; do not blindly overwrite newer work.
- The inspected production site is plain HTML/CSS/JavaScript under `public/`, using the `PG` namespace, shared page modules, a client-side router and reusable scenes. It is not a React application.
- The existing development command is `npm run dev`, which invokes `node tools/serve.js 8780`. Read current scripts before using them. Do not assume a build or test script exists.
- `design-source/` is reference material. Implement the production experience in the actual production files.
- Keep the current stack unless you identify a specific limitation that cannot be resolved simply. Do not introduce React, Next.js, Tailwind, shadcn, WebGL or a large animation stack merely to achieve a fashionable appearance.
- Pattern Grid offers Data & AI Strategy, Data Engineering & Platforms, Business Intelligence, AI & Automation, and Capability Building.
- The current founder is **Precious Chinenye Celestine**, professionally known as **Ada Africa**. Do not replace her identity with the repository owner's identity.
- Existing work examples are illustrative. Do not fabricate clients, testimonials, revenue improvements, certifications, team members or finished engagements.

#### 2. Read and use the relevant skills and tools

First inspect `AGENTS.md`, `CLAUDE.md`, package scripts and local instructions that actually exist. Read these observed repository skills, resolving symlinks rather than duplicating files:

- `.claude/skills/site-visual-language/SKILL.md`
- `.agents/skills/web-design-guidelines/SKILL.md`
- `.agents/skills/copywriting/SKILL.md`
- `docs/visuals/brief.md` and `docs/visuals/routes.md` for context, not as proof that current behaviour passes QA.

This brief intentionally evolves the older aesthetic. If prior visual guidelines require photography on every hero, near-square treatment everywhere, or excessive cinematic repetition, update that visual guidance to the new system. Preserve factual, accessibility and business constraints. Record the reasoning for material changes.

Use the following capabilities where available. Discover actual installed skills/MCP servers before referring to tool names. Do not claim a tool was used when it was unavailable. Follow current official setup instructions for any missing tool; continue with an equivalent local capability where possible.

| Capability | Recommended source | Job in this project |
|---|---|---|
| Intentional frontend visual design | Anthropic `frontend-design` skill: https://github.com/anthropics/skills/tree/main/skills/frontend-design | Develop and critique the visual system and page compositions. Apply it to the existing vanilla stack. |
| Browser-based application testing | Anthropic `webapp-testing` skill: https://github.com/anthropics/skills/tree/main/skills/webapp-testing | Verify real journeys, rendered states and screenshots. |
| Browser automation | Microsoft Playwright MCP: https://github.com/microsoft/playwright-mcp | Inspect pages, operate interactions, exercise responsive viewports, and capture visual regressions. Playwright CLI plus skills is an acceptable alternative; choose one automation workflow. |
| Performance diagnosis | Chrome DevTools MCP: https://github.com/ChromeDevTools/chrome-devtools-mcp | Inspect traces, requests, layout shifts, console errors and expensive animations. Use it for evidence, not decorative tool usage. |
| Current dependency documentation | Context7: https://github.com/upstash/context7 | Consult version-correct documentation only for libraries actually used. For native browser code, authoritative platform documentation may be enough. |
| Optional coordinated animation | Official GSAP skills: https://github.com/greensock/gsap-skills | If native CSS/WAAPI cannot cleanly express the signature sequence, load only relevant GSAP core, timeline, performance and, if justified, ScrollTrigger guidance. GSAP is a library, not an MCP server. |
| Optional design-file reference | Official Figma MCP: https://developers.figma.com/docs/figma-mcp-server/ | Use only when an actual reference file is supplied or creating a Figma deliverable is explicitly requested. A Figma detour is not required to finish this code task. |
| Optional conceptual imagery | An available image-generation capability or licensed photography source | Produce or source supporting imagery. Do not invent an “ImageGen MCP” tool name. Keep data graphics, diagrams and UI exact in code. |

Use local Git for repository work; a GitHub MCP is optional when its repository operations add value. More installed tools do not equal a better design. Do not add overlapping dependencies without a concrete benefit.

#### 3. Establish an evidence-based baseline

Run the current app and inspect every public route from the actual route table. Capture the homepage, BI page, Work, About/founder, contact and assessment at desktop and phone sizes before changing them. Inspect both full-page composition and readable viewport crops.

Record findings with route, reproduction steps, expected result, actual result and severity. Separate observed defects from design judgments and untested risks. Inspect network and console output in the site context; browser extension errors are not automatically site errors.

Pay particular attention to these review findings, verifying each against the current code:

1. Missing contact endpoint and a fallback message referring to a nonexistent footer email.
2. Root-relative native links missing `/patterngrid/`, despite ordinary SPA clicks working.
3. Overlong home/services pages and useful examples placed several screens down.
4. Generic or inappropriate imagery, visible third-party billboards, and missing founder portrait placeholders.
5. Desktop portrait originals compressed aggressively before being cropped by the browser.
6. Full scene replacement losing focus after a delayed render.
7. Industry metric-inspection promises without working metric controls, plus generic mappings that imply incorrect data semantics.
8. Insights listing unpublished articles as a full destination.
9. Initial route HTML, metadata and status codes depending on the SPA fallback.

The prior review measured approximately 10,492 px for home and 9,069 px for services at a 1,363 × 936 desktop viewport. Treat these as a baseline reference, not universal dimensions or a speed score.

#### 4. Fix functional foundations first

**Contact:** Wire the form to an existing approved delivery service or backend if one is configured. GitHub Pages cannot run a secret-bearing server handler: use an appropriate approved external endpoint or separately hosted server function. Never place private API keys in frontend assets. Validate on the server as well as in the browser; handle pending, confirmed success, validation failure, network failure and retry. Prevent duplicate submissions. Keep entered details on failure and make errors accessible.

If the repository contains no approved destination or contact address, complete the integration boundary and tests with a local mock, clearly document the exact production configuration still required, and remove misleading fallback instructions. Do not display a working-looking submission path that silently discards real enquiries. Use a verified contact alternative if available; otherwise show an honest unavailable state. Do not invent an email address, response SLA or booking link. Continue all other work while this external input remains unresolved.

**Navigation:** Use one base-aware URL helper for all real `href` values and assets. Native links must work before JavaScript interception. Correct the header, logo, footer, cards, breadcrumbs, service queries and deep anchors. Preserve query strings and hashes. Avoid double-prefixing already normalized paths. Respect modified clicks, middle-click, external destinations and same-page anchors. Test both project-path and root hosting modes if both are supported.

**Static routes:** Generate meaningful static HTML and metadata per valid public route using a small build step compatible with the existing stack. Ensure nested asset URLs resolve. The hosting output should serve real route files successfully, with unknown URLs still returning a proper 404. Do not merely emit empty application shells with identical metadata. Avoid a framework migration just to achieve this.

**Demonstration integrity:** Every visible interaction must perform its stated function. Correct metric definitions, source mappings and arithmetic. Keep controls focused through rendering. Maintain an immediately usable result when motion is reduced or a visual asset fails.

#### 5. Define the design system

Use the direction **precision, useful depth and human credibility**. The aesthetic should feel premium and contemporary while retaining Pattern Grid's identity. Strong product storytelling, consulting clarity and accurate analytical detail should drive the design.

Use the current Geist family unless actual rendering evidence justifies changing it. Improve its scale, weight, line length and hierarchy. Do not add a font purely because it is popular.

Starting tokens, to refine in rendered layouts:

| Token group | Starting specification |
|---|---|
| Brand | Ink `#07131C`, navy `#02203D`, teal `#17647D`, accent `#38A0C3`. |
| Surfaces | White, cool neutral around `#F6F8F9`, limited warm neutral around `#F5F5F1`; use colour to separate meaningful layers. |
| Content width | Approximately 1,280–1,360 px; deliberate narrower reading columns. |
| Spacing | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px, with responsive interpolation. |
| Desktop type | H1 roughly 80–104 px where content fits; H2 40–56 px; body 17–20 px with comfortable line height. |
| Phone type | H1 roughly 44–60 px subject to line breaks; H2 30–36 px; body 16–18 px. Inputs at least 16 px. |
| Data labels | Usually 12–14 px or larger; never shrink an entire desktop dashboard to fit a phone. |
| Shape | Controls around 6–8 px radius, cards around 12 px, large demonstration surfaces around 16 px. Choose by role. |
| Depth | Restrained border/shadow contrast on a few important surfaces; avoid equal shadows on every box. |
| Interaction | Highly visible focus rings, clear active states and generous pointer targets. Aim for 44 × 44 px controls where practical. |

Validate contrast rather than assuming the palette combinations pass. Use icons consistently and only where they improve recognition. Avoid all-caps labels above every heading, decorative numbering of unrelated items, box-within-box repetition, stock gradient blobs, tiny decorative metadata and fake enterprise statistics.

Build shared primitives for page introduction, section heading, CTA, service preview, image frame, scene shell, tabs, metric detail, action drawer, status and form fields. Remove superseded conflicting CSS instead of accumulating another override layer at the end of the stylesheet.

#### 6. Rebuild the homepage composition

Create approximately seven purposeful sections, combining sections when the narrative benefits:

1. **Immediate proposition and proof.** A category description, clear H1, 20–30-word supporting sentence, primary “Discuss your project” CTA and secondary “Explore a worked example” action. Place a large, readable decision workspace beside the copy on desktop and below it on mobile. The category and CTA must not depend on a slideshow or a later section.
2. **Choose the problem.** Five compact service entry points framed around the visitor's need. Make the comparison easy without requiring hover. A preview may respond to focus/selection, but mobile and keyboard users need equivalent access.
3. **See the decision path.** One signature interactive example connecting evidence to action. Avoid repeating the same full demo already shown in the hero; the opening can be a focused summary that expands into this deeper view.
4. **Industry relevance.** Four genuinely distinct industry entry points with a concrete question and relevant visual detail.
5. **Work and examples.** Two or three useful deliverable previews with clear illustrative labels and descriptive links.
6. **People and credibility.** Concise founder introduction, approved portrait if supplied, verified experience and practical approach.
7. **A clear next step.** A brief enquiry invitation with a secondary assessment path where useful.

Remove the separate oversized statement immediately after the hero if it only repeats the proposition. Remove repeated explanations of the same business benefit. Aim to shorten the existing desktop page substantially through consolidation, while retaining useful depth behind relevant links or disclosures. Do not impose a pixel cap by shrinking text or making touch interactions cramped.

Suggested opening copy to refine:

“Turn complex data into clear business decisions.”

“Pattern Grid helps organisations connect their data, build useful reporting and introduce practical AI and automation.”

Preserve “See what matters” as a brand line if it helps, but always explain the actual offering beside it.

#### 7. Apply distinct page templates across the site

**Services overview:** Replace the long procession of full-size service scenes with a concise problem chooser and five clear comparisons: outcome, ideal problem, three representative deliverables and an output preview. Include one featured interactive example. The page should help people choose a service, not require them to read five complete service pages.

**Service details:** Lead with the outcome and a useful visual. Bring the worked example into the first one or two screens. Follow with who it helps, three to six tangible deliverables, a compact delivery approach, relevant technologies explained by job, focused questions and a service-prefilled CTA. Keep detailed flow diagrams available through accessible disclosure. Replace repeated generic paragraphs with service-specific evidence.

Differentiate the five service visuals: a dependency-aware roadmap for Strategy; a validated source model for Engineering; a decision view for BI; a controlled review workflow for AI & Automation; and a role/evidence/handover view for Capability Building.

**Industries:** Show a sector-specific decision, metrics with definitions, representative source systems and an example whose data makes sense for that sector. Keep sell-in and sell-out distinct in FMCG. Define the activity window for active customers. Calculate retail conversion from an appropriate count of completed orders and eligible sessions over the same period. Do not relabel `sales` as `conversion`. Use recurring-revenue metrics only for a recurring-revenue business model.

**Work index and detail:** Use previews of the actual deliverables instead of warehouse or office stock thumbnails. A detail page should explain the question, sample inputs, interactive artifact, approach, useful output, limitations and next step. Label illustrative examples once prominently and retain necessary context; avoid a wall of repeated disclaimers. Do not imply these are verified client case studies. “Work & demos” is an acceptable navigation label while preserving `/work` URLs.

**About and founder:** Bring the real founder and verified expertise close to the top. Use an approved portrait if one exists. If not, produce a polished text-led composition with no “to be supplied” frame. Do not generate a likeness or substitute a stock person. Keep personal prior experience clearly distinct from company client work.

**Approach:** Present a compact progression from business question to data foundation, useful view, owned workflow and handover. Each stage needs an output, an owner/reviewer where relevant and a clear relationship to the next stage. Avoid repeating all five service pages here.

**Insights:** Until actual articles are approved, provide an honest compact state and useful related examples. Remove empty article promises from the primary navigation if they add no value. Do not manufacture publication dates, author credentials or finished articles.

**Contact:** Use a compact utility layout with the form visible in the first desktop screen and beginning promptly on mobile. Four required inputs: name, email, organisation and what the visitor wants to improve. Put additional context behind a clearly labelled optional disclosure. Preserve service preselection and assessment inclusion/removal. “Request a consultation” must match an enquiry flow; use “Book” only if actual booking exists.

**Assessment:** Preserve all eight questions, meaningful progress, back/change-answer controls, ungated results, local privacy behaviour and printability. Group repeated service recommendations without discarding the underlying issues. Explain that the result is indicative and self-reported; do not imply certification. Show what the user receives before starting. Carry the result into contact clearly and allow its removal. Test storage-unavailable and resumed-session behaviour.

**Privacy, terms and 404:** Prioritize reading, orientation and recovery. No full-screen slideshow. A 404 must offer working paths to home, services and contact without pretending the missing page exists.

#### 8. Replace and optimize imagery deliberately

Audit `content.js`, `local-images.js`, `hero.js`, shared image helpers and `tools/build-hero-frames.js`. Inventory local and remote imagery, dimensions, actual displayed ratios, focal points, loading behaviour, reuse and licensing. The current first hero frames already have local WebP/mobile variants and placeholders; extend the useful parts of that implementation.

Implement these changes:

1. **Make images relevant.** Remove the retail roadside advertising image, industrial stock imagery from Work, architecture as a stand-in for the founder, and repeated warehouse imagery from unrelated services. Select each replacement because it supports the adjacent message.
2. **Use exact UI for exact information.** Build dashboard surfaces, charts, source models, roadmaps and workflows in HTML/SVG/CSS. Do not generate their labels and numbers into a bitmap. Use the actual scene as the source of any static preview.
3. **Use a small coherent photographic set.** Prefer roughly six to ten carefully chosen supporting assets over a different carousel on every route. Keep local/African business context credible where relevant, without treating one stock setting as evidence of an actual client or Pattern Grid team.
4. **Crop before compression.** Create the desktop crop for its intended frame, then resize and encode. Do not compress a tall portrait original down to low quality merely to hide most of it with `object-fit: cover`.
5. **Art-direct mobile separately.** Record desktop and mobile focal points; use an alternate crop where necessary. Preserve faces, tools and the activity that makes the image meaningful. Keep text out of busy areas.
6. **Generate appropriate variants.** Use a practical selection around 480, 768, 1,200, 1,600 and 1,920 px according to the actual slot. Supply AVIF/WebP where the build tools support them, with a usable fallback. Do not generate every width for every tiny image.
7. **Load by need.** Only the actual initial LCP image should be eager/high priority where appropriate. Reserve dimensions. Lazy-load lower content. If any carousel remains, defer its next asset until it is likely to be needed; do not fetch all hidden slides immediately after the first frame.
8. **Respect constrained conditions.** Where supported, use data-saver/connection signals to avoid optional downloads. Static and reduced-motion views do not need offscreen carousel frames. Keep a robust default when connection APIs are absent.
9. **Handle errors visibly and gracefully.** An image failure must not remain an indefinite blurred placeholder or be marked as a successful load. Use an intentional neutral surface with useful surrounding content. Do not make an unavailable decorative image block the page.
10. **Use truthful alternatives and credits.** Decorative images receive empty alt text. Informative photos receive concise descriptions. Preserve licence obligations and approved attribution. Stock or generated scenes must not be described as actual staff, premises or client engagements.

Create an asset manifest containing route/section, file, role, source or generation provenance, creator/licence where applicable, approval status, alt text/decorative flag, desktop/mobile crop, focal point, dimensions and encoded size. Store it beside maintainable asset-generation instructions. Remove unused assets only after checking references.

Use these art-direction briefs where new photography or conceptual generation is needed. They are supporting image directions, not instructions to fabricate documentary evidence:

- **Decision workshop:** Editorial photograph of professionals reviewing a business question in a believable contemporary African office; natural daylight, restrained navy/neutral palette, candid attention to the task, natural skin detail, clean composition and no dominant logos. Desktop landscape framing with space for adjacent copy; a separate mobile crop retaining the people and task. No handshakes, holograms, exaggerated smiles, random floating charts or illegible screen text. If generated, treat it as an illustrative scene, not Pattern Grid staff.
- **Distribution:** A credible inventory or route-to-market activity in an orderly distribution setting, with an operator checking stock using a handheld device. Clear products and practical context, controlled light, minimal visible brand packaging, realistic proportions. Frame around the activity rather than anonymous racks. Use only on relevant sector material.
- **Retail:** A merchant or fulfilment specialist reviewing orders beside actual merchandise in a contemporary retail environment. Natural light, restrained colour, human-scale detail, no prominent third-party billboards or brand signs. Leave a clear focal area that survives a portrait crop. Keep analytical UI as a separate coded element.
- **Founder:** Use the approved photograph of Precious Chinenye Celestine. Preserve identity, natural skin and expression; crop and grade consistently with the site. If no approved photo is available, use the text-led fallback. Do not generate a person for this role.
- **Brand detail:** If a subtle abstract texture is useful, derive it from the nine-cell mark and controlled light/shadow. Prefer a lightweight SVG/CSS treatment where exact geometry matters. It must remain secondary to readable content.

Visually compare original and optimized crops at actual display sizes. Byte budgets are guardrails: target roughly 180–250 KiB for a desktop photographic hero and 80–150 KiB for its phone crop where visual quality allows. Change crop or resolution before forcing visibly poor compression. Document justified exceptions.

#### 9. Make the demonstrations feel like real working outputs

Evolve `public/assets/js/scenes.js` rather than replacing every demonstration with static illustrations. Remove heavy surrounding bezels and unnecessary nested panels that make the content feel like a diagram printed inside another diagram.

Each scene needs a clear primary question, a small number of readable values, one visual focus and an obvious next interaction. Surface hierarchy should distinguish context, result, evidence and action. Use whitespace and typography as well as borders. Make the useful result visible before exposing implementation plumbing.

Create a shared, deterministic sample data model and derive displayed results from it. For the existing commercial example, preserve coherent relationships such as:

- Gross sales 10.0m less returns 0.4m equals net sales 9.6m.
- Net sales 9.6m against plan 10.0m gives a −0.4m / −4% variance.
- Product contributions of −0.1m and −0.3m, with the other contributions zero, sum to the same variance.
- Currency/unit, reporting period, population and definition must be explicit and consistent. Do not silently introduce a currency absent from the approved data.

The BI scene should support this journey: inspect performance → trace the measure → inspect a contributing driver → prepare/assign an illustrative action. Clearly distinguish a local demo action from a real operational assignment. Show the owner, proposed follow-up and evidence link.

Industry scenes need their own meaningful schemas and calculations. Selecting a source should reveal how that source contributes; it must not pretend to recompute an unchanged figure. A metric advertised as inspectable must open its definition, period, unit, source and owner with an actual accessible control.

For AI & Automation, make the distinction between deterministic checks, proposed AI commentary and human approval unmistakable. A missing-source example must prevent the approved-output state. For Strategy, completing a dependency should unlock only the initiatives it actually enables. For Capability Building, connect progress to specific evidence, not invented competence scores.

Keep a concise “Illustrative demo” and “Sample data” treatment. Remove unnecessary implementation language such as “local interactions only” from prominent product copy when clearer language can communicate the same limitation. Never imply a live data connection or actual submitted action.

Preserve stable layout during state changes. Use buttons for actions and links for navigation. If using tabs, implement their roles, labels, panel associations and keyboard model correctly. Restore focus after the render completes, not before a scheduled DOM replacement. Prefer updating the scene body while preserving the control bar. Support Escape and focus return for overlays; a non-modal inline details panel should not trap focus.

#### 10. Implement a restrained motion system

Use native CSS transitions and the Web Animations API by default. Add GSAP only if one coordinated sequence genuinely benefits from its timeline controls. If GSAP is used, follow its official documentation, use responsive/reduced-motion contexts, and revert/kill work during route teardown. Do not add a React-only motion library to this vanilla site.

Create shared duration, easing and distance tokens. Suggested starting points:

| Motion | Duration and travel | Purpose |
|---|---|---|
| Control feedback | 120–180 ms; 0–2 px | Confirm hover, focus, press and selected state. |
| Navigation panel | 180–240 ms; about 6 px | Explain opening and closing without delaying use. |
| Hero visual entrance | 450–650 ms; up to 12 px, once | Introduce a secondary composition. Do not hide the main message or CTA pending animation. |
| Scene selection | 180–240 ms | Highlight the changed evidence or state; avoid dimming the entire UI. |
| Drawer | 240–320 ms; 8–16 px | Preserve a clear connection to the triggering metric. |
| Data transition | 450–650 ms | Show a real change in the sample data or dependency. |
| Optional route fade | 0–150 ms | Keep orientation while navigation remains immediate. |

Build one signature sequence: **source records → aligned measures → an exception → an owned action**. Display a useful complete view first. Offer four inspectable steps and an optional finite 6–8-second Replay. Clicking a step, interacting with the scene, or pausing must immediately take control. Scroll observers must not override a user's manual selection. Keep focus stable during Replay.

If using a short sticky narrative on desktop, keep reading order natural and the scroll distance modest. On mobile, stack the content or use clear tabs; do not pin a tall scene or hijack scrolling. The same information must be available without scroll-driven effects.

Remove perpetual background animation, carousel ubiquity, dramatic per-word scroll colouring and unnecessary clip reveals. Most sections should appear normally. If selected imagery retains slow movement, limit it to roughly 1.02× over 8–12 seconds for one pass on desktop; disable it on phones, reduced motion and constrained conditions. Preserve pause/manual navigation if any autoplay slideshow survives. Pause optional motion when the tab or scene is not visible.

Respect `prefers-reduced-motion` at load and on live changes. Define how the existing user preference interacts with system preference, and offer a clear way to return to the system setting. Reduced motion means immediate complete states, no animated scroll and no information withheld behind an animation.

Animate transform/opacity where appropriate. Avoid repeated layout reads and writes, unbounded timers, permanently applied `will-change`, and expensive large blur/filter effects. Clean up observers, listeners, animation frames and timeouts on every route change. Do not add a custom cursor, magnetic buttons, a cinematic loading screen, blanket card tilt or decorative particle fields.

#### 11. Responsive and accessible behaviour

Test at 320, 360, 390/393, 430, 768, 1,024, 1,440 and 1,920 px widths. Use representative heights and both orientations where layout changes. Fully exercise key journeys on phone and desktop; sweep all routes for overflow and broken layout.

- The phone opening must identify the offer and expose a useful action without a mandatory full-screen photographic detour. Use content-driven hero height; do not blindly retain a 640 px minimum on every device.
- Recompose complex scenes. Use focused metrics, stacked evidence and accessible disclosure rather than scaling down desktop text.
- Allow horizontal scrolling only within deliberately labelled data/table regions when required. Never let the whole page overflow.
- Keep body copy readable, inputs at least 16 px, and labels sufficiently large. Aim for generous 44 px controls; distinguish this design target from WCAG 2.2 AA's 24 px minimum target criterion and its exceptions.
- Test text contrast, meaningful UI contrast, visible focus and state indicators that do not rely on colour alone.
- Verify keyboard navigation, menu opening/closing, Escape, outside interaction and focus return. Use modal semantics and focus containment only for true modals.
- Ensure sticky navigation does not cover focused controls, anchored headings or error messages. Use responsive `scroll-margin` and account for header plus section navigation height.
- Preserve skip navigation, landmarks, logical headings, labels, error associations, appropriate live regions and reduced-motion behaviour.
- Test 200% zoom and a screen-reader smoke journey through the navigation, one demo, assessment and contact. Automated accessibility checks support this work; they do not establish full conformance by themselves.
- Preserve assessment print output and sensible reading order without visual effects.

#### 12. Performance, discoverability and resilience

Measure before and after under the same documented conditions. Collect a cold-load mobile profile for home and BI, with multiple runs where useful to reduce noise. Record browser/tool version, viewport, network/CPU settings, build and timestamp. Inspect the actual LCP element and request priority, image transfer sizes, font loading, long tasks and layout shifts.

Use Core Web Vitals targets as goals: LCP at or below 2.5 seconds, INP at or below 200 ms, and CLS at or below 0.1 at the 75th percentile of real visits. Do not report a Lighthouse score, a lab interaction or Total Blocking Time as proof of field INP. If field data is unavailable, say so and report the lab evidence separately.

Keep the lightweight architecture. Avoid adding libraries for effects that need a few lines of CSS. Load only necessary font weights and subsets, use a compatible fallback, and avoid a flash that shifts large headings. Consider deferring page-specific code only after measurement establishes value. Do not turn the site into a complex application platform to optimize a marketing page.

Check page-specific title, description, canonical URL, Open Graph image/title and structured data in initial HTML. Use absolute canonical/social URLs with the correct project base. Generate the sitemap from the real route list and exclude invalid or unpublished article URLs. Keep factual structured data within what the business can substantiate.

Verify direct links, reloads and unknown routes on the actual generated static output, not only a permissive development server. Check image failure, slow loading, missing optional storage and unavailable optional animation APIs. Core content and real links should remain meaningful when enhancement scripts fail.

#### 13. Implementation order and working files

Work in this sequence:

1. Baseline the current repository, routes, screenshots and defects.
2. Fix contact configuration behaviour, native links, critical demo semantics and focus handling.
3. Establish tokens and shared primitives; rebuild home and BI as the reference compositions.
4. Apply the system to every remaining route, with distinct utility and editorial templates.
5. Replace/optimize assets and implement the focused motion system.
6. Generate reliable static routes and metadata; verify the final production output.
7. Complete responsive, interaction, accessibility, performance and visual review; resolve failures before handoff.

Likely files to inspect and change, subject to the current checkout:

- `public/assets/css/site.css`: tokens, typography, layout, components and responsive behaviour.
- `public/assets/js/core.js`: URL helpers, image states, focus, shared motion and helpers.
- `public/assets/js/app.js`: navigation lifecycle, teardown and route transitions.
- `public/assets/js/shell.js`: header, menus, footer and primary CTAs.
- `public/assets/js/hero.js`: hero composition, asset priorities and any retained carousel.
- `public/assets/js/scenes.js`: meaningful, accessible demonstration interactions.
- `public/assets/js/content.js` and `service-content.js`: accurate content and page-specific composition data.
- `public/assets/js/local-images.js` and image assets: generated variants and provenance.
- `public/assets/js/pages/*.js`: home, services, industries, work, about, contact, assessment, insights, legal and not-found templates.
- `public/index.html`, `public/404.html`, `public/assets/js/seo.js`, sitemap and actual deployment workflow: static output and metadata.
- `tools/build-hero-frames.js`: crop/resize/encode pipeline; add a small static generation step if needed.
- Existing visual skill and `docs/visuals/`: update the design rules and route record to reflect implemented reality.

Refactor shared patterns rather than copying five nearly identical page implementations. Keep content escaping and safe DOM construction intact. Do not bypass repository rules, disable checks or remove functionality to make a screenshot appear cleaner.

#### 14. Acceptance checks

Create a concise route/status matrix and meaningful regression tests for the risks this work changes. Do not treat screenshots alone as proof of functional completion.

| Area | Required evidence |
|---|---|
| Routes and native navigation | Home; services plus all five details; industries plus all four details; Work plus all three examples; Insights; About; founder; Approach; assessment; contact; privacy; terms; unknown route. Validate direct load, reload, modified/new-tab links and back/forward. |
| URL state | Service-prefilled contact and deep section anchors preserve query/hash and scroll to the correct visible location. |
| Contact | Required validation, invalid email, pending state, confirmed mocked success, server error, network error, duplicate-click handling, preserved data and verified alternative contact. Separate locally passing tests from production endpoint readiness. |
| Assessment | Complete all eight questions, go back and revise, inspect lowest/highest and mixed results, check boundaries, print, transfer summary into contact, remove it, and handle unavailable storage. |
| Service scenes | Every advertised interaction works; meaningful state updates; sample calculations reconcile; missing-source approval is blocked; keyboard focus survives every render. |
| Industry scenes | Correct units/formulas/source mappings; real definition inspection or accurately limited copy. |
| Images | No broken images or indefinite blur; correct desktop/phone crops; no oversized offscreen asset waterfall; no dominant unrelated branding; accurate alt/provenance. |
| Motion | Full and reduced-motion modes; live preference changes; pause/manual takeover; no ongoing animations or leaked listeners after route exit. |
| Responsive | No whole-page horizontal overflow at the required widths; readable demos; no covered controls; sensible sticky elements and long-form reading. |
| Accessibility | Automated checks plus manual keyboard, zoom and screen-reader smoke evidence. Report remaining issues specifically. |
| Performance | Reproducible before/after lab results and traces; field data only when actually available. Explain any regression. |
| Content and trust | No invented client results, credentials or team members; no production placeholder portraits; no false booking or article promises. |
| Visual craft | Personally inspect screenshot crops and full pages after implementation; correct weak hierarchy, excessive whitespace, awkward line breaks, mismatched imagery and tiny labels. |

Do not claim every route is verified if you only checked the homepage. Do not equate the repository's historical checkmarks with the tests you performed. Use clear pass/fail/blocked statuses and include actual results.

#### 15. Deliver a reviewable result

Provide the working code and a concise handoff containing:

- The implemented visual direction and the important behavioural changes.
- Before/after screenshots for the principal pages at desktop and phone sizes, plus representative scene states.
- A route verification matrix and actual interaction/accessibility/performance results.
- The image manifest, reproducible asset build instructions, and any remaining approved-photo requirements.
- Motion tokens, behaviour rules and reduced-motion implementation notes.
- The contact integration configuration requirements and production readiness status, without exposing secrets.
- Clear remaining blockers, if any, such as an approved enquiry destination or real founder portrait. Complete everything else and provide a polished fallback for missing imagery.
- The commands needed to run, test and build the final site, derived from the scripts that actually exist after your changes.

The final result should make Pattern Grid immediately understandable, show useful evidence early, feel modern through composition and interaction, and make the next step dependable. Finish by reviewing the rendered work critically and fixing the remaining rough edges.

### END PROMPT

---

## Part C — Evidence and primary references

### Site and source evidence

The review combines live desktop observations with the source snapshot linked below. Source inspection establishes implementation behaviour; it is not a substitute for testing the final production build after changes.

- [Live Pattern Grid site](https://olufemiadetiwa.github.io/patterngrid/)
- [Reviewed repository snapshot](https://github.com/olufemiadetiwa/patterngrid/tree/8c24a559b070bd81eeab57161671637df06de052)
- [Contact form implementation](https://github.com/olufemiadetiwa/patterngrid/blob/8c24a559b070bd81eeab57161671637df06de052/public/assets/js/pages/contact.js)
- [Core helpers and routing](https://github.com/olufemiadetiwa/patterngrid/blob/8c24a559b070bd81eeab57161671637df06de052/public/assets/js/core.js)
- [Interactive scene implementation](https://github.com/olufemiadetiwa/patterngrid/blob/8c24a559b070bd81eeab57161671637df06de052/public/assets/js/scenes.js)
- [Hero image build process](https://github.com/olufemiadetiwa/patterngrid/blob/8c24a559b070bd81eeab57161671637df06de052/tools/build-hero-frames.js)
- [Content and image assignments](https://github.com/olufemiadetiwa/patterngrid/blob/8c24a559b070bd81eeab57161671637df06de052/public/assets/js/content.js)
- [Insights implementation](https://github.com/olufemiadetiwa/patterngrid/blob/8c24a559b070bd81eeab57161671637df06de052/public/assets/js/pages/insights.js)

### Recommended skills, MCPs and standards

These sources were checked for this brief. Installation methods and supported clients can change; use the official instructions current at implementation time. The list is a recommended toolkit, not a claim that these tools are already installed in the user's Claude Code environment.

- [Anthropic frontend-design skill](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
- [Anthropic webapp-testing skill](https://github.com/anthropics/skills/tree/main/skills/webapp-testing)
- [Microsoft Playwright MCP and CLI comparison](https://github.com/microsoft/playwright-mcp)
- [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Context7](https://github.com/upstash/context7)
- [Official GSAP skills](https://github.com/greensock/gsap-skills)
- [GSAP responsive and reduced-motion contexts](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)
- [Official Figma MCP documentation](https://developers.figma.com/docs/figma-mcp-server/)
- [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines)
- [Core Web Vitals definitions and thresholds](https://web.dev/articles/vitals)
- [WCAG 2.2: target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

All design judgments, prioritization, proposed layouts and motion timings in this document are recommendations. Measured performance, conversion improvement and accessibility conformance must be demonstrated after implementation; none is asserted by this review.

