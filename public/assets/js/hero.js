/* Pattern Grid — hero: one photograph (or, on the home page, a decision
   workspace) beside the category, proposition, supporting sentence and two
   actions. No slideshow: the first screen is the message, not a mood. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when, raw = C.raw;

  var SIZES = {
    marketing: 'clamp(460px, 62svh, 720px)',
    compact: 'clamp(380px, 48svh, 560px)'
  };
  var H1 = {
    marketing: 'var(--h1-compact)',
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
            ${when(!!h.secondary, function () {
              return html`<a class="secondary" href="${h.secondary.href}">${h.secondary.label} <span aria-hidden="true">→</span></a>`;
            })}
          </div>`;
      })}`;
  }

  PG.hero = function (key, opts) {
    opts = opts || {};
    var h = heroFor(key);
    var rm = C.motion.reduced;
    var size = h.size || 'marketing';
    var images = h.images || [];

    if (size === 'home') {
      return html`
        <div class="hero-unit" data-hero="${key}">
          <section class="hero hero-home" aria-label="${(h.lines || []).join(' ')}">
            <div class="hero-inner">
              <div class="hero-copy">${copy(h, rm, opts)}</div>
              <div class="hero-scene" data-scene="${h.scene || 'bi'}" aria-label="Illustrative decision workspace"></div>
            </div>
          </section>
        </div>`;
    }

    return html`
      <div class="hero-unit" data-hero="${key}">
        <section class="hero hero-photo" aria-label="${(h.lines || []).join(' ') || 'Page introduction'}"
                 style="--hero-h:${SIZES[size] || SIZES.marketing};--hero-h1:${H1[size] || H1.marketing}">
          ${when(images.length > 0, function () { return slide(images[0]); })}
          <div class="hero-scrim" aria-hidden="true"></div>
          <div class="hero-inner">${copy(h, rm, opts)}</div>
        </section>
      </div>`;
  };

  PG.hero.mount = function () {
    PG.hero.unmount();
    var unit = document.querySelector('[data-hero]');
    if (!unit) { window.dispatchEvent(new CustomEvent('pg-hero', { detail: false })); return; }
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
