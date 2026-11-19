# Pattern Grid — redesign v2, implementation summary

Staging: https://olufemiadetiwa.github.io/patterngrid-staging/ (branch `staging`). Production is unchanged.

## What changed

| Area | Change |
|---|---|
| Identity | Obsidian, porcelain, signal indigo and soft mint replace navy, teal and gold. Geist stays, set tighter; Geist Mono carries eyebrows, labels and figure notes. Lit cell of the mark is indigo on light, mint on dark. |
| Home | Rebuilt as eleven sections: offer-led hero with a system map; credibility strip from the records; the problem with a fragmented-to-connected record; the Intelligence Canvas; five capabilities, each with a figure, the challenge, what you receive and what it gives you; selected work with architecture lines; industries; the five-stage method; the readiness assessment; founder; final call to action. |
| Services | Figure-led hero, the challenge, a live demonstration on sample data, deliverables, architecture, method, technology, measures of success, related case and services. |
| Industries | Decisions that matter, where the information fragments, measures with definitions, a representative view on sample data, applicable services, related case. |
| Case studies | Architecture line on the cards; a schematic of the report structure beside the system map. Facts unchanged. |
| Sample views | Restored and repaired: no fake dropdowns, buttons only where they act, headline figures open their definitions, variance callouts derived per product line. All captioned illustrative. |
| Engineering | `viz.js` diagram library; `PG.track` conversion hook; header tone read from the page; tests 14, audit clean. No dependencies added. |

## What is outstanding

| Item | Needs |
|---|---|
| Enquiry delivery, server-side validation, spam protection, logging | a form service or serverless endpoint and a mailbox (phase 2) |
| Assessment result redesign | left functionally as it was; inherits the new palette. A richer result view is the next design task. |
| Services index, About, Approach, founder page | re-skinned by the new tokens, not recomposed |
| Copy pass | new copy on the home page and the new sections; existing long-form service copy is unchanged |
| Client logos, testimonials, statistics | written approval; none shown |
| Real report screenshots | client approval (phase 2); schematics stand in |
| Photography | commissioned images; current context photographs are captioned |
| Lighthouse, field vitals, device and screen-reader checks | see `05-qa.md` |
| Logo files | the PNGs exported on 8 November use navy and gold; re-export if this direction is approved |
| Analytics | choose a vendor; the event hook is ready |

## Decisions this pass reversed

Illustrative demonstrations and a diagram hero return, and the palette changes, as the brief asked. See the audit, section 8. Each is contained to staging until approved.
