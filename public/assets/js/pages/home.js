/* Pattern Grid — Home (v2). Eleven sections, one argument: fragmented data,
   connected and structured, becomes a decision someone owns. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when;

  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }

  /* 1. Hero: the offer in one line, the system beneath it. */
  function hero() {
    return html`
      <section class="home-hero" aria-labelledby="home-h1">
        <div class="wrap">
          <div class="home-hero-top">
            <div class="stack stack-20">
              <span class="eyebrow">Data · intelligence · applied AI</span>
              <h1 id="home-h1">Turn fragmented data into decisive intelligence.</h1>
            </div>
            <div class="stack stack-24 home-hero-side">
              <p class="lead">We engineer connected data platforms, trusted reporting and practical AI, so your organisation can see what matters and act on it.</p>
              <div class="row" style="gap:14px 26px">
                <a class="btn btn-accent" href="/contact" data-track="cta:hero-primary">Discuss your project</a>
                <a class="arrow" href="/work" data-track="cta:hero-work">Explore our work <span class="chev" aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
          ${PG.viz.system()}
        </div>
      </section>`;
  }

  /* 2. Credibility: only what the records support. No logos without permission. */
  function proof() {
    var cases = PG.cases || [];
    var platforms = uniq([].concat.apply([], cases.map(function (c) { return c.tools || []; })));
    return html`
      <section class="proof" aria-label="Delivery experience">
        <div class="wrap proof-inner">
          <div><span class="label-caps">Client engagements</span>
            <p class="proof-names">${each(cases, function (c) { return html`<a href="/work/${c.slug}">${c.client}</a>`; })}</p></div>
          <div><span class="label-caps">Platforms used in that work</span>
            <p class="proof-list">${platforms.join(' · ')}</p></div>
          <div><span class="label-caps">What was delivered</span>
            <p class="proof-list">Data integration · standardised records · automated preparation · Power BI reporting</p></div>
        </div>
      </section>`;
  }

  /* 3. The business problem. */
  function problem() {
    return html`
      <section class="sec-sm" aria-labelledby="prob-h2">
        <div class="wrap problem" data-reveal="rise">
          <div class="stack stack-20">
            <span class="eyebrow">The problem</span>
            <h2 class="h2" id="prob-h2">The numbers disagree before the meeting starts.</h2>
            <p class="lead muted">Sales, stock and finance each keep their own record of the same business. When the systems use different names and different periods, every report begins with an argument about which figure is right, and the decision waits.</p>
          </div>
          ${PG.viz.fragment()}
        </div>
      </section>`;
  }

  /* 4. The Intelligence Canvas. */
  function canvas() {
    return html`
      <section class="sec-sm bg-ink canvas-sec" aria-labelledby="cv-h2">
        <div class="wrap stack" style="gap:clamp(28px,3vw,44px)">
          <div class="section-head" data-reveal="rise">
            <div class="stack stack-14">
              <span class="eyebrow eyebrow-dark">The Intelligence Canvas</span>
              <h2 class="h2" id="cv-h2" style="max-width:17ch">From source systems to a decision, one stage at a time.</h2>
            </div>
            <p class="lead">This is how we work on every engagement. Follow one question through five stages and see what each stage produces and who owns it.</p>
          </div>
          ${PG.viz.canvas()}
        </div>
      </section>`;
  }

  /* 5. Capabilities: challenge, capability, deliverable, usefulness, next action. */
  function capabilities() {
    var ov = PG.servicesOverview || { features: {}, situations: [] };
    return html`
      <section class="sec-sm" aria-labelledby="cap-h2">
        <div class="wrap stack" style="gap:clamp(28px,3vw,44px)">
          <div class="section-head" data-reveal="rise">
            <div class="stack stack-14">
              <span class="eyebrow">Capabilities</span>
              <h2 class="h2" id="cap-h2">Five services. Start with the one you need.</h2>
            </div>
            <p class="lead muted">Each is a complete piece of work on its own. Together they run in the order shown; we add the next only when it is needed.</p>
          </div>
          <ol class="caps">
            ${each(PG.services, function (s, i) {
              var f = ov.features[s.slug] || {};
              var sit = (ov.situations || []).find(function (x) { return x.slug === s.slug; }) || {};
              return html`
                <li class="cap" data-reveal="rise">
                  <a class="cap-fig" href="/services/${s.slug}" tabindex="-1" aria-hidden="true">${PG.viz.mini(s.slug)}</a>
                  <div class="cap-main">
                    <span class="num-cell">${C.cells(i)}${s.index}</span>
                    <h3><a href="/services/${s.slug}">${s.title}</a></h3>
                    ${when(!!sit.situation, function () { return html`<p class="cap-when">“${sit.situation}”</p>`; })}
                    <p class="cap-what">${f.text || s.short}</p>
                  </div>
                  <div class="cap-side">
                    <span class="label-caps">You receive</span>
                    <ul>${each(f.outputs || [], function (o) { return html`<li>${o}</li>`; })}</ul>
                    <span class="label-caps">Which gives you</span>
                    <p>${sit.expect || s.outcome}</p>
                    <a class="arrow" href="/services/${s.slug}" data-track="cta:service-${s.slug}">${s.link || 'See the service'} <span class="chev" aria-hidden="true">→</span></a>
                  </div>
                </li>`;
            })}
          </ol>
        </div>
      </section>`;
  }

  /* 6. Selected work. */
  function work() {
    return html`
      <section class="sec-sm bg-paper" aria-labelledby="work-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(28px,3vw,44px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="eyebrow">Selected work</span>
              <h2 class="h2" id="work-h2">Two engagements, written from the records.</h2>
            </div>
            <div class="stack stack-14">
              <p class="lead muted">The problem as the client described it, the system we built and the capability they gained. No figure appears that the records do not support.</p>
              <a class="arrow" href="/work">All work <span class="chev" aria-hidden="true">→</span></a>
            </div>
          </div>
          <div class="case-grid">${each(PG.cases || [], PG.caseCard)}</div>
        </div>
      </section>`;
  }

  /* 7. Industries. */
  function industries() {
    return html`
      <section class="sec-sm" aria-labelledby="ind-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(28px,3vw,44px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="eyebrow">Where the work applies</span>
              <h2 class="h2" id="ind-h2">Every sector asks a different question.</h2>
            </div>
            <p class="lead muted">A distributor, a bank and a software product measure success differently. Each page starts from the sector's own decisions, sources and measures.</p>
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

  /* 8. Method. */
  function method() {
    return html`
      <section class="sec-sm bg-paper" aria-labelledby="meth-h2">
        <div class="wrap stack" style="gap:clamp(28px,3vw,44px)">
          <div class="section-head" data-reveal="rise">
            <div class="stack stack-14">
              <span class="eyebrow">How an engagement runs</span>
              <h2 class="h2" id="meth-h2">Connect. Structure. Understand. Automate. Decide.</h2>
            </div>
            <div class="stack stack-14">
              <p class="lead muted">Five stages. Each ends with something you can check, and each has an owner on your side.</p>
              <a class="arrow" href="/approach">Our approach in full <span class="chev" aria-hidden="true">→</span></a>
            </div>
          </div>
          ${PG.viz.method()}
        </div>
      </section>`;
  }

  /* 9. Readiness assessment. */
  function assessment() {
    var dims = (PG.assessment || []).map(function (q) { return q.name; });
    var sample = [1, 2, 3, 1, 1, 2, 2, 3];
    return html`
      <section class="sec-sm" aria-labelledby="as-h2">
        <div class="wrap assess-band" data-reveal="rise">
          <div class="stack stack-20">
            <span class="eyebrow">Readiness assessment</span>
            <h2 class="h2" id="as-h2">Not sure where to start? Answer eight questions.</h2>
            <p class="lead muted">About five minutes, no email address. You get a score across eight dimensions, your weakest areas and up to three suggested next steps. The result stays in your browser.</p>
            <div class="row" style="gap:14px 26px">
              <a class="btn" href="/assessment" data-track="cta:assessment">Start the assessment</a>
            </div>
            <p class="fine" style="max-width:38em">A self-assessment from your own answers. It is not a certification or an industry benchmark.</p>
          </div>
          <figure class="assess-fig" aria-label="Example result layout: eight dimensions scored from zero to four">
            <div class="assess-fig-head"><span class="label-caps">Your eight dimensions</span><span class="fig-note">Example layout</span></div>
            <ul>${each(dims, function (d, i) { return html`<li><span>${d}</span><i style="--w:${sample[i % sample.length] * 25}%"></i></li>`; })}</ul>
          </figure>
        </div>
      </section>`;
  }

  function founder() { return PG.founderBanner(false, { eyebrow: 'Founder' }); }

  function closing() {
    return PG.closing({ tone: 'dark', h: 'Bring the decision you want to improve.', p: 'Tell us how the information is held today and what you need to decide. We reply to arrange a short conversation, then suggest a sensible next step.', cta: 'Discuss your project' });
  }

  PG.pages = PG.pages || {};
  PG.pages.home = {
    meta: function () { return { title: null, desc: PG.site.description, heroKey: 'home' }; },
    render: function () {
      return html`
        ${hero()}
        ${proof()}
        ${problem()}
        ${canvas()}
        ${capabilities()}
        ${work()}
        ${industries()}
        ${method()}
        ${assessment()}
        ${founder()}
        ${closing()}`;
    },
    mount: function (root, cleanup) { PG.viz.mount(root, cleanup); }
  };
})();
