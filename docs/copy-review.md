# Pattern Grid website — copy review

Review only. No site file was changed. Scope: `public/assets/js/content.js`, `service-content.js`, `pages/*.js`, `shell.js`, read against the copywriting skill (`.agents/skills/copywriting`), the master brief, the service-pages expansion brief and the visual-upgrade brief.

Ground rules applied throughout:

- Hero headlines and scroll statements listed in Visual Upgrade Prompt §05 are treated as approved. They are flagged where they cause a downstream problem but no replacement is proposed.
- No proposal adds a client, outcome, number, certification, partnership, credential, price or duration that is not already in the source material.
- Every "illustrative / sample data / not a client result" safeguard is kept. Where one is shortened, the honesty is unchanged.
- Proposals are British English, sentence case, calm, no exclamation marks.

The reader I kept in mind: an operations director or CFO in Lagos or London who has ten seconds per screen and has never heard the phrase "semantic model".

---

## 1. Systemic issues

| # | Issue | Principle it violates | Pages affected |
|---|---|---|---|
| S1 | **"Intelligence" is used as a product noun without a referent.** "Make intelligence useful", "Reliable intelligence begins beneath the dashboard", "Put trusted intelligence into the decisions", "Discuss distribution intelligence", "Discuss product intelligence". The hero lines are approved and the word is on-brand, but below the hero the reader needs to know what they actually get: agreed numbers, a report that reconciles, a queue with an owner. | Specificity over vagueness; the "Now you can…" test fails ("Now you can… have intelligence"). | Home (Decide stage), Services index, Data Engineering, all four industry CTAs, Work titles, About/Founder statement. |
| S2 | **"Capability", "capabilities", "foundations", "systems" carry most of the weight of the proposition.** "Five capabilities", "Build the capability", "Capability that stays", "Connected capabilities with a practical starting point", "dependable foundations". These are consultant words. The customer words already exist on the site (the situation rows: "Teams report different numbers", "Our systems are disconnected") and should lead. | Customer language over company language. | Home, Services index, mega menu, Capability Building, Approach, About. |
| S3 | **Passive and agentless sentences hide who does what.** "Deliverables are agreed around your priorities", "Definition… are agreed with the organisation", "Ownership… are agreed as part of the engagement", "Mismatches are listed", "The final scope is defined during discovery". The reader cannot tell whether Pattern Grid decides, the client decides, or it happens by itself. | Active over passive. | All five service pages, industries detail, work detail, FAQs. |
| S4 | **CTAs name a topic, not the next step.** "Discuss your data foundation", "Discuss distribution intelligence", "Explore an AI use case" and "Discuss your priorities" all open the same enquiry form, but nothing says so. "Explore our expertise" goes to the services index. "Check your readiness" appears seven times as a secondary link but the header calls the same thing "Readiness Assessment". | CTA formula: action + what they get. | Every page. |
| S5 | **The same thing has several names.** Consultation: "Book a Consultation" / "Book a consultation" / "Book a Data & AI Consultation" / "Request a Consultation". Assessment: "Readiness Assessment" / "Check your readiness" / "Assess Your Readiness" / "Start the Assessment". Service: "Data Engineering & Platforms" / "Data Engineering" / "Engineering". Method: "Decision Path" / "Five stages" / "How we work" / "Our Approach" / "approach". Case: Title Case (master brief) and sentence case (visual brief) are mixed on the same screen. | Clarity over cleverness; consistency lowers the comprehension tax. | Shell, home, services, about, approach, contact, assessment. |
| S6 | **Section headings label the block instead of saying what it contains.** "Data landscape", "How the information relates.", "A view worth building", "Metrics worth defining", "How information moves", "Related expertise", "Measures to agree", "Selected thinking and work", "Founder and perspective". A skim-reader gets no argument from the headings alone. | One idea per section; headings should advance the argument. | Home, service detail template, industry detail template. |
| S7 | **Technical terms are used before they are explained.** Semantic model, lakehouse, lineage, curated model, KPI dictionary, drill paths, decision gates, bounded pilot, deterministic, runbook, exception queue, entity, event taxonomy, identity resolution, node. The master brief asks for every technical term to be explained on first use; most are not. | Simple over complex; explain on first use. | All service pages, industries, work detail, Approach. |
| S8 | **Safeguards are honest but heavier and more repetitive than they need to be.** A work-detail page carries six separate disclaimers; a service worked-example section carries four; the assessment result carries three in one paragraph in the wrong order. The honesty is right. The volume makes the pages read as nervous rather than careful. | Honest over sensational, but also direct. | Work detail, service detail, assessment result, approach ("Proposed engagement formats"), about (empty team slots). |
| S9 | **Two sources of truth for service copy.** `content.js` still carries `h1`, `lead`, `problem`, `describe`, `deliverables` (strings), `visual`, `faqs` and `cta` for each service; `service-content.js` overrides most of them with different wording (for example FAQ "Do we need a mature data team to start?" vs "Do we need a mature data team?"; CTA "Discuss Your Data Strategy" vs "Discuss your data strategy"). Only `lead`, `short`, `outcome`, `link` and `starter` from the old set are still rendered. Anyone editing the wrong field will see no change. `PG.heroData` (sample figures) is defined and never rendered. | Not a copy principle, but it is the reason S5 exists. | content.js, service-content.js. |

---

## 2. Per-page findings

Location column gives the file and the field or a short quote. "Approved" means the line is in Visual Upgrade Prompt §05 and is flagged only.

