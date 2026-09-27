/* Pattern Grid — per-route document head.
   The prototype was a single hash-routed document with one fixed <title>.
   Real paths let every page carry its own title, description, canonical,
   social card and structured data. */
(function () {
  'use strict';

  var PG = window.PG;
  var SITE = (PG.site = {
    name: 'Pattern Grid',
    tagline: 'Data, AI and Business Intelligence Consulting',
    origin: location.origin,
    description:
      'Pattern Grid helps organisations connect data, build trusted reporting and apply practical AI to improve business decisions.',
    locale: 'en_GB'
  });

  function head(sel, make) {
    var el = document.head.querySelector(sel);
    if (!el) { el = make(); document.head.appendChild(el); }
    return el;
  }

  function meta(attr, key, value) {
    var el = head('meta[' + attr + '="' + key + '"]', function () {
      var m = document.createElement('meta');
      m.setAttribute(attr, key);
      return m;
    });
    el.setAttribute('content', value);
  }

  function link(rel, href) {
    var el = head('link[rel="' + rel + '"]', function () {
      var l = document.createElement('link');
      l.setAttribute('rel', rel);
      return l;
    });
    el.setAttribute('href', href);
  }

  function jsonLd(id, data) {
    var el = document.getElementById(id);
    if (!data) { if (el) el.remove(); return; }
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }

  function clamp(text, n) {
    var t = String(text || '').replace(/\s+/g, ' ').trim();
    if (t.length <= n) return t;
    return t.slice(0, t.lastIndexOf(' ', n - 1)) + '…';
  }

  /* The hero image for a route doubles as its social card. */
  function socialImage(heroKey) {
    var hero = (PG.heroes && (PG.heroes[heroKey] || PG.heroes.home)) || null;
    if (!hero || !hero.images || !hero.images.length) return null;
    try { return PG.img.get(hero.images[0]).src; } catch (e) { return null; }
  }

  /**
   * @param {object} d
   * @param {string} d.title     page title, without the site suffix
   * @param {string} d.desc      meta description
   * @param {string} [d.heroKey] key into PG.heroes, for the social image
   * @param {Array}  [d.crumbs]  [{name, path}] excluding Home
   * @param {object} [d.schema]  extra JSON-LD for this page
   */
  PG.seo = function (d) {
    var full = d.title ? d.title + ' — ' + SITE.name : SITE.name + ' — ' + SITE.tagline;
    var desc = clamp(d.desc || SITE.description, 158);
    var url = SITE.origin + (PG.core.currentPath() || '/');
    var image = socialImage(d.heroKey || 'home');

    document.title = full;
    document.documentElement.lang = 'en-GB';

    meta('name', 'description', desc);
    link('canonical', url);

    meta('property', 'og:type', 'website');
    meta('property', 'og:site_name', SITE.name);
    meta('property', 'og:locale', SITE.locale);
    meta('property', 'og:title', full);
    meta('property', 'og:description', desc);
    meta('property', 'og:url', url);
    meta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    meta('name', 'twitter:title', full);
    meta('name', 'twitter:description', desc);
    if (image) {
      meta('property', 'og:image', image);
      meta('name', 'twitter:image', image);
      meta('property', 'og:image:alt', d.title || SITE.name);
    }

    /* Site-wide organisation record, written once. */
    jsonLd('ld-org', {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: SITE.name,
      description: SITE.description,
      url: SITE.origin,
      areaServed: ['NG', 'Africa', 'Worldwide'],
      knowsAbout: (PG.services || []).map(function (s) { return s.title; }),
      founder: {
        '@type': 'Person',
        name: 'Precious Chinenye Celestine',
        alternateName: 'Ada Africa',
        jobTitle: 'Founder & Lead Consultant'
      }
    });

    var crumbs = [{ name: 'Home', path: '/' }].concat(d.crumbs || []);
    jsonLd('ld-crumbs', crumbs.length > 1 ? {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(function (c, i) {
        return { '@type': 'ListItem', position: i + 1, name: c.name, item: SITE.origin + c.path };
      })
    } : null);

    jsonLd('ld-page', d.schema || null);
  };

  /* Structured data helpers used by the page modules. */
  PG.seo.service = function (svc) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: svc.title,
      serviceType: svc.title,
      description: svc.lead,
      provider: { '@type': 'Organization', name: SITE.name, url: SITE.origin },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: svc.title + ' deliverables',
        itemListElement: (svc.deliverables || []).map(function (x) {
          return { '@type': 'Offer', itemOffered: { '@type': 'Service', name: x.title, description: x.desc } };
        })
      }
    };
  };

  PG.seo.faq = function (faqs) {
    if (!faqs || !faqs.length) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(function (f) {
        return {
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        };
      })
    };
  };
})();
