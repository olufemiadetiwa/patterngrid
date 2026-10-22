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
        <section class="page-intro">
          <div class="wrap">
            <span class="eyebrow">404 · Page not found</span>
            <h1>That page is not here.</h1>
            <p class="lead">The address may have changed, or the link was copied incorrectly. These are good places to continue.</p>
            <div class="row" style="gap:16px 28px;margin-top:8px">
              <a class="btn" href="/">Go to the home page</a>
              <a class="btn btn-ghost" href="/services">See the services</a>
              <a class="arrow" href="/contact">Contact us <span class="chev" aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
        <section style="padding:0 0 clamp(96px,10vw,160px)"><div class="wrap"></div></section>`;
    }
  };
})();
