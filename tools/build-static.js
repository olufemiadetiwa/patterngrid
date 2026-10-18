#!/usr/bin/env node
/* Builds the static site into dist/: every public route as its own
   index.html with that route's title, description, canonical, social card,
   structured data and rendered content, so direct loads, reloads, previews
   and crawlers get a real document rather than the empty app shell. Unknown
   paths still fall to 404.html.

   The pages are rendered by the site's own code in the installed Chrome
   (headless), served from a throwaway copy of public/ under the configured
   base path, then post-processed: the tags the inline loader writes at run
   time are removed again (the loader re-adds them on load), reveal states are
   opened so no-JS readers see the content, and the local origin is replaced
   by the public one.

   Usage: node tools/build-static.js [--base /patterngrid] [--origin https://olufemiadetiwa.github.io]
   Env:   PG_BASE, PG_ORIGIN (same meaning). Default: root hosting at https://patterngrid.io. */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const DIST = path.join(ROOT, 'dist');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function arg(name, fallback) {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 ? process.argv[i + 1] : fallback;
}
const BASE = (arg('base', process.env.PG_BASE || '') || '').replace(/\/$/, '');
const ORIGIN = (arg('origin', process.env.PG_ORIGIN || 'https://patterngrid.io') || '').replace(/\/$/, '');

/* ---------------------------------------------------------------- routes */
global.window = { dispatchEvent() {}, addEventListener() {}, matchMedia: () => ({ matches: false }) };
global.Event = function () {};
global.CustomEvent = function () {};
require(path.join(PUBLIC, 'assets/js/content.js'));
require(path.join(PUBLIC, 'assets/js/service-content.js'));
const PG = global.window.PG;

const ROUTES = [
  '/', '/services', ...PG.services.map((s) => `/services/${s.slug}`),
  '/industries', ...PG.industries.map((i) => `/industries/${i.slug}`),
  '/work', ...PG.work.map((w) => `/work/${w.slug}`),
  '/about', '/about/precious-celestine', '/approach', '/assessment', '/contact', '/privacy', '/terms'
];
if (PG.articles.some((a) => a.published)) ROUTES.push('/insights');
module.exports = { ROUTES };
if (require.main !== module) return;

/* ----------------------------------------------------------- copy public */
fs.rmSync(DIST, { recursive: true, force: true });
fs.cpSync(PUBLIC, DIST, { recursive: true });

/* ------------------------------------------------- serve public under BASE */
const { spawn } = require('child_process');
const PORT = Number(process.env.PG_BUILD_PORT || 8795);
const local = `http://localhost:${PORT}`;
const serverProc = spawn('node', [path.join(__dirname, 'serve.js'), String(PORT), '--no-mock'].concat(BASE ? ['--base', BASE] : []), { stdio: 'ignore' });
const profile = fs.mkdtempSync(path.join(require('os').tmpdir(), 'pg-chrome-'));
const CHROME_FLAGS = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--disable-sync', '--disable-background-networking', '--disable-component-update', '--disable-extensions', '--user-data-dir=' + profile, '--window-size=1440,1200', '--virtual-time-budget=10000', '--dump-dom'];

function waitForServer(tries) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      http.get(local + BASE + '/assets/js/config.js', (res) => { res.resume(); resolve(); })
        .on('error', () => (n > 0 ? setTimeout(() => attempt(n - 1), 200) : reject(new Error('server did not start'))));
    };
    attempt(tries);
  });
}

waitForServer(50).then(() => {
  const manifest = [];
  try {
    for (const route of ROUTES) {
      const url = local + BASE + route;
      if (process.env.PG_DEBUG) console.error('render', url);
      let dom;
      try {
        dom = execFileSync(CHROME, CHROME_FLAGS.concat([url]), { maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', process.env.PG_DEBUG ? 'inherit' : 'ignore'], timeout: 90000 }).toString();
      } catch (e) {
        throw new Error('Chrome failed for ' + route + ' (status ' + e.status + ', signal ' + e.signal + '). Run with PG_DEBUG=1 to see its output.');
      }
      if (!/data-prerendered|id="page">\s*<[a-z]/.test(dom.replace(/<div id="page">/, '<div id="page" data-prerendered>')) || !/<\/main>/.test(dom)) {
        throw new Error('Render of ' + route + ' came back without page content');
      }
      dom = postProcess(dom, local);
      const title = (dom.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
      const out = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route.slice(1), 'index.html');
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, dom);
      manifest.push({ route, file: path.relative(ROOT, out), title, bytes: Buffer.byteLength(dom) });
      console.log('built', route, '→', path.relative(ROOT, out), `(${title})`);
    }
  } finally {
    serverProc.kill();
    fs.rmSync(profile, { recursive: true, force: true });
  }
  execFileSync('node', [path.join(__dirname, 'build-sitemap.js'), ORIGIN + BASE, path.join(DIST, 'sitemap.xml')], { stdio: 'inherit' });
  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}${BASE}/sitemap.xml\n`);
  fs.writeFileSync(path.join(DIST, 'build-manifest.json'), JSON.stringify({ base: BASE, origin: ORIGIN, builtAt: new Date().toISOString(), routes: manifest }, null, 2));
  console.log(`\ndist/ ready: ${manifest.length} routes, base "${BASE || '/'}", origin ${ORIGIN}`);
}).catch((e) => { serverProc.kill(); console.error(e.message); process.exit(1); });

function postProcess(dom, local) {
  return dom
    // The loader scripts re-create these on load; keep one copy only.
    .replace(/<link rel="stylesheet" href="[^"]*\/assets\/css\/site\.css">/g, '')
    .replace(/<link rel="icon" href="[^"]*\/favicon\.svg"[^>]*>/g, '')
    .replace(/<link rel="manifest" href="[^"]*\/manifest\.webmanifest">/g, '')
    .replace(/<script src="[^"]*\/assets\/js\/[^"]*"><\/script>/g, '')
    // Hero preloads are route-specific and useful: keep them.
    // Reveal and image-load state: everything visible, nothing mid-animation.
    .replace(/ class="([^"]*)\bis-armed\b([^"]*)"/g, ' class="$1$2"')
    .replace(/(<[^>]*\bdata-reveal="[^"]*")/g, (m) => (/\bclass="/.test(m) ? m.replace(/\bclass="/, 'class="is-in ') : m + ' class="is-in"'))
    .replace(/ data-armed="1"/g, '')
    .replace(/ style="transition: none;"/g, '')
    // The rendered document is not the live one: the runtime re-renders on boot.
    .replace(/<div id="page">/, '<div id="page" data-prerendered>')
    .replace(new RegExp(local.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), ORIGIN)
    .replace(/<html([^>]*) class="reduce-motion"/, '<html$1');
}
