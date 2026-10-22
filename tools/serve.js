#!/usr/bin/env node
/* Static dev server with the same SPA fallback the production hosts use.
   Usage: node tools/serve.js [port]  (default 8780) */
const http = require('http');
const fs = require('fs');
const path = require('path');

/* --dist serves the static build the way a static host does: real route
   files, a real 404 for anything else, no SPA fallback. */
const DIST_MODE = process.argv.includes('--dist');
const rootIx = process.argv.indexOf('--root');
const ROOT = rootIx >= 0 ? path.resolve(process.argv[rootIx + 1]) : path.join(__dirname, '..', DIST_MODE ? 'dist' : 'public');
const PORT = Number(process.argv.find((a) => /^\d+$/.test(a)) || 8780);
/* --base /patterngrid serves the site under a project-page prefix, with the
   base pinned in the shell, so sub-path hosting can be exercised locally and
   rendered by the static build. --no-mock serves the real config.js. */
const baseIx = process.argv.indexOf('--base');
const BASE = baseIx >= 0 ? (process.argv[baseIx + 1] || '').replace(/\/$/, '') : '';
const NO_MOCK = process.argv.includes('--no-mock');
function shellHtml() {
  let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  if (BASE) html = html.replace("var base = /\\.github\\.io$/.test(location.hostname) ? '/' + (location.pathname.split('/')[1] || '') : '';", 'var base = ' + JSON.stringify(BASE) + ';');
  return html;
}
/* The enquiry form posts to PG_CONFIG.formEndpoint. Locally that is a mock
   living in this server, so the whole flow — pending, success, server-side
   validation, server failure, timeout — can be exercised without a real
   mailbox. Set PG_FORM_ENDPOINT to point at something else (or to '' to see
   the production "not open yet" state). */
const FORM_ENDPOINT = process.env.PG_FORM_ENDPOINT === undefined ? '/__enquiry' : process.env.PG_FORM_ENDPOINT;
const enquiries = [];

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
};

function send(res, code, body, type) {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  res.end(body);
}

http
  .createServer((req, res) => {
    let url = decodeURIComponent(req.url.split('?')[0]);
    if (BASE) {
      if (url === BASE || url.indexOf(BASE + '/') === 0) url = url.slice(BASE.length) || '/';
      else if (!url.startsWith('/__')) return send(res, 404, 'Not found (outside base path ' + BASE + ')', TYPES['.txt']);
    }

    // Dev-only capture endpoint, used by the parity check in tools/compare.js.
    if (url === '/__dump' && req.method === 'POST') {
      const name = (req.headers['x-dump-name'] || 'dump').replace(/[^a-z0-9._-]/gi, '');
      let body = '';
      req.on('data', (c) => (body += c));
      req.on('end', () => {
        fs.mkdirSync(path.join(__dirname, '..', '.capture'), { recursive: true });
        fs.writeFileSync(path.join(__dirname, '..', '.capture', name + '.json'), body);
        res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
        res.end('ok ' + body.length);
      });
      return;
    }
    if (url === '/__dump') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'x-dump-name, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      });
      return res.end();
    }
    // Dev-only: a page framed at an exact CSS width, for phone captures with
    // headless Chrome, whose window cannot go below about 500 px.
    if (url === '/__frame') {
      const q = new URLSearchParams(req.url.split('?')[1] || '');
      const w = Math.max(200, Math.min(2000, Number(q.get('w')) || 390));
      const h = Math.max(400, Math.min(12000, Number(q.get('h')) || 9000));
      const src = (q.get('src') || '/').replace(/[^\w\-\/?=&#.%]/g, '');
      return send(res, 200, `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#fff}iframe{display:block;border:0;width:${w}px;height:${h}px}</style><iframe src="${src}"></iframe>`, TYPES['.html']);
    }
    if (url === '/assets/js/config.js' && !NO_MOCK) {
      return send(res, 200, 'window.PG_CONFIG = ' + JSON.stringify({ formEndpoint: FORM_ENDPOINT, mock: true }) + ';\n', TYPES['.js']);
    }
    if (url === '/__enquiry') {
      if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
      if (req.method === 'GET') return send(res, 200, JSON.stringify(enquiries, null, 2), TYPES['.json']);
      if (req.method !== 'POST') return send(res, 405, 'Method not allowed', TYPES['.txt']);
      let body = '';
      req.on('data', (c) => (body += c));
      req.on('end', () => {
        let data;
        try { data = JSON.parse(body); } catch (e) { return send(res, 400, JSON.stringify({ error: 'Invalid JSON' }), TYPES['.json']); }
        const msg = String(data.message || '');
        // Scripted failures for the test matrix.
        if (/\bfail500\b/.test(msg)) return send(res, 500, JSON.stringify({ error: 'Simulated server failure' }), TYPES['.json']);
        if (/\bslow\b/.test(msg)) return setTimeout(() => send(res, 200, JSON.stringify({ ok: true }), TYPES['.json']), 20000);
        // Server-side validation mirrors the browser's rules.
        const errors = {};
        if (!String(data.name || '').trim()) errors.name = 'Name is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email || '').trim())) errors.email = 'A valid email address is required.';
        if (!String(data.organisation || '').trim()) errors.organisation = 'Organisation is required.';
        if (!msg.trim()) errors.message = 'A message is required.';
        if (/\bfail422\b/.test(msg)) errors.message = 'The server rejected this message (simulated).';
        if (Object.keys(errors).length) return send(res, 422, JSON.stringify({ errors }), TYPES['.json']);
        const id = 'ENQ-' + String(enquiries.length + 1).padStart(4, '0');
        enquiries.push(Object.assign({ id, receivedAt: new Date().toISOString() }, data));
        send(res, 200, JSON.stringify({ ok: true, id }), TYPES['.json']);
      });
      return;
    }
    const file = path.join(ROOT, path.normalize(url).replace(/^(\.\.[/\\])+/, ''));

    // Any HTML served under --base gets the base pinned, so a project-page build can be checked on localhost.
    const pin = (html) => (BASE ? html.toString().replace("var base = /\\.github\\.io$/.test(location.hostname) ? '/' + (location.pathname.split('/')[1] || '') : '';", 'var base = ' + JSON.stringify(BASE) + ';') : html);
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      if (path.extname(file) === '.html') return send(res, 200, pin(fs.readFileSync(file, 'utf8')), TYPES['.html']);
      return send(res, 200, fs.readFileSync(file), TYPES[path.extname(file)] || 'application/octet-stream');
    }
    const indexFile = path.join(file, 'index.html');
    if (fs.existsSync(indexFile)) return send(res, 200, pin(fs.readFileSync(indexFile, 'utf8')), TYPES['.html']);
    if (DIST_MODE) {
      const nf = path.join(ROOT, '404.html');
      return send(res, 404, fs.existsSync(nf) ? pin(fs.readFileSync(nf, 'utf8')) : 'Not found', TYPES['.html']);
    }
    // Unknown path with no extension -> the app shell handles routing.
    if (!path.extname(url)) {
      return send(res, 200, shellHtml(), TYPES['.html']);
    }
    send(res, 404, 'Not found', TYPES['.txt']);
  })
  .listen(PORT, () => console.log(`Pattern Grid (${DIST_MODE ? 'dist' : 'public'}) on http://localhost:${PORT}`));
