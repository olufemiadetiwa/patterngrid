/* Pattern Grid — workspace scenes.
   Product-like, state-driven explanations of the work: a metric traced to its
   sources and an owner; a delivery workspace whose readiness responds to its
   prerequisites; source records joined into one view; a work item passing
   human review; a team moving from guided practice to independent use.
   One sample dataset, labelled, with arithmetic that agrees across stages.
   See .claude/skills/site-visual-language/SKILL.md for the grammar. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when, raw = C.raw;

  var scene = (PG.scene = {});

  /* ---------------------------------------------------------- sample data */

  var D = (scene.data = {
    weeks: ['W31', 'W32', 'W33', 'W34', 'W35', 'W36'],
    netSales: [9.1, 9.4, 9.8, 10.1, 10.3, 9.6],
    plan: 10.0,
    current: 9.6,
    gross: 10.0,
    returns: 0.4,
    lines: [['Beverages', -0.1], ['Snacks', -0.3], ['Personal care', 0.0], ['Household', 0.0]],
    ledgers: ['Finance ledger (invoices, credit notes)', 'Product master'],
    definition: 'Net sales = gross invoiced sales − credited returns, excluding VAT and internal transfers. Week 36, Monday to Sunday, by invoice date.',
    owner: 'Commercial finance lead',
    locations: [
      { name: 'Ikeja', sales: 100, avail: 92, outlet: '0031', loc: 'E-0031', drop: '0031' },
      { name: 'Lekki', sales: 96, avail: 88, outlet: '0207', loc: 'E-0207', drop: '0207' },
      { name: 'Surulere', sales: 61, avail: 41, outlet: '0118', loc: 'E-0118', drop: '0118', hl: true },
      { name: 'Ikorodu', sales: 89, avail: 85, outlet: '0342', loc: 'E-0342', drop: '0342' }
    ]
  });

  /* ------------------------------------------------------------ primitives */


  /* ------------------------------------------------------------ primitives
     A report canvas, not an application: a title line, optional slicer
     chips, a row of KPI cards, visuals on a dense grid, page tabs along
     the bottom, and a caption outside the canvas. Numbers are tabular,
     labels are plain sentences, nothing apologises for itself. */

  function chip(tone, text) { return html`<span class="chip-state ${tone}">${text}</span>`; }
  scene.chip = chip;

  /* ------------------------------------------------ industry definitions */
  function pct(n, d) { return Math.round(n / d * 1000) / 10; }
  var IND = (scene.industries = {
    'financial-services': {
      question: 'Where are customer activity, revenue and operational performance moving apart?',
      entity: 'product line · month 8',
      sources: [
        { name: 'Customer', system: 'Core banking', key: 'customer_id', fields: ['customer_id', 'segment', 'opened_on'], recs: [['CUS-48210', 'Retail · opened 2023-04'], ['CUS-48211', 'SME · opened 2024-11']], feeds: ['Active customers'] },
        { name: 'Transaction', system: 'Payments switch', key: 'txn_id', fields: ['txn_id', 'customer_id', 'amount', 'posted_at'], recs: [['TXN-9031', '12,400 · 2026-08-30'], ['TXN-9032', '3,150 · 2026-08-31']], feeds: ['Active customers', 'Reconciliation exceptions'] },
        { name: 'Finance', system: 'General ledger', key: 'gl_account', fields: ['gl_account', 'period', 'amount'], recs: [['GL-4100', 'Aug · 1,210,000'], ['GL-4120', 'Aug · 640,000']], feeds: ['Revenue by product', 'Reconciliation exceptions'] },
        { name: 'Product', system: 'Product master', key: 'product_code', fields: ['product_code', 'type'], recs: [['PRD-CA', 'Current account'], ['PRD-CC', 'Credit card']], feeds: ['Revenue by product', 'Active customers'] },
        { name: 'Support', system: 'Service desk', key: 'case_id', fields: ['case_id', 'customer_id', 'status'], recs: [['CASE-2201', 'Open · 2 days'], ['CASE-2202', 'Closed']], feeds: [] }
      ],
      metrics: [
        { name: 'Active customers', definition: 'Customers with at least one posted transaction in the 30 days to the month end. A customer counts once, whichever products they hold.', period: '30 days to 31 August', unit: 'customers', source: 'Transaction + Customer', owner: 'Head of retail analytics', fmt: 'int' },
        { name: 'Revenue', definition: 'Fee and interest income posted to the general ledger for the month, mapped to product by GL account. Excludes reversals and provisions.', period: 'August (month 8)', unit: 'm (sample currency units)', source: 'Finance + Product', owner: 'Finance controller', fmt: 'm' },
        { name: 'Reconciliation exceptions', definition: 'Transactions posted in the period that have no matching ledger entry by the close of the next working day.', period: 'August, as at close', unit: 'exceptions', source: 'Transaction vs Finance', owner: 'Reconciliation lead', fmt: 'exc' }
      ],
      rows: [
        { name: 'Current accounts', active: 48210, revenue: 1.21, exceptions: 0 },
        { name: 'Savings', active: 22904, revenue: 0.64, exceptions: 0 },
        { name: 'Cards', active: 15377, revenue: 0.92, exceptions: 2, hl: true },
        { name: 'Loans', active: 6118, revenue: 1.48, exceptions: 0 }
      ],
      cells: function (r) { return [fmtInt(r.active), r.revenue.toFixed(2) + 'm', r.exceptions ? r.exceptions + ' open' : 'matched']; }
    },
    'fmcg-distribution': {
      question: 'Where are stock availability, outlet coverage and sales performance falling out of step?',
      entity: 'territory · week 36',
      sources: [
        { name: 'Sales', system: 'Rep sell-out app', key: 'outlet_code', fields: ['outlet_code', 'sku', 'units', 'week'], recs: [['OUT-0031', 'SKU 4471 · 312 units'], ['OUT-0118', 'SKU 4471 · 190 units']], feeds: ['Sell-out'] },
        { name: 'Inventory', system: 'Warehouse file', key: 'loc_code', fields: ['loc_code', 'sku', 'in_stock', 'counted_at'], recs: [['LOC-E-0031', 'in stock · W36'], ['LOC-E-0118', 'out of stock · W36']], feeds: ['Availability'] },
        { name: 'Outlets', system: 'Outlet master', key: 'outlet_id', fields: ['outlet_id', 'territory', 'channel'], recs: [['OUT-0031', 'North · open market'], ['OUT-0118', 'East · supermarket']], feeds: ['Sell-out', 'Availability'] },
        { name: 'Distribution', system: 'Route planner', key: 'drop_code', fields: ['drop_code', 'route', 'deliveries'], recs: [['DROP-0031', 'Route E · 3'], ['DROP-0118', 'Route E · 1']], feeds: [] },
        { name: 'Finance', system: 'ERP invoices', key: 'invoice_id', fields: ['invoice_id', 'distributor_id', 'units', 'net_value'], recs: [['INV-1189', 'Dist N-04 · 2,400 units'], ['INV-1190', 'Dist E-02 · 1,800 units']], feeds: ['Sell-in'] }
      ],
      metrics: [
        { name: 'Sell-in', definition: 'Units invoiced to distributors in the week. Shipments, not consumer demand: a distributor can hold stock that has not sold.', period: 'Week 36 (Mon–Sun, invoice date)', unit: 'units', source: 'Finance', owner: 'Commercial finance lead', fmt: 'int' },
        { name: 'Sell-out', definition: 'Units sold by outlets to consumers in the week, as counted by field reps and retail partners. Kept visibly separate from sell-in.', period: 'Week 36 (visit date)', unit: 'units', source: 'Sales + Outlets', owner: 'Sales operations lead', fmt: 'int' },
        { name: 'Availability', definition: 'Share of visited outlets with the SKU in stock at the last count. Outlets not visited in the week are excluded, and the exclusion count is shown.', period: 'Week 36, last count', unit: '%', source: 'Inventory + Outlets', owner: 'Supply chain data owner', fmt: 'pct' }
      ],
      rows: [
        { name: 'North', sellIn: 12400, sellOut: 11980, availability: 92 },
        { name: 'East', sellIn: 9800, sellOut: 9120, availability: 41, hl: true },
        { name: 'West', sellIn: 10150, sellOut: 9870, availability: 88 },
        { name: 'Central', sellIn: 8300, sellOut: 8010, availability: 85 }
      ],
      cells: function (r) { return [fmtInt(r.sellIn), fmtInt(r.sellOut), r.availability + '%']; }
    },
    'retail-ecommerce': {
      question: 'Which products and customer behaviours create sustainable value?',
      entity: 'channel · week 36',
      sources: [
        { name: 'Store', system: 'Store POS', key: 'store_id', fields: ['store_id', 'ticket_id', 'net_value'], recs: [['STO-014', 'Ticket 88213 · 18.40'], ['STO-021', 'Ticket 88214 · 12.10']], feeds: ['Average order value', 'Return rate'] },
        { name: 'Ecommerce', system: 'Web platform', key: 'order_id', fields: ['order_id', 'session_id', 'channel', 'status'], recs: [['ORD-55120', 'Web · completed'], ['ORD-55121', 'Marketplace · completed']], feeds: ['Conversion', 'Average order value', 'Return rate'] },
        { name: 'Payments', system: 'Payment gateway', key: 'payment_id', fields: ['payment_id', 'order_id', 'captured', 'amount'], recs: [['PAY-90311', 'captured · 24.10'], ['PAY-90312', 'captured · 21.60']], feeds: ['Average order value'] },
        { name: 'Inventory', system: 'Warehouse system', key: 'sku', fields: ['sku', 'on_hand', 'returned_qty'], recs: [['SKU-4471', 'on hand 312 · returned 9'], ['SKU-4472', 'on hand 88 · returned 14']], feeds: ['Return rate'] },
        { name: 'Customer', system: 'CRM', key: 'customer_id', fields: ['customer_id', 'first_order_on', 'repeat_flag'], recs: [['CUS-7781', 'repeat'], ['CUS-7782', 'new']], feeds: [] }
      ],
      metrics: [
        { name: 'Conversion', definition: 'Completed orders divided by eligible sessions on the same channel in the same week. Store tickets have no session, so stores show no conversion rather than a made-up one.', period: 'Week 36', unit: '%', source: 'Ecommerce', owner: 'Ecommerce manager', fmt: 'pct1' },
        { name: 'Average order value', definition: 'Net merchandise value of completed, captured orders divided by the number of those orders. Excludes shipping, tax and cancelled orders.', period: 'Week 36', unit: 'sample currency units', source: 'Payments + Ecommerce + Store', owner: 'Commercial finance lead', fmt: 'money' },
        { name: 'Return rate', definition: 'Order lines returned divided by order lines shipped, attributed to the week the order was placed, so a return arriving later still counts against its order.', period: 'Orders placed in week 36', unit: '%', source: 'Inventory + Ecommerce + Store', owner: 'Operations lead', fmt: 'pct1' }
      ],
      rows: [
        { name: 'Stores', orders: 4120, sessions: null, aov: 18.40, returnRate: 3.1 },
        { name: 'Ecommerce', orders: 1248, sessions: 52000, aov: 24.10, returnRate: 9.8 },
        { name: 'Marketplace', orders: 418, sessions: 22000, aov: 21.60, returnRate: 11.2, hl: true },
        { name: 'Wholesale', orders: 36, sessions: null, aov: 412.00, returnRate: 0.8 }
      ],
      cells: function (r) { return [r.sessions ? pct(r.orders, r.sessions) + '%' : '—', r.aov.toFixed(2), r.returnRate.toFixed(1) + '%']; }
    },
    'technology': {
      question: 'Which behaviours lead to continued use, and where does the experience break down?',
      entity: 'sign-up cohort · month',
      sources: [
        { name: 'Product events', system: 'Event stream', key: 'user_id', fields: ['event_id', 'user_id', 'event_name', 'occurred_at'], recs: [['EVT-0091', 'project_created · day 2'], ['EVT-0092', 'report_shared · day 5']], feeds: ['Activation', 'Week-4 retention'] },
        { name: 'CRM', system: 'Sales CRM', key: 'account_id', fields: ['account_id', 'plan', 'signed_up_on'], recs: [['ACC-3310', 'Team · 2026-07-03'], ['ACC-3311', 'Starter · 2026-07-04']], feeds: ['Activation', 'Week-4 retention'] },
        { name: 'Billing', system: 'Subscription billing', key: 'invoice_id', fields: ['invoice_id', 'account_id', 'amount', 'period'], recs: [['INV-7720', 'Team · Jul'], ['INV-7721', 'Starter · Jul']], feeds: [] },
        { name: 'Support', system: 'Help desk', key: 'ticket_id', fields: ['ticket_id', 'account_id', 'priority', 'opened_at'], recs: [['TCK-5120', 'High · day 3'], ['TCK-5121', 'Normal · day 9']], feeds: ['Support tickets'] },
        { name: 'Infrastructure', system: 'Monitoring', key: 'service', fields: ['service', 'uptime', 'p95_latency'], recs: [['api', '99.95% · 240 ms'], ['web', '99.98% · 180 ms']], feeds: [] }
      ],
      metrics: [
        { name: 'Activation', definition: 'Share of accounts in the sign-up cohort that completed the agreed first-value action (a project created and a report shared) within 7 days of sign-up.', period: 'Sign-up month, 7-day window', unit: '%', source: 'Product events + CRM', owner: 'Product analytics lead', fmt: 'pct' },
        { name: 'Week-4 retention', definition: 'Share of activated accounts with at least one qualifying event in the fourth week after sign-up. Not yet measurable for a cohort younger than four weeks.', period: 'Sign-up month, week 4', unit: '%', source: 'Product events + CRM', owner: 'Product analytics lead', fmt: 'pct' },
        { name: 'Support tickets', definition: 'Tickets opened by the cohort in its first 30 days, whatever the priority. Shown beside retention so a drop and a rise in demand are seen together.', period: 'First 30 days after sign-up', unit: 'tickets', source: 'Support + CRM', owner: 'Support lead', fmt: 'int' }
      ],
      rows: [
        { name: 'May', activation: 61, retention: 44, tickets: 128 },
        { name: 'June', activation: 64, retention: 46, tickets: 141 },
        { name: 'July', activation: 58, retention: 39, tickets: 212, hl: true },
        { name: 'August', activation: 66, retention: null, tickets: 97 }
      ],
      cells: function (r) { return [r.activation + '%', r.retention == null ? '— (too young)' : r.retention + '%', fmtInt(r.tickets)]; }
    }
  });
  function fmtInt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  /* Retail conversion is derived from the rows, so the test can prove it. */
  IND['retail-ecommerce'].rows.forEach(function (r) { if (r.sessions) r.conversion = pct(r.orders, r.sessions); });
})();
