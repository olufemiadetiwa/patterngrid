/* Pattern Grid — Our Work: index and scenario detail. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each;

  function closing() {
    return html`
      <section style="padding:0 0 clamp(96px,10vw,160px)">
        <div class="wrap row between" data-reveal="rise" style="border-top:1px solid var(--line);padding-top:clamp(56px,7vw,96px);gap:32px 64px">
          <h2 style="font-size:clamp(30px,3.6vw,56px);font-weight:600;line-height:1.08;letter-spacing:-.03em;color:var(--navy);max-width:18ch;text-wrap:balance">Have a similar question in your business?</h2>
          <div class="row" style="gap:16px 28px">
            <a class="btn" href="/contact">Book a consultation</a>
            <a class="arrow" href="/assessment">Take the readiness assessment <span class="chev" aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>`;
  }

  function overview() {
    return html`
      ${PG.hero('work')}

      <section style="padding:0 0 clamp(40px,5vw,72px)">
        <div class="wrap" data-reveal="rise">
          <p class="small muted" style="max-width:36em">Everything below is an illustrative scenario built with sample data to show how we think. None is a client project and none claims a result. Client work will be labelled as such when we publish it.</p>
        </div>
      </section>

      <section style="padding:0 0 clamp(64px,8vw,128px)">
        <div class="wrap rows" data-reveal="rise">
          ${each(PG.work, function (w) {
            var img = PG.img.get(w.photo);
            return html`
              <a href="/work/${w.slug}" class="autogrid" style="--min:360px;--gap:24px;--gap-x:64px;padding:clamp(32px,4vw,56px) 0;color:var(--ink);align-items:center">
                ${C.frame(img)}
                <div class="stack stack-12">
                  <span class="label-caps">ILLUSTRATIVE SCENARIO · ${w.sector.toUpperCase()}</span>
                  <span style="font-size:clamp(24px,2.2vw,34px);font-weight:600;color:var(--navy);line-height:1.2">${w.title}</span>
                  <span class="body" style="color:var(--muted);font-size:17px;line-height:1.5">${w.summary}</span>
                  <span class="arrow" style="font-size:15px;color:var(--teal);margin-top:4px">Read the scenario <span class="chev" aria-hidden="true">→</span></span>
                </div>
              </a>`;
          })}
        </div>
      </section>

      ${closing()}`;
  }

  function detail(item) {
    var arch = item.sections.slice(1).map(function (s, i, arr) {
      var last = i === arr.length - 1;
      var penult = i === arr.length - 2;
      return {
        num: '0' + (i + 1),
        h: s.h,
        style: last
          ? 'border:1px solid #FFFFFF;background:#FFFFFF;color:#02203D'
          : 'border:1px solid ' + (penult ? '#38A0C3' : 'rgba(255,255,255,.35)') + ';color:#FFFFFF'
      };
    });
    var relServices = (PG.services || []).filter(function (s) { return s.related === item.slug; });

    return html`
      ${PG.hero('work/' + item.slug, {
        bandTitle: item.title,
        bandEyebrow: 'Illustrative scenario · ' + item.sector
      })}

      <section style="padding:clamp(32px,4vw,56px) 0 clamp(24px,3vw,40px)">
        <div class="wrap stack stack-24" data-reveal="rise">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span>
            <a href="/work">Our Work</a><span aria-hidden="true">/</span>
            <span aria-current="page">${item.title}</span>
          </nav>
          <p style="font-size:clamp(20px,1.8vw,28px);line-height:1.35;font-weight:500;max-width:32em">${item.summary}</p>
          <p class="small" style="max-width:44em;padding:12px 16px;background:var(--paper);border-radius:var(--radius);align-self:flex-start">This is an illustrative scenario using sample information. It does not represent a client engagement or verified business result.</p>
        </div>
      </section>

      <section class="bg-navy" style="padding:clamp(40px,5vw,80px) 0">
        <div class="wrap" data-reveal="rise">
          <div aria-label="Scenario architecture" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:16px;align-items:stretch">
            ${each(arch, function (b) {
              return html`
                <div style="${b.style};border-radius:var(--radius);padding:18px;display:flex;flex-direction:column;gap:8px;min-height:120px">
                  <span class="mono" style="font-weight:500;font-size:10px;letter-spacing:.08em;opacity:.8">${b.num}</span>
                  <span style="font-weight:600;font-size:15px;line-height:1.3">${b.h}</span>
                </div>`;
            })}
          </div>
          <p class="lbl" style="margin-top:16px;color:rgba(255,255,255,.6)">Sample data. Not client results.</p>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:32px 40px;margin-top:48px;border-top:1px solid rgba(255,255,255,.15);padding-top:32px">
            <div class="stack stack-10">
              <span class="eyebrow eyebrow-dark">Deliverables</span>
              ${each(item.deliverables, function (d) { return html`<span style="font-size:14px;line-height:1.45">${d}</span>`; })}
            </div>
            <div class="stack stack-10">
              <span class="eyebrow eyebrow-dark">Approach</span>
              <span style="font-size:14px;line-height:1.6">${(item.approach || []).join(' → ')} (the Business Intelligence approach)</span>
            </div>
            <div class="stack stack-10">
              <span class="eyebrow eyebrow-dark">How the data moves</span>
              <span style="font-size:14px;line-height:1.6">${item.flow}</span>
            </div>
            <div class="stack stack-10">
              <span class="eyebrow eyebrow-dark">Technology used (illustrative)</span>
              ${each(item.tech, function (x) { return html`<span style="font-size:14px;line-height:1.45">${x}</span>`; })}
              <span style="font-size:12px;color:rgba(255,255,255,.55)">Options for this scenario, not delivered client work.</span>
            </div>
          </div>
        </div>
      </section>

      <section class="sec-sm">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:400px;--gap:48px;--gap-x:96px">
          <div class="rows">
            ${each(item.sections, function (s) {
              return html`
                <div class="stack stack-10" style="padding:28px 0">
                  <h2 style="font-size:22px;font-weight:600;color:var(--navy);line-height:1.25">${s.h}</h2>
                  <p class="body">${s.p}</p>
                </div>`;
            })}
          </div>

          <div class="panel-paper" style="position:sticky;top:112px">
            <h2 style="font-size:22px;font-weight:600;color:var(--navy);line-height:1.25">What this system is designed to enable</h2>
            <ul class="ticks lg">
              ${each(item.enable, function (e) { return html`<li>${e}</li>`; })}
            </ul>
            <p class="fine">What the system is built to make possible, not a measured result.</p>
            <div class="stack stack-8" style="border-top:1px solid var(--line);padding-top:16px">
              <span class="label-caps">RELEVANT SERVICES</span>
              <div class="row" style="gap:8px">
                ${each(relServices, function (r) {
                  return html`<a class="tag-link" href="/services/${r.slug}">${r.title} →</a>`;
                })}
              </div>
            </div>
          </div>
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
          title: 'Our Work',
          desc: 'Explore the questions we address, the systems we design and the reasoning behind them.',
          heroKey: 'work',
          crumbs: [{ name: 'Our Work', path: '/work' }]
        };
      }
      return {
        title: item.title,
        desc: item.summary,
        heroKey: 'work/' + item.slug,
        crumbs: [{ name: 'Our Work', path: '/work' }, { name: item.title, path: '/work/' + item.slug }],
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
    }
  };
})();
