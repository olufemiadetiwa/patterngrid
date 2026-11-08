/* Pattern Grid — Home. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when, raw = C.raw;

  /* The signature four-stage sequence: one question followed through. */
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

  /* Five services as numbered rows: the problem in the client's words, what
     they receive, and the link. The nine-cell device is the only ornament. */
  function serviceRows() {
    var ov = PG.servicesOverview || { features: {}, situations: [] };
    return html`
      <section class="sec-sm" aria-labelledby="cap-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(28px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="eyebrow">Five services</span>
              <h2 class="h2-sm" id="cap-h2">Start with what is in front of you.</h2>
            </div>
            <p class="lead">Each service is a complete piece of work on its own. Pick the one that matches the problem; we add the next step only if it is needed.</p>
          </div>
          <ol class="svc-rows stagger">
            ${each(PG.services, function (s, i) {
              var f = ov.features[s.slug] || {};
              var sit = (ov.situations || []).find(function (x) { return x.slug === s.slug; }) || {};
              return html`
                <li>
                  <a class="svc-row" href="/services/${s.slug}">
                    <span class="num-cell">${C.cells(i)}${s.index}</span>
                    <span class="svc-row-main">
                      <span class="t">${s.title}</span>
                      ${when(!!sit.situation, function () { return html`<span class="when">“${sit.situation}”</span>`; })}
                    </span>
                    <span class="svc-row-out">
                      <span class="label-caps">You receive</span>
                      <span class="d">${sit.expect || f.text || s.short}</span>
                    </span>
                    <span class="svc-row-tags tags">${each((f.outputs || []).slice(0, 3), function (o) { return html`<span class="tag">${o}</span>`; })}</span>
                    <span class="chev" aria-hidden="true"></span>
                  </a>
                </li>`;
            })}
          </ol>
          <div class="row between" style="gap:16px;flex-wrap:wrap">
            <a class="arrow" href="/services">Compare the five services <span class="chev" aria-hidden="true">→</span></a>
            <a class="arrow" href="/assessment">Not sure which comes first? Take the readiness assessment <span class="chev" aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>`;
  }

  function sequenceSection() {
    return html`
      <section class="sec-sm bg-paper" aria-labelledby="seq-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(28px,3vw,40px)">
          <div class="section-head">
            <div class="stack stack-14">
              <span class="eyebrow">One question, followed through</span>
              <h2 class="h2-sm" id="seq-h2">Where is performance slipping?</h2>
            </div>
            <p class="lead">One question, followed through four stages. Connecting the data does not prove a cause; it shows where to look next, and who should look.</p>
          </div>
          <div class="case-steps stagger">
            ${each(STAGES, function (st, i) {
              return html`<div class="doc-mini"><div class="dm-bar"><span class="scene-id">${C.cells(i)}0${i + 1} · ${st.name}</span></div><p class="dm-body">${st.copy}</p></div>`;
            })}
          </div>
          <a class="arrow" href="/approach">How we work, in five stages <span class="chev" aria-hidden="true">→</span></a>
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

  /* Client engagements: the two case studies, rendered as the same cards
     the Work page uses. */
  function workSection() {
    return html`
      <section class="sec-sm" aria-labelledby="work-h2">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(32px,4vw,48px)">
          <div class="row between end" style="gap:16px 48px">
            <div class="stack stack-14" style="max-width:720px">
              <span class="eyebrow">Selected work</span>
              <h2 class="h2-sm" id="work-h2">Two engagements, written from the records.</h2>
            </div>
            <a class="arrow" href="/work">All work <span class="chev" aria-hidden="true">→</span></a>
          </div>
          <div class="case-grid">${each(PG.cases || [], PG.caseCard)}</div>
        </div>
      </section>`;
  }

  /* Founder: the same portrait-on-navy composition as the About and founder
     pages, so the person reads the same way everywhere. */
  function founderSection() {
    return PG.founderBanner(false, { eyebrow: 'Founder' });
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
        ${workSection()}
        ${sequenceSection()}
        ${serviceRows()}
        ${industriesSection()}
        ${founderSection()}
        ${closingSection()}`;
    },

    mount: function () {}
  };
})();
