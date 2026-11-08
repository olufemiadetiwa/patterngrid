/* Pattern Grid — Work: the client engagements and their case-study pages. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when;

  /* The at-a-glance panel of a case study: title and
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
            <a href="/work">Work</a><span aria-hidden="true">/</span>
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
          crumbs: [{ name: 'Work', path: '/work' }, { name: c.client, path: '/work/' + c.slug }],
          schema: { '@context': 'https://schema.org', '@type': 'CreativeWork', name: c.client + ': ' + c.title, abstract: c.summary, about: c.industry, creator: { '@type': 'Organization', name: 'Pattern Grid' } }
        };
      }
      return {
        title: 'Work',
        desc: 'Client engagements delivered by Pattern Grid, written up from the project records: the problem, what was built and what it made possible.',
        heroKey: 'work',
        crumbs: [{ name: 'Work', path: '/work' }]
      };
    },

    render: function (p) {
      var c = p.slug && findCase(p.slug);
      return c ? caseDetail(c) : overview();
    },

    mount: function () {}
  };
})();
