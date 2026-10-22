#!/usr/bin/env node
/* Regression tests for the parts of the site that are easy to break without
   noticing in a screenshot: base-aware links, the sample arithmetic every
   scene relies on, the contact validation rules, and the route list the
   static build and sitemap share.  Run: npm test  (node --test) */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const JS = path.join(__dirname, '..', 'public', 'assets', 'js');

/* A minimal browser for the modules: enough window/document to load them. */
function load(base) {
  const listeners = {};
  const el = () => ({ classList: { toggle() {}, add() {}, remove() {}, contains() { return false; } }, setAttribute() {}, getAttribute() { return null; }, appendChild() {}, querySelector() { return null; }, querySelectorAll() { return []; }, style: {}, addEventListener() {}, removeEventListener() {}, innerHTML: '', textContent: '' });
  const win = {
    PG_BASE: base,
    addEventListener(t, fn) { (listeners[t] = listeners[t] || []).push(fn); },
    removeEventListener() {},
    dispatchEvent() {},
    matchMedia: () => ({ matches: false }),
    location: { pathname: base + '/', origin: 'http://localhost', search: '', hash: '', href: 'http://localhost' + base + '/' },
    history: { pushState() {}, replaceState() {} },
    requestAnimationFrame: (fn) => setTimeout(fn, 0),
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    document: Object.assign(el(), { documentElement: el(), body: el(), head: el(), getElementById: () => null, createElement: el, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [] }),
    CustomEvent: function () {},
    Event: function () {},
    IntersectionObserver: undefined,
    URL,
    URLSearchParams
  };
  win.window = win;
  const ctx = require('vm').createContext(win);
  ['config', 'content', 'service-content', 'local-images', 'core', 'scenes', 'pages/contact'].forEach((f) => {
    require('vm').runInContext(fs.readFileSync(path.join(JS, f + '.js'), 'utf8'), ctx, { filename: f });
  });
  return win.PG;
}

test('markup links are prefixed exactly once on a project-page host', () => {
  const PG = load('/patterngrid');
  const html = PG.core.html;
  assert.equal(html`<a href="/work">x</a>`.value, '<a href="/patterngrid/work">x</a>');
  assert.equal(html`<a href="/patterngrid/work">x</a>`.value, '<a href="/patterngrid/work">x</a>', 'already prefixed stays');
  assert.equal(html`<a href="//cdn.example/x">x</a>`.value, '<a href="//cdn.example/x">x</a>', 'protocol-relative untouched');
  assert.equal(html`<a href="https://example.com/">x</a>`.value, '<a href="https://example.com/">x</a>');
  assert.equal(html`<a href="#svc-approach">x</a>`.value, '<a href="#svc-approach">x</a>', 'fragments untouched');
  assert.equal(html`<img src="/assets/img/x.webp">`.value, '<img src="/patterngrid/assets/img/x.webp">');
  assert.equal(html`<a href="/contact?service=bi#top">x</a>`.value, '<a href="/patterngrid/contact?service=bi#top">x</a>', 'query and hash preserved');
  assert.equal(PG.core.href('/assets/x'), '/patterngrid/assets/x');
  assert.equal(PG.core.href('/patterngrid/assets/x'), '/patterngrid/assets/x');
  assert.equal(PG.core.strip('/patterngrid/services/bi'), '/services/bi');
  assert.equal(PG.core.strip('/patterngrid'), '/');
});

test('root hosting leaves links unchanged', () => {
  const PG = load('');
  assert.equal(PG.core.html`<a href="/work">x</a>`.value, '<a href="/work">x</a>');
  assert.equal(PG.core.href('/work'), '/work');
  assert.equal(PG.core.strip('/work'), '/work');
});

