/* Pattern Grid — Home. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when, raw = C.raw;

  var PREVIEW_KICKERS = [
    'Prioritisation matrix',
    'Pipeline run with one held record',
    'Inspectable metric',
    'Review queue',
    'Who can do which task'
  ];

  /* The signature four-stage sequence, one consistent sample dataset. */
  var LOCS = [
    { name: 'Ikeja', sales: 100, avail: 92 },
    { name: 'Lekki', sales: 96, avail: 88 },
    { name: 'Surulere', sales: 61, avail: 41, hl: true },
    { name: 'Ikorodu', sales: 89, avail: 85 }
  ];

  var STAGES = [
    {
      name: 'Sources',
      copy: 'Three systems describe the same business in three different ways. Sales counts units by outlet code, Stock reports availability by location, Distribution logs deliveries by route.',
      caption: 'Three separate sources'
    },
    {
      name: 'Align',
      copy: 'Each record is mapped to a common product and location. Outlet 0118, location E-0118 and drop 0118 become one place: Surulere.',
      caption: 'Aligned to product and location'
    },
    {
      name: 'Compare',
      copy: 'With one model, sales and availability can sit side by side. One location has both lower sales and lower availability.',
      caption: 'Sales index against availability, week 36'
    },
    {
      name: 'Question',
      copy: 'The connected view shows where to look next. Whether low availability is causing low sales is for the team to investigate. It is not a conclusion.',
      caption: 'A question, not a conclusion'
    }
  ];

  var ALIGN_SQL =
    '-- one location key across three systems\n' +
    'SELECT l.location, s.units AS sales, k.avail_pct, d.deliveries\n' +
    'FROM dim.location l\n' +
    'JOIN sales.sell_out s ON s.outlet_code = l.outlet_code\n' +
    'JOIN stock.availability k ON k.loc_code = l.stock_code\n' +
    'JOIN dist.drops d ON d.drop_code = l.drop_code\n' +
    'WHERE s.week = 36 AND k.week = 36 AND d.week = 36;';

  function groupsFor(stage) {
    if (stage === 0) {
      return [
        { title: 'Sales', rows: ['Outlet 0031 · SKU 4471 · 312 units', 'Outlet 0118 · SKU 4471 · 190 units', 'Outlet 0207 · SKU 4471 · 299 units', 'Outlet 0342 · SKU 4471 · 278 units'] },
        { title: 'Stock', rows: ['Loc E-0031 · Item 4471 · 92% avail', 'Loc E-0118 · Item 4471 · 41% avail', 'Loc E-0207 · Item 4471 · 88% avail', 'Loc E-0342 · Item 4471 · 85% avail'] },
        { title: 'Distribution', rows: ['Route E-1 · Drop 0031 · 3 deliveries', 'Route E-4 · Drop 0118 · 1 delivery', 'Route E-2 · Drop 0207 · 3 deliveries', 'Route E-3 · Drop 0342 · 3 deliveries'] }
      ].map(function (g) { return { title: g.title, on: false, rows: g.rows.map(function (r) { return { text: r, hl: false }; }) }; });
    }
    if (stage === 1) {
      return [
        { title: 'Product 4471 · Location', rows: ['Ikeja ← 0031 / E-0031 / Drop 0031', 'Surulere ← 0118 / E-0118 / Drop 0118', 'Lekki ← 0207 / E-0207 / Drop 0207', 'Ikorodu ← 0342 / E-0342 / Drop 0342'] },
        { title: 'Sales · Availability · Deliveries', rows: ['312 · 92% · 3', '190 · 41% · 1', '299 · 88% · 3', '278 · 85% · 3'] }
      ].map(function (g) {
        return { title: g.title, on: true, rows: g.rows.map(function (r, i) { return { text: r, hl: i === 1 }; }) };
      });
    }
    return [];
  }

  /* Per-service preview cards shown beside the capability list. */
  function previewBody(i) {
    if (i === 0) {
      var quads = [
        { quad: 'high value · ready', items: ['Weekly commercial reporting'], cls: 'on' },
        { quad: 'high value · foundation needed', items: ['AI reporting assistant'], cls: 'warn' },
        { quad: 'foundation', items: ['Metric definitions', 'Source integration'], cls: '' },
        { quad: 'later', items: ['Customer churn model'], cls: 'off' }
      ];
      return html`
        <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">
          ${each(quads, function (q) {
            return html`<div class="quad ${q.cls}">
              <span class="q">${q.quad}</span>
              ${each(q.items, function (it) { return html`<span class="i">${it}</span>`; })}
            </div>`;
          })}
        </div>
        <div class="mono" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;font-size:11px;color:rgba(255,255,255,.7)">
          <span>Phase 1 · Definitions</span><span>Phase 2 · Reporting</span><span>Phase 3 · Assisted work</span>
        </div>`;
    }

    if (i === 1) {
      var runs = [
        { s: 'erp_orders', l: 'Tue 06:10', c: '12/12', st: 'loaded', ok: true },
        { s: 'crm_outlets', l: 'Tue 06:14', c: '8/8', st: 'loaded', ok: true },
        { s: 'stock_weekly', l: 'Tue 06:22', c: '6/7', st: '1 held', ok: false }
      ];
      return html`
        <div class="mono" style="display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:6px 10px;font-size:12px">
          <span style="color:rgba(255,255,255,.55)">source</span>
          <span style="color:rgba(255,255,255,.55)">last load</span>
          <span style="color:rgba(255,255,255,.55)">checks</span>
          <span style="color:rgba(255,255,255,.55)">status</span>
          ${each(runs, function (r) {
            var b = 'padding:8px 0;border-top:1px solid rgba(255,255,255,.12)';
            return html`
              <span style="${b}">${r.s}</span><span style="${b}">${r.l}</span><span style="${b}">${r.c}</span>
              <span style="${b}"><span class="pill" style="color:${r.ok ? '#38A0C3' : '#FFD08A'}">${r.st}</span></span>`;
          })}
        </div>
        <pre class="code">-- quality gate: hold records without a product key
SELECT s.*, CASE WHEN p.product_id IS NULL
  THEN 'HELD: missing product ID' ELSE 'OK' END AS check_status
FROM stg.stock_weekly s
LEFT JOIN dim.product p ON p.product_id = s.product_id;</pre>`;
    }

    if (i === 2) {
      var bars = [['Beverages', -0.1], ['Snacks', -0.3], ['Personal care', 0.0], ['Household', 0.0]];
      return html`
        <div style="border:1px solid rgba(255,255,255,.18);border-left:2px solid #FFD08A;border-radius:3px;padding:16px;display:flex;flex-direction:column;gap:6px">
          <span class="lbl" style="color:rgba(255,255,255,.65)">Net sales · W36 · sample units (m)</span>
          <span class="num" style="font-size:44px;font-weight:600;letter-spacing:-.03em;line-height:1">9.6</span>
          <span style="font-size:13px;color:rgba(255,255,255,.8)">Plan 10.0 · Variance −0.4 (−4%) · Gross 10.0 − Returns 0.4</span>
        </div>
        <div class="stack stack-8">
          ${each(bars, function (b) {
            var v = (b[1] > 0 ? '+' : '') + b[1].toFixed(1);
            return html`
              <div style="display:grid;grid-template-columns:110px minmax(0,1fr) 44px;gap:10px;align-items:center;font-size:13px">
                <span>${b[0]}</span>
                <span style="height:8px;background:rgba(255,255,255,.08);border-radius:2px;position:relative">
                  <span style="position:absolute;right:0;top:0;height:100%;border-radius:2px;width:${Math.abs(b[1]) / 0.4 * 100}%;background:${b[1] <= -0.3 ? '#FFD08A' : 'rgba(255,255,255,.6)'}"></span>
                </span>
                <span class="mono num" style="text-align:right;font-size:12px">${v}</span>
              </div>`;
          })}
        </div>
        <pre class="code">Net Sales = [Gross Sales] - [Returns]
Variance to Plan = DIVIDE([Net Sales] - [Plan], [Plan])</pre>`;
    }

    if (i === 3) {
      var queue = [
        { item: 'Weekly briefing · W36', meta: 'proposed · 3/3 checks · linked to 6 measures', st: 'awaiting review', warn: true },
        { item: 'Weekly briefing · W35', meta: 'approved by finance lead · released Mon 09:12', st: 'approved', warn: false },
        { item: 'Stock alert · Territory East', meta: 'rule: demand > available for 3+ outlets', st: 'sent · owner assigned', warn: false },
        { item: 'Briefing · W34', meta: 'finance ledger missing → stopped at review', st: 'returned', warn: true }
      ];
      return html`
        <div class="stack stack-8">
          ${each(queue, function (q) {
            return html`
              <div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;border:1px solid rgba(255,255,255,.14);border-radius:3px;padding:12px 14px">
                <span class="stack" style="gap:3px">
                  <span style="font-size:13px;font-weight:500">${q.item}</span>
                  <span class="lbl" style="color:rgba(255,255,255,.6)">${q.meta}</span>
                </span>
                <span class="pill" style="font-size:10.5px;padding:3px 8px;white-space:nowrap;color:${q.warn ? '#FFD08A' : '#38A0C3'}">${q.st}</span>
              </div>`;
          })}
        </div>`;
    }

    var tasks = [
      { n: 'Update a measure', practised: true, independent: true },
      { n: 'Reconcile a report to source', practised: true, independent: true },
      { n: 'Add a drill path', practised: true, independent: false }
    ];
    var th = 'font-family:var(--mono);font-size:10.5px;color:rgba(255,255,255,.55)';
    var td = 'padding:10px 0;border-top:1px solid rgba(255,255,255,.12)';
    return html`
      <div style="display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:6px 10px;font-size:12px;align-items:center">
        <span style="${th}">task · analyst</span><span style="${th}">baseline</span>
        <span style="${th}">practised</span><span style="${th}">independent</span>
        ${each(tasks, function (k) {
          function dot(fill, border) {
            return raw('<span style="display:inline-block;width:12px;height:12px;border-radius:50%;border:1.5px solid ' +
              border + ';background:' + fill + '"></span>');
          }
          return html`
            <span style="${td}">${k.n}</span>
            <span style="${td}">${dot('#FFFFFF', '#FFFFFF')}</span>
            <span style="${td}">${dot(k.practised ? '#FFFFFF' : 'transparent', '#FFFFFF')}</span>
            <span style="${td}">${dot(k.independent ? '#38A0C3' : 'transparent', '#38A0C3')}</span>`;
        })}
      </div>`;
  }

  /* Illustrative record grids beside each work scenario. */
  var WORK_GRIDS = {
    'executive-performance': {
      title: 'metric_dictionary · reconciled',
      cols: '1.4fr 1fr 1fr 0.8fr',
      head: ['metric', 'finance', 'sales', 'status'],
      rows: [['Net sales W36', '9.6m', '9.6m', 'agreed'], ['Gross sales', '10.0m', '10.4m', 'definition'], ['Returns', '0.4m', '—', 'owner: FIN'], ['Active outlets', '412', '418', 'period']],
      note: 'Two definitions of gross sales surfaced and resolved to one owner and one period rule.'
    },
    'distribution-intelligence': {
      title: 'availability_vs_demand · W36',
      cols: '1.2fr 0.8fr 0.9fr 1fr',
      head: ['location', 'sales idx', 'avail', 'exception'],
      rows: [['Ikeja', '100', '92%', '—'], ['Lekki', '96', '88%', '—'], ['Surulere', '61', '41%', 'review alloc.'], ['Ikorodu', '89', '85%', '—']],
      note: 'One location shows both lower sales and lower availability; an exception is raised with an owner.'
    },
    'reporting-workflow': {
      title: 'review_log · weekly briefing',
      cols: '0.7fr 1.2fr 1fr 1fr',
      head: ['week', 'checks', 'reviewer', 'status'],
      rows: [['W36', '3/3 passed', 'finance lead', 'pending'], ['W35', '3/3 passed', 'finance lead', 'approved'], ['W34', 'ledger missing', 'finance lead', 'returned'], ['W33', '3/3 passed', 'finance lead', 'approved']],
      note: 'Every draft is proposed, checked and reviewed by a named person before release. W34 stopped at review.'
    }
  };

  var WORK_META = {
    'executive-performance': ['Which numbers can leadership take into the meeting?', 'Source reconciliation, a metric dictionary, one management view and a decision brief.', 'Show how three functions can agree on one traceable figure.'],
    'distribution-intelligence': ['Where is outlet demand outpacing available stock?', 'A shared stock and sales model with an exception queue and named owners.', 'Show how availability gaps can be seen earlier by outlet.'],
    'reporting-workflow': ['Can a recurring report be prepared with less manual effort and a person still in control?', 'Deterministic checks, a labelled AI-assisted summary and a human review state.', 'Show the separation of automated, assisted and human steps.']
  };

  /* ------------------------------------------------------------ markup */

  function stagePanel(stage) {
    var groups = groupsFor(stage);
    var s = STAGES[stage];

    return html`
      <span class="lbl" style="color:rgba(255,255,255,.55)">Illustrative scenario · Sample data · ${s.caption}</span>

      ${when(stage <= 1, function () {
        return html`
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));gap:10px">
            ${each(groups, function (g) {
              return html`
                <div class="seq-group${g.on ? ' on' : ''}">
                  <span class="gt">${g.title}</span>
                  ${each(g.rows, function (r) { return html`<span class="gr${r.hl ? ' hl' : ''}">${r.text}</span>`; })}
                </div>`;
            })}
          </div>`;
      })}

      ${when(stage === 1, function () { return html`<pre class="code">${ALIGN_SQL}</pre>`; })}

      ${when(stage >= 2, function () {
        return html`
          <div class="stack stack-10">
            <div style="display:grid;grid-template-columns:96px minmax(0,1fr) minmax(0,1fr);gap:12px;font-size:12px;color:rgba(255,255,255,.55)">
              <span>Location</span><span>Sales index</span><span>Availability</span>
            </div>
            ${each(LOCS, function (l) {
              return html`
                <div class="seq-bar${l.hl ? ' hl' : ''}">
                  <span class="n">${l.name}</span>
                  <span style="display:flex;align-items:center;gap:8px">
                    <span class="b" style="width:${l.sales * 0.9}%"></span>
                    <span class="num" style="color:rgba(255,255,255,.8)">${l.sales}</span>
                  </span>
                  <span style="display:flex;align-items:center;gap:8px">
                    <span class="b" style="width:${l.avail * 0.9}%"></span>
                    <span class="num" style="color:rgba(255,255,255,.8)">${l.avail}%</span>
                  </span>
                </div>`;
            })}
          </div>`;
      })}

      ${when(stage === 3, function () {
        return html`
          <div class="seq-q">
            <span class="eyebrow">Question to investigate</span>
            <p style="font-size:clamp(20px,1.6vw,24px);font-weight:600;line-height:1.25">Is availability limiting sales here?</p>
            <p class="small muted">Surulere shows both the lowest sales index (61) and the lowest availability (41%). The connected view raises the question; it does not prove the cause or claim a result.</p>
          </div>`;
      })}`;
  }

  function capabilitySection() {
    var ov = PG.servicesOverview || { features: {} };

    return html`
      <section class="sec" aria-labelledby="cap-h2">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:440px;--gap:56px">
          <div class="stack stack-40">
            <div class="stack stack-16">
              <span class="eyebrow">Five services</span>
              <h2 class="h2" id="cap-h2">Start with the problem. Build what solves it.</h2>
            </div>
            <div class="rows" data-caps>
              ${each(PG.services, function (s, i) {
                var f = ov.features[s.slug] || {};
                return html`
                  <a class="cap-row" href="/services/${s.slug}" data-cap="${i}"
                     aria-current="${i === 0 ? 'true' : 'false'}">
                    <span class="idx num">${s.index}</span>
                    <span class="stack stack-8">
                      <span class="t">${s.title}</span>
                      <span class="d">${f.text || s.short}</span>
                      <span class="row" style="gap:6px;margin-top:2px">
                        ${each(f.outputs || [], function (o) { return html`<span class="chip">${o}</span>`; })}
                      </span>
                    </span>
                    <span class="chev" aria-hidden="true">→</span>
                  </a>`;
              })}
            </div>
          </div>

          <div class="preview-sticky" aria-hidden="true">
            <div class="preview-card" data-preview-card>
              <div class="card-head">
                <span data-preview-kicker>${PREVIEW_KICKERS[0]}</span><span>Sample data</span>
              </div>
              <div data-preview-body>${previewBody(0)}</div>
            </div>
            <div class="row between" style="gap:16px;font-size:14px;color:var(--muted)">
              <span data-preview-title>${PG.services[0].title}</span>
              <span data-preview-outcome style="font-weight:500;color:var(--ink)">${PG.services[0].outcome}</span>
            </div>
          </div>
        </div>
      </section>`;
  }

  function sequenceSection() {
    return html`
      <section class="sec bg-ink" aria-labelledby="seq-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(48px,6vw,80px)">
          <div class="autogrid end" style="--min:380px;--gap:24px;--gap-x:64px">
            <div class="stack stack-16">
              <span class="eyebrow eyebrow-dark">One question, followed through</span>
              <h2 class="h2" id="seq-h2">Where is performance slipping?</h2>
            </div>
            <p style="font-size:18px;line-height:1.6;color:rgba(255,255,255,.78);max-width:34em">One illustrative question, followed through four stages with sample data. Connecting the data does not prove a cause; it shows where to look next.</p>
          </div>

          <div class="autogrid start" style="--min:400px;--gap:40px">
            <div class="seq-sticky">
              <div class="seq-panel">
                <div class="row between" style="gap:12px">
                  <div role="tablist" aria-label="Stages" class="row" style="gap:4px" data-stage-tabs>
                    ${each(STAGES, function (t, i) {
                      return html`<button type="button" role="tab" class="toggle toggle-sm toggle-dark"
                        data-stage="${i}" id="seq-tab-${i}" aria-controls="seq-panel"
                        aria-selected="${i === 0 ? 'true' : 'false'}" tabindex="${i === 0 ? '0' : '-1'}">${t.name}</button>`;
                    })}
                  </div>
                  <button type="button" class="toggle toggle-sm toggle-dark" data-replay>Replay</button>
                </div>
                <div role="tabpanel" id="seq-panel" class="seq-body stack stack-16" data-seq-body
                     aria-labelledby="seq-tab-0">${stagePanel(0)}</div>
              </div>
            </div>

            <div class="stack seq-steps">
              ${each(STAGES, function (st, i) {
                return html`
                  <div class="seq-step${i === 0 ? ' is-active' : ''}" data-seq-step="${i}">
                    <span class="eyebrow eyebrow-dark">0${i + 1}</span>
                    <h3 class="h3">${st.name}</h3>
                    <p style="font-size:17px;line-height:1.6;color:rgba(255,255,255,.8);max-width:32em">${st.copy}</p>
                  </div>`;
              })}
              <a class="arrow" href="/approach" style="color:#fff;padding:24px 0">How we work, in five stages <span class="chev" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </section>`;
  }

  function industriesSection() {
    var spans = [8, 4, 4, 8];
    var ratios = ['16 / 10', '4 / 5', '1 / 1', '2 / 1'];

    return html`
      <section class="sec bg-paper" aria-labelledby="ind-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(40px,5vw,64px)">
          <div class="autogrid end" style="--min:380px;--gap:24px;--gap-x:64px">
            <div class="stack stack-16">
              <span class="eyebrow">Industries in context</span>
              <h2 class="h2" id="ind-h2">Better questions begin with business context.</h2>
            </div>
            <p style="font-size:18px;line-height:1.6;color:var(--muted);max-width:34em">A distribution business, an investment platform and a digital product measure success differently. We design the reporting around the decisions your sector actually makes.</p>
          </div>
          <div class="ind-grid">
            ${each(PG.industries, function (ind, i) {
              var img = PG.img.get(ind.photo);
              return html`
                <a class="ind-cell" href="/industries/${ind.slug}" style="grid-column:span ${spans[i]}">
                  ${C.frame(img, { ar: ratios[i], sizes: '(min-width: 960px) 66vw, 100vw' })}
                  <div class="row between" style="gap:16px;align-items:baseline">
                    <span class="stack stack-6">
                      <span class="t">${ind.title}</span>
                      <span class="small muted" style="max-width:40em">${ind.question}</span>
                      <span class="eyebrow" style="margin-top:4px">${(ind.metrics || []).slice(0, 3).join(' · ')}</span>
                    </span>
                    <span class="chev" aria-hidden="true">→</span>
                  </div>
                </a>`;
            })}
          </div>
        </div>
      </section>`;
  }

  function workSection() {
    return html`
      <section class="sec" aria-labelledby="work-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(48px,6vw,96px)">
          <div class="row between end" style="gap:24px 48px">
            <div class="stack stack-16" style="max-width:720px">
              <span class="eyebrow">Illustrative scenarios</span>
              <h2 class="h2" id="work-h2">Three worked scenarios, built with sample data.</h2>
            </div>
            <a class="arrow" href="/work">Explore our work <span class="chev" aria-hidden="true">→</span></a>
          </div>

          <div class="stack" style="gap:clamp(48px,6vw,96px)">
            ${each(PG.work, function (w, i) {
              var g = WORK_GRIDS[w.slug];
              var meta = WORK_META[w.slug];
              return html`
                <a href="/work/${w.slug}" class="autogrid" style="--min:400px;--gap:32px;--gap-x:clamp(40px,5vw,80px);align-items:center;color:var(--ink)">
                  <div class="panel-dark" data-reveal="clip" aria-hidden="true"
                       style="order:${i % 2 === 0 ? 0 : 1};min-height:300px">
                    <div class="card-head"><span>${g.title}</span><span>Sample data</span></div>
                    <div class="dgrid" style="grid-template-columns:${g.cols}">
                      ${each(g.head, function (h) { return html`<span class="th">${h}</span>`; })}
                      ${each(g.rows, function (row) {
                        return each(row, function (cell, ci) {
                          var last = ci === row.length - 1;
                          var warn = /definition|period|review|returned|pending|missing/.test(cell);
                          var cls = ci === 0 ? 'key' : '';
                          if (last) cls += warn ? ' warn' : (cell === '—' ? ' nil' : ' ok');
                          return html`<span class="td ${cls}">${cell}</span>`;
                        });
                      })}
                    </div>
                    <span style="margin-top:auto;font-size:13px;color:rgba(255,255,255,.75);line-height:1.5">${g.note}</span>
                  </div>
                  <div class="stack stack-18" style="max-width:560px">
                    <span class="lbl" style="color:var(--muted)">Illustrative demonstration · ${w.sector}</span>
                    <h3 style="font-size:clamp(26px,2.6vw,40px);font-weight:600;line-height:1.12;letter-spacing:-.02em">${w.title}</h3>
                    <div class="kv" style="--kv:110px;font-size:15px">
                      <span class="k">Question</span><span>${meta[0]}</span>
                      <span class="k">What it includes</span><span>${meta[1]}</span>
                      <span class="k">What it shows</span><span>${meta[2]}</span>
                    </div>
                    <span class="arrow" style="font-size:15px;color:var(--teal)">Explore the scenario <span class="chev" aria-hidden="true">→</span></span>
                  </div>
                </a>`;
            })}
          </div>
        </div>
      </section>`;
  }

  function founderSection() {
    return html`
      <section class="sec bg-paper" aria-labelledby="founder-h2">
        <div class="wrap ${PG.team && PG.team.founder && PG.team.founder.photo ? 'founder-feature' : 'autogrid end'}" data-reveal="rise" style="--min:380px">
          ${when(!!(PG.team && PG.team.founder && PG.team.founder.photo), function () { return C.portrait(PG.team.founder); })}
          <div class="stack stack-28">
            <div class="stack stack-20">
              <span class="eyebrow">Founder</span>
              <h2 id="founder-h2" style="font-size:clamp(40px,5.2vw,84px);font-weight:650;line-height:.98;letter-spacing:-.035em;color:var(--ink);text-wrap:balance">Precious Chinenye Celestine</h2>
              <span style="font-size:17px;color:var(--muted)">Founder &amp; Lead Consultant · Known professionally as Ada Africa</span>
            </div>
            <div class="stack stack-24" style="border-top:1px solid var(--rule);padding-top:24px">
              <p class="lede">Precious founded Pattern Grid to help organisations make better use of their data. Her work spans business intelligence, reporting systems, data platforms and practical applications of AI and automation.</p>
              <a class="arrow" href="/about/precious-celestine">Meet the founder <span class="chev" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </section>`;
  }

  function closingSection() {
    return html`
      <section aria-labelledby="close-h2" style="padding-block:clamp(96px,12vw,192px)">
        <div class="wrap stack stack-28" data-reveal="rise" style="align-items:flex-start">
          <h2 id="close-h2" style="font-size:clamp(40px,6.4vw,104px);font-weight:650;line-height:.98;letter-spacing:-.035em;max-width:14ch;text-wrap:balance">What would you like to understand?</h2>
          <p style="font-size:clamp(18px,1.4vw,22px);line-height:1.5;max-width:34em;color:var(--muted)">Start a conversation about your data, your decisions and what comes next.</p>
          <div class="row" style="gap:16px 32px;margin-top:8px">
            <a class="btn" href="/contact">Book a consultation</a>
            <a class="arrow" href="/assessment">Take the readiness assessment <span class="chev" aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>`;
  }

  /* ------------------------------------------------------------- module */

  PG.pages = PG.pages || {};

  PG.pages.home = {
    meta: function () {
      return {
        title: null, // home uses the site title
        desc: PG.site.description,
        heroKey: 'home'
      };
    },

    render: function () {
      return html`
        ${PG.hero('home')}
        ${capabilitySection()}
        ${sequenceSection()}
        ${industriesSection()}
        ${workSection()}
        ${founderSection()}
        ${closingSection()}`;
    },

    mount: function (root, cleanup) {
      /* --- capability list drives the preview card ------------------- */
      var kicker = root.querySelector('[data-preview-kicker]');
      var body = root.querySelector('[data-preview-body]');
      var title = root.querySelector('[data-preview-title]');
      var outcome = root.querySelector('[data-preview-outcome]');
      var caps = C.qsa('[data-cap]', root);
      var activeCap = 0;

      var card = root.querySelector('[data-preview-card]');
      var swapT = null;
      function selectCap(i) {
        if (i === activeCap) return;
        activeCap = i;
        caps.forEach(function (el, j) { el.setAttribute('aria-current', j === i ? 'true' : 'false'); });
        if (title) title.textContent = PG.services[i].title;
        if (outcome) outcome.textContent = PG.services[i].outcome;
        // Short settle-out, swap, settle-in — 320 ms each way.
        if (card && !C.motion.reduced) {
          card.classList.add('is-swapping');
          clearTimeout(swapT);
          swapT = setTimeout(function () {
            if (kicker) kicker.textContent = PREVIEW_KICKERS[i];
            if (body) body.innerHTML = previewBody(i).value;
            card.classList.remove('is-swapping');
          }, 200);
        } else {
          if (kicker) kicker.textContent = PREVIEW_KICKERS[i];
          if (body) body.innerHTML = previewBody(i).value;
        }
      }

      caps.forEach(function (el) {
        var i = Number(el.getAttribute('data-cap'));
        var pick = function () { selectCap(i); };
        el.addEventListener('mouseenter', pick);
        el.addEventListener('focus', pick);
        cleanup(function () {
          el.removeEventListener('mouseenter', pick);
          el.removeEventListener('focus', pick);
        });
      });

      /* --- four-stage sequence -------------------------------------- */
      var tabs = C.qsa('[data-stage]', root);
      var seqBody = root.querySelector('[data-seq-body]');
      var steps = C.qsa('[data-seq-step]', root);
      var stage = 0;
      var replaying = false;
      var fadeT = null, replayT = null;

      function paintStage(i) {
        stage = i;
        tabs.forEach(function (t, j) {
          t.setAttribute('aria-selected', j === i ? 'true' : 'false');
          t.tabIndex = j === i ? 0 : -1;
        });
        steps.forEach(function (s, j) { s.classList.toggle('is-active', j === i); });
        if (seqBody) {
          seqBody.innerHTML = stagePanel(i).value;
          seqBody.setAttribute('aria-labelledby', 'seq-tab-' + i);
        }
      }

      function setStage(i) {
        if (i === stage) return;
        if (C.motion.reduced) { paintStage(i); return; }
        if (seqBody) seqBody.classList.add('is-fading');
        clearTimeout(fadeT);
        fadeT = setTimeout(function () {
          paintStage(i);
          if (seqBody) seqBody.classList.remove('is-fading');
        }, 220);
      }

      tabs.forEach(function (t) {
        var click = function () { replaying = false; setStage(Number(t.getAttribute('data-stage'))); };
        t.addEventListener('click', click);
        cleanup(function () { t.removeEventListener('click', click); });
      });

      /* Arrow-key support for the tablist — absent from the prototype. */
      var tablist = root.querySelector('[data-stage-tabs]');
      if (tablist) {
        var onKey = function (e) {
          var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 :
            e.key === 'Home' ? -99 : e.key === 'End' ? 99 : 0;
          if (!d) return;
          e.preventDefault();
          var next = d === -99 ? 0 : d === 99 ? tabs.length - 1 :
            Math.min(tabs.length - 1, Math.max(0, stage + d));
          replaying = false;
          setStage(next);
          tabs[next].focus();
        };
        tablist.addEventListener('keydown', onKey);
        cleanup(function () { tablist.removeEventListener('keydown', onKey); });
      }

      var replayBtn = root.querySelector('[data-replay]');
      if (replayBtn) {
        var onReplay = function () {
          replaying = true;
          clearTimeout(replayT);
          setStage(0);
          var i = 0;
          var step = function () {
            i++;
            if (i > 3) { replaying = false; return; }
            setStage(i);
            replayT = setTimeout(step, 1800);
          };
          replayT = setTimeout(step, 1800);
        };
        replayBtn.addEventListener('click', onReplay);
        cleanup(function () { replayBtn.removeEventListener('click', onReplay); });
      }

      /* Scrolling the narrative column advances the panel. */
      if ('IntersectionObserver' in window && steps.length) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting && !replaying) setStage(Number(e.target.getAttribute('data-seq-step')));
          });
        }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
        steps.forEach(function (s) { io.observe(s); });
        cleanup(function () { io.disconnect(); });
      }

      cleanup(function () { clearTimeout(fadeT); clearTimeout(replayT); clearTimeout(swapT); });
    }
  };
})();
