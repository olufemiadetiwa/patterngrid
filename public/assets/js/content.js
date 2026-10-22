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
    // Places (Nigeria)
    'lagos-bridge-night': ['1648023200201-8fcede127835', 'Lagos, Nigeria: the Lekki-Ikoyi bridge over the lagoon at night with the city lit behind it', 'Opeyemi Adisa', '50% 50%', '62% 50%'],
    'lagos-aerial': ['1594538756542-8c88bda491c5', 'Aerial view of Lagos city buildings in daylight', 'Obinna Okerekeocha', '50% 50%'],
    'lagos-civic-towers': ['1618828665347-d870c38c95c7', 'Civic Towers, Lekki, Lagos under a blue sky', 'Nupo Deyon Daniel', '50% 50%'],
    'lagos-skyline': ['1559833064-6f4573ec1ac9', 'Lagos skyline in daylight', 'Stephen Olatunde', '50% 50%'],
    'lagos-vans': ['1526735334552-daff0bd6d53f', 'Yellow danfo buses on a street in Alapere, Lagos', 'Dami Akinbode', '50% 50%'],
    'lagos-market-aerial': ['1785094165709-54fef69c2c4d', 'Aerial view of a Lagos street market with colourful umbrellas', 'Fahd Aminu', '50% 40%'],
    // People at work (Nigeria unless noted)
    'office-meeting': ['1739287088753-73a9b8b771bc', 'A team meeting around a white table in a Lagos office', 'Ninthgrid', '50% 45%', '50% 45%'],
    'office-meeting-2': ['1739298061707-cefee19941b7', 'Colleagues discussing work around a table in a Lagos office', 'Ninthgrid', '50% 45%', '50% 45%'],
    'office-meeting-3': ['1739298061740-5ed03045b280', 'A working session around a white table in a Lagos office', 'Ninthgrid', '50% 45%', '50% 45%'],
    'office-two-men': ['1739285388427-d6f85d12a8fc', 'Two men in conversation across a desk in a Lagos office', 'Ninthgrid', '50% 45%', '42% 45%'],
    'office-pair-laptop': ['1739292774739-ee38cd9a5735', 'A colleague pointing out something on a laptop screen in a Lagos office', 'Ninthgrid', '45% 45%', '40% 45%'],
    'office-two-women': ['1739303987861-1b0c1104b747', 'Two women working at a laptop in a Lagos café', 'Ninthgrid', '50% 45%', '50% 45%'],
    'cafe-pair-laptop': ['1641759191629-cc107016e78a', 'Two founders at a laptop in a Lagos workspace', 'Francis Odeyemi', '50% 45%', '50% 45%'],
    'cafe-woman-tablet': ['1642929426263-caf1617ced29', 'A woman reviewing work on a tablet in a Lagos office', 'Francis Odeyemi', '50% 40%', '50% 35%'],
    'cafe-man-laptop': ['1635766854982-fc151c6e9278', 'A man working on a laptop at Café One, Lagos', 'Francis Odeyemi', '50% 40%', '50% 35%'],
    'abuja-laptop': ['1646300291345-e7f3f97986ed', 'A developer working at a laptop in Abuja', 'Kagou Dicko', '50% 40%', '50% 35%'],
    'dev-stickers': ['1684337399050-0412ebed8005', 'A developer holding a laptop covered in stickers', 'Micheal Ogungbe', '50% 40%', '50% 35%'],
    'notes-review': ['1627423894921-c55a18a2de90', 'Colleagues working through notes together, Port Harcourt (black and white)', 'Emmanuel Ikwuegbu', '50% 50%', '50% 50%'],
    'training-table': ['1653565684985-0b1a64cf7afc', 'A facilitator explaining a point to a small group around a table', 'UK Black Tech', '50% 45%', '50% 45%'],
    'couch-learning': ['1655720357872-ce227e4164ba', 'Three colleagues learning around a laptop', 'Iwaria Inc.', '50% 50%', '50% 50%'],
    'suit-desk': ['1604783125462-37d81c7385e6', 'A manager at his desk', 'Olorunyomi Solomon', '50% 45%', '50% 45%'],
    // Trade and distribution (Nigeria)
    'market-cart': ['1658402834610-66f1110edbd9', 'A trader moving goods by cart at Mile 12 International Market, Lagos', 'Shedrack Salami', '50% 50%', '55% 50%'],
    'market-cart-2': ['1658402834638-c6f65944b551', 'A trader pushing a loaded cart at Mile 12 market, Lagos', 'Shedrack Salami', '50% 50%'],
    'boxes-carry': ['1579998120084-16688be7b6d1', 'A trader carrying cartons of goods in Lagos', 'Mary', '50% 40%', '50% 40%'],
    'van-delivery': ['1659831837706-4fb995db3e37', 'A man loading a yellow delivery van in Lagos', 'Ayoola Salako', '50% 50%'],
    'market-tomatoes': ['1734255026082-82fdc81991f0', 'A market stall stacked with tomatoes, Nigeria', 'Tunde Buremo', '50% 50%', '50% 45%'],
    'fruit-stand': ['1660227698144-68c175ff8443', 'Customers at a fruit stand in Sango, Nigeria', 'owolabi oluwatosin', '50% 50%'],
    'supermarket-two': ['1739303987882-230db3156099', 'Two shoppers choosing products in a Lagos supermarket', 'Ninthgrid', '50% 45%', '55% 45%'],
    'supermarket-store': ['1739302750685-122e3b768b5a', 'Shoppers at the shelves of a Lagos mini mart', 'Ninthgrid', '50% 45%', '55% 45%'],
    'supermarket-cart': ['1739300293398-468ba82fd418', 'A shopper with a trolley in a Lagos supermarket aisle', 'Ninthgrid', '50% 45%'],
    'small-shop': ['1761370571806-886404629697', 'A shopkeeper in his small shop in Abuja', 'Muhammad-Taha Ibrahim', '50% 40%'],
    'store-owner': ['1723221907187-3e88c1d74b99', 'A store owner in Enugu standing in front of his shop', 'Blessing Olarewaju', '50% 40%'],
    'pos-machine': ['1734254807102-fbf62b0cc513', 'A worker beside a green machine, Nigeria', 'Tunde Buremo', '50% 45%']
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

