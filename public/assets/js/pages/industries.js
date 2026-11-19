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
    return PG.closing({ h: 'Another data-intensive sector?', p: 'The decisions matter more than the label. Tell us what you need to improve.', cta: label === 'Book a consultation' ? 'Request a consultation' : label });
  }

  function overview() {
    return html`
      ${PG.hero('industries')}

      <section style="padding:0 0 clamp(64px,8vw,128px)">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(56px,6vw,96px)">
          <p class="lede" style="max-width:40em">Each page below gives one question leaders in that sector ask, the measures we would define with you, and a sample of what a connected view could show.</p>
          ${each(PG.industries, function (ind, k) {
            var img = PG.img.get(ind.photo);
            return html`
              <div class="autogrid divide-top" style="--min:400px;--gap:32px;--gap-x:64px;align-items:center">
                ${C.frame(img, { ar: '4 / 3', style: 'order:' + (k % 2 === 0 ? 0 : 1) })}
                <div class="stack stack-18">
                  <span style="font-weight:500;font-size:12px;color:var(--muted)">0${k + 1}</span>
                  <h2 class="h2-sm" style="color:var(--navy)">${ind.title}</h2>
                  <p style="font-size:19px;line-height:1.45;color:var(--navy);font-weight:500">${ind.question}</p>
                  <div class="stack stack-8">
                    <span class="label-caps">Measures we would define</span>
                    <div class="row" style="gap:8px">
                      ${each(ind.metrics.slice(0, 4), function (m) { return html`<span class="chip-line">${m}</span>`; })}
                    </div>
                  </div>
                  <a class="arrow" href="/industries/${ind.slug}">Read about ${ind.title} <span class="chev" aria-hidden="true">→</span></a>
                </div>
              </div>`;
          })}
        </div>
      </section>

      ${closing('Book a consultation')}`;
  }

  /* Sector story (v2): the decisions that matter and where the information
     fragments. Representative of the sector, not a client's situation. */
  var STORY = {
    'financial-services': {
      decisions: ['Which customers are active, and which are drifting away?', 'Where is revenue by product moving apart from transaction volume?', 'Which reconciliation exceptions need a person today?'],
      fragments: 'Core banking, the payment processor and the CRM each identify a customer differently, so activity, revenue and service history rarely sit in one view.' },
    'fmcg-distribution': {
      decisions: ['Which outlets are short of the stock that is selling?', 'Where is sell-in running ahead of sell-out?', 'Which routes justify their delivery cost?'],
      fragments: 'Sell-in lives in distributor invoices, sell-out in a field app and stock in a warehouse file. Each uses its own outlet and product names.' },
    'retail-ecommerce': {
      decisions: ['Which products earn their shelf or page space?', 'Where do customers come back, and where do they not?', 'What will run out before demand does?'],
      fragments: 'The till, the web shop and the stock system disagree on what a product is, so sales, margin and availability cannot be read together.' },
    'technology': {
      decisions: ['Which behaviours predict that a user stays?', 'Where does onboarding lose people?', 'Which features earn their running cost?'],
      fragments: 'Product events, billing and support tickets sit in three tools with three user identifiers, so adoption and revenue are analysed apart.' }
  };

  function detail(ind) {
    var caps = (ind.capabilities || [])
      .map(function (c) { return (PG.services || []).find(function (s) { return s.slug === c; }); })
      .filter(Boolean);
    var relatedCase = (PG.cases || []).find(function (c) { return c.industrySlug === ind.slug; });
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

      <section class="sec-sm" id="ind-decisions">
        <div class="wrap section-head start" data-reveal="rise">
          <div class="stack stack-14">
            <span class="eyebrow">Decisions that matter</span>
            <h2 class="h2-sm" style="max-width:20ch">${ind.question}</h2>
          </div>
          <div class="stack stack-20">
            <ul class="measure-list">${each(((STORY[ind.slug] || {}).decisions) || [], function (d, i) { return html`<li><span class="num-cell">${C.cells(i)}0${i + 1}</span><span>${d}</span></li>`; })}</ul>
            <div class="note-block"><span class="label-caps">Where the information fragments</span><p>${(STORY[ind.slug] || {}).fragments || ''}</p></div>
          </div>
        </div>
      </section>

      <section class="sec-sm bg-paper" id="ind-measures">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:400px;--gap:48px;--gap-x:96px">
          <div class="stack stack-24">
            <span class="eyebrow">Measures</span>
            <h2 class="h2-sm" style="text-wrap:balance">The measures, each with one definition.</h2>
            <p class="body muted">${ind.note}</p>
          </div>
          <div class="stack stack-16">
            <span class="label-caps">Measures we would define with you</span>
            <div class="rows" data-metrics>
              ${each(ind.metrics, function (m, i) {
                return html`
                  <button type="button" class="metric-btn" data-metric="${i}" aria-expanded="false">
                    <span class="hd"><span>${m}</span><span class="sign" aria-hidden="true">+</span></span>
                  </button>`;
              })}
            </div>
          </div>
        </div>
      </section>

      <section class="sec-sm bg-ink" id="ind-sources">
        <div class="wrap stack" style="gap:clamp(24px,3vw,40px)">
          <div class="section-head" data-reveal="rise">
            <div class="stack stack-14">
              <span class="eyebrow eyebrow-dark">A representative view</span>
              <h2 class="h2" style="max-width:16ch">How the sources connect into one page.</h2>
            </div>
            <div class="stack stack-14">
              <p class="lead">Each system stays as it is. A shared model links them around the things you measure, so any figure can be traced to the system it came from.</p>
              <p class="small" style="color:var(--slate-dark);max-width:36em">${grid.note || ind.serviceNote}</p>
            </div>
          </div>
          <div data-scene="lineage"></div>
          <p class="fig-note on-dark">Illustrative. Sample data for a representative business in this sector; not a client's figures.</p>
          <div class="row" style="gap:8px">
            <span class="label-caps" style="color:var(--slate-dark);margin-right:8px">Services that apply</span>
            ${each(caps, function (c) { return html`<a class="tag-link on-dark" href="/services/${c.slug}">${c.title} \u2192</a>`; })}
          </div>
        </div>
      </section>

      <section class="sec-sm">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:380px;--gap:40px;--gap-x:64px">
          ${C.frame(ph2)}
          ${when(!!relatedCase, function () {
            return html`
              <div class="stack stack-20">
                <p class="label-caps">Related work</p>
                <a href="/work/${relatedCase.slug}" class="stack stack-10"
                   style="color:var(--ink);border:1px solid var(--line);border-radius:var(--radius);padding:24px">
                  <span class="label-caps" style="color:var(--accent-2-ink)">Pattern Grid engagement · ${relatedCase.client}</span>
                  <span style="font-size:22px;font-weight:600;color:var(--navy);line-height:1.25">${relatedCase.title}</span>
                  <span class="small muted">${relatedCase.summary}</span>
                  <span style="font-weight:600;font-size:15px;color:var(--teal);margin-top:6px">Read the case study →</span>
                </a>
              </div>`;
          })}
        </div>
      </section>

      ${closing(ind.cta)}`;
  }

  var DEFINITION_NOTE = 'Before this measure goes into a report, we agree its definition, reporting period, owner and source with you.';

  /* Match a listed measure to a defined one in the industry workspace. */
  function definitionFor(ind, name) {
    var M = (PG.scene.industries || {})[ind.slug]; if (!M) return null;
    var n = name.toLowerCase();
    var hit = M.metrics.find(function (m) { return n.indexOf(m.name.toLowerCase()) >= 0; }) ||
      M.metrics.find(function (m) { return m.name.toLowerCase().split(/[^a-z0-9-]+/).some(function (w) { return w.length > 3 && n.indexOf(w) >= 0; }); });
    return hit || null;
  }
  function definitionMarkup(ind, name) {
    var m = definitionFor(ind, name);
    if (!m) return '<span class="d">' + C.esc(DEFINITION_NOTE) + '</span>';
    return '<span class="d">' + C.esc(m.definition) + '</span><dl><dt>Period</dt><dd>' + C.esc(m.period) + '</dd><dt>Unit</dt><dd>' + C.esc(m.unit) + '</dd><dt>Source</dt><dd>' + C.esc(m.source) + '</dd><dt>Owner</dt><dd>' + C.esc(m.owner) + '</dd></dl>';
  }

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
      this._ind = ind || null;
      return ind ? detail(ind) : overview();
    },

    mount: function (root, cleanup) {
      var ind = this._ind;
      C.qsa('[data-scene]', root).forEach(function (host) { cleanup(PG.scene.mount(host, host.getAttribute('data-scene'), { industry: ind })); });

      var open = -1;
      var onClick = function (e) {
        if (e.target.closest('.metric-btn .def a')) return; // the workspace link navigates
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
            def.innerHTML = definitionMarkup(ind, el.querySelector('.hd > span').textContent);
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
