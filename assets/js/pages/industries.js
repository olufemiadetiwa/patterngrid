/* Pattern Grid — Industries: index and sector detail. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when;

  function find(slug) {
    return (PG.industries || []).find(function (i) { return i.slug === slug; });
  }

  function closing(label) {
    return html`
      <section style="padding:0 0 clamp(96px,10vw,160px)">
        <div class="wrap row between" data-reveal="rise" style="border-top:1px solid var(--line);padding-top:clamp(56px,7vw,96px);gap:32px 64px">
          <div class="stack stack-16">
            <h2 style="font-size:clamp(30px,3.6vw,56px);font-weight:600;line-height:1.08;letter-spacing:-.03em;color:var(--navy);max-width:18ch;text-wrap:balance">Another data-intensive sector?</h2>
            <p style="font-size:17px;color:var(--muted);max-width:34em">The decisions matter more than the label. Tell us what you need to improve.</p>
          </div>
          <div class="row" style="gap:16px 28px">
            <a class="btn" href="/contact">${label}</a>
            <a class="arrow" href="/assessment">Check your readiness <span class="chev" aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>`;
  }

  function overview() {
    return html`
      ${PG.hero('industries')}

      <section style="padding:clamp(48px,6vw,96px) 0 clamp(64px,8vw,128px)">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(56px,6vw,96px)">
          ${each(PG.industries, function (ind, k) {
            var img = PG.img.get(ind.photo);
            return html`
              <div class="autogrid divide-top" style="--min:400px;--gap:32px;--gap-x:64px;align-items:center">
                ${C.frame(img, { ar: '4 / 3', style: 'order:' + (k % 2 === 0 ? 0 : 1) })}
                <div class="stack stack-18">
                  <span style="font-weight:500;font-size:12px;color:var(--muted)">0${k + 1}</span>
                  <h2 style="font-size:clamp(26px,2.6vw,40px);font-weight:600;line-height:1.15;color:var(--navy)">${ind.title}</h2>
                  <p style="font-size:19px;line-height:1.45;color:var(--navy);font-weight:500">${ind.question}</p>
                  <div class="row" style="gap:8px">
                    ${each(ind.metrics.slice(0, 4), function (m) { return html`<span class="chip-line">${m}</span>`; })}
                  </div>
                  <a class="arrow" href="/industries/${ind.slug}">Explore ${ind.title} <span class="chev" aria-hidden="true">→</span></a>
                </div>
              </div>`;
          })}
        </div>
      </section>

      ${closing('Book a Data & AI Consultation')}`;
  }

  function detail(ind) {
    var caps = (ind.capabilities || [])
      .map(function (c) { return (PG.services || []).find(function (s) { return s.slug === c; }); })
      .filter(Boolean);
    var relatedWork = (PG.work || []).find(function (w) { return w.slug === ind.related; });
    var ph2 = PG.img.get(ind.photo2);
    var grid = ind.grid || { head: [], rows: [] };

    return html`
      ${PG.hero('industries/' + ind.slug)}

      <section style="padding:24px 0 0">
        <div class="wrap" data-reveal="rise">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span>
            <a href="/industries">Industries</a><span aria-hidden="true">/</span>
            <span aria-current="page">${ind.title}</span>
          </nav>
        </div>
      </section>

      <section class="sec-sm">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:400px;--gap:48px;--gap-x:96px">
          <div class="stack stack-24">
            <span class="label-caps">THE EXECUTIVE QUESTION</span>
            <h2 style="font-size:clamp(28px,3.2vw,48px);font-weight:500;line-height:1.15;letter-spacing:-.03em;color:var(--navy);text-wrap:balance">${ind.question}</h2>
            <p class="body muted">${ind.note}</p>
          </div>
          <div class="stack stack-16">
            <span class="label-caps">METRICS WORTH DEFINING</span>
            <div role="list" class="rows" data-metrics>
              ${each(ind.metrics, function (m, i) {
                return html`
                  <button type="button" role="listitem" class="metric-btn" data-metric="${i}" aria-expanded="false">
                    <span class="hd"><span>${m}</span><span class="sign" aria-hidden="true">+</span></span>
                  </button>`;
              })}
            </div>
          </div>
        </div>
      </section>

      <section class="bg-paper sec-sm">
        <div class="wrap autogrid" data-reveal="rise" style="--min:400px;--gap:48px;--gap-x:64px;align-items:center">
          <div class="stack stack-20">
            <p class="eyebrow-caps">DATA LANDSCAPE</p>
            <h2 class="h2-sm" style="color:var(--navy)">How the information relates.</h2>
            <p class="body">Each source keeps its own identity. A shared model connects them around the entities the business measures, so a single figure can be traced back to the system it came from.</p>
            <p class="small slate" style="max-width:36em;border-top:1px solid var(--rule);padding-top:16px">${ind.serviceNote}</p>
            <div class="row" style="gap:8px;margin-top:8px">
              ${each(caps, function (c) { return html`<a class="tag-link" href="/services/${c.slug}">${c.title} →</a>`; })}
            </div>
          </div>

          <div class="lineage" aria-label="Source systems connected to a shared model">
            <div class="stack stack-8">
              ${each(ind.sources, function (s) { return html`<span class="src">${s}</span>`; })}
            </div>
            <svg viewBox="0 0 40 200" preserveAspectRatio="none" aria-hidden="true" style="width:40px;height:100%">
              <path d="M0 20 C 20 20, 20 100, 40 100 M0 60 C 20 60, 20 100, 40 100 M0 100 L 40 100 M0 140 C 20 140, 20 100, 40 100 M0 180 C 20 180, 20 100, 40 100"
                    fill="none" stroke="#38A0C3" stroke-width="1.2" vector-effect="non-scaling-stroke"/>
            </svg>
            <div class="stack stack-10">
              <div class="model">
                <span class="cap mono">SHARED MODEL</span>
                <span style="font-size:14px;font-weight:600">${ind.title} entities and agreed definitions</span>
              </div>
              <div class="view">
                <span class="cap mono">TRACEABLE VIEW</span>
                <span style="font-size:14px;font-weight:600">${ind.question}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style="padding:clamp(64px,8vw,128px) 0 0">
        <div class="wrap autogrid" data-reveal="rise" style="--min:380px;--gap:40px;--gap-x:64px;align-items:center">
          <div class="stack stack-18">
            <span class="eyebrow">A view worth building</span>
            <h2 class="h2-sm">One record grid, shared definitions, visible exceptions.</h2>
            <p class="body slate">${grid.note}</p>
          </div>
          <div class="panel-dark" aria-label="Illustrative record grid">
            <div class="card-head"><span>${grid.title}</span><span>Sample data · illustrative</span></div>
            <div class="dgrid" style="grid-template-columns:1.3fr 1fr 1fr 1fr;font-size:12px">
              ${each(grid.head, function (h) { return html`<span class="th">${h}</span>`; })}
              ${each(grid.rows, function (row) {
                return each(row, function (cell, ci) {
                  var last = ci === row.length - 1;
                  var warn = /exception|41%|9\.8%|11\.2%|212/.test(cell);
                  var cls = (ci === 0 ? 'key ' : '') + (warn ? 'warn' : (last ? 'ok' : ''));
                  return html`<span class="td ${cls}" style="padding:10px 0">${cell}</span>`;
                });
              })}
            </div>
            <span class="lbl" style="color:rgba(255,255,255,.55)">lineage ← ${ind.sources.join(' · ')}</span>
          </div>
        </div>
      </section>

      <section class="sec-sm">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:380px;--gap:40px;--gap-x:64px">
          ${C.frame(ph2)}
          ${when(!!relatedWork, function () {
            return html`
              <div class="stack stack-20">
                <p class="eyebrow-caps">RELATED WORK</p>
                <a href="/work/${relatedWork.slug}" class="stack stack-10"
                   style="color:var(--ink);border:1px solid var(--line);border-radius:var(--radius);padding:24px">
                  <span class="label-caps">ILLUSTRATIVE SCENARIO</span>
                  <span style="font-size:22px;font-weight:600;color:var(--navy);line-height:1.25">${relatedWork.title}</span>
                  <span class="small muted">${relatedWork.summary}</span>
                  <span style="font-weight:600;font-size:15px;color:var(--teal);margin-top:6px">Explore the scenario →</span>
                </a>
              </div>`;
          })}
        </div>
      </section>

      ${closing(ind.cta)}`;
  }

  var DEFINITION_NOTE = 'Definition, reporting period, owner and source lineage are agreed with the organisation before this metric appears in reporting.';

  PG.pages = PG.pages || {};

  PG.pages.industries = {
    meta: function (p) {
      var ind = p.slug && find(p.slug);
      if (!ind) {
        return {
          title: 'Industries',
          desc: 'We connect data to the customers, operations and decisions that shape your business, with the context needed to make it useful.',
          heroKey: 'industries',
          crumbs: [{ name: 'Industries', path: '/industries' }]
        };
      }
      return {
        title: ind.title,
        desc: ind.lead || ind.question,
        heroKey: 'industries/' + ind.slug,
        crumbs: [{ name: 'Industries', path: '/industries' }, { name: ind.title, path: '/industries/' + ind.slug }]
      };
    },

    render: function (p) {
      var ind = p.slug && find(p.slug);
      return ind ? detail(ind) : overview();
    },

    mount: function (root, cleanup) {
      var open = -1;
      var onClick = function (e) {
        var b = e.target.closest('[data-metric]');
        if (!b) return;
        var i = Number(b.getAttribute('data-metric'));
        open = open === i ? -1 : i;
        C.qsa('[data-metric]', root).forEach(function (el, j) {
          var isOpen = j === open;
          el.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          el.querySelector('.sign').textContent = isOpen ? '−' : '+';
          var def = el.querySelector('.def');
          if (isOpen && !def) {
            def = document.createElement('span');
            def.className = 'def';
            def.textContent = DEFINITION_NOTE;
            el.appendChild(def);
          } else if (!isOpen && def) {
            def.remove();
          }
        });
      };
      root.addEventListener('click', onClick);
      cleanup(function () { root.removeEventListener('click', onClick); });
    }
  };
})();
