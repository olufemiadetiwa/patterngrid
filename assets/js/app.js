/* Pattern Grid — routing table and page lifecycle. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;

  var pageEl = document.getElementById('page');
  var mainEl = document.getElementById('main');

  var teardown = [];
  function cleanup(fn) { teardown.push(fn); }

  function runTeardown() {
    teardown.forEach(function (fn) { try { fn(); } catch (e) { /* keep going */ } });
    teardown = [];
    PG.hero.unmount();
  }

  var firstPaint = true;

  function show(mod, params, ctx) {
    runTeardown();

    var view = mod.render(params, ctx);
    pageEl.innerHTML = view.value !== undefined ? view.value : String(view);

    /* Reset the scroll before painting the shell, so the header reads the new
       position and renders transparent over a hero rather than solid. */
    if (!firstPaint) window.scrollTo(0, 0);

    var meta = mod.meta ? mod.meta(params, ctx) : {};
    PG.seo(meta);

    PG.hero.mount();
    PG.shell.paint();
    if (mod.mount) mod.mount(pageEl, cleanup, params, ctx);
    C.armImages(pageEl);
    C.scanReveals(pageEl);

    /* Move focus to the main landmark so a keyboard or screen-reader user
       lands on the new page rather than back at the top of the document. */
    if (!firstPaint && mainEl) mainEl.focus({ preventScroll: true });

    /* Deep anchors such as /services/data-engineering#svc-approach. */
    var anchor = location.hash && location.hash.length > 1 && document.getElementById(location.hash.slice(1));
    if (anchor) {
      requestAnimationFrame(function () {
        anchor.scrollIntoView({ block: 'start', behavior: 'auto' });
        window.scrollBy(0, -24);
      });
    }
    firstPaint = false;
  }

  /* A short cross-fade between routes, as in the prototype. */
  var pendingSwap = null;
  function transition(mod, params, ctx) {
    if (ctx.initial || C.motion.reduced) { show(mod, params, ctx); return; }
    pageEl.classList.add('is-leaving');
    clearTimeout(pendingSwap);
    pendingSwap = setTimeout(function () {
      show(mod, params, ctx);
      pageEl.classList.remove('is-leaving');
    }, 180);
  }

  function page(name) {
    return function (params, ctx) {
      var mod = PG.pages[name];
      if (!mod) { transition(PG.pages.notFound, params, ctx); return; }
      transition(mod, params, ctx);
    };
  }

  /* ------------------------------------------------------------- routes */

  C.route('/', page('home'));

  C.route('/services', page('services'));
  C.route('/services/:slug', function (params, ctx) {
    var hit = (PG.services || []).some(function (s) { return s.slug === params.slug; });
    transition(hit ? PG.pages.services : PG.pages.notFound, params, ctx);
  });

  C.route('/industries', page('industries'));
  C.route('/industries/:slug', function (params, ctx) {
    var hit = (PG.industries || []).some(function (s) { return s.slug === params.slug; });
    transition(hit ? PG.pages.industries : PG.pages.notFound, params, ctx);
  });

  C.route('/work', page('work'));
  C.route('/work/:slug', function (params, ctx) {
    var hit = (PG.work || []).some(function (s) { return s.slug === params.slug; });
    transition(hit ? PG.pages.work : PG.pages.notFound, params, ctx);
  });

  C.route('/insights', page('insights'));

  C.route('/about', function (params, ctx) { transition(PG.pages.about, { view: 'about' }, ctx); });
  C.route('/about/precious-celestine', function (params, ctx) { transition(PG.pages.about, { view: 'founder' }, ctx); });
  C.route('/approach', function (params, ctx) { transition(PG.pages.about, { view: 'approach' }, ctx); });

  C.route('/assessment', page('assessment'));
  C.route('/contact', page('contact'));

  C.route('/privacy', function (params, ctx) { transition(PG.pages.legal, { view: 'privacy' }, ctx); });
  C.route('/terms', function (params, ctx) { transition(PG.pages.legal, { view: 'terms' }, ctx); });

  C.route('/404', function (params, ctx) { transition(PG.pages.notFound, params, ctx); });

  /* --------------------------------------------------------------- boot */

  C.normaliseEntryUrl();
  C.render({ initial: true });

  /* Hover intent: start fetching the next page's opening photograph before
     the click, so the hero arrives sharp instead of blurred. */
  var warmed = {};
  document.addEventListener('mouseover', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="/"]');
    if (!a || !window.matchMedia('(hover: hover)').matches) return;
    var path = a.getAttribute('href').split('?')[0].split('#')[0];
    if (warmed[path]) return;
    warmed[path] = true;
    PG.hero.warm(path);
  }, { passive: true });

  /* Keep header/footer state in step with the motion preference. */
  window.addEventListener('pg-motion', function () { PG.shell.refreshHeader(); });

  /* Content files announce themselves; re-render if they land late. */
  window.addEventListener('pg-content', function () { C.render(); });
})();
