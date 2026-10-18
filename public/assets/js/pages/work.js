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
    return html`
      <section class="sec-sm">
        <div class="wrap closing" data-reveal="rise">
          <h2 class="h2-sm" style="max-width:18ch;text-wrap:balance">Have a similar question in your business?</h2>
          <div class="row" style="gap:16px 28px">
            <a class="btn" href="/contact">Request a consultation</a>
            <a class="arrow" href="/assessment">Take the readiness assessment <span class="chev" aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>`;
  }

  function overview() {
    return html`
      ${PG.hero('work')}

      <section class="sec-sm">
        <div class="wrap work-cards" data-reveal="rise" style="gap:32px">
          ${each(PG.work, function (w) {
            return html`
              <a href="/work/${w.slug}" class="work-card">
                <span class="work-preview" aria-hidden="true" inert>${PG.scene.render(SCENES[w.slug] || 'bi', { compact: true, preview: true })}</span>
                <span class="stack stack-8" style="padding:4px 2px 0">
                  <span class="label-caps">Illustrative scenario · ${w.sector}</span>
                  <span class="t" style="font-size:clamp(20px,1.8vw,26px)">${w.title}</span>
                  <span class="d">${w.summary}</span>
                  <span class="go">Open the scenario <span class="chev" aria-hidden="true">→</span></span>
                </span>
              </a>`;
          })}
        </div>
      </section>

      ${closing()}`;
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
              <ul class="ticks">${each(item.enable, function (e) { return html`<li>${e}</li>`; })}</ul>
              <p class="fine">What the system is built to make possible, not a measured result.</p>
            </div>
            <div class="stack stack-10" style="border-top:1px solid var(--rule);padding-top:16px">
              <span class="label-caps">Limitation</span>
              <p class="small slate">${LIMITS[item.slug] || ''}</p>
            </div>
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

  PG.pages = PG.pages || {};

  PG.pages.work = {
    meta: function (p) {
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
