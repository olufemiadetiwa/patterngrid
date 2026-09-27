/* Pattern Grid — application shell: header, mega menus, mobile drawer, footer. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when, raw = C.raw;

  var shell = (PG.shell = {});

  var state = {
    menu: null,          // 'services' | 'industries' | 'about' | null
    drawerOpen: false,
    scrolled: false,
    hasHero: true
  };

  function glyph(lightOnDark) {
    var cells = '';
    for (var i = 0; i < 9; i++) cells += i === 4 ? '<i class="on"></i>' : '<i></i>';
    return raw('<span class="glyph" aria-hidden="true"' +
      (lightOnDark ? ' style="color:#fff"' : '') + '>' + cells + '</span>');
  }

  function servicePath(s) { return '/services/' + s.slug; }
  function industryPath(i) { return '/industries/' + i.slug; }

  /* ------------------------------------------------------------- header */

  function megaServices() {
    return html`
      <div class="mega" role="region" aria-label="Services menu" data-mega="services">
        <div class="mega-inner mega-services">
          <div class="mega-list">
            ${each(PG.services, function (s) {
              return html`
                <a class="mega-link" href="${servicePath(s)}">
                  <span class="idx">${s.index}</span>
                  <span>
                    <span class="t">${s.title}</span>
                    <span class="d">${s.short}</span>
                  </span>
                </a>`;
            })}
            <a class="mega-link more" href="/services"><span></span><span>All services →</span></a>
          </div>
          <div class="mega-aside">
            <div class="mega-bars" aria-hidden="true">
              <b></b><b></b><b class="on"></b><b></b><b></b>
              <span>Strategy</span><span>Engineering</span><span>BI</span><span>AI</span><span>Capability</span>
            </div>
            <p class="small muted">Five services that build on each other. Start with the problem in front of you; we add the next step only if it is needed.</p>
            <a href="/assessment" style="font-weight:600;font-size:15px">Not sure where to start? Take the readiness assessment →</a>
          </div>
        </div>
      </div>`;
  }

  function megaIndustries() {
    return html`
      <div class="mega" role="region" aria-label="Industries menu" data-mega="industries">
        <div class="mega-row">
          ${each(PG.industries, function (i) {
            return html`<a class="mega-chip" href="${industryPath(i)}">${i.title}</a>`;
          })}
          <a class="mega-chip more" href="/industries">All industries →</a>
        </div>
      </div>`;
  }

  function megaAbout() {
    return html`
      <div class="mega" role="region" aria-label="About menu" data-mega="about">
        <div class="mega-row">
          <a class="mega-chip" href="/about">About Pattern Grid</a>
          <a class="mega-chip" href="/approach">Our Approach</a>
          <a class="mega-chip" href="/about/precious-celestine">Founder</a>
        </div>
      </div>`;
  }

  /* Unfinished editorial stays off the live navigation (brief §07). */
  function insightsLive() { return (PG.articles || []).some(function (a) { return a.published; }); }

  function sectionOf(path) {
    if (path === '/') return 'home';
    return path.split('/')[1] || 'home';
  }

  function headerMarkup() {
    var path = C.currentPath() || '/';
    var sec = sectionOf(path);
    var onDark = state.hasHero && !state.scrolled && !state.menu;

    function navBtn(key, label) {
      var open = state.menu === key;
      var currentSec = key === 'about' ? (sec === 'about' || sec === 'approach') : sec === key;
      return html`
        <button type="button" class="nav-item" data-menu="${key}"
                aria-expanded="${open ? 'true' : 'false'}" aria-haspopup="true"
                ${raw(currentSec ? 'aria-current="page"' : '')}>
          ${label} <span class="caret" aria-hidden="true">▾</span>
        </button>`;
    }

    return html`
      <div class="header-inner">
        <a class="brand" href="/" aria-label="Pattern Grid home">
          ${glyph()}<span>Pattern Grid</span>
        </a>

        <nav class="nav" aria-label="Primary">
          ${navBtn('services', 'Services')}
          ${navBtn('industries', 'Industries')}
          <a class="nav-item" href="/work" data-close-menu ${raw(sec === 'work' ? 'aria-current="page"' : '')}>Our Work</a>
          ${when(insightsLive(), function () { return html`<a class="nav-item" href="/insights" data-close-menu ${raw(sec === 'insights' ? 'aria-current="page"' : '')}>Insights</a>`; })}
          ${navBtn('about', 'About')}
        </nav>

        <div class="header-actions">
          <a class="header-link" href="/assessment">Readiness assessment</a>
          <a class="header-cta" href="/contact">Book a consultation</a>
        </div>

        <div class="mobile-actions">
          <a class="mobile-cta" href="/contact">Book</a>
          <button type="button" class="menu-btn" data-drawer-open aria-label="Open menu"
                  aria-expanded="${state.drawerOpen ? 'true' : 'false'}">Menu</button>
        </div>
      </div>
      ${when(state.menu === 'services', megaServices)}
      ${when(state.menu === 'industries', megaIndustries)}
      ${when(state.menu === 'about', megaAbout)}`;
  }

  function paintHeader() {
    var el = document.getElementById('header');
    /* Read the scroll position rather than trusting the last scroll event:
       a route change resets the page to the top without firing one. */
    state.scrolled = window.scrollY > 24;
    var onDark = state.hasHero && !state.scrolled && !state.menu;
    el.classList.toggle('is-solid', !onDark);
    el.innerHTML = headerMarkup().value;
  }

  /* ------------------------------------------------------------- drawer */

  function drawerMarkup() {
    return html`
      <div class="drawer" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="drawer-top">
          <span style="font-weight:600;font-size:18px">Pattern Grid</span>
          <button type="button" class="drawer-close" data-drawer-close>Close</button>
        </div>
        <nav aria-label="Mobile">
          <details>
            <summary>Services</summary>
            <div>
              ${each(PG.services, function (s) { return html`<a href="${servicePath(s)}">${s.title}</a>`; })}
              <a class="hi" href="/services">All services</a>
            </div>
          </details>
          <details>
            <summary>Industries</summary>
            <div>
              ${each(PG.industries, function (i) { return html`<a href="${industryPath(i)}">${i.title}</a>`; })}
              <a class="hi" href="/industries">All industries</a>
            </div>
          </details>
          <a href="/work">Our Work</a>
          ${when(insightsLive(), function () { return html`<a href="/insights">Insights</a>`; })}
          <details>
            <summary>About</summary>
            <div>
              <a href="/about">About Pattern Grid</a>
              <a href="/approach">Our Approach</a>
              <a href="/about/precious-celestine">Founder</a>
            </div>
          </details>
          <a href="/assessment">Readiness assessment</a>
        </nav>
        <a class="drawer-cta" href="/contact">Book a consultation</a>
      </div>`;
  }

  var lastFocus = null;

  function openDrawer() {
    if (state.drawerOpen) return;
    lastFocus = document.activeElement;
    state.drawerOpen = true;
    document.body.style.overflow = 'hidden';
    var host = document.getElementById('drawer');
    host.innerHTML = drawerMarkup().value;
    var close = host.querySelector('[data-drawer-close]');
    if (close) close.focus();
    paintHeader();
  }

  function closeDrawer() {
    if (!state.drawerOpen) return;
    state.drawerOpen = false;
    document.body.style.overflow = '';
    document.getElementById('drawer').innerHTML = '';
    paintHeader();
    if (lastFocus && lastFocus.isConnected) lastFocus.focus();
  }

  shell.closeDrawer = closeDrawer;

  /* Keep tabbing inside the open drawer. */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (state.drawerOpen) { closeDrawer(); return; }
      if (state.menu) {
        var key = state.menu;
        state.menu = null;
        paintHeader();
        var btn = document.querySelector('[data-menu="' + key + '"]');
        if (btn) btn.focus();
      }
      return;
    }
    if (e.key !== 'Tab' || !state.drawerOpen) return;
    var host = document.getElementById('drawer');
    var items = C.qsa('a[href], button, summary', host).filter(function (n) { return n.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ------------------------------------------------------------- footer */

  function footerMarkup() {
    return html`
      <div class="footer-inner">
        <div class="footer-cols">
          <div>
            <div class="brand" style="cursor:default">${glyph(true)}<span>Pattern Grid</span></div>
            <p style="margin-top:16px;font-size:16px;color:rgba(255,255,255,.75);line-height:1.5;max-width:30ch">The data systems behind better business decisions.</p>
            <p style="margin-top:16px;font-size:14px;color:rgba(255,255,255,.6);max-width:32ch">Data and AI consulting for African and international organisations.</p>
          </div>
          <div>
            <p class="footer-head">SERVICES</p>
            <div class="stack stack-10">
              ${each(PG.services, function (s) { return html`<a href="${servicePath(s)}">${s.title}</a>`; })}
            </div>
          </div>
          <div>
            <p class="footer-head">INDUSTRIES</p>
            <div class="stack stack-10">
              ${each(PG.industries, function (i) { return html`<a href="${industryPath(i)}">${i.title}</a>`; })}
            </div>
          </div>
          <div>
            <p class="footer-head">ABOUT</p>
            <div class="stack stack-10">
              <a href="/about">About</a>
              <a href="/approach">Our Approach</a>
              <a href="/work">Our Work</a>
              ${when(insightsLive(), function () { return html`<a href="/insights">Insights</a>`; })}
              <a href="/assessment">Readiness assessment</a>
              <a href="/contact">Book a consultation</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Pattern Grid</span>
          <div class="row" style="gap:24px">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <button type="button" class="motion-btn" data-motion
                    aria-pressed="${C.motion.reduced ? 'true' : 'false'}">
              <span class="sw" aria-hidden="true"></span>Reduce motion: ${C.motion.reduced ? 'on' : 'off'}
            </button>
          </div>
        </div>
      </div>`;
  }

  function paintFooter() {
    document.getElementById('footer').innerHTML = footerMarkup().value;
  }

  /* -------------------------------------------------------------- wiring */

  document.addEventListener('click', function (e) {
    var t = e.target;

    var menuBtn = t.closest && t.closest('[data-menu]');
    if (menuBtn) {
      var key = menuBtn.getAttribute('data-menu');
      state.menu = state.menu === key ? null : key;
      paintHeader();
      var again = document.querySelector('[data-menu="' + key + '"]');
      if (again) again.focus();
      return;
    }

    if (t.closest && t.closest('[data-drawer-open]')) { openDrawer(); return; }
    if (t.closest && t.closest('[data-drawer-close]')) { closeDrawer(); return; }

    if (t.closest && t.closest('[data-motion]')) {
      C.motion.toggle();
      paintFooter();
      return;
    }

    // A click anywhere outside the header closes an open mega menu.
    if (state.menu && !(t.closest && t.closest('#header'))) { state.menu = null; paintHeader(); }

    // Any link click closes whatever is open.
    if (t.closest && t.closest('a[href]')) {
      if (state.menu) { state.menu = null; paintHeader(); }
      if (state.drawerOpen) closeDrawer();
    }
  });

  /* Hover opens the mega menus on pointer devices, matching the prototype. */
  document.addEventListener('mouseover', function (e) {
    if (!window.matchMedia('(hover: hover)').matches) return;
    var header = document.getElementById('header');
    if (!header) return;
    var btn = e.target.closest && e.target.closest('[data-menu]');
    if (btn) {
      var key = btn.getAttribute('data-menu');
      if (state.menu !== key) { state.menu = key; paintHeader(); }
      return;
    }
    var link = e.target.closest && e.target.closest('.nav-item[data-close-menu]');
    if (link && state.menu) { state.menu = null; paintHeader(); }
  });

  document.getElementById('header').addEventListener('mouseleave', function () {
    if (state.menu) { state.menu = null; paintHeader(); }
  });

  /* Focus leaving the header (Tab past the last menu link) closes the menu.
     A null relatedTarget is ignored: that is a repaint or a click on a
     non-focusable target, not the visitor moving on. */
  document.getElementById('header').addEventListener('focusout', function (e) {
    if (!state.menu || !e.relatedTarget) return;
    if (document.getElementById('header').contains(e.relatedTarget)) return;
    state.menu = null;
    paintHeader();
  });

  window.addEventListener('scroll', function () {
    var s = window.scrollY > 24;
    if (s !== state.scrolled) { state.scrolled = s; paintHeader(); }
  }, { passive: true });

  window.addEventListener('pg-hero', function (e) {
    var v = !!e.detail;
    if (state.hasHero !== v) { state.hasHero = v; paintHeader(); }
  });

  shell.setHasHero = function (v) {
    if (state.hasHero !== v) { state.hasHero = v; paintHeader(); }
  };

  shell.paint = function () {
    state.menu = null;
    paintHeader();
    paintFooter();
  };

  shell.refreshHeader = paintHeader;
})();