test('content carries no legacy hash routes', () => {
  const src = fs.readFileSync(path.join(JS, 'content.js'), 'utf8');
  assert.ok(!/href: '#\//.test(src), 'hero actions must be real paths');
});

test('sample data reconciles across the scenes', () => {
  const PG = load('');
  const D = PG.scene.data;
  const round = (n) => Math.round(n * 10) / 10;
  assert.equal(round(D.gross - D.returns), D.current, 'gross − returns = net sales');
  assert.equal(round(D.current - D.plan), -0.4, 'variance to plan');
  assert.equal(round(D.lines.reduce((a, l) => a + l[1], 0)), round(D.current - D.plan), 'product contributions sum to the variance');
  assert.equal(D.netSales[D.netSales.length - 1], D.current, 'the chart ends on the KPI value');
  const s = D.locations.find((l) => l.name === 'Surulere');
  assert.ok(s.hl && s.sales === 61 && s.avail === 41, 'the highlighted location carries the same figures everywhere');
  for (const [slug, m] of Object.entries(PG.scene.industries)) {
    assert.ok(m.sources.length >= 3, slug + ' has sources');
    for (const met of m.metrics) {
      assert.ok(met.definition && met.period && met.unit && met.owner && met.source, slug + ' metric ' + met.name + ' is fully defined');
    }
  }
});

test('retail conversion is orders over sessions for the same period', () => {
  const PG = load('');
  const r = PG.scene.industries['retail-ecommerce'];
  const row = r.rows.find((x) => x.orders && x.sessions);
  assert.ok(row, 'has an orders/sessions row');
  assert.equal(row.conversion, Math.round(row.orders / row.sessions * 1000) / 10, 'conversion derived, not typed');
});

test('AI review blocks approval without evidence', () => {
  const PG = load('');
  const def = PG.scene.defs.ai;
  const s = def.init();
  def.act(s, 'item', 'w36b');
  const out = def.render(s, {}).value;
  assert.ok(!/data-act="decide:approve"/.test(out), 'no approve control when a source is missing');
  assert.ok(/Stopped at review/.test(out));
});

test('strategy readiness cascades only through real dependencies', () => {
  const PG = load('');
  const def = PG.scene.defs.strategy;
  const s = def.init();
  const chips = (o) => [...o.matchAll(/class="chip-state (ok|warn)">([^<]+)</g)].map((m) => m[2]);
  assert.deepEqual(chips(def.render(s, {}).value).slice(0, 4), ['Complete', 'Ready to sequence', 'Foundation needed', 'Foundation needed']);
  def.act(s, 'toggle', 'src', { checked: true });
  assert.deepEqual(chips(def.render(s, {}).value).slice(0, 4), ['Complete', 'Complete', 'Ready to sequence', 'Foundation needed'], 'reporting unlocks; the assistant still waits for reporting');
});

test('contact validation', () => {
  const PG = load('');
  const v = PG.contact.validate;
  const base = { name: 'A', email: 'a@b.co', organisation: 'Org', message: 'Hi' };
  assert.equal(Object.keys(v(base)).length, 0);
  assert.equal(v({ ...base, email: 'nope' }).email, PG.contact.ERRORS.emailFormat);
  assert.equal(v({ ...base, email: '' }).email, PG.contact.ERRORS.email);
  assert.equal(Object.keys(v({ name: ' ', email: '', organisation: '', message: '' })).length, 4);
});

test('static route list matches the router and excludes unpublished pages', () => {
  const { ROUTES } = require('./build-static.js');
  const PGc = load('');
  for (const c of PGc.cases) assert.ok(ROUTES.includes('/work/' + c.slug), c.slug + ' case study is built');
  for (const c of PGc.cases) assert.ok(!/\bI\b|\bmy\b/i.test(JSON.stringify(c).replace(/Power BI/g, '')), c.slug + ' is written in the third person');
  const app = fs.readFileSync(path.join(JS, 'app.js'), 'utf8');
  const fixed = [...app.matchAll(/C\.route\('([^':]+)'/g)].map((m) => m[1]).filter((r) => !r.includes(':') && r !== '/404' && r !== '/insights');
  for (const r of fixed) assert.ok(ROUTES.includes(r), r + ' is built');
  assert.ok(!ROUTES.includes('/insights'), 'insights stays out until an article is published');
  assert.equal(new Set(ROUTES).size, ROUTES.length, 'no duplicates');
});

test('every scene has a thumbnail form; heroes are photographic with a statement', () => {
  const PG = load('');
  for (const name of ['bi', 'strategy', 'engineering', 'ai', 'capability']) {
    const out = PG.scene.render(name, { thumb: true, plainHeading: true }).value;
    assert.ok(/scene-thumb/.test(out), name + ' renders as a thumbnail');
    assert.ok(!/role="tablist"/.test(out) && !/scene-foot/.test(out), name + ' thumbnail has no stepper or footer');
    assert.ok(!/<h3>/.test(out), name + ' thumbnail keeps the heading outline');
  }
  for (const s of PG.services) {
    const h = PG.heroes['services/' + s.slug];
    assert.ok(!h.scene, s.slug + ' hero is photographic, not a product screenshot');
    assert.ok(h.images.length === 1 && PG.img.reg[h.images[0]], s.slug + ' hero has one registered photograph');
    assert.ok(h.statement && /\*\*/.test(h.statement), s.slug + ' carries a statement with an emphasised phrase');
  }
  assert.ok(PG.scene.BI_WALK.total > 0, 'the walkthrough script exists');
});

test('the nine-cell device lights one cell and carries no text for assistive tech', () => {
  const PG = load('');
  const out = PG.core.cells(4).value;
  assert.equal((out.match(/<i/g) || []).length, 9);
  assert.equal((out.match(/class="on"/g) || []).length, 1);
  assert.ok(/aria-hidden="true"/.test(out));
  assert.equal((PG.core.cells(13).value.match(/<i class="on">/g) || []).length, 1, 'wraps past nine');
});

test('static post-processing strips rendered tags but keeps the loader that re-creates them', () => {
  const { postProcess } = require('./build-static.js');
  const shell = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  const rendered = shell.replace('</script>\n\n<link rel="preconnect"', '</script><link rel="stylesheet" href="http://localhost:1/assets/css/fonts.css"><link rel="stylesheet" href="http://localhost:1/assets/css/site.css"><link rel="icon" href="/favicon.svg" type="image/svg+xml">\n\n<link rel="preconnect"')
    .replace('<div id="page"></div>', '<div id="page"><section>hi</section></div>')
    .replace('</body>', '<script src="/assets/js/core.js"></script></body>');
  const out = postProcess(rendered, 'http://localhost:1');
  assert.ok(/\/assets\/css\/site\.css">' \+/.test(out), 'the loader string for site.css survives');
  assert.ok(/'\/assets\/js\/' \+ f \+ '\.js"/.test(out), 'the loader string for scripts survives');
  assert.ok(!/<link rel="stylesheet" href="http:\/\/localhost:1\/assets\/css\/site\.css">/.test(out), 'rendered stylesheet tag removed');
  assert.ok(!/<script src="\/assets\/js\/core\.js"><\/script>/.test(out), 'rendered script tag removed');
  assert.ok(/data-prerendered/.test(out));
});

test('local-images.js carries both hero frames and portraits', () => {
  const src = fs.readFileSync(path.join(JS, 'local-images.js'), 'utf8');
  assert.ok(/window\.PG\.local = \{/.test(src));
  assert.ok(/window\.PG\.localPeople = \{/.test(src), 'portrait entries present');
  const PG = load('');
  assert.ok(PG.localPeople && PG.localPeople[PG.team.founder.photo], 'founder photo resolvable');
});
