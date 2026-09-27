/* Pattern Grid — About, Founder and Our Approach. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each;

  function closing() {
    return html`
      <section style="padding:clamp(64px,8vw,128px) 0 clamp(96px,10vw,160px)">
        <div class="wrap row between" data-reveal="rise" style="border-top:1px solid var(--line);padding-top:clamp(56px,7vw,96px);gap:32px 64px">
          <h2 style="font-size:clamp(30px,3.6vw,56px);font-weight:600;line-height:1.08;letter-spacing:-.03em;color:var(--navy);max-width:18ch;text-wrap:balance">Start with the decision you need to improve.</h2>
          <div class="row" style="gap:16px 28px">
            <a class="btn" href="/contact">Book a Data &amp; AI Consultation</a>
            <a class="arrow" href="/assessment">Check your readiness <span class="chev" aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>`;
  }

  /* Founder feature and the team grid. Reserved frames stay until approved
     photographs and profiles are supplied in PG.team. */
  function peopleSection() {
    var T = PG.team || { founder: {}, members: [], reservedSlots: 0 };
    var f = T.founder;
    var slots = [];
    for (var i = 0; i < (T.reservedSlots || 0); i++) slots.push(i);

    return html`
      <section id="about-people" style="padding:0 0 clamp(64px,8vw,128px)">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(48px,6vw,80px);border-top:1px solid var(--line);padding-top:clamp(56px,7vw,96px)">
          <div class="founder-feature">
            ${C.portrait(f, { label: 'Founder portrait to be supplied' })}
            <div class="stack stack-20">
              <p class="eyebrow-caps">LEADERSHIP</p>
              <h2 class="h2-sm" style="color:var(--navy)">${f.name}</h2>
              <p style="font-size:16px;color:var(--muted)">${f.role} · Known professionally as ${f.alias}</p>
              <p class="body">${f.bio}</p>
              <a class="arrow" href="/about/precious-celestine">Meet the Founder <span class="chev" aria-hidden="true">→</span></a>
            </div>
          </div>

          <div class="stack stack-24">
            <div class="row between end" style="gap:16px 48px">
              <div class="stack stack-12">
                <p class="eyebrow-caps">THE TEAM</p>
                <h2 class="h2-sm" style="color:var(--navy);max-width:18ch">The people behind the work.</h2>
              </div>
              <p class="small muted" style="max-width:34em">Profiles appear here as they are approved. Roles are described by the work they do, not by title alone.</p>
            </div>
            <div class="team-grid">
              ${each(T.members, function (m) {
                return html`
                  <div class="person">
                    ${C.portrait(m, { ar: '3 / 4', label: m.name + ', portrait to be supplied' })}
                    <span class="nm">${m.name}</span>
                    <span class="rl">${m.role}</span>
                  </div>`;
              })}
              ${each(slots, function () {
                return html`
                  <div class="person" aria-hidden="true">
                    ${C.portrait(null, { ar: '3 / 4', label: 'Space reserved for a team profile' })}
                    <span class="rl">Profile to follow</span>
                  </div>`;
              })}
            </div>
          </div>
        </div>
      </section>`;
  }

  function about() {
    var photo = PG.img.get('arch-concrete');

    return html`
      ${PG.hero('about')}

      <section style="padding:0 0 clamp(56px,7vw,96px)">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:380px;--gap:32px;--gap-x:64px">
          <p class="lede">Businesses collect information across finance, sales, operations and customer systems. The difficulty is making that information consistent, connected and useful. Pattern Grid exists to help organisations build the systems and working practices that make this possible.</p>
          <p class="body muted">We bring business questions, data architecture, analytics and practical AI into the same conversation. The work begins with what the organisation needs to understand and continues through the foundations required to support it.</p>
        </div>
      </section>

      <section style="padding:0 0 clamp(64px,8vw,128px)">
        <div class="wrap" data-reveal="rise">
          ${C.frame(photo, { ar: '21 / 9', sizes: '100vw' })}
        </div>
      </section>

      <section class="bg-paper sec-sm">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:320px;--gap:48px;--gap-x:64px">
          <div class="stack stack-20">
            <p class="eyebrow-caps">OPERATING BELIEFS</p>
            <h2 style="font-size:clamp(30px,3.4vw,52px);font-weight:600;line-height:1.08;letter-spacing:-.03em;color:var(--navy);text-wrap:balance">How we work, in four commitments.</h2>
            <p style="font-size:16px;color:var(--muted);max-width:32em">African-founded, with an international outlook. The work is shaped around the organisation in front of us.</p>
          </div>
          <div class="rows">
            ${each(PG.beliefs, function (b, i) {
              return html`
                <div style="display:grid;grid-template-columns:40px minmax(0,1fr);gap:16px;padding:24px 0">
                  <span style="font-weight:500;font-size:12px;color:var(--muted);padding-top:6px">0${i + 1}</span>
                  <div class="stack stack-6">
                    <h3 style="font-size:22px;font-weight:600;color:var(--navy);line-height:1.25">${b.title}</h3>
                    <p style="font-size:16px;line-height:1.55">${b.copy}</p>
                  </div>
                </div>`;
            })}
          </div>
        </div>
      </section>

      <section id="about-path" class="sec-sm">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:320px;--gap:48px;--gap-x:64px">
          <div class="stack stack-20">
            <p class="eyebrow-caps">THE DECISION PATH</p>
            <h2 style="font-size:clamp(30px,3.4vw,52px);font-weight:600;line-height:1.08;letter-spacing:-.03em;color:var(--navy);text-wrap:balance">Five stages from question to action.</h2>
            <a class="arrow" href="/approach">Explore Our Approach <span class="chev" aria-hidden="true">→</span></a>
          </div>
          <div class="path">
            ${each(PG.stages, function (s, i) {
              return html`
                <div class="path-step">
                  <span class="n">0${i + 1}</span>
                  <span class="t">${s.name}</span>
                  <span class="o">${s.output}</span>
                </div>`;
            })}
          </div>
        </div>
      </section>

      ${peopleSection()}

      ${closing()}`;
  }

  function founder() {
    return html`
      ${PG.hero('founder')}

      <section style="padding:24px 0 clamp(64px,8vw,128px)">
        <div class="wrap stack stack-40" data-reveal="rise">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span>
            <a href="/about">About</a><span aria-hidden="true">/</span>
            <span aria-current="page">Founder</span>
          </nav>
          <div class="autogrid start" style="--min:360px;--gap:48px;--gap-x:96px">
            <div class="stack stack-24">
              ${C.portrait(PG.team && PG.team.founder, { label: 'Founder portrait to be supplied' })}
              <div class="stack stack-8">
                <p style="font-size:clamp(22px,2vw,30px);font-weight:600;line-height:1.2">Founder &amp; Lead Consultant, Pattern Grid</p>
                <p style="font-size:17px;color:var(--muted)">Known professionally as Ada Africa.</p>
              </div>
            </div>
            <div class="stack stack-24">
              <p style="font-size:clamp(17px,1.3vw,19px);line-height:1.6;max-width:34em">Precious Chinenye Celestine is a Data and AI professional and Business Intelligence consultant. Her experience spans reporting systems, analytics solutions, data platforms and decision-support capabilities, with exposure to financial services, investment technology and FMCG and distribution. At Pattern Grid, she brings these disciplines together around the business questions clients need to answer.</p>
              <div class="stack stack-12" style="border-top:1px solid var(--rule);padding-top:24px">
                <span class="lbl" style="color:var(--muted)">Selected experience</span>
                <p style="font-size:16px;line-height:1.6;max-width:34em">Reporting systems and analytical models for finance and commercial teams; data platform design and delivery; decision-support capabilities for investment technology and distribution businesses. Previous roles and personal projects are attributed to their organisations, not to Pattern Grid.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${closing()}`;
  }

  function approach() {
    return html`
      ${PG.hero('approach')}

      <section class="sec-sm">
        <div class="wrap stack stack-40" data-reveal="rise">
          <div aria-label="Decision Path, fully labelled" class="bg-navy"
               style="border-radius:var(--radius-lg);padding:clamp(24px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:12px">
            ${each(PG.stages, function (s, i, arr) {
              var last = i === arr.length - 1;
              var style = last
                ? 'border:1px solid #FFFFFF;background:#FFFFFF;color:#02203D'
                : 'border:1px solid ' + (i === 2 ? '#38A0C3' : 'rgba(255,255,255,.3)') + ';color:#FFFFFF';
              return html`
                <div style="${style};display:flex;flex-direction:column;gap:10px;border-radius:var(--radius);padding:18px;min-height:200px">
                  <span class="mono" style="font-weight:500;font-size:10px;letter-spacing:.08em;opacity:.8">STAGE 0${i + 1}</span>
                  <span style="font-weight:600;font-size:18px">${s.name}</span>
                  <span style="font-size:13px;line-height:1.5;opacity:.9">${s.change}</span>
                  <span class="mono" style="margin-top:auto;font-weight:500;font-size:10px;letter-spacing:.04em;opacity:.75">OUTPUT · ${s.output}</span>
                </div>`;
            })}
          </div>

          <div class="rows">
            ${each(PG.stages, function (s, i) {
              return html`
                <div class="autogrid" style="--min:280px;--gap:12px;--gap-x:64px;padding:28px 0">
                  <div style="display:flex;gap:16px">
                    <span style="font-weight:500;font-size:12px;color:var(--muted);padding-top:6px">0${i + 1}</span>
                    <h2 class="h3" style="color:var(--navy)">${s.name}</h2>
                  </div>
                  <p class="body">${s.copy}</p>
                  <div class="stack stack-4">
                    <span class="label-caps">OUTPUT</span>
                    <span style="font-size:16px;color:var(--navy);font-weight:600">${s.output}</span>
                  </div>
                </div>`;
            })}
          </div>
        </div>
      </section>

      <section style="padding:0 0 clamp(64px,8vw,128px)">
        <div class="wrap stack stack-24" data-reveal="rise">
          <div class="stack stack-10" style="max-width:720px">
            <span class="eyebrow">Each capability has its own approach</span>
            <p class="body slate">The Decision Path is the shared shape. Each service applies it differently, with its own outputs and decision points. Capability Building supports ownership throughout.</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:12px">
            ${each(PG.services, function (s) {
              return html`
                <a href="/services/${s.slug}" class="stack stack-10"
                   style="padding:18px;border:1px solid rgba(7,19,28,.15);border-radius:var(--radius);color:var(--ink)">
                  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="#02203D"
                       stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="${PG.icon(s.icon)}"/></svg>
                  <span style="font-weight:600;font-size:16px">${s.title}</span>
                  <span class="lbl" style="color:var(--muted);line-height:1.6">${(s.approach || []).map(function (a) { return a.name; }).join(' → ')}</span>
                </a>`;
            })}
          </div>
        </div>
      </section>

      <section class="bg-paper sec-sm">
        <div class="wrap autogrid" data-reveal="rise" style="--min:320px;--gap:48px;--gap-x:64px;align-items:start">
          <div class="stack stack-20">
            <p class="eyebrow-caps">THREE PRINCIPLES</p>
            <div class="rows">
              <div style="padding:18px 0;font-size:19px;font-weight:600;color:var(--navy)">Agree success measures before delivery.</div>
              <div style="padding:18px 0;font-size:19px;font-weight:600;color:var(--navy)">Make ownership explicit.</div>
              <div style="padding:18px 0;font-size:19px;font-weight:600;color:var(--navy)">Evaluate the system with the people using it.</div>
            </div>
          </div>
          <div class="stack stack-20">
            <p class="eyebrow-caps">PROPOSED ENGAGEMENT FORMATS</p>
            <div class="rows">
              ${each(PG.engagements, function (e) {
                return html`
                  <div class="stack stack-4" style="padding:18px 0">
                    <span style="font-size:18px;font-weight:600;color:var(--navy)">${e.title}</span>
                    <span class="small muted">${e.copy}</span>
                  </div>`;
              })}
            </div>
            <a class="arrow" href="/assessment">Find your starting point with the readiness assessment <span class="chev" aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      ${closing()}`;
  }

  var META = {
    about: {
      title: 'About',
      desc: 'Pattern Grid helps organisations build the foundations for better decisions, bringing business understanding, technical care and practical thinking to the same table.',
      heroKey: 'about',
      crumbs: [{ name: 'About', path: '/about' }]
    },
    founder: {
      title: 'Precious Chinenye Celestine',
      desc: 'Meet Precious Chinenye Celestine, professionally known as Ada Africa, the founder of Pattern Grid.',
      heroKey: 'founder',
      crumbs: [{ name: 'About', path: '/about' }, { name: 'Founder', path: '/about/precious-celestine' }],
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Precious Chinenye Celestine',
        alternateName: 'Ada Africa',
        jobTitle: 'Founder & Lead Consultant',
        worksFor: { '@type': 'Organization', name: 'Pattern Grid' },
        knowsAbout: ['Business intelligence', 'Data engineering', 'Data strategy', 'AI and automation']
      }
    },
    approach: {
      title: 'Our Approach',
      desc: 'Begin with a business question. Establish the right foundations. Build what is useful, test it with the people who need it and keep improving.',
      heroKey: 'approach',
      crumbs: [{ name: 'Our Approach', path: '/approach' }]
    }
  };

  PG.pages = PG.pages || {};

  PG.pages.about = {
    meta: function (p) { return META[p.view]; },
    render: function (p) {
      if (p.view === 'founder') return founder();
      if (p.view === 'approach') return approach();
      return about();
    }
  };
})();
