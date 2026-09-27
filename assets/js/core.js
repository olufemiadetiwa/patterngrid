/* Pattern Grid — core runtime.
   A tagged-template renderer, a History-API router, scroll reveals and a
   motion preference. Roughly 8 KB in place of React + the design runtime. */
(function () {
  'use strict';

  var PG = (window.PG = window.PG || {});
  var core = (PG.core = {});

  /* ----------------------------------------------------------- templates */

  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return ESC[c]; });
  }

  /* Marks a string as already-safe markup so `html` will not escape it. */
  function Raw(value) { this.value = value; }
  function raw(value) { return new Raw(value); }

  function flatten(v) {
    if (v == null || v === false || v === true) return '';
    if (v instanceof Raw) return v.value;
    if (Array.isArray(v)) return v.map(flatten).join('');
    return esc(v);
  }

  /* html`<p>${value}</p>` — interpolations are escaped unless wrapped in raw(). */
  function html(strings) {
    var out = strings[0];
    for (var i = 1; i < arguments.length; i++) {
      out += flatten(arguments[i]) + strings[i];
    }
    return new Raw(out);
  }

  /* Conditionally emit markup. */
  function when(cond, fn) { return cond ? fn() : ''; }

  /* Map a list to markup. */
  function each(list, fn) { return (list || []).map(fn); }

  /* Build a class attribute from a map or list. */
  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) {
      var a = arguments[i];
      if (!a) continue;
      if (typeof a === 'string') out.push(a);
      else if (Array.isArray(a)) out.push(cx.apply(null, a));
      else for (var k in a) if (a[k]) out.push(k);
    }
    return out.join(' ');
  }

  core.esc = esc;
  core.raw = raw;
  core.html = html;
  core.when = when;
  core.each = each;
  core.cx = cx;

  /* --------------------------------------------------------------- misc */

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  core.qs = qs;
  core.qsa = qsa;

  /* Emphasis markers in the content model: **phrase** */
  core.tokenise = function (text) {
    var words = [];
    var strong = false;
    String(text || '').split(/\s+/).filter(Boolean).forEach(function (token) {
      var t = token, open = false, close = false;
      if (t.indexOf('**') === 0) { open = true; t = t.slice(2); }
      if (/\*\*[.,;:]?$/.test(t)) { close = true; t = t.replace('**', ''); }
      if (open) strong = true;
      words.push({ text: t, strong: strong });
      if (close) strong = false;
    });
    return words;
  };

  core.mix = function (a, b, t) {
    function parse(h) {
      return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    }
    var A = parse(a), B = parse(b);
    return '#' + A.map(function (v, i) {
      return Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0');
    }).join('');
  };

  core.pad2 = function (n) { return String(n).padStart(2, '0'); };

  /* ------------------------------------------------------------- images */

  /* A photograph in a frame: blurred 32 px preview underneath, the real file
     fades over it once decoded, clip-revealed as it scrolls into view. */
  core.frame = function (img, o) {
    o = o || {};
    return raw(
      '<div class="frame' + (o.cls ? ' ' + esc(o.cls) : '') + '"' +
      (o.reveal === false ? '' : ' data-reveal="clip"') +
      ' style="--ar:' + esc(o.ar || '16 / 10') + ';--focal:' + esc(img.focal) + ';--focal-m:' + esc(img.focalMobile || img.focal) +
      ';background-image:url(\'' + esc(img.lqip) + '\')' + (o.style ? ';' + esc(o.style) : '') + '">' +
      '<img src="' + esc(img.src) + '" srcset="' + esc(img.srcSet) + '" sizes="' + esc(o.sizes || '(min-width: 960px) 50vw, 100vw') + '"' +
      ' width="2400" height="1600" alt="' + esc(img.alt) + '" loading="' + (o.eager ? 'eager' : 'lazy') + '" decoding="async">' +
      (img.credit ? '<span class="credit" aria-hidden="true">Photo: ' + esc(img.credit) + '</span>' : '') +
      '</div>');
  };

  /* A person's portrait, or a clearly reserved frame when no approved
     photograph exists yet. Never a stock face. */
  core.portrait = function (person, o) {
    o = o || {};
    if (person && person.photo) {
      return core.frame(PG.img.get(person.photo), { ar: o.ar || '4 / 5', sizes: o.sizes || '(min-width: 960px) 40vw, 100vw', cls: 'portrait' });
    }
    var cells = '';
    for (var i = 0; i < 9; i++) cells += i === 4 ? '<i class="on"></i>' : '<i></i>';
    return raw(
      '<div class="portrait reserved" style="--ar:' + esc(o.ar || '4 / 5') + '" role="img" aria-label="' +
      esc(o.label || 'Portrait to be supplied') + '"><div class="rv"><span class="glyph" aria-hidden="true">' + cells +
      '</span><span>' + esc(o.label || 'Portrait to be supplied') + '</span></div></div>');
  };

  /* Flags framed images as loaded so they fade in; safe to call repeatedly. */
  core.armImages = function (root) {
    qsa('.frame img:not([data-armed])', root).forEach(function (img) {
      img.setAttribute('data-armed', '1');
      var done = function () { img.classList.add('is-loaded'); };
      if (img.complete && img.naturalWidth > 0) { done(); return; }
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    });
  };

  /* ------------------------------------------------------------- motion */

  var motion = (core.motion = {
    reduced: false,
    read: function () {
      try {
        var s = localStorage.getItem('pg-reduce-motion');
        if (s !== null) return s === '1';
      } catch (e) { /* storage blocked */ }
      return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    },
    set: function (v) {
      motion.reduced = v;
      try { localStorage.setItem('pg-reduce-motion', v ? '1' : '0'); } catch (e) { /* ignore */ }
      document.documentElement.classList.toggle('reduce-motion', v);
      window.dispatchEvent(new CustomEvent('pg-motion', { detail: v }));
    },
    toggle: function () { motion.set(!motion.reduced); }
  });

  motion.reduced = motion.read();
  document.documentElement.classList.toggle('reduce-motion', motion.reduced);

  /* ------------------------------------------------------------ reveals */

  var revealIO = null;
  var pending = new Set();

  function show(el) {
    if (motion.reduced) el.style.transition = 'none';
    el.classList.remove('is-armed');
    el.classList.add('is-in');
    pending.delete(el);
    if (revealIO) revealIO.unobserve(el);
    clearTimeout(el._pgTimer);
  }

  core.scanReveals = function (root) {
    if (motion.reduced || !('IntersectionObserver' in window)) return;
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) show(e.target); });
      }, { threshold: 0.05, rootMargin: '0px 0px -4% 0px' });
    }
    qsa('[data-reveal]:not([data-armed])', root).forEach(function (el) {
      el.setAttribute('data-armed', '1');
      // Already on screen at mount: leave it visible rather than fading it in.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
      el.classList.add('is-armed');
      pending.add(el);
      revealIO.observe(el);
      // Safety net: never leave content hidden if the observer misses it.
      el._pgTimer = setTimeout(function () { show(el); }, 2500);
    });
  };

  var revealRaf = null;
  function revealOnScroll() {
    if (revealRaf) return;
    revealRaf = requestAnimationFrame(function () {
      revealRaf = null;
      var vh = window.innerHeight;
      pending.forEach(function (el) {
        var b = el.getBoundingClientRect();
        if (b.top < vh * 0.96 && b.bottom > 0) show(el);
      });
    });
  }
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('resize', revealOnScroll);
  window.addEventListener('pg-motion', function () {
    if (motion.reduced) { pending.forEach(show); }
  });

  /* ------------------------------------------------------------- router */

  /* Routes are real paths. Legacy `#/...` links from the prototype are
     translated to paths on the way in, so old links keep working. */

  /* Sub-path hosting (GitHub project pages): every route and asset lives
     under BASE. Empty string on a root host. */
  var BASE = window.PG_BASE || '';
  core.base = BASE;
  core.href = function (path) { return BASE + path; };

  var routes = [];
  var current = null;

  core.route = function (pattern, handler) {
    var names = [];
    var rx = new RegExp('^' + pattern.replace(/:[a-z]+/gi, function (m) {
      names.push(m.slice(1));
      return '([^/]+)';
    }).replace(/\/$/, '') + '/?$');
    routes.push({ rx: rx, names: names, handler: handler, pattern: pattern });
  };

  core.resolve = function (path) {
    for (var i = 0; i < routes.length; i++) {
      var m = routes[i].rx.exec(path);
      if (!m) continue;
      var params = {};
      routes[i].names.forEach(function (n, j) { params[n] = decodeURIComponent(m[j + 1]); });
      return { route: routes[i], params: params };
    }
    return null;
  };

  core.currentPath = function () { return current; };

  function hashToPath(hash) {
    if (!hash || hash.charAt(0) !== '#') return null;
    var body = hash.slice(1);
    if (body.charAt(0) !== '/') return null;
    return body;
  }

  core.navigate = function (to, opts) {
    opts = opts || {};
    var url = new URL(to, location.origin);
    var next = url.pathname + url.search;
    if (!opts.replace && next === current) return;
    if (opts.replace) history.replaceState({}, '', BASE + next);
    else history.pushState({}, '', BASE + next);
    core.render(opts);
  };

  var onBeforeRender = [];
  core.beforeRender = function (fn) { onBeforeRender.push(fn); };

  core.render = function (opts) {
    opts = opts || {};
    var path = location.pathname;
    if (BASE && path.indexOf(BASE) === 0) path = path.slice(BASE.length);
    path = path.replace(/\/+$/, '') || '/';
    var match = core.resolve(path) || core.resolve('/404');
    current = path;
    onBeforeRender.forEach(function (fn) { fn(path, match); });
    match.route.handler(match.params, { path: path, initial: !!opts.initial, query: new URLSearchParams(location.search) });
  };

  /* Intercept in-app links, including legacy hash links. */
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;

    var href = a.getAttribute('href');
    if (!href) return;

    var hashPath = hashToPath(href);
    if (hashPath) {
      e.preventDefault();
      core.navigate(hashPath === '/' ? '/' : hashPath);
      return;
    }
    if (href.charAt(0) === '#') {
      // With a <base> set for sub-path hosting, a bare "#main" would resolve
      // against the base URL and navigate away; handle it in-document instead.
      var target = href.length > 1 && document.getElementById(href.slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ block: 'start' });
        if (typeof target.focus === 'function') target.focus({ preventScroll: true });
      }
      return;
    }

    var url;
    try { url = new URL(href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin) return;

    e.preventDefault();
    // Markup links are written root-relative (/services/x); strip a base if the
    // browser resolved one in, so navigate() can add it back exactly once.
    var p = url.pathname;
    if (BASE && p.indexOf(BASE) === 0) p = p.slice(BASE.length);
    core.navigate((p || '/') + url.search);
  });

  window.addEventListener('popstate', function () { core.render(); });

  /* A bookmark such as /#/services still lands on the hash form — rewrite it
     once at boot so the canonical path is what the user (and crawlers) see. */
  core.normaliseEntryUrl = function () {
    var p = hashToPath(location.hash);
    if (p) history.replaceState({}, '', BASE + p);
  };

  /* Static hosts commonly serve 404.html for unknown paths; that page stores
     the requested path so the app can restore it without a second round trip. */
  try {
    var redirected = sessionStorage.getItem('pg-redirect');
    if (redirected) {
      sessionStorage.removeItem('pg-redirect');
      history.replaceState({}, '', BASE + redirected);
    }
  } catch (e) { /* ignore */ }
})();
