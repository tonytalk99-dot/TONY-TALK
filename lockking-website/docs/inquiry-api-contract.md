# Inquiry API Contract

The browser submits only after client-side validation passes. It calls `VITE_INQUIRY_ENDPOINT` with `POST` and JSON. The UI shows success only when the endpoint returns an HTTP 2xx response (the adapter checks `response.ok`).

## Request

```http
POST /api/inquiries
Content-Type: application/json
Accept: application/json
```

```json
{
  "fullName": "Alex Morgan",
  "businessEmail": "alex@example.com",
  "company": "Example Brand",
  "country": "Germany",
  "role": "brand-owner",
  "productInterest": "slim",
  "quantity": "not-sure",
  "timeline": "3-6",
  "collaboration": "odm",
  "nda": true,
  "projectDetails": "Evaluating a slim-frame smart lock for a residential project.",
  "consent": true,
  "productContextId": "slim-frame-smart-lock",
  "inquiryIntent": "sample",
  "language": "en",
  "source": "lockking-website"
}
```

## Field notes

| Field | Notes |
| --- | --- |
| `fullName` | Required, trimmed, at least 2 characters in the browser |
| `businessEmail` | Required, basic email syntax validated in the browser |
| `company` | Required |
| `country` | Required |
| `role` | `brand-owner`, `importer`, `distributor`, `integrator`, `other`, or empty |
| `productInterest` | `residential`, `commercial`, `slim`, `not-sure` |
| `quantity` | `not-sure`, `sample`, `pilot`, `production`; not a confirmed MOQ |
| `timeline` | `not-sure`, `0-3`, `3-6`, `6-12`, `12-plus` |
| `collaboration` | `oem`, `odm`, `both`, `not-sure` |
| `nda` | Boolean preference, not a signed agreement |
| `projectDetails` | Required, at least 20 characters in the browser |
| `consent` | Always `true` when submitted; consent checkbox is not prechecked |
| `productContextId` | Product direction ID or `null`; no product name is trusted from the URL |
| `inquiryIntent` | `quote`, `sample`, `oem`, `odm`, `project` |
| `language` | `en` or `zh` |
| `source` | Static website identifier |

The hidden honeypot value is never included in the payload. If a bot fills it, the client prevents submission. The endpoint must still apply its own anti-spam measures because client-side checks can be bypassed.

## Required server behavior

1. Require HTTPS.
2. Re-validate every field on the server; never trust client validation.
3. Reject unexpected fields and oversized payloads.
4. Enforce rate limiting by trusted client IP or edge-provided identity.
5. Add provider-native spam protection or CAPTCHA if abuse is observed.
6. Store email/CRM credentials only in server-side environment variables.
7. Do not log full inquiry payloads, email addresses, phone numbers or project details in application logs.
8. Define data retention, access control and deletion procedures before launch.
9. Send notification email only after the record is accepted; email failure must not silently turn into a false success.
10. Return a 2xx status only after the inquiry is durably accepted or handed to a reliable queue.

## Suggested responses

| Status | Meaning | Frontend behavior |
| --- | --- | --- |
| `200` / `201` / `202` | Accepted | Shows success |
| `400` | Invalid input | Shows generic retry error |
| `429` | Rate limited | Shows generic retry error |
| `5xx` | Server failure | Shows generic retry error |

The adapter intentionally does not echo server error details to the page and does not log the payload to the browser console.

## Environment

```dotenv
VITE_INQUIRY_ENDPOINT=https://your-domain.example/api/inquiries
VITE_PUBLIC_CONTACT_EMAIL=sales@your-domain.example
VITE_SITE_URL=https://your-domain.example
```

`VITE_INQUIRY_ENDPOINT` is a public URL, not a secret. Never place SMTP passwords, API keys or private keys in a `VITE_*` variable.