### 2.1 Home (`pages/home.js`, `content.js` heroes.home, servicesOverview.features)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes.home statement (approved) | "…so your organisation can **see what matters**, understand what is changing and **decide what comes next**." | Keep. | Approved. Note that the next section is the first place that says what Pattern Grid actually does, so the capability section below must do that job. |
| heroes.home action | "Explore our expertise" | "See the five services" | Says where the link goes. "Expertise" is a company word. |
| home.js capability eyebrow | "Five capabilities" | "Five services" | "Capability" is undefined for the reader. The footer, nav and URL already say "Services". |
| home.js `cap-h2` | "Start with the problem. Build what solves it." | Keep. | Clear, concrete, active. |
| features.data-ai-strategy.text | "Choose the data and AI initiatives that deserve investment. Establish the decisions, evidence and ownership needed to move from ambition to an achievable roadmap." | "Decide which data and AI projects to fund first, and in what order. You get a roadmap with an owner for every step." | The second sentence stacks four abstract nouns. Reader needs the thing they get. |
| features.data-engineering.text | "Connect the systems behind your business and make the path from source to usable data visible, repeatable and maintainable." | "Connect your ERP, CRM, finance and spreadsheet data so it arrives on schedule, is checked, and can be traced back to its source." | Names the systems the reader has. "Visible, repeatable and maintainable" is a feature list. |
| features.business-intelligence.text | "Bring consistency to the numbers and clarity to the conversations around them. Design metrics, models and reporting around the decisions each audience needs to make." | "Give every important number one definition, one owner and one source, so finance, sales and operations stop arguing about which figure is right." | Uses the reader's own pain (the executive-problem section in the master brief). "Clarity to the conversations" is clever, not clear. |
| features.ai-automation.text | "Put automation around a well-defined task. Test the output, make exceptions visible and keep accountability clear as the workflow moves into everyday use." | "Automate one repetitive task at a time. Every output is checked, anything unusual is held for a person, and someone named signs it off." | Concrete outcome; keeps the human-review safeguard. |
| features.capability-building.text | "Help leaders, analysts and technical teams use data confidently and take ownership of the systems they depend on." | "Train your leaders, analysts and technical team on the reports and systems they will actually use, so the work does not depend on us afterwards." | Adds the reason (independence from the consultant), which is already in the service page. |
| features.*.outputs chips | "Metric lineage", "Operating runbooks", "Practical handover", "Review controls" | "Where each number comes from", "Operating guide", "Handover to your team", "Sign-off rules" | Chips are the only detail a skimmer reads; jargon here costs the most. Keep "KPI dictionary", "Data pipelines", "Delivery roadmap". |
| home.js PREVIEW_KICKERS | "Pipeline run · quality gate", "Role-to-task matrix" | "Pipeline run with one held record", "Who can do which task" | Kicker on the sample card; plain words. Keep "Sample data". |
| home.js sequence eyebrow | "A decision taking shape" | "One question, followed through" | The section is a worked question, not a decision. |
| home.js sequence lede | "One illustrative question, followed through four stages. Connected data does not prove a cause; it shows where a useful question is waiting." | "One illustrative question, followed through four stages with sample data. Connecting the data does not prove a cause; it shows where to look next." | "A useful question is waiting" is poetic. Adds "sample data" to the sentence the reader will actually read. |
| home.js STAGES[3].copy | "The connected view identifies where to look next. Whether availability is limiting sales is a question for the team to investigate, not a conclusion." | "The connected view shows where to look next. Whether low availability is causing low sales is for the team to investigate. It is not a conclusion." | Splits a sentence doing two jobs. |
| home.js industries lede | "A distribution business, an investment platform and a digital product measure success differently. We shape the data system around the decisions each organisation needs to make." | Keep first sentence. Second: "We design the reporting around the decisions your sector actually makes." | "Data system" is abstract; "reporting" is what they see. |
| home.js work eyebrow | "Selected thinking and work" | "Illustrative scenarios" | There is no client work yet. "Selected" implies a body of work to select from. |
| home.js `work-h2` | "See how the thinking becomes a working system." | "Three worked scenarios, built with sample data." | Says what the section contains and carries the safeguard in the heading. |
| home.js WORK_META key labels | "Question / Designed / Purpose" | "Question / What it includes / What it shows" | "Designed" as a row label reads as a verb without an object. |
| home.js founder eyebrow | "Founder and perspective" | "Founder" | There is no perspective content on the page. |
| home.js founder paragraph | "Pattern Grid was founded to help organisations make better use of their data. Her work spans business intelligence…" | "Precious founded Pattern Grid to help organisations make better use of their data. Her work spans business intelligence, reporting systems, data platforms and practical applications of AI and automation." | "Her" has no antecedent in the paragraph (the name is in the heading). |
| home.js founder role line | "Founder & Lead Consultant · Known professionally as Ada Africa" | Keep. | Fine. Identical line also appears on About; that is acceptable repetition. |
| home.js closing (Visual brief §07) | "What would you like to understand?" / "Start a conversation about your data, your decisions and what comes next." | Keep. Buttons: "Book a consultation" / "Take the readiness assessment". | Body copy is from the brief. Only the secondary link changes for S4/S5. |

### 2.2 Services index (`pages/services.js` overview, `service-content.js` servicesOverview, `shell.js` mega menu)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes.services statement (approved) | "…we bring **strategy, engineering and analysis** together to make intelligence useful." | Keep. Flag: "make intelligence useful" is the S1 pattern; the intro paragraph directly beneath must be concrete. | Approved. |
| servicesOverview.intro | "Your organisation may need a clearer direction, a more reliable data foundation, reporting people can trust or a practical way to automate work. We help you identify the right starting point and connect it to the capabilities needed next." | "You may need a clearer plan, data you can rely on, reporting people trust, or one repetitive task automated. We help you pick the right starting point and add the next step only when you need it." | Removes "foundation" and "capabilities"; makes the "you do not have to buy all five" promise explicit. |
| situationsHeading | "Start with the problem you need to solve." | Keep. | Best heading on the site. |
| situations[*].situation | "We have initiatives but no shared priorities" etc. | Keep all five. | Genuine customer language. Use this register elsewhere. |
| situations[0].expect | "A view of the current position, prioritised opportunities and a sequenced roadmap." | "An honest picture of where you are, a ranked list of what to build and a roadmap in order." | "Prioritised", "sequenced" are the same idea twice in consultant words. |
| situations[1].expect | "Traceable pipelines, dependable models and clear operating responsibilities." | "Data that arrives on schedule, can be traced to its source and has someone responsible for keeping it running." | Outcome, not feature. |
| situations[4].expect | "Role-specific practice, documented ways of working and evidence of independent use." | "Practice on your own reports, written guides, and proof your team can do the work without us." | Same. |
| services.js feature link labels (`s.link`) | "Explore data strategy" | "Read about Data & AI Strategy" | "Explore" is a weak CTA verb (skill list). Also fixes S5: link label now matches the page title. Apply to all five. |
| mapHeading | "Connected capabilities with a practical starting point." | "You do not need all five. Start with one." | The brief's own instruction ("Avoid implying that every customer must buy a five-stage programme") is the heading. |
| services.js map explainer | "Strategy informs Engineering, Business Intelligence and Automation. Engineering supports both BI and Automation. Capability Building supports the people operating all three." | "Strategy sets the order. Engineering supplies the checked data that reporting and automation depend on. Capability Building keeps your own team able to run all of it." | Removes abbreviations ("BI", "Automation") and the arrow shorthand. The diagram notes "informs ↓ / supports → BI, Automation" can then be removed or shortened to "sets the order" / "supplies the data" / "keeps your team able to run it". |
| closing.p | "Bring a business question, an unreliable process or a capability you want to build. We will help identify a useful place to begin." | "Bring a question, an unreliable report or a task you want to hand over. We will suggest a sensible place to begin." | "Capability you want to build" is S2. |
| closing primary CTA | "Discuss your priorities" | "Send us your question" (opens the enquiry form) | S4: says what happens. |
| shell.js mega aside | "Five connected capabilities. Start with the business problem and build the capability needed to solve it." | "Five services that build on each other. Start with the problem in front of you; we add the next step only if it is needed." | S2, and repeats the "no five-stage programme" promise where a hesitant buyer sees it first. |
| shell.js mega aside link | "Not sure where to start? Take the readiness assessment →" | Keep. | Good. |

