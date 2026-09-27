/* Pattern Grid — Insights index. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when;

  /* Deterministic per-article marks: keyed off the title rather than the
     position in the filtered list, so a category filter no longer reshuffles
     the artwork of articles that stayed on screen. */
  function markGeometry(title) {
    var n = 0;
    for (var i = 0; i < title.length; i++) n = (n * 31 + title.charCodeAt(i)) % 997;
    return {
      x: 15 + (n * 17) % 40,
      x2: 45 + (n * 13) % 35,
      y: 25 + (n * 19) % 40
    };
  }

  function serviceOf(slug) {
    return (PG.services || []).find(function (s) { return s.slug === slug; }) || {};
  }

  var selected = 'All';

  function list() {
    return (PG.articles || []).filter(function (a) {
      return selected === 'All' || a.category === selected;
    });
  }

  function cards() {
    var items = list();
    var feature = items[0];
    var rest = items.slice(1);

    return html`
      ${when(!!feature, function () {
        return html`
          <article style="grid-column:1 / -1" class="autogrid" data-reveal="rise">
            <div class="article-mark feature" aria-hidden="true">
              <i style="left:12.5%;top:25%;width:25%;height:2px;background:#38A0C3"></i>
              <i style="left:37.5%;top:25%;width:2px;height:50%;background:#38A0C3"></i>
              <i style="left:37.5%;top:75%;width:50%;height:2px;background:#38A0C3"></i>
            </div>
            <div class="stack stack-12">
              <span class="label-caps">${feature.category.toUpperCase()} · IN PREPARATION</span>
              <h2 style="font-size:clamp(26px,2.6vw,40px);font-weight:600;color:var(--navy);line-height:1.15">${feature.title}</h2>
              <p style="font-size:17px;color:var(--muted);line-height:1.55;max-width:36em">${feature.summary}</p>
            </div>
          </article>`;
      })}

      ${each(rest, function (a) {
        var g = markGeometry(a.title);
        var svc = serviceOf(a.service);
        return html`
          <article class="stack stack-14" style="border-top:1px solid var(--line);padding-top:20px">
            <div class="article-mark" aria-hidden="true">
              <i style="left:${g.x}%;top:${g.y}%;width:30%;height:2px;background:#38A0C3"></i>
              <i style="left:${g.x2}%;top:${g.y}%;width:2px;height:40%;background:#02203D"></i>
            </div>
            <span class="label-caps">${a.category.toUpperCase()} · IN PREPARATION</span>
            <h2 style="font-size:22px;font-weight:600;color:var(--navy);line-height:1.25">${a.title}</h2>
            <p class="small muted">${a.summary}</p>
            <div class="stack stack-6" style="border-top:1px solid rgba(7,19,28,.1);padding-top:12px;font-size:13px">
              <span class="muted">Next question: ${a.next}</span>
              <a href="/services/${a.service}" style="font-weight:600">Related: ${svc.title || ''} →</a>
            </div>
          </article>`;
      })}`;
  }

  PG.pages = PG.pages || {};

  PG.pages.insights = {
    meta: function () {
      return {
        title: 'Insights',
        desc: 'Practical perspectives on data, analytics and AI, written for the people making business decisions.',
        heroKey: 'insights',
        crumbs: [{ name: 'Insights', path: '/insights' }]
      };
    },

    render: function () {
      var names = ['All'].concat(Array.from(new Set((PG.articles || []).map(function (a) { return a.category; }))));

      return html`
        ${PG.hero('insights')}

        <section style="padding:0 0 clamp(40px,5vw,64px)">
          <div class="wrap" data-reveal="rise">
            <p class="small muted" style="max-width:52em">The titles below are commissioned and in preparation; none is published yet. Each opens as a full article once written and approved.</p>
          </div>
        </section>

        <section style="padding:0 0 clamp(64px,8vw,128px)">
          <div class="wrap" data-reveal="rise">
            <div role="group" aria-label="Categories" class="row" style="gap:8px;padding-bottom:32px;border-bottom:1px solid var(--line)">
              ${each(names, function (n) {
                return html`<button type="button" class="toggle" data-cat="${n}" aria-pressed="${n === selected ? 'true' : 'false'}">${n}</button>`;
              })}
            </div>
            <div class="autogrid" data-articles style="--min:340px;--gap:48px;--gap-x:40px;padding-top:48px;align-items:start">
              ${cards()}
            </div>
          </div>
        </section>

        <section style="padding:0 0 clamp(96px,10vw,160px)">
          <div class="wrap row between" data-reveal="rise" style="border-top:1px solid var(--line);padding-top:clamp(56px,7vw,96px);gap:32px 64px">
            <h2 style="font-size:clamp(30px,3.6vw,56px);font-weight:600;line-height:1.08;letter-spacing:-.03em;color:var(--navy);max-width:18ch;text-wrap:balance">Not sure where your data practices stand?</h2>
            <a class="btn" href="/assessment">Assess Your Readiness</a>
          </div>
        </section>`;
    },

    mount: function (root, cleanup) {
      var grid = root.querySelector('[data-articles]');
      var onClick = function (e) {
        var b = e.target.closest('[data-cat]');
        if (!b) return;
        selected = b.getAttribute('data-cat');
        C.qsa('[data-cat]', root).forEach(function (x) {
          x.setAttribute('aria-pressed', x.getAttribute('data-cat') === selected ? 'true' : 'false');
        });
        grid.innerHTML = cards().value;
        C.scanReveals(grid);
      };
      root.addEventListener('click', onClick);
      cleanup(function () {
        root.removeEventListener('click', onClick);
        selected = 'All'; // leaving the page resets the filter
      });
    }
  };
})();
