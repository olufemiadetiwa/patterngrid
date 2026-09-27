/* Pattern Grid — hero: progressive image carousel, masked headline,
   segmented progress and the scroll-lit statement with its actions. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when, raw = C.raw;

  var SIZES = {
    home: 'clamp(640px, 92svh, 980px)',
    marketing: 'clamp(540px, 80svh, 880px)',
    compact: 'clamp(420px, 58svh, 660px)',
    utility: 'clamp(340px, 46svh, 540px)'
  };
  var H1 = {
    home: 'var(--h1-home)',
    marketing: 'var(--h1)',
    compact: 'var(--h1-compact)',
    utility: 'var(--h1-utility)'
  };
  var DWELL = 8000;

  var live = null;

  function heroFor(key) {
    return (PG.heroes && (PG.heroes[key] || PG.heroes.home)) ||
      { lines: [], images: [], statement: '', size: 'marketing', tone: 'light' };
  }

  /* The first frame of the next route is the LCP candidate: ask for it before
     the markup exists. Idempotent per URL. */
  function preload(img) {
    if (document.head.querySelector('link[data-hero-preload="' + img.key + '"]')) return;
    var l = document.createElement('link');
    l.rel = 'preload';
    l.as = 'image';
    l.setAttribute('imagesrcset', img.srcSet);
    l.setAttribute('imagesizes', '100vw');
    l.setAttribute('fetchpriority', 'high');
    l.setAttribute('data-hero-preload', img.key);
    document.head.appendChild(l);
  }

  function preloadLocal(local, key) {
    if (document.head.querySelector('link[data-hero-preload="' + key + '"]')) return;
    [[local.d, '(min-width: 721px)'], [local.m, '(max-width: 720px)']].forEach(function (pair) {
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

  PG.hero = function (key, opts) {
    opts = opts || {};
    var h = heroFor(key);
    var rm = C.motion.reduced;
    var size = h.size || 'marketing';
    var lines = h.lines || [];
    var images = h.images || [];
    var dark = h.tone === 'dark';

    /* The first frame is served from this origin as pre-optimised WebP (see
       tools/build-hero-frames.js) with an inline blurred preview; later frames
       come from the image CDN once the first is on screen. */
    var local = (PG.local && images.length && PG.local[images[0]]) || null;
    if (images.length && !local) preload(PG.img.get(images[0]));
    if (local) preloadLocal(local, images[0]);

    var slides = images.map(function (k, i) {
      var img = PG.img.get(k);
      if (i === 0 && local) {
        return html`
          <div class="hero-slide is-active" data-slide="0" aria-hidden="false"
               style="--focal:${img.focal};--focal-m:${img.focalMobile};background-image:url('${local.lqip}')">
            <picture>
              <source media="(max-width: 720px)" srcset="${C.href(local.m)}" width="900" height="1200">
              <img src="${C.href(local.d)}" width="${local.w}" height="${local.h}" alt="${img.alt}" decoding="async" fetchpriority="high">
            </picture>
          </div>`;
      }
      return html`
        <div class="hero-slide${i === 0 ? ' is-active' : ''}" data-slide="${i}" aria-hidden="${i === 0 ? 'false' : 'true'}"
             style="--focal:${img.focal};--focal-m:${img.focalMobile};background-image:url('${img.lqip}')">
          <img ${raw(i === 0 ? 'src="' + C.esc(img.src) + '" srcset="' + C.esc(img.srcSet) + '" fetchpriority="high"' : 'data-src="' + C.esc(img.src) + '" data-srcset="' + C.esc(img.srcSet) + '"')}
               sizes="100vw" width="2400" height="1600" alt="${img.alt}" decoding="async">
        </div>`;
    });

    var words = C.tokenise(h.statement);

    return html`
      <div class="hero-unit" data-hero="${key}">
        <section class="hero" data-carousel aria-roledescription="carousel"
                 aria-label="${lines.join(' ') || opts.bandTitle || 'Page images'}"
                 style="--hero-h:${SIZES[size] || SIZES.marketing};--hero-h1:${H1[size] || H1.marketing}">
          ${slides}
          <div class="hero-scrim" aria-hidden="true"></div>
          <div class="hero-inner">
            ${when(lines.length > 0, function () {
              return html`<h1>${each(lines, function (t, i) {
                return html`<span class="ln"><span style="--d:${rm ? 0 : 120 + i * 80}ms">${t}</span></span>`;
              })}</h1>`;
            })}
            ${when(!!h.action && size !== 'home', function () {
              return html`
                <div class="hero-cta" style="--d:${rm ? 0 : 120 + lines.length * 80 + 80}ms">
                  <a class="btn btn-accent" href="${h.action.href}"
                     ${raw(h.action.event ? 'data-hero-event="' + C.esc(h.action.event) + '"' : '')}>${h.action.label}</a>
                  ${when(!!h.secondary, function () {
                    return html`<a class="secondary" href="${h.secondary.href}">${h.secondary.label} <span aria-hidden="true">→</span></a>`;
                  })}
                </div>`;
            })}
          </div>
          ${when(images.length > 1, function () {
            return html`
              <div class="hero-controls">
                <span class="hero-counter" data-counter aria-hidden="true">01 / ${C.pad2(images.length)}</span>
                <span class="hero-progress" data-progress aria-hidden="true">${each(images, function (_, i) {
                  return html`<span class="${i === 0 ? 'now' : ''}"></span>`;
                })}</span>
                <button type="button" class="hero-btn" data-hero-prev aria-label="Previous image">←</button>
                <button type="button" class="hero-btn play" data-hero-play aria-label="Pause image slideshow" aria-pressed="false">❚❚</button>
                <button type="button" class="hero-btn" data-hero-next aria-label="Next image">→</button>
              </div>`;
          })}
          <p class="sr-only" aria-live="polite" data-hero-announce></p>
        </section>

        ${when(!!opts.bandTitle, function () {
          return html`
            <div class="hero-band">
              <div class="hero-band-inner">
                <span class="eyebrow eyebrow-dark">${opts.bandEyebrow || ''}</span>
                <h1>${opts.bandTitle}</h1>
              </div>
            </div>`;
        })}

        ${when(!!h.statement, function () {
          return html`
            <section class="statement${dark ? ' is-dark' : ''}" data-statement>
              <div class="statement-inner">
                <p>${each(words, function (w, i) {
                  return html`<span data-w="${i}"${raw(w.strong ? ' data-strong="1"' : '')}>${w.text} </span>`;
                })}</p>
                ${when(size === 'home' && !!h.action, function () {
                  return html`
                    <div class="statement-actions" data-reveal="rise">
                      <a class="btn" href="${h.action.href}">${h.action.label}</a>
                      ${when(!!h.secondary, function () {
                        return html`<a class="arrow" href="${h.secondary.href}">${h.secondary.label} <span class="chev" aria-hidden="true">→</span></a>`;
                      })}
                    </div>`;
                })}
              </div>
            </section>`;
        })}
      </div>`;
  };

  PG.hero.mount = function () {
    PG.hero.unmount();

    var unit = document.querySelector('[data-hero]');
    if (!unit) { window.dispatchEvent(new CustomEvent('pg-hero', { detail: false })); return; }
    window.dispatchEvent(new CustomEvent('pg-hero', { detail: true }));

    var key = unit.getAttribute('data-hero');
    var h = heroFor(key);
    var slides = C.qsa('[data-slide]', unit);
    var counter = unit.querySelector('[data-counter]');
    var progress = unit.querySelector('[data-progress]');
    var announce = unit.querySelector('[data-hero-announce]');
    var playBtn = unit.querySelector('[data-hero-play]');
    var carousel = unit.querySelector('[data-carousel]');

    var inst = { idx: 0, manual: false, hover: false, focus: false, visible: true, timers: [], observers: [], listeners: [] };
    live = inst;

    try { inst.userPaused = sessionStorage.getItem('pg-hero-paused') === '1'; } catch (e) { inst.userPaused = false; }

    function on(target, type, fn, o) { target.addEventListener(type, fn, o); inst.listeners.push([target, type, fn, o]); }

    /* ---------------------------------------------------------- images */

    /* Mark each image loaded so it fades over its blurred preview, and bring
       in the second frame only once the first is on screen. */
    function armImage(slide, eager) {
      var img = slide.querySelector('img');
      if (!img) return;
      if (!img.getAttribute('src') && eager) {
        img.setAttribute('srcset', img.getAttribute('data-srcset'));
        img.setAttribute('src', img.getAttribute('data-src'));
      }
      if (img.complete && img.naturalWidth > 0) { img.classList.add('is-loaded'); return; }
      var done = function () { img.classList.add('is-loaded'); };
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true }); // keep the blurred frame rather than a hole
    }
    armImage(slides[0], true);
    var firstImg = slides[0] && slides[0].querySelector('img');
    var loadRest = function () { slides.slice(1).forEach(function (s) { armImage(s, true); }); };
    if (firstImg && firstImg.complete) setTimeout(loadRest, 300);
    else if (firstImg) firstImg.addEventListener('load', function () { setTimeout(loadRest, 300); }, { once: true });
    inst.timers.push(setTimeout(loadRest, 2500)); // never wait forever on a stalled first frame

    /* -------------------------------------------------------- carousel */

    function paused() { return inst.userPaused || inst.manual || C.motion.reduced; }

    function paintProgress() {
      if (!progress) return;
      C.qsa('span', progress).forEach(function (s, i) {
        s.className = i < inst.idx ? 'done' : (i === inst.idx ? 'now' + (canPlay() ? '' : ' paused') : '');
      });
    }

    function go(n, manual) {
      var len = slides.length || 1;
      var idx = ((n % len) + len) % len;
      inst.idx = idx;
      slides.forEach(function (s, i) {
        s.classList.toggle('is-active', i === idx);
        s.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
        if (i === idx) armImage(s, true);
      });
      if (counter) counter.textContent = C.pad2(idx + 1) + ' / ' + C.pad2(len);
      if (manual) {
        inst.manual = true;
        syncPlay();
        if (announce) announce.textContent = 'Image ' + (idx + 1) + ' of ' + len + ': ' + PG.img.get(h.images[idx]).alt;
      }
      restartTimer();
      paintProgress();
    }

    function syncPlay() {
      if (!playBtn) return;
      var p = paused();
      playBtn.textContent = p ? '▶' : '❚❚';
      playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
      playBtn.setAttribute('aria-label', p ? 'Play image slideshow' : 'Pause image slideshow');
      paintProgress();
    }

    function canPlay() {
      return !C.motion.reduced && !inst.userPaused && !inst.manual && !inst.hover &&
        !inst.focus && inst.visible && !document.hidden && slides.length > 1;
    }

    var timer = null;
    function restartTimer() {
      clearInterval(timer);
      if (slides.length < 2) return;
      timer = setInterval(function () { if (canPlay()) go(inst.idx + 1, false); }, DWELL);
    }

    if (slides.length > 1) {
      restartTimer();
      inst.timers.push({ clear: function () { clearInterval(timer); } });

      on(unit, 'click', function (e) {
        if (e.target.closest('[data-hero-prev]')) go(inst.idx - 1, true);
        else if (e.target.closest('[data-hero-next]')) go(inst.idx + 1, true);
        else if (e.target.closest('[data-hero-play]')) {
          var v = !paused();
          try { sessionStorage.setItem('pg-hero-paused', v ? '1' : '0'); } catch (err) { /* ignore */ }
          inst.userPaused = v; inst.manual = false;
          syncPlay();
        }
      });
      on(carousel, 'keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(inst.idx - 1, true); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(inst.idx + 1, true); }
      });
      on(carousel, 'mouseenter', function () { inst.hover = true; paintProgress(); });
      on(carousel, 'mouseleave', function () { inst.hover = false; paintProgress(); });
      on(carousel, 'focusin', function () { inst.focus = true; paintProgress(); });
      on(carousel, 'focusout', function (e) { if (!carousel.contains(e.relatedTarget)) { inst.focus = false; paintProgress(); } });

      var touch = null;
      on(carousel, 'touchstart', function (e) { var t = e.touches[0]; touch = { x: t.clientX, y: t.clientY }; }, { passive: true });
      on(carousel, 'touchend', function (e) {
        if (!touch) return;
        var t = e.changedTouches[0], dx = t.clientX - touch.x, dy = t.clientY - touch.y;
        touch = null;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) go(inst.idx + (dx < 0 ? 1 : -1), true);
      }, { passive: true });

      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) { inst.visible = es[0].isIntersecting; paintProgress(); }, { threshold: 0.2 });
        io.observe(carousel);
        inst.observers.push(io);
      }
      on(document, 'visibilitychange', paintProgress);
      syncPlay();
    }

    /* Some pages stop the slideshow when the visitor starts working. */
    on(window, 'pg-hero-hold', function () { inst.manual = true; syncPlay(); });

    on(unit, 'click', function (e) {
      var a = e.target.closest('[data-hero-event]');
      if (!a) return;
      e.preventDefault();
      window.dispatchEvent(new CustomEvent(a.getAttribute('data-hero-event')));
    });

    /* ---------------------------------------------------- statement */

    var stEl = unit.querySelector('[data-statement]');
    if (stEl) {
      var spans = C.qsa('[data-w]', stEl);
      var dark = h.tone === 'dark';
      var startC = dark ? '#9AA4AC' : '#646B70';
      var endC = dark ? '#FFFFFF' : '#07131C';
      var emC = dark ? '#38A0C3' : '#17647D';
      var N = spans.length;
      var lastP = -1;

      function paint(p) {
        if (Math.abs(p - lastP) < 0.003) return;
        lastP = p;
        spans.forEach(function (s, i) {
          var t = Math.max(0, Math.min(1, p * (N + 4) - i));
          s.style.color = C.mix(startC, s.hasAttribute('data-strong') ? emC : endC, t);
        });
      }

      var raf = null;
      function measure() {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = stEl.querySelector('p').getBoundingClientRect();
          var vh = window.innerHeight || 800;
          // Begins as the paragraph enters the lower third; completes by the upper quarter.
          paint(Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (vh * 0.65 - r.height * 0.15))));
        });
      }

      if (C.motion.reduced) paint(1);
      else { on(window, 'scroll', measure, { passive: true }); on(window, 'resize', measure); measure(); }
      inst.repaintStatement = function () { lastP = -1; C.motion.reduced ? paint(1) : measure(); };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (live === inst) inst.repaintStatement(); });
    }

    function applyMotionToSlides() {
      slides.forEach(function (slide) {
        var img = slide.querySelector('img');
        if (!img) return;
        if (C.motion.reduced) { img.style.transition = 'opacity 1ms'; img.style.transform = 'none'; }
        else { img.style.transition = ''; img.style.transform = ''; }
      });
    }
    applyMotionToSlides();

    on(window, 'pg-motion', function () {
      applyMotionToSlides();
      syncPlay();
      if (inst.repaintStatement) inst.repaintStatement();
    });
  };

  /* Map a route to its hero key and fetch the first frame into cache. */
  PG.hero.warm = function (path) {
    var p = path.replace(/^\/+|\/+$/g, '');
    var key = p === '' ? 'home' :
      p === 'about/precious-celestine' ? 'founder' :
      p === 'about' ? 'about' :
      (PG.heroes && PG.heroes[p]) ? p : null;
    if (!key || !PG.heroes[key] || !PG.heroes[key].images.length) return;
    var img = PG.img.get(PG.heroes[key].images[0]);
    var probe = new Image();
    probe.sizes = '100vw';
    probe.srcset = img.srcSet;
    probe.src = img.src;
  };

  PG.hero.unmount = function () {
    if (!live) return;
    live.timers.forEach(function (t) { if (t && t.clear) t.clear(); else clearTimeout(t); });
    live.observers.forEach(function (o) { o.disconnect(); });
    live.listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
    live = null;
  };
})();
