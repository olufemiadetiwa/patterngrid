/* Pattern Grid — 404. */
(function () {
  'use strict';

  var PG = window.PG;
  var html = PG.core.html;

  PG.pages = PG.pages || {};

  PG.pages.notFound = {
    meta: function () {
      return {
        title: 'Page not found',
        desc: 'The address may have changed. The home page and services are good places to continue.',
        heroKey: 'notfound'
      };
    },

    render: function () {
      return html`
        ${PG.hero('notfound')}
        <section class="wrap" style="padding:64px var(--gutter) 128px">
          <p class="lbl" style="color:var(--muted);margin-bottom:20px">404 · Page not found</p>
          <p style="font-size:clamp(22px,2vw,30px);max-width:32ch;line-height:1.3;font-weight:500">The address may have changed. The home page and services are good places to continue.</p>
          <div class="row" style="gap:16px;margin-top:40px">
            <a class="btn" href="/">Go to the home page</a>
            <a class="arrow" href="/services">Explore services <span class="chev" aria-hidden="true">→</span></a>
          </div>
        </section>`;
    }
  };
})();
