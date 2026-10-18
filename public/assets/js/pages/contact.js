/* Pattern Grid — Contact: a compact enquiry form with an honest delivery state.
   The form posts JSON to PG_CONFIG.formEndpoint (see assets/js/config.js).
   With no endpoint configured it does not pretend to send anything. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, when = C.when, raw = C.raw, each = C.each;

  var KEY_SUMMARY = 'pg-assessment-summary';
  var KEY_DRAFT = 'pg-enquiry-draft';
  var TIMEOUT_MS = 15000;

  function endpoint() {
    var cfg = window.PG_CONFIG || {};
    return (cfg.formEndpoint || document.body.getAttribute('data-form-endpoint') || '').trim();
  }

  /* One name per service, from the content model, so the form never drifts from the navigation. */
  var SERVICE_NAMES = {};
  (PG.services || []).forEach(function (s) { SERVICE_NAMES[s.slug] = s.title; });

  function summary() {
    try { return sessionStorage.getItem(KEY_SUMMARY) || ''; } catch (e) { return ''; }
  }
  function readDraft() {
    try { return JSON.parse(sessionStorage.getItem(KEY_DRAFT) || 'null') || null; } catch (e) { return null; }
  }
  function writeDraft(values) {
    try { sessionStorage.setItem(KEY_DRAFT, JSON.stringify(values)); } catch (e) { /* storage unavailable: the form still works */ }
  }
  function clearDraft() {
    try { sessionStorage.removeItem(KEY_DRAFT); } catch (e) { /* ignore */ }
  }

  var ERRORS = {
    name: 'Please enter your name.',
    email: 'Please enter your email address.',
    emailFormat: 'Please check the email address format.',
    organisation: 'Please enter your organisation.',
    message: 'Tell us briefly what you would like to improve.'
  };

  function validate(values) {
    var e = {};
    if (!values.name.trim()) e.name = ERRORS.name;
    if (!values.email.trim()) e.email = ERRORS.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = ERRORS.emailFormat;
    if (!values.organisation.trim()) e.organisation = ERRORS.organisation;
    if (!values.message.trim()) e.message = ERRORS.message;
    return e;
  }
  PG.contact = { validate: validate, ERRORS: ERRORS };

  function field(id, label, opts) {
    opts = opts || {};
    var required = !!opts.required;
    return html`
      <div class="field">
        <label for="f-${id}">${label}${raw(required ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="opt">(optional)</span>')}</label>
        ${when(!!opts.hint, function () { return html`<span class="hint" id="h-${id}">${opts.hint}</span>`; })}
        ${raw(opts.control)}
        ${when(required, function () { return html`<span class="err" id="e-${id}"></span>`; })}
      </div>`;
  }

  function attrs(id, required) {
    return 'id="f-' + id + '" name="' + id + '"' + (required ? ' required aria-required="true" aria-describedby="e-' + id + '"' : '');
  }

  function unavailable() {
    return html`
      <div class="notice notice-block" role="status">
        <strong>The enquiry form is not open yet.</strong>
        <p>We are finishing the connection that delivers enquiries. Nothing you type here would be sent, so the form is switched off rather than left looking as if it works. In the meantime the readiness assessment is available and keeps its result in your browser for when the form opens.</p>
        <a class="btn btn-ghost" href="/assessment">Take the readiness assessment <span class="chev" aria-hidden="true">→</span></a>
      </div>`;
  }

  function formMarkup(preset, sum, draft) {
    var d = draft || {};
    var initialMessage = d.message != null ? d.message : (sum ? '\n\n— ' + sum : '');
    var optionalOpen = !!(preset || d.role || d.service || d.process || d.time);
    return html`
      <form class="form form-lined" novalidate data-form aria-describedby="privacy-note">
        ${when(!!sum, function () {
          return html`
            <div class="notice notice-row" data-summary-row>
              <span>Your readiness assessment result is included in the message.</span>
              <button type="button" class="btn-link" data-remove-summary>Remove it</button>
            </div>`;
        })}

        <div class="autogrid" style="--min:220px;--gap:20px;--gap-x:20px">
          ${field('name', 'Name', { required: true, control: '<input ' + attrs('name', true) + ' type="text" autocomplete="name" value="' + C.esc(d.name || '') + '">' })}
          ${field('email', 'Work email', { required: true, control: '<input ' + attrs('email', true) + ' type="email" autocomplete="email" spellcheck="false" autocapitalize="off" inputmode="email" value="' + C.esc(d.email || '') + '">' })}
        </div>
        ${field('organisation', 'Organisation', { required: true, control: '<input ' + attrs('organisation', true) + ' type="text" autocomplete="organization" value="' + C.esc(d.organisation || '') + '">' })}
        ${field('message', 'What would you like to improve?', {
          required: true,
          hint: 'For example: two reports give different revenue figures, or the weekly stock report takes a day to build.',
          control: '<textarea ' + attrs('message', true) + ' rows="5" class="tall" aria-describedby="h-message e-message">' + C.esc(initialMessage) + '</textarea>'
        })}

        <details class="form-more" ${raw(optionalOpen ? 'open' : '')}>
          <summary>Add context <span class="opt">(optional: service, role, how it works today, meeting times)</span></summary>
          <div class="stack stack-20" style="padding-top:20px">
            ${field('service', 'Service you are interested in', {
              control:
                '<select id="f-service" name="service">' +
                '<option value="">Not sure yet</option>' +
                Object.keys(SERVICE_NAMES).map(function (k) {
                  var n = SERVICE_NAMES[k];
                  var sel = n === (d.service || preset);
                  return '<option value="' + C.esc(n) + '"' + (sel ? ' selected' : '') + '>' + C.esc(n) + '</option>';
                }).join('') + '</select>'
            })}
            ${field('role', 'Your role', { control: '<input id="f-role" name="role" type="text" autocomplete="organization-title" value="' + C.esc(d.role || '') + '">' })}
            ${field('process', 'How does this work today?', { control: '<textarea id="f-process" name="process" rows="3" placeholder="e.g. Finance exports three reports on Monday and reconciles them by hand">' + C.esc(d.process || '') + '</textarea>' })}
            ${field('time', 'Good times for a call', { control: '<input id="f-time" name="time" type="text" autocomplete="off" placeholder="e.g. weekday mornings, West Africa time" value="' + C.esc(d.time || '') + '">' })}
            <label class="check">
              <input type="checkbox" name="optin" ${raw(d.optin ? 'checked' : '')}>
              <span>Send me occasional Pattern Grid articles by email.</span>
            </label>
          </div>
        </details>

        <div class="hp" aria-hidden="true">
          <label for="f-website">Leave this field empty</label>
          <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off">
        </div>

        <div class="form-foot">
          <button type="submit" class="btn" data-submit>Send my enquiry</button>
          <p id="privacy-note" class="fine">We use these details only to reply to you. <a href="/privacy">Privacy notice</a>.</p>
        </div>
        <div class="form-status" data-status role="alert" hidden tabindex="-1"></div>
      </form>`;
  }

  PG.pages = PG.pages || {};

  PG.pages.contact = {
    meta: function () {
      return {
        title: 'Contact',
        desc: 'Tell us what you are trying to understand, improve or build. We reply to arrange a short conversation about the problem and suggest a sensible next step.',
        heroKey: 'contact',
        crumbs: [{ name: 'Contact', path: '/contact' }],
        schema: { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Pattern Grid', about: 'Data, AI and business intelligence consulting enquiries' }
      };
    },

    render: function (params, ctx) {
      var preset = SERVICE_NAMES[(ctx && ctx.query.get('service')) || ''] || '';
      var sum = summary();
      var live = !!endpoint();
      return html`
        <section class="page-intro compact">
          <div class="wrap">
            <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Contact</span></nav>
            <h1>Request a consultation.</h1>
            <p class="lead">Tell us what you are trying to understand, improve or build. We reply to arrange a short conversation about the problem, then suggest a sensible next step, which may be nothing more than that conversation.</p>
          </div>
        </section>

        <section class="sec-xs">
          <div class="wrap contact-layout">
            <div class="contact-main">
              ${live ? formMarkup(preset, sum, readDraft()) : unavailable()}
            </div>
            <aside class="contact-side">
              <div class="stack stack-14">
                <span class="label-caps">What happens next</span>
                <ol class="steps-list">
                  <li>We read your enquiry.</li>
                  <li>We reply to arrange a short conversation about the problem.</li>
                  <li>We suggest a next step. Sometimes that is just the conversation.</li>
                </ol>
              </div>
              <div class="stack stack-10" style="border-top:1px solid var(--rule);padding-top:20px">
                <span class="label-caps">Not sure where to start?</span>
                <p class="small slate">The readiness assessment takes about five minutes, needs no email address, and gives you a score, your weakest areas and up to three suggested next steps. You can send the result with your enquiry.</p>
                <a class="arrow" href="/assessment">Take the readiness assessment <span class="chev" aria-hidden="true">→</span></a>
              </div>
              <p class="fine" style="border-top:1px solid var(--rule);padding-top:20px">You do not need to share sensitive company data at this stage. If you prefer, describe the problem in general terms.</p>
            </aside>
          </div>
        </section>`;
    },

    mount: function (root, cleanup) {
      var form = root.querySelector('[data-form]');
      if (!form) return;

      var statusEl = form.querySelector('[data-status]');
      var submitBtn = form.querySelector('[data-submit]');
      var inflight = false;
      var controller = null;
      var draftT = null;

      function values() {
        var el = form.elements;
        return {
          name: el.name.value, email: el.email.value, organisation: el.organisation.value,
          message: el.message.value, role: el.role.value, service: el.service.value,
          process: el.process.value, time: el.time.value, optin: el.optin.checked
        };
      }

      function setError(name, message) {
        var input = form.elements[name];
        var err = form.querySelector('#e-' + name);
        if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
        if (err) err.textContent = message || '';
      }
      function clearErrors() {
        ['name', 'email', 'organisation', 'message'].forEach(function (k) { setError(k, ''); });
      }
      function status(kind, markup) {
        if (!statusEl) return;
        statusEl.className = 'form-status' + (kind ? ' is-' + kind : '');
        statusEl.innerHTML = markup || '';
        statusEl.hidden = !markup;
        if (markup) statusEl.focus({ preventScroll: false });
      }
      function busy(on) {
        inflight = on;
        submitBtn.disabled = on;
        submitBtn.setAttribute('aria-busy', on ? 'true' : 'false');
        submitBtn.textContent = on ? 'Sending…' : 'Send my enquiry';
        form.classList.toggle('is-busy', on);
      }
      function showErrors(errors, intro) {
        var keys = Object.keys(errors);
        keys.forEach(function (k) { setError(k, errors[k]); });
        status('error', '<strong>' + C.esc(intro) + '</strong><ul>' + keys.map(function (k) {
          return '<li><a href="#f-' + C.esc(k) + '">' + C.esc(errors[k]) + '</a></li>';
        }).join('') + '</ul>');
      }

      var onInput = function (e) {
        if (e.target.name) setError(e.target.name, '');
        clearTimeout(draftT);
        draftT = setTimeout(function () { writeDraft(values()); }, 300);
      };
      form.addEventListener('input', onInput);

      var onClick = function (e) {
        if (e.target.closest('[data-remove-summary]')) {
          try { sessionStorage.removeItem(KEY_SUMMARY); } catch (err) { /* ignore */ }
          var row = form.querySelector('[data-summary-row]');
          if (row) row.remove();
          var msg = form.elements.message;
          if (msg) msg.value = msg.value.replace(/\n\n— Readiness assessment[\s\S]*$/, '');
          writeDraft(values());
          return;
        }
        var jump = e.target.closest('.form-status a[href^="#f-"]');
        if (jump) {
          e.preventDefault();
          var target = form.querySelector(jump.getAttribute('href'));
          if (target) target.focus();
        }
      };
      form.addEventListener('click', onClick);

      var onSubmit = function (e) {
        e.preventDefault();
        if (inflight) return; // a second click while the first request is in flight does nothing

        // A filled honeypot means a bot; acknowledge and post nothing.
        if (form.elements.website && form.elements.website.value) {
          status('ok', '<strong>Thank you.</strong> Your enquiry has been received.');
          return;
        }

        var v = values();
        clearErrors();
        var errors = validate(v);
        if (Object.keys(errors).length) {
          showErrors(errors, 'Please check the highlighted fields.');
          return;
        }

        var url = endpoint();
        if (!url) { status('error', '<strong>The enquiry form is not connected yet.</strong> Your details are still in the form. Please try again later.'); return; }

        var sum = summary();
        if (sum) v.assessment = sum;
        busy(true);
        status('', '');
        controller = ('AbortController' in window) ? new AbortController() : null;
        var timer = setTimeout(function () { if (controller) controller.abort(); }, TIMEOUT_MS);

        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(v),
          signal: controller ? controller.signal : undefined
        }).then(function (r) {
          return r.text().then(function (text) {
            var data = null;
            try { data = text ? JSON.parse(text) : null; } catch (err) { data = null; }
            if (r.status === 422 && data && data.errors) {
              showErrors(data.errors, 'The server could not accept this yet.');
              return;
            }
            if (!r.ok) throw new Error('HTTP ' + r.status);
            var id = data && data.id ? ' Reference ' + C.esc(String(data.id)) + '.' : '';
            form.reset();
            clearDraft();
            try { sessionStorage.removeItem(KEY_SUMMARY); } catch (err) { /* ignore */ }
            var row = form.querySelector('[data-summary-row]'); if (row) row.remove();
            form.classList.add('is-sent');
            status('ok', '<strong>Thank you, ' + C.esc(v.name.trim().split(/\s+/)[0]) + '. Your enquiry has been received.</strong>' + id +
              ' We will reply to ' + C.esc(v.email.trim()) + ' to arrange a short conversation. <button type="button" class="btn-link" data-another>Send another enquiry</button>');
          });
        }).catch(function (err) {
          var timedOut = err && err.name === 'AbortError';
          status('error', '<strong>' + (timedOut ? 'That took too long and was cancelled.' : 'Your enquiry could not be sent.') + '</strong> ' +
            'Nothing has been lost: your details are still in the form. Check your connection and try again.');
        }).finally(function () {
          clearTimeout(timer);
          busy(false);
        });
      };
      form.addEventListener('submit', onSubmit);

      var onAnother = function (e) {
        if (!e.target.closest('[data-another]')) return;
        form.classList.remove('is-sent');
        status('', '');
        var first = form.elements.name; if (first) first.focus();
      };
      form.addEventListener('click', onAnother);

      cleanup(function () {
        form.removeEventListener('input', onInput);
        form.removeEventListener('click', onClick);
        form.removeEventListener('click', onAnother);
        form.removeEventListener('submit', onSubmit);
        clearTimeout(draftT);
        if (controller) controller.abort();
      });
    }
  };
})();