### 2.3 Service detail template (all five; `pages/services.js` detail, `service-content.js` shared lines)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| services.js overview eyebrow | "Overview · 01" | "What this is" | "Overview" says nothing; the index number is decoration. |
| services.js situations label | "This is useful when" | Keep. | Good. |
| services.js outcome label | "Outcome to work towards" | "What you are working towards" | Second person; reads as the client's outcome, not ours. |
| services.js deliverables eyebrow / H2 | "What you receive" / "Six concrete deliverables." | "What you receive" as the H2; drop "Six concrete deliverables." | The eyebrow is the better heading; the count is visible. |
| PG.deliverablesLine | "Deliverables are agreed around your priorities, systems and starting point." | "We agree the exact deliverables with you around your priorities, your systems and where you are starting from." | S3. The expansion brief supplies the original as proposed public copy; this is the active form of the same promise. |
| services.js deliverables button | "View an example artifact" | "See a sample deliverable" | "Artifact" is US spelling and jargon. Same change for the "Sample artifact ·" label and the "Illustrative preview ·" label ("Sample of the output ·"). |
| services.js approach H2 | "Five stages, each with an output and a decision." | "How the work runs: five stages, each ending in something you can see." | "Decision" here means a go/no-go point, which the reader will not infer. |
| services.js stage "Output" label | "Output" | "What you get at the end of this stage" | Plain. |
| services.js flow eyebrow | "How information moves" | "How your information becomes an answer" (Strategy: "…becomes a priority"; Capability: "…becomes proof your team can do it") | Says what the diagram shows for this service. |
| services.js flow aside default | "Select a node. Each node explains its role here. Solid lines carry information forward, amber lines mark exceptions and dashed teal lines show feedback." | "Select any box to read what happens there. Solid lines move forward, amber lines are exceptions, dashed lines go back for correction." | "Node" is diagram jargon. |
| services.js KIND_LABEL.use | "Use" | "Used by" | "Use" as a category label is ambiguous on a box. |
| services.js worked-example eyebrow | "Worked example" | Keep. | Good. |
| services.js worked-example fine print | "Illustrative example with sample figures. It is not an assessment of your organisation or a client result." | "Illustrative example with sample figures, not a client result." | Same safeguard, one clause shorter; the "not your organisation" point is obvious from context. |
| services.js measures eyebrow + note | "Measures to agree" / "Measurement categories to agree at the outset — not achieved results." | "How we would measure success" / "Agreed with you before work starts. These are the measures, not results we are claiming." | The heading now says what the list is; the safeguard is unchanged and reads as a sentence. |
| services.js related eyebrow | "Related expertise" | "Related services" | Same word as the nav. |
| services.js methods line | "Working methods, not software: stakeholder interviews, source inventories, maturity assessment." | "Ways of working (not software): interviews with your stakeholders, a list of your data sources, a maturity assessment." | Explains each method in one breath. |
| services.js questions eyebrow | "Questions" | "Common questions" | Small, but "Questions" alone reads as a form. |
| ext.*.cta | "Discuss your data strategy" etc. | "Discuss your data strategy with us" (all five), and the button's aria/title or a line beneath: "Opens a short enquiry form." | S4. The button opens a form, not a chat. |
| closing secondary link (all pages) | "Check your readiness" | "Take the readiness assessment" | S5: one name for the assessment everywhere. |

### 2.4 Data & AI Strategy (`service-content.js` ext['data-ai-strategy'], `content.js` services[0])

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes statement (approved) | "…choose **clear priorities**, assess what is possible and build a roadmap your teams can use." | Keep. | Approved and clear. |
| ext.heading | "Give your data investment a clear direction." | Keep. | Fine. |
| ext.intro[1] | "Pattern Grid helps leadership establish the business decisions to improve, the capabilities required and the sequence in which to build them. We examine the current environment, assess opportunities and make ownership, dependencies and trade-offs visible before major delivery commitments are made." | "We help you decide which business decisions to improve first, what you need in place to improve them, and in what order to build it. Before you commit budget, you see who owns each piece, what depends on what, and the trade-offs." | S3 (passive ending), S2 ("capabilities"). |
| ext.outcomeText | "A common direction, a prioritised investment backlog and a practical basis for making delivery decisions." | "One agreed direction, a ranked list of what to build, and the evidence to decide what to fund first." | "Investment backlog" is not a phrase a CFO uses. |
| deliverables.portfolio.title | "Prioritised opportunity portfolio" | "Ranked list of opportunities" | "Portfolio" is finance jargon in a different sense. |
| deliverables.architecture.desc | "A view of the systems, data flows and capabilities required, with options explained against your existing environment and operating constraints." | "A picture of the systems and data flows you would need, with each option weighed against what you already run and can support." | S2, S7. |
| deliverables.roadmap.desc | "…accountable owners and decision gates, with assumptions and investment considerations made explicit." | "…a named owner for each step and a review point before each phase starts, with the assumptions and cost considerations written down." | "Decision gates" explained in place. |
| approach[2].output | "A ranked opportunity portfolio with reasons, assumptions and dependencies." | "A ranked list of opportunities, with the reasons, assumptions and dependencies for each." | Same. |
| flow node 'gate' | "Prioritisation gate" | "Prioritisation check" | "Gate" is unexplained; "check" is plain. Keep sub-line "Value · Feasibility · Readiness · Effort". |
| flow node 'pre' | "Prerequisite backlog" | "Needs a foundation first" | Matches the edge label already used ("Foundation needed"). |
| services.js roadmap checkbox | "Illustrative readiness: source integration complete" | "Try it: mark source integration as complete" | Tells the reader it is a control they can use. |
| services.js ROADMAP_INITS[0].prereq | "None — this is the first foundation." | "None. This comes first." | Plain. |
| ext.faqs[1].a | "No. The roadmap can improve the existing environment. A platform change should follow a justified requirement and an assessment of its implications." | "No. The roadmap can work with what you already have. We would only recommend a new platform when a specific requirement needs it and we have assessed what the change involves." | Active voice; says who recommends. |
| ext.closing | "Give your next investment a clear purpose." | Keep. | Fine. |
| content.js services[0].short (mega menu) | "Define the decisions, capabilities and investments that deserve attention first." | "Decide which data and AI projects to do first, and why." | Mega-menu description; S2. |

### 2.5 Data Engineering & Platforms (`ext['data-engineering']`, `content.js` services[1])

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes statement (approved) | "Reliable intelligence begins beneath the dashboard. We connect systems, improve data quality and create **dependable foundations** for reporting, analytics and AI." | Keep. Flag: S1/S2 in one line; the heading and intro below must name the systems. | Approved. |
| ext.heading | "Make the path from source to answer dependable." | Keep. | Good. |
| ext.intro[1] | "Pattern Grid designs and builds the data foundations behind reliable intelligence. We connect agreed sources, make transformations traceable, establish quality checks and prepare usable models for reporting and downstream applications. The work includes the operating responsibilities needed to keep the system dependable after implementation." | "We build the data pipelines and platform behind your reporting. We connect the sources you agree, record every step the data goes through, check it as it arrives, and shape it so reports and automation can use it. We also agree who keeps it running once we have left." | S1 ("intelligence"), S7 ("transformations", "downstream applications"), S3. |
| ext.outcomeText | "A maintainable flow of usable data with visible sources, quality checks, access rules and operating ownership." | "Data that arrives on schedule, has been checked, shows where it came from, and has a named person keeping it running." | Outcome in the reader's terms. |
| deliverables.models.title / desc | "Warehouse or lakehouse models" / "Data structures designed around the required analysis…" | "Data warehouse or lakehouse" / "The organised store your reports read from (a warehouse or lakehouse, depending on your platform), designed around the analysis you need, with consistent keys and a documented path from raw input to usable output." | Explains the term on first use. |
| deliverables.lineage.title | "Access and lineage documentation" | "Who can see what, and where each number comes from" | "Lineage" explained by replacing it. If the technical word must stay, use "Access and lineage (where each number comes from)". |
| deliverables.ops.title | "Deployment and operations pack" | "Operating guide and runbooks" | "Runbook" is used elsewhere; this makes the two the same thing. |
| approach[0].output | "The source contract and integration requirements." | "A written agreement of what each source will supply, how often, and in what form." | "Source contract" is undefined. |
| approach[4].name | "Operate" | "Hand over" | The stage is the handover to the client's team, which is the thing a buyer wants to know exists. |
| flow node 'int' | "Integration and landing" | "Data arrives" | Plain. |
| flow node 'gate' | "Validation and quality gate" | "Quality checks" | "Gate" again. |
| flow node 'cur' | "Curated models" | "Checked, organised data" | "Curated" is unexplained. |
| ext.faqs[0].a | "The design begins with the systems and interfaces already in place. Replacement or migration is considered when requirements and the business case support it." | "Yes. We start from the systems you already have. We would only suggest replacing or migrating one when the requirement and the business case justify it." | Answers the question first ("Yes"), active. |
| ext.faqs[2].a | "Ownership, monitoring and support arrangements are agreed as part of the engagement and made explicit in the handover." | "That is agreed with you during the engagement and written into the handover: who owns it, who monitors it, who supports it." | S3. |
| ext.cta / heroes action | "Discuss your data foundation" | "Discuss your data platform with us" | "Foundation" is S2; the service is called Platforms. |
| content.js services[1].outcome | "A reliable foundation." | "Data you can rely on." | Shown beside the home preview card and in related links. |

