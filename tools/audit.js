#!/usr/bin/env node
/* Production audit of dist/: every built page is checked for one <h1>, heading
   order, a unique title and description, canonical + social tags, valid
   JSON-LD, duplicate ids, images with alt and dimensions, and internal links
   and assets that resolve to a built file. Usage: node tools/audit.js [dist] [base] */
const fs = require('fs'); const path = require('path');
const dist = path.resolve(process.argv[2] || 'dist'); const base = process.argv[3] || '/patterngrid';
const pages = []; (function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f === 'index.html' || f === '404.html') pages.push(p); } })(dist);
const findings = []; const titles = {}; const descs = {};
const exists = (url) => { let u = url.split('#')[0].split('?')[0]; if (u.startsWith(base + '/')) u = u.slice(base.length); else if (u === base) u = '/'; if (!u.startsWith('/')) return true; const p = path.join(dist, u); return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'index.html'))); };
for (const p of pages) {
  const rel = '/' + path.relative(dist, p).replace(/index\.html$/, '').replace(/\\/g, '/'); const html = fs.readFileSync(p, 'utf8'); const main = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
  if (rel === '/404.html') { if (!/noindex/.test(html)) findings.push('/404.html: not noindex'); continue; }
  const note = (m) => findings.push(rel + ': ' + m);
  const h1 = (main.match(/<h1\b/g) || []).length; if (h1 !== 1) note(h1 + ' <h1> elements');
  const hs = [...main.matchAll(/<h([1-6])\b/g)].map((m) => +m[1]); for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) { note('heading jump h' + hs[i - 1] + ' → h' + hs[i]); break; }
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || ''; if (!title) note('no title'); if (titles[title]) note('title duplicates ' + titles[title]); titles[title] = rel;
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ''; if (!desc) note('no description'); else if (rel !== '/404.html') { if (descs[desc]) note('description duplicates ' + descs[desc]); descs[desc] = rel; }
  if (!/<link rel="canonical"/.test(html)) note('no canonical'); if (!/property="og:image"/.test(html)) note('no og:image'); if (!/property="og:title"/.test(html)) note('no og:title');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch (e) { note('invalid JSON-LD: ' + e.message); } }
  const ids = [...main.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]); const dup = ids.filter((x, i) => ids.indexOf(x) !== i); if (dup.length) note('duplicate ids: ' + [...new Set(dup)].join(', '));
  for (const m of main.matchAll(/<img\b[^>]*>/g)) { const t = m[0]; if (!/\salt="/.test(t)) note('img without alt: ' + t.slice(0, 80)); if (!/\swidth="/.test(t) || !/\sheight="/.test(t)) note('img without dimensions: ' + t.slice(0, 80)); }
  for (const m of main.matchAll(/\s(?:href|src)="([^"]+)"/g)) { const u = m[1]; if (/^(https?:|mailto:|tel:|data:|#|javascript:)/.test(u)) continue; if (!exists(u)) note('broken link/asset: ' + u); }
  for (const m of main.matchAll(/srcset="([^"]+)"/g)) for (const part of m[1].split(',')) { const u = part.trim().split(/\s+/)[0]; if (u && !/^https?:/.test(u) && !exists(u)) note('broken srcset: ' + u); }
}
const sm = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8'); const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const l of locs) { const u = new URL(l).pathname; if (!exists(u)) findings.push('sitemap: ' + u + ' not built'); }
console.log(pages.length + ' pages, ' + locs.length + ' sitemap URLs');
if (findings.length) { console.log(findings.join('\n')); process.exitCode = 1; } else console.log('no findings');
