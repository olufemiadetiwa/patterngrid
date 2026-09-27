#!/usr/bin/env node
/* Rebuilds design-source/runnable/ — the original Claude Design components with
   the design host's injected <script>/<style> blocks stripped, so the prototype
   runs from a plain static server for side-by-side comparison. */
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'design-source');
const out = path.join(src, 'runnable');
fs.mkdirSync(out, { recursive: true });

let n = 0;
for (const f of fs.readdirSync(src)) {
  if (!f.endsWith('.dc.html')) continue;
  const raw = fs.readFileSync(path.join(src, f), 'utf8');
  const clean = raw.replace(/<(script|style) data-omelette-injected>[\s\S]*?<\/\1>/g, '');
  fs.writeFileSync(path.join(out, f), clean);
  n++;
}
for (const f of ['support.js', 'content.js', 'service-content.js']) {
  fs.copyFileSync(path.join(src, f), path.join(out, f));
}
fs.copyFileSync(path.join(out, 'Pattern Grid.dc.html'), path.join(out, 'index.html'));
console.log(`design-source/runnable rebuilt — ${n} components + runtime`);