### 2.6 Business Intelligence (`ext['business-intelligence']`, `content.js` services[2])

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes statement (approved) | "Bring your most important measures into one shared view…" | Keep. | Approved; clear. |
| ext.heading | "Give every important number a clear meaning." | Keep. | Good. |
| ext.intro[1] last sentence | "The aim is a dependable management conversation supported by understandable evidence." | "The aim is a management meeting where everyone is looking at the same number and can see where it came from." | Concrete scene instead of abstraction. |
| ext.outcomeText | "Consistent measures, useful analytical views and a repeatable way to investigate performance and assign follow-up actions." | "Numbers that agree across departments, reports built around real questions, and a routine for finding the cause and assigning someone to act." | Outcome language. |
| deliverables.semantic.title / desc | "Analytical semantic model" / "A reusable model that brings relationships and calculation logic together…" | "Shared calculation model" / "One shared set of relationships and calculations behind every report (in Power BI terms, the semantic model), so two reports never compute the same measure differently." | The expansion brief asks for "semantic model" to be explained in public copy; this does it in the deliverable that names it. |
| deliverables.drill.title | "Investigation and drill paths" | "Routes from a headline number to the detail behind it" | "Drill path" explained by replacement. |
| deliverables.validation.title | "Validation and access pack" | "Proof the reports reconcile, and who can see them" | Outcome. |
| flow node 'model' sub-line | "One set of relationships and calculations" | Keep. | Already the explanation the brief asked for. |
| flow node 'rev' | "Review of the same question" | "Both audiences review the same figure" | Says what the box is. |
| ext.faqs[1].q | "Is this only dashboard development?" | "Is this just building dashboards?" | Customer phrasing. |
| ext.faqs[2].a | "Agree the users, decisions and success measures before building, then review whether the reporting supports those needs in practice." | "We agree with you, before building, who will use the reports, which decisions they support and how we will judge success. After launch we check whether they are being used that way." | S3. |
| ext.closing | "Make your next performance review more useful." | Keep. | Good. |
| ext.cta | "Discuss your reporting" | "Discuss your reporting with us" | S4. |

### 2.7 AI & Automation (`ext['ai-automation']`, `content.js` services[3])

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes statement (approved) | "Apply AI where it serves a clear purpose… keep **people in control**…" | Keep. | Approved; the best statement on the site. |
| ext.heading | "Build a useful workflow around a well-defined task." | Keep. | Good. |
| ext.intro[1] | "Pattern Grid helps identify practical automation opportunities, test a bounded solution and connect it to the systems and people involved. We define the inputs, evaluate the output and make the handover between automation and human judgement explicit. A pilot should produce evidence about what works, where it fails and what is required to operate it responsibly." | "We help you pick one task worth automating, build a pilot with clear limits, and connect it to the systems and people involved. We define what goes in, check what comes out, and make it explicit where a person takes over. The pilot's job is to show what works, where it fails and what it would take to run it properly." | "Bounded" explained as "with clear limits"; active. |
| ext.outcomeText | "A useful, measurable workflow with an accountable owner, visible exceptions and a tested operating model." | "A workflow that saves real time, has a named owner, shows you anything it could not handle, and has been tested before it goes live." | Outcome. |
| deliverables.pilot.title | "Bounded pilot or prototype" | "Pilot with agreed limits" | S7. |
| deliverables.controls.title | "Integration and review controls" | "Connections, sign-off steps and exception routes" | Names the three things. |
| approach[1].activity | "Separate rule-based steps from AI-assisted steps and specify the controls." | "Decide which steps follow fixed rules and which use AI, and set the checks for each." | "Rule-based" and "AI-assisted" explained. |
| feedback.label | "Evaluate returns to Prototype when results do not meet the criteria. A successful demo is not a production-ready system." | "If the results miss the agreed criteria, we go back to the pilot. A good demo is not a finished system." | Active, shorter. |
| flow.title | "Evidence before action." | "How a request becomes an approved action, with a person deciding." | A slogan as a diagram title does not tell the reader what they are looking at. |
| flow node 'prep' sub-line | "Rule-based or AI-assisted · labelled “Proposed”" | Keep. | Safeguard; fine. |
| services.js artifactAI fine print | "This is an illustration on the page. It does not connect to a live assistant or submit anything to an external system." | "This is a page illustration. Nothing here is sent anywhere." | Same safeguard, half the length. |
| ext.faqs[0].a | "No. Where clear rules and reliable integrations can do the job, those may be the better starting point." | "No. If a clear rule can do the job, we use the rule." | Plain. |
| ext.cta / heroes action | "Explore an AI use case" / "Explore an automation use case" | "Discuss an automation idea with us" (both) | S4 and S5: two labels for one button, and "Explore" leads to a form. |
| content.js services[3].short | "Apply AI and automation to specific tasks, with evaluation and human oversight where needed." | "Automate one repetitive task at a time, with checks and a person signing off." | Mega-menu description; simpler. |

### 2.8 Capability Building (`ext['capability-building']`, `content.js` services[4])

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes statement (approved) | "Systems create lasting value when people can use them confidently. We build **practical skills**…" | Keep. | Approved; clear. |
| ext.heading | "Build capability around the work your people do." | "Train your people on the work they actually do." | S2: the page title already says Capability Building; the heading can say what it means. |
| ext.intro[0] | "A new system can remain dependent on its original implementer when the team has not had the opportunity to practise, question and take ownership. A presentation or a course completion record alone does not show that people can perform the tasks required of them." | "A new system stays dependent on whoever built it unless your team has practised on it, questioned it and taken it over. A slide deck or a course certificate does not show that someone can do the job." | Shorter; same idea. |
| ext.outcomeText | "People who can perform agreed tasks, understand their responsibilities and sustain the working practices around the technology." | "A team that can do the agreed tasks without us, knows what it is responsible for, and keeps the routines going." | Outcome. |
| deliverables.baseline.desc | "…using suitable evidence rather than relying only on self-reported confidence." | "…judged by watching people do the task, not by asking how confident they feel." | Concrete. |
| feedback.label | "A gap found in Demonstrate returns to targeted practice. Attendance alone never moves someone to Independent." | "If someone cannot yet do a task, they practise it again. Attending a session does not count as being able to do it." | Plain. |
| techIntro | "Tools sit inside the relevant role track. This supports delivery ownership; it is not a public course catalogue." | "Each role learns the tools it will actually use. This is training for your team as part of an engagement, not a public course catalogue." | The safeguard (not a course marketplace) is kept and now reads as a sentence. |
| tech[*].name (used as role labels) | "Leaders and business users", "Analysts", "Data and technical teams", "Process owners and champions" | Keep. | Good. |
| ext.faqs[2].a | "Yes. Practice, documentation and handover can be designed into the delivery work so the team is preparing to take ownership as the system develops." | "Yes. We can build the practice, documentation and handover into the delivery itself, so your team is ready to take over as the system is finished." | Active. |
| ext.closing | "Make your investment work through your people." | Keep. | Fine. |
| ext.cta | "Discuss team capability" | "Discuss training for your team" | S2, S4. |
| content.js services[4].outcome | "Capability that stays." | "Skills that stay with your team." | Related-link line. |

