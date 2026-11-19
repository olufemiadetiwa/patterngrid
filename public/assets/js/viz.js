/* Pattern Grid — diagrams (v2). Every figure shows a real information
   relationship and is complete as a still; interaction and motion only
   explain a change of state. Sample data comes from PG.scene.data so the
   figures agree with each other. Nothing here is drawn as an application. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when, raw = C.raw;
  var viz = (PG.viz = {});
  var D = function () { return (PG.scene && PG.scene.data) || { locations: [] }; };
  var SAMPLE = 'Illustrative · sample data';

  /* ----------------------------------------------------- 1. system map */
  var SYSTEM = [
    { k: 'Sources', nodes: ['ERP', 'CRM', 'Finance', 'Field app', 'Spreadsheets'], note: 'The systems you already run stay as they are.' },
    { k: 'Integration', nodes: ['Scheduled pipelines', 'Standardised names', 'Load log'], note: 'Data arrives on schedule and every load is recorded.' },
    { k: 'Trusted model', nodes: ['Agreed definitions', 'Quality checks', 'Named owners'], note: 'One definition and one owner for each measure; failures are held, not hidden.' },
    { k: 'Intelligence', nodes: ['Reports', 'Variance', 'Exceptions'], note: 'Views built around the questions the business asks.' },
    { k: 'Decisions', nodes: ['Question', 'Evidence', 'Owner'], note: 'A question with its evidence, in front of the person who decides.' }
  ];
  var AI_LANE = ['Rules check', 'Draft', 'Human review', 'Release'];

  viz.system = function () {
    return html`
      <figure class="sysfig v-dark" data-sysfig role="group" aria-label="System map: sources, integration, trusted model, intelligence and decisions, with a controlled AI lane">
        <div class="sysfig-head"><span>System map</span><span>Schematic</span></div>
        <ol class="sysfig-cols">
          ${each(SYSTEM, function (s, i) {
            return html`
              <li class="sf-col${i === SYSTEM.length - 1 ? ' is-lit' : ''}" data-sf="${i}">
                <button type="button" class="sf-k" data-sf-btn="${i}" aria-pressed="${i === SYSTEM.length - 1 ? 'true' : 'false'}"><i aria-hidden="true">0${i + 1}</i>${s.k}</button>
                <span class="sf-nodes">${each(s.nodes, function (n) { return html`<span class="sf-node">${n}</span>`; })}</span>
              </li>`;
          })}
        </ol>
        <div class="sf-lane">
          <span class="sf-lane-k">Controlled AI</span>
          <span class="sf-steps">${each(AI_LANE, function (t, i) { return html`<span class="sf-step${i === 2 ? ' is-human' : ''}">${t}</span>`; })}</span>
        </div>
        <figcaption class="sysfig-cap" data-sf-cap aria-live="polite">${SYSTEM[SYSTEM.length - 1].note}</figcaption>
      </figure>`;
  };

  /* ------------------------------------- 2. fragmented to connected */
  viz.fragment = function () {
    var s = D().locations.filter(function (l) { return l.hl; })[0] || { name: 'Surulere', sales: 61, avail: 41, outlet: '0118', loc: 'E-0118', drop: '0118' };
    var src = [
      ['Sales', 'Rep sell-out app', 'Outlet ' + s.outlet, '190 units'],
      ['Stock', 'Warehouse file', 'LOC-' + s.loc, s.avail + '% available'],
      ['Distribution', 'Route planner', 'Drop ' + s.drop, '1 delivery']
    ];
    return html`
      <figure class="frag" data-frag data-state="connected" role="group" aria-label="Three source records for one outlet, shown separately and then connected into one record">
        <div class="frag-bar">
          <div class="seg" role="group" aria-label="View">
            <button type="button" data-frag-set="fragmented" aria-pressed="false">Fragmented</button>
            <button type="button" data-frag-set="connected" aria-pressed="true">Connected</button>
          </div>
          <span class="fig-note">${SAMPLE}</span>
        </div>
        <div class="frag-stage">
          <div class="frag-src">
            ${each(src, function (r, i) {
              return html`<div class="frag-card" style="--i:${i}"><span class="mono-k">${r[0]} · ${r[1]}</span><b class="mono-v">${r[2]}</b><span>${r[3]}</span></div>`;
            })}
          </div>
          <div class="frag-join" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="frag-one">
            <span class="mono-k">One record · week 36</span>
            <b>${s.name}</b>
            <dl><div><dt>Sales index</dt><dd>${s.sales}</dd></div><div><dt>Availability</dt><dd>${s.avail}%</dd></div><div><dt>Deliveries</dt><dd>1</dd></div></dl>
            <p>Is availability limiting sales in ${s.name}? <span>Owner: commercial lead</span></p>
          </div>
        </div>
        <p class="frag-line" data-frag-line>One outlet, one name, one view: the question becomes visible.</p>
      </figure>`;
  };
  var FRAG_LINES = { fragmented: 'Three systems, three names for one outlet. Nobody sees the same thing.', connected: 'One outlet, one name, one view: the question becomes visible.' };

  /* ------------------------------------------- 3. Intelligence Canvas */
  function bars(title, rows, unit) {
    var max = Math.max.apply(null, rows.map(function (r) { return r[1]; })) || 1;
    return html`<div class="cv-bars"><span class="mono-k">${title}</span>${each(rows, function (r) {
      return html`<div class="cv-bar${r[2] ? ' is-hl' : ''}"><span>${r[0]}</span><i style="--w:${Math.round(r[1] / max * 100)}%"></i><b>${r[1]}${unit || ''}</b></div>`;
    })}</div>`;
  }
  function table(title, head, rows) {
    return html`<div class="cv-table"><span class="mono-k">${title}</span><table><thead><tr>${each(head, function (h) { return html`<th>${h}</th>`; })}</tr></thead><tbody>${each(rows, function (r) {
      return html`<tr class="${r.hl ? 'is-hl' : ''}">${each(r.c, function (c) { return html`<td>${c}</td>`; })}</tr>`;
    })}</tbody></table></div>`;
  }
  function canvasStages() {
    var L = D().locations;
    return [
      { k: 'Sources', h: 'Three systems describe the same business.', p: 'Sales counts units by outlet code. Stock reports availability by location. Distribution logs deliveries by drop. Each is right; none agrees with the others.',
        out: 'A map of the sources and what each one holds', owner: 'System owners',
        fig: function () { return html`<div class="cv-grid3">
          ${table('Sales · rep app', ['Outlet', 'Units'], L.map(function (l, i) { return { hl: l.hl, c: ['OUT-' + l.outlet, [312, 299, 190, 278][i]] }; }))}
          ${table('Stock · warehouse file', ['Location', 'Avail.'], L.map(function (l) { return { hl: l.hl, c: ['LOC-' + l.loc, l.avail + '%'] }; }))}
          ${table('Distribution · routes', ['Drop', 'Deliv.'], L.map(function (l) { return { hl: l.hl, c: ['DROP-' + l.drop, l.hl ? 1 : 3] }; }))}
        </div>`; } },
      { k: 'Integration', h: 'One location key across three systems.', p: 'Each record is mapped to a shared product and location. Outlet 0118, location E-0118 and drop 0118 become one place. The mapping is written down and re-run on every load.',
        out: 'Scheduled pipelines and a mapping you can read', owner: 'Data engineer, with each system owner',
        fig: function () { return table('Location mapping · product 4471', ['Location', 'Sales key', 'Stock key', 'Drop key'], L.map(function (l) { return { hl: l.hl, c: [l.name, 'OUT-' + l.outlet, 'LOC-' + l.loc, 'DROP-' + l.drop] }; })); } },
      { k: 'Quality and modelling', h: 'Checked on arrival, defined once.', p: 'Rules confirm that periods match, totals reconcile and every outlet maps to a location. A record that fails is held and listed. Each measure gets one definition and one owner.',
        out: 'A tested model and a definition for every measure', owner: 'A named owner per measure',
        fig: function () { return html`<div class="cv-checks">
          <span class="mono-k">Checks · week 36 load</span>
          <ul><li class="ok">Period matches across all three sources</li><li class="ok">Units reconcile to the finance ledger</li><li class="ok">Every outlet maps to one location</li><li class="held">1 record held: a drop with no matching outlet</li></ul>
          <div class="cv-def"><span class="mono-k">Definition</span><b>Availability</b><p>Listed products in stock at the last count, divided by listed products. By location, by week.</p><span class="cv-owner">Owner: supply lead</span></div>
        </div>`; } },
      { k: 'Analytics', h: 'Sales and availability, side by side.', p: 'With one model the two can be compared for the first time. One location is low on both.',
        out: 'Reports built around the questions you ask', owner: 'The team that uses the report',
        fig: function () { return html`<div class="cv-grid2">
          ${bars('Sales index · Ikeja = 100', L.map(function (l) { return [l.name, l.sales, l.hl]; }))}
          ${bars('Availability · last count', L.map(function (l) { return [l.name, l.avail, l.hl]; }), '%')}
        </div>`; } },
      { k: 'Decisions', h: 'A question, its evidence and an owner.', p: 'The connected view shows where to look. Whether low availability is causing low sales is for the team to investigate; the report does not pretend to know.',
        out: 'A decision brief and a review routine', owner: 'The decision owner',
        fig: function () { var s = L.filter(function (l) { return l.hl; })[0] || {}; return html`<div class="cv-brief">
          <span class="mono-k">Decision brief · week 36</span>
          <b>Is availability limiting sales in ${s.name}?</b>
          <dl><div><dt>Sales index</dt><dd>${s.sales}</dd></div><div><dt>Availability</dt><dd>${s.avail}%</dd></div><div><dt>Deliveries</dt><dd>1 of 3</dd></div></dl>
          <p><span>Owner</span> Commercial lead <span>Review</span> Next weekly meeting</p>
          <em>A question, not a conclusion.</em>
        </div>`; } }
    ];
  }

  viz.canvas = function () {
    var st = canvasStages();
    return html`
      <div class="canvas v-dark" data-canvas>
        <div class="cv-tabs" role="tablist" aria-label="Stages">
          ${each(st, function (s, i) {
            return html`<button type="button" role="tab" id="cv-tab-${i}" class="cv-tab" data-cv="${i}" aria-selected="${i === 0 ? 'true' : 'false'}" aria-controls="cv-panel-${i}" tabindex="${i === 0 ? '0' : '-1'}"><i aria-hidden="true">0${i + 1}</i><span>${s.k}</span></button>`;
          })}
        </div>
        <div class="cv-panels">
          ${each(st, function (s, i) {
            return html`
              <section class="cv-panel${i === 0 ? '' : ' is-off'}" id="cv-panel-${i}" role="tabpanel" aria-labelledby="cv-tab-${i}" data-cv-panel="${i}">
                <div class="cv-copy">
                  <span class="cv-step"><i aria-hidden="true">0${i + 1}</i>${s.k}</span>
                  <h3>${s.h}</h3>
                  <p>${s.p}</p>
                  <dl><div><dt>Output</dt><dd>${s.out}</dd></div><div><dt>Owner</dt><dd>${s.owner}</dd></div></dl>
                </div>
                <div class="cv-fig">${s.fig()}</div>
              </section>`;
          })}
        </div>
        <p class="fig-note on-dark">${SAMPLE}: one product, one week, four locations of a Lagos distributor. Connecting the data shows where to look; it does not prove a cause.</p>
      </div>`;
  };

  /* ------------------------------------------------- 4. method rail */
  var OWNERS = ['System owners', 'An owner for each measure', 'The team that uses the report', 'A named reviewer', 'The decision owner'];
  viz.method = function () {
    var st = PG.stages || [];
    return html`
      <ol class="method" data-method>
        ${each(st, function (s, i) {
          return html`
            <li class="method-step${i === 0 ? ' is-on' : ''}">
              <button type="button" class="method-head" data-method-step="${i}" aria-expanded="${i === 0 ? 'true' : 'false'}">
                <span class="num-cell">${C.cells(i)}0${i + 1}</span>
                <b>${s.name}</b>
              </button>
              <div class="method-body">
                <p>${s.copy}</p>
                <dl><div><dt>You receive</dt><dd>${s.output}</dd></div><div><dt>Owned by</dt><dd>${OWNERS[i] || ''}</dd></div></dl>
              </div>
            </li>`;
        })}
      </ol>`;
  };

  /* ------------------------------------------ 5. service figures */
  var SVG = function (inner, label) { return raw('<svg class="svc-fig" viewBox="0 0 320 180" role="img" aria-label="' + C.esc(label) + '" preserveAspectRatio="xMidYMid meet">' + inner + '</svg>'); };
  var T = function (x, y, t, cls, anchor) { return '<text x="' + x + '" y="' + y + '" class="' + (cls || 't') + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + C.esc(t) + '</text>'; };
  viz.mini = function (slug) {
    if (slug === 'data-ai-strategy') {
      var dots = [[70, 120, 0], [120, 70, 0], [180, 96, 0], [232, 52, 1], [250, 124, 0]];
      return SVG('<line x1="40" y1="20" x2="40" y2="150" class="ax"/><line x1="40" y1="150" x2="300" y2="150" class="ax"/><line x1="170" y1="20" x2="170" y2="150" class="grid"/><line x1="40" y1="85" x2="300" y2="85" class="grid"/>' +
        T(44, 14, 'VALUE', 'k') + T(300, 166, 'FEASIBILITY', 'k', 'end') + T(292, 34, 'DO FIRST', 'k on', 'end') +
        dots.map(function (d) { return '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + (d[2] ? 9 : 6) + '" class="' + (d[2] ? 'dot on' : 'dot') + '"/>'; }).join(''), 'Opportunities plotted by value and feasibility; one sits in the do-first quadrant');
    }
    if (slug === 'data-engineering') {
      return SVG([18, 68, 118].map(function (y, i) { return '<rect x="14" y="' + y + '" width="66" height="34" rx="3" class="box"/>' + T(47, y + 21, ['ERP', 'CRM', 'FILES'][i], 'k', 'middle'); }).join('') +
        '<path d="M80 35 H112 V85 M80 85 H112 M80 135 H112 V85 M112 85 H150" class="ln"/><path d="M168 67 L186 85 L168 103 L150 85 Z" class="gate"/>' + T(168, 124, 'CHECKS', 'k', 'middle') +
        '<path d="M186 85 H226" class="ln on"/><rect x="226" y="60" width="80" height="50" rx="3" class="box on"/>' + T(266, 82, 'TRUSTED', 'k on', 'middle') + T(266, 96, 'MODEL', 'k on', 'middle') +
        '<path d="M168 103 V150" class="ln hold"/><circle cx="168" cy="154" r="5" class="dot hold"/>' + T(180, 158, 'HELD', 'k hold'), 'Three sources pass a quality gate into a trusted model; a failed record is held');
    }
    if (slug === 'business-intelligence') {
      var v = [91, 94, 98, 101, 103, 96], mx = 110;
      return SVG(T(16, 30, 'NET SALES · W36', 'k') + T(16, 62, '9.6m', 'big') + T(16, 80, '−0.4m vs plan', 'k hold') +
        '<line x1="120" y1="' + (150 - 100 / mx * 120) + '" x2="306" y2="' + (150 - 100 / mx * 120) + '" class="plan"/>' + T(116, 150 - 100 / mx * 120 + 3, 'PLAN', 'k', 'end') +
        v.map(function (n, i) { var h = n / mx * 120; return '<rect x="' + (124 + i * 31) + '" y="' + (150 - h) + '" width="22" height="' + h + '" rx="2" class="' + (i === 5 ? 'bar on' : 'bar') + '"/>'; }).join('') +
        '<line x1="120" y1="150" x2="306" y2="150" class="ax"/>', 'Net sales by week against plan; the latest week is below plan');
    }
    if (slug === 'ai-automation') {
      var steps = ['RULES', 'DRAFT', 'REVIEW', 'RELEASE'];
      return SVG(steps.map(function (s, i) { var x = 12 + i * 77; return '<rect x="' + x + '" y="58" width="64" height="36" rx="18" class="' + (i === 2 ? 'box on' : 'box') + '"/>' + T(x + 32, 80, s, i === 2 ? 'k on' : 'k', 'middle') + (i < 3 ? '<path d="M' + (x + 64) + ' 76 H' + (x + 77) + '" class="ln"/>' : ''); }).join('') +
        '<circle cx="198" cy="36" r="6" class="dot on"/><path d="M188 52 C188 45 208 45 208 52" class="ln on"/>' + T(198, 20, 'A PERSON DECIDES', 'k on', 'middle') +
        '<path d="M198 94 V128 H176" class="ln hold"/>' + T(170, 132, 'RETURNED WITH REASON', 'k hold', 'end'), 'A workflow of rules, draft, human review and release; a person approves or returns the item');
    }
    return SVG([0, 1, 2].map(function (i) { var x = 30 + i * 92, y = 120 - i * 38; return '<path d="M' + x + ' ' + (y + 30) + ' V' + y + ' H' + (x + 92) + '" class="ln' + (i === 2 ? ' on' : '') + '"/>' + T(x + 8, y - 8, ['BASELINE', 'GUIDED', 'INDEPENDENT'][i], i === 2 ? 'k on' : 'k') ; }).join('') +
      '<line x1="30" y1="150" x2="306" y2="150" class="ax"/>' + [[60, 136, 0], [84, 136, 0], [150, 98, 0], [176, 98, 0], [262, 60, 1]].map(function (d) { return '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="6" class="' + (d[2] ? 'dot on' : 'dot') + '"/>'; }).join(''), 'Team members move from baseline through guided practice to independent work');
  };

  /* ------------------------------------------------------- behaviour */
  viz.mount = function (root, cleanup) {
    var reduced = C.motion.reduced || document.documentElement.classList.contains('is-static');
    var timers = [];
    var later = function (fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; };

    /* system map: one finite signal pass, then selection by the visitor */
    var sys = root.querySelector('[data-sysfig]');
    if (sys) {
      var cols = C.qsa('.sf-col', sys), cap = sys.querySelector('[data-sf-cap]'), touched = false;
      var light = function (i) {
        cols.forEach(function (c, j) { c.classList.toggle('is-lit', j === i); c.classList.toggle('is-past', j < i); var b = c.querySelector('[data-sf-btn]'); if (b) b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
        if (cap) cap.textContent = SYSTEM[i].note;
      };
      if (!reduced) { light(0); cols.forEach(function (c, i) { if (i) later(function () { if (!touched) light(i); }, 900 + i * 1100); }); }
      else light(cols.length - 1);
      var onSys = function (e) { var b = e.target.closest('[data-sf-btn]'); if (!b) return; touched = true; light(Number(b.getAttribute('data-sf-btn'))); };
      sys.addEventListener('click', onSys);
      cleanup(function () { sys.removeEventListener('click', onSys); });
    }

    /* fragmented / connected */
    C.qsa('[data-frag]', root).forEach(function (f) {
      var set = function (state) {
        f.setAttribute('data-state', state);
        C.qsa('[data-frag-set]', f).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-frag-set') === state ? 'true' : 'false'); });
        var l = f.querySelector('[data-frag-line]'); if (l) l.textContent = FRAG_LINES[state];
      };
      var used = false;
      var onClick = function (e) { var b = e.target.closest('[data-frag-set]'); if (!b) return; used = true; set(b.getAttribute('data-frag-set')); };
      f.addEventListener('click', onClick);
      cleanup(function () { f.removeEventListener('click', onClick); });
      if (!reduced && 'IntersectionObserver' in window) {
        set('fragmented');
        var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); later(function () { if (!used) set('connected'); }, 1600); } }, { threshold: 0.5 });
        io.observe(f);
        cleanup(function () { io.disconnect(); });
      }
    });

    /* canvas tabs */
    C.qsa('[data-canvas]', root).forEach(function (cv) {
      var tabs = C.qsa('[data-cv]', cv), panels = C.qsa('[data-cv-panel]', cv);
      var show = function (i, focus) {
        tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
        panels.forEach(function (p, j) { p.classList.toggle('is-off', j !== i); });
        if (focus) tabs[i].focus();
      };
      var onClick = function (e) { var t = e.target.closest('[data-cv]'); if (t) show(Number(t.getAttribute('data-cv'))); };
      var onKey = function (e) {
        var cur = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : e.key === 'Home' ? -99 : e.key === 'End' ? 99 : 0;
        if (!d) return; e.preventDefault();
        show(d === -99 ? 0 : d === 99 ? tabs.length - 1 : Math.min(tabs.length - 1, Math.max(0, cur + d)), true);
      };
      cv.addEventListener('click', onClick); cv.querySelector('[role="tablist"]').addEventListener('keydown', onKey);
      cleanup(function () { cv.removeEventListener('click', onClick); });
    });

    /* method rail */
    C.qsa('[data-method]', root).forEach(function (m) {
      var steps = C.qsa('.method-step', m);
      var onClick = function (e) {
        var b = e.target.closest('[data-method-step]'); if (!b) return;
        var i = Number(b.getAttribute('data-method-step'));
        steps.forEach(function (s, j) { s.classList.toggle('is-on', j === i); s.querySelector('[data-method-step]').setAttribute('aria-expanded', j === i ? 'true' : 'false'); });
      };
      m.addEventListener('click', onClick);
      cleanup(function () { m.removeEventListener('click', onClick); });
    });

    cleanup(function () { timers.forEach(clearTimeout); });
  };
})();
