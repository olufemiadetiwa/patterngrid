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

  /* Each service is explained by one workspace scene from scenes.js; the
     overview mounts the compact form, the detail page the full one. */
  var SCENE_OF = {
    'data-ai-strategy': 'strategy',
    'data-engineering': 'engineering',
    'business-intelligence': 'bi',
    'ai-automation': 'ai',
    'capability-building': 'capability'
  };

  function overview() {
    var ov = PG.servicesOverview || { situations: [], features: {}, closing: {} };

    return html`
      ${PG.hero('services')}

      <section style="padding:clamp(40px,5vw,72px) 0 clamp(72px,9vw,144px)">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:380px">
          <p class="lede">${ov.intro}</p>
          <div class="stack stack-16">
            <h2 class="h2-sm">${ov.situationsHeading}</h2>
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

      <section class="sec-sm bg-paper" id="svc-compare">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(32px,4vw,48px)">
          <div class="autogrid end" style="--min:380px;--gap:16px;--gap-x:64px">
            <div class="stack stack-14">
              <span class="eyebrow">Compare the five</span>
              <h2 class="h2-sm">What each service is for, and what you receive.</h2>
            </div>
            <p class="body muted" style="max-width:34em">Each one is a complete piece of work on its own. Together they run in the order shown on the map below.</p>
          </div>
          <div class="compare">
            ${each(PG.services, function (s) {
              var f = (ov.features[s.slug]) || {};
              return html`
                <article class="compare-card">
                  <div class="row between" style="gap:12px">
                    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="color:var(--navy)"><path d="${PG.icon(s.icon)}"/></svg>
                    <span class="num-cell">${C.cells(PG.services.indexOf(s))}${s.index}</span>
                  </div>
                  <h3>${s.title}</h3>
                  <p class="outcome">${s.outcomeText || f.text}</p>
                  <dl class="compare-rows">
                    <div><dt>Ideal when</dt><dd>${(s.situations || []).slice(0, 2).join(' · ')}</dd></div>
                    <div><dt>You receive</dt><dd>${(s.deliverables || []).slice(0, 3).map(function (d) { return d.title; }).join(' · ')}</dd></div>
                    <div><dt>Output preview</dt><dd>${SCENE_TITLES[s.slug]}</dd></div>
                  </dl>
                  <a class="arrow" href="/services/${s.slug}">${s.link} <span class="chev" aria-hidden="true">→</span></a>
                </article>`;
            })}
          </div>
        </div>
      </section>

      <section class="sec-sm" id="svc-featured">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="autogrid end" style="--min:380px;--gap:12px;--gap-x:64px">
            <div class="stack stack-14">
              <span class="eyebrow">One worked example</span>
              <h2 class="h2-sm">From a trusted measure to an accountable action.</h2>
            </div>
            <div class="stack stack-12">
              <p class="body muted" style="max-width:34em">A sample report page on demo data. Open the variance page, read the agreed definition behind the figure, then assign a follow-up with an owner. Every service page has its own example.</p>
              <button type="button" class="walk-btn on-light" data-walkthrough data-walk-label="Watch how it works · 20 s" aria-pressed="false"><span class="play" aria-hidden="true">▶</span>Watch how it works · 20 s</button>
              <div class="walk-progress on-light" data-walk-progress hidden aria-hidden="true"><i></i></div>
            </div>
          </div>
          <div data-scene="bi" data-walk-host></div>
        </div>
      </section>

      <section class="bg-paper" style="padding:clamp(72px,9vw,144px) 0">
        <div class="wrap autogrid" data-reveal="rise" style="--min:380px;align-items:center">
          <div class="stack stack-18">
            <h2 class="h2-sm" style="text-wrap:balance">${ov.mapHeading}</h2>
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

  var SCENE_TITLES = {
    'data-ai-strategy': 'delivery roadmap',
    'data-engineering': 'platform monitor',
    'business-intelligence': 'commercial performance report',
    'ai-automation': 'review log',
    'capability-building': 'capability baseline'
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
          <span class="label-caps" style="color:var(--muted)">What you get at the end of this stage</span>
          <p style="font-size:17px;font-weight:500;line-height:1.45">${stage.output}</p>
        </div>
        ${when(hasFeedback, function () { return html`<p class="feedback-note">${svc.feedback.label}</p>`; })}
      </div>
      <div aria-label="Stage output preview" class="doc-mini">
        <div class="dm-bar"><span class="scene-id">${C.cells(index)}${stage.output.replace(/\.$/, '')}</span><span class="scene-tag">Sample</span></div>
        <div class="dm-rows">
          ${each(stage.preview, function (p, i) {
            return html`<div><span>${p}</span>${PG.scene.chip(i === 0 ? 'ok' : 'neutral', i === 0 ? 'Agreed' : 'Drafted')}</div>`;
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
    var jumps = [['Overview', 'svc-overview'], ['Example', 'svc-artifact'], ['Deliverables', 'svc-deliverables'], ['Approach', 'svc-approach'], ['Technology', 'svc-technology'], ['Questions', 'svc-questions']];
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
            <h2 class="h2" style="text-wrap:balance">${svc.heading}</h2>
            ${each(svc.intro, function (p) { return html`<p class="body">${p}</p>`; })}
          </div>
          <div class="stack stack-28" style="border-top:1px solid var(--rule);padding-top:24px">
            <div class="stack stack-12">
              <span class="label-caps" style="color:var(--muted)">This is useful when</span>
              <ul class="ticks">${each(svc.situations, function (x) { return html`<li>${x}</li>`; })}</ul>
            </div>
            <div class="stack stack-8" style="background:var(--paper);border-radius:var(--radius);padding:20px 22px">
              <span class="label-caps" style="color:var(--muted)">What you are working towards</span>
              <p style="font-size:18px;line-height:1.45;font-weight:500">${svc.outcomeText}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="svc-artifact" class="sec-sm" style="padding-top:0">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(24px,3vw,40px)">
          <div class="autogrid start" style="--min:380px;--gap:24px;--gap-x:clamp(40px,6vw,96px)">
            <div class="stack stack-16">
              <span class="eyebrow">Worked example</span>
              <h2 class="h2-sm" style="text-wrap:balance">${svc.example.question}</h2>
            </div>
            <div class="stack stack-14">
              <ol class="stack stack-12" style="list-style:none;border-top:1px solid var(--rule);padding-top:18px">
                ${each(svc.example.steps, function (t, i) {
                  return html`
                    <li style="display:grid;grid-template-columns:28px minmax(0,1fr);gap:12px;font-size:15px;line-height:1.55">
                      <span class="label-caps" style="color:var(--muted);padding-top:3px">0${i + 1}</span><span>${t}</span>
                    </li>`;
                })}
              </ol>
              <p class="fine">Below: a sample ${SCENE_TITLES[svc.slug]} on demo data, rendered the way we build them. Not a client result; the pages and figures respond, nothing is sent anywhere.</p>
            </div>
          </div>
          <div data-scene="${SCENE_OF[svc.slug]}"></div>
        </div>
      </section>

      <section id="svc-deliverables" class="bg-paper sec-sm">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(40px,5vw,64px)">
          <div class="autogrid end" style="--min:380px;--gap:16px;--gap-x:64px">
            <div class="stack stack-14">
              <h2 class="h2">What you receive</h2>
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
        </div>
      </section>

      <section id="svc-approach" class="sec-sm">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(36px,4vw,56px)">
          <div class="stack stack-14" style="max-width:720px">
            <span class="eyebrow">How we work</span>
            <h2 class="h2">How the work runs: five stages, each ending in something you can see.</h2>
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
              <h2 class="h2" style="text-wrap:balance">${svc.flow.title}</h2>
            </div>
            <button type="button" class="toggle toggle-dark" data-replay-flow style="height:40px">Replay</button>
          </div>

          <div class="row" style="gap:12px 24px;border-top:1px solid rgba(255,255,255,.15);padding-top:20px">
            <span class="label-caps" style="color:rgba(255,255,255,.6)">${svc.flow.bandTitle}</span>
            ${each(svc.flow.band, function (b) {
              return html`<span class="tag is-dark">${b}</span>`;
            })}
          </div>

          <div class="pipe on-dark" aria-label="Flow summary">
            ${each(['input', 'process', 'gate', 'output', 'exception', 'use'].map(function (k) { return nodes.filter(function (n) { return n.kind === k; }); }).filter(function (g) { return g.length; }), function (g, i, arr) {
              return html`<span class="pipe-group"><small>${KIND_LABEL[g[0].kind] || ''}</small><span class="tags">${each(g, function (n) { return html`<span class="tag${n.kind === 'gate' ? ' is-accent' : n.kind === 'exception' ? ' is-warn' : n.kind === 'output' ? ' is-solid' : ''}">${n.label}</span>`; })}</span></span>${when(i < arr.length - 1, function () { return html`<i class="pipe-link" aria-hidden="true"></i>`; })}`;
            })}
          </div>

          <details class="flow-details" data-flow-details>
          <summary><span class="summary-btn">Open the full diagram <span class="chev down" aria-hidden="true">↓</span></span></summary>
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

          <div class="row" style="gap:12px 24px;padding-top:20px">
            <span class="flow-legend"><span>— forward</span><span style="color:var(--amber)">— exception</span><span style="color:var(--accent)">- - feedback</span></span>
          </div>

          <ol class="flow-steps">
            ${each(svc.flow.edges, function (e) {
              var a = nodes.find(function (n) { return n.id === e.from; });
              var b = nodes.find(function (n) { return n.id === e.to; });
              return html`<li>${a.label} → ${b.label}${e.label ? ' (' + e.label + ')' : ''}${e.type === 'exception' ? ' — exception route' : (e.type === 'feedback' ? ' — feedback' : '')}.</li>`;
            })}
          </ol>
          </details>
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
                    <span class="label-caps" style="color:var(--muted)">Illustrative scenario</span>
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
    return svc ? PG.closing({ h: svc.closing, cta: svc.cta, service: svc.slug }) : PG.closing({ h: ov.closing.h, p: ov.closing.p, cta: 'Send us your question' });
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
      var s = { stage: 0, node: null };
      this._state = s;
      this._svc = svc;
      return svc
        ? html`${detail(svc, s)}${closing(svc)}`
        : html`${overview()}${closing(null)}`;
    },

    mount: function (root, cleanup) {
      var svc = this._svc;
      var s = this._state;

      /* --- workspace scenes ------------------------------------------ */
      var walkBtn = root.querySelector('[data-walkthrough]');
      if (walkBtn) cleanup(PG.scene.walk(root.querySelector('[data-walk-host]'), walkBtn, root.querySelector('[data-walk-progress]'), PG.scene.BI_WALK.script, PG.scene.BI_WALK.total));
      C.qsa('[data-scene]', root).forEach(function (host) {
        cleanup(PG.scene.mount(host, host.getAttribute('data-scene'), { compact: host.hasAttribute('data-scene-compact'), preview: host.hasAttribute('data-scene-preview'), plainHeading: host.classList.contains('hero-scene') }));
      });

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
          var det = root.querySelector('[data-flow-details]');
          if (det && !det.open) { det.open = true; return; } // the toggle handler draws and plays
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

      /* The diagram lives inside a <details>; nothing can be measured while
         it is closed, so draw and play again whenever it opens. */
      var details = root.querySelector('[data-flow-details]');
      var onToggle = function () {
        if (!details.open) return;
        played = false; animate = false;
        drawEdges();
        requestAnimationFrame(function () { drawEdges(); play(); });
      };
      if (details) details.addEventListener('toggle', onToggle);

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
        if (details) details.removeEventListener('toggle', onToggle);
        if (flowIO) flowIO.disconnect();
        if (ro) ro.disconnect();
      });
    }
  };
})();
