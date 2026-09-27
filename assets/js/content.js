window.PG = {
  services: [
    { slug: "data-ai-strategy", index: "01", title: "Data & AI Strategy", short: "Decide which data and AI projects to do first, and why.", outcome: "A practical roadmap.", link: "Read about Data & AI Strategy", lead: "Define the decisions your business needs to improve, the data capabilities required and a practical sequence for investment.",
      heading: "A roadmap tied to business priorities.", related: "executive-performance" },
    { slug: "data-engineering", index: "02", title: "Data Engineering & Platforms", short: "Connect systems and build the models and pipelines that make business data dependable.", outcome: "Data you can rely on.", link: "Read about Data Engineering & Platforms", lead: "Connect the systems you already use and build dependable pipelines, models and platforms for reporting, analytics and AI.",
      heading: "Make the path from source to answer traceable.",
      tools: "Microsoft Fabric, Azure and SQL are among the platforms used where they fit the requirements and existing environment.", related: "distribution-intelligence" },
    { slug: "business-intelligence", index: "03", title: "Business Intelligence", short: "Give leaders consistent metrics and useful views of performance.", outcome: "Clearer business visibility.", link: "Read about Business Intelligence", lead: "Build consistent reporting and analytical views that help leaders understand performance and decide what needs attention.",
      heading: "Reporting that supports a useful conversation.", related: "executive-performance" },
    { slug: "ai-automation", index: "04", title: "AI & Automation", short: "Automate one repetitive task at a time, with checks and a person signing off.", outcome: "Less repetitive work.", link: "Read about AI & Automation", lead: "Identify practical opportunities, test them against real requirements and introduce automation with appropriate controls.",
      heading: "A useful workflow has a clear owner.",
      cta: "Explore an AI Use Case", related: "reporting-workflow" },
    { slug: "capability-building", index: "05", title: "Capability Building", short: "Help your people understand, use and maintain the systems you invest in.", outcome: "Skills that stay with your team.", link: "Read about Capability Building", lead: "Help people understand the data, use the systems and maintain the working practices behind reliable decisions.",
      heading: "Learning built around the work.", related: "executive-performance", starter: null }
  ],
  engagements: [
    { title: "Diagnose and prioritise", copy: "Understand the current position, agree the important questions and define a practical roadmap." },
    { title: "Design and implement", copy: "Build and validate an agreed data, reporting or automation capability, including operating responsibilities." },
    { title: "Enable and improve", copy: "If we continue working together: help with adoption, documentation and an agreed list of improvements." }
  ],
  industries: [
    { slug: "financial-services", title: "Financial Services & Fintech", h1: "A clearer view of customers, money and performance.", lead: "Connect operational, customer and financial data so teams can investigate performance with consistent definitions and traceable information.",
      question: "Where are customer activity, revenue and operational performance moving apart?",
      metrics: ["Active customers", "Transaction value and volume", "Revenue by product", "Retention", "Reconciliation exceptions", "Service performance"],
      note: "'Active customers' only means something once you have agreed the activity window. For investment platforms, assets under management, net flows and engagement may matter too. Definitions depend on your business. Nothing on this page is regulatory assurance or a compliance certification.",
      sources: ["Customer", "Transaction", "Finance", "Product", "Support"],
      image: "Contemporary financial district or precise architectural interior, human scale", caption: "Image direction: commissioned or licensed, accurately captioned.",
      capabilities: ["business-intelligence", "data-engineering", "data-ai-strategy"], related: "executive-performance", cta: "Discuss your financial services data" },
    { slug: "fmcg-distribution", title: "FMCG & Distribution", h1: "See what moves. Understand what does not.", lead: "Connect sales, stock, outlets and distribution activity to understand commercial performance across the route to market.",
      question: "Where are stock availability, outlet coverage and sales performance falling out of step?",
      metrics: ["Sales by channel and territory", "Active outlets", "Stock availability", "Sell-in and sell-out", "Returns", "Delivery performance", "Route productivity"],
      note: "Supplier shipments (sell-in) and actual retail demand (sell-out) are kept visibly distinct wherever both are available.",
      sources: ["Sales", "Inventory", "Outlets", "Distribution", "Finance"],
      image: "Distribution centre or orderly loading operation, strong geometry, natural light", caption: "Image direction: pictured facilities are not claimed as Pattern Grid or client sites.",
      capabilities: ["data-engineering", "business-intelligence", "ai-automation"], related: "distribution-intelligence", cta: "Discuss your stock and sales data" },
    { slug: "retail-ecommerce", title: "Retail & Ecommerce", h1: "Connect the customer journey to commercial performance.", lead: "Bring product, customer, sales and inventory information together to understand what people buy, where they return and what affects margin.",
      question: "Which products and customer behaviours create sustainable value?",
      metrics: ["Conversion", "Average order value", "Repeat purchase", "Gross margin", "Return rate", "Stock turnover", "Cohort retention"],
      note: "Channel, period and attribution assumptions are defined whenever examples are shown. Store, ecommerce, payment and inventory data can be connected around one product and customer model.",
      sources: ["Store", "Ecommerce", "Payments", "Inventory", "Customer"],
      image: "Framed retail shelving or contemporary store environment, no dominant unlicensed branding", caption: "Image direction: pair physical merchandise with a clean analytical diagram.",
      capabilities: ["business-intelligence", "data-ai-strategy", "capability-building"], related: "distribution-intelligence", cta: "Discuss your retail data" },
    { slug: "technology", title: "Technology", h1: "Understand what makes your product valuable over time.", lead: "Connect product behaviour, customer information and commercial performance to evaluate adoption, retention and operational priorities.",
      question: "Which behaviours lead to continued use, and where does the experience break down?",
      metrics: ["Activation", "Feature adoption", "Cohort retention", "Support demand", "Service reliability", "Unit economics"],
      note: "We only use recurring-revenue measures if that is how you charge. We describe the technical parts (which events you track, how one user is recognised across systems, shared definitions) in plain language.",
      sources: ["Product events", "CRM", "Billing", "Support", "Infrastructure"],
      image: "Editorial product-development environment or abstract instrument-like composition", caption: "Image direction: real employees only with approval; no stock office photography as the team.",
      capabilities: ["data-engineering", "business-intelligence", "ai-automation"], related: "reporting-workflow", cta: "Discuss your product data" }
  ],
  work: [
    { slug: "executive-performance", title: "A consistent view of executive performance", sector: "Cross-functional reporting", summary: "An illustrative reporting system that connects finance, sales and operations around shared definitions.",
      sections: [
        { h: "The question", p: "Three functions report performance from three systems. Leadership needs one view that each function can trace back to its own records." },
        { h: "Source reconciliation", p: "We line up finance, sales and operations records by reporting period and by what they describe (customer, product, outlet). Where they disagree, the difference is listed, not quietly fixed." },
        { h: "Metric dictionary", p: "Any reader can open an executive metric and see its definition, its period rule, its owner and where the figure came from." },
        { h: "Management view and decision brief", p: "A single management view presents the agreed metrics. A decision brief pairs each exception with evidence and a proposed next action." }],
      enable: ["Traceability from any executive figure to its source records", "A consistent, repeatable monthly reporting process", "Faster agreement on which number is correct"] },
    { slug: "distribution-intelligence", title: "Distribution intelligence from warehouse to outlet", sector: "FMCG & Distribution", summary: "An illustrative view of how stock, sales and outlet activity can be connected to identify commercial exceptions.",
      sections: [
        { h: "The question", p: "Where is outlet demand outpacing the stock that is actually available to serve it?" },
        { h: "Stock model", p: "Warehouse stock, in-transit quantities and outlet-level availability share one product and location model. Units and assumptions are written down alongside the sample data." },
        { h: "Sales view", p: "Sell-in and sell-out are compared by territory and outlet, with the difference shown explicitly." },
        { h: "Exception queue", p: "A rule flags outlets where demand exceeds available stock and assigns each exception to a review owner." }],
      enable: ["Earlier visibility of availability gaps by outlet", "A shared definition of demand versus shipments", "A review route with named ownership"] },
    { slug: "reporting-workflow", title: "A reporting workflow with human review", sector: "AI & Automation", summary: "An illustrative workflow that prepares a management report, checks its inputs and routes the draft for review.",
      sections: [
        { h: "The question", p: "Can a recurring management report be prepared with less manual effort while a person still approves what is published?" },
        { h: "Rule-based checks", p: "Rules confirm that inputs are complete, periods match and totals reconcile before any draft is produced." },
        { h: "AI-assisted summary", p: "A separate, labelled step drafts commentary from the checked figures. Its output is a proposal, not a decision." },
        { h: "Review and approved output", p: "A named reviewer sees the draft, its sources and the check results, then approves or returns it. Only the approved version is published." }],
      enable: ["Less manual assembly of recurring reports", "A visible record of checks and approvals", "Clear separation of automated, assisted and human steps"] }
  ],
  articles: [
    { title: "Why two departments can report different revenue numbers", summary: "How definitions, timing and source systems create disagreements, and how a shared metric framework can resolve them.", category: "Business Intelligence" },
    { title: "Before you build another dashboard, define the decision", summary: "A practical way to connect management questions, metrics and reporting design.", category: "Data Strategy" },
    { title: "Where AI belongs in a reporting workflow", summary: "How to distinguish reliable automation from assisted analysis, and where human review remains useful.", category: "AI for Business" },
    { title: "What a modern data platform should make easier", summary: "A business-focused explanation of integration, modelling, quality and ownership.", category: "Data Engineering" },
    { title: "Choosing a practical starting point for Microsoft Fabric", summary: "Questions to ask about the existing environment, operating requirements and intended use before choosing an architecture.", category: "Data Engineering" },
    { title: "The data foundations behind better distribution decisions", summary: "How sales, stock and outlet data can help teams investigate commercial exceptions.", category: "Leadership" }
  ],
  stages: [
    { name: "Connect", copy: "Bring information together from the systems your business already uses.", change: "Six named sources connect to a shared intake.", output: "A map of your connected sources" },
    { name: "Structure", copy: "Agree one definition for each measure, check the data as it arrives, and hold anything that fails.", change: "Records align; lineage, ownership and quality markers appear.", output: "Agreed definitions and data model" },
    { name: "Understand", copy: "Show what is happening, what is unusual, and what is driving it.", change: "A question becomes a small, readable analytical view.", output: "Reports built around your questions" },
    { name: "Automate", copy: "Reduce repetitive work and route the right information to the right people.", change: "A checked exception moves to a review queue with an owner.", output: "Tested workflows with a named reviewer" },
    { name: "Decide", copy: "Put the checked figures, and the evidence behind them, in front of the people making the decision.", change: "A decision brief shows the issue, evidence and proposed next action.", output: "A plan for who uses it and how often it is reviewed" }
  ],
  beliefs: [
    { title: "Begin with the decision.", copy: "Identify what needs to change before deciding which technology to use." },
    { title: "Make the numbers explainable.", copy: "Define metrics, sources and ownership so people can understand what they are seeing." },
    { title: "Design for use.", copy: "Build reporting and workflows around the people who will rely on them." },
    { title: "Leave a maintainable system.", copy: "Include documentation, ownership and capability in the delivery conversation." }
  ],
  assessment: [
    { key: "infrastructure", name: "Data infrastructure", question: "How does information move between your main business systems?", options: ["Mostly through separate files and manual exports.", "Some teams use repeatable imports, but important connections remain manual.", "Several core systems are connected, with gaps and limited monitoring.", "Core connections are managed, documented and monitored.", "Connections are monitored, owned and regularly improved as needs change."] },
    { key: "quality", name: "Data quality", question: "How do you identify and resolve problems in business data?", options: ["Problems are usually discovered when someone challenges a report.", "Individuals check important files, but the process depends on them.", "Some quality rules and issue owners are defined.", "Critical data has routine checks, named owners and tracked resolution.", "Quality is monitored across critical data and recurring causes are addressed."] },
    { key: "reporting", name: "Reporting", question: "How are regular management reports prepared?", options: ["Reports are assembled manually from several files.", "Templates exist, but preparation still requires substantial manual work.", "Some reports refresh automatically, while others remain disconnected.", "Most core reports use consistent models and an agreed reporting process.", "Reporting is reliable, maintained and reviewed for usefulness and effort."] },
    { key: "analytics", name: "Analytics", question: "How well can teams investigate why performance changes?", options: ["We mainly see headline totals and request additional files.", "A few individuals perform deeper analysis when asked.", "Teams can explore some common questions using shared views.", "Teams use consistent analytical models to investigate important drivers.", "Analysis routinely informs experiments, decisions and follow-up evaluation."] },
    { key: "automation", name: "Automation", question: "How are repetitive information tasks handled?", options: ["Most tasks rely on manual copying, checking and follow-up.", "A few personal scripts or shortcuts help individual users.", "Some shared workflows exist, with inconsistent ownership or monitoring.", "Important automated workflows have owners and exception handling.", "Workflows are monitored, reviewed and improved against agreed measures."] },
    { key: "ai", name: "AI adoption", question: "How is AI being used in business workflows?", options: ["We have no defined business use cases.", "Individuals experiment without an agreed organisational approach.", "Selected use cases are being tested with basic evaluation criteria.", "Bounded use cases have evaluation, access controls and review ownership.", "Established use cases are monitored and reassessed for quality and value."] },
    { key: "governance", name: "Governance", question: "How clear are ownership, access and definitions for important data?", options: ["Ownership, access decisions and definitions are mostly informal.", "Some responsibilities exist, but they are not consistently documented.", "Important owners and definitions are documented in some areas.", "Critical data has clear owners, access rules and agreed definitions.", "Ownership, access and definitions are maintained and regularly reviewed."] },
    { key: "decisions", name: "Decision practices", question: "How is information used in recurring business decisions?", options: ["Decisions rely mainly on individual judgement or inconsistent reports.", "Reports are reviewed, but follow-up and ownership vary.", "Key meetings use shared reports and some actions are tracked.", "Important decisions use agreed evidence, owners and recorded actions.", "Decisions and subsequent outcomes are reviewed to improve the process."] }
  ],
  bands: [
    { min: 0, label: "Fragmented", text: "Information is handled informally. The first step is shared definitions, named owners and a reliable way to move data between systems." },
    { min: 20, label: "Developing", text: "Some good practice exists, but it depends on individuals rather than on a process everyone follows." },
    { min: 40, label: "Connected", text: "Several pieces are in place. The gaps below are where a connected view is still breaking down." },
    { min: 60, label: "Intelligent", text: "Information is used routinely in recurring decisions, with agreed practices." },
    { min: 80, label: "AI ready", text: "Your self-reported foundations are strong enough to consider more advanced uses, including AI." }
  ],
  priorityMap: {
    governance: { service: "data-ai-strategy", text: "Clarify ownership, access rules and metric definitions as part of a data strategy review." },
    decisions: { service: "data-ai-strategy", text: "Connect recurring decisions to agreed evidence, owners and recorded actions." },
    quality: { service: "data-engineering", text: "Introduce routine checks and named owners for critical data." },
    infrastructure: { service: "data-engineering", text: "Replace manual exports with managed, monitored connections between core systems." },
    reporting: { service: "business-intelligence", text: "Move core reports onto consistent models and an agreed reporting process." },
    analytics: { service: "business-intelligence", text: "Give teams shared analytical views for investigating performance drivers." },
    automation: { service: "ai-automation", text: "Assess one bounded automation use case with clear ownership and exception handling." },
    ai: { service: "ai-automation", text: "Assess one bounded AI use case with evaluation criteria and review ownership." }
  },
  tieOrder: ["governance", "quality", "infrastructure", "reporting", "decisions", "analytics", "automation", "ai"]
};

