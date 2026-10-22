/* Pattern Grid — deployment configuration (no secrets belong here).
   formEndpoint: the HTTPS URL that receives enquiry POSTs as JSON
     { name, email, organisation, message, role?, service?, process?, time?, optin, assessment? }
     and answers 200 (JSON { ok: true }), 422 (JSON { errors: { field: message } })
     or another status for failure. Leave empty until an approved destination
     exists: the contact page then shows an honest "not open yet" state instead
     of a form that discards enquiries. See docs/ux/contact-integration.md.
   The dev server (tools/serve.js) overrides this file with a local mock. */
window.PG_CONFIG = {
  formEndpoint: ''
};
