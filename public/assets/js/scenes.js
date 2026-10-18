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

  function frame(o) {
    return html`
      <div class="scene${o.compact ? ' scene-compact' : ''}${o.dark ? ' scene-dark' : ''}" data-scene-frame role="group" aria-label="${o.title} — illustrative demo">
        <div class="scene-bar">
          <span class="scene-id"><span class="scene-glyph" aria-hidden="true"><i></i><i></i><i></i></span>${o.title}</span>
          <span class="scene-tag">Illustrative demo</span>
        </div>
        ${when(!!o.steps, function () {
          return html`<div class="scene-steps" role="tablist" aria-label="${o.title} stages">${each(o.steps, function (st, i) {
            return html`<button type="button" role="tab" class="scene-step" data-act="step:${i}" aria-selected="${i === o.step ? 'true' : 'false'}" tabindex="${i === o.step ? '0' : '-1'}"><span class="n">${i + 1}</span>${st}</button>`;
          })}</div>`;
        })}
        <div class="scene-body" data-scene-body>${o.body}</div>
        <div class="scene-foot"><span><i class="dot" aria-hidden="true"></i>${o.chain}</span><span>Sample data · nothing is sent or saved</span></div>
      </div>`;
  }

  function chip(tone, text) { return html`<span class="chip-state ${tone}">${text}</span>`; }

  function kpi(o) {
    return html`
      <div class="kpi">
        <span class="kpi-l">${o.label}</span>
        <span class="kpi-v num">${o.value}</span>
        <span class="kpi-d"><b class="${o.tone || ''}">${o.delta}</b>${when(!!o.meta, function () { return html` · ${o.meta}`; })}</span>
      </div>`;
  }

  function bars(o) {
    var max = Math.max.apply(null, o.values) * 1.08;
    return html`
      <div class="bars" role="img" aria-label="${o.aria}">
        <div class="bars-plot" style="--n:${o.values.length}">
          ${each(o.values, function (v, i) {
            var on = i === o.highlight;
            return html`<div class="bar${on ? ' on' : ''}" style="--h:${(v / max * 100).toFixed(1)}%"><span class="bv num">${v.toFixed(1)}</span><span class="bl">${o.labels[i]}</span></div>`;
          })}
          ${when(o.plan != null, function () { return html`<span class="bars-plan" style="--y:${(o.plan / max * 100).toFixed(1)}%"><i>plan ${o.plan.toFixed(1)}</i></span>`; })}
        </div>
        <span class="bars-cap">${o.caption}</span>
      </div>`;
  }

  function drawer(o) {
    return html`
      <aside class="action-drawer${o.raised ? ' raised' : ''}" aria-live="polite">
        ${when(!!o.chip, function () { return chip(o.chipTone || 'warn', o.chip); })}
        <h4>${o.title}</h4>
        ${when(!!o.text, function () { return html`<p>${o.text}</p>`; })}
        ${when(!!(o.rows && o.rows.length), function () {
          return html`<dl class="action-drawer-rows">${each(o.rows, function (r) { return html`<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`; })}</dl>`;
        })}
        ${when(!!o.extra, function () { return o.extra; })}
        ${when(!!o.action, function () {
          return html`<button type="button" class="btn action-drawer-cta" data-act="${o.action.act}" ${raw(o.action.disabled ? 'disabled' : '')}>${o.action.label}<span class="chev" aria-hidden="true">→</span></button>`;
        })}
        ${when(!!o.note, function () { return html`<span class="action-drawer-note">${o.note}</span>`; })}
      </aside>`;
  }

  function records(list) {
    return html`<ul class="recs">${each(list, function (r) { return html`<li><span class="mono">${r[0]}</span><span>${r[1]}</span>${when(r[2] != null, function () { return html`<b class="num">${r[2]}</b>`; })}</li>`; })}</ul>`;
  }

  scene.frame = frame; scene.chip = chip; scene.kpi = kpi; scene.bars = bars; scene.drawer = drawer; scene.records = records;

  /* -------------------------------------------------------------- scenes */

  var defs = {};

  /* Performance: metric → trace → accountable action. */
  defs.bi = {
    init: function () { return { step: 0, line: 1, assigned: false }; },
    steps: ['Performance', 'Trace sources', 'Assign action'],
    title: 'Decision workspace',
    chain: 'Measure → evidence → accountable action',
    render: function (s, o) {
      var delta = (D.current - D.plan);
      var pct = Math.round(delta / D.plan * 100);
      var line = D.lines[s.line];
      var body;
      if (s.step === 0) {
        body = html`
          <div class="scene-head"><div><span class="label-caps">A measure worth acting on</span><h3>Net sales, with context.</h3></div><span class="scene-meta">Sample period · W31–W36</span></div>
          <div class="scene-grid">
            <div class="surface">
              ${kpi({ label: 'Week 36 net sales', value: D.current.toFixed(1) + 'm', delta: Math.abs(delta).toFixed(1) + 'm below plan', tone: 'warn', meta: 'Plan ' + D.plan.toFixed(1) + 'm' })}
              ${bars({ labels: D.weeks, values: D.netSales, highlight: 5, plan: D.plan, caption: 'Weekly net sales · sample units (m) · zero baseline', aria: 'Net sales by week, W31 to W36, with W36 at 9.6 against a plan of 10.0' })}
            </div>
            ${when(!o.preview, function () { return drawer({ chip: 'Needs review', title: 'Understand the gap.', text: 'Trace the W36 figure to its source records before assigning a response.', rows: [['Reporting period', 'Week 36'], ['Source ledgers', String(D.ledgers.length)]], action: { act: 'step:1', label: 'Trace this metric' } }); })}
          </div>
          ${when(!!o.preview, function () { return html`<p class="scene-meta">${chip('warn', 'Needs review')} Trace the W36 figure to its source records, then assign a follow-up with an owner.</p>`; })}`;
      } else if (s.step === 1) {
        body = html`
          <div class="scene-head"><div><span class="label-caps">Where the −${Math.abs(delta).toFixed(1)}m comes from</span><h3>One figure, its breakdown and its definition.</h3></div><span class="scene-meta">Variance by product line · sums to −${Math.abs(delta).toFixed(1)}</span></div>
          <div class="scene-grid">
            <div class="surface">
              <div class="trace-rows" role="list">
                ${each(D.lines, function (l, i) {
                  var w = Math.abs(l[1]) / 0.4 * 100;
                  return html`<button type="button" role="listitem" class="trace-row${i === s.line ? ' on' : ''}" data-act="line:${i}" aria-pressed="${i === s.line ? 'true' : 'false'}"><span>${l[0]}</span><span class="tbar"><i style="--w:${w}%"></i></span><b class="num ${l[1] < 0 ? 'warn' : ''}">${l[1] === 0 ? '0.0' : l[1].toFixed(1)}</b></button>`;
                })}
              </div>
              <div class="defn"><span class="label-caps">Agreed definition</span><p>${D.definition}</p><span class="scene-meta">Owner · ${D.owner}</span></div>
            </div>
            ${drawer({ chip: line[1] < 0 ? 'Largest driver' : 'In line with plan', chipTone: line[1] < 0 ? 'warn' : 'ok', title: line[0] + ' · ' + (line[1] === 0 ? '0.0' : line[1].toFixed(1)) + 'm', text: line[1] < 0 ? 'Returns in ' + line[0].toLowerCase() + ' account for most of the gap. The source rows are the credit notes posted against W36 invoices.' : line[0] + ' reconciles to plan. No action suggested from this line.', rows: [['Records', line[1] < 0 ? '118 credit notes' : '—'], ['Source', D.ledgers[0]], ['Checked', 'Reconciles to ledger']], action: { act: 'step:2', label: 'Assign a follow-up' } })}
          </div>`;
      } else {
        body = html`
          <div class="scene-head"><div><span class="label-caps">A question with an owner</span><h3>Decide who looks, and by when.</h3></div><span class="scene-meta">Linked to W36 net sales · Snacks</span></div>
          <div class="scene-grid">
            <div class="surface">
              <div class="action-card${s.assigned ? ' done' : ''}">
                <span class="label-caps">Follow-up action</span>
                <p class="action-q">Are Snacks returns concentrated in a few outlets, and since which week?</p>
                <dl class="action-drawer-rows"><div><dt>Owner</dt><dd>${D.owner}</dd></div><div><dt>Due</dt><dd>Next weekly review</dd></div><div><dt>Evidence linked</dt><dd>W36 net sales · Snacks −0.3m · 118 credit notes</dd></div><div><dt>Status</dt><dd>${s.assigned ? chip('ok', 'Assigned · owner recorded') : chip('warn', 'Awaiting assignment')}</dd></div></dl>
              </div>
            </div>
            ${drawer({ chip: s.assigned ? 'Recorded' : 'Ready to assign', chipTone: s.assigned ? 'ok' : 'warn', title: s.assigned ? 'The action is on the agenda.' : 'Make it someone\'s job.', text: s.assigned ? 'The question, its evidence and its owner travel together into the next review. Nothing here was sent anywhere.' : 'An action without an owner is a wish. Assigning it records who answers at the next review.', action: s.assigned ? { act: 'reset', label: 'Start again' } : { act: 'assign', label: 'Assign to ' + D.owner.toLowerCase() } })}
          </div>`;
      }
      return frame({ title: defs.bi.title, steps: defs.bi.steps, step: s.step, chain: defs.bi.chain, body: body, compact: o.compact });
    },
    act: function (s, key, val) {
      if (key === 'step') s.step = Number(val);
      if (key === 'line') s.line = Number(val);
      if (key === 'assign') s.assigned = true;
      if (key === 'reset') { s.step = 0; s.assigned = false; s.line = 1; }
    }
  };

  /* Delivery: initiatives, owners, dependencies, readiness, timeline. */
  var INITS = [
    { id: 'defs', name: 'Metric definitions', owner: 'Finance lead', phase: 1, q: 'Which definition of net sales do we report?', accept: 'One agreed definition, period rule and owner in the KPI dictionary.', needs: [] },
    { id: 'src', name: 'Source integration', owner: 'Data owner', phase: 1, q: 'Can sales and finance data be joined without manual reconciliation?', accept: 'Both sources load on schedule with reconciliation checks passing.', needs: ['defs'] },
    { id: 'rep', name: 'Weekly commercial reporting', owner: 'Commercial finance lead', phase: 2, q: 'Where is performance slipping this week?', accept: 'Reconciles to the ledger; used in the weekly review for four consecutive weeks.', needs: ['defs', 'src'] },
    { id: 'ai', name: 'AI reporting assistant', owner: 'Process owner', phase: 3, q: 'Can the weekly briefing be drafted with less manual preparation?', accept: 'Draft passes agreed checks; reviewer approval recorded for every release.', needs: ['rep'] }
  ];
  defs.strategy = {
    init: function () { return { done: { defs: true, src: false }, sel: 'rep' }; },
    title: 'Delivery workspace',
    chain: 'Business question → readiness → sequenced roadmap',
    render: function (s, o) {
      function ready(it) { return it.needs.every(function (n) { return s.done[n]; }); }
      function status(it) {
        if (s.done[it.id]) return ['ok', 'Complete'];
        return ready(it) ? ['ok', 'Ready to sequence'] : ['warn', 'Foundation needed'];
      }
      var sel = INITS.filter(function (i) { return i.id === s.sel; })[0];
      var st = status(sel);
      var body = html`
        <div class="scene-head"><div><span class="label-caps">Phased roadmap</span><h3>Four initiatives, in the order they can succeed.</h3></div>
          ${when(!o.preview, function () { return html`<label class="scene-toggle"><input type="checkbox" data-act="toggle:src" ${raw(s.done.src ? 'checked' : '')}><span>Try it: mark source integration complete</span></label>`; })}</div>
        <div class="scene-grid wide">
          <div class="surface">
            <div class="tl-head"><span>Initiative</span><span>Owner</span><span class="tl-phases"><i>Phase 1</i><i>Phase 2</i><i>Phase 3</i></span><span>Status</span></div>
            ${each(INITS, function (it) {
              var sst = status(it);
              return html`<button type="button" class="tl-row${it.id === s.sel ? ' on' : ''}" data-act="sel:${it.id}" aria-pressed="${it.id === s.sel ? 'true' : 'false'}">
                <span class="tl-name">${it.name}${when(it.needs.length > 0, function () { return html`<small>needs ${it.needs.map(function (n) { return INITS.filter(function (x) { return x.id === n; })[0].name.toLowerCase(); }).join(', ')}</small>`; })}</span>
                <span class="tl-owner">${it.owner}</span>
                <span class="tl-phases"><i class="tl-bar p${it.phase} ${sst[0]}"></i></span>
                <span>${chip(sst[0], sst[1])}</span>
              </button>`;
            })}
          </div>
          ${when(!o.compact, function () {
            return drawer({ chip: st[1], chipTone: st[0], title: sel.name, rows: [['Business question', sel.q], ['Prerequisites', sel.needs.length ? sel.needs.map(function (n) { return INITS.filter(function (x) { return x.id === n; })[0].name; }).join(' · ') : 'None. This comes first.'], ['Acceptance', sel.accept], ['Owner', sel.owner]], note: st[0] === 'warn' ? 'Readiness changes when the prerequisites above are complete.' : '' });
          })}
        </div>
        ${when(!!o.compact, function () { return html`<p class="scene-meta"><b>${sel.name}</b> · ${sel.owner} · ${st[1]}. ${st[0] === 'warn' ? 'Readiness changes when its prerequisites are complete.' : sel.q}</p>`; })}`;
      return frame({ title: defs.strategy.title, chain: defs.strategy.chain, body: body, compact: o.compact });
    },
    act: function (s, key, val, el) {
      if (key === 'toggle') s.done[val] = !!el.checked;
      if (key === 'sel') s.sel = val;
    }
  };

  /* Sources: system records → shared keys → one business view. */
  var SOURCES = [
    { id: 'sales', name: 'Sales', system: 'ERP sell-out', key: 'outlet_code', fields: ['outlet_code', 'sku', 'units', 'week'], recs: D.locations.map(function (l) { return ['OUT-' + l.outlet, 'SKU 4471 · W36', l.sales === 100 ? 312 : l.sales === 96 ? 299 : l.sales === 61 ? 190 : 278]; }) },
    { id: 'stock', name: 'Stock', system: 'Warehouse file', key: 'loc_code', fields: ['loc_code', 'item', 'avail_pct', 'week'], recs: D.locations.map(function (l) { return ['LOC-' + l.loc, 'Item 4471 · W36', l.avail + '%']; }) },
    { id: 'dist', name: 'Distribution', system: 'Route planner', key: 'drop_code', fields: ['drop_code', 'route', 'deliveries', 'week'], recs: D.locations.map(function (l) { return ['DROP-' + l.drop, 'Route E · W36', l.hl ? 1 : 3]; }) }
  ];
  defs.engineering = {
    init: function () { return { src: 'stock', held: false }; },
    title: 'Source workspace',
    chain: 'Source records → shared keys → one view',
    render: function (s, o) {
      var cur = SOURCES.filter(function (x) { return x.id === s.src; })[0];
      var body = html`
        <div class="scene-head"><div><span class="label-caps">Three systems, one location</span><h3>Every record keeps its source. One key joins them.</h3></div><span class="scene-meta">Select a source to see what it contributes</span></div>
        <div class="src-grid">
          ${each(SOURCES, function (src) {
            return html`<button type="button" class="src-tile${src.id === s.src ? ' on' : ''}" data-act="src:${src.id}" aria-pressed="${src.id === s.src ? 'true' : 'false'}">
              <span class="src-sys"><b>${src.name}</b><small>${src.system}</small></span>
              ${records(src.recs.slice(0, 3))}
              <span class="src-fields">${each(src.fields, function (f) { return html`<code class="${f === src.key ? 'key' : ''}">${f}</code>`; })}</span>
            </button>`;
          })}
        </div>
        <div class="join${o.compact ? ' compact' : ''}">
          ${when(!o.compact, function () { return html`<div class="join-model surface">
            <span class="label-caps">Shared model · location 0118 → Surulere</span>
            <div class="join-row"><span>${cur.key}</span><i class="arr" aria-hidden="true"></i><span class="on">location_id</span></div>
            <div class="join-row"><span>${cur.fields[2]}</span><i class="arr" aria-hidden="true"></i><span class="on">${cur.id === 'sales' ? 'sales_index' : cur.id === 'stock' ? 'availability' : 'deliveries'}</span></div>
            <span class="scene-meta">${cur.name} contributes ${cur.fields.length} fields; ${cur.key} is standardised to one location id with a quality check on the way in.</span>
          </div>`; })}
          ${when(!o.preview, function () { return html`<div class="join-view surface">
            <span class="label-caps">Resulting view · W36${o.compact ? ' · ' + cur.name.toLowerCase() + ' highlighted' : ''}</span>
            <div class="view-rows">
              ${each(D.locations, function (l) { return html`<div class="${l.hl ? 'hl' : ''}"><span>${l.name}</span><span class="num ${s.src === 'sales' ? 'on' : ''}">${l.sales}</span><span class="num ${s.src === 'stock' ? 'on' : ''}">${l.avail}%</span><span class="num ${s.src === 'dist' ? 'on' : ''}">${l.hl ? 1 : 3}</span></div>`; })}
            </div>
            <span class="scene-meta">sales index · availability · deliveries</span>
          </div>`; })}
          ${when(!o.compact, function () { return drawer(s.held
            ? { chip: 'Held record', chipTone: 'warn', title: 'Stock row 412 · missing product id', text: 'The record cannot join the product master, so it is held rather than loaded as an unknown product. Once the id is supplied it is revalidated against the same checks.', rows: [['Owner', 'Supply chain data owner'], ['Return path', 'Revalidate → curated stock model']], action: { act: 'held:0', label: 'Back to the loaded path' } }
            : { chip: '6 of 7 checks passed', chipTone: 'warn', title: 'One record was held.', text: 'The quality gate holds anything that cannot be joined and tells a named owner. Everything else loaded on schedule at 06:22.', rows: [['Loaded', 'ERP orders · CRM outlets · Stock file'], ['Held', '1 stock record']], action: { act: 'held:1', label: 'Trace the held record' } }); })}
        </div>
        ${when(!!o.compact, function () { return html`<p class="scene-meta">${chip('warn', '6 of 7 checks passed')} One stock record was held for a named owner; everything else loaded at 06:22.</p>`; })}`;
      return frame({ title: defs.engineering.title, chain: defs.engineering.chain, body: body, compact: o.compact });
    },
    act: function (s, key, val) { if (key === 'src') s.src = val; if (key === 'held') s.held = val === '1'; }
  };

  /* Review: a work item through checks to a human decision. */
  var ITEMS = [
    { id: 'w36', name: 'Weekly briefing · W36', src: 'Sales W36 · Stock W36 · Finance ledger W36', proposed: 'Net sales 9.6m against plan 10.0m (−4%). Snacks returns account for −0.3m.', checks: 'Passed · all figures W36 · references resolve', ok: true },
    { id: 'w36b', name: 'Weekly briefing · W36 (ledger late)', src: 'Sales W36 · Stock W36 · Finance ledger — not available', proposed: 'Draft with the net sales statement flagged: figure unavailable, ledger not yet loaded.', checks: 'Failed · required source missing', ok: false }
  ];
  defs.ai = {
    init: function () { return { item: 'w36', decision: null }; },
    title: 'Review workspace',
    chain: 'Proposed → checked → human decision',
    render: function (s, o) {
      var it = ITEMS.filter(function (x) { return x.id === s.item; })[0];
      var status = !it.ok ? 'Stopped at review · missing evidence' : s.decision === 'approve' ? 'Approved for release · recorded' : s.decision === 'return' ? 'Returned for correction · recorded' : 'Awaiting reviewer decision';
      var tone = !it.ok || s.decision === 'return' ? 'warn' : s.decision === 'approve' ? 'ok' : 'neutral';
      var body = html`
        <div class="scene-head"><div><span class="label-caps">Work item</span><h3>Automation drafts. A person decides.</h3></div>
          <div class="scene-seg" role="group" aria-label="Sample">${each(ITEMS, function (x) { return html`<button type="button" class="${x.id === s.item ? 'on' : ''}" data-act="item:${x.id}" aria-pressed="${x.id === s.item ? 'true' : 'false'}">${x.ok ? 'Normal week' : 'Missing source'}</button>`; })}</div></div>
        <div class="scene-grid">
          <div class="surface flowline">
            <div class="fl-step done"><span class="label-caps">1 · Input</span><p>Scheduled trigger · Monday 07:00 · Reporting period W36</p><small>${it.src}</small></div>
            <div class="fl-step done"><span class="label-caps">2 · Proposed</span><p>${it.proposed}</p><small>Labelled: Proposed · not verified</small></div>
            <div class="fl-step ${it.ok ? 'done' : 'fail'}"><span class="label-caps">3 · Checks</span><p>${it.checks}</p></div>
            <div class="fl-step ${s.decision || !it.ok ? 'done' : 'now'}"><span class="label-caps">4 · Human review</span><p>${status}</p><small>Reviewer · ${D.owner}</small></div>
          </div>
          ${when(!o.preview, function () { return drawer({ chip: status.split(' · ')[0], chipTone: tone, title: it.ok ? (s.decision ? 'Decision recorded.' : 'Your call, reviewer.') : 'Nothing is released without its evidence.', text: it.ok ? (s.decision ? 'The decision, the draft and the checks are kept together. Nothing here was sent anywhere.' : 'The checks passed and every statement links to its measure. Approve the release, or send it back with a reason.') : 'The ledger for W36 had not loaded, so the period check could not run. The item stops here until the source arrives.', extra: it.ok && !s.decision ? html`<div class="row" style="gap:8px"><button type="button" class="btn btn-sm" data-act="decide:approve">Approve release</button><button type="button" class="btn btn-ghost btn-sm" data-act="decide:return">Return for correction</button></div>` : null, action: s.decision ? { act: 'decide:', label: 'Reset the decision' } : null }); })}
        </div>
        ${when(!!o.preview, function () { return html`<p class="scene-meta">${chip('neutral', 'Awaiting reviewer decision')} Checks passed; a named reviewer approves or returns the draft. Nothing is released without its evidence.</p>`; })}`;
      return frame({ title: defs.ai.title, chain: defs.ai.chain, body: body, compact: o.compact });
    },
    act: function (s, key, val) { if (key === 'item') { s.item = val; s.decision = null; } if (key === 'decide') s.decision = val || null; }
  };

  /* Capability: a role moving from guided practice to independent use. */
  var ROLES = [
    { name: 'Leader', evidence: 'a written explanation of one KPI variance reviewed against the rubric', tasks: [['Explain a KPI variance', 3], ['Challenge a definition in review', 2], ['Assign and track a follow-up action', 3]] },
    { name: 'Analyst', evidence: 'an updated measure and a reconciled report checked by a reviewer', tasks: [['Update a measure', 3], ['Reconcile a report to source', 3], ['Add a drill path', 2]] },
    { name: 'Engineer', evidence: 'a failed load investigated and resolved using the runbook', tasks: [['Investigate a failed load', 3], ['Resolve an exception queue item', 3], ['Deploy a model change', 2]] }
  ];
  var LEVELS = ['Baseline', 'Guided practice', 'Independent'];
  defs.capability = {
    init: function () { return { role: 1, task: 0 }; },
    title: 'Capability workspace',
    chain: 'Baseline → guided practice → independent use',
    render: function (s, o) {
      var role = ROLES[s.role]; var task = role.tasks[s.task];
      var body = html`
        <div class="scene-head"><div><span class="label-caps">Role-to-task progress</span><h3>Proof your team can do the work without us.</h3></div>
          <div class="scene-seg" role="group" aria-label="Role">${each(ROLES, function (r, i) { return html`<button type="button" class="${i === s.role ? 'on' : ''}" data-act="role:${i}" aria-pressed="${i === s.role ? 'true' : 'false'}">${r.name}</button>`; })}</div></div>
        <div class="scene-grid">
          <div class="surface">
            <div class="skill-head"><span>Task</span>${each(LEVELS, function (l) { return html`<span>${l}</span>`; })}</div>
            ${each(role.tasks, function (t, i) {
              return html`<button type="button" class="skill-row${i === s.task ? ' on' : ''}" data-act="task:${i}" aria-pressed="${i === s.task ? 'true' : 'false'}"><span>${t[0]}</span>${each(LEVELS, function (l, li) { return html`<span class="seg ${li < t[1] ? 'done' : ''}${li === t[1] - 1 ? ' last' : ''}"></span>`; })}</button>`;
            })}
          </div>
          ${when(!o.preview, function () { return drawer({ chip: task[1] === 3 ? 'Independent' : 'Practising', chipTone: task[1] === 3 ? 'ok' : 'warn', title: task[0], text: task[1] === 3 ? 'Demonstrated on a real work sample and checked by a reviewer. Attendance alone never moves someone here.' : 'Practised with guidance. The next step is a work sample done without help, reviewed against the rubric.', rows: [['Role', role.name], ['Evidence', role.evidence]], note: 'Illustrative roles and tasks; individual results are never published.' }); })}
        </div>
        ${when(!!o.preview, function () { return html`<p class="scene-meta">${chip('ok', 'Independent')} Two of three analyst tasks demonstrated on real work and checked by a reviewer.</p>`; })}`;
      return frame({ title: defs.capability.title, chain: defs.capability.chain, body: body, compact: o.compact });
    },
    act: function (s, key, val) { if (key === 'role') { s.role = Number(val); s.task = 0; } if (key === 'task') s.task = Number(val); }
  };

  /* Industry source workspaces. Each sector has its own schemas, its own
     measures with a definition, period, unit, source and owner, and a
     resulting view whose figures are derived from the sample rows — so a
     retail conversion really is orders over sessions, and sell-in and
     sell-out stay distinct. */
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

  defs.lineage = {
    init: function () { return { src: 0, metric: -1 }; },
    title: 'Source workspace',
    chain: 'Source systems → agreed definition → inspectable figure',
    render: function (s, o) {
      var ind = o.industry; var M = IND[ind.slug]; if (!M) return html``;
      var cur = M.sources[s.src];
      var metric = s.metric >= 0 ? M.metrics[s.metric] : null;
      var feeds = function (name) { return cur.feeds.indexOf(name) >= 0; };
      var body = html`
        <div class="scene-head"><div><span class="label-caps">${ind.title}</span><h3>Each system stays as it is. One definition links them.</h3></div><span class="scene-meta">Select a source, then any figure</span></div>
        <div class="src-grid five">
          ${each(M.sources, function (src, i) {
            return html`<button type="button" class="src-tile${i === s.src ? ' on' : ''}" data-act="src:${i}" aria-pressed="${i === s.src ? 'true' : 'false'}"><span class="src-sys"><b>${src.name}</b><small>${src.system}</small></span>${records(src.recs)}<span class="src-fields">${each(src.fields, function (f) { return html`<code class="${f === src.key ? 'key' : ''}">${f}</code>`; })}</span></button>`;
          })}
        </div>
        <div class="join">
          <div class="join-model surface">
            <span class="label-caps">What ${cur.name} contributes</span>
            <div class="join-row"><span>${cur.key}</span><i class="arr" aria-hidden="true"></i><span class="on">${M.entity.split(' · ')[0].replace(/ /g, '_')}_id</span></div>
            ${when(cur.feeds.length > 0, function () { return each(cur.feeds, function (f) { return html`<div class="join-row"><span>${cur.fields[1]}</span><i class="arr" aria-hidden="true"></i><span class="on">${f.toLowerCase().replace(/[^a-z0-9]+/g, '_')}</span></div>`; }); })}
            <span class="scene-meta">${cur.feeds.length ? cur.name + ' feeds ' + cur.feeds.join(' and ') + '. The key is standardised to one ' + M.entity.split(' · ')[0] + ' id with a quality check on the way in.' : cur.name + ' is joined on ' + cur.key + ' and kept for context; none of the figures below is calculated from it.'}</span>
          </div>
          <div class="join-view surface">
            <span class="label-caps">Resulting view · ${M.entity}</span>
            <div class="view-rows inspect">
              <div class="vh"><span>${M.entity.split(' · ')[0]}</span>${each(M.metrics, function (m) { return html`<span class="${feeds(m.name) ? 'on' : ''}">${m.name}</span>`; })}</div>
              ${each(M.rows, function (r) {
                var cells = M.cells(r);
                return html`<div class="${r.hl ? 'hl' : ''}"><span>${r.name}</span>${each(cells, function (c, ci) {
                  var m = M.metrics[ci];
                  return html`<button type="button" class="num${feeds(m.name) ? ' on' : ''}${s.metric === ci ? ' sel' : ''}" data-act="metric:${ci}" aria-label="${r.name} ${m.name}: ${c}. Open the definition" aria-pressed="${s.metric === ci ? 'true' : 'false'}">${c}</button>`;
                })}</div>`;
              })}
            </div>
            <span class="scene-meta">Any figure opens its definition, period, unit, source and owner.</span>
          </div>
          ${drawer(metric
            ? { chip: 'Definition', chipTone: 'ok', title: metric.name, text: metric.definition, rows: [['Period', metric.period], ['Unit', metric.unit], ['Source', metric.source], ['Owner', metric.owner]], action: { act: 'metric:-1', label: 'Back to the question' } }
            : { chip: 'Traceable', chipTone: 'ok', title: ind.question, text: 'Every figure in the view is calculated from the sample records in these systems, with its definition, period and owner agreed before it goes into a report.', rows: [['Sources', M.sources.map(function (x) { return x.name; }).join(' · ')], ['Agreed first', 'Definition · period · unit · owner']] })}
        </div>`;
      return frame({ title: defs.lineage.title, chain: defs.lineage.chain, body: body, compact: o.compact });
    },
    act: function (s, key, val) { if (key === 'src') s.src = Number(val); if (key === 'metric') s.metric = Number(val); }
  };

  scene.defs = defs;

  /* ------------------------------------------------------------- mounting */

  /* Render a scene into a host and wire its controls. Returns a disposer.
     A state change re-renders the scene, then patches only the parts that
     changed — the stepper's selected state and the body — so the frame, title
     bar and footer stay put, layout does not jump, and the control the
     visitor was using keeps focus (or hands it to its replacement after the
     real render, never before). */
  /* Scene headings are <h3> under a section's <h2>; inside the home hero,
     where only the <h1> precedes them, they render as styled paragraphs so
     the heading outline stays in order. */
  function renderDef(def, s, opts) {
    var out = def.render(s, opts).value;
    return opts.plainHeading ? out.replace(/<h3>/g, '<p class="scene-h">').replace(/<\/h3>/g, '</p>') : out;
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
      var ns = next.querySelector('.scene-steps'), cs = cur.querySelector('.scene-steps');
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
      paint(true, fk, key === 'step');
    }
    function onKey(e) {
      if (!e.target.matches('[role="tab"]')) return;
      var tabs = Array.prototype.slice.call(host.querySelectorAll('[role="tab"]')); var i = tabs.indexOf(e.target);
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : e.key === 'Home' ? -99 : e.key === 'End' ? 99 : 0; if (!d) return;
      e.preventDefault();
      var n = d === -99 ? 0 : d === 99 ? tabs.length - 1 : Math.max(0, Math.min(tabs.length - 1, i + d));
      def.act(s, 'step', n);
      paint(true, null, true);
    }
    host.addEventListener('click', onEvent); host.addEventListener('change', onEvent); host.addEventListener('keydown', onKey);
    return function () { host.removeEventListener('click', onEvent); host.removeEventListener('change', onEvent); host.removeEventListener('keydown', onKey); clearTimeout(swapT); };
  };

  /* A static render for places that cannot host interaction (previews). */
  scene.render = function (name, opts) { var def = defs[name]; opts = opts || {}; return raw(renderDef(def, Object.assign(def.init(), opts.state || {}), opts)); };
})();
