#!/usr/bin/env node
/*
 * Parity check against the original Claude Design prototype.
 *
 * Compares the rendered text of every route in .capture/build.json against
 * .capture/reference.json, ignoring whitespace (the two renderers break lines
 * between inline elements differently) and a short list of known, intentional
 * differences.
 *
 * Regenerating the captures
 * --------------------------
 * Start both servers (`npm run dev` on :8780, `npm run reference` on :8781),
 * then paste this into the console of each tab. On the prototype tab set
 * NAME='reference' and ROOT='#dc-root'; on this build set NAME='build' and
 * ROOT='.app'.
 *
 *   const NAME = 'build', ROOT = '.app';
 *   const wait = (ms) => new Promise((r) => setTimeout(r, ms));
 *   const PG = window.PG;
 *   const routes = ['/', '/services', ...PG.services.map((s) => '/services/' + s.slug),
 *     '/industries', ...PG.industries.map((i) => '/industries/' + i.slug),
 *     '/work', ...PG.work.map((w) => '/work/' + w.slug), '/insights', '/about',
 *     '/about/precious-celestine', '/approach', '/assessment', '/contact',
 *     '/privacy', '/terms'];
 *   const out = {};
 *   for (const r of routes) {
 *     if (NAME === 'build') PG.core.navigate(r); else location.hash = '#' + r;
 *     await wait(1100);
 *     out[r] = document.querySelector(ROOT).textContent.replace(/\s+/g, ' ').trim();
 *   }
 *   await fetch('http://localhost:8780/__dump', { method: 'POST',
 *     headers: { 'Content-Type': 'text/plain', 'x-dump-name': NAME },
 *     body: JSON.stringify(out) }).then((r) => r.text());
 *
 * Clear sessionStorage on the build tab first — a part-finished assessment
 * changes the intro button's label and will show as a diff.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '.capture');
const refPath = path.join(dir, 'reference.json');
const buildPath = path.join(dir, 'build.json');

if (!fs.existsSync(refPath) || !fs.existsSync(buildPath)) {
  console.error('Missing captures. See README.md "Parity check" for how to record them.');
  process.exit(2);
}

/* Photographer credits come from the content model, so the strip list can never drift. */
global.window = { dispatchEvent() {}, addEventListener() {}, matchMedia: () => ({ matches: false }) };
global.Event = function () {};
require(path.join(__dirname, '..', 'public', 'assets', 'js', 'content.js'));
const CREDITS = [...new Set(Object.values(global.window.PG.img.reg).map((r) => r[2]))];

const ref = JSON.parse(fs.readFileSync(refPath, 'utf8'));
const build = JSON.parse(fs.readFileSync(buildPath, 'utf8'));

/* Differences we expect, and why. Each is removed from both sides before the
   comparison so a real regression still shows up. */
const KNOWN = [
  {
    why: 'Mobile header controls are always in the DOM and hidden by CSS; the prototype rendered them from a JS width check.',
    build: [/Book a Consultation Book Menu/g],
    to: 'Book a Consultation',
  },
  {
    why: 'FAQ open/close markers are CSS ::after content here, so they are not in textContent.',
    ref: [/(?<=\?)\+/g],
    to: '',
  },
  {
    why: 'Honeypot field label, added for spam protection; visually hidden.',
    build: [/Leave this field empty/g],
    to: '',
  },
  {
    why: 'Visual upgrade: the home hero CTAs sit beneath the scroll statement (brief §04), so they move within the text.',
    ref: [/Explore our expertise Book a consultation →/g],
    build: [/Explore our expertise Book a consultation →/g],
    to: '',
  },
  {
    why: 'Visual upgrade: capability rows carry their index (01–05) instead of an icon.',
    build: [/(?<=Build what solves it\. )0[1-5] |(?<=→ )0[2-5] (?=[A-Z])/g],
    to: '',
  },
  {
    why: 'Premium pass: the contact aside carries a short reassurance line beneath the three steps.',
    build: [/Enquiries are read by the consultant who would work with you\. You can also start with the readiness assessment and bring the result\./g],
    to: '',
  },
  {
    why: 'Premium pass: a team section with reserved profile slots follows the founder feature on /about.',
    build: [/THE TEAM The people behind the work\. Profiles appear here as they are approved\. Roles are described by the work they do, not by title alone\.( Space reserved for a team profile Profile to follow)+/g],
    to: '',
  },
  {
    why: 'Premium pass: reserved portrait frames carry a visible "to be supplied" label until approved photographs exist.',
    build: [/Founder portrait to be supplied /g],
    to: '',
  },
  {
    why: 'Critique fixes: Insights stays off the primary nav and drawer until an article is published.',
    ref: [/Our Work Insights About/g],
    build: [/Our Work Insights About/g],
    to: 'Our Work About',
  },
  {
    why: 'Critique fixes: Insights stays off the footer company list too.',
    ref: [/(?<=Our Approach Our Work )Insights (?=Readiness Assessment)/g],
    to: '',
  },
  {
    why: 'Critique fixes: every closing section now carries the secondary "Check your readiness" link (stripped from both sides so the comparison stays symmetric).',
    ref: [/ ?Check your readiness →/g],
    build: [/ ?Check your readiness →/g],
    to: '',
  },
  {
    why: 'Critique fixes: the Insights index states plainly that nothing is published yet.',
    ref: [/The titles below are editorial commissions in preparation\. Each will open as a full article once written and approved\./g],
    build: [/The titles below are commissioned and in preparation; none is published yet\. Each opens as a full article once written and approved\./g],
    to: '',
  },
  {
    why: 'Visual upgrade: photographs carry a hover-revealed photographer credit.',
    build: CREDITS.map((c) => new RegExp('Photo: ' + c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')),
    to: '',
  },
];

/* Routes the prototype itself gets wrong, and which this build deliberately
   fixes. Compared against an expected substring instead of the prototype. */
const FIXED = {
  '/terms': {
    why: 'The prototype passes an always-empty `slug` as the Legal view, so /terms renders the Privacy Notice.',
    expect: 'Read the terms that apply when you use this website',
  },
};

const squash = (s) => s.replace(/\s+/g, '');

function normalise(text, side) {
  let out = text;
  KNOWN.forEach((k) => {
    (k[side] || []).forEach((rx) => { out = out.replace(rx, k.to); });
  });
  return squash(out);
}

let failures = 0;
let fixed = 0;

for (const route of Object.keys(ref)) {
  if (FIXED[route]) {
    const ok = (build[route] || '').includes(FIXED[route].expect);
    console.log(`${ok ? 'FIXED' : 'FAIL '}  ${route}  — ${FIXED[route].why}`);
    if (ok) fixed++; else failures++;
    continue;
  }

  const a = normalise(ref[route], 'ref');
  const b = normalise(build[route] || '', 'build');

  if (a === b) { console.log(`match  ${route}`); continue; }

  failures++;
  console.log(`DIFF   ${route}  (${a.length} vs ${b.length} chars)`);
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  console.log(`         first divergence at ${i}`);
  console.log(`         prototype: …${a.slice(Math.max(0, i - 40), i + 60)}`);
  console.log(`         build:     …${b.slice(Math.max(0, i - 40), i + 60)}`);
}

const total = Object.keys(ref).length;
console.log(`\n${total - failures}/${total} routes match (${fixed} deliberately fixed).`);
process.exit(failures ? 1 : 0);
