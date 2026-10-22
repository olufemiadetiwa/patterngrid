/* Pattern Grid — About, Founder and Our Approach. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, each = C.each, when = C.when;

  function closing(h) {
    return PG.closing({ h: h || 'Start with the decision you need to improve.' });
  }

  /* Founder and team. A portrait appears only once an approved photograph
     exists in PG.team; until then the layout is text-led, with no reserved
     frame. Team profiles appear once approved. */
  function peopleSection() {
    var T = PG.team || { founder: {}, members: [] };
    var f = T.founder;
    var showTeam = (T.members || []).length > 0;
    return html`
      <section id="about-people" class="sec-sm bg-paper">
        <div class="wrap stack" data-reveal="rise" style="gap:clamp(40px,5vw,64px)">
          <div class="founder-block${f.photo ? ' has-photo' : ''}">
            ${when(!!f.photo, function () { return C.portrait(f); })}
            <div class="stack stack-16">
              <span class="eyebrow">Leadership</span>
              <h2 class="h2-sm">${f.name}</h2>
              <p class="small muted">${f.role} · Known professionally as ${f.alias}</p>
              <p class="body">${f.bio}</p>
              <a class="arrow" href="/about/precious-celestine">Meet the founder <span class="chev" aria-hidden="true">→</span></a>
            </div>
          </div>
          ${when(showTeam, function () { return html`
          <div class="team-grid">
            ${each(T.members, function (m) {
              return html`<div class="person">${C.portrait(m, { ar: '3 / 4' })}<span class="nm">${m.name}</span><span class="rl">${m.role}</span></div>`;
            })}
          </div>`; })}
        </div>
      </section>`;
  }

  function about() {
    return html`
      ${PG.hero('about')}

      <section class="sec-sm">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:380px;--gap:32px;--gap-x:64px">
          <p class="lede">Every business collects information in its finance, sales, operations and customer systems. The hard part is making those numbers agree, connect and mean something. Pattern Grid exists to help you do that, in the systems and in the way your teams work.</p>
          <p class="body muted">We start with what you need to understand, then work back through the reporting, the data and the systems needed to support it.</p>
        </div>
      </section>


      ${peopleSection()}
      <section class="sec-sm">
        <div class="wrap autogrid start" data-reveal="rise" style="--min:320px;--gap:48px;--gap-x:64px">
          <div class="stack stack-20">
            <p class="label-caps">HOW WE WORK</p>
            <h2 class="h2-sm" style="color:var(--navy);text-wrap:balance">Four commitments.</h2>
            <p style="font-size:16px;color:var(--muted);max-width:32em">African-founded, with an international outlook. The work is shaped around the organisation in front of us.</p>
          </div>
          <div class="rows">
            ${each(PG.beliefs, function (b, i) {
              return html`
                <div style="display:grid;grid-template-columns:48px minmax(0,1fr);gap:16px;padding:24px 0">
                  <span class="num-cell" style="padding-top:6px">${C.cells(i)}0${i + 1}</span>
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
            <p class="label-caps">THE DECISION PATH</p>
            <h2 class="h2-sm" style="color:var(--navy);text-wrap:balance">Five stages from question to action.</h2>
            <a class="arrow" href="/approach">Explore Our Approach <span class="chev" aria-hidden="true">→</span></a>
          </div>
          <div class="path">
            ${each(PG.stages, function (s, i) {
              return html`
                <div class="path-step">
                  <span class="num-cell">${C.cells(i)}0${i + 1}</span>
                  <span class="t">${s.name}</span>
                  <span class="o">${s.output}</span>
                </div>`;
            })}
          </div>
        </div>
      </section>

      ${closing()}`;
  }

  function founder() {
    var f = (PG.team && PG.team.founder) || {};
    var D = PG.scene.data;
    return html`
      <section class="page-intro">
        <div class="wrap">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span>
            <a href="/about">About</a><span aria-hidden="true">/</span>
            <span aria-current="page">Founder</span>
          </nav>
          <span class="eyebrow">Founder</span>
          <h1>Precious Chinenye Celestine.</h1>
          <p class="lead">Founder and lead consultant, known professionally as Ada Africa. A data and AI professional and business intelligence consultant.</p>
          <div class="row" style="gap:16px 28px;margin-top:8px"><a class="btn" href="/contact">Discuss your business question</a></div>
        </div>
      </section>

      <section class="sec-xs">
        <div class="wrap founder-page" data-reveal="rise">
          ${when(!!f.photo, function () { return C.portrait(f, { eager: true }); })}
          <div class="stack stack-24">
            <p class="lede">Precious Chinenye Celestine is a data and AI professional and business intelligence consultant. Her experience spans reporting systems, analytics solutions, data platforms and decision-support capabilities, with exposure to financial services, investment technology and FMCG and distribution. At Pattern Grid, she brings these disciplines together around the business questions clients need to answer.</p>
            <dl class="founder-facts">
              <div><dt>Role</dt><dd>Founder &amp; Lead Consultant, Pattern Grid</dd></div>
              <div><dt>Known as</dt><dd>Ada Africa</dd></div>
              <div><dt>Disciplines</dt><dd>Business intelligence · data engineering · data strategy · AI and automation</dd></div>
              <div><dt>Sectors</dt><dd>Financial services · investment technology · FMCG and distribution</dd></div>
            </dl>
            <div class="stack stack-12" style="border-top:1px solid var(--rule);padding-top:24px">
              <span class="label-caps">Selected experience</span>
              <p class="body">Reporting systems and analytical models for finance and commercial teams; data platform design and delivery; decision-support capabilities for investment technology and distribution businesses.</p>
              <p class="small muted">This experience comes from previous roles and personal projects, not from work delivered by Pattern Grid. Client work will be labelled as such when it is published.</p>
            </div>
          </div>
          <div class="stack stack-16">
            <span class="label-caps">How she defines a measure</span>
            ${PG.scene.drawer({ chip: 'Definition', chipTone: 'ok', title: 'Net sales', text: D.definition, rows: [['Period', 'Week 36, by invoice date'], ['Unit', 'sample units (m)'], ['Source', D.ledgers.join(' · ')], ['Owner', D.owner]], note: 'The same row every figure on this site opens to. Sample data.' })}
            <div class="stack stack-10" style="border-top:1px solid var(--rule);padding-top:20px">
              <span class="label-caps">How she works</span>
              <ul class="ticks">${each(PG.beliefs, function (b) { return html`<li><strong>${b.title}</strong> ${b.copy}</li>`; })}</ul>
            </div>
          </div>
        </div>
      </section>

      ${closing('Bring your question to a first conversation.')}`;
  }

  function approach() {
    return html`
      ${PG.hero('approach')}

      <section class="sec-sm">
        <div class="wrap stack stack-40" data-reveal="rise">
          <div class="path">
            ${each(PG.stages, function (st, i) {
              return html`<div class="path-step"><span class="num-cell">${C.cells(i)}0${i + 1}</span><span class="t">${st.name}</span><span class="o">${st.output}</span></div>`;
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
            <span class="eyebrow">Each service runs the path differently</span>
            <p class="body slate">The Decision Path is the common pattern. Each service has its own five stages, outputs and review points. Capability Building runs alongside all of them so your team can take over.</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:12px">
            ${each(PG.services, function (s) {
              return html`
                <a href="/services/${s.slug}" class="stack stack-10"
                   style="padding:18px;border:1px solid rgba(7,19,28,.15);border-radius:var(--radius);color:var(--ink)">
                  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="#02203D"
                       stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="${PG.icon(s.icon)}"/></svg>
                  <span style="font-weight:600;font-size:16px">${s.title}</span>
                  <span class="label-caps" style="color:var(--muted);line-height:1.6">${(s.approach || []).map(function (a) { return a.name; }).join(' → ')}</span>
                </a>`;
            })}
          </div>
        </div>
      </section>

      <section class="bg-paper sec-sm">
        <div class="wrap autogrid" data-reveal="rise" style="--min:320px;--gap:48px;--gap-x:64px;align-items:start">
          <div class="stack stack-20">
            <p class="label-caps">THREE RULES WE HOLD TO</p>
            <div class="rows">
              <div style="padding:18px 0;font-size:19px;font-weight:600;color:var(--navy)">Agree success measures before delivery.</div>
              <div style="padding:18px 0;font-size:19px;font-weight:600;color:var(--navy)">Make ownership explicit.</div>
              <div style="padding:18px 0;font-size:19px;font-weight:600;color:var(--navy)">Evaluate the system with the people using it.</div>
            </div>
          </div>
          <div class="stack stack-20">
            <p class="label-caps">ENGAGEMENT FORMATS</p>
            <div class="rows">
              ${each(PG.engagements, function (e) {
                return html`
                  <div class="stack stack-4" style="padding:18px 0">
                    <span style="font-size:18px;font-weight:600;color:var(--navy)">${e.title}</span>
                    <span class="small muted">${e.copy}</span>
                  </div>`;
              })}
            </div>
            <a class="arrow" href="/assessment">Take the readiness assessment to find your starting point <span class="chev" aria-hidden="true">→</span></a>
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
