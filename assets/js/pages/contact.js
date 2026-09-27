/* Pattern Grid — Contact enquiry form. */
(function () {
  'use strict';

  var PG = window.PG;
  var C = PG.core;
  var html = C.html, when = C.when, raw = C.raw;

  var KEY_SUMMARY = 'pg-assessment-summary';

  /* Set data-form-endpoint on <body> (or edit here) to go live. While it is
     empty the form validates and reports, but posts nothing. */
  function endpoint() {
    return document.body.getAttribute('data-form-endpoint') || '';
  }

  /* One name per service, taken from the content model so the form can never
     drift from the navigation. */
  var SERVICE_NAMES = {};
  (PG.services || []).forEach(function (s) { SERVICE_NAMES[s.slug] = s.title; });

  function summary() {
    try { return sessionStorage.getItem(KEY_SUMMARY) || ''; } catch (e) { return ''; }
  }

  function timezone() {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'your timezone'; }
    catch (e) { return 'your timezone'; }
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

  function field(id, label, opts) {
    opts = opts || {};
    var required = !!opts.required;
    return html`
      <div class="field">
        <label for="f-${id}">${label} ${raw(required
          ? '<span class="req" aria-hidden="true">*</span>'
          : '<span class="opt">(optional' + (opts.hint ? ', ' + C.esc(opts.hint) : '') + ')</span>')}</label>
        ${raw(opts.control)}
        ${when(required, function () { return html`<span class="err" id="e-${id}" role="alert"></span>`; })}
      </div>`;
  }

  PG.pages = PG.pages || {};

  PG.pages.contact = {
    meta: function () {
      return {
        title: 'Contact',
        desc: 'Tell us what you are trying to understand, improve or build. We will start with your business question and explore a useful next step.',
        heroKey: 'contact',
        crumbs: [{ name: 'Contact', path: '/contact' }],
        schema: {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Pattern Grid',
          about: 'Data, AI and business intelligence consulting enquiries'
        }
      };
    },

    render: function (params, ctx) {
      var preset = SERVICE_NAMES[(ctx && ctx.query.get('service')) || ''] || '';
      var sum = summary();
      var initialMessage = sum ? '\n\n— ' + sum : '';

      return html`
        ${PG.hero('contact')}

        <section style="padding:0 0 clamp(80px,9vw,144px)">
          <div class="wrap" data-reveal="rise">
          <div class="contact-grid">
            <div class="contact-aside">
              <h2 class="h2-sm" style="max-width:16ch">Tell us what you want to improve.</h2>
              <div class="stack stack-16">
                <span class="label-caps" style="color:rgba(255,255,255,.6)">WHAT HAPPENS NEXT</span>
                <div class="steps">
                  <span class="n">01</span><span>We read your enquiry.</span>
                  <span class="n">02</span><span>We reply to arrange a short conversation about the problem.</span>
                  <span class="n">03</span><span>We suggest a sensible next step, which may be nothing more than that conversation.</span>
                </div>
              </div>
              <p class="fine">You do not need to share sensitive company data at this stage. If you prefer, take the readiness assessment first and send the result with your enquiry.</p>
            </div>

            <form class="form form-lined" novalidate aria-describedby="privacy-note" data-form>
              ${when(!!sum, function () {
                return html`
                  <div class="notice notice-row" data-summary-row>
                    <span>Your assessment summary is included below.</span>
                    <button type="button" class="btn-link" data-remove-summary>Remove</button>
                  </div>`;
              })}

              <div class="autogrid" style="--min:220px;--gap:20px;--gap-x:20px">
                ${field('name', 'Name', {
                  required: true,
                  control: '<input id="f-name" name="name" type="text" autocomplete="name" aria-describedby="e-name">'
                })}
                ${field('email', 'Email address', {
                  required: true,
                  control: '<input id="f-email" name="email" type="email" autocomplete="email" spellcheck="false" autocapitalize="off" aria-describedby="e-email">'
                })}
                ${field('organisation', 'Organisation', {
                  required: true,
                  control: '<input id="f-organisation" name="organisation" type="text" autocomplete="organization" aria-describedby="e-organisation">'
                })}
                ${field('role', 'Role', {
                  control: '<input id="f-role" name="role" type="text" autocomplete="organization-title">'
                })}
              </div>

              ${field('service', 'Service you are interested in', {
                control:
                  '<select id="f-service" name="service">' +
                  '<option value="">Select an option</option>' +
                  Object.keys(SERVICE_NAMES).map(function (k) {
                    var n = SERVICE_NAMES[k];
                    return '<option value="' + C.esc(n) + '"' + (n === preset ? ' selected' : '') + '>' + C.esc(n) + '</option>';
                  }).join('') +
                  '<option value="Not Sure Yet">Not Sure Yet</option></select>'
              })}

              ${field('message', 'What would you like to improve?', {
                required: true,
                control:
                  '<textarea id="f-message" name="message" rows="6" class="tall" autocomplete="off" aria-describedby="e-message" ' +
                  'placeholder="For example: two reports give different revenue figures, or the weekly stock report takes a day to build.">' +
                  C.esc(initialMessage) + '</textarea>'
              })}

              ${field('process', 'How does this work today?', {
                control:
                  '<textarea id="f-process" name="process" rows="3" autocomplete="off" ' +
                  'placeholder="e.g. Finance exports three reports on Monday and reconciles them by hand"></textarea>'
              })}

              ${field('time', 'Preferred meeting time', {
                hint: timezone(),
                control: '<input id="f-time" name="time" type="text" autocomplete="off" placeholder="e.g. weekday mornings">'
              })}

              <label class="check">
                <input type="checkbox" name="optin">
                <span>Send me occasional Pattern Grid articles by email (optional).</span>
              </label>

              <div class="hp" aria-hidden="true">
                <label for="f-website">Leave this field empty</label>
                <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off">
              </div>

              <div class="stack stack-12" style="margin-top:4px">
                <button type="submit" class="btn" data-submit>Send my enquiry</button>
                <p id="privacy-note" class="fine">We will use these details to respond to your enquiry. <a href="/privacy">Read our Privacy Notice.</a></p>
                <p class="notice" role="status" data-status hidden></p>
              </div>
            </form>
          </div>
          </div>
        </section>`;
    },

    mount: function (root, cleanup) {
      var form = root.querySelector('[data-form]');
      if (!form) return;

      var statusEl = form.querySelector('[data-status]');
      var submitBtn = form.querySelector('[data-submit]');

      function setError(name, message) {
        var input = form.elements[name];
        var err = form.querySelector('#e-' + name);
        if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
        if (err) err.textContent = message || '';
      }

      function clearErrors() {
        ['name', 'email', 'organisation', 'message'].forEach(function (k) { setError(k, ''); });
      }

      function say(text) {
        if (!statusEl) return;
        statusEl.textContent = text;
        statusEl.hidden = !text;
      }

      var onInput = function (e) {
        if (e.target.name) setError(e.target.name, '');
      };
      form.addEventListener('input', onInput);

      var onClick = function (e) {
        if (!e.target.closest('[data-remove-summary]')) return;
        try { sessionStorage.removeItem(KEY_SUMMARY); } catch (err) { /* ignore */ }
        var row = form.querySelector('[data-summary-row]');
        if (row) row.remove();
        var msg = form.elements.message;
        if (msg) msg.value = msg.value.replace(/\n\n— Readiness assessment[\s\S]*$/, '');
      };
      form.addEventListener('click', onClick);

      var onSubmit = function (e) {
        e.preventDefault();

        // A filled honeypot means a bot; pretend success and post nothing.
        if (form.elements.website && form.elements.website.value) {
          say('Thank you. Your enquiry has been received.');
          return;
        }

        var values = {
          name: form.elements.name.value,
          email: form.elements.email.value,
          organisation: form.elements.organisation.value,
          role: form.elements.role.value,
          service: form.elements.service.value,
          message: form.elements.message.value,
          process: form.elements.process.value,
          time: form.elements.time.value,
          optin: form.elements.optin.checked
        };

        clearErrors();
        var errors = validate(values);
        var keys = Object.keys(errors);
        if (keys.length) {
          keys.forEach(function (k) { setError(k, errors[k]); });
          say('');
          var first = form.elements[keys[0]];
          if (first) first.focus();
          return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
        say('');

        var url = endpoint();
        if (!url) {
          // No destination configured yet — behave exactly as the prototype did.
          setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send my enquiry';
            say('We could not send this yet: the enquiry form is not connected to a mailbox. Your details are still in the form. Please copy them into an email to the address in the footer, or try again later.');
          }, 700);
          return;
        }

        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values)
        }).then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          form.reset();
          try { sessionStorage.removeItem(KEY_SUMMARY); } catch (err) { /* ignore */ }
          say('Thank you. Your enquiry has been received. We will review the details and contact you about the next step.');
        }).catch(function () {
          say('Your enquiry could not be sent just now. Please try again, or use the email address in the footer.');
        }).finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Request a Consultation';
        });
      };
      form.addEventListener('submit', onSubmit);

      /* The hero CTA focuses the form rather than navigating. */
      var onFocusForm = function () {
        var el = document.getElementById('f-name');
        if (el) { el.focus(); el.scrollIntoView({ block: 'center', behavior: C.motion.reduced ? 'auto' : 'smooth' }); }
      };
      window.addEventListener('pg-focus-form', onFocusForm);

      cleanup(function () {
        form.removeEventListener('input', onInput);
        form.removeEventListener('click', onClick);
        form.removeEventListener('submit', onSubmit);
        window.removeEventListener('pg-focus-form', onFocusForm);
      });
    }
  };
})();
