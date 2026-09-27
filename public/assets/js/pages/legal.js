/* Pattern Grid — Privacy Notice and Website Terms. */
(function () {
  'use strict';

  var PG = window.PG;
  var html = PG.core.html;

  var COPY = {
    privacy: {
      title: 'Privacy Notice',
      intro: 'This notice will explain what information the Pattern Grid website collects, why, and how it is used when you make an enquiry or take the readiness assessment.',
      status: 'The approved privacy notice is being prepared to reflect the actual form destination, analytics and assessment data flow before launch. Until then: enquiry details are used only to respond to you, and readiness-assessment answers stay in your browser session unless you choose to include a summary in an enquiry.'
    },
    terms: {
      title: 'Website Terms',
      intro: 'These terms will set out the conditions for using the Pattern Grid website and its content.',
      status: 'Approved website terms are being prepared for publication and will appear here before launch.'
    }
  };

  PG.pages = PG.pages || {};

  PG.pages.legal = {
    meta: function (p) {
      var c = COPY[p.view];
      return { title: c.title, desc: c.intro, heroKey: p.view, crumbs: [{ name: c.title, path: '/' + p.view }] };
    },

    render: function (p) {
      var c = COPY[p.view];
      return html`
        ${PG.hero(p.view)}
        <section style="padding:24px 0 clamp(96px,10vw,160px)">
          <div class="wrap stack stack-24" data-reveal="rise">
            <nav class="crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${c.title}</span>
            </nav>
            <div class="stack stack-14" style="max-width:40em;padding:20px 24px;background:var(--paper);border-radius:var(--radius);font-size:16px;line-height:1.6">
              <span class="lbl" style="color:var(--muted)">Status</span>
              <p>${c.status}</p>
            </div>
            <a class="arrow" href="/contact" style="margin-top:8px">Questions about this page? Contact us <span class="chev" aria-hidden="true">→</span></a>
          </div>
        </section>`;
    }
  };
})();
