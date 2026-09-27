/* Pattern Grid — Readiness Assessment: eight questions, banded result. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when, raw = C.raw;

  var KEY_ANSWERS = 'pg-assessment-answers';
  var KEY_SUMMARY = 'pg-assessment-summary';

  function restore() {
    try {
      var a = JSON.parse(sessionStorage.getItem(KEY_ANSWERS) || 'null');
      if (Array.isArray(a) && a.length === 8) return a;
    } catch (e) { /* ignore */ }
    return Array(8).fill(null);
  }

  function persist(a) {
    try { sessionStorage.setItem(KEY_ANSWERS, JSON.stringify(a)); } catch (e) { /* ignore */ }
  }

  var state = { phase: 'intro', idx: 0, answers: restore(), askInclude: false };

  /* --------------------------------------------------------------- score */

  function compute() {
    var a = state.answers.map(function (v) { return v == null ? 0 : v; });
    var sum = a.reduce(function (x, y) { return x + y; }, 0);
    var raw_ = sum / 32 * 100;
    var score = Math.round(raw_);

    var band = PG.bands.slice().reverse().find(function (b) { return raw_ >= b.min; }) || PG.bands[0];

    var byKey = {};
    PG.assessment.forEach(function (d, i) { byKey[d.key] = a[i]; });

    /* The top band is held back when a foundation is weak — a high total
       should not read as "AI ready" on top of shaky quality or governance. */
    var foundationNote = '';
    if (band.label === 'AI ready') {
      var fails = [];
      if (byKey.quality < 3) fails.push('data quality (needs at least 3 of 4)');
      if (byKey.governance < 3) fails.push('governance (needs at least 3 of 4)');
      if (byKey.infrastructure < 2) fails.push('data infrastructure (needs at least 2 of 4)');
      if (fails.length) {
        band = PG.bands.find(function (b) { return b.label === 'Intelligent'; });
        foundationNote = 'Your score is in the top band, but the label is held at Intelligent because a foundation needs attention: ' + fails.join('; ') + '.';
      }
    }

    var order = PG.tieOrder;
    var sorted = PG.assessment
      .map(function (d, i) { return Object.assign({}, d, { v: a[i] }); })
      .sort(function (x, y) { return x.v - y.v || order.indexOf(x.key) - order.indexOf(y.key); });

    function svcTitle(slug) {
      var s = (PG.services || []).find(function (x) { return x.slug === slug; });
      return s ? s.title : '';
    }

    var priorities, heading;
    if (a.every(function (v) { return v === 4; })) {
      heading = 'Maintenance and reassessment';
      priorities = [
        { title: 'Keep definitions and ownership under review', text: 'Strong self-reported foundations still drift. Schedule a regular review of metric definitions, owners and access rules.', href: '/services/data-ai-strategy', link: 'Explore data strategy' },
        { title: 'Evaluate established use cases', text: 'Reassess automated and AI-assisted workflows against agreed quality and value measures.', href: '/services/ai-automation', link: 'Explore AI and automation' },
        { title: 'Reassess in six to twelve months', text: 'Repeat this self-assessment with the same respondents to check whether practices are holding.', href: '/assessment', link: 'Return to the assessment' }
      ];
    } else {
      heading = 'Recommended priorities';
      priorities = sorted.filter(function (d) { return d.v < 4; }).slice(0, 3).map(function (d) {
        var m = PG.priorityMap[d.key];
        return {
          title: d.name + ' · ' + svcTitle(m.service),
          text: m.text,
          href: '/services/' + m.service,
          link: 'Explore ' + svcTitle(m.service).toLowerCase()
        };
      });
      var adoption = (byKey.reporting >= 3 || byKey.infrastructure >= 3) &&
        (byKey.decisions <= 1 || byKey.analytics <= 1);
      if (adoption && priorities.length < 3) {
        priorities.push({
          title: 'Adoption · Capability Building',
          text: 'Systems appear ahead of daily use. Capability building can help teams interpret and act on the reporting they already have.',
          href: '/services/capability-building',
          link: 'Explore capability building'
        });
      }
    }

    return { score: score, band: band, foundationNote: foundationNote, a: a, priorities: priorities, heading: heading };
  }

  /* --------------------------------------------------------------- views */

  function intro() {
    /* Entering the assessment re-reads the stored session, so the intro always
       reflects what is actually saved — including answers cleared elsewhere or
       recorded in another tab. Mid-run, the in-memory answers stay authoritative. */
    state.answers = restore();
    var answered = state.answers.filter(function (v) { return v != null; }).length;
    return html`
      ${PG.hero('assessment')}
      <section class="bg-paper" style="padding:0 0 clamp(72px,9vw,128px)">
        <div class="wrap stack stack-16" data-reveal="rise" style="align-items:flex-start">
          <button type="button" class="btn" data-start>${answered ? 'Continue the Assessment' : 'Start the Assessment'}</button>
          <span class="small muted" style="max-width:44em">Eight questions. This is an indicative self-assessment, not an audit or a validated industry benchmark. Your answers stay in this browser session unless you choose to share them, and you can view your result without an email address.</span>
        </div>
      </section>`;
  }

  function questions() {
    var q = PG.assessment[state.idx] || { options: [] };
    var cur = state.answers[state.idx];
    var answered = state.answers.filter(function (v) { return v != null; }).length;
    var last = state.idx === 7;

    return html`
      <section style="padding:calc(var(--header-h) + clamp(40px,5vw,72px)) 0 clamp(80px,9vw,144px);min-height:70vh">
        <div class="assess-wrap stack stack-32">
          <div class="row between" style="gap:16px">
            <span class="lbl" style="color:var(--muted)">Question ${state.idx + 1} of 8 · ${q.name}</span>
            <a href="/" style="font-size:14px;color:var(--muted)">Exit assessment</a>
          </div>

          <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="8"
               aria-valuenow="${answered}" aria-label="Questions answered">
            ${each(state.answers, function (v) { return html`<span class="${v != null ? 'done' : ''}"></span>`; })}
          </div>

          <fieldset style="border:0;padding:0;margin:0;display:flex;flex-direction:column;gap:24px">
            <legend id="pg-q" tabindex="-1" style="padding:0;font-size:clamp(26px,3vw,40px);font-weight:500;line-height:1.15;letter-spacing:-.02em;color:var(--navy);text-wrap:balance">${q.question}</legend>
            <div class="stack stack-8">
              ${each(q.options, function (t, i) {
                return html`
                  <label class="option">
                    <input type="radio" name="q${state.idx}" value="${i}" data-pick="${i}"
                           ${raw(cur === i ? 'checked' : '')}>
                    <span>${t}</span>
                  </label>`;
              })}
            </div>
          </fieldset>

          <div class="row between" style="gap:16px;border-top:1px solid var(--line);padding-top:24px">
            <button type="button" class="btn btn-ghost" data-back>Back</button>
            <button type="button" class="btn" data-next ${raw(cur == null ? 'disabled' : '')} style="height:48px">
              ${last ? 'See my result' : 'Continue'}
            </button>
          </div>
        </div>
      </section>`;
  }

  function result() {
    var res = compute();
    var colorFor = function (v) { return v >= 3 ? 'var(--accent)' : (v >= 2 ? 'var(--teal)' : 'var(--navy)'); };

    return html`
      <section aria-live="polite" style="padding:calc(var(--header-h) + clamp(40px,5vw,72px)) 0 clamp(80px,9vw,144px)">
        <div class="wrap stack stack-48" data-reveal="rise">
          <div class="autogrid end" style="--min:380px;--gap:40px;--gap-x:96px">
            <div class="stack stack-20">
              <p class="eyebrow-caps">YOUR INDICATIVE RESULT</p>
              <div class="row" style="gap:16px;align-items:baseline">
                <span class="score">${res.score}</span>
                <span style="font-size:clamp(24px,2.4vw,36px);font-weight:500;color:var(--navy)">${res.band.label}</span>
              </div>
              <p style="font-size:19px;line-height:1.5;max-width:34em">${res.band.text}</p>
              ${when(!!res.foundationNote, function () { return html`<p class="callout">${res.foundationNote}</p>`; })}
              <p class="fine" style="max-width:44em">A low score in a dimension points to the service that usually addresses it; the outputs shown are typical, not a complete solution or commercial scope. Score out of 100 from eight self-reported answers. Indicative only; “AI ready” does not certify security, compliance or suitability for a particular use case.</p>
            </div>

            <div class="stack stack-12" style="align-items:flex-start">
              <button type="button" class="btn" data-discuss>Discuss My Priorities</button>
              ${when(state.askInclude, function () {
                return html`
                  <div role="group" aria-label="Include your result"
                       style="border:1px solid var(--line);border-radius:var(--radius);padding:16px 18px;display:flex;flex-direction:column;gap:12px;max-width:420px">
                    <span class="small">Include your result and priorities in the enquiry? Only the summary is shared; nothing is sent until you submit the form.</span>
                    <div class="row" style="gap:8px">
                      <button type="button" class="btn btn-sm" data-include="yes">Include result</button>
                      <button type="button" class="btn btn-ghost btn-sm" data-include="no">Continue without it</button>
                    </div>
                  </div>`;
              })}
              <div class="row" style="gap:20px">
                <button type="button" class="btn-link" data-print>Print or save result</button>
                <button type="button" class="btn-link subtle" data-restart>Change answers</button>
              </div>
            </div>
          </div>

          <div class="autogrid start" style="--min:400px;--gap:48px;--gap-x:96px;border-top:1px solid var(--line);padding-top:48px">
            <div class="stack stack-20">
              <h2 style="font-size:22px;font-weight:600;color:var(--navy)">Eight dimensions</h2>
              <div class="stack stack-14">
                ${each(PG.assessment, function (d, i) {
                  var v = res.a[i];
                  return html`
                    <div class="dim-row">
                      <span style="color:var(--navy)">${d.name}</span>
                      <span class="meter"><span style="width:${v / 4 * 100}%;background:${colorFor(v)}"></span></span>
                      <span style="font-weight:500;font-size:12px;color:var(--muted);text-align:right">${v}/4</span>
                    </div>`;
                })}
              </div>
            </div>

            <div class="stack stack-20">
              <h2 style="font-size:22px;font-weight:600;color:var(--navy)">${res.heading}</h2>
              <div class="rows">
                ${each(res.priorities, function (p, i) {
                  var slug = (p.href.match(/services\/([a-z-]+)/) || [])[1];
                  var sv = (PG.services || []).find(function (x) { return x.slug === slug; });
                  var outputs = sv && sv.deliverables ? sv.deliverables.slice(0, 3).map(function (d) { return d.title; }) : [];
                  return html`
                    <div style="display:grid;grid-template-columns:32px minmax(0,1fr);gap:12px;padding:18px 0">
                      <span style="font-weight:500;font-size:12px;color:var(--muted);padding-top:4px">0${i + 1}</span>
                      <div class="stack stack-6">
                        <span style="font-weight:600;font-size:17px;color:var(--navy)">${p.title}</span>
                        <span class="small">${p.text}</span>
                        <span class="row" style="gap:6px;margin-top:4px">
                          ${each(outputs, function (o) { return html`<span class="chip">${o}</span>`; })}
                        </span>
                        <a href="${p.href}" style="font-size:14px;font-weight:600;margin-top:2px">${p.link} →</a>
                      </div>
                    </div>`;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>`;
  }

  /* -------------------------------------------------------------- module */

  PG.pages = PG.pages || {};

  PG.pages.assessment = {
    meta: function () {
      return {
        title: 'Readiness Assessment',
        desc: 'Take a structured look at your data, systems and ways of working. Identify practical priorities and the questions worth exploring with your team.',
        heroKey: 'assessment',
        crumbs: [{ name: 'Readiness Assessment', path: '/assessment' }]
      };
    },

    render: function () {
      if (state.phase === 'questions') return questions();
      if (state.phase === 'result') return result();
      return intro();
    },

    mount: function (root, cleanup) {
      var self = this;

      /* Listeners are delegated on `root`, which survives a repaint, so the
         phase swap only has to replace markup and re-arm the hero. */
      function repaint() {
        root.innerHTML = self.render().value;
        PG.hero.unmount();
        PG.hero.mount();
        C.scanReveals(root);
      }

      function focusQuestion() {
        setTimeout(function () {
          var el = document.getElementById('pg-q');
          if (el) el.focus({ preventScroll: true });
          window.scrollTo(0, 0);
        }, 30);
      }

      function begin() {
        var answers = state.answers;
        var answered = answers.filter(function (v) { return v != null; }).length;
        var first = answers.findIndex(function (v) { return v == null; });
        state.phase = answered === 8 ? 'result' : 'questions';
        state.idx = first < 0 ? 0 : first;
        repaint();
        focusQuestion();
      }

      var onClick = function (e) {
        var t = e.target;

        if (t.closest('[data-start]')) { begin(); return; }

        if (t.closest('[data-back]')) {
          if (state.idx === 0) state.phase = 'intro';
          else state.idx -= 1;
          repaint();
          focusQuestion();
          return;
        }

        if (t.closest('[data-next]')) {
          if (state.answers[state.idx] == null) return;
          if (state.idx === 7) state.phase = 'result';
          else state.idx += 1;
          repaint();
          focusQuestion();
          return;
        }

        if (t.closest('[data-discuss]')) { state.askInclude = true; repaint(); return; }

        var inc = t.closest('[data-include]');
        if (inc) {
          var res = compute();
          try {
            if (inc.getAttribute('data-include') === 'yes') {
              sessionStorage.setItem(KEY_SUMMARY,
                'Readiness assessment: ' + res.score + '/100 (' + res.band.label + '). Priorities: ' +
                res.priorities.map(function (p) { return p.title; }).join('; ') + '.');
            } else {
              sessionStorage.removeItem(KEY_SUMMARY);
            }
          } catch (err) { /* ignore */ }
          C.navigate('/contact');
          return;
        }

        if (t.closest('[data-print]')) { window.print(); return; }

        if (t.closest('[data-restart]')) {
          state.phase = 'questions';
          state.idx = 0;
          state.askInclude = false;
          repaint();
          focusQuestion();
        }
      };

      var onChange = function (e) {
        var input = e.target.closest('[data-pick]');
        if (!input) return;
        var a = state.answers.slice();
        a[state.idx] = Number(input.getAttribute('data-pick'));
        state.answers = a;
        persist(a);
        // Re-enable Continue without rebuilding the question.
        var next = root.querySelector('[data-next]');
        if (next) next.disabled = false;
        var bar = root.querySelector('.progress');
        if (bar) {
          C.qsa('span', bar).forEach(function (s, i) { s.classList.toggle('done', a[i] != null); });
          bar.setAttribute('aria-valuenow', String(a.filter(function (v) { return v != null; }).length));
        }
      };

      root.addEventListener('click', onClick);
      root.addEventListener('change', onChange);

      /* The hero CTA on the intro screen starts the assessment in place. */
      var onStartEvent = function () { begin(); };
      window.addEventListener('pg-start-assessment', onStartEvent);

      cleanup(function () {
        root.removeEventListener('click', onClick);
        root.removeEventListener('change', onChange);
        window.removeEventListener('pg-start-assessment', onStartEvent);
        state.askInclude = false;
        state.phase = 'intro';
      });
    }
  };
})();
