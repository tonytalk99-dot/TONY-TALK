# LOCKKING Smart Lock Website

Deployable LOCKKING B2B smart lock website. The site focuses on OEM/ODM inquiries, sample requests and engineering conversations. It is not a retail store.

## Stack

- React 19 + TypeScript
- Vite 6
- React Router
- Vitest + Testing Library
- Locally bundled Inter Variable font
- Original inline SVG concept visuals; no stock product or factory photography

## Local development

```powershell
npm install
npm run dev
```

## Checks

```powershell
npm run typecheck
npm test
npm run build
npm run preview
```

The production build is written to `dist/`.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/products` | Product directions and category filter |
| `/services` | OEM/ODM collaboration |
| `/factory` | Manufacturing and quality approach |
| `/contact` | B2B inquiry form |
| `/privacy` | Privacy draft pending legal review |

All routes support direct access and refresh when the host applies the included SPA fallback.

## Environment variables

Copy `.env.example` or configure these values in the deployment platform:

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_INQUIRY_ENDPOINT` | For live inquiries | HTTPS endpoint accepting the inquiry JSON contract |
| `VITE_PUBLIC_CONTACT_EMAIL` | When confirmed | Public contact address shown only after business confirmation |
| `VITE_SITE_URL` | After domain setup | Canonical and Open Graph absolute URL |

Do not place SMTP passwords, API keys or private keys in `VITE_*` variables. They are exposed in the browser build.

Without `VITE_INQUIRY_ENDPOINT`, the form clearly states that online submission is not activated and does not pretend to succeed.

## Inquiry API

Full request fields and server-side requirements are documented in [`docs/inquiry-api-contract.md`](docs/inquiry-api-contract.md).

## Deployment

### Vercel

- Root Directory: `lockking-website`
- Framework Preset: Vite
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`

`vercel.json` provides the SPA rewrite.

### Netlify

- Base directory: `lockking-website`
- Build command: `npm run build`
- Publish directory: `dist`

`public/_redirects` is copied into the build and provides the SPA fallback.

### Cloudflare Pages

- Root directory: `lockking-website`
- Build command: `npm run build`
- Build output directory: `dist`

Configure equivalent SPA fallback behavior if the platform does not process `_redirects`.

GitHub Pages is not the preferred host because the app uses History routing and requires explicit deep-link fallback handling.

## Content integrity

- Product entries are application directions, not confirmed production model numbers.
- Unverified specifications are not shown as facts.
- No certification badges, factory photos, capacity figures, customer logos or testimonials are invented.
- Product visuals are labeled as concept studies until approved real assets are supplied.

## Pending business confirmation

- Final LOCKKING brand name and trademark usage
- Legal entity, public address and contact details
- Actual product models, images, specifications and installation data
- OEM/ODM customization scope
- MOQ, sample policy, lead time and warranty
- Verified certificates and test reports
- Manufacturing model, facility, equipment and capacity evidence
- Inquiry endpoint, receiving mailbox and data-retention rules
- Production domain, hosting platform and final privacy policy

See `../smart-lock-website-handoff/BUSINESS_CONFIRMATION_CHECKLIST.md` in the local workspace for the detailed checklist; that business document is not part of this deployable application commit.