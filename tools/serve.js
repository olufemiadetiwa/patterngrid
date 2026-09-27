#!/usr/bin/env node
/* Static dev server with the same SPA fallback the production hosts use.
   Usage: node tools/serve.js [port]  (default 8780) */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'public');
const PORT = Number(process.argv[2] || 8780);

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
};

function send(res, code, body, type) {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  res.end(body);
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);

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
    const file = path.join(ROOT, path.normalize(url).replace(/^(\.\.[/\\])+/, ''));

    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      return send(res, 200, fs.readFileSync(file), TYPES[path.extname(file)] || 'application/octet-stream');
    }
    // Unknown path with no extension -> the app shell handles routing.
    if (!path.extname(url)) {
      return send(res, 200, fs.readFileSync(path.join(ROOT, 'index.html')), TYPES['.html']);
    }
    send(res, 404, 'Not found', TYPES['.txt']);
  })
  .listen(PORT, () => console.log(`Pattern Grid on http://localhost:${PORT}`));