// ---- Visual upgrade: image register (Unsplash License, free to use, attribution not required) ----
window.PG.img = (function () {
  const U = 'https://images.unsplash.com/photo-';
  const reg = {
    'lagos-bridge-night': ['1648023200201-8fcede127835', 'Lagos, Nigeria: a bridge over the lagoon at night with the city lit behind it', 'Opeyemi Adisa', '50% 60%', '62% 55%'],
    'lagos-aerial': ['1594538756542-8c88bda491c5', 'Aerial view of Lagos city buildings in daylight', 'Obinna Okerekeocha', '50% 50%'],
    'lagos-aerial-2': ['1744907895363-d351aa6019ef', 'Elevated view over busy Lagos streets and interconnected routes', 'Tunde Buremo', '50% 50%'],
    'lagos-bridge-traffic': ['1745725427994-30530297f537', 'Traffic on a Lagos bridge leading toward the cityscape', 'Vitalis Nwenyi', '50% 55%'],
    'lagos-tanks': ['1745725427797-d0b3e3b7a8af', 'Large industrial storage tanks beside the Lagos cityscape', 'Vitalis Nwenyi', '50% 50%'],
    'lagos-civic-towers': ['1618828665347-d870c38c95c7', 'Civic Towers, Lekki, Lagos under a blue sky', 'Nupo Deyon Daniel', '50% 40%'],
    'lagos-skyline': ['1559833064-6f4573ec1ac9', 'Lagos skyline in daylight', 'Stephen Olatunde', '50% 50%'],
    'lagos-highway': ['1745725427643-8994370391e6', 'Billboards over a busy Lagos highway', 'Vitalis Nwenyi', '50% 50%'],
    'wh-forklift': ['1740914994657-f1cdffdc418e', 'A forklift moving through a large warehouse aisle', 'Kseniia Ilinykh', '50% 55%', '55% 50%'],
    'wh-pallets': ['1721937127582-ed331de95a04', 'A warehouse floor filled with boxes and pallets', 'Ashley', '50% 50%'],
    'wh-racks': ['1789130963347-cc572f0e9be0', 'A picking cart beside tall storage racks in a fulfilment warehouse', 'Robin', '50% 50%'],
    'wh-tablet': ['1781559818983-c32838ee3d55', 'A warehouse worker in a high-visibility vest reviewing a work item on a tablet', 'Rodrigo Rodrigues', '50% 40%'],
    'wh-tablet-2': ['1781559818983-4180d744416a', 'A warehouse worker looking up at stock while holding a tablet', 'Rodrigo Rodrigues', '58% 38%', '72% 40%'],
    'wh-ladder': ['1740914994162-0b2a49280aeb', 'A worker on a ladder checking stock in a warehouse', 'Kseniia Ilinykh', '60% 45%', '68% 45%'],
    'aerial-vehicles': ['1565891741441-64926e441838', 'Aerial view of vehicles arranged in a distribution yard', 'Marcin Jozwiak', '50% 50%'],
    'aerial-highway': ['1734366513184-8c44c7527d85', 'Aerial view of a highway beside a large parking area', 'Chris Haig', '50% 50%'],
    'team-pens': ['1517048676732-d65bc937f952', 'Colleagues at a table working through notes together', 'Dylan Gillis', '50% 45%'],
    'team-laptops': ['1522071820081-009f0129c71c', 'A small group learning around a laptop', 'Annie Spratt', '50% 45%'],
    'team-talking': ['1568992688065-536aad8a12f6', 'Two colleagues in conversation at a table', 'Redd Francisco', '50% 40%'],
    'team-focus': ['1521737852567-6949f3f9f2b5', 'A working session photographed from the side with selective focus', 'Annie Spratt', '50% 45%'],
    'team-table': ['1573164574572-cb89e39749b4', 'A team seated at a long wooden table with laptops, examining a shared question', 'Christina Morillo', '50% 45%'],
    'team-review': ['1573167507387-6b4b98cb7c13', 'People at a conference table listening to a colleague speak', 'Christina Morillo', '50% 45%'],
    'team-whiteboard': ['1557804506-669a67965ba0', 'A product team working with laptops beside a whiteboard', 'Austin Distel', '50% 45%'],
    'team-meeting': ['1541746972996-4e0b0f43e02a', 'A group in a quiet meeting around a table', 'Mario Gogh', '50% 45%'],
    'team-white': ['1681949103006-70066fb25dfe', 'A team gathered around a white table in a modern workspace', 'Sable Flow', '50% 45%'],
    'arch-white': ['1500004621732-74cd4ad4d53e', 'A white building facade with repeated structural lines in sunlight', 'Amanda Marie', '50% 50%'],
    'arch-pathway': ['1560257084-d568f6eb7b29', 'An empty engineered corridor with a line of ceiling lights', 'Quentin Grignet', '50% 50%'],
    'arch-tunnel': ['1657463054055-a51c81728960', 'A dark passage with light crossing a row of windows', 'Katie Gerrard', '50% 50%', '70% 50%'],
    'arch-spiral': ['1469719847081-4757697d117a', 'A spiral concrete structure seen from below with converging lines', 'Aron Van de Pol', '50% 50%'],
    'arch-concrete': ['1532547616536-557a0d4d29ad', 'Light falling across a concrete wall inside a building', 'Natalya Letunova', '50% 50%'],
    'arch-highrise': ['1446797376004-9352dfc9f789', 'Looking up a high-rise facade toward a single point', 'Alex Padurariu', '50% 50%'],
    'arch-windows': ['1672832361712-a04ef36e3254', 'A tall facade of ordered windows', 'Jack Prew', '50% 50%'],
    'arch-skylight': ['1674763973434-75e1930d4959', 'A skylight cutting light through an architectural interior', 'Mariana Montes de Oca', '50% 50%'],
    'arch-interior': ['1525683879097-8babce1c602a', 'A white architectural interior seen from a low angle', 'AMC Photo', '50% 50%'],
    'arch-slanted': ['1676974405311-4e9c75cbddb7', 'A white room with a slanted ceiling and skylight', 'Tarun Tom', '50% 50%'],
    'net-cables': ['1691435828932-911a7801adfb', 'Neatly connected network cabling in a real installation', 'Albert Stoynov', '50% 50%'],
    'net-cables-2': ['1744868562210-fffb7fa882d9', 'Yellow and green network cables connected in order', 'Albert Stoynov', '50% 50%'],
    'data-center': ['1784652852605-6945598f2af3', 'A modern data centre with rows of white server cabinets', 'Tony Marinescu', '50% 50%'],
    'technician': ['1785682117346-4b114502e9b8', 'A technician working on a server rack', 'Valentin Lacoste', '50% 45%']
  };
  const src = (k, w) => U + reg[k][0] + '?auto=format&fit=crop&q=' + (w > 1800 ? 65 : (w > 1200 ? 70 : 72)) + '&w=' + w;
  // A 32px, heavily blurred frame (~3 KB) painted behind every image while the
  // real file arrives, so nothing on the page ever renders as an empty dark box.
  const lqip = (k) => U + reg[k][0] + '?auto=format&fit=crop&q=30&w=32&blur=40';
  return {
    reg,
    get(k) {
      const r = reg[k];
      // Optional fifth entry: a separate focal point for portrait / mobile crops.
      return { key: k, src: src(k, 1800), srcSet: src(k, 800) + ' 800w, ' + src(k, 1400) + ' 1400w, ' + src(k, 1800) + ' 1800w, ' + src(k, 2400) + ' 2400w', lqip: lqip(k), alt: r[1], credit: r[2], focal: r[3], focalMobile: r[4] || r[3] };
    }
  };
})();

