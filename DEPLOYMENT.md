# Adelogix deployment and integrations

## Case-study assets

The website expects the original case-study files in `public/images/case-studies/`.
`public/images/case-studies/_manifest.json` is the source-of-truth mapping of every
expected original Drive file to its production-safe WebP path. It contains separate
folders for Uplift.ai, Fast VPN, Emyy, OriusPay, TruNext, USR CRM and XENPOP.

Each file must be copied using the exact lowercase filename in the manifest, for
example:

```text
public/images/case-studies/uplift-ai/01-introduction.webp
public/images/case-studies/fast-vpn/01-introduction.webp
```

The app deliberately uses only these local `/images/...` paths—never temporary
preview URLs, computer paths or remote stock imagery. All `next/image` instances
include a descriptive alt text and responsive `sizes` attribute.

## EmailJS

The contact form uses the official `@emailjs/browser` SDK. Add these **Production,
Preview and Development** variables in Vercel:

```text
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

1. In EmailJS, create an email service whose recipient is
   `Adelogixteam@gmail.com`.
2. Create a template addressed to `{{to_email}}` and configure the reply-to field
   as `{{reply_to}}` (or `{{from_email}}`).
3. Use the following template variables: `to_email`, `from_name`, `from_email`,
   `reply_to`, `subject`, `message`, `company`, `service`, `budget`,
   `preferred_contact_method`, `phone`, and `submitted_at`.
4. Copy the service ID, template ID and EmailJS **public** key into the matching
   Vercel variables, redeploy, and submit a real test enquiry.
5. Confirm that the test is received at `Adelogixteam@gmail.com` before claiming
   email delivery is active.

The public key is designed by EmailJS to be used in browser code. Do not add SMTP
passwords or any private email credentials to this project.

## WhatsApp click-to-chat

The floating WhatsApp button and all WhatsApp CTAs use the approved URL for
`+92 313 8711670` (`923138711670`). This feature is independent of Cloud API setup
and works on desktop and mobile.

## WhatsApp Business Cloud API

The secure routes are:

- `GET` and `POST` `/api/whatsapp/webhook/` — Meta verification and signed incoming events
- `POST` `/api/whatsapp/send/` — protected, server-to-server outbound text messages

Add these **server-only** Vercel variables (never prefix them with `NEXT_PUBLIC_`):

```text
WHATSAPP_CLOUD_API_ACCESS_TOKEN
WHATSAPP_CLOUD_PHONE_NUMBER_ID
WHATSAPP_CLOUD_API_VERSION=v23.0
WHATSAPP_WEBHOOK_VERIFY_TOKEN
WHATSAPP_APP_SECRET
WHATSAPP_API_INTERNAL_SECRET
```

Meta setup:

1. Create/configure the WhatsApp app and phone number in Meta Business.
2. Set the callback URL to `https://<production-domain>/api/whatsapp/webhook/`.
3. Enter the exact `WHATSAPP_WEBHOOK_VERIFY_TOKEN` as Meta's verify token.
4. Subscribe to the WhatsApp message webhook fields and set `WHATSAPP_APP_SECRET`
   so incoming requests are verified with `X-Hub-Signature-256`.
5. Store a long-lived access token, the phone-number ID and app secret only in
   Vercel. Do not place them in the client or repository.
6. For a trusted CRM/server automation, call `/api/whatsapp/send/` with
   `Authorization: Bearer <WHATSAPP_API_INTERNAL_SECRET>` and JSON
   `{ "to": "<E.164 number>", "message": "<text>" }`. Follow Meta's
   24-hour-session and template rules before automating any outbound message.

The routes intentionally return “not configured” until genuine Meta credentials
are supplied; they do not imply that the Cloud API is active.

## Optional contact backup

`DATABASE_URL` is optional. When configured, `POST /api/contact/` stores a backup
record and marks it delivered only after EmailJS accepts the message. The public
form remains usable without a database.

## Deployment checklist

1. Copy all files listed in the case-study manifest into `public/images/case-studies/`.
2. Configure EmailJS and, if required, WhatsApp Cloud API variables in Vercel.
3. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
4. Deploy the existing Vercel project; do not create a duplicate project.
5. On the actual production domain, check all seven case studies, team photos,
   logo/preloader, sticky header, footer social links, click-to-chat and a real
   EmailJS submission.