### 2.9 Industries index (`pages/industries.js` overview)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes.industries statement (approved) | "Every sector has different pressures. We connect data to the **customers, operations and decisions**…" | Keep. | Approved. |
| Missing intro | (none; page goes straight from statement to four rows) | Add one lede above the rows: "Each page below gives one question leaders in that sector ask, the measures we would define with you, and a sample of what a connected view could show." | The four rows show a question and four metric chips with no explanation of what an industry page is for. |
| Row link label | "Explore Financial Services & Fintech →" | "Read about Financial Services & Fintech" | "Explore" (weak verb) and the ampersand title reads awkwardly after a verb. |
| Metric chips | "Active customers", "Transaction value and volume"… (four per row) | Keep, but prefix the row with a small label "Measures we would define:" | Chips without a label read as tags. |
| closing H2 + lede | "Another data-intensive sector?" / "The decisions matter more than the label. Tell us what you need to improve." | Keep. | Good. |
| closing CTA | "Book a Data & AI Consultation" | "Book a consultation" | S5 (see §2.17 for the single convention). |

### 2.10 Industry detail template (`pages/industries.js` detail, `content.js` industries, `service-content.js` indNotes / indGrids)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| Label | "THE EXECUTIVE QUESTION" | "The question leaders ask" | Less grand; same meaning. |
| Label | "METRICS WORTH DEFINING" | "Measures we would define with you" | Says who defines them and that it is a joint act. |
| DEFINITION_NOTE (every metric expands to the same sentence) | "Definition, reporting period, owner and source lineage are agreed with the organisation before this metric appears in reporting." | "Before this measure goes into a report, we agree its definition, reporting period, owner and source with you." | S3. Separately: expanding seven buttons to reveal the identical sentence disappoints; consider one note under the list and no expand control. |
| Eyebrow / H2 | "DATA LANDSCAPE" / "How the information relates." | "Your data sources" / "How the sources connect into one view." | S6. |
| Body under it | "Each source keeps its own identity. A shared model connects them around the entities the business measures, so a single figure can be traced back to the system it came from." | "Each system stays as it is. A shared model links them around the things you measure (products, outlets, customers, periods), so any figure can be traced back to the system it came from." | "Entities" explained by example. |
| Eyebrow / H2 | "A view worth building" / "One record grid, shared definitions, visible exceptions." | "What a connected view could show" / "Sample data, shared definitions, and the exceptions made visible." | "Record grid" is jargon; the safeguard moves into the heading. |
| Card head | "Sample data · illustrative" | "Sample data · not a client" | Same honesty, says the thing the reader might wonder. |
| Card foot | "lineage ← Customer · Transaction · Finance · Product · Support" | "Sources: Customer · Transaction · Finance · Product · Support" | "Lineage" replaced. |
| industries[financial-services].note | "Active customers need an explicit activity window. For investment platforms, assets under management, net flows and engagement may also be relevant. Metric definitions depend on the organisation; nothing here implies regulatory assurance or compliance certification." | "'Active customers' only means something once you have agreed the activity window. For investment platforms, assets under management, net flows and engagement may matter too. Definitions depend on your business. Nothing on this page is regulatory assurance or a compliance certification." | Three jobs, now three sentences; safeguard kept verbatim in meaning. |
| industries[technology].note | "Recurring revenue metrics are used only when the business model supports them. Event taxonomy, identity resolution and shared metric definitions are described in plain language." | "We only use recurring-revenue measures if that is how you charge. We describe the technical parts (which events you track, how one user is recognised across systems, shared definitions) in plain language." | It promised plain language while using "event taxonomy" and "identity resolution". |
| indNotes[*] (serviceNote) | e.g. "Transaction reconciliation and shared measures sit with Data Engineering and Business Intelligence. Bounded automation opportunities, such as routing reconciliation exceptions for review, connect to AI and Automation." | "Reconciling transactions and agreeing shared measures is Data Engineering and Business Intelligence work. One automation we might pilot: routing reconciliation exceptions to a reviewer." | Reads as a sentence about the reader, not a routing table. Apply the same treatment to the other three notes. |
| RELATED WORK card label | "ILLUSTRATIVE SCENARIO" | Keep. | Safeguard. |
| industries[*].cta | "Discuss Financial Services Data" / "Discuss Distribution Intelligence" / "Discuss Retail Intelligence" / "Discuss Product Intelligence" | "Discuss your financial services data" / "Discuss your stock and sales data" / "Discuss your retail data" / "Discuss your product data" | S1 (three "intelligence" CTAs), S4 (second person), S5 (case). |
| heroes.industries/* action labels | Same four, lower case | Same as above. | Keep hero action and closing CTA identical. |

### 2.11 Our Work index and the three scenarios (`pages/work.js`, `content.js` work, `service-content.js` workExt)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes.work statement (approved) | "…**Client work and illustrative demonstrations** are identified clearly throughout." | Keep. Flag: there is no client work on the page, so the reader looks for it. The index note below already explains; keep it near the top. | Approved. |
| work.js index note | "The items below are illustrative scenarios built to show our thinking. They are not client projects and carry no performance claims. Verified client work will be labelled separately when published." | "Everything below is an illustrative scenario built with sample data to show how we think. None is a client project and none claims a result. Client work will be labelled as such when we publish it." | Same three facts, plainer. |
| work.js card label | "ILLUSTRATIVE SCENARIO · CROSS-FUNCTIONAL REPORTING" | Keep. | Safeguard. |
| work.js card link | "Explore the scenario →" | "Read the scenario" | Weak verb. |
| work.js detail: full safeguard sentence | "This is an illustrative scenario using sample information. It does not represent a client engagement or verified business result." | Keep verbatim. | Mandated by the master brief. |
| work.js detail: "Sample data. Not client results." | Keep verbatim. | Mandated beside data visuals. | — |
| work.js detail: tech note | "Architecture options for an illustrative scenario, not a record of delivered client work." | "Options for this scenario, not delivered client work." | Same honesty; the section is already labelled "(illustrative)". |
| work.js detail: enable note | "These describe intended capability, not a measured outcome." | "What the system is built to make possible, not a measured result." | Removes "capability". |
| work.js detail heading | "What this system is designed to enable" | Keep. | Mandated by the master brief. |
| work.js column label | "Information flow" | "How the data moves" | Plain. |
| content.js work[0].sections[1].p | "Finance, sales and operations records are aligned by reporting period and entity. Mismatches are listed rather than silently resolved." | "We line up finance, sales and operations records by reporting period and by what they describe (customer, product, outlet). Where they disagree, the difference is listed, not quietly fixed." | S3, S7 ("entity"). |
| content.js work[0].sections[2].p | "Each executive metric carries a definition, period rule, owner and source lineage that any reader can open." | "Any reader can open an executive metric and see its definition, its period rule, its owner and where the figure came from." | "Lineage" replaced. |
| content.js work[1].sections[1].p | "…Units and assumptions are documented with the synthetic dataset." | "…Units and assumptions are written down alongside the sample data." | "Synthetic dataset" is technical; "sample data" is the site's own safeguard word. |
| content.js work[2].sections[1].h | "Deterministic checks" | "Fixed-rule checks" | "Deterministic" unexplained; the AI page uses "rule-based". Pick one word site-wide ("rule-based"). |
| workExt[*].approach | "Define → Model → Design → Validate → Embed" | Keep, and add "(the Business Intelligence approach)" | Otherwise the five names appear without context. |
| work.js closing | "Have a similar question in your business?" | Keep. | Good. |

### 2.12 Insights (`pages/insights.js`, `content.js` articles)

The page is hidden from navigation because no article has `published: true`; findings are recorded for when it goes live.

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes.insights statement (approved) | "…practical perspectives on **data, analytics and AI**…" | Keep. | Approved. |
| insights.js note | "The titles below are commissioned and in preparation; none is published yet. Each opens as a full article once written and approved." | "These articles are being written. None is published yet; each will open as a full article once approved." | Shorter, same honesty. |
| Card label | "BUSINESS INTELLIGENCE · IN PREPARATION" | Keep. | Honest. |
| Card foot | "Next question: …" / "Related: Business Intelligence →" | "The question it leads to: …" / "Related service: Business Intelligence" | "Next question" reads as a quiz. |
| articles[1].title | "Before you build another dashboard define the decision" | "Before you build another dashboard, define the decision" | Missing comma makes it read twice. |
| Closing | "Not sure where your data practices stand?" / "Assess Your Readiness" | Keep H2; button "Take the readiness assessment" | S5. |
| heroes.insights action | "Check your readiness" | "Take the readiness assessment" | S5. |

### 2.13 About (`pages/about.js` about, `content.js` beliefs, stages, team)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes.about statement (approved) | "…bringing business understanding, technical care and practical thinking to the same table." | Keep. | Approved. |
| about.js lede | "Businesses collect information across finance, sales, operations and customer systems. The difficulty is making that information consistent, connected and useful. Pattern Grid exists to help organisations build the systems and working practices that make this possible." | "Every business collects information in its finance, sales, operations and customer systems. The hard part is making those numbers agree, connect and mean something. Pattern Grid exists to help you do that, in the systems and in the way your teams work." | "Consistent, connected and useful" is a triplet of adjectives; the rewrite says what each one means. |
| about.js second paragraph | "We bring business questions, data architecture, analytics and practical AI into the same conversation. The work begins with what the organisation needs to understand and continues through the foundations required to support it." | "We start with what you need to understand, then work back through the reporting, the data and the systems needed to support it." | S2 ("foundations"); the first sentence repeats the hero statement. |
| Eyebrow vs H2 | "OPERATING BELIEFS" / "How we work, in four commitments." | "HOW WE WORK" / "Four commitments." | Eyebrow says beliefs, heading says commitments. Pick one. |
| about.js sub-line | "African-founded, with an international outlook. The work is shaped around the organisation in front of us." | Keep. | Good; supported by the brief. |
| beliefs[*] | "Begin with the decision." etc. | Keep all four. | Concrete and active. |
| Eyebrow / H2 | "THE DECISION PATH" / "Five stages from question to action." | Keep. | Fine. |
| about.js team block | "THE TEAM / The people behind the work." + three empty frames labelled "Profile to follow" + "Profiles appear here as they are approved. Roles are described by the work they do, not by title alone." | Hide the block until at least one approved profile exists. If it must stay: "More profiles will be added as they are approved." and remove the second sentence. | The master brief says hide unapproved modules. Three empty portraits read as an unfinished site. "Roles are described by the work they do" is an internal editorial rule, not a message to a buyer. |
| about.js closing H2 | "Start with the decision you need to improve." | Keep here; vary on Founder and Approach (see below). | Same closing on three consecutive pages in the About section. |
| about.js closing CTA | "Book a Data & AI Consultation" | "Book a consultation" | S5. |

### 2.14 Founder (`pages/about.js` founder, `content.js` heroes.founder, team.founder)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes.founder statement (approved) | "…Explore her perspective on data, intelligence and the decisions that shape organisations." | Keep. Flag: the page contains a biography and a "Selected experience" paragraph but no perspective (no articles, no quotes). Until Insights is live, the statement promises something the page does not deliver. | Approved. |
| about.js bio | "Precious Chinenye Celestine is a Data and AI professional and Business Intelligence consultant…" | Keep (proposed biography from the master brief, pending approval). | Do not alter approved-pending biography. |
| about.js "Selected experience" second sentence | "Previous roles and personal projects are attributed to their organisations, not to Pattern Grid." | "This experience comes from previous roles and personal projects, not from work delivered by Pattern Grid." | The current sentence is the brief's editorial rule pasted onto the page; the rewrite says the same true thing to the reader. |
| about.js founder closing H2 | "Start with the decision you need to improve." | "Bring your question to a first conversation." | Varies the closing; still no promise. |
| heroes.founder action | "Discuss your business challenge" | "Discuss your business question with us" | The site's own word is "question" ("Start with a question", "your business question"); "challenge" is a new noun. |

### 2.15 Our Approach (`pages/about.js` approach, `content.js` stages, engagements)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes.approach statement (approved) | "Begin with a business question. Establish the right foundations. Build what is useful…" | Keep. | Approved. |
| **about.js stage cards (top diagram) render `s.change`** | "Six named sources connect to a shared intake." / "Records align; lineage, ownership and quality markers appear." / "A question becomes a small, readable analytical view." / "A checked exception moves to a review queue with an owner." / "A decision brief shows the issue, evidence and proposed next action." | Render `s.copy` (or a shortened copy) on the cards instead. | The `change` field is the master brief's "Visible change" column: stage directions for an animation. On this page they are shown as the description of each stage of an engagement, so a reader learns that stage 2 is "lineage, ownership and quality markers appear". This is the single most confusing block on the site. |
| stages[1].copy (Structure) | "Establish reliable models, quality checks and shared definitions." | "Agree one definition for each measure, check the data as it arrives, and hold anything that fails." | "Models" is S7. |
| stages[2].copy (Understand) | "Make performance, exceptions and underlying drivers easier to interpret." | "Show what is happening, what is unusual, and what is driving it." | Plainer. |
| stages[4].copy (Decide) | "Put trusted intelligence into the decisions your teams make every day." | "Put the checked figures, and the evidence behind them, in front of the people making the decision." | S1. |
| stages[*].output | "Connected source map", "Agreed data model and metric definitions", "Analytical views and decision questions", "Evaluated workflows and review ownership", "Adoption plan and operating cadence" | "A map of your connected sources", "Agreed definitions and data model", "Reports built around your questions", "Tested workflows with a named reviewer", "A plan for who uses it and how often it is reviewed" | "Operating cadence", "analytical views" are S7. |
| about.js eyebrow + para | "Each capability has its own approach" / "The Decision Path is the shared shape. Each service applies it differently, with its own outputs and decision points. Capability Building supports ownership throughout." | "Each service runs the path differently" / "The Decision Path is the common pattern. Each service has its own five stages, outputs and review points. Capability Building runs alongside all of them so your team can take over." | "Shared shape" and "supports ownership" are abstract. |
| about.js label | "THREE PRINCIPLES" | "THREE RULES WE HOLD TO" | Slightly more human; optional. |
| about.js label | "PROPOSED ENGAGEMENT FORMATS" | "HOW WE CAN WORK TOGETHER" (only once the founder confirms the three formats; see §4) | "Proposed" on a public page signals the offer is not settled. |
| engagements[2].copy | "Support adoption, documentation and a structured improvement backlog where an ongoing engagement is agreed." | "If we continue working together: help with adoption, documentation and an agreed list of improvements." | S7 ("improvement backlog"), and the condition goes first. |
| about.js assessment link | "Find your starting point with the readiness assessment →" | "Take the readiness assessment to find your starting point" | S5. |
| heroes.approach action | "Check your readiness" | "Take the readiness assessment" | S5. |

### 2.16 Readiness assessment: intro, questions, result (`pages/assessment.js`, `content.js` assessment, bands, priorityMap)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes.assessment statement (approved) | "Take a structured look… Identify **practical priorities**…" | Keep. | Approved. |
| intro small copy | "Eight questions. This is an indicative self-assessment, not an audit or a validated industry benchmark. Your answers stay in this browser session unless you choose to share them, and you can view your result without an email address." | "Eight questions, no email address needed. You get a score out of 100, your weakest areas and up to three suggested next steps. It is a self-assessment, not an audit or an industry benchmark. Your answers stay in this browser unless you choose to send them with an enquiry." | What you get first; safeguard kept in full. |
| Button | "Start the Assessment" / "Continue the Assessment" | "Start the assessment" / "Continue the assessment" | Case (S5). |
| Question header | "Question 3 of 8 · Reporting" | Keep. | Good. |
| assessment[*].question / options | e.g. "How does information move between your main business systems?" | Keep all eight. | Written in the reader's language; best copy on the site. |
| bands[0].text | "Basic information practices need a shared structure." | "Information is handled informally. The first step is shared definitions, named owners and a reliable way to move data between systems." | Says what "shared structure" means. |
| bands[1].text | "Useful practices exist but remain inconsistent." | "Some good practice exists, but it depends on individuals rather than on a process everyone follows." | Same. |
| bands[2].text | "Several foundations are in place, with important gaps to address." | "Several pieces are in place. The gaps below are where a connected view is still breaking down." | S2. |
| bands[3].label / text | "Intelligent" / "Information supports recurring decisions with established practices." | "Established" / "Information is used routinely in recurring decisions, with agreed practices." | "Intelligent" as a maturity label invites the reader to score themselves as clever; "Established" describes practices. Label change needs founder sign-off as it is in the brief's scoring table. |
| bands[4].text | "Strong self-reported foundations may support more advanced use cases." | "Your self-reported foundations are strong enough to consider more advanced uses, including AI." | Same meaning; second person. |
| result eyebrow | "YOUR INDICATIVE RESULT" | "YOUR RESULT (INDICATIVE)" | Reads more naturally. |
| result fine print | "A low score in a dimension points to the service that usually addresses it; the outputs shown are typical, not a complete solution or commercial scope. Score out of 100 from eight self-reported answers. Indicative only; “AI ready” does not certify security, compliance or suitability for a particular use case." | "Score out of 100 from your eight answers. It is indicative only; “AI ready” does not certify security, compliance or suitability for any particular use. Each low-scoring area points to the service that usually addresses it. The outputs shown are typical, not a quote or a full solution." | Same three safeguards, in the order a reader needs them. |
| foundationNote | "Your score is in the top band, but the label is held at Intelligent because a foundation needs attention: data quality (needs at least 3 of 4)…" | "Your total is in the top band, but we hold the label at Established until the basics are stronger: data quality (you scored below 3 of 4)…" | Explains the rule in the reader's terms. |
| Section H2 | "Eight dimensions" | "Your eight scores" | Says what the bars are. |
| Priority title format | "Governance · Data & AI Strategy" | "Governance, addressed by Data & AI Strategy" | The dot leaves the relationship unstated. |
| Adoption priority text | "Systems appear ahead of daily use. Capability building can help teams interpret and act on the reporting they already have." | "Your reporting looks more developed than the way it is used day to day. Training can help teams read and act on the reports they already have." | Plain. |
| Maintenance priorities[2].text | "Repeat this self-assessment with the same respondents to check whether practices are holding." | "Repeat this assessment in six to twelve months with the same people to check the practices are holding." | Puts the timing in the sentence rather than only the title. |
| Primary button | "Discuss My Priorities" | "Send my priorities with an enquiry" | S4: the button opens an include-result prompt, then the contact form. |
| Include prompt | "Include your result and priorities in the enquiry? Only the summary is shared; nothing is sent until you submit the form." | Keep. | Clear and honest. |
| Include buttons | "Include result" / "Continue without it" | Keep. | Good. |
| Secondary links | "Print or save result" / "Change answers" | Keep. | Good. |

### 2.17 Contact (`pages/contact.js`, `content.js` heroes.contact)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| heroes.contact statement (approved) | "Tell us what you are trying to understand, improve or build. We will start with **your business question**…" | Keep. | Approved. |
| Aside H2 | "Tell us about your project." | "Tell us what you want to improve." | "Project" assumes the reader has one; the form's own question is "What would you like to improve?" |
| "WHAT HAPPENS NEXT" steps | "01 We read your enquiry and the reports or systems you mention. 02 We reply to arrange a conversation about the problem and a useful next step. 03 No sensitive company data is needed at this stage." | "01 We read your enquiry. 02 We reply to arrange a short conversation about the problem. 03 We suggest a sensible next step, which may be nothing more than that conversation." Move "You do not need to share any sensitive company data at this stage." to the fine print below. | Step 03 is not a step. The rewrite also avoids implying a proposal follows automatically. |
| Aside fine print | "Enquiries are read by the consultant who would work with you. You can also start with the readiness assessment and bring the result." | "Your enquiry is read by the consultant who would work with you. You do not need to share sensitive company data at this stage. If you prefer, take the readiness assessment first and send the result with your enquiry." | Consolidated. Confirm the first sentence is true (see §4). |
| Field label | "Service interest (optional)" | "Service you are interested in (optional)" | Reads as a sentence. |
| Field label | "What would you like to improve?" | Keep. | Good. |
| Placeholder | "Where does information break down, or which decision is hard to evaluate?" | "For example: two reports give different revenue figures, or the weekly stock report takes a day to build." | An example is more useful than a second question. |
| Field label | "How does this work today? (optional)" | Keep, with the existing placeholder. | Good. |
| Opt-in | "Occasionally send me Pattern Grid Insights by email. Optional." | "Send me occasional Pattern Grid articles by email (optional)." | "Insights" is a page name; the reader hears "articles". |
| Submit | "Request a Consultation" | "Send my enquiry" | The header says "Book a consultation", the button says "Request", the success message says "enquiry". One word: enquiry. If the founder prefers "consultation", use "Request a consultation" and change the success copy to match. |
| Privacy line | "We will use these details to respond to your enquiry. Read our Privacy Notice." | Keep. | From the brief. |
| **No-endpoint status message (visible on the live site)** | "This site is not yet connected to a form destination, so nothing was sent. Your details are kept in the form. Once the approved destination is configured, this message becomes: “Thank you…”" | Until the endpoint exists: "We could not send this yet. Your details are still in the form. Please email us at [approved address] and we will reply from there." Once live: the existing success message. | The current text is a developer note shown to prospective clients. It also tells them the site is unfinished. Needs the real email (see §4). |
| Failure message | "Your enquiry could not be sent just now. Please try again, or email us directly and we will pick it up." | "Your enquiry could not be sent just now. Please try again, or email [approved address]." | "Email us directly" with no address anywhere on the site is a dead end. |
| Error strings | "Please enter your name." etc. | Keep. | Fine. |

### 2.18 Shell: header, mega menus, drawer, footer (`shell.js`)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| Header CTA / drawer CTA / closings | "Book a Consultation" / "Book a Data & AI Consultation" / "Book a consultation" | One convention: "Book a consultation" in the header, drawer and every closing; "Book a Data & AI consultation" only where a longer label is wanted for context (never Title Case). | S5. The visual brief (later, and precedence) uses sentence case. |
| Header secondary link | "Readiness Assessment" | "Readiness assessment" | Case; and make every in-page link to it "Take the readiness assessment". |
| Mobile CTA | "Book" | "Book a call" | "Book" alone is ambiguous (a book?). Only if it fits at 320 px. |
| Mega link descriptions (`s.short`) | See per-service rows above. | — | These are the first descriptions most visitors read. |
| Mega aside | See §2.2. | — | — |
| Footer strapline | "The data systems behind better business decisions." | Keep. | From the brief. |
| Footer descriptor | "Data and AI consulting for African and international organisations." | Keep. | Supported. |
| Footer column | "COMPANY" | "ABOUT" | Matches the nav item. |
| Footer link | "Book a Consultation" | "Book a consultation" | S5. |
| Footer missing | (no email, no address) | Add the approved business email once supplied; nothing else. | The contact failure copy refers to emailing directly. |
| Motion toggle | "Reduce motion: off" | Keep. | Clear. |
| 404 | "The address may have changed. The home page and services are good places to continue." | Keep. | Honest and short. |

### 2.19 Legal placeholders (`pages/legal.js`)

| Location | Current copy | Proposed copy | Rationale |
|---|---|---|---|
| privacy.status | "The approved privacy notice is being prepared to reflect the actual form destination, analytics and assessment data flow before launch. Until then: enquiry details are used only to respond to you, and readiness-assessment answers stay in your browser session unless you choose to include a summary in an enquiry." | "The full privacy notice is being finalised. Until it is published: we use enquiry details only to reply to you, and readiness-assessment answers stay in your browser unless you choose to include a summary in an enquiry." | Removes the internal reasons ("form destination, analytics"). The two commitments stay. |
| terms.status | "Approved website terms are being prepared for publication and will appear here before launch." | "The website terms are being finalised and will be published here." | "Before launch" tells a visitor the site has not launched. |

---

## 3. Apply first: the 15 changes with the highest effect on understanding

1. **Contact: replace the developer note shown when no form endpoint is configured, and add the real email** (§2.17). A prospective client currently reads "This site is not yet connected to a form destination".
2. **Approach page: stop rendering `stages[*].change` on the stage cards; render `copy` instead** (§2.15). The cards currently describe an animation, not the engagement.
3. **One name for the consultation and one for the assessment, everywhere** (§2.18, S5): "Book a consultation" and "Take the readiness assessment", sentence case.
4. **Make every enquiry CTA say it is an enquiry** (S4): "Discuss your data strategy with us", "Discuss an automation idea with us", "Send us your question". Retire "Explore an AI use case" as a label for a form.
5. **Replace "intelligence" as a product noun in non-approved copy** (S1): Decide stage, industry CTAs, work index intro, Data Engineering intro.
6. **Replace "capability/capabilities" where it means "service"** (S2): home eyebrow, mega aside, services map heading, About "foundations" paragraph.
7. **Rewrite the five homepage service descriptions and their output chips in customer language** (§2.1). They are the first explanation of what Pattern Grid does after the hero.
8. **Services index: explain the relationship map in plain sentences and rename the heading "You do not need all five. Start with one."** (§2.2).
9. **Service template labels: "Related services", "How we would measure success", "See a sample deliverable", "Select any box"**; retire "artifact" and "node" (§2.3).
10. **Active voice for every "are agreed" sentence**: the deliverables line, the industries definition note, the engineering and BI FAQs, the executive-performance scenario (S3).
11. **Explain on first use, or replace: semantic model, lakehouse, lineage, curated, decision gate, bounded, deterministic, entity** (S7, §2.5–2.8, §2.10–2.11).
12. **Industry detail: rename "Metrics worth defining", "Data landscape / How the information relates", "A view worth building"; rewrite the repeated definition note** (§2.10).
13. **Assessment result: reorder the fine print, make the band descriptions concrete, rename "Discuss My Priorities" to say it sends an enquiry** (§2.16).
14. **Work detail: shorten the three secondary disclaimers while keeping the two mandated ones verbatim** (§2.11, S8).
15. **About: resolve "beliefs" vs "commitments", hide the empty team frames, fix the "Her" antecedent on the home founder paragraph, and reword the founder's attribution sentence** (§2.13–2.14).

Two housekeeping items that make the above stick: (a) delete or quarantine the superseded service fields in `content.js` so there is one place to edit each line (S9); (b) delete `PG.heroData` or label it, since it holds sample figures that would need an "illustrative" marker if anyone ever renders it.

---

## 4. Things I cannot resolve without the founder

These are phrased as questions. No answer has been assumed anywhere in the proposals above.

1. **Contact details.** What is the approved business email? The contact page failure copy says "email us directly" and no address exists on the site. Is there an approved social profile to list?
2. **Form destination.** Is a form endpoint being configured before launch, or should the contact page rely on a mailto until then?
3. **"Enquiries are read by the consultant who would work with you."** Is this true as a standing commitment (that is, will Precious personally read every enquiry)? If not, it should come out.
4. **Engagement formats.** The three formats (Diagnose and prioritise / Design and implement / Enable and improve) are labelled "Proposed" in the brief and on the page. Are they confirmed? If yes, the word "Proposed" can go. If not, should the block be hidden until they are?
5. **Pricing and length.** Nothing on the site says whether a first conversation is free, how long a typical diagnose-and-prioritise engagement runs, or whether work is fixed-price or time-based. The brief forbids inventing these, so the copy stays silent. Would you like a single honest line (for example "The first conversation is free" or "We scope every engagement individually") once the facts are known?
6. **Maturity band label "Intelligent".** The proposal to rename it "Established" changes a label in the brief's scoring table. Do you want to keep "Intelligent"?
7. **"AI ready" band.** Do you want the top band to remain named "AI ready" given the safeguard that it "does not certify… suitability"? An alternative is "Advanced", which needs no disclaimer.
8. **Insights.** When will the first article be approved? Until then, the founder hero statement ("Explore her perspective…") and the "Insights" opt-in on the contact form both point at content that does not exist.
9. **Team block.** Should the three reserved portrait frames on About be hidden until profiles are approved (recommended), or is there a reason to show them?
10. **Service name.** Is the service "Data Engineering & Platforms" (nav, footer, service page) or "Data Engineering" (contact form select, services map)? One name is needed.
11. **Sectors served.** Should the four industries be presented as the only sectors, or should the "Another data-intensive sector?" invitation be more prominent? The copy currently implies both.
12. **Geographic wording.** "Data and AI consulting for African and international organisations" is used. Is "Nigeria" or "Lagos" to be named anywhere (the master brief allows this only once coverage is confirmed)?
13. **Founder biography.** The biography and "Selected experience" paragraph are the brief's proposed copy. Have they been approved as published, and is there any credential, speaking appearance or writing that can be added with evidence?
14. **Legal pages.** Are the privacy notice and terms being drafted by someone? The current status boxes tell visitors the site has not launched.
