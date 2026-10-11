# Claude visual upgrade brief

Prepared from the four supplied website screenshots · 11 October 2026

## The design direction

Build a premium data and intelligence services website whose visuals make the work tangible. Show credible dashboards, source records, shared metric definitions, delivery timelines and accountable actions. Give the scenes deliberate composition, layered surfaces and purposeful interaction.

The current screenshots have strong headlines and a restrained palette. The illustrations feel like document diagrams because they rely on thin rectangles, extensive labels, evenly weighted nodes, arrows, repeated dot grids and explanatory side panels. Preserve the business meaning while changing how visitors experience it.

This review is based on screenshots. Runtime behaviour, mobile layouts, implementation stack and the complete route inventory have not been inspected. The coding agent should establish those facts in the repository before making changes.

## Changes to the supplied sections

| Existing section | Proposed visual | Meaningful interaction |
|---|---|---|
| Worked example: dashboards, source integration or an AI reporting assistant | A delivery workspace with an aligned timeline, initiative rows, owners, dependencies and readable status labels | Completing source integration changes downstream readiness. Agreed metric definitions remain an explicit prerequisite. |
| How a business question becomes a delivery priority | A short scenario that follows one initiative from business question through readiness assessment into the roadmap | Selecting an initiative reveals its evidence and prerequisites. A foundation gap visibly changes the suggested sequence. |
| From a trusted measure to an accountable action | A believable reporting workspace with a metric, its source breakdown and a linked action drawer | Trace the figure to records, inspect the agreed calculation, then assign a follow-up action with an owner. |
| How the sources connect into one view | Source-system tiles containing actual-looking record previews, a shared definition and a resulting business view | Selecting a source highlights the fields and measure it contributes. Show provenance and a concrete resulting figure. |

Reduce duplicated explanations around the visuals. Keep a short outcome statement visible; reveal supporting detail through selection, expansion or a focused panel. Preserve a usable static reading path.

## Recommended toolkit

These are recommendations for the user's Claude environment, not a claim that they have been installed there. Claude Code is assumed for repository work; another Claude interface may expose a different setup.

| Tool | Category | Recommended role |
|---|---|---|
| Anthropic Frontend Design | Claude plugin / skill | Lead art direction, hierarchy, composition, typography and crafted frontend implementation. |
| A project-specific visual-language skill | Custom Claude skill to create in the repository | Preserve the approved palette, spacing, surface depth, motion rules, scene families and review process across pages. |
| shadcn/ui skill and MCP server, when compatible with the existing stack | Component guidance and registry access | Obtain dependable controls, tabs, drawers, tables and forms, then theme them to the site's visual language. It is a component foundation, not an automatic art director. |
| Motion for React, if the site uses React | Animation library | Animate changes of selection, layout and state. Provide reduced-motion behaviour. Use native CSS or the stack's existing equivalent where sufficient. |
| Anthropic webapp-testing with Playwright | Testing skill and browser automation | Run the pages, exercise key interactions, capture screenshots and inspect responsive behaviour. Playwright MCP is an alternative connection; both routes are not required. |
| Figma's official Claude plugin / MCP | Optional design connection | Bring in an actual reference design, components and variables. Useful when a design system or designer is involved. |
| Rive | Optional interactive animation runtime | Use for a reusable, art-directed explainer if ordinary frontend animation cannot achieve the intended scene. |
| Dedicated image generation or licensed photography | Asset production | Create or source hero and industry imagery with a consistent lighting, colour and crop brief. Import the finished assets into the website. |

Start with Frontend Design, one project visual-language skill, appropriate existing components, a small motion layer and browser verification. Add Figma or Rive only when they solve a specific remaining need.

## Photography and imagery

Use different media for different jobs:

- **Heroes and industry sections:** authentic, carefully cropped photography or bespoke conceptual imagery. Match the audience and location where relevant. Use a common colour grade, lighting direction and focal-point treatment.
- **Services and capability explanations:** rendered frontend scenes with readable text, plausible sample records and coherent state changes.
- **Detailed architecture:** precise, code-rendered diagrams when the relationships themselves matter. Keep them available as deeper explanation.

An image brief should name the subject, environment, camera perspective, lighting, palette, focal position, desktop/mobile crop and placement of surrounding text. Generate or source several assets as one art-directed set. Use generated imagery for conceptual scenes; represent the actual team and clients with verified photography.

Keep charts, labels, controls, diagrams and exact numbers editable in the frontend. Avoid baking them into generated images. Mark sample datasets and conceptual demonstrations visibly. Do not imply a live deployment or actual customer outcome.

## Copy-ready implementation prompt

You are the senior creative frontend engineer and art director for this existing data and intelligence services website. Improve the visuals and experience across all its pages.

The current site is structurally improving, but its visual explanations feel like paper diagrams: thin outlined rectangles, arrows, dense labels, repeated grids and static-looking panels. Build a coherent, premium visual system that makes our work feel tangible, credible and modern.

### 1. Establish the current state

