/* Pattern Grid — Work & demos: index and scenario detail.
   Every scenario is illustrative and says so once, prominently. The
   deliverable itself (the interactive workspace) is the visual. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when;

  var SCENES = { 'executive-performance': 'bi', 'distribution-intelligence': 'engineering', 'reporting-workflow': 'ai' };
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
        <span class="case-flow" aria-label="Data flow">
          ${each(c.sources, function (x) { return html`<span class="node">${x}</span>`; })}
          <span class="arr" aria-hidden="true">→</span><span class="node etl">${c.pipeline}</span>
          <span class="arr" aria-hidden="true">→</span><span class="node out">Power BI</span>
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
      <section class="page-intro">
        <div class="wrap">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span>
            <a href="/work">Work &amp; demos</a><span aria-hidden="true">/</span>
            <span aria-current="page">${c.client}</span>
          </nav>
          <span class="eyebrow">Pattern Grid engagement · ${c.industry}</span>
          <h1 class="case-h1"><span class="client">${c.client}</span><span class="sub">${c.title}</span></h1>
          <p class="lead">${c.summary}</p>
          <dl class="case-facts">
            <div><dt>Client</dt><dd>${c.client}</dd></div>
            <div><dt>Delivered by</dt><dd>${c.role}</dd></div>
            <div><dt>Focus</dt><dd>${c.focus.join(' · ')}</dd></div>
            <div><dt>Tools and platforms</dt><dd>${c.tools.join(' · ')}</dd></div>
          </dl>
        </div>
      </section>

      <section class="sec-xs">
        <div class="wrap stack" data-reveal="rise" style="gap:16px">
          <span class="label-caps">How the data moved</span>
          <div class="case-flow lg" aria-label="Data flow">
            ${each(c.sources, function (x) { return html`<span class="node">${x}</span>`; })}
            <span class="arr" aria-hidden="true">→</span><span class="node etl">${c.pipeline}</span>
            <span class="arr" aria-hidden="true">→</span>
            ${each(c.outputs, function (x) { return html`<span class="node out">${x}</span>`; })}
          </div>
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
            <div class="case-list">
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
          <div class="case-steps">
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
          <div class="case-list cols">
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
    return html`
      <section class="page-intro">
        <div class="wrap">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span>
            <a href="/work">Work &amp; demos</a><span aria-hidden="true">/</span>
            <span aria-current="page">${item.title}</span>
          </nav>
          <span class="eyebrow">Illustrative scenario · ${item.sector}</span>
          <h1>${item.title}</h1>
          <p class="lead">${item.summary}</p>
          <p class="notice" style="align-self:flex-start;max-width:44em">Built with sample data to show how we think. It is not a client engagement and does not claim a business result.</p>
        </div>
      </section>

      <section class="sec-xs" id="work-artifact">
        <div class="wrap stack" data-reveal="rise" style="gap:24px">
          <div class="autogrid end" style="--min:360px;--gap:12px;--gap-x:48px">
            <div class="stack stack-10">
              <span class="label-caps">The question</span>
              <h2 class="h3" style="max-width:26ch;text-wrap:balance">${question.p}</h2>
            </div>
            <p class="small slate" style="max-width:40em">The deliverable, working. Use the controls; nothing is sent or saved.</p>
          </div>
          <div data-scene="${SCENES[item.slug] || 'bi'}"></div>
        </div>
      </section>

      <section class="sec-sm">
        <div class="wrap work-detail" data-reveal="rise">
          <div class="stack stack-32">
            <div class="stack stack-12">
              <span class="label-caps">Sample inputs</span>
              <ul class="ticks">${each(INPUTS[item.slug] || [], function (i) { return html`<li>${i}</li>`; })}</ul>
            </div>
            <div class="stack stack-12">
              <span class="label-caps">Approach</span>
              <ol class="steps-list">${each(steps, function (s) { return html`<li><strong>${s.h}.</strong> ${s.p}</li>`; })}</ol>
              <p class="small muted">${(item.approach || []).join(' → ')} — the Business Intelligence approach.</p>
            </div>
            <div class="stack stack-12">
              <span class="label-caps">How the data moves</span>
              <p class="small slate" style="max-width:44em">${item.flow}</p>
            </div>
          </div>
          <aside class="stack stack-24 work-aside">
            <div class="stack stack-12">
              <span class="label-caps">Designed to enable</span>
              <div class="stack stack-8">${each(item.enable, function (e) { return html`<div>${PG.scene.chip('ok', e)}</div>`; })}</div>
              <p class="fine">What the system is built to make possible, not a measured result.</p>
            </div>
            ${PG.scene.drawer({ chip: 'Limitation', chipTone: 'warn', title: 'What this does not prove', text: LIMITS[item.slug] || '' })}
            <div class="stack stack-10" style="border-top:1px solid var(--rule);padding-top:16px">
              <span class="label-caps">Technology (illustrative options)</span>
              <p class="small slate">${(item.tech || []).join(' · ')}</p>
            </div>
            <div class="stack stack-10" style="border-top:1px solid var(--rule);padding-top:16px">
              <span class="label-caps">Relevant services</span>
              <div class="row" style="gap:8px">
                ${each(relServices, function (r) { return html`<a class="tag-link" href="/services/${r.slug}">${r.title} →</a>`; })}
              </div>
            </div>
          </aside>
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
          heroKey: 'work',
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
        heroKey: 'work',
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
