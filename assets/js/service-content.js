// Expanded service content model + original line-icon set (24-unit grid, stroke 1.75, round caps)
(function () {
  const PG = window.PG;
  PG.icons = {
    compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M14.8 9.2l-1.6 4.4-4.4 1.6 1.6-4.4 4.4-1.6Z',
    database: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    chart: 'M4 20h16 M7 16v-5 M12 16V7 M17 16v-8',
    workflow: 'M4 6h5v4H4Z M15 14h5v4h-5Z M9 8h3a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h-1 M4 14h5v4H4Z',
    book: 'M5 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H5V4Z M19 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6V4Z',
    clipboard: 'M9 4h6v3H9Z M7 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1 M8.5 12h7 M8.5 16h5',
    target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
    grid: 'M4 4h6v6H4Z M14 4h6v6h-6Z M4 14h6v6H4Z M14 14h6v6h-6Z',
    network: 'M12 3v5 M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M12 8v4 M12 12l-6 4 M12 12l6 4',
    shield: 'M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z M9 12l2 2 4-4',
    route: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M6 15V11a3 3 0 0 1 3-3h6 M18 9v4a3 3 0 0 1-3 3h-4',
    key: 'M15 11a4 4 0 1 0-3.9-3 M11.5 8.5L4 16v4h4l1.5-1.5v-2h2l1.5-1.5 M15 7a1 1 0 1 0 0 .1',
    layers: 'M12 4l8 4-8 4-8-4 8-4Z M4 12l8 4 8-4 M4 16l8 4 8-4',
    search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z M20 20l-4-4',
    users: 'M9 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M3 20a6 6 0 0 1 12 0 M16 5.5a3 3 0 0 1 0 6 M17 14.5a5 5 0 0 1 4 5',
    code: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5l-3 14',
    repeat: 'M4 12a8 8 0 0 1 13.7-5.7L20 8 M20 4v4h-4 M20 12a8 8 0 0 1-13.7 5.7L4 16 M4 20v-4h4'
  };
  PG.icon = (id) => PG.icons[id] || PG.icons.grid;
  window.dispatchEvent(new Event('pg-content'));

  const svc = (slug) => PG.services.find(s => s.slug === slug);
  const ext = {
    'data-ai-strategy': {
      icon: 'compass', heading: 'Give your data investment a clear direction.',
      intro: ['Data and AI initiatives often accumulate faster than the organisation\'s ability to connect them. A dashboard request, a new platform and an AI pilot can each appear useful while competing for the same people and attention.', 'We help you decide which business decisions to improve first, what you need in place to improve them, and in what order to build it. Before you commit budget, you see who owns each piece, what depends on what, and the trade-offs.'],
      situations: ['Departments are pursuing disconnected initiatives', 'A platform purchase is being considered before requirements are clear', 'Leadership wants a credible AI starting point', 'Important metrics have no shared definition or owner'],
      outcomeText: 'One agreed direction, a ranked list of what to build, and the evidence to decide what to fund first.',
      deliverables: [
        { id: 'assessment', icon: 'clipboard', title: 'Current-state assessment', desc: 'A structured view of your data sources, reporting, people and operating practices, showing the gaps that matter to your business priorities.' },
        { id: 'kpi-map', icon: 'target', title: 'Decision and KPI map', desc: 'A shared map of the decisions to improve, the measures needed to support them and the owners responsible for definitions and use.' },
        { id: 'portfolio', icon: 'grid', title: 'Ranked list of opportunities', desc: 'A considered set of data and AI opportunities assessed against business value, feasibility, data readiness and the effort required to deliver them.' },
        { id: 'architecture', icon: 'network', title: 'Target architecture', desc: 'A picture of the systems and data flows you would need, with each option weighed against what you already run and can support.' },
        { id: 'governance', icon: 'shield', title: 'Governance and ownership model', desc: 'Defined responsibilities for data, metrics and decisions, including how issues are escalated and changes to important definitions are agreed.' },
        { id: 'roadmap', icon: 'route', title: 'Phased delivery roadmap', desc: 'A sequenced plan that connects initiatives, dependencies, a named owner for each step and a review point before each phase starts, with the assumptions and cost considerations written down.' }],
      approach: [
        { name: 'Align', activity: 'Agree the business questions, stakeholders and outcomes.', output: 'A decision brief and agreed scope.', preview: ['Decision brief', 'Stakeholder map', 'Scope and exclusions'] },
        { name: 'Assess', activity: 'Review the current systems, data, skills and ways of working.', output: 'An evidence-based baseline and gap register.', preview: ['Source inventory', 'Reporting review', 'Gap register'] },
        { name: 'Prioritise', activity: 'Compare opportunities using agreed criteria.', output: 'A ranked list of opportunities, with the reasons, assumptions and dependencies for each.', preview: ['Value / feasibility / readiness / effort', 'Ranked portfolio', 'Assumptions log'] },
        { name: 'Design', activity: 'Define the target capabilities and operating responsibilities.', output: 'Architecture options and an ownership model.', preview: ['Architecture options', 'Ownership model', 'Escalation routes'] },
        { name: 'Sequence', activity: 'Set the delivery order and review points.', output: 'A roadmap that leadership and delivery teams can act on.', preview: ['Phased roadmap', 'Decision gates', 'Investment considerations'] }],
      feedback: null,
      flow: { title: 'How a business question becomes a delivery priority.',
        nodes: [
          { id: 'obj', col: 1, row: 1, label: 'Business objectives', kind: 'input', note: 'The decisions leadership wants to improve, stated as questions with an owner.' },
          { id: 'evi', col: 1, row: 3, label: 'Current-state evidence', kind: 'input', note: 'Source inventory, reporting review, skills and operating practices.' },
          { id: 'port', col: 2, row: 2, label: 'Opportunity portfolio', kind: 'process', note: 'Candidate data and AI opportunities described in business terms.' },
          { id: 'gate', col: 3, row: 2, label: 'Prioritisation check', sub: 'Value · Feasibility · Readiness · Effort', kind: 'gate', note: 'Four visible criteria, applied the same way to every opportunity.' },
          { id: 'road', col: 4, row: 1, label: 'Delivery roadmap', kind: 'output', note: 'Ready initiatives, sequenced with owners and decision gates.' },
          { id: 'pre', col: 4, row: 3, label: 'Needs a foundation first', kind: 'exception', note: 'Opportunities that lack a necessary foundation, with the gap named.' }],
        edges: [
          { from: 'obj', to: 'port', type: 'normal' }, { from: 'evi', to: 'port', type: 'normal' }, { from: 'port', to: 'gate', type: 'normal' },
          { from: 'gate', to: 'road', type: 'normal', label: 'Ready to sequence' }, { from: 'gate', to: 'pre', type: 'exception', label: 'Foundation needed' },
          { from: 'pre', to: 'port', type: 'feedback', label: 'Reassess once addressed' }],
        band: ['Business sponsor', 'Data owner', 'Delivery lead'], bandTitle: 'Ownership' },
      example: { question: 'Which should come first: new dashboards, better source integration or an AI reporting assistant?', steps: ['A source inventory shows the dashboards and the assistant both depend on sales and finance data that is still reconciled by hand.', 'A metric review finds two definitions of net sales in use, with no agreed owner.', 'The sequence becomes: agree the metric definitions (Finance lead) → integrate the two sources (Data owner) → rebuild the executive dashboards → pilot the assistant on the checked figures.'] },
      tech: [{ name: 'Microsoft Fabric and Azure', role: 'Assess platform fit and architecture options against the existing estate.', status: 'public' }, { name: 'Power BI and SQL', role: 'Examine reporting needs, existing models and access to evidence.', status: 'public' }, { name: 'Excel', role: 'Transparent opportunity comparisons and roadmap working models where appropriate.', status: 'public' }],
      methods: ['Stakeholder interviews', 'Source inventories', 'Maturity assessment'],
      measures: ['Priority initiatives with an accountable owner', 'Critical metrics with an agreed definition', 'Unresolved dependencies', 'Progress through agreed decision gates'],
      faqs: [{ q: 'Do we need a mature data team?', a: 'No. The assessment starts with the people and systems you have, then identifies the capabilities needed for the next stage.' }, { q: 'Does strategy require a new platform?', a: 'No. The roadmap can work with what you already have. We would only recommend a new platform when a specific requirement needs it and we have assessed what the change involves.' }, { q: 'What should we bring to the first discussion?', a: 'A business priority, examples of important reports and an outline of the systems involved are useful starting points.' }],
      closing: 'Give your next investment a clear purpose.', cta: 'Discuss your data strategy with us', relatedServices: ['data-engineering', 'business-intelligence']
    },
    'data-engineering': {
      icon: 'database', heading: 'Make the path from source to answer dependable.',
      intro: ['When reporting depends on manual exports, copied spreadsheets and undocumented fixes, every change creates another opportunity for the numbers to drift. The result is a fragile process that becomes harder to maintain as the business grows.', 'We build the data pipelines and platform behind your reporting. We connect the sources you agree, record every step the data goes through, check it as it arrives, and shape it so reports and automation can use it. We also agree who keeps it running once we have left.'],
      situations: ['ERP, CRM and finance data remain separate', 'Reporting relies on repeated file handling', 'Pipelines fail without clear ownership', 'The current data estate cannot support a new analytical requirement'],
      outcomeText: 'Data that arrives on schedule, has been checked, shows where it came from, and has a named person keeping it running.',
      deliverables: [
        { id: 'blueprint', icon: 'network', title: 'Source and integration blueprint', desc: 'A documented view of the systems, data interfaces and refresh requirements, including access dependencies and the rules for bringing information together.' },
        { id: 'pipelines', icon: 'workflow', title: 'Implemented data pipelines', desc: 'Repeatable ingestion and transformation workflows for the agreed sources, with scheduling, failure handling and clear ownership of the operating process.' },
        { id: 'models', icon: 'database', title: 'Data warehouse or lakehouse', desc: 'Data structures designed around the required analysis, with consistent keys, documented transformations and a clear path from raw inputs to usable outputs.' },
        { id: 'quality', icon: 'shield', title: 'Data quality controls', desc: 'Checks for agreed completeness, validity and reconciliation rules, with exceptions recorded visibly and routed to an owner for investigation and resolution.' },
        { id: 'lineage', icon: 'key', title: 'Who can see what, and where each number comes from', desc: 'A view of who can access which information and how important outputs connect to their source data, transformations and agreed ownership responsibilities.' },
        { id: 'ops', icon: 'book', title: 'Operating guide and runbooks', desc: 'Deployment guidance, monitoring definitions and practical runbooks so the operating team can understand routine tasks, investigate failures and manage agreed changes.' }],
      approach: [
        { name: 'Discover', activity: 'Inventory sources, interfaces, volumes and refresh needs.', output: 'A written agreement of what each source will supply, how often, and in what form.', preview: ['Source contract', 'Interface list', 'Refresh requirements'] },
        { name: 'Design', activity: 'Choose the target architecture, models and access boundaries.', output: 'An agreed architecture and implementation plan.', preview: ['Architecture decision', 'Model design', 'Access boundaries'] },
        { name: 'Build', activity: 'Implement ingestion, transformation and reusable data structures.', output: 'Working pipelines and documented models.', preview: ['Ingestion pipelines', 'Transformations', 'Documented models'] },
        { name: 'Validate', activity: 'Test data quality, reconciliation, failure paths and representative workloads.', output: 'Test evidence and a prioritised issue list.', preview: ['Reconciliation results', 'Failure-path tests', 'Issue list'] },
        { name: 'Hand over', activity: 'Establish monitoring, runbooks and ownership.', output: 'An operational handover and agreed support responsibilities.', preview: ['Monitoring definitions', 'Runbooks', 'Support responsibilities'] }],
      feedback: { from: 3, to: 2, label: 'A failed test returns work to Build. Production readiness follows agreed acceptance checks.' },
      flow: { title: 'From disconnected sources to a trusted data foundation.',
        nodes: [
          { id: 'erp', col: 1, row: 1, label: 'ERP', kind: 'input', note: 'Orders, shipments and stock movements.' },
          { id: 'crm', col: 1, row: 2, label: 'CRM', kind: 'input', note: 'Customers, outlets and account owners.' },
          { id: 'files', col: 1, row: 3, label: 'Operational files', kind: 'input', note: 'Spreadsheets and exports that still carry real business information.' },
          { id: 'int', col: 2, row: 2, label: 'Data arrives', kind: 'process', note: 'Raw inputs arrive on a schedule with the source and load time recorded.' },
          { id: 'gate', col: 3, row: 2, label: 'Quality checks', kind: 'gate', note: 'Completeness, validity and reconciliation rules agreed with the business.' },
          { id: 'cur', col: 4, row: 1, label: 'Checked, organised data', kind: 'output', note: 'Warehouse or lakehouse structures with consistent keys and documented transformations.' },
          { id: 'exc', col: 4, row: 3, label: 'Exception queue', kind: 'exception', note: 'Failing records held with a reason and an owner until corrected.' },
          { id: 'bi', col: 5, row: 1, label: 'Business Intelligence', kind: 'use', note: 'Reporting and analysis on trusted data.' },
          { id: 'ai', col: 5, row: 2, label: 'AI and operational applications', kind: 'use', note: 'Workflows that need dependable inputs.' }],
        edges: [
          { from: 'erp', to: 'int', type: 'normal' }, { from: 'crm', to: 'int', type: 'normal' }, { from: 'files', to: 'int', type: 'normal' },
          { from: 'int', to: 'gate', type: 'normal' }, { from: 'gate', to: 'cur', type: 'normal', label: 'Passes checks' }, { from: 'gate', to: 'exc', type: 'exception', label: 'Fails a check' },
          { from: 'exc', to: 'gate', type: 'feedback', label: 'Corrected and revalidated' }, { from: 'cur', to: 'bi', type: 'normal' }, { from: 'cur', to: 'ai', type: 'normal' }],
        band: ['Access', 'Lineage', 'Monitoring', 'Ownership'], bandTitle: 'Governance' },
      example: { question: 'Can sales, inventory and customer information support the same commercial view?', steps: ['Product, customer and period keys are agreed as the shared identifiers across the three sources.', 'A stock record for an outlet code that does not exist in the customer master fails validation and is held in the exception queue with a named owner.', 'Once corrected, the record is revalidated and the curated model exposes one documented commercial view that BI can consume.'] },
      tech: [{ name: 'Microsoft Fabric', role: 'An option for connected data engineering, storage and analytical workloads within a shared platform.', status: 'public' }, { name: 'Azure', role: 'Cloud services selected for the agreed integration, storage, access and operating requirements.', status: 'public' }, { name: 'SQL', role: 'Queries, transformations, data modelling and validation against agreed business rules.', status: 'public' }, { name: 'APIs and source connectors', role: 'Controlled integration with your actual applications and data interfaces.', status: 'public' }],
      methods: [],
      measures: ['Completed loads within the required freshness window', 'Reconciliation variance', 'Unresolved exceptions', 'Recovery time', 'Completeness of runbooks and operating ownership'],
      faqs: [{ q: 'Can you work with our existing systems?', a: 'Yes. We start from the systems you already have. We would only suggest replacing or migrating one when the requirement and the business case justify it.' }, { q: 'Will the data update in real time?', a: 'Refresh frequency depends on the decision, the source interfaces and the operating cost. A daily or scheduled process may be appropriate; real time is not assumed.' }, { q: 'Who maintains the platform?', a: 'That is agreed with you during the engagement and written into the handover: who owns it, who monitors it, who supports it.' }],
      closing: 'Build a foundation your teams can rely on.', cta: 'Discuss your data platform with us', relatedServices: ['business-intelligence', 'ai-automation']
    },
    'business-intelligence': {
      icon: 'chart', heading: 'Give every important number a clear meaning.',
      intro: ['A dashboard is only useful when the people using it understand the measures, trust the source and know which question to ask next. Different definitions, inconsistent filters and disconnected reports can make a polished interface difficult to use for a real decision.', 'Pattern Grid brings metric design, data modelling and reporting into one connected piece of work. We agree what performance means, build views around the audience\'s decisions and make it possible to inspect the numbers behind an exception. The aim is a management meeting where everyone is looking at the same number and can see where it came from.'],
      situations: ['Departments disagree on the same KPI', 'Executive reports require extensive manual preparation', 'Users cannot explain a chart\'s figures', 'Existing dashboards attract little meaningful use'],
      outcomeText: 'Numbers that agree across departments, reports built around real questions, and a routine for finding the cause and assigning someone to act.',
      deliverables: [
        { id: 'dictionary', icon: 'book', title: 'KPI dictionary', desc: 'Clear definitions for the agreed measures, including calculation rules, reporting periods, owners, exclusions and the business decisions each measure is intended to support.' },
        { id: 'semantic', icon: 'layers', title: 'Shared calculation model', desc: 'A reusable model that brings relationships and calculation logic together, so reports can work from consistent measures and agreed analytical structures.' },
        { id: 'suite', icon: 'chart', title: 'Reporting suite', desc: 'Executive, commercial or operational views designed around the questions each audience needs to answer, with purposeful navigation and readable visual hierarchy.' },
        { id: 'drill', icon: 'search', title: 'Routes from a headline number to the detail behind it', desc: 'Defined routes from a high-level exception to the underlying period, product, customer or operating unit, with context preserved as the user investigates.' },
        { id: 'validation', icon: 'shield', title: 'Proof the reports reconcile, and who can see them', desc: 'Reconciliation evidence, test scenarios and documented access rules so users and owners understand how the reporting has been checked and shared.' },
        { id: 'adoption', icon: 'users', title: 'Adoption and reporting guide', desc: 'Practical guidance on interpreting the reports, maintaining key definitions and running the management discussions and follow-up actions they are intended to support.' }],
      approach: [
        { name: 'Define', activity: 'Agree audiences, decisions and metric meanings.', output: 'The decision brief and KPI dictionary.', preview: ['Net sales — definition, period, owner', 'Gross margin — definition, exclusions', 'Audience: executive, commercial'] },
        { name: 'Model', activity: 'Design relationships and reusable calculations.', output: 'A semantic model and calculation specifications.', preview: ['Sales ↔ Product ↔ Period', 'Measure: Net sales = Gross − Returns', 'Measure: Variance to plan'] },
        { name: 'Design', activity: 'Prototype the reporting and investigation experience.', output: 'A reviewed report structure and navigation model.', preview: ['Executive summary page', 'Exception → product → region drill', 'Navigation model'] },
        { name: 'Validate', activity: 'Reconcile values and test filters, access and representative questions.', output: 'Acceptance evidence and resolved reporting issues.', preview: ['Reconciled to finance ledger', 'Filter and access tests', 'Issue list resolved'] },
        { name: 'Embed', activity: 'Introduce the reports into the team\'s working rhythm.', output: 'User guidance, ownership and an improvement backlog.', preview: ['Monthly review agenda', 'Metric owner roster', 'Improvement backlog'] }],
      feedback: null,
      flow: { title: 'From a trusted measure to an accountable action.',
        nodes: [
          { id: 'data', col: 1, row: 1, label: 'Curated business data', kind: 'input', note: 'Trusted, documented data from the foundation.' },
          { id: 'dict', col: 1, row: 3, label: 'Approved KPI dictionary', kind: 'input', note: 'Agreed definitions, periods, owners and exclusions.' },
          { id: 'model', col: 2, row: 2, label: 'Shared semantic model', sub: 'One set of relationships and calculations', kind: 'process', note: 'The shared structure and calculation logic behind every report. One model, not one engine per department.' },
          { id: 'exec', col: 3, row: 1, label: 'Executive performance view', kind: 'output', note: 'Headline measures against plan for leadership.' },
          { id: 'ops', col: 3, row: 3, label: 'Operational investigation view', kind: 'output', note: 'The same measures by product, region and period for the people who act.' },
          { id: 'rev', col: 4, row: 2, label: 'Both audiences review the same figure', kind: 'gate', note: 'Both audiences discuss one figure with one meaning.' },
          { id: 'act', col: 5, row: 2, label: 'Assigned action', kind: 'use', note: 'A named role, a follow-up and a date to re-check.' }],
        edges: [
          { from: 'data', to: 'model', type: 'normal' }, { from: 'dict', to: 'model', type: 'normal' }, { from: 'model', to: 'exec', type: 'normal' }, { from: 'model', to: 'ops', type: 'normal' },
          { from: 'exec', to: 'rev', type: 'normal' }, { from: 'ops', to: 'rev', type: 'normal' }, { from: 'rev', to: 'act', type: 'normal' },
          { from: 'act', to: 'rev', type: 'feedback', label: 'Outcome informs the next review' }, { from: 'rev', to: 'dict', type: 'feedback', label: 'Definition change returns to the metric owner' }],
        band: ['Metric owner', 'Report owner', 'Review chair'], bandTitle: 'Ownership' },
      example: { question: 'Why is net sales 4% behind plan this period?', steps: ['Gross sales 10.0m less returns 0.4m equals net sales 9.6m (sample units). Against a plan of 10.0m the variance is −0.4m, or −4%.', 'Before exploring products or regions, the return treatment, reporting period and source of the measure are inspected in the metric card.', 'The next question to investigate is whether returns are concentrated in one product line. Follow-up owner: Commercial finance lead.'] },
      tech: [{ name: 'Power BI', role: 'Interactive reporting and analytical views shaped around the users\' decisions.', status: 'public' }, { name: 'DAX', role: 'Reusable calculations and measures within the Power BI semantic model.', status: 'public' }, { name: 'Power Query', role: 'Data preparation and transformation where it is appropriate to the reporting architecture.', status: 'public' }, { name: 'SQL and Microsoft Fabric', role: 'Source queries, trusted analytical data and platform integration where required.', status: 'public' }, { name: 'Excel', role: 'Existing analysis and controlled working models that need to connect to the reporting approach.', status: 'public' }],
      methods: [],
      measures: ['Time spent preparing the reporting cycle', 'Unresolved reconciliation differences', 'Use by the intended audience', 'Time needed to answer agreed questions', 'Completion of assigned follow-up actions'],
      faqs: [{ q: 'Can you improve reports we already use?', a: 'Yes. The starting point is the business questions, existing definitions, source data and the current reporting experience.' }, { q: 'Is this just building dashboards?', a: 'The work includes metric definitions, data models, report design, validation and adoption. The dashboard is one part of that system.' }, { q: 'How do we know the reports are useful?', a: 'We agree with you, before building, who will use the reports, which decisions they support and how we will judge success. After launch we check whether they are being used that way.' }],
      closing: 'Make your next performance review more useful.', cta: 'Discuss your reporting with us', relatedServices: ['data-engineering', 'capability-building']
    },
    'ai-automation': {
      icon: 'workflow', heading: 'Build a useful workflow around a well-defined task.',
      intro: ['Some work needs a reliable rule. Other work involves interpreting a document, finding relevant information or preparing a draft that a person will review. Choosing the right approach matters more than putting AI into every step.', 'We help you pick one task worth automating, build a pilot with clear limits, and connect it to the systems and people involved. We define what goes in, check what comes out, and make it explicit where a person takes over. The pilot\'s job is to show what works, where it fails and what it would take to run it properly.'],
      situations: ['Reporting involves repeated manual steps', 'Teams re-enter information between systems', 'Finding internal knowledge takes too long', 'An AI idea needs a realistic test before wider deployment'],
      outcomeText: 'A workflow that saves real time, has a named owner, shows you anything it could not handle, and has been tested before it goes live.',
      deliverables: [
        { id: 'opportunity', icon: 'search', title: 'Opportunity and process assessment', desc: 'A review of the task, existing process, inputs and effort, identifying where rules, integration or AI assistance could make a useful difference.' },
        { id: 'blueprint', icon: 'workflow', title: 'Workflow and control blueprint', desc: 'A clear design for triggers, steps, system connections and decision points, including where a person approves, corrects or takes over the work.' },
        { id: 'pilot', icon: 'code', title: 'Pilot with agreed limits', desc: 'A working implementation of an agreed use case, with defined inputs and limits so its behaviour can be evaluated before wider deployment decisions.' },
        { id: 'evaluation', icon: 'clipboard', title: 'Evaluation and test pack', desc: 'Representative test cases and results covering output quality, failure modes and operating requirements, with an explicit basis for deciding what happens next.' },
        { id: 'controls', icon: 'shield', title: 'Connections, sign-off steps and exception routes', desc: 'The agreed connections, access boundaries, approval steps and exception routes that make the workflow usable within the surrounding business process.' },
        { id: 'operating', icon: 'book', title: 'Operating and improvement guide', desc: 'Guidance for monitoring the workflow, reviewing outputs, handling failures and managing changes, with ownership and an improvement backlog clearly documented.' }],
      approach: [
        { name: 'Select', activity: 'Establish the task, process owner and baseline effort.', output: 'A bounded use-case brief.', preview: ['Task and owner', 'Baseline effort', 'Limits of the pilot'] },
        { name: 'Design', activity: 'Decide which steps follow fixed rules and which use AI, and set the checks for each.', output: 'A workflow blueprint and evaluation plan.', preview: ['Rule-based steps', 'AI-assisted steps (labelled)', 'Review and exception points'] },
        { name: 'Prototype', activity: 'Build against suitable representative inputs.', output: 'A pilot with explicit limitations.', preview: ['Representative inputs', 'Working pilot', 'Known limitations'] },
        { name: 'Evaluate', activity: 'Test normal cases, difficult cases and failures with users.', output: 'Results and a proceed, revise or stop decision.', preview: ['Normal / difficult / failure cases', 'Results against criteria', 'Proceed · Revise · Stop'] },
        { name: 'Integrate', activity: 'Connect the approved workflow to its operating environment.', output: 'Integration, monitoring and an accountable handover.', preview: ['System connections', 'Monitoring', 'Accountable owner'] }],
      feedback: { from: 3, to: 2, label: 'If the results miss the agreed criteria, we go back to the pilot. A good demo is not a finished system.' },
      flow: { title: 'How a request becomes an approved action, with a person deciding.',
        nodes: [
          { id: 'req', col: 1, row: 1, label: 'Request or event', kind: 'input', note: 'A scheduled trigger or an authorised request.' },
          { id: 'auth', col: 2, row: 1, label: 'Authorised workflow', kind: 'gate', note: 'Access is checked before any evidence is retrieved.' },
          { id: 'src', col: 2, row: 3, label: 'Approved records and documents', kind: 'input', note: 'Relevant evidence from sources the workflow is allowed to use.' },
          { id: 'prep', col: 3, row: 2, label: 'Proposed output', sub: 'Rule-based or AI-assisted · labelled “Proposed”', kind: 'process', note: 'The step prepares a proposal. It is never labelled verified.' },
          { id: 'chk', col: 4, row: 2, label: 'Validation checks', kind: 'gate', note: 'Required fields, references and business rules.' },
          { id: 'rev', col: 5, row: 1, label: 'Accountable review', kind: 'gate', note: 'A named person approves the next action or returns the item.' },
          { id: 'exc', col: 5, row: 3, label: 'Correction path', kind: 'exception', note: 'Missing evidence, failed checks or an unauthorised request stop here.' },
          { id: 'act', col: 6, row: 1, label: 'Approved action · recorded', kind: 'use', note: 'The action and the review outcome are logged for monitoring.' }],
        edges: [
          { from: 'req', to: 'auth', type: 'normal' }, { from: 'auth', to: 'prep', type: 'normal' }, { from: 'src', to: 'prep', type: 'normal', label: 'Evidence' }, { from: 'prep', to: 'chk', type: 'normal' },
          { from: 'chk', to: 'rev', type: 'normal', label: 'Checks pass' }, { from: 'chk', to: 'exc', type: 'exception', label: 'Missing evidence or failed check' }, { from: 'rev', to: 'act', type: 'normal', label: 'Approved' },
          { from: 'rev', to: 'exc', type: 'exception', label: 'Returned' }, { from: 'exc', to: 'prep', type: 'feedback', label: 'Corrected and re-proposed' }],
        band: ['Process owner', 'Reviewer', 'Monitoring'], bandTitle: 'Accountability' },
      example: { question: 'Can a weekly performance briefing be assembled with less repeated preparation?', steps: ['A scheduled process collects approved metrics and checks that every figure belongs to the same reporting period.', 'A draft briefing links each statement to the measure it describes. Where a figure is missing, the statement is flagged rather than written around.', 'The business owner reviews the draft. The missing-data example stops at review; it does not become a polished but unsupported answer.'] },
      tech: [{ name: 'Azure and SQL', role: 'Hosting, integration and access to controlled business records where appropriate.', status: 'public' }, { name: 'Power Automate', role: 'Triggers, connectors and approval steps for supported business workflows.', status: 'option' }, { name: 'Azure AI Search', role: 'Retrieval of relevant indexed information for a knowledge workflow, with access restrictions designed explicitly.', status: 'option' }, { name: 'Azure Document Intelligence', role: 'Extraction of text, tables or fields from suitable documents for downstream validation.', status: 'option' }, { name: 'Approved model service', role: 'A selected model for the bounded interpretation or drafting task, evaluated against the use case.', status: 'option' }, { name: 'Application APIs', role: 'Controlled connection to the systems where an approved result needs to be used.', status: 'public' }],
      methods: [],
      measures: ['Manual handling time', 'Completion time', 'Proportion of outputs passing the agreed checks', 'Exception rate', 'Reviewer correction effort', 'Operating cost'],
      faqs: [{ q: 'Do we need AI for every automation?', a: 'No. If a clear rule can do the job, we use the rule.' }, { q: 'How are errors handled?', a: 'The design includes agreed checks, exception routes and review responsibilities. Evaluation should identify both the useful behaviour and the cases that need intervention.' }, { q: 'What makes a good first pilot?', a: 'A bounded task with available information, a clear owner and a practical way to compare the result with the current process.' }],
      closing: 'Choose one useful task. Build the evidence.', cta: 'Discuss an automation idea with us', relatedServices: ['data-ai-strategy', 'data-engineering']
    },
    'capability-building': {
      icon: 'book', heading: 'Train your people on the work they actually do.',
      intro: ['A new system stays dependent on whoever built it unless your team has practised on it, questioned it and taken it over. A slide deck or a course certificate does not show that someone can do the job.', 'Pattern Grid shapes capability building around roles and real business responsibilities. Leaders learn to interpret and challenge information. Analysts practise modelling, analysis and reporting. Technical teams work through the tasks needed to maintain the platform. The programme combines a clear starting baseline, guided practice and evidence of independent use.'],
      situations: ['Reports are widely available but poorly understood', 'Knowledge sits with one specialist', 'A delivery project needs a proper handover', 'Teams need practical data and AI skills tied to their roles'],
      outcomeText: 'A team that can do the agreed tasks without us, knows what it is responsible for, and keeps the routines going.',
      deliverables: [
        { id: 'baseline', icon: 'users', title: 'Role and skills baseline', desc: 'A view of the tasks each group needs to perform and the current capability gaps, judged by watching people do the task, not by asking how confident they feel.' },
        { id: 'pathways', icon: 'route', title: 'Tailored learning pathways', desc: 'A role-specific sequence of topics and practice linked to the team\'s responsibilities, existing tools and the outcomes the organisation needs to sustain.' },
        { id: 'labs', icon: 'code', title: 'Guided practical labs', desc: 'Exercises using agreed business examples or suitable sample data, with clear tasks, worked guidance and opportunities to practise the skills required in daily work.' },
        { id: 'assessment', icon: 'clipboard', title: 'Practical assessment pack', desc: 'Work-based tasks and review criteria that help demonstrate what participants can perform independently and where further practice or support is needed.' },
        { id: 'playbooks', icon: 'book', title: 'Playbooks and handover materials', desc: 'Usable reference guides, templates and operating instructions that connect the learning to the actual reports, data processes or workflows the team will own.' },
        { id: 'reinforce', icon: 'repeat', title: 'Adoption and reinforcement plan', desc: 'An agreed plan for champions, clinics or follow-up reviews where included in scope, using observed use and feedback to guide further support.' }],
      approach: [
        { name: 'Baseline', activity: 'Identify the roles, tasks and current capability.', output: 'A skills and responsibility map.', preview: ['Roles and tasks', 'Current capability evidence', 'Responsibility map'] },
        { name: 'Design', activity: 'Set role-specific learning outcomes and suitable examples.', output: 'Learning pathways and practical tasks.', preview: ['Learning outcomes by role', 'Practical tasks', 'Approved examples'] },
        { name: 'Practise', activity: 'Facilitate guided work using appropriate data and tools.', output: 'Completed exercises and specific feedback.', preview: ['Guided labs', 'Completed exercises', 'Specific feedback'] },
        { name: 'Demonstrate', activity: 'Assess the agreed tasks through practical work.', output: 'Evidence of independent capability and remaining gaps.', preview: ['Work samples', 'Review against criteria', 'Remaining gaps'] },
        { name: 'Reinforce', activity: 'Connect learning to daily use and support ownership.', output: 'Playbooks, champions and an agreed follow-up plan.', preview: ['Playbooks', 'Champions', 'Follow-up plan'] }],
      feedback: { from: 3, to: 2, label: 'If someone cannot yet do a task, they practise it again. Attending a session does not count as being able to do it.' },
      flow: { title: 'From guided practice to independent capability.',
        nodes: [
          { id: 'role', col: 1, row: 1, label: 'Role requirements', kind: 'input', note: 'The tasks a leader, analyst or engineer must perform.' },
          { id: 'base', col: 1, row: 3, label: 'Baseline evidence', kind: 'input', note: 'What people can do today, observed rather than self-reported.' },
          { id: 'plan', col: 2, row: 2, label: 'Tailored practice plan', kind: 'process', note: 'Relevant tasks, examples and guided sessions.' },
          { id: 'sample', col: 3, row: 2, label: 'Work sample', kind: 'process', note: 'Something produced by the participant, not a slide watched.' },
          { id: 'review', col: 4, row: 2, label: 'Review against criteria', kind: 'gate', note: 'Agreed rubric for the task.' },
          { id: 'ind', col: 5, row: 1, label: 'Independent workplace use', kind: 'use', note: 'The task performed in daily work without external help.' },
          { id: 'gap', col: 5, row: 3, label: 'Remaining gap', kind: 'exception', note: 'Named and returned to targeted practice.' },
          { id: 'play', col: 6, row: 1, label: 'Playbook and future priorities', kind: 'output', note: 'Evidence from real use improves the playbook.' }],
        edges: [
          { from: 'role', to: 'plan', type: 'normal' }, { from: 'base', to: 'plan', type: 'normal' }, { from: 'plan', to: 'sample', type: 'normal' }, { from: 'sample', to: 'review', type: 'normal' },
          { from: 'review', to: 'ind', type: 'normal', label: 'Demonstrated' }, { from: 'review', to: 'gap', type: 'exception', label: 'Not yet' }, { from: 'gap', to: 'plan', type: 'feedback', label: 'Targeted practice' },
          { from: 'ind', to: 'play', type: 'normal' }, { from: 'play', to: 'plan', type: 'feedback', label: 'Future learning priorities' }],
        band: ['Participant', 'Line manager', 'Champion'], bandTitle: 'People' },
      example: { question: 'Can the internal team sustain a newly delivered reporting suite?', steps: ['An analyst practises updating a measure; a business user explains a performance exception; an owner demonstrates the reporting review process.', 'Each task has agreed criteria and an observable work sample.', 'Remaining gaps lead to further practice; documented independent tasks become part of the handover evidence.'] },
      tech: [{ name: 'Leaders and business users', role: 'Data literacy, KPI interpretation, Excel and Power BI consumption, with practical discussion of AI-assisted work where relevant.', status: 'public' }, { name: 'Analysts', role: 'Power BI, Power Query, DAX, SQL and Excel, applied to modelling, analysis and clear reporting.', status: 'public' }, { name: 'Data and technical teams', role: 'SQL, Microsoft Fabric, relevant Azure services and the operating practices needed for the implemented platform.', status: 'public' }, { name: 'Process owners and champions', role: 'The selected reporting or automation tools, review responsibilities, exception handling and practical handover.', status: 'public' }],
      techHeading: 'Learning tracks shaped around each role', techIntro: 'Each role learns the tools it will actually use. This is training for your team as part of an engagement, not a public course catalogue.',
      methods: [],
      measures: ['Agreed tasks completed independently', 'Quality against the task rubric', 'Use of the delivered tools', 'Issues resolved using the playbook', 'Reliance on external help over an agreed observation period'],
      faqs: [{ q: 'Is this only for technical teams?', a: 'No. Leaders, analysts, business users and technical teams need different forms of capability, each connected to their responsibilities.' }, { q: 'Can we use our own examples?', a: 'Yes, where the examples and data are suitable and approved. Sample data can be used where confidentiality or access makes that more appropriate.' }, { q: 'Can this run alongside implementation?', a: 'Yes. We can build the practice, documentation and handover into the delivery itself, so your team is ready to take over as the system is finished.' }],
      closing: 'Make your investment work through your people.', cta: 'Discuss training for your team', relatedServices: ['business-intelligence', 'data-engineering']
    }
  };
  Object.keys(ext).forEach(k => Object.assign(svc(k), ext[k]));

  PG.servicesOverview = {
    intro: 'You may need a clearer plan, data you can rely on, reporting people trust, or one repetitive task automated. We help you pick the right starting point and add the next step only when you need it.',
    situationsHeading: 'Start with the problem you need to solve.',
    situations: [
      { situation: 'We have initiatives but no shared priorities', slug: 'data-ai-strategy', expect: 'An honest picture of where you are, a ranked list of what to build and a roadmap in order.' },
      { situation: 'Our systems are disconnected', slug: 'data-engineering', expect: 'Data that arrives on schedule, can be traced to its source and has someone responsible for keeping it running.' },
      { situation: 'Teams report different numbers', slug: 'business-intelligence', expect: 'Shared metric definitions, useful reporting and a way to investigate differences.' },
      { situation: 'Repetitive work consumes the team', slug: 'ai-automation', expect: 'A bounded workflow, appropriate controls and evidence from a tested pilot.' },
      { situation: 'Our teams cannot sustain what has been built', slug: 'capability-building', expect: 'Practice on your own reports, written guides, and proof your team can do the work without us.' }],
    features: {
      'data-ai-strategy': { text: 'Decide which data and AI projects to fund first, and in what order. You get a roadmap with an owner for every step.', outputs: ['Current-state assessment', 'Opportunity portfolio', 'Delivery roadmap'] },
      'data-engineering': { text: 'Connect your ERP, CRM, finance and spreadsheet data so it arrives on schedule, is checked, and can be traced back to its source.', outputs: ['Data pipelines', 'Tested data models', 'Operating guide'] },
      'business-intelligence': { text: 'Give every important number one definition, one owner and one source, so finance, sales and operations stop arguing about which figure is right.', outputs: ['KPI dictionary', 'Reporting suite', 'Where each number comes from'] },
      'ai-automation': { text: 'Automate one repetitive task at a time. Every output is checked, anything unusual is held for a person, and someone named signs it off.', outputs: ['Workflow blueprint', 'Tested pilot', 'Sign-off rules'] },
      'capability-building': { text: 'Train your leaders, analysts and technical team on the reports and systems they will actually use, so the work does not depend on us afterwards.', outputs: ['Skills baseline', 'Role-based learning', 'Handover to your team'] }
    },
    mapHeading: 'You do not need all five. Start with one.',
    mapText: 'An engagement can begin with one capability. We connect the next steps when they are needed.',
    closing: { h: 'What needs to work better?', p: 'Bring a question, an unreliable report or a task you want to hand over. We will suggest a sensible place to begin.' }
  };
  PG.deliverablesLine = 'We agree the exact deliverables with you around your priorities, your systems and where you are starting from.';
  PG.techHeading = 'Technology shaped around your environment';
  PG.techIntro = 'We select tools around the problem, your existing estate and the people who will operate the solution.';

  const indNotes = {
    'financial-services': 'Reconciling transactions and agreeing shared measures is Data Engineering and Business Intelligence work. One automation we might pilot: routing reconciliation exceptions to a reviewer.',
    'fmcg-distribution': 'Stock, sales and route-to-market questions run through the Data Engineering pipeline and the Business Intelligence investigation example. Product, outlet and period are the keys everything is joined on.',
    'retail-ecommerce': 'Product, customer and channel analysis is Data Engineering and Business Intelligence work. A typical decision: look at availability alongside demand before changing the range or the stock levels.',
    'technology': 'Checking product-event quality and agreeing what counts as activation and retention is Data Engineering and Business Intelligence work. We only bring in AI for a specific, explained use, such as summarising support demand for review.'
  };
  PG.industries.forEach(i => { i.serviceNote = indNotes[i.slug]; });
  const workExt = {
    'executive-performance': { deliverables: ['Metric dictionary', 'Reconciled source model', 'Management view', 'Decision brief template'], approach: ['Define', 'Model', 'Design', 'Validate', 'Embed'], flow: 'Finance, sales and operations records → shared definitions → one management view → review → assigned action.', tech: ['SQL for reconciliation rules', 'Power BI semantic model and reporting', 'Excel for the working metric dictionary'] },
    'distribution-intelligence': { deliverables: ['Stock and sales data model', 'Availability vs demand view', 'Exception queue with owners', 'Operating runbook'], approach: ['Discover', 'Design', 'Build', 'Validate', 'Hand over'], flow: 'Sales, inventory and outlet sources → integration → quality gate → curated model → availability view → exception queue.', tech: ['SQL and a lakehouse-style curated model', 'Power BI for the investigation view', 'Scheduled pipelines with exception handling'] },
    'reporting-workflow': { deliverables: ['Workflow blueprint', 'Deterministic check set', 'Labelled AI-assisted draft step', 'Review and release log'], approach: ['Select', 'Design', 'Prototype', 'Evaluate', 'Integrate'], flow: 'Scheduled trigger → approved metrics → checks → proposed draft → accountable review → approved release, recorded.', tech: ['Rule-based checks in SQL', 'An approved model service for the labelled drafting step (option)', 'Power Automate-style approval routing (option)'] }
  };
  PG.work.forEach(w => Object.assign(w, workExt[w.slug]));
  const artLinks = [['business-intelligence', 'Which of our KPIs has more than one definition in use?'], ['data-ai-strategy', 'Which decision would this dashboard change?'], ['ai-automation', 'Where does a person need to review before an output is used?'], ['data-engineering', 'Which report still depends on a manual export?'], ['data-engineering', 'What must the existing environment support before a platform decision?'], ['business-intelligence', 'Where are sell-in and sell-out being compared as if they were the same?']];
  PG.articles.forEach((a, i) => { a.service = artLinks[i][0]; a.next = artLinks[i][1]; });

  const indGrids = {
    'financial-services': { title: 'customer_revenue_view · month 8', head: ['product', 'active customers', 'revenue', 'reconciliation'], rows: [['Current accounts', '48,210', '1.21m', 'matched'], ['Savings', '22,904', '0.64m', 'matched'], ['Cards', '15,377', '0.92m', '2 exceptions'], ['Loans', '6,118', '1.48m', 'matched']], note: 'Active customer uses a 30-day activity window. Two card transactions await reconciliation with a named owner.' },
    'fmcg-distribution': { title: 'sell_in_vs_sell_out · W36', head: ['territory', 'sell-in', 'sell-out', 'availability'], rows: [['North', '12,400', '11,980', '92%'], ['East', '9,800', '9,120', '41%'], ['West', '10,150', '9,870', '88%'], ['Central', '8,300', '8,010', '85%']], note: 'Sell-in (shipments to distributors) and sell-out (retail demand) are kept visibly distinct. East shows the availability gap.' },
    'retail-ecommerce': { title: 'channel_performance · W36', head: ['channel', 'conversion', 'avg order', 'return rate'], rows: [['Stores', '—', '18.40', '3.1%'], ['Ecommerce', '2.4%', '24.10', '9.8%'], ['Marketplace', '1.9%', '21.60', '11.2%'], ['Wholesale', '—', '412.00', '0.8%']], note: 'Attribution and period assumptions are stated with the view. Marketplace returns are the next question to investigate.' },
    'technology': { title: 'activation_retention · cohort view', head: ['cohort', 'activation', 'retention w4', 'support tickets'], rows: [['May', '61%', '44%', '128'], ['June', '64%', '46%', '141'], ['July', '58%', '39%', '212'], ['August', '66%', '—', '97']], note: 'Activation and retention use one shared definition. July\'s lower retention and higher support demand are surfaced together.' }
  };
  PG.industries.forEach(i => { i.grid = indGrids[i.slug]; });
})();
