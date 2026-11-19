# Pattern Grid — implementation plan (Phases 3 to 12)

All work on the `staging` branch, published with `npm run deploy:staging`. Nothing reaches patterngrid.ng until approved.

| Step | Deliverable | What changes | Depends on |
|---|---|---|---|
| 1 | Design system v2 | Colour and type tokens, mono annotations, buttons, links, forms, header, footer, tags, cards, figure frame, status chips, focus states. Documented in `04-design-system.md`. | none |
| 2 | Diagram and demonstration library | `viz.js`: system map, fragmented-to-connected record, Intelligence Canvas, method rail, five service figures. `scenes.js`: the interactive sample views (strategy, engineering, BI, AI, capability, industry), restored from history, re-skinned, with the defects from the 8 November review fixed. | 1 |
| 3 | Home | Eleven sections as briefed: hero with system map, credibility strip, the problem, Intelligence Canvas, capabilities, selected work, industries, method, assessment, founder, final call to action. | 1, 2 |
| 4 | Service template | Outcome hero with the service figure, challenge, demonstration, deliverables, architecture, method, technology, measures of success, supporting case, related services, call to action. Applied to all five. | 1, 2 |
| 5 | Case studies | Architecture, processing approach, design decisions, report structure schematic, capabilities gained; one data model for future cases. | 1, 2 |
| 6 | Industries | Decisions, sources, measures, fragmentation, representative view, services, related case. | 1, 2 |
| 7 | Assessment and contact | Result visual, progress, score explanation; contact layout, event hook. Delivery stays blocked until a destination is supplied. | 1 |
| 8 | Copy | Headlines and leads rewritten to problem → capability → approach → outcome across the pages above. | with each step |
| 9 | Quality | Tests, static audit, browser checks at 390, 768 and 1440 px, keyboard pass, reduced motion, contrast; results in `05-qa.md`. | all |
| 10 | Summary | `06-summary.md`: what changed, what is outstanding, what needs business content, approval or credentials. | all |

## Outside the scope of code

| Item | Needs |
|---|---|
| Working enquiry delivery, server-side validation, spam protection, submission logging | a form service or serverless endpoint and a destination mailbox (phase 2) |
| Client logos, testimonials, statistics | written client approval; none exists, so none are shown |
| Real report screenshots | client approval (phase 2) |
| Commissioned photography | a shoot |
| Lighthouse and field Core Web Vitals | a run outside this environment; real traffic |
| Device checks on iOS Safari and Android Chrome | physical devices |
| Analytics provider | a choice of vendor; the event hook is in place |
| Re-export of the logo files in the new palette | approval of this direction |