// ---- Heroes: category, headline, supporting sentence, two actions, one image. ----
// `images[0]` is the only frame rendered; the array form is kept for the image build.
const CTA = { label: 'Request a consultation', href: '/contact' };
const cta = (label, service) => ({ label, href: '/contact' + (service ? '?service=' + service : '') });
window.PG.heroes = {
  'home': { size: 'home', eyebrow: 'Data, AI and business intelligence consulting', lines: ['See what', 'matters.'], images: ['lagos-bridge-night'], tone: 'light',
    lead: 'Pattern Grid helps organisations connect their data, build reporting people trust and introduce practical AI and automation, with a named owner for every number.',
    statement: 'Pattern Grid connects your data, analytics and AI so your organisation can **see what matters**, understand what is changing and **decide what comes next**.',
    action: { label: 'Discuss your project', href: '/contact' }, secondary: { label: 'See the five services', href: '/services' } },
  'services': { size: 'marketing', eyebrow: 'Services', lines: ['Start with the problem.', 'Build what solves it.'], images: ['office-meeting'], tone: 'light',
    lead: 'Five services that build on each other: a clear plan, data you can rely on, reporting people trust, automation with a person in control, and a team that can run it.',
    statement: 'From the first business question to the systems behind the answer, we bring **strategy, engineering and analysis** together to make intelligence useful.',
    action: CTA, secondary: { label: 'Take the readiness assessment', href: '/assessment' } },
  'services/data-ai-strategy': { size: 'marketing', eyebrow: 'Data & AI Strategy', lines: ['Know your', 'next move.'], images: ['office-meeting-2'], tone: 'dark',
    lead: 'Decide which data and AI projects to fund first, and in what order. You get a roadmap with an owner, a prerequisite and an acceptance test for every step.',
    statement: 'Start with the decisions your business needs to make. We help you choose **clear priorities**, assess what is possible and build a roadmap your teams can use.',
    action: cta('Discuss your data strategy', 'data-ai-strategy'), secondary: { label: 'See the delivery roadmap', href: '#svc-artifact' } },
  'services/data-engineering': { size: 'marketing', eyebrow: 'Data Engineering & Platforms', lines: ['Build on', 'trusted data.'], images: ['abuja-laptop'], tone: 'dark',
    lead: 'Connect your ERP, CRM, finance and spreadsheet data so it arrives on schedule, is checked, and can be traced back to its source by the people who use it.',
    statement: 'Reliable intelligence begins beneath the dashboard. We connect systems, improve data quality and create **dependable foundations** for reporting, analytics and AI.',
    action: cta('Discuss your data platform', 'data-engineering'), secondary: { label: 'See a source workspace', href: '#svc-artifact' } },
  'services/business-intelligence': { size: 'marketing', eyebrow: 'Business Intelligence', lines: ['Make performance', 'clear.'], images: ['office-pair-laptop'], tone: 'dark',
    lead: 'Give every important number one definition, one owner and one source, so finance, sales and operations stop arguing about which figure is right and decide what to do.',
    statement: 'Bring your most important measures into one shared view. Help teams **understand performance**, investigate the reasons and decide where to act.',
    action: cta('Discuss your reporting', 'business-intelligence'), secondary: { label: 'See the decision workspace', href: '#svc-artifact' } },
  'services/ai-automation': { size: 'marketing', eyebrow: 'AI & Automation', lines: ['Put intelligence', 'to work.'], images: ['cafe-woman-tablet'], tone: 'dark',
    lead: 'Automate one repetitive task with clear limits: rules check the inputs, AI drafts a proposal, and a named person approves what is released.',
    statement: 'Apply AI where it serves a clear purpose. Reduce repetitive work, support better judgement and keep **people in control** of decisions that matter.',
    action: cta('Discuss an automation idea', 'ai-automation'), secondary: { label: 'See the review workflow', href: '#svc-artifact' } },
  'services/capability-building': { size: 'marketing', eyebrow: 'Capability Building', lines: ['Make knowledge', 'last.'], images: ['training-table'], tone: 'dark',
    lead: 'Your team takes the system over with evidence they can run it: a baseline, guided practice on real work, and independent use checked by a reviewer.',
    statement: 'Systems create lasting value when people can use them confidently. We build **practical skills**, shared understanding and the ability to keep improving after delivery.',
    action: cta('Discuss training for your team', 'capability-building'), secondary: { label: 'See the capability plan', href: '#svc-artifact' } },
  'industries': { size: 'marketing', eyebrow: 'Industries', lines: ['Intelligence', 'in context.'], images: ['lagos-aerial'], tone: 'light',
    lead: 'Every sector measures different things. We connect data to the customers, operations and decisions that shape your business, with the definitions agreed first.',
    statement: 'Every sector has different pressures. We connect data to the **customers, operations and decisions** that shape your business, with the context needed to make it useful.',
    action: CTA, secondary: { label: 'See the five services', href: '/services' } },
  'industries/financial-services': { size: 'marketing', eyebrow: 'Financial services & fintech', lines: ['See the', 'full picture.'], images: ['lagos-civic-towers'], tone: 'dark',
    lead: 'Connect customer, transaction and operational data so teams can investigate performance with consistent definitions and traceable information.',
    statement: 'Connect customer, transaction and operational data to understand performance, investigate exceptions and give teams a **more dependable view** of the business.',
    action: cta('Discuss your financial services data'), secondary: { label: 'See a source workspace', href: '#ind-sources' } },
  'industries/fmcg-distribution': { size: 'marketing', eyebrow: 'FMCG & distribution', lines: ['See what moves.', 'Understand what does not.'], images: ['market-cart'], tone: 'dark',
    lead: 'Connect sales, stock, outlets and distribution activity to understand commercial performance across the route to market, with sell-in and sell-out kept distinct.',
    statement: 'Bring sales, stock and distribution into a connected view so teams can **spot gaps earlier**, understand availability and act with better information.',
    action: cta('Discuss your stock and sales data'), secondary: { label: 'See a source workspace', href: '#ind-sources' } },
  'industries/retail-ecommerce': { size: 'marketing', eyebrow: 'Retail & ecommerce', lines: ['Know what', 'drives demand.'], images: ['supermarket-two'], tone: 'dark',
    lead: 'Bring product, customer, sales and inventory information together to understand what people buy, where they return and what affects margin.',
    statement: 'Understand how customers, products and channels perform together. Use **clearer evidence** to guide assortment, inventory and the next commercial decision.',
    action: cta('Discuss your retail data'), secondary: { label: 'See a source workspace', href: '#ind-sources' } },
  'industries/technology': { size: 'marketing', eyebrow: 'Technology', lines: ['Understand what', 'keeps users.'], images: ['cafe-pair-laptop'], tone: 'dark',
    lead: 'Connect product behaviour, customer information and commercial performance to evaluate adoption, retention and operational priorities.',
    statement: 'Connect product behaviour with commercial performance. See where users find value, where they leave and which questions deserve **closer attention**.',
    action: cta('Discuss your product data'), secondary: { label: 'See a source workspace', href: '#ind-sources' } },
  'work': { size: 'marketing', eyebrow: 'Work & demos', lines: ['The work,', 'shown working.'], images: ['office-two-men'], tone: 'light',
    lead: 'Two client case studies written up from the project records, and three illustrative scenarios built with sample data. Each is labelled for what it is.',
    statement: 'Explore the questions we address, the systems we design and the reasoning behind them. **Client work and illustrative demonstrations** are identified clearly throughout.',
    action: CTA, secondary: null },
  'work/ledrop-distribution-visibility': { size: 'marketing', eyebrow: 'Pattern Grid engagement · Drinks importation and distribution', lines: ['Ledrop'], images: ['market-cart-2'], tone: 'dark',
    lead: 'Connecting sales and field data to improve distribution visibility.',
    statement: 'Two platforms, inconsistent names and no view of where products were missing became **one reporting foundation** in Power BI: sales, distribution gaps, menu listings and **reported out-of-stock issues**, by outlet.',
    action: { label: 'Discuss a similar question', href: '/contact?service=business-intelligence' }, secondary: { label: 'What was built', href: '#case-solution' } },
  'work/party-drinks-connected-reporting': { size: 'marketing', eyebrow: 'Pattern Grid engagement · Drinks retail, distribution and e-commerce', lines: ['Drinks.NG'], images: ['supermarket-cart'], tone: 'dark',
    lead: 'Integrating sales, inventory, fulfilment and marketing reporting.',
    statement: 'Three platforms became one automated reporting environment: **sales across every channel**, inventory days, fulfilment status and marketing KPIs in Power BI, with **the data preparation repeatable** instead of rebuilt each week.',
    action: { label: 'Discuss a similar question', href: '/contact?service=data-engineering' }, secondary: { label: 'What was built', href: '#case-solution' } },
  'work/executive-performance': { size: 'marketing', eyebrow: 'Illustrative scenario · Cross-functional reporting', lines: ['One view of', 'performance.'], images: ['suit-desk'], tone: 'dark',
    lead: 'A consistent view of executive performance, built with sample data to show how we think.',
    statement: 'Finance, sales and operations each report from their own system. The sample connects the three around **shared definitions**, so any executive figure traces back to **its own records**.',
    action: { label: 'Discuss a similar question', href: '/contact?service=business-intelligence' }, secondary: { label: 'Open the sample report', href: '#work-artifact' } },
  'work/distribution-intelligence': { size: 'marketing', eyebrow: 'Illustrative scenario · FMCG & Distribution', lines: ['Warehouse', 'to outlet.'], images: ['van-delivery'], tone: 'dark',
    lead: 'Distribution intelligence from warehouse to outlet, built with sample data to show how we think.',
    statement: 'Stock, sales and outlet activity on one product and location model, so the sample shows **where demand is outpacing the stock** actually available to serve it, with **each exception assigned** to a review owner.',
    action: { label: 'Discuss a similar question', href: '/contact?service=data-engineering' }, secondary: { label: 'Open the sample report', href: '#work-artifact' } },
  'work/reporting-workflow': { size: 'marketing', eyebrow: 'Illustrative scenario · AI & Automation', lines: ['Prepared by rules,', 'approved by people.'], images: ['office-two-women'], tone: 'dark',
    lead: 'A reporting workflow with human review, built with sample data to show how we think.',
    statement: 'Rules check the inputs, a labelled AI step drafts the commentary, and **a named reviewer approves** what is published. The sample keeps automated, assisted and human steps **visibly separate**.',
    action: { label: 'Discuss a similar question', href: '/contact?service=ai-automation' }, secondary: { label: 'Open the sample report', href: '#work-artifact' } },
  'about': { size: 'marketing', eyebrow: 'About Pattern Grid', lines: ['Clarity is', 'our purpose.'], images: ['office-meeting-3'], tone: 'light',
    lead: 'An African-founded data and AI consultancy with an international outlook, led by Precious Chinenye Celestine. We help organisations build the foundations for better decisions.',
    statement: 'Pattern Grid helps organisations build the foundations for **better decisions**, bringing business understanding, technical care and practical thinking to the same table.',
    action: { label: 'Meet the founder', href: '/about/precious-celestine' }, secondary: { label: 'Our approach', href: '/approach' } },
  'founder': { size: 'compact', eyebrow: 'Founder', lines: ['Precious Chinenye', 'Celestine.'], images: [], tone: 'light',
    lead: 'Founder and lead consultant, known professionally as Ada Africa. A data and AI professional and business intelligence consultant.',
    action: { label: 'Discuss your business question', href: '/contact' }, secondary: null },
  'approach': { size: 'marketing', eyebrow: 'Our approach', lines: ['From question', 'to action.'], images: ['notes-review'], tone: 'dark',
    lead: 'Begin with a business question. Establish the data foundation, build the useful view, put the workflow in someone\'s hands, and hand over.',
    statement: 'Begin with a business question. Establish the right foundations. Build what is useful, test it with the people who need it and **keep improving**.',
    action: { label: 'Take the readiness assessment', href: '/assessment' }, secondary: CTA },
  'assessment': { size: 'compact', eyebrow: 'Readiness assessment', lines: ['Find your', 'next priority.'], images: [], tone: 'light', lead: '', action: null },
  'contact': { size: 'compact', eyebrow: 'Contact', lines: ['Request a', 'consultation.'], images: [], tone: 'light', lead: '', action: null },
  'insights': { size: 'compact', eyebrow: 'Insights', lines: ['Ask better', 'questions.'], images: [], tone: 'light', lead: 'Articles are in preparation. Until they are published, the worked examples on the service pages are the most useful reading on this site.', action: { label: 'See a worked example', href: '/services/business-intelligence#svc-artifact' } },
  'privacy': { size: 'compact', eyebrow: 'Legal', lines: ['Privacy', 'notice.'], images: [], tone: 'light', lead: '', action: null },
  'terms': { size: 'compact', eyebrow: 'Legal', lines: ['Terms', 'of use.'], images: [], tone: 'light', lead: '', action: null },
  'notfound': { size: 'compact', eyebrow: 'Page not found', lines: ['That page', 'is not here.'], images: [], tone: 'light', lead: '', action: null }
};
// Photography used elsewhere on pages
// Section photography: one supporting image per industry (the hero's), none on work (the deliverables are shown instead).
window.PG.industries.forEach((s, i) => { s.photo = ['lagos-civic-towers', 'boxes-carry', 'supermarket-store', 'dev-stickers'][i]; s.photo2 = ['suit-desk', 'van-delivery', 'fruit-stand', 'office-two-women'][i]; });