Inspect the repository, project instructions, framework, routes, assets, components and animation libraries. Run the current site and capture representative desktop and mobile views. Inventory every route and significant visual section. Tell me which relevant Claude skills, plugins and MCP connections are actually available. Use the Frontend Design skill if installed. Use existing libraries wherever they fit; do not migrate the framework for this work.

### 2. Define and implement one visual language

Use calm, premium enterprise art direction: precise typography, confident spacing, clear hierarchy, restrained navy/ink and neutral surfaces, and a selective cyan accent where appropriate to the existing brand. Create depth with lighting, contrast, surface layering and subtle shadows. Give foreground information a clear priority. Use decorative effects only when they serve the composition.

Create a project skill at `.claude/skills/site-visual-language/SKILL.md` that records this visual direction and the procedure for applying it. Include references to the actual shared components and design tokens. Keep short enduring project facts in the appropriate project instructions. Use the skill for every page in this redesign.

### 3. Replace the current explanatory scenes

- Strategy: build a believable delivery workspace with initiative rows, dependencies, readiness states, owners and an aligned phased timeline. A change in prerequisites must produce a coherent change in readiness.
- Business intelligence: show a useful performance view. A visitor can select a metric, trace it to its source breakdown and agreed definition, then see a linked follow-up action with an owner.
- Data engineering: show source-system records, the fields that are joined or standardised, and the resulting measure or business view. Make the data journey inspectable.
- Industry and hero sections: use appropriately art-directed imagery, with responsive crops and consistent treatment. Keep precise explanatory information in the frontend.

Use the supplied screenshots to preserve the business logic. Keep the site positioned according to its actual offering. Product-like scenes must be clearly labelled as illustrative when they are conceptual. Do not invent integrations, clients, outcomes or live activity.

### 4. Improve page flow

Give each page a clear sequence: the business outcome, a tangible visual example, how the work is delivered, relevant evidence, and the next step. Adjust that sequence to the actual page purpose. Vary composition intentionally so every section does not repeat the same text-left/diagram-right layout. Keep related services easy to discover.

Use progressive disclosure for technical depth. The main story must make sense without clicking anything. Give every visible control a clear result.

### 5. Make motion explain state

Use animation to connect input, transformation and outcome. Animate selection, expansion, source highlighting, status updates and relevant layout changes. As a starting point, use 160–260 ms for small interactions and 450–750 ms for explanatory transitions, then tune against the rendered result. Make sequences finite or user-controlled, stop unnecessary work offscreen and honour reduced-motion preferences. Preserve normal scrolling and keyboard access.

### 6. Build reusable scene components

Create reusable source tiles, record previews, metric panels, dependency rows, timeline elements and action drawers. Share tokens and behaviour across routes while choosing a distinct composition for each page's story. Use consistent, explicitly labelled sample data with arithmetic and relationships that remain correct throughout the scene.

Implement one representative page, inspect the rendered result and refine it until it establishes a convincing standard. Then apply that standard to every inventoried route in this task. Keep a route-by-route completion record so secondary pages and empty states are covered.

### 7. Verify and deliver

Use Playwright or the available browser-testing workflow to review desktop, tablet and mobile layouts. Capture and visually inspect key states. Check primary controls, text legibility, keyboard use, reduced motion, overflow and asset loading. Check performance with the heaviest scene active; lazy-load nonessential media and provide lightweight fallbacks.

Deliver the working changes, the project visual-language skill, shared components, a route-by-route change summary, representative before/after screenshots and any specific unresolved limitation. Continue through implementation and verification; do not stop at a design proposal.

## Practical acceptance criteria

- Every important visual explains a business outcome that can be understood on first viewing.
- Exact text and data remain readable, responsive and editable.
- Sources, definitions, values and downstream actions agree with one another.
- Motion communicates a change or relationship; the reduced-motion view remains complete.
- Conceptual scenes and sample figures are labelled honestly.
- Every page uses the same typography, spacing, surfaces and interaction rules, with suitable variation in composition.
- The coding agent has inspected the actual rendered pages, including mobile states.

## Official references

The tool capabilities above were checked against these primary sources. Recheck setup instructions against the installed tool versions before installing or changing project configuration.

1. [Anthropic Frontend Design plugin](https://claude.com/marketplace/plugins/frontend-design)
2. [Claude Code: extend Claude with skills](https://code.claude.com/docs/en/skills)
3. [shadcn/ui skills](https://ui.shadcn.com/docs/skills)
4. [shadcn/ui MCP](https://ui.shadcn.com/docs/mcp)
5. [Motion: layout animations](https://motion.dev/docs/react-layout-animations)
6. [Motion: accessibility and reduced motion](https://motion.dev/docs/react-accessibility)
7. [Anthropic webapp-testing skill](https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md)
8. [Microsoft Playwright MCP and CLI guidance](https://github.com/microsoft/playwright-mcp)
9. [Figma: Claude plugin and remote MCP setup](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
10. [Rive: web runtime](https://rive.app/docs/runtimes/web/web-js)
