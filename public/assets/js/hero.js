/* Pattern Grid — hero: one photograph (or, on the home page, a decision
   workspace) beside the category, proposition, supporting sentence and two
   actions. No slideshow: the first screen is the message, not a mood. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when, raw = C.raw;

  var SIZES = {
    home: 'clamp(560px, 86svh, 900px)',
    marketing: 'clamp(500px, 72svh, 800px)',
    compact: 'clamp(380px, 48svh, 560px)'
  };
  var H1 = {
    home: 'var(--h1-home)',
    marketing: 'var(--h1)',
    compact: 'var(--h1-utility)'
  };

  var live = null;

  function heroFor(key) {
    return (PG.heroes && (PG.heroes[key] || PG.heroes.home)) ||
      { lines: [], images: [], lead: '', size: 'marketing' };
  }

  /* Constrained connections get the first frame only when it is needed. */
  function saveData() {
    var c = navigator.connection;
    return !!(c && (c.saveData || /(^|-)2g$|^3g$/.test(c.effectiveType || '')));
  }

  /* The first frame of the next route is the LCP candidate: ask for it before
     the markup exists. Idempotent per key. */
  function preloadLocal(local, key) {
    if (document.head.querySelector('link[data-hero-preload="' + key + '"]')) return;
    [[local.m, '(max-width: 720px)'], [local.d, '(min-width: 721px)']].forEach(function (pair) {
      var l = document.createElement('link');
      l.rel = 'preload';
      l.as = 'image';
      l.href = C.href(pair[0]);
      l.media = pair[1];
      l.setAttribute('fetchpriority', 'high');
      l.setAttribute('data-hero-preload', key);
      document.head.appendChild(l);
    });
  }

  function slide(k) {
    var img = PG.img.get(k);
    var local = PG.local && PG.local[k];
    if (local) {
      preloadLocal(local, k);
      var set = local.d1200 ? C.href(local.d1200) + ' 1200w, ' + C.href(local.d) + ' ' + local.w + 'w' : '';
      return html`
        <div class="hero-slide" data-slide style="--focal:${img.focal};--focal-m:${img.focalMobile};background-image:url('${local.lqip}')">
          <picture>
            <source media="(max-width: 720px)" srcset="${C.href(local.m)}" width="${local.mw || 900}" height="${local.mh || 1200}">
            <img src="${C.href(local.d)}" ${raw(set ? 'srcset="' + C.esc(set) + '" sizes="100vw"' : '')} width="${local.w}" height="${local.h}" alt="${img.alt}" decoding="async" fetchpriority="high">
          </picture>
        </div>`;
    }
    return html`
      <div class="hero-slide" data-slide style="--focal:${img.focal};--focal-m:${img.focalMobile};background-image:url('${img.lqip}')">
        <img src="${img.src}" srcset="${img.srcSet}" sizes="100vw" width="2400" height="1600" alt="${img.alt}" decoding="async" fetchpriority="high">
      </div>`;
  }

  function copy(h, rm, opts) {
    var lines = h.lines || [];
    return html`
      ${when(!!h.eyebrow, function () { return html`<span class="hero-eyebrow">${h.eyebrow}</span>`; })}
      ${when(lines.length > 0, function () {
        return html`<h1>${each(lines, function (t, i) {
          return html`<span class="ln"><span style="--d:${rm ? 0 : 80 + i * 70}ms">${t}</span></span>`;
        })}</h1>`;
      })}
      ${when(!!h.lead, function () { return html`<p class="hero-lead">${h.lead}</p>`; })}
      ${when(!!h.action, function () {
        return html`
          <div class="hero-cta">
            <a class="btn btn-accent" href="${h.action.href}"
               ${raw(h.action.event ? 'data-hero-event="' + C.esc(h.action.event) + '"' : '')}>${h.action.label}</a>
            ${when(!!h.walkthrough, function () {
              return html`<button type="button" class="walk-btn" data-walkthrough aria-pressed="false"><span class="play" aria-hidden="true">▶</span>${h.walkthrough}</button>`;
            })}
            ${when(!!h.secondary, function () {
              return html`<a class="secondary${h.walkthrough ? ' text' : ''}" href="${h.secondary.href}">${h.secondary.label} <span aria-hidden="true">→</span></a>`;
            })}
          </div>
          ${when(!!h.walkthrough, function () { return html`<div class="walk-progress" data-walk-progress hidden aria-hidden="true"><i></i></div>`; })}`;
      })}`;
  }

  PG.hero = function (key, opts) {
    opts = opts || {};
    var h = heroFor(key);
    var rm = C.motion.reduced;
    var size = h.size || 'marketing';
    var images = h.images || [];

    if (h.scene) {
      return html`
        <div class="hero-unit" data-hero="${key}">
          <section class="hero hero-home grid-field${size !== 'home' ? ' is-service' : ''}" aria-label="${(h.lines || []).join(' ')}">
            <div class="hero-inner">
              <div class="hero-copy">${copy(h, rm, opts)}</div>
              <div class="hero-scene" data-scene="${h.scene || 'bi'}" ${raw(size !== 'home' ? 'data-scene-compact data-scene-preview' : '')} aria-label="Illustrative workspace"></div>
            </div>
          </section>
        </div>`;
    }

    return html`
      <div class="hero-unit" data-hero="${key}">
        <section class="hero hero-photo${images.length ? '' : ' grid-field'}" aria-label="${(h.lines || []).join(' ') || 'Page introduction'}"
                 style="--hero-h:${SIZES[size] || SIZES.marketing};--hero-h1:${H1[size] || H1.marketing}">
          ${when(images.length > 0, function () { return slide(images[0]); })}
          <div class="hero-scrim" aria-hidden="true"></div>
          <div class="hero-inner">${copy(h, rm, opts)}</div>
        </section>
        ${when(!!h.statement, function () {
          var words = C.tokenise(h.statement);
          return html`
            <section class="statement${h.tone === 'dark' ? ' is-dark' : ''}" data-statement aria-label="In short">
              <div class="statement-inner">
                <p>${each(words, function (w, i) {
                  return html`<span data-w="${i}"${raw(w.strong ? ' data-strong="1"' : '')}>${w.text} </span>`;
                })}</p>
              </div>
            </section>`;
        })}
      </div>`;
  };

  PG.hero.mount = function () {
    PG.hero.unmount();
    var unit = document.querySelector('[data-hero]');
    var tc = document.head.querySelector('meta[name="theme-color"]');
    if (!unit) { if (tc) tc.setAttribute('content', '#FFFFFF'); window.dispatchEvent(new CustomEvent('pg-hero', { detail: false })); return; }
    if (tc) tc.setAttribute('content', unit.querySelector('.hero-home') ? '#02203D' : '#07131C');
    window.dispatchEvent(new CustomEvent('pg-hero', { detail: true }));

    var inst = { listeners: [] };
    live = inst;
    function on(target, type, fn, o) { target.addEventListener(type, fn, o); inst.listeners.push([target, type, fn, o]); }

    var s = unit.querySelector('[data-slide]');
    var img = s && s.querySelector('img');
    if (img) {
      var done = function () { img.classList.add('is-loaded'); };
      var fail = function () { s.classList.add('is-failed'); };
      if (img.complete && img.naturalWidth > 0) done();
      else if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) fail();
      else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', fail, { once: true }); }
    }

    on(unit, 'click', function (e) {
      var a = e.target.closest('[data-hero-event]');
      if (!a) return;
      e.preventDefault();
      window.dispatchEvent(new CustomEvent(a.getAttribute('data-hero-event')));
    });

    /* The statement fills in word by word as it passes through the viewport;
       complete at once under reduced motion. */
    var stEl = unit.querySelector('[data-statement]');
    if (stEl) {
      var h = heroFor(unit.getAttribute('data-hero'));
      var spans = C.qsa('[data-w]', stEl);
      var dark = h.tone === 'dark';
      var startC = dark ? '#9AA4AC' : '#646B70';
      var endC = dark ? '#FFFFFF' : '#07131C';
      var emC = dark ? '#38A0C3' : '#17647D';
      var N = spans.length;
      var lastP = -1;
      var paint = function (p) {
        if (Math.abs(p - lastP) < 0.003) return;
        lastP = p;
        spans.forEach(function (sp, i) {
          var t = Math.max(0, Math.min(1, p * (N + 4) - i));
          sp.style.color = C.mix(startC, sp.hasAttribute('data-strong') ? emC : endC, t);
        });
      };
      var raf = null;
      var measure = function () {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = stEl.querySelector('p').getBoundingClientRect();
          var vh = window.innerHeight || 800;
          paint(Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (vh * 0.65 - r.height * 0.15))));
        });
      };
      var repaint = function () { lastP = -1; if (C.motion.reduced || document.documentElement.classList.contains('is-static')) paint(1); else measure(); };
      repaint();
      on(window, 'scroll', measure, { passive: true });
      on(window, 'resize', measure);
      on(window, 'pg-motion', repaint);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (live === inst) repaint(); });
    }
  };

  /* Map a route to its hero key and fetch the first frame into cache. */
  PG.hero.warm = function (path) {
    if (saveData()) return;
    var p = path.replace(/^\/+|\/+$/g, '');
    var key = p === '' ? 'home' :
      p === 'about/precious-celestine' ? 'founder' :
      p === 'about' ? 'about' :
      (PG.heroes && PG.heroes[p]) ? p : null;
    if (!key || !PG.heroes[key] || !PG.heroes[key].images || !PG.heroes[key].images.length) return;
    var k = PG.heroes[key].images[0];
    var local = PG.local && PG.local[k];
    var probe = new Image();
    if (local) {
      probe.src = C.href(window.innerWidth <= 720 ? local.m : local.d);
      return;
    }
    var img = PG.img.get(k);
    probe.sizes = '100vw';
    probe.srcset = img.srcSet;
    probe.src = img.src;
  };

  PG.hero.unmount = function () {
    if (!live) return;
    live.listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
    live = null;
  };
})();
