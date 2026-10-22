/* Pattern Grid — Work & demos: index and scenario detail.
   Every scenario is illustrative and says so once, prominently. The
   deliverable itself (the interactive workspace) is the visual. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when;

  var SCENES = { 'executive-performance': 'bi', 'distribution-intelligence': 'engineering', 'reporting-workflow': 'ai' };
  var SCENE_NAMES = { bi: 'Commercial performance report', engineering: 'Platform monitor', ai: 'Review log' };
  var ENABLE_NOTES = {
    'executive-performance': ['Open any executive figure and follow it to the period, the source and the owner.', 'The same definitions and checks every month, so the process does not depend on one person.', 'Disagreements are listed with their cause instead of argued from memory.'],
    'distribution-intelligence': ['Outlets where demand exceeds available stock appear in the week it happens.', 'Sell-in and sell-out are compared on one agreed basis.', 'Each exception goes to a named reviewer with its evidence attached.'],
    'reporting-workflow': ['Inputs are checked and assembled by rules, not copied by hand.', 'Every check and approval is on the record of the item.', 'The reader can see which step was automated, which was drafted and which was decided.']
  };
  var INPUTS = {
    'executive-performance': ['Finance ledger (invoices, credit notes)', 'Sales system (orders by outlet)', 'Product master', 'A KPI dictionary agreed with finance, sales and operations'],
    'distribution-intelligence': ['Warehouse stock file (weekly)', 'Field sales sell-out by outlet', 'Distributor invoices (sell-in)', 'Outlet master with territories and routes'],
    'reporting-workflow': ['Approved weekly metrics from the BI model', 'Finance ledger for the reporting period', 'A reviewer list with named owners', 'Agreed checks: period match, completeness, reconciliation']
  };
  var LIMITS = {
    'executive-performance': 'Connecting the sources does not prove a cause. The view shows where to look; the decision and its follow-up stay with the named owner.',
    'distribution-intelligence': 'Availability is only as good as the last count. Outlets not visited in the week are excluded and the exclusion is shown rather than estimated.',
    'reporting-workflow': 'The AI step drafts commentary from checked figures only. A missing source stops the item at review; nothing is released without its evidence.'
  };
  var TECH = {
    'executive-performance': ['Power BI', 'SQL Server or Fabric warehouse', 'Azure Data Factory', 'Excel and CSV exports'],
    'distribution-intelligence': ['Azure Data Factory', 'Fabric Lakehouse', 'Power BI', 'Field sales app exports'],
    'reporting-workflow': ['Power Automate', 'Azure Functions', 'A labelled AI drafting step', 'Power BI']
  };

  /* The at-a-glance panel shared by case studies and demos: title and
     summary, the data flow, then Focus and Tools each with their own block,
     then scope counts. The client, industry and author are already in the
     hero, so they are not repeated here. */
  function glance(o) {
    return html`
      <div class="glance grid-field">
        <div class="glance-head">
          <span class="label-caps">${o.label}</span>
          <h2 class="h3">${o.title}</h2>
        </div>
        <div class="glance-sum">
          <p>${o.summary}</p>
          ${when(!!o.note, function () { return html`<p class="glance-note"><span class="tag is-warn">${o.note[0]}</span>${o.note[1]}</p>`; })}
        </div>
        <div class="glance-flow">
          <div class="pipe lg on-dark" aria-label="Data flow">
            <span class="pipe-group"><small>${o.rail.inLabel}</small><span class="tags">${each(o.rail.inputs, function (x) { return html`<span class="tag">${x}</span>`; })}</span></span>
            <i class="pipe-link" aria-hidden="true"></i>
            <span class="pipe-group"><small>${o.rail.midLabel}</small><span class="tags">${each(o.rail.pipeline, function (x) { return html`<span class="tag is-accent">${x}</span>`; })}</span></span>
            <i class="pipe-link" aria-hidden="true"></i>
            <span class="pipe-group"><small>${o.rail.outLabel}</small><span class="tags">${each(o.rail.outputs, function (x) { return html`<span class="tag is-solid">${x}</span>`; })}</span></span>
          </div>
        </div>
        <div class="glance-cols">
          <div class="glance-col">
            <span class="label-caps">${o.focus.label}</span>
            <p class="glance-col-sub">${o.focus.sub}</p>
            <ul class="glance-tags" aria-label="${o.focus.label}">${each(o.focus.items, function (f) { return html`<li class="tag is-accent">${f}</li>`; })}</ul>
          </div>
          <div class="glance-col">
            <span class="label-caps">${o.tools.label}</span>
            <p class="glance-col-sub">${o.tools.sub}</p>
            <ul class="glance-tags" aria-label="${o.tools.label}">${each(o.tools.items, function (t) { return html`<li class="tag is-dark">${t}</li>`; })}</ul>
          </div>
        </div>
        <ol class="glance-nums" aria-label="Scope">
          ${each(o.nums, function (n) { return html`<li><b class="num">${n[0]}</b><span>${n[1]}</span></li>`; })}
        </ol>
      </div>`;
  }

  function closing() {
    return PG.closing({ h: 'Have a similar question in your business?' });
  }

  function caseCard(c) {
    return html`
      <a href="/work/${c.slug}" class="case-card">
        <span class="label-caps">Pattern Grid engagement · ${c.industry}</span>
        <span class="case-client">${c.client}</span>
        <span class="t">${c.title}</span>
        <span class="d">${c.summary}</span>
        <span class="pipe" aria-label="Data flow">
          <span class="pipe-group"><small>Sources</small><span class="tags">${each(c.sources, function (x) { return html`<span class="tag">${x}</span>`; })}</span></span>
          <i class="pipe-link" aria-hidden="true"></i>
          <span class="pipe-group"><small>Pipeline</small><span class="tags"><span class="tag is-accent">${c.pipeline}</span></span></span>
          <i class="pipe-link" aria-hidden="true"></i>
          <span class="pipe-group"><small>Reporting</small><span class="tags"><span class="tag is-solid">Power BI</span></span></span>
        </span>
        <span class="go">Read the case study <span class="chev" aria-hidden="true">→</span></span>
      </a>`;
  }
  PG.caseCard = caseCard;

  function overview() {
    return html`
      ${PG.hero('work')}

      <section class="sec-sm" id="work-cases">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="eyebrow">Client engagements</span>
              <h2 class="h2-sm">Work delivered by Pattern Grid.</h2>
            </div>
            <p class="lead">Two engagements written up from the project records: the problem, what was built, and what it made possible. No figures are claimed that the records do not support.</p>
          </div>
          <div class="case-grid">${each(PG.cases || [], caseCard)}</div>
        </div>
      </section>

      <section class="sec-sm bg-paper" id="work-demos">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="eyebrow">Illustrative scenarios</span>
              <h2 class="h2-sm">Three worked demos, built with sample data.</h2>
            </div>
            <p class="lead">Each shows how we think: the question, the inputs, the interactive deliverable and what it is designed to make possible. None is a client project and none claims a result.</p>
          </div>
          <div class="work-cards" style="gap:32px">
            ${each(PG.work, function (w) {
              return html`
                <a href="/work/${w.slug}" class="work-card">
                  <span class="work-preview" aria-hidden="true" inert>${PG.scene.render(SCENES[w.slug] || 'bi', { thumb: true, plainHeading: true })}</span>
                  <span class="stack stack-8" style="padding:4px 2px 0">
                    <span class="label-caps">Illustrative scenario · ${w.sector}</span>
                    <span class="t" style="font-size:clamp(20px,1.8vw,26px)">${w.title}</span>
                    <span class="d">${w.summary}</span>
                    <span class="go">Open the scenario <span class="chev" aria-hidden="true">→</span></span>
                  </span>
                </a>`;
            })}
          </div>
        </div>
      </section>

      ${closing()}`;
  }

  /* A case study: the problem, what was built, what it made possible. */
  function caseDetail(c) {
    var svcs = c.services.map(function (slug) { return (PG.services || []).find(function (s) { return s.slug === slug; }); }).filter(Boolean);
    return html`
      ${PG.hero('work/' + c.slug)}

      <section class="sec-xs">
        <div class="wrap stack" data-reveal="rise" style="gap:24px">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span>
            <a href="/work">Work &amp; demos</a><span aria-hidden="true">/</span>
            <span aria-current="page">${c.client}</span>
          </nav>
          ${glance({
            label: 'At a glance', title: c.title, summary: c.summary,
            rail: { inLabel: 'Sources', inputs: c.sources, midLabel: 'Pipeline', pipeline: [c.pipeline], outLabel: 'Outputs', outputs: c.outputs },
            focus: { label: 'Focus', sub: 'What the engagement set out to fix.', items: c.focus },
            tools: { label: 'Tools and platforms', sub: 'What the solution runs on.', items: c.tools },
            nums: [[c.sources.length, 'source platforms connected'], [c.challenges.length, 'problems addressed'], [c.solution.length, 'things built'], [c.outputs.length, 'reporting outputs in Power BI']]
          })}
        </div>
      </section>

      <section class="sec-sm" id="case-problem">
        <div class="wrap case-split" data-reveal="rise">
          <div class="stack stack-16">
            <span class="num-cell">${C.cells(0)}01</span>
            <h2 class="h2-sm">The problem</h2>
            ${each(c.problem, function (t) { return html`<p class="body">${t}</p>`; })}
          </div>
          <div class="stack stack-12">
            <span class="label-caps">The main challenges</span>
            <div class="case-list stagger">
              ${each(c.challenges, function (ch) { return html`<div><b>${ch[0]}</b><span>${ch[1]}</span></div>`; })}
            </div>
          </div>
        </div>
      </section>

      <section class="sec-sm bg-paper" id="case-solution">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="num-cell">${C.cells(1)}02</span>
              <h2 class="h2-sm">What was built</h2>
            </div>
            <p class="lead">${c.solutionIntro}</p>
          </div>
          <div class="case-steps stagger">
            ${each(c.solution, function (st, i) {
              return html`<div class="doc-mini"><div class="dm-bar"><span class="scene-id">${C.cells(i + 2)}${st[0]}</span>${PG.scene.chip('ok', 'Delivered')}</div><p class="dm-body">${st[1]}</p></div>`;
            })}
          </div>
        </div>
      </section>

      <section class="sec-sm" id="case-achieved">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="num-cell">${C.cells(2)}03</span>
              <h2 class="h2-sm">What it made possible</h2>
            </div>
            <p class="lead">Outcomes as recorded in the project notes; no performance figures are claimed.</p>
          </div>
          <div class="case-list cols stagger">
            ${each(c.achieved, function (a) { return html`<div><b>${a[0]}</b><span>${a[1]}</span></div>`; })}
          </div>
          <div class="row" style="gap:8px;border-top:1px solid var(--rule);padding-top:20px">
            <span class="label-caps" style="margin-right:8px">Relevant services</span>
            ${each(svcs, function (r) { return html`<a class="tag-link" href="/services/${r.slug}">${r.title} →</a>`; })}
          </div>
        </div>
      </section>

      ${PG.closing({ h: 'Have a similar question in your business?', p: 'Tell us how your sales, stock or field data is held today. We reply to arrange a short conversation.' })}`;
  }

  function detail(item) {
    var relServices = (PG.services || []).filter(function (s) { return s.related === item.slug; });
    var question = item.sections[0];
    var steps = item.sections.slice(1);
    var inputs = INPUTS[item.slug] || [];
    var tech = TECH[item.slug] || [];
    return html`
      ${PG.hero('work/' + item.slug)}

      <section class="sec-xs">
        <div class="wrap stack" data-reveal="rise" style="gap:24px">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span>
            <a href="/work">Work &amp; demos</a><span aria-hidden="true">/</span>
            <span aria-current="page">${item.title}</span>
          </nav>
          ${glance({
            label: 'At a glance', title: item.title, summary: item.summary,
            note: ['Sample data', 'Built to show how we think. Not a client engagement; no business result is claimed.'],
            rail: { inLabel: 'Sample inputs', inputs: inputs, midLabel: 'Approach', pipeline: steps.map(function (st) { return st.h; }), outLabel: 'Deliverable', outputs: [SCENE_NAMES[SCENES[item.slug] || 'bi']] },
            focus: { label: 'Designed to enable', sub: 'What the system is built to make possible, not a measured result.', items: item.enable },
            tools: { label: 'Technology', sub: 'Illustrative options; the choice follows the environment.', items: tech },
            nums: [[inputs.length, 'sample inputs'], [steps.length, 'stages in the approach'], [item.enable.length, 'outcomes designed for'], [1, 'sample report page to explore']]
          })}
        </div>
      </section>

      <section class="sec-sm" id="work-artifact">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="num-cell">${C.cells(0)}01</span>
              <h2 class="h2-sm" style="max-width:26ch;text-wrap:balance">${question.p}</h2>
            </div>
            <p class="lead">The deliverable as a sample report page on demo data. Use the pages and figures; nothing is sent or saved.</p>
          </div>
          <div data-scene="${SCENES[item.slug] || 'bi'}"></div>
        </div>
      </section>

      <section class="sec-sm bg-paper" id="work-approach">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="num-cell">${C.cells(1)}02</span>
              <h2 class="h2-sm">How it is built</h2>
            </div>
            <p class="lead">Three stages, each leaving something a reader can check: the reconciliation, the definition, the evidence behind the figure.</p>
          </div>
          <div class="case-steps stagger">
            ${each(steps, function (st, i) {
              return html`<div class="doc-mini"><div class="dm-bar"><span class="scene-id">${C.cells(i + 2)}${st.h}</span>${PG.scene.chip('ok', 'Stage ' + (i + 1))}</div><p class="dm-body">${st.p}</p></div>`;
            })}
          </div>
        </div>
      </section>

      <section class="sec-sm" id="work-enable">
        <div class="wrap case-split" data-reveal="rise">
          <div class="stack stack-16">
            <span class="num-cell">${C.cells(2)}03</span>
            <h2 class="h2-sm">What it is designed to enable</h2>
            <p class="body">Outcomes the system is built to make possible. Because this scenario runs on sample data, none is a measured result.</p>
            <div class="stack stack-12" style="padding-top:8px">
              ${PG.scene.drawer({ chip: 'Limitation', chipTone: 'warn', title: 'What this does not prove', text: LIMITS[item.slug] || '' })}
            </div>
          </div>
          <div class="stack stack-12">
            <span class="label-caps">Designed to enable</span>
            <div class="case-list stagger">
              ${each(item.enable, function (e, i) { return html`<div><b>${e}</b><span>${ENABLE_NOTES[item.slug] && ENABLE_NOTES[item.slug][i] || ''}</span></div>`; })}
            </div>
            <div class="row" style="gap:8px;border-top:1px solid var(--rule);padding-top:20px;margin-top:8px">
              <span class="label-caps" style="margin-right:8px">Relevant services</span>
              ${each(relServices, function (r) { return html`<a class="tag-link" href="/services/${r.slug}">${r.title} →</a>`; })}
            </div>
          </div>
        </div>
      </section>

      ${closing()}`;
  }

  function find(slug) {
    return (PG.work || []).find(function (w) { return w.slug === slug; });
  }
  function findCase(slug) {
    return (PG.cases || []).find(function (c) { return c.slug === slug; });
  }

  PG.pages = PG.pages || {};

  PG.pages.work = {
    meta: function (p) {
      var c = p.slug && findCase(p.slug);
      if (c) {
        return {
          title: c.client + ' — ' + c.title,
          desc: c.summary,
          heroKey: 'work/' + c.slug,
          crumbs: [{ name: 'Work & demos', path: '/work' }, { name: c.client, path: '/work/' + c.slug }],
          schema: { '@context': 'https://schema.org', '@type': 'CreativeWork', name: c.client + ': ' + c.title, abstract: c.summary, about: c.industry, creator: { '@type': 'Organization', name: 'Pattern Grid' } }
        };
      }
      var item = p.slug && find(p.slug);
      if (!item) {
        return {
          title: 'Work & demos',
          desc: 'Three illustrative scenarios built with sample data: the question, the inputs, the interactive deliverable and what it is designed to make possible.',
          heroKey: 'work',
          crumbs: [{ name: 'Work & demos', path: '/work' }]
        };
      }
      return {
        title: item.title,
        desc: item.summary,
        heroKey: 'work/' + item.slug,
        crumbs: [{ name: 'Work & demos', path: '/work' }, { name: item.title, path: '/work/' + item.slug }],
        schema: {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: item.title,
          abstract: item.summary,
          about: item.sector,
          creator: { '@type': 'Organization', name: 'Pattern Grid' },
          disambiguatingDescription: 'Illustrative scenario using sample data, not a client engagement.'
        }
      };
    },

    render: function (p) {
      var c = p.slug && findCase(p.slug);
      if (c) return caseDetail(c);
      var item = p.slug && find(p.slug);
      return item ? detail(item) : overview();
    },

    mount: function (root, cleanup) {
      C.qsa('[data-scene]', root).forEach(function (host) {
        cleanup(PG.scene.mount(host, host.getAttribute('data-scene'), {}));
      });
    }
  };
})();
