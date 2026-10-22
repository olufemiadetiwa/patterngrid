#!/usr/bin/env node
/* Regenerates public/sitemap.xml from the content model.
   Usage: node tools/build-sitemap.js [origin] [outfile]
   (default https://patterngrid.io, public/sitemap.xml). The route list is the
   one the static build uses, so unpublished pages never appear. */
const fs = require('fs');
const path = require('path');

const origin = (process.argv[2] || 'https://patterngrid.io').replace(/\/$/, '');

const { ROUTES } = require('./build-static.js');
const PRIORITY = (p) => (p === '/' ? 1.0 : /^\/(services|contact)$/.test(p) ? 0.9 : /^\/(privacy|terms)$/.test(p) ? 0.2 : p.split('/').length > 2 ? 0.7 : 0.8);
const routes = ROUTES.map((p) => [p, PRIORITY(p)]);
const outfile = process.argv[3] || path.join(__dirname, '..', 'public', 'sitemap.xml');

const today = new Date().toISOString().slice(0, 10);
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes
    .map(
      ([p, pr]) =>
        `  <url>\n    <loc>${origin}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${pr.toFixed(1)}</priority>\n  </url>`
    )
    .join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(outfile, xml);
console.log(`${path.relative(process.cwd(), outfile)} written — ${routes.length} URLs at ${origin}`);
