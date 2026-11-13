import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function signatureIsValid(rawBody: string, signature: string | null, appSecret: string) {
  if (!signature?.startsWith("sha256=")) return false;
  const expected = `sha256=${createHmac("sha256", appSecret).update(rawBody).digest("hex")}`;
  const received = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return received.length === expectedBuffer.length && timingSafeEqual(received, expectedBuffer);
}

// Meta calls this endpoint once while subscribing the app to a WhatsApp webhook.
export async function GET(request: Request) {
  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  if (!verifyToken) return new Response("WhatsApp webhook verification is not configured.", { status: 503 });

  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === verifyToken && challenge) {
    return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return new Response("Forbidden", { status: 403 });
}

// Incoming WhatsApp Cloud API events are signature-checked before acknowledgement.
// Add CRM/database processing after the Meta app is subscribed; avoid logging
// message text or contact details in production logs.
export async function POST(request: Request) {
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) return Response.json({ ok: false, error: "Webhook signing is not configured." }, { status: 503 });

  const rawBody = await request.text();
  if (!signatureIsValid(rawBody, request.headers.get("x-hub-signature-256"), appSecret)) {
    return Response.json({ ok: false, error: "Invalid signature." }, { status: 401 });
  }

  try {
    const payload = JSON.parse(rawBody) as {
      entry?: { changes?: { value?: { messages?: { id?: string }[] } }[] }[];
    };
    const count = payload.entry?.flatMap((entry) => entry.changes || []).flatMap((change) => change.value?.messages || []).length || 0;
    if (count) console.info(`[whatsapp-webhook] accepted ${count} incoming message event${count === 1 ? "" : "s"}.`);
  } catch {
    return Response.json({ ok: false, error: "Invalid webhook payload." }, { status: 400 });
  }

  // Meta requires a fast 200 acknowledgement. This intentionally does not expose
  // incoming content to the browser or claim that reply automation is enabled.
  return Response.json({ ok: true });
}