// People. Portraits are approved photographs only; a null photo renders a reserved
// frame, never a stock face or a generated likeness. Add team members here as
// { name, role, photo, bio } once profiles are approved.
window.PG.team = {
  founder: {
    name: 'Precious Chinenye Celestine', alias: 'Ada Africa', role: 'Founder & Lead Consultant',
    photo: 'founder-2025', photoAlt: 'Precious Chinenye Celestine, founder of Pattern Grid, photographed in a studio',
    bio: 'Her work spans business intelligence, reporting systems, data platforms and practical applications of AI and automation.'
  },
  members: [],
  reservedSlots: 3
};

// Case studies: Pattern Grid engagements, written up from the project
// records. No invented figures; each names the client as supplied.
window.PG.cases = [
  { slug: 'ledrop-distribution-visibility', client: 'Ledrop', title: 'Connecting sales and field data to improve distribution visibility',
    industry: 'Drinks importation and distribution', role: 'Business Intelligence and Data consulting, delivered by Pattern Grid',
    focus: ['Data integration', 'Data standardisation', 'Sales reporting', 'Distribution gaps', 'Menu listing gaps', 'Out-of-stock reporting'],
    tools: ['Uwanjani', 'QuickBooks', 'Azure', 'Azure Data Factory', 'Power BI'],
    sources: ['Uwanjani (field)', 'QuickBooks (sales)'], pipeline: 'Azure Data Factory', outputs: ['Sales by customer, product, period', 'Distribution and menu gaps', 'Out-of-stock reporting'],
    summary: 'Sales and field data held in two platforms, with inconsistent product and customer names, became one reporting foundation in Power BI, giving Ledrop clearer visibility into sales, distribution gaps, menu listings and reported out-of-stock issues.',
    problem: ['Ledrop\u2019s sales and field operations data were held across two platforms: Uwanjani and QuickBooks. Each captured important business information, but differences in how products and customers were recorded made it difficult to connect the data and produce consistent reports.', 'The same product or customer could appear under different names, which complicated matching records, consolidating sales and comparing field observations with business transactions. Beyond sales reporting, management needed to understand where products were missing, where menu listings could be improved, and which outlets had reported out-of-stock situations.'],
    challenges: [
      ['Disconnected data sources', 'Sales and field information lived in separate platforms, making consolidated analysis difficult.'],
      ['Inconsistent product names', 'Variations in product nomenclature complicated matching and reporting across systems.'],
      ['Inconsistent customer names', 'Differences in customer and outlet naming made it harder to connect sales records with field observations.'],
      ['Limited distribution visibility', 'The business needed a structured way to identify outlets where relevant Ledrop products were absent.'],
      ['Limited menu listing visibility', 'Field observations needed to become clear reporting on missing product listings.'],
      ['Fragmented out-of-stock reporting', 'Reported stock gaps needed organising so teams could see which outlets and products required follow-up.']],
    solutionIntro: 'Pattern Grid developed a Business Intelligence solution that integrated data from Uwanjani and QuickBooks, standardised key business records, and translated the combined information into Power BI reporting.',
    solution: [
      ['Integrate the data through Azure', 'Azure handled the extract, transform and load process, with Azure Data Factory pipelines bringing both platforms into a structured reporting environment: a repeatable way to prepare sales and field information for analysis.'],
      ['Standardise product and customer naming', 'Product nomenclature was aligned so variations referring to the same product analyse consistently, and customer and outlet names were harmonised so sales transactions connect to field records without splitting one customer or product into several reporting categories.'],
      ['Build consistent sales reporting', 'Reporting structures and measures were developed to analyse sales by customer, product and reporting period on the standardised data.'],
      ['Develop distribution and menu-listing gap analysis', 'Field observations were turned into reporting on distribution gaps (outlets where relevant Ledrop products were not observed), menu-listing gaps (products missing from outlet menus) and competitor-based opportunities (observed competitor products compared with the expected Ledrop equivalents).'],
      ['Organise out-of-stock reporting', 'Out-of-stock observations captured through field activity were organised so the products and outlets associated with availability issues are easy to identify.'],
      ['Present the insights in Power BI', 'Sales and field analyses were brought into Power BI dashboards that let users explore performance and gaps by product, customer or outlet, and reporting period.']],
    achieved: [
      ['Connected sales and field information', 'An integrated reporting foundation using data from both platforms, so business transactions can be analysed alongside field observations.'],
      ['Standardised product and customer records', 'Naming aligned across both platforms, reducing inconsistencies in how records are grouped and improving the reliability of cross-platform analysis.'],
      ['More consistent sales reporting', 'Performance analysed with consistent product and customer definitions.'],
      ['Clearer distribution and menu-listing gaps', 'Missing product presence and menu listings visible at outlet level, giving commercial teams a practical basis for prioritising follow-up.'],
      ['Better visibility into reported out-of-stock issues', 'Out-of-stock observations organised into accessible reporting.'],
      ['Repeatable data preparation', 'Azure Data Factory pipelines support ongoing reporting and reduce reliance on one-off data preparation.']],
    services: ['data-engineering', 'business-intelligence'] },
  { slug: 'party-drinks-connected-reporting', client: 'Drinks.NG', title: 'Integrating sales, inventory, fulfilment and marketing reporting',
    industry: 'Drinks retail, distribution and e-commerce', role: 'Business Intelligence and Data consulting, delivered by Pattern Grid',
    focus: ['Automated data integration', 'Multichannel sales reporting', 'Inventory reporting', 'Fulfilment visibility', 'Marketing KPIs'],
    tools: ['Cin7', 'Google Analytics', 'SENRI', 'Azure CLI', 'Power BI'],
    sources: ['Cin7 (sales, inventory, orders)', 'SENRI (field sales)', 'Google Analytics (web)'], pipeline: 'Azure CLI ETL', outputs: ['Sales by channel, product, customer', 'Inventory days and value', 'Fulfilment status', 'Marketing KPIs'],
    summary: 'Data spread across Cin7, SENRI and Google Analytics became an automated reporting environment in Power BI, giving Drinks.NG a connected view of sales, inventory, fulfilment and marketing across its distribution, retail and e-commerce operations.',
    problem: ['Drinks.NG operated across distribution, retail and e-commerce channels, with business data spread across Cin7, SENRI and Google Analytics. Each platform captured a different part of the business: sales transactions, inventory records, field sales activity and website performance.', 'The business needed a connected reporting environment to understand performance across channels and monitor the relationship between sales, stock availability, fulfilment and marketing activity.'],
    challenges: [
      ['Fragmented sales reporting', 'Distribution, retail and e-commerce sales needed consolidating while keeping each channel visible.'],
      ['Disconnected inventory and sales information', 'Inventory records needed analysing alongside product sales to understand availability and movement.'],
      ['Limited fulfilment visibility', 'Order and fulfilment information needed organising to monitor progress and outstanding orders.'],
      ['Separate marketing and commercial reporting', 'Website activity and marketing KPIs needed to sit beside e-commerce sales performance.'],
      ['Repeated data preparation', 'Data from three platforms needed an automated extraction and transformation process.']],
    solutionIntro: 'Pattern Grid developed an automated data integration and Business Intelligence solution that brought together information from Cin7, Google Analytics and SENRI.',
    solution: [
      ['Automate data integration', 'Azure CLI was used in the extract, transform and load workflow to automate the movement and preparation of data from the three platforms into structured datasets for reporting.'],
      ['Build multichannel sales reporting', 'Sales data was organised to give both a consolidated view and the ability to examine distribution, retail and e-commerce individually, by product, customer and period.'],
      ['Structure inventory reporting', 'Inventory records were prepared alongside sales, with product-level measures for available quantity, average daily units sold and estimated inventory days, to assess stock coverage and flag products needing replenishment or review.'],
      ['Improve fulfilment visibility', 'Order and fulfilment records joined the reporting framework so fulfilment status and orders needing attention can be monitored, connecting sales reporting with the operational process.'],
      ['Develop marketing KPI reporting', 'Google Analytics data and marketing inputs were prepared to report on acquisition, engagement and campaign effectiveness, with acquisition cost and return on advertising spend calculated where cost and attribution data were available.'],
      ['Create Power BI dashboards', 'Users can explore sales across channels, review inventory, monitor fulfilment and assess marketing KPIs with structured measures and filters.']],
    achieved: [
      ['Automated data preparation across three platforms', 'A repeatable ETL workflow replaced separate, one-off extraction and preparation.'],
      ['Consolidated visibility across sales channels', 'Distribution, retail and e-commerce analysed within one framework, each still visible on its own.'],
      ['Better visibility into inventory and stock movement', 'Stock information connected to product sales: availability, inventory value and estimated coverage.'],
      ['Clearer fulfilment reporting', 'Outstanding fulfilment and orders needing operational follow-up are identifiable.'],
      ['Structured marketing performance measurement', 'Acquisition sources, engagement and commercial performance in one consistent framework, where supporting data was available.'],
      ['A reusable Business Intelligence foundation', 'Automated workflows, structured datasets and Power BI measures that support ongoing reporting and future analysis.']],
    services: ['data-engineering', 'business-intelligence', 'ai-automation'] }
];

// Icon fallback so pages never depend on service-content.js load order
window.PG.icons = window.PG.icons || {};
window.PG.icon = window.PG.icon || function (id) { return (window.PG.icons && window.PG.icons[id]) || 'M4 4h6v6H4Z M14 4h6v6h-6Z M4 14h6v6H4Z M14 14h6v6h-6Z'; };