// ---- Hero + opening statement per route. **bold** marks the emphasised phrase. ----
window.PG.heroes = {
  'home': { size: 'home', lines: ['See what', 'matters.'], images: ['lagos-bridge-night', 'wh-forklift', 'arch-tunnel'], tone: 'light',
    statement: 'Pattern Grid connects your data, analytics and AI so your organisation can **see what matters**, understand what is changing and **decide what comes next**.',
    action: { label: 'See the five services', href: '#/services' }, secondary: { label: 'Book a consultation', href: '#/contact' } },
  'services': { size: 'marketing', lines: ['Build better', 'intelligence.'], images: ['arch-spiral', 'team-table'], tone: 'light',
    statement: 'From the first business question to the systems behind the answer, we bring **strategy, engineering and analysis** together to make intelligence useful.', action: { label: 'Book a consultation', href: '#/contact' } },
  'services/data-ai-strategy': { size: 'marketing', lines: ['Know your', 'next move.'], images: ['team-focus', 'lagos-aerial-2'], tone: 'dark',
    statement: 'Start with the decisions your business needs to make. We help you choose **clear priorities**, assess what is possible and build a roadmap your teams can use.', action: { label: 'Discuss your data strategy with us', href: '#/contact' } },
  'services/data-engineering': { size: 'marketing', lines: ['Build on', 'trusted data.'], images: ['net-cables', 'arch-pathway'], tone: 'dark',
    statement: 'Reliable intelligence begins beneath the dashboard. We connect systems, improve data quality and create **dependable foundations** for reporting, analytics and AI.', action: { label: 'Discuss your data platform with us', href: '#/contact' } },
  'services/business-intelligence': { size: 'marketing', lines: ['Make performance', 'clear.'], images: ['team-review', 'aerial-vehicles'], tone: 'dark',
    statement: 'Bring your most important measures into one shared view. Help teams **understand performance**, investigate the reasons and decide where to act.', action: { label: 'Discuss your reporting with us', href: '#/contact' } },
  'services/ai-automation': { size: 'marketing', lines: ['Put intelligence', 'to work.'], images: ['wh-racks', 'wh-tablet'], tone: 'dark',
    statement: 'Apply AI where it serves a clear purpose. Reduce repetitive work, support better judgement and keep **people in control** of decisions that matter.', action: { label: 'Discuss an automation idea with us', href: '#/contact' } },
  'services/capability-building': { size: 'marketing', lines: ['Make knowledge', 'last.'], images: ['team-laptops', 'team-talking'], tone: 'dark',
    statement: 'Systems create lasting value when people can use them confidently. We build **practical skills**, shared understanding and the ability to keep improving after delivery.', action: { label: 'Discuss training for your team', href: '#/contact' } },
  'industries': { size: 'marketing', lines: ['Intelligence', 'in context.'], images: ['lagos-aerial', 'wh-pallets'], tone: 'light',
    statement: 'Every sector has different pressures. We connect data to the **customers, operations and decisions** that shape your business, with the context needed to make it useful.', action: { label: 'Book a consultation', href: '#/contact' } },
  'industries/financial-services': { size: 'marketing', lines: ['See the', 'full picture.'], images: ['lagos-civic-towers', 'lagos-bridge-traffic'], tone: 'dark',
    statement: 'Connect customer, transaction and operational data to understand performance, investigate exceptions and give teams a **more dependable view** of the business.', action: { label: 'Discuss your financial services data', href: '#/contact' } },
  'industries/fmcg-distribution': { size: 'marketing', lines: ['See every', 'movement.'], images: ['wh-tablet-2', 'wh-ladder'], tone: 'dark',
    statement: 'Bring sales, stock and distribution into a connected view so teams can **spot gaps earlier**, understand availability and act with better information.', action: { label: 'Discuss your stock and sales data', href: '#/contact' } },
  'industries/retail-ecommerce': { size: 'marketing', lines: ['Know what', 'drives demand.'], images: ['lagos-highway', 'wh-racks'], tone: 'dark',
    statement: 'Understand how customers, products and channels perform together. Use **clearer evidence** to guide assortment, inventory and the next commercial decision.', action: { label: 'Discuss your retail data', href: '#/contact' } },
  'industries/technology': { size: 'marketing', lines: ['Understand what', 'keeps users.'], images: ['team-white', 'team-whiteboard'], tone: 'dark',
    statement: 'Connect product behaviour with commercial performance. See where users find value, where they leave and which questions deserve **closer attention**.', action: { label: 'Discuss your product data', href: '#/contact' } },
  'work': { size: 'marketing', lines: ['See the', 'thinking work.'], images: ['lagos-tanks', 'wh-ladder'], tone: 'light',
    statement: 'Explore the questions we address, the systems we design and the reasoning behind them. **Client work and illustrative demonstrations** are identified clearly throughout.', action: { label: 'Book a consultation', href: '#/contact' } },
  'work/executive-performance': { size: 'utility', lines: [], images: ['team-review', 'lagos-civic-towers'], tone: 'light', statement: '', action: null },
  'work/distribution-intelligence': { size: 'utility', lines: [], images: ['wh-pallets', 'wh-forklift'], tone: 'light', statement: '', action: null },
  'work/reporting-workflow': { size: 'utility', lines: [], images: ['wh-tablet', 'net-cables-2'], tone: 'light', statement: '', action: null },
  'insights': { size: 'marketing', lines: ['Ask better', 'questions.'], images: ['arch-skylight', 'arch-concrete'], tone: 'light',
    statement: 'Clear thinking starts with a useful question. Explore practical perspectives on **data, analytics and AI**, written for the people making business decisions.', action: { label: 'Take the readiness assessment', href: '#/assessment' } },
  'about': { size: 'marketing', lines: ['Clarity is', 'our purpose.'], images: ['lagos-skyline', 'arch-white'], tone: 'light',
    statement: 'Pattern Grid helps organisations build the foundations for **better decisions**, bringing business understanding, technical care and practical thinking to the same table.', action: { label: 'Meet the founder', href: '#/about/precious-celestine' } },
  'founder': { size: 'marketing', lines: ['Precious', 'Chinenye', 'Celestine.'], images: ['arch-interior', 'arch-slanted'], tone: 'light',
    statement: 'Meet **Precious Chinenye Celestine**, professionally known as **Ada Africa**, the founder of Pattern Grid. Explore her perspective on data, intelligence and the decisions that shape organisations.', action: { label: 'Discuss your business question with us', href: '#/contact' } },
  'approach': { size: 'marketing', lines: ['From complexity', 'to clarity.'], images: ['aerial-highway', 'arch-windows'], tone: 'dark',
    statement: 'Begin with a business question. Establish the right foundations. Build what is useful, test it with the people who need it and **keep improving**.', action: { label: 'Take the readiness assessment', href: '#/assessment' } },
  'assessment': { size: 'compact', lines: ['Find your', 'next priority.'], images: ['arch-highrise', 'team-meeting'], tone: 'light',
    statement: 'Take a structured look at your data, systems and ways of working. Identify **practical priorities** and the questions worth exploring with your team.', action: { label: 'Start the assessment', href: '#/assessment', event: 'pg-start-assessment' } },
  'contact': { size: 'compact', lines: ['Start with', 'a question.'], images: ['team-pens', 'arch-skylight'], tone: 'light',
    statement: 'Tell us what you are trying to understand, improve or build. We will start with **your business question** and explore a useful next step.', action: { label: 'Tell us about your project', href: '#/contact', event: 'pg-focus-form' } },
  'privacy': { size: 'utility', lines: ['Your privacy', 'matters.'], images: ['arch-concrete', 'arch-interior'], tone: 'light',
    statement: 'Understand what information we collect, why we use it and the **choices available to you**.', action: { label: 'Contact us about privacy', href: '#/contact' } },
  'terms': { size: 'utility', lines: ['Clear terms', 'of use.'], images: ['arch-pathway', 'arch-windows'], tone: 'light',
    statement: 'Read the terms that apply when you use **this website and its content**.', action: { label: 'Contact us', href: '#/contact' } },
  'notfound': { size: 'utility', lines: ['Find your', 'way back.'], images: ['arch-tunnel', 'arch-spiral'], tone: 'light', statement: '', action: { label: 'Go to the home page', href: '#/' }, secondary: { label: 'Explore services', href: '#/services' } }
};
// Photography used elsewhere on pages
window.PG.services.forEach((s, i) => { s.photo = ['team-focus', 'net-cables', 'team-review', 'wh-racks', 'team-laptops'][i]; s.photo2 = ['lagos-aerial-2', 'arch-pathway', 'aerial-vehicles', 'wh-tablet', 'team-talking'][i]; });
window.PG.industries.forEach((s, i) => { s.photo = ['lagos-civic-towers', 'wh-pallets', 'lagos-highway', 'team-white'][i]; s.photo2 = ['lagos-bridge-traffic', 'wh-tablet-2', 'wh-racks', 'team-whiteboard'][i]; });
window.PG.work.forEach((w, i) => { w.photo = ['team-review', 'wh-pallets', 'wh-tablet'][i]; });

// People. Portraits are approved photographs only; a null photo renders a reserved
// frame, never a stock face or a generated likeness. Add team members here as
// { name, role, photo, bio } once profiles are approved.
window.PG.team = {
  founder: {
    name: 'Precious Chinenye Celestine', alias: 'Ada Africa', role: 'Founder & Lead Consultant',
    photo: null, photoAlt: 'Precious Chinenye Celestine, founder of Pattern Grid',
    bio: 'Her work spans business intelligence, reporting systems, data platforms and practical applications of AI and automation.'
  },
  members: [],
  reservedSlots: 3
};

// Icon fallback so pages never depend on service-content.js load order
window.PG.icons = window.PG.icons || {};
window.PG.icon = window.PG.icon || function (id) { return (window.PG.icons && window.PG.icons[id]) || 'M4 4h6v6H4Z M14 4h6v6h-6Z M4 14h6v6H4Z M14 14h6v6h-6Z'; };

