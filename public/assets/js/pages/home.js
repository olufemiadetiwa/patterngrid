/* Pattern Grid — Home. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when, raw = C.raw;

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
  /* Illustrative record grids beside each work scenario. */
  var WORK_META = {
    'executive-performance': ['Which numbers can leadership take into the meeting?', 'Source reconciliation, a metric dictionary, one management view and a decision brief.', 'Show how three functions can agree on one traceable figure.'],
    'distribution-intelligence': ['Where is outlet demand outpacing available stock?', 'A shared stock and sales model with an exception queue and named owners.', 'Show how availability gaps can be seen earlier by outlet.'],
    'reporting-workflow': ['Can a recurring report be prepared with less manual effort and a person still in control?', 'Deterministic checks, a labelled AI-assisted summary and a human review state.', 'Show the separation of automated, assisted and human steps.']
  };

  /* ------------------------------------------------------------ markup */

  /* The four stages of the sequence as pages of one report canvas. */
  function stagePanel(stage) {
    var R = PG.scene;
    if (stage === 0) {
      return html`<div class="rp-cards">${R.card({ label: 'Sources', value: '3', delta: 'Sales · Stock · Distribution' })}${R.card({ label: 'Keys that differ', value: '3', delta: 'outlet code · location code · drop code', tone: 'warn' })}${R.card({ label: 'Records · W36 · SKU 4471', value: '12', delta: '4 locations' })}</div>
        <div class="rp-grid three">
          ${R.matrix({ title: 'Sales · rep sell-out app', head: ['Outlet', 'Units'], rows: PG.scene.data.locations.map(function (l) { return { hl: !!l.hl, cells: ['OUT-' + l.outlet, String(l.sales === 100 ? 312 : l.sales === 96 ? 299 : l.sales === 61 ? 190 : 278)] }; }) })}
          ${R.matrix({ title: 'Stock · warehouse file', head: ['Location', 'Availability'], rows: PG.scene.data.locations.map(function (l) { return { hl: !!l.hl, cells: ['LOC-' + l.loc, { t: l.avail + '%', shade: 1 - l.avail / 100 }] }; }) })}
          ${R.matrix({ title: 'Distribution · route planner', head: ['Drop', 'Deliveries'], rows: PG.scene.data.locations.map(function (l) { return { hl: !!l.hl, cells: ['DROP-' + l.drop, String(l.hl ? 1 : 3)] }; }) })}
        </div>`;
    }
    if (stage === 1) {
      return html`${R.matrix({ title: 'One location id across three systems · product 4471 · W36', wide: true, head: ['Location', 'Sales key', 'Stock key', 'Drop key', 'Units', 'Availability', 'Deliveries'], rows: PG.scene.data.locations.map(function (l) { return { hl: !!l.hl, cells: [l.name, 'OUT-' + l.outlet, 'LOC-' + l.loc, 'DROP-' + l.drop, String(l.sales === 100 ? 312 : l.sales === 96 ? 299 : l.sales === 61 ? 190 : 278), { t: l.avail + '%', shade: 1 - l.avail / 100 }, String(l.hl ? 1 : 3)] }; }) })}
        <pre class="code rp-code">${ALIGN_SQL}</pre>`;
    }
    if (stage === 2) {
      return html`<div class="rp-grid">
        ${R.hBars({ title: 'Sales index by location · W36 (Ikeja = 100)', rows: PG.scene.data.locations.map(function (l) { return [l.name, l.sales]; }), highlight: 2, fmt: function (v) { return String(v); } })}
        ${R.hBars({ title: 'Availability by location · last count', rows: PG.scene.data.locations.map(function (l) { return [l.name, l.avail]; }), highlight: 2, fmt: function (v) { return v + '%'; } })}
      </div>`;
    }
    return html`<div class="rp-grid">
      ${R.matrix({ title: 'Where sales and availability fall together', wide: true, head: ['Location', 'Sales index', 'Availability', 'Deliveries', 'Read as'], rows: PG.scene.data.locations.map(function (l) { return { hl: !!l.hl, cells: [l.name, String(l.sales), { t: l.avail + '%', shade: 1 - l.avail / 100 }, String(l.hl ? 1 : 3), l.hl ? { t: 'Lowest sales and lowest availability', tone: 'warn' } : 'In range'] }; }) })}
      ${R.callout({ chip: 'Question, not a conclusion', chipTone: 'warn', title: 'Is availability limiting sales in Surulere?', text: 'Surulere shows the lowest sales index (61) and the lowest availability (41%), with one delivery in the week. The connected view raises the question; whether low availability is causing low sales is for the team to investigate.', rows: [['Owner', 'Sales operations lead'], ['Due', 'Next weekly review']] })}
    </div>`;
  }

  /* Five entry points framed around the visitor's problem. Readable without
     hover; a sixth card points the undecided at the assessment. */
  function problemSection() {
    var ov = PG.servicesOverview || { features: {}, situations: [] };
    return html`
      <section class="sec-sm" aria-labelledby="cap-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(32px,4vw,48px)">
          <div class="autogrid end" style="--min:380px;--gap:16px;--gap-x:64px">
            <div class="stack stack-14">
              <span class="eyebrow">Choose the problem</span>
              <h2 class="h2-sm" id="cap-h2">Start with what is in front of you.</h2>
            </div>
            <p class="body muted" style="max-width:34em">Five services that build on each other. Pick the one that matches the problem; we add the next step only if it is needed.</p>
          </div>
          <div class="svc-cards">
            ${each(PG.services, function (s) {
              var f = ov.features[s.slug] || {};
              var sit = (ov.situations || []).find(function (x) { return x.slug === s.slug; });
              return html`
                <a class="svc-card" href="/services/${s.slug}">
                  <span class="row between" style="gap:12px">
                    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="${PG.icon(s.icon)}"/></svg>
                    <span class="num-cell">${C.cells(PG.services.indexOf(s))}${s.index}</span>
                  </span>
                  <span class="stack stack-8">
                    ${when(!!sit, function () { return html`<span class="when">“${sit.situation}”</span>`; })}
                    <span class="t">${s.title}</span>
                    <span class="d">${f.text || s.short}</span>
                  </span>
                  <span class="outs tags">${each((f.outputs || []).slice(0, 3), function (o) { return html`<span class="tag">${o}</span>`; })}</span>
                  <span class="go">${s.link || 'See the service'} <span class="chev" aria-hidden="true">→</span></span>
                </a>`;
            })}
            <a class="svc-card is-aside" href="/assessment">
              <span class="stack stack-8">
                <span class="when">Not sure which problem comes first?</span>
                <span class="t">Take the readiness assessment</span>
                <span class="d">Eight questions, no email needed. You get a score, your weakest areas and up to three suggested next steps.</span>
              </span>
              <span class="go">Start the assessment <span class="chev" aria-hidden="true">→</span></span>
            </a>
          </div>
        </div>
      </section>`;
  }

  /* The signature sequence on paper: the scene full-width, the four stages
     as a rail, the narrative under the active stage. Replay is user-started
     and any selection takes over. */
  function sequenceSection() {
    return html`
      <section class="sec-sm bg-paper" aria-labelledby="seq-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(28px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="eyebrow">One question, followed through</span>
              <h2 class="h2-sm" id="seq-h2">Where is performance slipping?</h2>
            </div>
            <p class="lead">One illustrative question, followed through four stages with sample data. Connecting the data does not prove a cause; it shows where to look next.</p>
          </div>

          <div class="seq-wrap">
            <figure class="report seq-panel" role="group" aria-label="Connected view — sample report">
              <div class="rp-head">
                <div class="rp-title"><b>Connected view</b><span>Product 4471 · W36 · demo data: a Lagos FMCG distributor</span></div>
                <div class="rp-slicers"><span class="rp-slicer">Week <b>36</b><i aria-hidden="true">▾</i></span><span class="rp-slicer">Product <b>4471</b><i aria-hidden="true">▾</i></span></div>
              </div>
              <div role="tabpanel" id="seq-panel" class="seq-body rp-body" data-seq-body aria-labelledby="seq-tab-0">${stagePanel(0)}</div>
              <div role="tablist" aria-label="Stages" class="rp-tabs" data-stage-tabs>
                ${each(STAGES, function (t, i) {
                  return html`<button type="button" role="tab" class="rp-tab" data-stage="${i}" id="seq-tab-${i}" aria-controls="seq-panel" aria-selected="${i === 0 ? 'true' : 'false'}" tabindex="${i === 0 ? '0' : '-1'}">${i + 1} · ${t.name}</button>`;
                })}
                <button type="button" class="rp-tab rp-replay" data-replay>Replay</button>
              </div>
              <figcaption class="rp-caption">Sample report pages · demo data · connecting the data does not prove a cause; it shows where to look next</figcaption>
            </figure>
            <div class="seq-narrative" data-seq-narrative>
              ${each(STAGES, function (st, i) {
                return html`
                  <button type="button" class="seq-stage${i === 0 ? ' is-active' : ''}" data-seq-step="${i}">
                    <span class="num-cell">${C.cells(i)}0${i + 1}</span>
                    <span class="t">${st.name}</span>
                    <span class="c">${st.copy}</span>
                  </button>`;
              })}
            </div>
            <a class="arrow" href="/approach">How we work, in five stages <span class="chev" aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>`;
  }

  function industriesSection() {
    return html`
      <section class="sec-sm bg-paper" aria-labelledby="ind-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(32px,4vw,48px)">
          <div class="autogrid end" style="--min:380px;--gap:16px;--gap-x:64px">
            <div class="stack stack-14">
              <span class="eyebrow">Industries</span>
              <h2 class="h2-sm" id="ind-h2">Better questions begin with business context.</h2>
            </div>
            <p class="body muted" style="max-width:34em">A distributor, a bank and a software product measure success differently. Each page shows the sector's own question, measures and source systems.</p>
          </div>
          <div class="ind-cards">
            ${each(PG.industries, function (ind) {
              var img = PG.img.get(ind.photo);
              return html`
                <a class="ind-card" href="/industries/${ind.slug}">
                  ${C.frame(img, { ar: '3 / 2', sizes: '(min-width: 1100px) 25vw, (min-width: 600px) 50vw, 100vw' })}
                  <span class="stack stack-6">
                    <span class="t">${ind.title}</span>
                    <span class="q">${ind.question}</span>
                    <span class="m">${(ind.metrics || []).slice(0, 3).join(' · ')}</span>
                  </span>
                </a>`;
            })}
          </div>
        </div>
      </section>`;
  }

  var WORK_SCENES = { 'executive-performance': 'bi', 'distribution-intelligence': 'engineering', 'reporting-workflow': 'ai' };

  /* The deliverables themselves, rendered small, stand in for stock photography. */
  function workSection() {
    return html`
      <section class="sec-sm" aria-labelledby="work-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(32px,4vw,48px)">
          <div class="row between end" style="gap:16px 48px">
            <div class="stack stack-14" style="max-width:720px">
              <span class="eyebrow">Work &amp; demos</span>
              <h2 class="h2-sm" id="work-h2">Two client projects, three worked demos.</h2>
            </div>
            <a class="arrow" href="/work">All work <span class="chev" aria-hidden="true">→</span></a>
          </div>
          <div class="case-grid">${each(PG.cases || [], PG.caseCard)}</div>
          <div class="work-cards">
            ${each(PG.work, function (w) {
              var meta = WORK_META[w.slug] || ['', '', ''];
              return html`
                <a href="/work/${w.slug}" class="work-card">
                  <span class="work-preview" aria-hidden="true" inert>${PG.scene.render(WORK_SCENES[w.slug] || 'bi', { thumb: true, plainHeading: true })}</span>
                  <span class="stack stack-8" style="padding:4px 2px 0">
                    <span class="label-caps">Illustrative · ${w.sector}</span>
                    <span class="t">${w.title}</span>
                    <span class="d">${meta[0]}</span>
                    <span class="go">Open the scenario <span class="chev" aria-hidden="true">→</span></span>
                  </span>
                </a>`;
            })}
          </div>
        </div>
      </section>`;
  }

  /* Founder: real name, verified experience, no placeholder frame. A portrait
     appears here only once an approved photograph exists in PG.team. */
  function founderSection() {
    var f = (PG.team && PG.team.founder) || {};
    var hasPhoto = !!f.photo;
    return html`
      <section class="sec-sm bg-paper" aria-labelledby="founder-h2">
        <div class="wrap founder-block${hasPhoto ? ' has-photo' : ''}" data-reveal="rise">
          <div class="stack stack-20">
            <span class="eyebrow">Founder</span>
            <h2 id="founder-h2" class="h2-sm">${f.name}</h2>
            <p class="small muted">${f.role} · Known professionally as ${f.alias}</p>
            <p class="body">${f.bio}</p>
            <p class="small slate" style="max-width:36em">Her experience covers reporting systems, analytical models and data platforms for finance, commercial, investment-technology and distribution teams. Pattern Grid's client engagements, including Ledrop and Drinks.NG, are written up under Work &amp; demos.</p>
            <a class="arrow" href="/about/precious-celestine">Meet the founder <span class="chev" aria-hidden="true">→</span></a>
          </div>
          ${when(hasPhoto, function () { return html`<div class="portrait-stage">${C.cells(4)}${C.portrait(f)}</div>`; })}
        </div>
      </section>`;
  }

  function closingSection() {
    return PG.closing({ h: 'What would you like to understand?', p: 'Tell us the decision you want to improve. We reply to arrange a short conversation, then suggest a sensible next step.' });
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
        ${problemSection()}
        ${sequenceSection()}
        ${industriesSection()}
        ${workSection()}
        ${founderSection()}
        ${closingSection()}`;
    },

    mount: function (root, cleanup) {
      /* --- workspace scenes (the hero's decision workspace) ----------- */
      C.qsa('[data-scene]', root).forEach(function (host) {
        cleanup(PG.scene.mount(host, host.getAttribute('data-scene'), { plainHeading: host.classList.contains('hero-scene') }));
      });

      /* --- four-stage sequence -------------------------------------- */
      var tabs = C.qsa('[data-stage]', root);
      var seqBody = root.querySelector('[data-seq-body]');
      var stages = C.qsa('[data-seq-step]', root);
      var stage = 0;
      var fadeT = null, replayT = null;

      function paintStage(i) {
        stage = i;
        tabs.forEach(function (t, j) {
          t.setAttribute('aria-selected', j === i ? 'true' : 'false');
          t.tabIndex = j === i ? 0 : -1;
        });
        stages.forEach(function (s, j) { s.classList.toggle('is-active', j === i); });
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

      var onSeqClick = function (e) {
        var t = e.target.closest('[data-stage], [data-seq-step]');
        if (!t || !root.contains(t)) return;
        clearTimeout(replayT);
        setStage(Number(t.getAttribute('data-stage') || t.getAttribute('data-seq-step')));
      };
      root.addEventListener('click', onSeqClick);
      cleanup(function () { root.removeEventListener('click', onSeqClick); });

      var tablist = root.querySelector('[data-stage-tabs]');
      if (tablist) {
        var onKey = function (e) {
          var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 :
            e.key === 'Home' ? -99 : e.key === 'End' ? 99 : 0;
          if (!d) return;
          e.preventDefault();
          var next = d === -99 ? 0 : d === 99 ? tabs.length - 1 :
            Math.min(tabs.length - 1, Math.max(0, stage + d));
          clearTimeout(replayT);
          setStage(next);
          tabs[next].focus();
        };
        tablist.addEventListener('keydown', onKey);
        cleanup(function () { tablist.removeEventListener('keydown', onKey); });
      }

      var replayBtn = root.querySelector('[data-replay]');
      if (replayBtn) {
        var onReplay = function () {
          clearTimeout(replayT);
          setStage(0);
          var i = 0;
          var step = function () {
            i++;
            if (i > 3) return;
            setStage(i);
            replayT = setTimeout(step, 1800);
          };
          replayT = setTimeout(step, 1800);
        };
        replayBtn.addEventListener('click', onReplay);
        cleanup(function () { replayBtn.removeEventListener('click', onReplay); });
      }

      cleanup(function () { clearTimeout(fadeT); clearTimeout(replayT); });
    }
  };
})();
