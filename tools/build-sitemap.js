#!/usr/bin/env node
/* Regenerates public/sitemap.xml from the content model.
   Usage: node tools/build-sitemap.js [origin]  (default https://patterngrid.io) */
const fs = require('fs');
const path = require('path');

const origin = (process.argv[2] || 'https://patterngrid.io').replace(/\/$/, '');
const jsDir = path.join(__dirname, '..', 'public', 'assets', 'js');

global.window = { dispatchEvent() {}, addEventListener() {}, matchMedia: () => ({ matches: false }) };
global.Event = function () {};
global.CustomEvent = function () {};
require(path.join(jsDir, 'content.js'));
require(path.join(jsDir, 'service-content.js'));
const PG = global.window.PG;

const routes = [
  ['/', 1.0],
  ['/services', 0.9],
  ...PG.services.map((s) => [`/services/${s.slug}`, 0.8]),
  ['/industries', 0.8],
  ...PG.industries.map((i) => [`/industries/${i.slug}`, 0.7]),
  ['/work', 0.7],
  ...PG.work.map((w) => [`/work/${w.slug}`, 0.6]),
  ['/insights', 0.6],
  ['/about', 0.6],
  ['/about/precious-celestine', 0.5],
  ['/approach', 0.6],
  ['/assessment', 0.7],
  ['/contact', 0.8],
  ['/privacy', 0.2],
  ['/terms', 0.2],
];

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

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), xml);
console.log(`sitemap.xml written — ${routes.length} URLs at ${origin}`);
