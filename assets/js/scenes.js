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

  function report(o) {
    var thumb = !!o.thumb;
    return html`
      <figure class="report${thumb ? ' scene-thumb' : ''}${o.compact ? ' is-compact' : ''}" data-scene-frame role="group" aria-label="${o.title}">
        <div class="rp-head">
          <div class="rp-title"><b>${o.title}</b>${when(!!o.sub, function () { return html`<span>${o.sub}</span>`; })}</div>
          ${when(!!o.slicers && !thumb, function () { return html`<div class="rp-slicers">${each(o.slicers, function (s) { return html`<span class="rp-slicer">${s[0]} <b>${s[1]}</b><i aria-hidden="true">▾</i></span>`; })}</div>`; })}
        </div>
        <div class="rp-body" data-scene-body>${o.body}</div>
        ${when(!!o.tabs && !thumb, function () {
          return html`<div class="rp-tabs" role="tablist" aria-label="${o.title} pages">${each(o.tabs, function (t, i) {
            return html`<button type="button" role="tab" class="rp-tab" data-act="tab:${i}" aria-selected="${i === o.tab ? 'true' : 'false'}" tabindex="${i === o.tab ? '0' : '-1'}">${t}</button>`;
          })}</div>`;
        })}
        ${when(!thumb, function () { return html`<figcaption class="rp-caption">${o.caption || 'Sample report page · demo data'}</figcaption>`; })}
      </figure>`;
  }

  function card(o) {
    var tone = o.tone || '';
    return html`
      <div class="rp-card${o.on ? ' on' : ''}" ${raw(o.act ? 'data-act="' + C.esc(o.act) + '"' : '')}>
        <span class="rp-card-l">${o.label}</span>
        <span class="rp-card-v num">${o.value}</span>
        ${when(o.delta != null, function () { return html`<span class="rp-card-d ${tone}">${o.delta}</span>`; })}
        ${when(!!o.spark, function () { return html`<span class="rp-spark" aria-hidden="true">${each(o.spark, function (v, i, arr) { var mx = Math.max.apply(null, arr); return html`<i style="--h:${Math.round(v / mx * 100)}%" class="${i === arr.length - 1 ? 'on' : ''}"></i>`; })}</span>`; })}
      </div>`;
  }

  function colChart(o) {
    var max = Math.max.apply(null, o.values.concat([o.plan || 0])) * 1.12;
    var y = function (v) { return (v / max * 100).toFixed(1); };
    return html`
      <div class="rp-visual" style="${o.style || ''}">
        <div class="rp-visual-t">${o.title}</div>
        <div class="rp-chart" role="img" aria-label="${o.aria}" style="--n:${o.values.length}">
          ${when(o.plan != null, function () { return html`<span class="rp-plan" style="--y:${y(o.plan)}%"><i>plan ${o.plan.toFixed(1)}</i></span>`; })}
          ${each(o.values, function (v, i) {
            var on = i === o.highlight;
            return html`<button type="button" class="rp-bar${on ? ' on' : ''}" style="--h:${y(v)}%" data-act="${o.act ? o.act + ':' + i : ''}" aria-label="${o.labels[i]}: ${v.toFixed(1)}"><span class="rp-bv num">${v.toFixed(1)}</span><span class="rp-bl">${o.labels[i]}</span></button>`;
          })}
          ${when(!!o.note, function () { return html`<div class="rp-note" style="--x:${o.note.x}%;--y:${o.note.y}%"><b>${o.note.h}</b><span>${o.note.t}</span></div>`; })}
        </div>
      </div>`;
  }

  function hBars(o) {
    var max = Math.max.apply(null, o.rows.map(function (r) { return Math.abs(r[1]); })) || 1;
    return html`
      <div class="rp-visual">
        <div class="rp-visual-t">${o.title}</div>
        <div class="rp-hbars">
          ${each(o.rows, function (r, i) {
            var on = i === o.highlight;
            return html`<button type="button" class="rp-hbar${on ? ' on' : ''}${r[1] < 0 ? ' neg' : ''}" data-act="${o.act ? o.act + ':' + i : ''}" aria-pressed="${on ? 'true' : 'false'}"><span>${r[0]}</span><span class="rp-track"><i style="--w:${(Math.abs(r[1]) / max * 100).toFixed(0)}%"></i></span><b class="num">${o.fmt ? o.fmt(r[1]) : r[1]}</b></button>`;
          })}
        </div>
      </div>`;
  }

  /* Matrix visual: dense rows, numeric columns right-aligned in mono, optional
     shading per cell (`shade` = 0..1) and a highlighted row. */
  function matrix(o) {
    return html`
      <div class="rp-visual${o.wide ? ' wide' : ''}">
        ${when(!!o.title, function () { return html`<div class="rp-visual-t">${o.title}</div>`; })}
        <table class="rp-matrix">
          <thead><tr>${each(o.head, function (h, i) { return html`<th class="${i ? 'num' : ''}">${h}</th>`; })}</tr></thead>
          <tbody>${each(o.rows, function (r) {
            return html`<tr class="${r.hl ? 'hl' : ''}${r.cls ? ' ' + r.cls : ''}">${each(r.cells, function (c, i) {
              var v = typeof c === 'object' && c !== null ? c : { t: c };
              return html`<td class="${i ? 'num' : ''}${v.tone ? ' ' + v.tone : ''}" ${raw(v.shade != null ? 'style="--s:' + v.shade + '"' : '')} ${raw(v.act ? 'data-cell="' + C.esc(v.act) + '"' : '')}>${v.act ? html`<button type="button" data-act="${v.act}" aria-label="${v.aria || v.t}">${v.t}</button>` : v.t}</td>`;
            })}</tr>`;
          })}</tbody>
        </table>
      </div>`;
  }

  /* A definition row, the consultancy's actual product. */
  function defRow(m) {
    return html`<div class="rp-def"><b>${m.name}</b><p>${m.definition}</p><dl><div><dt>Period</dt><dd>${m.period}</dd></div><div><dt>Unit</dt><dd>${m.unit}</dd></div><div><dt>Source</dt><dd>${m.source}</dd></div><div><dt>Owner</dt><dd>${m.owner}</dd></div></dl></div>`;
  }

  /* A callout outside any chart: a hairline, a bold line and a note. */
  function callout(o) {
    return html`<aside class="rp-callout${o.tone ? ' ' + o.tone : ''}">${when(!!o.chip, function () { return chip(o.chipTone || 'neutral', o.chip); })}<b>${o.title}</b>${when(!!o.text, function () { return html`<p>${o.text}</p>`; })}${when(!!(o.rows && o.rows.length), function () { return html`<dl>${each(o.rows, function (r) { return html`<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`; })}</dl>`; })}${when(!!o.extra, function () { return o.extra; })}${when(!!o.action, function () { return html`<button type="button" class="rp-btn" data-act="${o.action.act}" ${raw(o.action.disabled ? 'disabled' : '')}>${o.action.label}</button>`; })}</aside>`;
  }

  scene.chip = chip; scene.report = report; scene.card = card; scene.colChart = colChart; scene.hBars = hBars; scene.matrix = matrix; scene.defRow = defRow; scene.callout = callout;
  /* Kept for pages that still use the older names. */
  scene.drawer = callout;
  function fmt1(v) { return (v > 0 ? '+' : '') + v.toFixed(1); }


  /* -------------------------------------------------------------- scenes */
  var defs = {};

  /* Commercial performance report: overview, variance, actions, definitions. */
  var BI_DEFS = [
    { name: 'Net sales', definition: D.definition, period: 'Week 36, Monday to Sunday, by invoice date', unit: 'sample units (m)', source: D.ledgers.join(' · '), owner: D.owner },
    { name: 'Variance to plan', definition: 'Net sales less the plan agreed at the start of the quarter, for the same week and the same product lines. Shown in units and as a share of plan.', period: 'Week 36', unit: 'sample units (m) and %', source: 'Finance ledger · plan file', owner: D.owner },
    { name: 'Returns', definition: 'Credit notes posted against invoices of the week, by product line. Counted when posted, not when the goods arrive back.', period: 'Week 36, by posting date', unit: 'sample units (m)', source: D.ledgers[0], owner: 'Commercial finance lead' }
  ];
  var BI_TABS = ['Overview', 'Variance', 'Actions', 'Definitions'];
  defs.bi = {
    init: function () { return { tab: 0, line: 1, assigned: false }; },
    title: 'Commercial performance',
    render: function (s, o) {
      var delta = D.current - D.plan; var pctv = Math.round(delta / D.plan * 100);
      var line = D.lines[s.line];
      var cards = html`<div class="rp-cards">
        ${card({ label: 'Net sales · W36', value: D.current.toFixed(1) + 'm', delta: fmt1(delta) + 'm vs plan · ' + pctv + '%', tone: 'warn', spark: D.netSales })}
        ${card({ label: 'Gross invoiced', value: D.gross.toFixed(1) + 'm', delta: 'on plan', tone: 'ok' })}
        ${card({ label: 'Returns', value: D.returns.toFixed(1) + 'm', delta: (D.returns / D.gross * 100).toFixed(1) + '% of gross · 118 credit notes', tone: 'warn' })}
        ${card({ label: 'Availability · lowest', value: '41%', delta: 'Surulere · 4 locations', tone: 'warn' })}
      </div>`;
      var body;
      if (o.thumb) {
        body = html`${cards}${colChart({ title: 'Net sales by week, sample units (m)', labels: D.weeks, values: D.netSales, plan: D.plan, highlight: 5, aria: 'Net sales by week' })}`;
      } else if (s.tab === 0) {
        body = html`${cards}<div class="rp-grid">
          ${colChart({ title: 'Net sales by week, sample units (m)', labels: D.weeks, values: D.netSales, plan: D.plan, highlight: 5, aria: 'Net sales by week, W31 to W36, W36 at 9.6 against a plan of 10.0', act: 'week', note: { x: 70, y: 18, h: '−0.4m in W36', t: 'Snacks returns explain −0.3m. Open Variance.' } })}
          ${hBars({ title: 'Variance to plan by product line (m)', rows: D.lines, highlight: s.line, act: 'line', fmt: fmt1 })}
        </div>`;
      } else if (s.tab === 1) {
        body = html`<div class="rp-grid">
          ${matrix({ title: 'Week 36 by product line, sample units (m)', wide: true, head: ['Product line', 'Gross', 'Returns', 'Net sales', 'Plan', 'Variance', 'Credit notes'], rows: D.lines.map(function (l, i) {
            var gross = [3.1, 2.9, 2.2, 1.8][i]; var ret = [0.1, 0.3, 0.0, 0.0][i]; var net = gross - ret; var plan = net - l[1];
            return { hl: i === s.line, cells: [{ t: l[0], act: 'line:' + i, aria: 'Select ' + l[0] }, gross.toFixed(1), { t: ret.toFixed(1), shade: ret / 0.3 }, net.toFixed(1), plan.toFixed(1), { t: fmt1(l[1]), tone: l[1] < 0 ? 'neg' : '' }, [22, 118, 4, 0][i]] };
          }).concat([{ cls: 'total', cells: ['Total', D.gross.toFixed(1), D.returns.toFixed(1), D.current.toFixed(1), D.plan.toFixed(1), { t: fmt1(delta), tone: 'neg' }, '144'] }]) })}
          ${callout(line[1] < 0
            ? { chip: 'Largest driver', chipTone: 'warn', title: line[0] + ' · ' + fmt1(line[1]) + 'm', text: 'Returns in ' + line[0].toLowerCase() + ' account for most of the gap: 118 credit notes posted against W36 invoices, reconciled to the ledger.', rows: [['Source', D.ledgers[0]], ['Owner', D.owner]], action: { act: 'tab:2', label: 'Assign a follow-up' } }
            : { chip: 'In line with plan', chipTone: 'ok', title: line[0] + ' · ' + fmt1(line[1]) + 'm', text: line[0] + ' reconciles to plan. No action suggested from this line.', rows: [['Source', D.ledgers[0]]] })}
        </div>`;
      } else if (s.tab === 2) {
        body = html`<div class="rp-grid">
          ${matrix({ title: 'Follow-up actions linked to this report', wide: true, head: ['Action', 'Evidence', 'Owner', 'Due', 'Status'], rows: [
            { hl: true, cells: ['Are Snacks returns concentrated in a few outlets, and since which week?', 'W36 · Snacks −0.3m · 118 credit notes', D.owner, 'Next weekly review', { t: s.assigned ? 'Assigned' : 'Awaiting owner', tone: s.assigned ? 'ok' : 'warn' }] },
            { cells: ['Confirm Beverages credit notes are timing, not demand', 'W36 · Beverages −0.1m', 'Sales operations lead', 'Next weekly review', { t: 'Assigned', tone: 'ok' }] },
            { cells: ['Restock Surulere ahead of W38', 'Availability 41% · 1 delivery in W36', 'Supply chain data owner', 'W37', { t: 'In progress', tone: 'ok' }] }
          ] })}
          ${callout(s.assigned
            ? { chip: 'Recorded', chipTone: 'ok', title: 'The action is on the agenda.', text: 'The question, its evidence and its owner travel together into the next review. Nothing here was sent anywhere.', action: { act: 'reset', label: 'Start again' } }
            : { chip: 'Ready to assign', chipTone: 'warn', title: 'Make it someone\'s job.', text: 'An action without an owner is not an action. Assigning it records who answers at the next review.', action: { act: 'assign', label: 'Assign to ' + D.owner.toLowerCase() } })}
        </div>`;
      } else {
        body = html`<div class="rp-defs">${each(BI_DEFS, defRow)}</div>`;
      }
      return report({ title: defs.bi.title, sub: 'Week 36 · demo data: a Lagos FMCG distributor', slicers: [['Week', '36'], ['Region', 'All'], ['Channel', 'All']], tabs: BI_TABS, tab: s.tab, body: body, thumb: o.thumb, compact: o.compact, caption: 'Sample report page · demo data for a Lagos FMCG distributor · every figure opens to its definition' });
    },
    act: function (s, key, val) {
      if (key === 'tab') s.tab = Number(val);
      if (key === 'line') { s.line = Number(val); if (s.tab === 0) s.tab = 1; }
      if (key === 'week') s.tab = 1;
      if (key === 'assign') s.assigned = true;
      if (key === 'reset') { s.tab = 0; s.assigned = false; s.line = 1; }
    }
  };

  var INITS = [
    { id: 'defs', name: 'Metric definitions', owner: 'Finance lead', phase: 1, q: 'Which definition of net sales do we report?', accept: 'One agreed definition, period rule and owner in the KPI dictionary.', needs: [] },
    { id: 'src', name: 'Source integration', owner: 'Data owner', phase: 1, q: 'Can sales and finance data be joined without manual reconciliation?', accept: 'Both sources load on schedule with reconciliation checks passing.', needs: ['defs'] },
    { id: 'rep', name: 'Weekly commercial reporting', owner: 'Commercial finance lead', phase: 2, q: 'Where is performance slipping this week?', accept: 'Reconciles to the ledger; used in the weekly review for four consecutive weeks.', needs: ['defs', 'src'] },
    { id: 'ai', name: 'AI reporting assistant', owner: 'Process owner', phase: 3, q: 'Can the weekly briefing be drafted with less manual preparation?', accept: 'Draft passes agreed checks; reviewer approval recorded for every release.', needs: ['rep'] }
  ];

  /* Delivery roadmap: initiatives on a phase timeline, readiness that
     responds to prerequisites. A plan, drawn as a plan. */
  defs.strategy = {
    init: function () { return { done: { defs: true, src: false }, sel: 'rep' }; },
    title: 'Delivery roadmap',
    render: function (s, o) {
      function ready(it) { return it.needs.every(function (n) { return s.done[n]; }); }
      function status(it) { if (s.done[it.id]) return ['ok', 'Complete']; return ready(it) ? ['ok', 'Ready to sequence'] : ['warn', 'Foundation needed']; }
      var sel = INITS.filter(function (i) { return i.id === s.sel; })[0]; var st = status(sel);
      var rows = html`<div class="rp-visual wide">
        <div class="rp-visual-t">Four initiatives, three phases · a change in prerequisites changes readiness</div>
        <div class="rp-roadmap">
          <div class="rm-head"><span>Initiative</span><span>Owner</span><span class="rm-ph"><i>Phase 1 · Foundations</i><i>Phase 2 · Reporting</i><i>Phase 3 · Assisted work</i></span><span>Status</span></div>
          ${each(INITS, function (it) {
            var sst = status(it);
            return html`<button type="button" class="rm-row${it.id === s.sel ? ' on' : ''}" data-act="sel:${it.id}" aria-pressed="${it.id === s.sel ? 'true' : 'false'}">
              <span class="rm-name">${it.name}${when(it.needs.length > 0, function () { return html`<small>after ${it.needs.map(function (n) { return INITS.filter(function (x) { return x.id === n; })[0].name.toLowerCase(); }).join(' and ')}</small>`; })}</span>
              <span class="rm-owner">${it.owner}</span>
              <span class="rm-ph"><i class="rm-bar p${it.phase} ${sst[0]}${s.done[it.id] ? ' done' : ''}"></i></span>
              <span>${chip(sst[0], sst[1])}</span>
            </button>`;
          })}
        </div>
      </div>`;
      if (o.thumb) return report({ title: defs.strategy.title, body: rows, thumb: true });
      var body = html`<div class="rp-cards">
        ${card({ label: 'Initiatives', value: '4', delta: '2 foundations · 1 report · 1 assistant' })}
        ${card({ label: 'Ready to sequence', value: String(INITS.filter(function (i) { return !s.done[i.id] && ready(i); }).length), delta: 'prerequisites met', tone: 'ok' })}
        ${card({ label: 'Foundation needed', value: String(INITS.filter(function (i) { return !s.done[i.id] && !ready(i); }).length), delta: 'blocked by an earlier step', tone: 'warn' })}
        ${card({ label: 'Decision gates', value: '3', delta: 'one before each phase' })}
      </div>
      <label class="rp-toggle"><input type="checkbox" data-act="toggle:src" ${raw(s.done.src ? 'checked' : '')}><span>Try it: mark source integration complete and watch readiness change</span></label>
      <div class="rp-grid">${rows}${callout({ chip: st[1], chipTone: st[0], title: sel.name, rows: [['Business question', sel.q], ['Prerequisites', sel.needs.length ? sel.needs.map(function (n) { return INITS.filter(function (x) { return x.id === n; })[0].name; }).join(' · ') : 'None. This comes first.'], ['Acceptance', sel.accept], ['Owner', sel.owner]] })}</div>`;
      return report({ title: defs.strategy.title, sub: 'Q4 plan · demo data', body: body, compact: o.compact, caption: 'Sample roadmap · demo data · readiness is computed from the prerequisites, not typed in' });
    },
    act: function (s, key, val, el) { if (key === 'toggle') s.done[val] = el ? !!el.checked : !s.done[val]; if (key === 'sel') s.sel = val; }
  };

  var SOURCES = [
    { id: 'sales', name: 'Sales', system: 'ERP sell-out', key: 'outlet_code', fields: ['outlet_code', 'sku', 'units', 'week'], recs: D.locations.map(function (l) { return ['OUT-' + l.outlet, 'SKU 4471 · W36', l.sales === 100 ? 312 : l.sales === 96 ? 299 : l.sales === 61 ? 190 : 278]; }) },
    { id: 'stock', name: 'Stock', system: 'Warehouse file', key: 'loc_code', fields: ['loc_code', 'item', 'avail_pct', 'week'], recs: D.locations.map(function (l) { return ['LOC-' + l.loc, 'Item 4471 · W36', l.avail + '%']; }) },
    { id: 'dist', name: 'Distribution', system: 'Route planner', key: 'drop_code', fields: ['drop_code', 'route', 'deliveries', 'week'], recs: D.locations.map(function (l) { return ['DROP-' + l.drop, 'Route E · W36', l.hl ? 1 : 3]; }) }
  ];

  /* Platform monitor: loads, sources and quality on one report page. */
  var RUNS = [
    { src: 'ERP orders', sys: 'ERP sell-out', at: '06:10', rows: '12,418', checks: '12/12', st: 'Loaded', tone: 'ok' },
    { src: 'CRM outlets', sys: 'Outlet master', at: '06:14', rows: '1,206', checks: '8/8', st: 'Loaded', tone: 'ok' },
    { src: 'Stock file', sys: 'Warehouse file', at: '06:22', rows: '584', checks: '6/7', st: '1 held', tone: 'warn' }
  ];
  defs.engineering = {
    init: function () { return { tab: 0, src: 'stock', held: false }; },
    title: 'Platform monitor',
    render: function (s, o) {
      var cur = SOURCES.filter(function (x) { return x.id === s.src; })[0];
      var cards = html`<div class="rp-cards">
        ${card({ label: 'Sources loaded', value: '3 / 3', delta: 'by 06:22 · on schedule', tone: 'ok' })}
        ${card({ label: 'Records loaded', value: '14,208', delta: 'W36', spark: [12.9, 13.4, 13.8, 14.1, 14.0, 14.2] })}
        ${card({ label: 'Checks passed', value: '26 / 27', delta: '1 record held · owner notified', tone: 'warn' })}
        ${card({ label: 'Traceable to source', value: '100%', delta: 'every row keeps its system and key', tone: 'ok' })}
      </div>`;
      var loads = matrix({ title: 'Loads this morning', wide: true, head: ['Source', 'System', 'Loaded at', 'Rows', 'Checks', 'Status'], rows: RUNS.map(function (r) { return { hl: r.tone === 'warn', cells: [{ t: r.src, act: 'src:' + (r.src === 'ERP orders' ? 'sales' : r.src === 'Stock file' ? 'stock' : 'dist') }, r.sys, r.at, r.rows, r.checks, { t: r.st, tone: r.tone }] }; }) });
      var body;
      if (o.thumb) body = html`${cards}${loads}`;
      else if (s.tab === 0) body = html`${cards}<div class="rp-grid">${loads}${callout(s.held
        ? { chip: 'Held record', chipTone: 'warn', title: 'Stock row 412 · missing product id', text: 'The record cannot join the product master, so it is held rather than loaded as an unknown product. Once the id is supplied it is revalidated against the same checks.', rows: [['Owner', 'Supply chain data owner'], ['Return path', 'Revalidate → curated stock model']], action: { act: 'held:0', label: 'Back to the loaded path' } }
        : { chip: '6 of 7 checks passed', chipTone: 'warn', title: 'One stock record was held.', text: 'The quality gate holds anything that cannot be joined and tells a named owner. Everything else loaded on schedule.', action: { act: 'held:1', label: 'Trace the held record' } })}</div>`;
      else if (s.tab === 1) body = html`<div class="rp-grid">
        ${matrix({ title: 'How ' + cur.name.toLowerCase() + ' fields map to the shared model', wide: true, head: ['Source field', 'Model field', 'Rule', 'Check'], rows: [
          { hl: true, cells: [cur.key, 'location_id', 'Standardised to one location id', { t: 'Passed', tone: 'ok' }] },
          { cells: [cur.fields[1], cur.id === 'sales' ? 'product_id' : cur.id === 'stock' ? 'product_id' : 'route_id', 'Matched to the product master', { t: cur.id === 'stock' ? '1 held' : 'Passed', tone: cur.id === 'stock' ? 'warn' : 'ok' }] },
          { cells: [cur.fields[2], cur.id === 'sales' ? 'units_sold' : cur.id === 'stock' ? 'availability_pct' : 'deliveries', 'Typed and range-checked', { t: 'Passed', tone: 'ok' }] },
          { cells: [cur.fields[3], 'week', 'ISO week from the record date', { t: 'Passed', tone: 'ok' }] }
        ] })}
        ${callout({ chip: cur.name, chipTone: 'neutral', title: cur.system, text: cur.name + ' contributes ' + cur.fields.length + ' fields. Select another source in the loads table to see what it contributes.', rows: [['Key', cur.key], ['Sample record', cur.recs[0][0] + ' · ' + cur.recs[0][1]]] })}
      </div>`;
      else body = html`${matrix({ title: 'Resulting view · W36 · one row per location, every figure traceable', wide: true, head: ['Location', 'Sales index', 'Availability', 'Deliveries', 'Source keys'], rows: D.locations.map(function (l) { return { hl: !!l.hl, cells: [l.name, String(l.sales), { t: l.avail + '%', shade: 1 - l.avail / 100 }, String(l.hl ? 1 : 3), 'OUT-' + l.outlet + ' · LOC-' + l.loc + ' · DROP-' + l.drop] }; }) })}`;
      return report({ title: defs.engineering.title, sub: 'W36 · demo data: a Lagos FMCG distributor', slicers: [['Run', 'Mon 06:00'], ['Source', 'All']], tabs: ['Loads', 'Mapping', 'Resulting view'], tab: s.tab, body: body, thumb: o.thumb, compact: o.compact, caption: 'Sample platform monitor · demo data · a held record names an owner instead of loading as unknown' });
    },
    act: function (s, key, val) { if (key === 'tab') s.tab = Number(val); if (key === 'src') { s.src = val; s.tab = 1; } if (key === 'held') s.held = val === '1'; }
  };

  var ITEMS = [
    { id: 'w36', name: 'Weekly briefing · W36', src: 'Sales W36 · Stock W36 · Finance ledger W36', proposed: 'Net sales 9.6m against plan 10.0m (−4%). Snacks returns account for −0.3m.', checks: 'Passed · all figures W36 · references resolve', ok: true },
    { id: 'w36b', name: 'Weekly briefing · W36 (ledger late)', src: 'Sales W36 · Stock W36 · Finance ledger — not available', proposed: 'Draft with the net sales statement flagged: figure unavailable, ledger not yet loaded.', checks: 'Failed · required source missing', ok: false }
  ];

  /* Review log: automation drafts, checks run, a person decides. */
  defs.ai = {
    init: function () { return { tab: 0, item: 'w36', decision: null }; },
    title: 'Review log',
    render: function (s, o) {
      var it = ITEMS.filter(function (x) { return x.id === s.item; })[0];
      var status = !it.ok ? 'Stopped at review · missing evidence' : s.decision === 'approve' ? 'Approved for release · recorded' : s.decision === 'return' ? 'Returned for correction · recorded' : 'Awaiting reviewer decision';
      var tone = !it.ok || s.decision === 'return' ? 'warn' : s.decision === 'approve' ? 'ok' : 'neutral';
      var queue = matrix({ title: 'Weekly briefings · proposed by automation, checked by rules, decided by a person', wide: true, head: ['Item', 'Sources', 'Checks', 'Reviewer', 'Status'], rows: [
        { hl: s.item === 'w36', cells: [{ t: 'Weekly briefing · W36', act: 'item:w36' }, 'Sales · Stock · Ledger', '3/3 passed', D.owner, { t: it.id === 'w36' ? status.split(' · ')[0] : 'Awaiting reviewer', tone: it.id === 'w36' ? tone : 'neutral' }] },
        { hl: s.item === 'w36b', cells: [{ t: 'Weekly briefing · W36 (ledger late)', act: 'item:w36b' }, 'Sales · Stock · —', '2/3 · ledger missing', D.owner, { t: 'Stopped at review', tone: 'warn' }] },
        { cells: ['Weekly briefing · W35', 'Sales · Stock · Ledger', '3/3 passed', D.owner, { t: 'Approved · Mon 09:12', tone: 'ok' }] },
        { cells: ['Stock alert · Territory East', 'Stock · Outlets', '2/2 passed', 'Supply chain data owner', { t: 'Sent · owner assigned', tone: 'ok' }] }
      ] });
      var body;
      if (o.thumb) body = html`<div class="rp-cards">${card({ label: 'Items this week', value: '4' })}${card({ label: 'Checks passed', value: '10 / 11', tone: 'warn' })}${card({ label: 'Released without review', value: '0', tone: 'ok' })}</div>${queue}`;
      else if (s.tab === 0) body = html`<div class="rp-cards">
          ${card({ label: 'Items this week', value: '4', delta: '2 briefings · 1 alert · 1 held' })}
          ${card({ label: 'Checks passed', value: '10 / 11', delta: '1 source missing', tone: 'warn' })}
          ${card({ label: 'Decided by a person', value: '4 / 4', delta: 'reviewer recorded on every item', tone: 'ok' })}
          ${card({ label: 'Released without review', value: '0', delta: 'by design', tone: 'ok' })}
        </div>${queue}`;
      else body = html`<div class="rp-grid">
          ${matrix({ title: it.name, wide: true, head: ['Step', 'What happened', 'Result'], rows: [
            { cells: ['1 · Input', 'Scheduled trigger · Monday 07:00 · ' + it.src, { t: 'Done', tone: 'ok' }] },
            { cells: ['2 · Proposed', it.proposed, { t: 'Labelled proposed, not verified', tone: 'neutral' }] },
            { hl: !it.ok, cells: ['3 · Checks', it.checks, { t: it.ok ? 'Passed' : 'Failed', tone: it.ok ? 'ok' : 'warn' }] },
            { hl: it.ok && !s.decision, cells: ['4 · Human review', 'Reviewer · ' + D.owner, { t: status.split(' · ')[0], tone: tone }] }
          ] })}
          ${callout({ chip: status.split(' · ')[0], chipTone: tone, title: it.ok ? (s.decision ? 'Decision recorded.' : 'Your call, reviewer.') : 'Nothing is released without its evidence.', text: it.ok ? (s.decision ? 'The decision, the draft and the checks are kept together. Nothing here was sent anywhere.' : 'The checks passed and every statement links to its measure. Approve the release, or send it back with a reason.') : 'The ledger for W36 had not loaded, so the period check could not run. The item stops here until the source arrives.', extra: it.ok && !s.decision ? html`<div class="rp-actions"><button type="button" class="rp-btn" data-act="decide:approve">Approve release</button><button type="button" class="rp-btn ghost" data-act="decide:return">Return for correction</button></div>` : null, action: s.decision ? { act: 'decide:', label: 'Reset the decision' } : null })}
        </div>`;
      return report({ title: defs.ai.title, sub: 'W36 · demo data', slicers: [['Week', '36'], ['Workflow', 'Weekly briefing']], tabs: ['Queue', 'Item'], tab: s.tab, body: body, thumb: o.thumb, compact: o.compact, caption: 'Sample review log · demo data · automation proposes, rules check, a named person decides' });
    },
    act: function (s, key, val) { if (key === 'tab') s.tab = Number(val); if (key === 'item') { s.item = val; s.decision = null; s.tab = 1; } if (key === 'decide') s.decision = val || null; }
  };

  var ROLES = [
    { name: 'Leader', evidence: 'a written explanation of one KPI variance reviewed against the rubric', tasks: [['Explain a KPI variance', 3], ['Challenge a definition in review', 2], ['Assign and track a follow-up action', 3]] },
    { name: 'Analyst', evidence: 'an updated measure and a reconciled report checked by a reviewer', tasks: [['Update a measure', 3], ['Reconcile a report to source', 3], ['Add a drill path', 2]] },
    { name: 'Engineer', evidence: 'a failed load investigated and resolved using the runbook', tasks: [['Investigate a failed load', 3], ['Resolve an exception queue item', 3], ['Deploy a model change', 2]] }
  ];
  var LEVELS = ['Baseline', 'Guided practice', 'Independent'];

  /* Capability baseline: who can do which task without help. */
  defs.capability = {
    init: function () { return { role: 1, task: 0 }; },
    title: 'Capability baseline',
    render: function (s, o) {
      var role = ROLES[s.role]; var task = role.tasks[s.task];
      var all = ROLES.reduce(function (a, r) { return a.concat(r.tasks); }, []);
      var indep = all.filter(function (t) { return t[1] === 3; }).length;
      var cards = html`<div class="rp-cards">
        ${card({ label: 'Tasks in scope', value: String(all.length), delta: '3 roles' })}
        ${card({ label: 'Independent', value: indep + ' / ' + all.length, delta: 'demonstrated on real work, checked', tone: 'ok' })}
        ${card({ label: 'Still guided', value: (all.length - indep) + ' / ' + all.length, delta: 'next: a work sample without help', tone: 'warn' })}
        ${card({ label: 'Reviewed by', value: 'Named', delta: 'attendance alone never counts' })}
      </div>`;
      var grid = matrix({ title: 'Role × task · baseline → guided practice → independent', wide: true, head: ['Role · task', 'Baseline', 'Guided', 'Independent'], rows: ROLES.reduce(function (acc, r, ri) {
        return acc.concat(r.tasks.map(function (t, ti) { return { hl: ri === s.role && ti === s.task, cells: [{ t: r.name + ' · ' + t[0], act: 'pick:' + ri + ':' + ti }, { t: '●', tone: 'ok' }, { t: t[1] >= 2 ? '●' : '○', tone: t[1] >= 2 ? 'ok' : 'muted' }, { t: t[1] >= 3 ? '●' : '○', tone: t[1] >= 3 ? 'ok' : 'muted' }] }; }));
      }, []) });
      var body = o.thumb ? html`${cards}${grid}` : html`${cards}<div class="rp-grid">${grid}${callout({ chip: task[1] === 3 ? 'Independent' : 'Practising', chipTone: task[1] === 3 ? 'ok' : 'warn', title: role.name + ' · ' + task[0], text: task[1] === 3 ? 'Demonstrated on a real work sample and checked by a reviewer.' : 'Practised with guidance. The next step is a work sample done without help, reviewed against the rubric.', rows: [['Evidence', role.evidence]] })}</div>`;
      return report({ title: defs.capability.title, sub: 'Month 3 · demo data', slicers: [['Programme', 'Reporting handover'], ['Role', 'All']], body: body, thumb: o.thumb, compact: o.compact, caption: 'Sample baseline · illustrative roles and tasks · individual results are never published' });
    },
    act: function (s, key, val) { if (key === 'pick') { var p = val.split(':'); s.role = Number(p[0]); s.task = Number(p[1]); } if (key === 'role') { s.role = Number(val); s.task = 0; } if (key === 'task') s.task = Number(val); }
  };

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

  /* Industry report page: the sector's own measures, a matrix of its rows,
     the systems they come from, and every figure's definition. */
  defs.lineage = {
    init: function () { return { tab: 0, metric: 0 }; },
    title: 'Source workspace',
    render: function (s, o) {
      var ind = o.industry; var M = IND[ind.slug]; if (!M) return html``;
      var ent = M.entity.split(' · ');
      var hlRow = M.rows.filter(function (r) { return r.hl; })[0] || M.rows[0];
      var cells0 = M.cells(hlRow);
      var cards = html`<div class="rp-cards">${each(M.metrics, function (m, i) { return card({ label: m.name + ' · ' + hlRow.name, value: cells0[i], delta: 'definition agreed · ' + m.owner, on: s.metric === i, act: 'metric:' + i }); })}</div>`;
      var mat = matrix({ title: M.entity.charAt(0).toUpperCase() + M.entity.slice(1) + ' · select any figure to open its definition', wide: true, head: [ent[0]].concat(M.metrics.map(function (m) { return m.name; })), rows: M.rows.map(function (r) {
        var cs = M.cells(r); return { hl: !!r.hl, cells: [r.name].concat(cs.map(function (c, i) { return { t: c, act: 'metric:' + i, aria: r.name + ' ' + M.metrics[i].name + ': ' + c + '. Open the definition' }; })) };
      }) });
      var body;
      if (o.thumb) body = html`${cards}${mat}`;
      else if (s.tab === 0) body = html`${cards}<div class="rp-grid">${mat}${callout({ chip: 'Definition', chipTone: 'ok', title: M.metrics[s.metric].name, text: M.metrics[s.metric].definition, rows: [['Period', M.metrics[s.metric].period], ['Unit', M.metrics[s.metric].unit], ['Source', M.metrics[s.metric].source], ['Owner', M.metrics[s.metric].owner]] })}</div>`;
      else if (s.tab === 1) body = html`${matrix({ title: 'Systems feeding this page · each stays as it is; one model links them', wide: true, head: ['System', 'Platform', 'Key', 'Fields used', 'Feeds'], rows: M.sources.map(function (src) { return { cells: [src.name, src.system, src.key, src.fields.join(' · '), src.feeds.length ? src.feeds.join(' · ') : 'context only'] }; }) })}`;
      else body = html`<div class="rp-defs">${each(M.metrics, defRow)}</div>`;
      return report({ title: ind.title + ' · performance', sub: ent[1] + ' · demo data for a Nigerian ' + ind.title.split(' ')[0].toLowerCase() + ' business', slicers: [['Period', ent[1]], [ent[0].charAt(0).toUpperCase() + ent[0].slice(1), 'All']], tabs: ['Overview', 'Sources', 'Definitions'], tab: s.tab, body: body, thumb: o.thumb, compact: o.compact, caption: 'Sample report page · demo data · ' + ind.question });
    },
    act: function (s, key, val) { if (key === 'tab') s.tab = Number(val); if (key === 'metric') { s.metric = Number(val); if (s.tab !== 0) s.tab = 0; } }
  };

  scene.defs = defs;

  function renderDef(def, s, opts) {
    var out = def.render(s, opts).value;
    return out;
  }

  scene.mount = function (host, name, opts) {
    opts = opts || {};
    var def = defs[name]; if (!def || !host) return function () {};
    var s = Object.assign(def.init(), opts.state || {});
    var swapT = null;
    var tmpl = document.createElement('template');

    function focusKey() {
      var ae = document.activeElement;
      if (!ae || !host.contains(ae)) return null;
      var act = ae.getAttribute && ae.getAttribute('data-act');
      if (act) return '[data-act="' + act + '"]';
      if (ae.getAttribute('role') === 'tab') return '[role="tab"][aria-selected="true"]';
      return null;
    }
    function restoreFocus(key, wantSelectedTab) {
      var el = wantSelectedTab ? host.querySelector('[role="tab"][aria-selected="true"]') : (key && host.querySelector(key));
      if (!el && key) el = host.querySelector('[role="tab"][aria-selected="true"]') || host.querySelector('[data-act]');
      if (el) el.focus({ preventScroll: true });
    }

    function patch() {
      tmpl.innerHTML = renderDef(def, s, opts);
      var next = tmpl.content.firstElementChild;
      var cur = host.querySelector('[data-scene-frame]');
      if (!cur) { host.innerHTML = ''; host.appendChild(next); return; }
      var nb = next.querySelector('[data-scene-body]'), cb = cur.querySelector('[data-scene-body]');
      if (nb && cb) cb.innerHTML = nb.innerHTML;
      var ns = next.querySelector('.rp-tabs'), cs = cur.querySelector('.rp-tabs');
      if (ns && cs) {
        var nt = ns.querySelectorAll('[role="tab"]'), ct = cs.querySelectorAll('[role="tab"]');
        for (var i = 0; i < ct.length && i < nt.length; i++) {
          ct[i].setAttribute('aria-selected', nt[i].getAttribute('aria-selected'));
          ct[i].tabIndex = nt[i].tabIndex;
        }
      }
    }

    function paint(animate, key, wantSelectedTab) {
      var frameEl = host.querySelector('[data-scene-frame]');
      if (!animate || C.motion.reduced || !frameEl) {
        patch();
        restoreFocus(key, wantSelectedTab);
        return;
      }
      /* Settle the body (not the whole scene), swap, enter. 160 + 240 ms. */
      frameEl.classList.add('is-settling');
      clearTimeout(swapT);
      swapT = setTimeout(function () {
        patch();
        var f = host.querySelector('[data-scene-frame]');
        f.classList.remove('is-settling');
        f.classList.add('is-entering');
        requestAnimationFrame(function () { f.classList.remove('is-entering'); });
        restoreFocus(key, wantSelectedTab);
      }, 160);
    }
    host.innerHTML = renderDef(def, s, opts);

    function onEvent(e) {
      var el = e.target.closest('[data-act]'); if (!el || !host.contains(el)) return;
      if (e.type === 'click' && el.tagName === 'INPUT') return; // handled on change
      if (e.type === 'change' && el.tagName !== 'INPUT') return;
      var parts = el.getAttribute('data-act').split(':'); var key = parts[0], val = parts.slice(1).join(':');
      var fk = focusKey();
      def.act(s, key, val, el);
      paint(true, fk, key === 'tab');
    }
    function onKey(e) {
      if (!e.target.matches('[role="tab"]')) return;
      var tabs = Array.prototype.slice.call(host.querySelectorAll('[role="tab"]')); var i = tabs.indexOf(e.target);
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : e.key === 'Home' ? -99 : e.key === 'End' ? 99 : 0; if (!d) return;
      e.preventDefault();
      var n = d === -99 ? 0 : d === 99 ? tabs.length - 1 : Math.max(0, Math.min(tabs.length - 1, i + d));
      def.act(s, 'tab', n);
      paint(true, null, true);
    }
    host.addEventListener('click', onEvent); host.addEventListener('change', onEvent); host.addEventListener('keydown', onKey);
    /* A page can drive the scene (guided walkthroughs) through this handle. */
    host._pgScene = { act: function (key, val) { def.act(s, key, val, null); paint(true, null, key === 'step'); }, state: s, reset: function () { s = Object.assign(def.init(), opts.state || {}); host._pgScene.state = s; paint(true); } };
    return function () { host.removeEventListener('click', onEvent); host.removeEventListener('change', onEvent); host.removeEventListener('keydown', onKey); clearTimeout(swapT); delete host._pgScene; };
  };

  /* A guided walkthrough over a mounted scene: a script of [ms, key, value]
     steps, a progress line, and a button that starts, stops and replays.
     Any click or key press inside the scene takes over. */
  scene.walk = function (host, btn, progress, script, total) {
    if (!host || !btn) return function () {};
    var timers = []; var walking = false;
    var idle = '<span class="play" aria-hidden="true">▶</span>' + C.esc(btn.getAttribute('data-walk-label') || 'Watch how it works');
    function stop(label) {
      walking = false; timers.forEach(clearTimeout); timers = [];
      btn.setAttribute('aria-pressed', 'false'); btn.innerHTML = label || ('<span class="play" aria-hidden="true">▶</span>Replay the walkthrough');
      if (progress) { progress.hidden = true; progress.firstElementChild.style.setProperty('--p', '0%'); }
    }
    function start() {
      var d = host._pgScene; if (!d) return;
      stop(); walking = true;
      btn.setAttribute('aria-pressed', 'true'); btn.innerHTML = '<span class="play" aria-hidden="true">❚❚</span>Stop';
      d.reset();
      if (progress) { progress.hidden = false; }
      script.forEach(function (st) { timers.push(setTimeout(function () { if (st[1]) d.act(st[1], st[2]); if (progress) progress.firstElementChild.style.setProperty('--p', Math.round(st[0] / total * 100) + '%'); }, st[0])); });
      timers.push(setTimeout(function () { if (progress) progress.firstElementChild.style.setProperty('--p', '100%'); stop(); }, total));
    }
    var onBtn = function () { walking ? stop() : start(); };
    var onTake = function (e) { if (walking && e.target.closest('[data-act]')) stop(); };
    btn.addEventListener('click', onBtn); host.addEventListener('click', onTake); host.addEventListener('keydown', onTake);
    return function () { btn.removeEventListener('click', onBtn); host.removeEventListener('click', onTake); host.removeEventListener('keydown', onTake); stop(idle); };
  };
  scene.BI_WALK = { script: [[0, null], [5000, 'line', '1'], [10000, 'line', '0'], [13000, 'line', '1'], [16000, 'tab', '2'], [19000, 'assign', '']], total: 21000 };

  /* A static render for places that cannot host interaction (previews). */
  scene.render = function (name, opts) { var def = defs[name]; opts = opts || {}; return raw(renderDef(def, Object.assign(def.init(), opts.state || {}), opts)); };
})();
