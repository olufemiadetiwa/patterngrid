/* Pattern Grid — Services: overview and the five capability pages. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when, raw = C.raw;

  function find(slug) {
    return (PG.services || []).find(function (s) { return s.slug === slug; });
  }

  /* ------------------------------------------------------------ overview */

  function miniStrategy() {
    return html`
      <div class="matrix">
        <span class="axis-y">Value</span>
        <div class="m"><span class="dot"></span>Later</div>
        <div class="m on"><span class="dot on"></span>Sequence first</div>
        <div class="m dim">Avoid</div>
        <div class="m"><span class="dot need"></span>Foundation needed</div>
        <span></span><span class="axis-x">Feasibility · Readiness</span>
      </div>`;
  }

  function miniEngineering() {
    return raw(
      '<svg viewBox="0 0 360 160" width="100%" style="max-width:420px" aria-hidden="true" font-family="Geist, sans-serif">' +
      '<rect x="8" y="60" width="72" height="40" rx="3" fill="none" stroke="#02203D" stroke-width="1.5"/><text x="44" y="84" text-anchor="middle" font-size="12" fill="#02203D">Sources</text>' +
      '<rect x="120" y="60" width="88" height="40" rx="3" fill="none" stroke="#02203D" stroke-width="1.5"/><text x="164" y="84" text-anchor="middle" font-size="12" fill="#02203D">Quality gate</text>' +
      '<rect x="260" y="20" width="92" height="40" rx="3" fill="#02203D"/><text x="306" y="44" text-anchor="middle" font-size="12" fill="#FFFFFF">Curated model</text>' +
      '<rect x="260" y="104" width="92" height="40" rx="3" fill="none" stroke="#C9821A" stroke-width="1.5"/><text x="306" y="128" text-anchor="middle" font-size="12" fill="#07131C">Exception queue</text>' +
      '<path d="M80 80H120 M208 72C230 72 236 40 260 40 M208 88C230 88 236 124 260 124" fill="none" stroke="#02203D" stroke-width="1.5"/>' +
      '<path d="M260 134C220 150 170 150 164 100" fill="none" stroke="#17647D" stroke-width="1.5" stroke-dasharray="4 4"/>' +
      '<text x="200" y="158" text-anchor="middle" font-size="11" fill="#17647D">corrected → revalidated</text></svg>');
  }

  function miniBI() {
    return html`
      <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.2);border-radius:3px;padding:20px;width:min(100%,320px);display:flex;flex-direction:column;gap:10px">
        <span class="mono" style="font-size:11px;opacity:.7">Net sales · sample units</span>
        <span class="num" style="font-size:40px;font-weight:600;letter-spacing:-.03em;line-height:1">9.6m</span>
        <span style="font-size:13px;opacity:.85">Plan 10.0m · Variance −0.4m (−4%)</span>
        <div class="row" style="gap:6px;margin-top:6px">
          <span style="font-size:11px;border:1px solid #38A0C3;color:#38A0C3;border-radius:3px;padding:3px 8px">Definition</span>
          <span style="font-size:11px;border:1px solid rgba(255,255,255,.3);border-radius:3px;padding:3px 8px">Period</span>
          <span style="font-size:11px;border:1px solid rgba(255,255,255,.3);border-radius:3px;padding:3px 8px">Source</span>
          <span style="font-size:11px;border:1px solid rgba(255,255,255,.3);border-radius:3px;padding:3px 8px">Owner</span>
        </div>
      </div>`;
  }

  function miniAI() {
    return raw(
      '<svg viewBox="0 0 360 160" width="100%" style="max-width:420px" aria-hidden="true" font-family="Geist, sans-serif">' +
      '<rect x="8" y="60" width="80" height="40" rx="3" fill="none" stroke="#02203D" stroke-width="1.5"/><text x="48" y="84" text-anchor="middle" font-size="12" fill="#02203D">Proposed</text>' +
      '<rect x="128" y="60" width="80" height="40" rx="3" fill="none" stroke="#02203D" stroke-width="1.5"/><text x="168" y="84" text-anchor="middle" font-size="12" fill="#02203D">Checks</text>' +
      '<rect x="248" y="20" width="104" height="40" rx="3" fill="#02203D"/><text x="300" y="44" text-anchor="middle" font-size="12" fill="#FFFFFF">Human review</text>' +
      '<rect x="248" y="104" width="104" height="40" rx="3" fill="none" stroke="#C9821A" stroke-width="1.5"/><text x="300" y="128" text-anchor="middle" font-size="12" fill="#07131C">Returned</text>' +
      '<path d="M88 80H128 M208 72C226 72 232 40 248 40 M208 88C226 88 232 124 248 124" fill="none" stroke="#02203D" stroke-width="1.5"/>' +
      '<path d="M248 134C160 156 60 150 48 100" fill="none" stroke="#17647D" stroke-width="1.5" stroke-dasharray="4 4"/></svg>');
  }

  function miniCapability() {
    return raw(
      '<svg viewBox="0 0 360 180" width="100%" style="max-width:400px" aria-hidden="true" font-family="Geist, sans-serif">' +
      '<circle cx="180" cy="90" r="64" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>' +
      '<rect x="130" y="8" width="100" height="30" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.4)"/><text x="180" y="28" text-anchor="middle" font-size="12" fill="#FFFFFF">Guided practice</text>' +
      '<rect x="248" y="75" width="104" height="30" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.4)"/><text x="300" y="95" text-anchor="middle" font-size="12" fill="#FFFFFF">Work sample</text>' +
      '<rect x="120" y="142" width="120" height="30" rx="3" fill="#38A0C3"/><text x="180" y="162" text-anchor="middle" font-size="12" fill="#07131C">Independent use</text>' +
      '<rect x="8" y="75" width="104" height="30" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.4)"/><text x="60" y="95" text-anchor="middle" font-size="12" fill="#FFFFFF">Review</text></svg>');
  }

  var MINIS = {
    'data-ai-strategy': miniStrategy,
    'data-engineering': miniEngineering,
    'business-intelligence': miniBI,
    'ai-automation': miniAI,
    'capability-building': miniCapability
  };

  function overview() {
    var ov = PG.servicesOverview || { situations: [], features: {}, closing: {} };

    return html`
      ${PG.hero('services')}

      <section style="padding:0 0 clamp(72px,9vw,144px)">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:380px">
          <p class="lede">${ov.intro}</p>
          <div class="stack stack-16">
            <h2 style="font-size:clamp(26px,2.6vw,40px);font-weight:600;line-height:1.1;letter-spacing:-.02em">${ov.situationsHeading}</h2>
            <div class="rows">
              ${each(ov.situations, function (s) {
                var t = find(s.slug) || {};
                return html`
                  <a href="/services/${s.slug}" style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px 24px;padding:18px 0;color:var(--ink)">
                    <span style="font-weight:600;font-size:17px;line-height:1.3">“${s.situation}”</span>
                    <span class="stack stack-4">
                      <span class="eyebrow">${t.title} →</span>
                      <span class="small muted">${s.expect}</span>
                    </span>
                  </a>`;
              })}
            </div>
          </div>
        </div>
      </section>

      <section style="padding:0 0 clamp(72px,9vw,144px)">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(56px,7vw,112px)">
          ${each(PG.services, function (s, i) {
            var f = (ov.features[s.slug]) || {};
            var dark = i % 2 === 0;
            return html`
              <article class="autogrid divide-top" style="--min:400px;--gap:32px;--gap-x:clamp(40px,6vw,96px);align-items:center;padding-top:clamp(32px,4vw,56px)">
                <div class="stack stack-18" style="order:${i % 2 === 0 ? 0 : 1}">
                  <div class="row" style="gap:14px">
                    <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" fill="none" stroke="#02203D"
                         stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><path d="${PG.icon(s.icon)}"/></svg>
                    <span class="lbl" style="color:var(--muted)">${s.index}</span>
                  </div>
                  <h2 style="font-size:clamp(28px,3vw,46px);font-weight:600;line-height:1.08;letter-spacing:-.025em">${s.title}</h2>
                  <p class="body">${f.text}</p>
                  <div class="row" style="gap:8px">
                    ${each(f.outputs || [], function (o) { return html`<span class="chip chip-lg">${o}</span>`; })}
                  </div>
                  <a class="arrow" href="/services/${s.slug}">${s.link} <span class="chev" aria-hidden="true">→</span></a>
                </div>
                <div class="mini ${dark ? 'dark' : 'light'}" aria-hidden="true">${MINIS[s.slug]()}</div>
              </article>`;
          })}
        </div>
      </section>

      <section class="bg-paper" style="padding:clamp(72px,9vw,144px) 0">
        <div class="wrap autogrid" data-reveal="rise" style="--min:380px;align-items:center">
          <div class="stack stack-18">
            <h2 style="font-size:clamp(28px,3.4vw,52px);font-weight:600;line-height:1.08;letter-spacing:-.03em;text-wrap:balance">${ov.mapHeading}</h2>
            <p style="font-size:18px;line-height:1.6;max-width:32em">${ov.mapText}</p>
            <p class="small muted" style="max-width:36em">Strategy sets the order. Engineering supplies the checked data that reporting and automation depend on. Capability Building keeps your own team able to run all of it.</p>
          </div>
          <div class="svc-map">
            <a class="wide lead" href="/services/data-ai-strategy"><span>Data &amp; AI Strategy</span><span class="note mono">sets the order</span></a>
            <a href="/services/data-engineering">Data Engineering<span class="note">supplies the checked data</span></a>
            <a href="/services/business-intelligence">Business Intelligence</a>
            <a href="/services/ai-automation">AI &amp; Automation</a>
            <a class="wide support" href="/services/capability-building"><span>Capability Building</span><span class="note mono" style="color:var(--teal)">keeps your team able to run all of it</span></a>
          </div>
        </div>
      </section>`;
  }

  /* -------------------------------------------------------------- detail */

  var KIND_LABEL = { input: 'Input', process: 'Process', gate: 'Decision', output: 'Output', exception: 'Exception', use: 'Used by' };

  /* Artifact panels — one per service, each with its own small interaction. */

  var ROADMAP_INITS = [
    { name: 'Metric definitions', owner: 'Finance lead', phase: 0, question: 'Which definition of net sales do we report?', prereq: 'None. This comes first.', accept: 'One agreed definition, period rule and owner recorded in the KPI dictionary.', fixedReady: true },
    { name: 'Source integration', owner: 'Data owner', phase: 0, question: 'Can sales and finance data be joined without manual reconciliation?', prereq: 'Metric definitions agreed.', accept: 'Both sources load on schedule with reconciliation checks passing.', fixedReady: true },
    { name: 'Weekly commercial reporting', owner: 'Commercial finance lead', phase: 1, question: 'Where is performance slipping this week?', prereq: 'Source integration complete; net sales definition agreed.', accept: 'Report reconciles to the ledger; used in the weekly review for four consecutive weeks.', togglesWithReady: true },
    { name: 'AI reporting assistant', owner: 'Process owner', phase: 2, question: 'Can the weekly briefing be drafted with less manual preparation?', prereq: 'Weekly commercial reporting in use; checked figures available.', accept: 'Draft passes agreed checks; reviewer approval recorded for every release.', fixedReady: false }
  ];
  var PHASE_NAMES = ['Phase 1 · Foundations', 'Phase 2 · Reporting', 'Phase 3 · Assisted work', 'Foundation needed'];

  function readyOf(init, rmReady) {
    return init.togglesWithReady ? rmReady : init.fixedReady;
  }

  function artifactStrategy(s) {
    var phases = PHASE_NAMES.map(function (name, pi) {
      var items = ROADMAP_INITS
        .map(function (it, ii) { return Object.assign({}, it, { ii: ii, ready: readyOf(it, s.rmReady) }); })
        .filter(function (it) { return pi === 3 ? !it.ready : (it.ready && it.phase === pi); });
      return { name: name, need: pi === 3, items: items };
    });
    var sel = ROADMAP_INITS[s.rmInit];
    var selReady = readyOf(sel, s.rmReady);

    return html`
      <div class="panel">
        <div class="row between" style="gap:12px">
          <span style="font-weight:600;font-size:17px">Phased delivery roadmap</span>
          <label class="row" style="gap:10px;font-size:13px;color:var(--muted);cursor:pointer">
            <input type="checkbox" data-rm-ready ${raw(s.rmReady ? 'checked' : '')} style="width:18px;height:18px;accent-color:#02203D">
            Try it: mark source integration as complete
          </label>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,130px),1fr));gap:10px">
          ${each(phases, function (ph) {
            return html`
              <div class="phase-col${ph.need ? ' need' : ''}">
                <span class="nm">${ph.name}</span>
                ${each(ph.items, function (it) {
                  return html`
                    <button type="button" class="phase-item" data-rm-init="${it.ii}"
                            aria-pressed="${s.rmInit === it.ii ? 'true' : 'false'}">${it.name}<span>${it.owner}</span></button>`;
                })}
              </div>`;
          })}
        </div>
        <div class="kv boxed" style="--kv:120px">
          <span class="k">Initiative</span><span style="font-weight:600">${sel.name}</span>
          <span class="k">Business question</span><span>${sel.question}</span>
          <span class="k">Prerequisites</span><span>${sel.prereq}</span>
          <span class="k">Acceptance</span><span>${sel.accept}</span>
          <span class="k">Status</span><span style="font-weight:500;color:${selReady ? 'var(--teal)' : 'var(--amber-ink)'}">${selReady
            ? 'Ready to sequence'
            : 'Foundation needed — ' + (s.rmInit === 2 ? 'source integration not yet complete' : 'depends on earlier phases')}</span>
        </div>
      </div>`;
  }

  var RUNS = [
    { source: 'ERP orders', load: 'Tue 06:10', checks: '12 / 12 passed', status: 'Loaded', ok: true },
    { source: 'CRM outlets', load: 'Tue 06:14', checks: '8 / 8 passed', status: 'Loaded', ok: true },
    { source: 'Stock file (weekly)', load: 'Tue 06:22', checks: '6 / 7 passed', status: '1 exception · Missing product ID', ok: false }
  ];

  function artifactEngineering(s) {
    var cols = 'minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)';
    return html`
      <div class="panel">
        <div class="row between" style="gap:12px">
          <span style="font-weight:600;font-size:17px">Pipeline run · week 36 (sample)</span>
          <span class="lbl" style="color:var(--muted)">Fixed illustrative timestamps</span>
        </div>
        <div class="artifact-head" style="grid-template-columns:${cols}">
          <span>Source</span><span>Last completed load</span><span>Checks</span><span>Status</span>
        </div>
        ${each(RUNS, function (r) {
          return html`
            <button type="button" class="artifact-row${r.ok ? '' : ' warn'}" style="grid-template-columns:${cols}"
                    ${raw(r.ok ? 'disabled aria-disabled="true"' : 'data-trace')}
                    aria-pressed="${!r.ok && s.trace ? 'true' : 'false'}">
              <span style="font-weight:500">${r.source}</span>
              <span class="num">${r.load}</span>
              <span>${r.checks}</span>
              <span style="font-weight:500;color:${r.ok ? 'var(--teal)' : 'var(--amber-ink)'}">${r.status}</span>
            </button>`;
        })}
        ${s.trace ? html`
          <div class="kv boxed">
            <span class="k">Held record</span><span>Stock file row 412 · Item 4471 · Outlet code E-0118</span>
            <span class="k">Why it was held</span><span>Product ID is missing, so the record cannot join the product master. It is held rather than loaded as an unknown product.</span>
            <span class="k">Owner</span><span>Supply chain data owner</span>
            <span class="k">Return path</span><span>Once the product ID is supplied, the record is revalidated against the same checks and, if it passes, loaded into the curated stock model.</span>
          </div>
          <button type="button" class="btn btn-ghost" data-close-trace style="align-self:flex-start;height:40px;font-size:14px;font-weight:500">Back to the normal path</button>`
          : html`<p class="fine">Select the run with an exception to trace the held record.</p>`}
      </div>`;
  }

  var METRIC_DEFS = [
    ['Definition', 'Net sales = gross invoiced sales less credited returns, excluding VAT and internal transfers.'],
    ['Period', 'Reporting week 36, Monday to Sunday, based on invoice date.'],
    ['Source', 'Finance ledger (invoices, credit notes) joined to the product master through the curated sales model.'],
    ['Owner', 'Commercial finance lead owns the definition; changes are agreed at the monthly metric review.'],
    ['Exclusions', 'Samples, staff sales and intercompany transfers are excluded from both gross sales and returns.']
  ];
  var BI_ROWS = [['Beverages', -0.1], ['Snacks', -0.3], ['Personal care', 0.0], ['Household', 0.0]];

  function artifactBI(s) {
    return html`
      <div class="panel">
        <div class="row between end" style="gap:16px">
          <div class="stack stack-6">
            <span class="lbl" style="color:var(--muted)">Net sales · week 36 · sample units (m)</span>
            <span class="num" style="font-size:clamp(40px,4vw,56px);font-weight:600;letter-spacing:-.03em;line-height:1">9.6</span>
          </div>
          <div class="num" style="display:grid;grid-template-columns:auto auto;gap:4px 16px;font-size:14px;text-align:right">
            <span class="muted">Gross sales</span><span>10.0</span>
            <span class="muted">Returns</span><span>−0.4</span>
            <span class="muted">Plan</span><span>10.0</span>
            <span class="muted">Variance</span><span style="font-weight:600">−0.4 (−4%)</span>
          </div>
        </div>
        <div role="group" aria-label="Inspect the measure" class="row" style="gap:6px">
          ${each(METRIC_DEFS, function (m, i) {
            return html`<button type="button" class="toggle toggle-sm" data-metric="${i}"
              aria-pressed="${s.metric === i ? 'true' : 'false'}">${m[0]}</button>`;
          })}
        </div>
        <p class="small" style="background:var(--paper);border-radius:var(--radius);padding:14px 16px">${METRIC_DEFS[s.metric][1]}</p>
        <div class="stack stack-8">
          <span class="lbl" style="color:var(--muted)">Variance by product line (sums to −0.4)</span>
          ${each(BI_ROWS, function (b) {
            var low = b[1] <= -0.3;
            return html`
              <div style="display:grid;grid-template-columns:120px minmax(0,1fr) 56px;gap:12px;align-items:center;font-size:14px">
                <span>${b[0]}</span>
                <span style="height:8px;background:rgba(7,19,28,.06);border-radius:2px;position:relative">
                  <span style="position:absolute;right:0;top:0;height:100%;border-radius:2px;width:${Math.abs(b[1]) / 0.4 * 100}%;background:${low ? 'var(--amber-mid)' : 'var(--navy)'}"></span>
                </span>
                <span class="num" style="text-align:right;font-weight:${low ? 600 : 400}">${(b[1] > 0 ? '+' : '') + b[1].toFixed(1)}</span>
              </div>`;
          })}
        </div>
        <div class="kv" style="--kv:120px;border-top:1px solid var(--rule);padding-top:14px">
          <span class="k">Next question</span><span>Are returns concentrated in Snacks, and since which week?</span>
          <span class="k">Follow-up</span><span>Commercial finance lead</span>
        </div>
      </div>`;
  }

  function artifactAI(s) {
    var missing = s.aiMode === 'missing';
    var dec = s.aiDecision;
    var status = missing
      ? 'Stopped at review · missing evidence (Finance ledger, W36)'
      : (dec === 'approve' ? 'Approved for release · recorded'
        : (dec === 'return' ? 'Returned for correction · recorded' : 'Awaiting reviewer decision'));

    return html`
      <div class="panel">
        <div class="row between" style="gap:12px">
          <span style="font-weight:600;font-size:17px">Work item · weekly performance briefing</span>
          <div role="group" aria-label="Sample" class="row" style="gap:4px">
            <button type="button" class="toggle toggle-xs" data-ai-mode="normal" aria-pressed="${!missing ? 'true' : 'false'}">Normal sample</button>
            <button type="button" class="toggle toggle-xs" data-ai-mode="missing" aria-pressed="${missing ? 'true' : 'false'}">Missing source</button>
          </div>
        </div>
        <div class="kv" style="--kv:140px;gap:10px 16px">
          <span class="k">Input</span><span>Scheduled trigger · Monday 07:00 · Reporting period W36</span>
          <span class="k">Supporting sources</span><span>${missing
            ? 'Sales model (W36) · Stock model (W36) · Finance ledger — not available for W36'
            : 'Sales model (W36) · Stock model (W36) · Finance ledger (W36)'}</span>
          <span class="k">Proposed output</span>
          <span style="border-left:2px solid var(--accent);padding-left:10px">${missing
            ? 'Draft briefing with the net sales statement flagged: “Figure unavailable — finance ledger for W36 not yet loaded.”'
            : 'Draft briefing: “Net sales 9.6m against plan 10.0m (−4%). Snacks returns account for −0.3m.” Each statement links to its measure.'}
            <span class="eyebrow" style="display:block;margin-top:4px">Labelled: Proposed · not verified</span>
          </span>
          <span class="k">Checks</span>
          <span style="font-weight:500;color:${missing ? 'var(--amber-ink)' : 'var(--teal)'}">${missing
            ? 'Failed · required source missing · period check not possible'
            : 'Passed · all figures W36 · references resolve'}</span>
          <span class="k">Review</span>
          <span class="row" style="gap:8px">
            <button type="button" class="btn btn-sm" data-ai-decision="approve" ${raw(missing ? 'disabled' : '')} style="height:36px;font-size:13px">Approve release</button>
            <button type="button" class="btn btn-ghost btn-sm" data-ai-decision="return" style="height:36px;font-size:13px">Return for correction</button>
            <span class="fine">Reviewer: Commercial finance lead</span>
          </span>
          <span class="k">Final status</span>
          <span style="font-weight:600;color:${missing || dec === 'return' ? 'var(--amber-ink)' : (dec === 'approve' ? 'var(--teal)' : 'var(--ink)')}">${status}</span>
        </div>
        <p class="fine">This is a page illustration. Nothing here is sent anywhere.</p>
      </div>`;
  }

  var ROLE_DEFS = [
    { name: 'Leader', evidence: 'a written explanation of one KPI variance reviewed against the rubric', tasks: [['Explain a KPI variance', 1, 2, 3], ['Challenge a definition in review', 1, 2, 2], ['Assign and track a follow-up action', 2, 3, 3]] },
    { name: 'Analyst', evidence: 'an updated measure and a reconciled report checked by a reviewer', tasks: [['Update a measure', 1, 3, 3], ['Reconcile a report to source', 1, 2, 3], ['Add a drill path', 1, 2, 2]] },
    { name: 'Engineer', evidence: 'a failed load investigated and resolved using the runbook', tasks: [['Investigate a failed load', 1, 3, 3], ['Resolve an exception queue item', 2, 3, 3], ['Deploy a model change', 1, 2, 2]] }
  ];

  function artifactCapability(s) {
    var role = ROLE_DEFS[s.role];
    return html`
      <div class="panel">
        <div class="row between" style="gap:12px">
          <span style="font-weight:600;font-size:17px">Role-to-task matrix (illustrative)</span>
          <div role="group" aria-label="Role" class="row" style="gap:4px">
            ${each(ROLE_DEFS, function (r, i) {
              return html`<button type="button" class="toggle toggle-xs" data-role="${i}"
                aria-pressed="${s.role === i ? 'true' : 'false'}">${r.name}</button>`;
            })}
          </div>
        </div>
        <div class="artifact-head tasks" style="grid-template-columns:minmax(0,1.6fr) repeat(3,minmax(0,1fr))">
          <span>Task</span><span>Baseline</span><span>Guided practice</span><span>Independent demonstration</span>
        </div>
        ${each(role.tasks, function (t) {
          return html`
            <div class="task-row">
              <span style="font-weight:500">${t[0]}</span>
              <span class="dot-cell"><span class="d${t[1] >= 1 ? ' filled' : ''}"></span><span class="lbl">${t[1] >= 1 ? 'Baseline set' : '—'}</span></span>
              <span class="dot-cell"><span class="d${t[2] >= 2 ? ' filled' : ''}"></span><span class="lbl">${t[2] >= 2 ? 'Practised' : 'Planned'}</span></span>
              <span class="dot-cell"><span class="d hi${t[3] >= 3 ? ' filled' : ''}"></span><span class="lbl">${t[3] >= 3 ? 'Demonstrated' : 'Not yet'}</span></span>
            </div>`;
        })}
        <p class="fine">Evidence: ${role.evidence}. Illustrative roles and tasks; individual results are never published.</p>
      </div>`;
  }

  var ARTIFACTS = {
    'data-ai-strategy': artifactStrategy,
    'data-engineering': artifactEngineering,
    'business-intelligence': artifactBI,
    'ai-automation': artifactAI,
    'capability-building': artifactCapability
  };
  var ARTIFACT_TITLES = {
    'data-ai-strategy': 'Phased delivery roadmap',
    'data-engineering': 'Pipeline run and exception queue',
    'business-intelligence': 'Inspectable metric card',
    'ai-automation': 'Work item with review',
    'capability-building': 'Role-to-task matrix'
  };

  /* ------------------------------------------------------- stage / flow */

  function stagePanel(svc, index) {
    var stage = svc.approach[index] || svc.approach[0];
    var hasFeedback = !!(svc.feedback && index === svc.feedback.from);

    return html`
      <div class="stack stack-18">
        <h3 class="h3">${stage.name}</h3>
        <p class="body">${stage.activity}</p>
        <div class="stack stack-6">
          <span class="lbl" style="color:var(--muted)">What you get at the end of this stage</span>
          <p style="font-size:17px;font-weight:500;line-height:1.45">${stage.output}</p>
        </div>
        ${when(hasFeedback, function () { return html`<p class="feedback-note">${svc.feedback.label}</p>`; })}
      </div>
      <div aria-label="Stage output preview" class="stage-doc">
        <span class="lbl" style="color:var(--muted)">Sample of the output · ${stage.name}</span>
        <div class="doc">
          ${each(stage.preview, function (p) {
            return html`
              <div style="display:grid;grid-template-columns:8px minmax(0,1fr);gap:12px;align-items:center;font-size:15px">
                <span aria-hidden="true" style="width:8px;height:8px;background:var(--navy);border-radius:1px"></span><span>${p}</span>
              </div>`;
          })}
        </div>
      </div>`;
  }

  function techIcon(svc, t) {
    if (svc.slug === 'capability-building') return 'users';
    if (/SQL|Fabric|Azure/.test(t.name) && !/Power/.test(t.name)) return 'database';
    if (/Power BI|DAX|Excel|Query/.test(t.name)) return 'chart';
    if (/API|connector/.test(t.name)) return 'network';
    return 'layers';
  }

  function detail(svc, s) {
    var nodes = svc.flow.nodes;
    var maxCol = Math.max.apply(null, nodes.map(function (n) { return n.col; }));
    var jumps = [['Overview', 'svc-overview'], ['Deliverables', 'svc-deliverables'], ['Approach', 'svc-approach'], ['Technology', 'svc-technology'], ['Questions', 'svc-questions']];
    var related = svc.relatedServices.map(find).filter(Boolean);
    var relatedWork = (PG.work || []).find(function (w) { return w.slug === svc.related; }) || {};

    return html`
      ${PG.hero('services/' + svc.slug)}

      <nav class="subnav" aria-label="On this page">
        <div class="subnav-inner">
          <div class="crumbs">
            <a href="/">Home</a><span aria-hidden="true">/</span>
            <a href="/services">Services</a><span aria-hidden="true">/</span>
            <span aria-current="page">${svc.title}</span>
          </div>
          <div class="row" style="gap:4px;flex-wrap:nowrap">
            ${each(jumps, function (j) {
              return html`<button type="button" class="subnav-jump" data-jump="${j[1]}">${j[0]}</button>`;
            })}
          </div>
        </div>
      </nav>

      <section id="svc-overview" class="sec-sm">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:400px">
          <div class="stack stack-20">
            <span class="eyebrow">What this is</span>
            <h2 style="font-size:clamp(30px,3.6vw,56px);font-weight:600;line-height:1.06;letter-spacing:-.03em;text-wrap:balance">${svc.heading}</h2>
            ${each(svc.intro, function (p) { return html`<p class="body">${p}</p>`; })}
          </div>
          <div class="stack stack-28" style="border-top:1px solid var(--rule);padding-top:24px">
            <div class="stack stack-12">
              <span class="lbl" style="color:var(--muted)">This is useful when</span>
              <ul class="ticks">${each(svc.situations, function (x) { return html`<li>${x}</li>`; })}</ul>
            </div>
            <div class="stack stack-8" style="background:var(--paper);border-radius:var(--radius);padding:20px 22px">
              <span class="lbl" style="color:var(--muted)">What you are working towards</span>
              <p style="font-size:18px;line-height:1.45;font-weight:500">${svc.outcomeText}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="svc-deliverables" class="bg-paper sec-sm">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(40px,5vw,64px)">
          <div class="autogrid end" style="--min:380px;--gap:16px;--gap-x:64px">
            <div class="stack stack-14">
              <h2 style="font-size:clamp(30px,3.6vw,56px);font-weight:600;line-height:1.06;letter-spacing:-.03em">What you receive</h2>
            </div>
            <p class="small muted" style="max-width:36em;line-height:1.55">${PG.deliverablesLine}</p>
          </div>
          <div class="deliverables">
            ${each(svc.deliverables, function (d) {
              return html`
                <div class="deliverable">
                  <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" fill="none" stroke="#02203D"
                       stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="${PG.icon(d.icon)}"/></svg>
                  <h3 style="font-size:20px;font-weight:600;line-height:1.25;letter-spacing:-.01em">${d.title}</h3>
                  <p class="small slate" style="line-height:1.55">${d.desc}</p>
                </div>`;
            })}
          </div>
          <button type="button" class="btn btn-ghost" data-jump="svc-artifact"
                  style="align-self:flex-start;height:44px;font-size:15px">See a sample deliverable <span class="chev down" aria-hidden="true">↓</span></button>
        </div>
      </section>

      <section id="svc-approach" class="sec-sm">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(36px,4vw,56px)">
          <div class="stack stack-14" style="max-width:720px">
            <span class="eyebrow">How we work</span>
            <h2 style="font-size:clamp(30px,3.6vw,56px);font-weight:600;line-height:1.06;letter-spacing:-.03em">How the work runs: five stages, each ending in something you can see.</h2>
          </div>
          <div role="tablist" aria-label="Approach stages" data-stage-tabs class="stepper">
            ${each(svc.approach, function (st, i) {
              var marker = svc.feedback && i === svc.feedback.from
                ? '↺ ' + svc.approach[svc.feedback.to].name
                : (i < svc.approach.length - 1 ? '→' : '■');
              return html`
                <button type="button" role="tab" class="stage-tab" data-stage="${i}" id="svc-tab-${i}"
                        aria-controls="svc-stage-panel" aria-selected="${s.stage === i ? 'true' : 'false'}"
                        tabindex="${s.stage === i ? '0' : '-1'}">
                  <span class="meta"><span>0${i + 1}</span><span>${marker}</span></span>
                  <span class="nm">${st.name}</span>
                </button>`;
            })}
          </div>
          <div role="tabpanel" id="svc-stage-panel" data-stage-panel aria-labelledby="svc-tab-${s.stage}"
               class="autogrid" style="--min:320px;--gap:32px;--gap-x:clamp(40px,5vw,80px);padding-top:8px;align-items:start">
            ${stagePanel(svc, s.stage)}
          </div>
        </div>
      </section>

      <section id="svc-flow" class="bg-ink sec-sm">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(36px,4vw,56px)">
          <div class="row between end" style="gap:16px 48px">
            <div class="stack stack-14" style="max-width:760px">
              <span class="eyebrow eyebrow-dark">How your information becomes an answer</span>
              <h2 style="font-size:clamp(30px,3.6vw,56px);font-weight:600;line-height:1.06;letter-spacing:-.03em;text-wrap:balance">${svc.flow.title}</h2>
            </div>
            <button type="button" class="toggle toggle-dark" data-replay-flow style="height:40px">Replay</button>
          </div>

          <div class="flow-wrap">
            <div class="flow flow-paper" data-flow>
              <svg class="flow-svg" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" data-flow-svg>
                <defs>
                  <marker id="pg-arr-n" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4 0 8z" fill="rgba(255,255,255,0.7)"/></marker>
                  <marker id="pg-arr-e" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4 0 8z" fill="#FFD08A"/></marker>
                  <marker id="pg-arr-f" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4 0 8z" fill="#38A0C3"/></marker>
                </defs>
                <g data-flow-edges></g>
              </svg>
              <div class="flow-nodes" data-flow-nodes style="grid-template-columns:repeat(${maxCol},minmax(0,1fr))">
                ${each(nodes, function (n) {
                  return html`
                    <button type="button" class="flow-node kind-${n.kind}" data-flow-node="${n.id}"
                            aria-pressed="false" style="grid-column:${n.col};grid-row:${n.row}">
                      <span class="k">${KIND_LABEL[n.kind] || ''}</span>
                      <span class="l">${n.label}</span>
                      ${when(!!n.sub, function () { return html`<span class="s">${n.sub}</span>`; })}
                    </button>`;
                })}
              </div>
            </div>
            <aside class="flow-aside" aria-live="polite" data-flow-aside>
              <span class="eyebrow eyebrow-dark">Select any box</span>
              <span style="font-weight:600;font-size:17px">${svc.flow.title}</span>
              <p style="font-size:14px;line-height:1.55;color:rgba(255,255,255,.8)">Select any box to read what happens there. Solid lines move forward, amber lines are exceptions, dashed lines go back for correction.</p>
            </aside>
          </div>

          <div class="row" style="gap:12px 24px;border-top:1px solid rgba(255,255,255,.15);padding-top:20px">
            <span class="lbl" style="color:rgba(255,255,255,.6)">${svc.flow.bandTitle}</span>
            ${each(svc.flow.band, function (b) {
              return html`<span class="band-chip">${b}</span>`;
            })}
            <span class="flow-legend"><span>— forward</span><span style="color:var(--amber)">— exception</span><span style="color:var(--accent)">- - feedback</span></span>
          </div>

          <ol class="flow-steps">
            ${each(svc.flow.edges, function (e) {
              var a = nodes.find(function (n) { return n.id === e.from; });
              var b = nodes.find(function (n) { return n.id === e.to; });
              return html`<li>${a.label} → ${b.label}${e.label ? ' (' + e.label + ')' : ''}${e.type === 'exception' ? ' — exception route' : (e.type === 'feedback' ? ' — feedback' : '')}.</li>`;
            })}
          </ol>
        </div>
      </section>

      <section id="svc-artifact" class="sec-sm">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:380px">
          <div class="stack stack-20">
            <span class="eyebrow">Worked example</span>
            <h2 style="font-size:clamp(28px,3.2vw,48px);font-weight:600;line-height:1.08;letter-spacing:-.03em;text-wrap:balance">${svc.example.question}</h2>
            <ol class="stack stack-14" style="list-style:none;border-top:1px solid var(--rule);padding-top:20px">
              ${each(svc.example.steps, function (t, i) {
                return html`
                  <li style="display:grid;grid-template-columns:28px minmax(0,1fr);gap:12px;font-size:16px;line-height:1.55">
                    <span class="lbl" style="color:var(--muted);padding-top:4px">0${i + 1}</span><span>${t}</span>
                  </li>`;
              })}
            </ol>
            <p class="fine">Illustrative example with sample figures, not a client result.</p>
          </div>

          <div class="stack stack-14">
            <span class="lbl" style="color:var(--muted)">Sample deliverable · ${ARTIFACT_TITLES[svc.slug]}</span>
            <div data-artifact>${ARTIFACTS[svc.slug](s)}</div>
          </div>
        </div>
      </section>

      <section id="svc-technology" class="bg-paper" style="padding:clamp(56px,7vw,112px) 0">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:340px;--gap:32px">
          <div class="stack stack-14">
            <span class="eyebrow">Technology</span>
            <h2 class="h2-sm">${svc.techHeading || PG.techHeading}</h2>
            <p class="small slate" style="font-size:16px;line-height:1.6;max-width:32em">${svc.techIntro || PG.techIntro}</p>
            ${when((svc.methods || []).length > 0, function () {
              return html`<p class="small muted">Ways of working (not software): ${svc.methods.join(', ').toLowerCase()}.</p>`;
            })}
          </div>
          <div class="stack" style="border-top:1px solid var(--rule-strong)">
            ${each(svc.tech.filter(function (t) { return t.status === 'public'; }), function (t) {
              return html`
                <div style="display:grid;grid-template-columns:28px minmax(0,.8fr) minmax(0,1.6fr);gap:8px 16px;padding:16px 0;border-bottom:1px solid var(--rule-strong);align-items:start">
                  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="#02203D"
                       stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="margin-top:1px"><path d="${PG.icon(techIcon(svc, t))}"/></svg>
                  <span style="font-weight:600;font-size:16px;line-height:1.35">${t.name}</span>
                  <span class="small slate">${t.role}</span>
                </div>`;
            })}
          </div>
        </div>
      </section>

      <section id="svc-questions" class="sec-sm">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:320px;--gap:48px;--gap-x:clamp(40px,5vw,80px)">
          <div class="stack stack-18">
            <span class="eyebrow">How we would measure success</span>
            <p class="small muted">Agreed with you before work starts. These are the measures, not results we are claiming.</p>
            <ul class="rows" style="list-style:none">
              ${each(svc.measures, function (m) { return html`<li style="padding:12px 0;font-size:16px">${m}</li>`; })}
            </ul>
          </div>
          <div class="stack stack-18">
            <span class="eyebrow">Common questions</span>
            <div class="stack" style="border-top:1px solid var(--rule)">
              ${each(svc.faqs, function (f) {
                return html`<details class="faq"><summary>${f.q}</summary><p>${f.a}</p></details>`;
              })}
            </div>
          </div>
          <div class="stack stack-18">
            <span class="eyebrow">Related services</span>
            <div class="stack stack-10">
              ${each(related, function (r) {
                return html`
                  <a class="related-link" href="/services/${r.slug}">
                    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="none" stroke="#02203D"
                         stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="${PG.icon(r.icon)}"/></svg>
                    <span class="stack" style="gap:2px">
                      <span style="font-weight:600;font-size:16px">${r.title}</span>
                      <span class="fine">${r.outcome}</span>
                    </span>
                    <span aria-hidden="true" style="color:var(--teal)">→</span>
                  </a>`;
              })}
              ${when(!!relatedWork.slug, function () {
                return html`
                  <a class="stack stack-4" href="/work/${relatedWork.slug}"
                     style="padding:16px 18px;border:1px solid rgba(7,19,28,.15);border-radius:var(--radius);color:var(--ink)">
                    <span class="lbl" style="color:var(--muted)">Illustrative scenario</span>
                    <span style="font-weight:600;font-size:16px">${relatedWork.title}</span>
                  </a>`;
              })}
            </div>
          </div>
        </div>
      </section>`;
  }

  function closing(svc) {
    var ov = PG.servicesOverview || { closing: {} };
    return html`
      <section style="padding:0 0 clamp(96px,10vw,160px)">
        <div class="wrap row between" data-reveal="rise"
             style="padding-top:clamp(56px,7vw,96px);border-top:1px solid var(--rule);gap:32px 64px">
          <div class="stack stack-14" style="max-width:640px">
            <h2 style="font-size:clamp(32px,4.4vw,68px);font-weight:650;line-height:1;letter-spacing:-.035em;text-wrap:balance">${svc ? svc.closing : ov.closing.h}</h2>
            ${when(!svc, function () { return html`<p class="small muted" style="font-size:17px;line-height:1.55;max-width:34em">${ov.closing.p}</p>`; })}
          </div>
          <div class="row" style="gap:16px 28px">
            <a class="btn" href="/contact${svc ? '?service=' + svc.slug : ''}">${svc ? svc.cta : 'Send us your question'}</a>
            <a class="arrow" href="/assessment">Take the readiness assessment <span class="chev" aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>`;
  }

  /* -------------------------------------------------------------- module */

  PG.pages = PG.pages || {};

  PG.pages.services = {
    meta: function (p) {
      var svc = p.slug && find(p.slug);
      if (!svc) {
        return {
          title: 'Services',
          desc: (PG.servicesOverview || {}).intro ||
            'Strategy, engineering and analysis brought together to make intelligence useful.',
          heroKey: 'services',
          crumbs: [{ name: 'Services', path: '/services' }]
        };
      }
      return {
        title: svc.title,
        desc: svc.lead,
        heroKey: 'services/' + svc.slug,
        crumbs: [{ name: 'Services', path: '/services' }, { name: svc.title, path: '/services/' + svc.slug }],
        schema: PG.seo.service(svc)
      };
    },

    render: function (p) {
      var svc = p.slug && find(p.slug);
      var s = { stage: 0, node: null, rmInit: 0, rmReady: false, trace: false, metric: 0, aiMode: 'normal', aiDecision: null, role: 0 };
      this._state = s;
      this._svc = svc;
      return svc
        ? html`${detail(svc, s)}${closing(svc)}`
        : html`${overview()}${closing(null)}`;
    },

    mount: function (root, cleanup) {
      var svc = this._svc;
      var s = this._state;

      /* Jump links and the deliverables button scroll to a section. */
      var onJump = function (e) {
        var b = e.target.closest('[data-jump]');
        if (!b) return;
        var el = document.getElementById(b.getAttribute('data-jump'));
        if (!el) return;
        el.scrollIntoView({ behavior: C.motion.reduced ? 'auto' : 'smooth', block: 'start' });
      };
      root.addEventListener('click', onJump);
      cleanup(function () { root.removeEventListener('click', onJump); });

      if (!svc) return;

      /* --- jump nav highlights the section in view ------------------- */
      var sections = C.qsa('[id^="svc-"]', root);
      var jumpBtns = C.qsa('[data-jump]', root).filter(function (b) { return b.classList.contains('subnav-jump'); });
      if ('IntersectionObserver' in window && sections.length) {
        var spy = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            jumpBtns.forEach(function (b) {
              b.setAttribute('aria-current', b.getAttribute('data-jump') === en.target.id ? 'true' : 'false');
            });
          });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(function (sec) { spy.observe(sec); });
        cleanup(function () { spy.disconnect(); });
      }

      /* --- approach tabs -------------------------------------------- */
      var stagePanelEl = root.querySelector('[data-stage-panel]');
      var stageTabs = C.qsa('[data-stage]', root);

      function setStage(i) {
        s.stage = i;
        stageTabs.forEach(function (t, j) {
          t.setAttribute('aria-selected', j === i ? 'true' : 'false');
          t.tabIndex = j === i ? 0 : -1;
        });
        if (stagePanelEl) {
          stagePanelEl.innerHTML = stagePanel(svc, i).value;
          stagePanelEl.setAttribute('aria-labelledby', 'svc-tab-' + i);
        }
      }

      var tabList = root.querySelector('[data-stage-tabs]');
      if (tabList) {
        var onTab = function (e) {
          var b = e.target.closest('[data-stage]');
          if (b) setStage(Number(b.getAttribute('data-stage')));
        };
        var onTabKey = function (e) {
          var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 :
            e.key === 'Home' ? -99 : e.key === 'End' ? 99 : 0;
          if (!d) return;
          e.preventDefault();
          var next = d === -99 ? 0 : d === 99 ? stageTabs.length - 1 :
            Math.min(stageTabs.length - 1, Math.max(0, s.stage + d));
          setStage(next);
          stageTabs[next].focus();
        };
        tabList.addEventListener('click', onTab);
        tabList.addEventListener('keydown', onTabKey);
        cleanup(function () {
          tabList.removeEventListener('click', onTab);
          tabList.removeEventListener('keydown', onTabKey);
        });
      }

      /* --- artifact interactions ------------------------------------ */
      var artifactHost = root.querySelector('[data-artifact]');

      function repaintArtifact() {
        if (artifactHost) artifactHost.innerHTML = ARTIFACTS[svc.slug](s).value;
      }

      var onArtifact = function (e) {
        var t = e.target;
        var hit = false;

        var init = t.closest('[data-rm-init]');
        if (init) { s.rmInit = Number(init.getAttribute('data-rm-init')); hit = true; }

        if (t.closest('[data-rm-ready]')) {
          s.rmReady = t.closest('[data-rm-ready]').checked;
          s.rmInit = 2;
          hit = true;
        }

        if (t.closest('[data-trace]')) { s.trace = true; hit = true; }
        if (t.closest('[data-close-trace]')) { s.trace = false; hit = true; }

        var metric = t.closest('[data-metric]');
        if (metric) { s.metric = Number(metric.getAttribute('data-metric')); hit = true; }

        var mode = t.closest('[data-ai-mode]');
        if (mode) { s.aiMode = mode.getAttribute('data-ai-mode'); s.aiDecision = null; hit = true; }

        var dec = t.closest('[data-ai-decision]');
        if (dec) {
          var which = dec.getAttribute('data-ai-decision');
          if (which === 'approve' && s.aiMode === 'missing') return;
          s.aiDecision = which;
          hit = true;
        }

        var role = t.closest('[data-role]');
        if (role) { s.role = Number(role.getAttribute('data-role')); hit = true; }

        if (hit) repaintArtifact();
      };
      if (artifactHost) {
        artifactHost.addEventListener('click', onArtifact);
        artifactHost.addEventListener('change', onArtifact);
        cleanup(function () {
          artifactHost.removeEventListener('click', onArtifact);
          artifactHost.removeEventListener('change', onArtifact);
        });
      }

      /* --- measured flow diagram ------------------------------------ */
      var flow = root.querySelector('[data-flow]');
      if (!flow) return;

      var svgEl = flow.querySelector('[data-flow-svg]');
      var edgeHost = flow.querySelector('[data-flow-edges]');
      var asideEl = root.querySelector('[data-flow-aside]');
      var played = false;
      var animate = false;
      var nodes = svc.flow.nodes;

      function incident(id) {
        return svc.flow.edges.filter(function (e) { return e.from === id || e.to === id; });
      }

      function measure() {
        var base = flow.getBoundingClientRect();
        var rects = {};
        C.qsa('[data-flow-node]', flow).forEach(function (n) {
          var r = n.getBoundingClientRect();
          rects[n.getAttribute('data-flow-node')] = {
            l: r.left - base.left, t: r.top - base.top, w: r.width, h: r.height
          };
        });
        return { w: base.width, h: base.height, rects: rects, narrow: window.innerWidth < 960 };
      }

      function drawEdges() {
        var g = measure();
        if (!g.w || !g.h) return;
        svgEl.setAttribute('viewBox', '0 0 ' + g.w + ' ' + g.h);

        var out = '';
        svc.flow.edges.forEach(function (e, i) {
          var A = g.rects[e.from], B = g.rects[e.to];
          if (!A || !B) return;

          var acx = A.l + A.w / 2, acy = A.t + A.h / 2;
          var bcx = B.l + B.w / 2, bcy = B.t + B.h / 2;
          var d, lx, ly, len;

          if (e.type === 'feedback') {
            if (g.narrow) {
              var x1 = A.l + A.w, y1 = acy, x2 = B.l + B.w, y2 = bcy, off = 34;
              d = 'M' + x1 + ' ' + y1 + ' C' + (x1 + off) + ' ' + y1 + ' ' + (x2 + off) + ' ' + y2 + ' ' + x2 + ' ' + y2;
              lx = Math.max(x1, x2) + off - 4; ly = (y1 + y2) / 2;
              len = Math.abs(y2 - y1) + 2 * off;
            } else {
              var fy1 = A.t + A.h, fy2 = B.t + B.h, dy = 44;
              d = 'M' + acx + ' ' + fy1 + ' C' + acx + ' ' + (fy1 + dy) + ' ' + bcx + ' ' + (fy2 + dy) + ' ' + bcx + ' ' + fy2;
              lx = (acx + bcx) / 2; ly = Math.max(fy1, fy2) + dy - 6;
              len = Math.abs(acx - bcx) + 2 * dy;
            }
          } else if (g.narrow) {
            var ny1 = A.t + A.h, ny2 = B.t, mid = (ny1 + ny2) / 2;
            d = 'M' + acx + ' ' + ny1 + ' C' + acx + ' ' + mid + ' ' + bcx + ' ' + mid + ' ' + bcx + ' ' + ny2;
            lx = (acx + bcx) / 2 + 60; ly = mid + 4;
            len = Math.abs(ny2 - ny1) + 20;
          } else {
            var hx1 = A.l + A.w, hx2 = B.l, mx = (hx1 + hx2) / 2;
            d = 'M' + hx1 + ' ' + acy + ' C' + mx + ' ' + acy + ' ' + mx + ' ' + bcy + ' ' + hx2 + ' ' + bcy;
            lx = mx; ly = (acy + bcy) / 2 - 8;
            len = Math.hypot(hx2 - hx1, bcy - acy) * 1.15;
          }

          var hi = s.node && (e.from === s.node || e.to === s.node);
          var dimmed = s.node && !hi;
          var fb = e.type === 'feedback';
          var stroke = e.type === 'exception' ? '#FFD08A' : (fb ? '#38A0C3' : 'rgba(255,255,255,0.7)');
          var marker = e.type === 'exception' ? 'url(#pg-arr-e)' : (fb ? 'url(#pg-arr-f)' : 'url(#pg-arr-n)');
          var run = animate && !C.motion.reduced;
          var opacity = dimmed ? 0.25 : ((!played && !C.motion.reduced) ? 0 : 1);

          out += '<path d="' + d + '" fill="none" stroke="' + stroke + '" stroke-width="' + (hi ? 2.5 : 1.5) + '"' +
            ' stroke-dasharray="' + (fb ? '5 5' : (run ? Math.round(len) : 'none')) + '"' +
            ' stroke-dashoffset="' + (fb ? 0 : (run ? Math.round(len) : 0)) + '"' +
            ' marker-end="' + marker + '" style="opacity:' + opacity +
            ';animation:' + (run ? (fb
              ? 'pgFade 500ms ease ' + (i * 220 + 200) + 'ms both'
              : 'pgTrace 750ms cubic-bezier(0.22,1,0.36,1) ' + (i * 220) + 'ms forwards') : 'none') +
            ';transition:opacity 300ms,stroke-width 300ms"/>';

          if (e.label) {
            out += '<text x="' + lx + '" y="' + ly + '" text-anchor="middle" font-size="11"' +
              ' font-family="IBM Plex Mono, monospace" fill="' +
              (e.type === 'exception' ? '#FFD08A' : (fb ? '#38A0C3' : 'rgba(255,255,255,0.8)')) +
              '" stroke="#07131C" stroke-width="4" paint-order="stroke" style="opacity:' + opacity + '">' +
              C.esc(e.label) + '</text>';
          }
        });
        edgeHost.innerHTML = out;
      }

      function paintNodes() {
        C.qsa('[data-flow-node]', flow).forEach(function (el) {
          var id = el.getAttribute('data-flow-node');
          var sel = s.node === id;
          el.setAttribute('aria-pressed', sel ? 'true' : 'false');
          var dim = s.node && !sel && !incident(s.node).some(function (e) { return e.from === id || e.to === id; });
          el.classList.toggle('is-dim', !!dim);
        });

        if (!asideEl) return;
        var n = nodes.find(function (x) { return x.id === s.node; });
        asideEl.innerHTML =
          '<span class="eyebrow eyebrow-dark">' +
          C.esc(n ? (KIND_LABEL[n.kind] || '') : 'Select any box') + '</span>' +
          '<span style="font-weight:600;font-size:17px">' + C.esc(n ? n.label : svc.flow.title) + '</span>' +
          '<p style="font-size:14px;line-height:1.55;color:rgba(255,255,255,.8)">' +
          C.esc(n ? n.note : 'Select any box to read what happens there. Solid lines move forward, amber lines are exceptions, dashed lines go back for correction.') +
          '</p>';
      }

      var onFlowClick = function (e) {
        var n = e.target.closest('[data-flow-node]');
        if (n) {
          var id = n.getAttribute('data-flow-node');
          s.node = s.node === id ? null : id;
          paintNodes();
          drawEdges();
          return;
        }
        if (e.target.closest('[data-replay-flow]')) {
          s.node = null;
          animate = false;
          paintNodes();
          drawEdges();
          setTimeout(function () { animate = true; played = true; drawEdges(); }, 40);
        }
      };
      root.addEventListener('click', onFlowClick);

      function play() {
        if (played) return;
        played = true;
        animate = true;
        drawEdges();
      }

      var resizeT = null;
      var onResize = function () {
        clearTimeout(resizeT);
        resizeT = setTimeout(function () { animate = false; drawEdges(); }, 80);
      };
      window.addEventListener('resize', onResize);

      /* Draw once synchronously so the diagram is never a blank box, then
         re-measure after two frames (grid tracks settle) and again once web
         fonts have swapped in and changed the node heights. */
      drawEdges();
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          drawEdges();
          var b = flow.getBoundingClientRect();
          if (b.top < window.innerHeight * 0.9 && b.bottom > 0) play();
        });
      });
      var settle = setTimeout(drawEdges, 900);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawEdges);

      /* If neither the observer nor a scroll ever reports in — a background
         tab, a browser without IntersectionObserver — reveal it anyway. */
      var playFallback = setTimeout(play, 2500);

      var flowIO = null;
      if ('IntersectionObserver' in window) {
        flowIO = new IntersectionObserver(function (es) { if (es[0].isIntersecting) play(); }, { threshold: 0.2 });
        flowIO.observe(flow);
      }
      var ro = null;
      if ('ResizeObserver' in window) {
        ro = new ResizeObserver(onResize);
        ro.observe(flow);
      }
      var onScroll = function () {
        var b = flow.getBoundingClientRect();
        if (b.top < window.innerHeight * 0.9 && b.bottom > 0) play();
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      cleanup(function () {
        root.removeEventListener('click', onFlowClick);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('scroll', onScroll);
        clearTimeout(resizeT);
        clearTimeout(settle);
        clearTimeout(playFallback);
        if (flowIO) flowIO.disconnect();
        if (ro) ro.disconnect();
      });
    }
  };
})();
