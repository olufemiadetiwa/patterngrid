# Contact form — integration and production readiness

Status (19 October 2026): **the flow is complete and tested against a local mock; no production destination is configured yet.** Until one is, the live contact page shows an honest "not open yet" state rather than a form that discards enquiries, and points visitors at the readiness assessment. No email address, response time or booking link has been invented.

## How it works

- The page module is `public/assets/js/pages/contact.js`. It reads the endpoint from `window.PG_CONFIG.formEndpoint` (`public/assets/js/config.js`, no secrets) or, failing that, `data-form-endpoint` on `<body>`.
- With an endpoint: four required fields (name, work email, organisation, what to improve), optional context behind an "Add context" disclosure (service, role, how it works today, call times, newsletter opt-in), a honeypot, a draft kept in `sessionStorage` so nothing is lost on a failed send or an accidental navigation.
- States: idle → validation errors (field messages plus a focused summary with links to each field) → pending (`aria-busy`, disabled button, "Sending…", duplicate clicks ignored while in flight) → one of:
  - **success**: HTTP 2xx. The form is reset, the draft and the assessment summary are cleared, a confirmation names the reference id if the server returned one, and offers "Send another enquiry".
  - **server-side validation**: HTTP 422 with `{ "errors": { field: message } }`. Messages are shown on the fields and in the summary; entered data stays.
  - **server failure**: any other non-2xx. Entered data stays; the message says nothing was lost.
  - **network failure / timeout**: fetch rejection or a 15-second `AbortController` timeout. Same treatment.
- Service preselection (`/contact?service=business-intelligence`) and the assessment summary (included in the message; removable) are preserved.

## Request contract

`POST <formEndpoint>` with `Content-Type: application/json`:

```json
{
  "name": "…", "email": "…", "organisation": "…", "message": "…",
  "role": "", "service": "Business Intelligence", "process": "", "time": "", "optin": false,
  "assessment": "— Readiness assessment … (only when the visitor chose to include it)"
}
```

Responses the client understands: `200 { "ok": true, "id": "ENQ-0001" }`, `422 { "errors": { "email": "…" } }`, anything else = failure.

## Local mock (dev server)

`npm run dev` serves `config.js` with `formEndpoint: "/__enquiry"` and handles it in `tools/serve.js`: server-side validation mirrors the browser's; a message containing `fail422` returns a 422, `fail500` a 500, `slow` delays 20 s (timeout path). `GET /__enquiry` lists what the mock received. Set `PG_FORM_ENDPOINT=""` to see the production "not open yet" state locally, or `PG_FORM_ENDPOINT=https://…` to point at a real service.

## What production still needs (founder decision)

GitHub Pages cannot run a server, so one of:

1. **A form service** (Formspree, Basin, Web3Forms or similar): create the form, enable JSON submissions, set the public endpoint URL as `formEndpoint` in `public/assets/js/config.js`, and confirm the service's success/validation status codes match the contract above (most return 200 on success; map any custom validation response to 422 if offered).
2. **A small serverless function** (Cloudflare Worker, Netlify/Vercel function) that validates the payload, relays it to a mailbox or CRM, and answers with the contract. Keep any API key in that function's environment, never in the frontend.

Then: send one real test enquiry from the live site, confirm it arrives, and record the destination here. A verified business email address for the footer is a separate decision; it has not been added because none is confirmed.
