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
        ${when(!!(o.nums && o.nums.length), function () { return html`<ol class="glance-nums" aria-label="Scope">
          ${each(o.nums, function (n) { return html`<li><b class="num">${n[0]}</b><span>${n[1]}</span></li>`; })}
        </ol>`; })}
      </div>`;
  }

  function closing() {
    return PG.closing({ h: 'Have a similar question in your business?' });
  }

  /* The case photograph: the local hero frame when it exists, else the CDN. */
  function casePhoto(c) {
    var h = PG.heroes['work/' + c.slug] || {};
    var key = (h.images || [])[0];
    if (!key) return '';
    var img = PG.img.get(key);
    var local = PG.local && PG.local[key];
    if (!local) return C.frame(img, { ar: '16 / 10', cls: 'case-img', sizes: '(min-width: 960px) 50vw, 100vw' });
    return html`<span class="frame case-img" style="--ar:16 / 10;--focal:${img.focal};background-image:url('${local.lqip}')"><img src="${C.href(local.d1200)}" srcset="${C.href(local.d1200)} 1200w, ${C.href(local.d)} ${local.w}w" sizes="(min-width: 960px) 50vw, 100vw" width="${local.w}" height="${local.h}" alt="${img.alt}" loading="lazy" decoding="async"></span>`;
  }

  function caseCard(c) {
    var problem = (c.challenges && c.challenges[0]) ? c.challenges[0][0] : '';
    var outcome = (c.achieved && c.achieved[0]) ? c.achieved[0][0] : '';
    return html`
      <a href="/work/${c.slug}" class="case-card">
        ${casePhoto(c)}
        <span class="case-body">
          <span class="label-caps">Pattern Grid engagement · ${c.industry}</span>
          <span class="case-client">${c.client}</span>
          <span class="t">${c.title}</span>
          <span class="case-lines">
            <span><small>Problem</small>${problem}</span>
            <span><small>Outcome</small>${outcome}</span>
          </span>
          <span class="go">Read the case study <span class="chev" aria-hidden="true">→</span></span>
        </span>
      </a>`;
  }

  /* The system as described in the records: sources, the pipeline, the
     reporting outputs. Built as HTML so the labels stay readable on phones. */
  function systemMap(c) {
    var src = function (x) { var m = /^(.*?)\s*\((.*)\)\s*$/.exec(x); return m ? [m[1], m[2]] : [x, '']; };
    return html`
      <div class="sysmap" role="img" aria-label="${c.sources.join(' and ')} feed ${c.pipeline}, which loads Power BI reporting: ${c.outputs.join(', ')}.">
        <div class="sys-col">
          <span class="label-caps">Sources</span>
          ${each(c.sources, function (x) { var p = src(x); return html`<span class="sys-node"><b>${p[0]}</b>${when(!!p[1], function () { return html`<small>${p[1]}</small>`; })}</span>`; })}
        </div>
        <i class="sys-link" aria-hidden="true"><span>standardise</span></i>
        <div class="sys-col">
          <span class="label-caps">Pipeline</span>
          <span class="sys-node is-accent"><b>${c.pipeline}</b><small>${c.focus.slice(0, 2).join(' · ')}</small></span>
        </div>
        <i class="sys-link" aria-hidden="true"><span>load</span></i>
        <div class="sys-col">
          <span class="label-caps">Reporting</span>
          <span class="sys-node is-solid"><b>Power BI</b><small>${c.outputs.length} report ${c.outputs.length === 1 ? 'area' : 'areas'}</small></span>
          <span class="sys-outs">${each(c.outputs, function (o) { return html`<span>${o}</span>`; })}</span>
        </div>
      </div>`;
  }

  PG.caseCard = caseCard;

  function overview() {
    return html`
      <section class="page-intro">
        <div class="wrap">
          <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Work</span></nav>
          <span class="eyebrow">Selected work</span>
          <h1>Client engagements, written from the records.</h1>
          <p class="lead">Each case study follows the same line: the problem as the client described it, the system Pattern Grid built, and what it made possible.</p>
        </div>
      </section>

      <section class="sec-xs" id="work-cases">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="case-grid">${each(PG.cases || [], caseCard)}</div>
          <p class="fine" style="max-width:48em">Written from the project records. Outcomes are capabilities the client gained; no performance figure is quoted unless the records support it.</p>
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
            tools: { label: 'Tools and platforms', sub: 'What the solution runs on.', items: c.tools }
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

      <section class="sec-sm bg-paper" id="case-system">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="num-cell">${C.cells(1)}02</span>
              <h2 class="h2-sm">The system</h2>
            </div>
            <p class="lead">${c.sources.length === 2 ? 'Two' : c.sources.length === 3 ? 'Three' : c.sources.length} source platforms, one pipeline, one reporting environment. Names are standardised on the way in, so every figure in Power BI traces back to the system it came from.</p>
          </div>
          ${systemMap(c)}
        </div>
      </section>

      <section class="sec-sm" id="case-solution">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="num-cell">${C.cells(2)}03</span>
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

      <section class="sec-sm bg-paper" id="case-achieved">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="num-cell">${C.cells(3)}04</span>
              <h2 class="h2-sm">What changed</h2>
            </div>
            <p class="lead">The capabilities ${c.client} gained, as recorded in the project notes.</p>
          </div>
          <div class="case-list cols stagger">
            ${each(c.achieved, function (a) { return html`<div><b>${a[0]}</b><span>${a[1]}</span></div>`; })}
          </div>
          <div class="row" style="gap:8px;border-top:1px solid var(--rule);padding-top:20px">
            <span class="label-caps" style="margin-right:8px">Relevant services</span>
            ${each(svcs, function (r) { return html`<a class="tag-link" href="/services/${r.slug}">${r.title} →</a>`; })}
          </div>
          <p class="fine">Written from the project records. No performance figure is quoted unless the records support it.</p>
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
        heroKey: 'home',
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
