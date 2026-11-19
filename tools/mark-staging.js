#!/usr/bin/env node
/* Marks a built dist/ as a staging copy: every page gets a noindex meta tag,
   robots.txt disallows everything, the sitemap is removed, and the deployment
   config carries { staging, branch, commit } so the site shows a Staging badge.
   Usage: node tools/mark-staging.js <dist> <branch> <commit> */
const fs = require('fs'); const path = require('path');
const dist = path.resolve(process.argv[2] || 'dist'); const branch = process.argv[3] || ''; const commit = process.argv[4] || '';
let pages = 0;
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) {
      let html = fs.readFileSync(p, 'utf8');
      if (!/name="robots"/.test(html)) html = html.replace(/<meta charset="utf-8">/, '<meta charset="utf-8">\n<meta name="robots" content="noindex, nofollow">');
      fs.writeFileSync(p, html); pages++;
    }
  }
})(dist);
fs.writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
fs.rmSync(path.join(dist, 'sitemap.xml'), { force: true });
fs.rmSync(path.join(dist, 'CNAME'), { force: true });
const cfgPath = path.join(dist, 'assets/js/config.js');
const src = fs.readFileSync(cfgPath, 'utf8');
fs.writeFileSync(cfgPath, src.replace(/\s*$/, '') + '\nwindow.PG_CONFIG.staging = ' + JSON.stringify({ branch, commit, builtAt: new Date().toISOString() }) + ';\n');
console.log('staging marks applied to ' + pages + ' pages (' + branch + '@' + commit + ')');
