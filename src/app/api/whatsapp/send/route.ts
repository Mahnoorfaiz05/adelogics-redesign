export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const e164 = /^\+?[1-9]\d{7,14}$/;
const clip = (value: unknown, length: number) => typeof value === "string" ? value.trim().slice(0, length) : "";

/**
 * Server-only WhatsApp Cloud API sender.
 *
 * This endpoint is deliberately protected by WHATSAPP_API_INTERNAL_SECRET. It is
 * for a trusted server, CRM, or secure automation—not browser code. A free-form
 * WhatsApp message must also comply with Meta's session/template rules.
 */
export async function POST(request: Request) {
  const internalSecret = process.env.WHATSAPP_API_INTERNAL_SECRET;
  const accessToken = process.env.WHATSAPP_CLOUD_API_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_CLOUD_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_CLOUD_API_VERSION || "v23.0";

  if (!internalSecret || !accessToken || !phoneNumberId) {
    return Response.json({ ok: false, error: "WhatsApp Cloud API is not configured." }, { status: 503 });
  }
  if (request.headers.get("authorization") !== `Bearer ${internalSecret}`) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ ok: false, error: "Invalid request." }, { status: 400 }); }
  const to = clip(body.to, 20).replace(/^\+/, "");
  const message = clip(body.message, 4096);
  if (!e164.test(to) || message.length === 0) {
    return Response.json({ ok: false, error: "A valid E.164 recipient and message are required." }, { status: 422 });
  }

  try {
    const response = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: { preview_url: false, body: message },
      }),
    });
    const result = await response.json().catch(() => ({})) as { messages?: Array<{ id?: string }>; error?: { message?: string } };
    if (!response.ok) {
      console.error("WhatsApp Cloud API send failed", response.status, result.error?.message || "Unknown API error");
      return Response.json({ ok: false, error: "WhatsApp could not send the message." }, { status: response.status >= 500 ? 502 : 400 });
    }
    return Response.json({ ok: true, messageId: result.messages?.[0]?.id || null });
  } catch (error) {
    console.error("WhatsApp Cloud API network failure", error);
    return Response.json({ ok: false, error: "WhatsApp service is unavailable." }, { status: 502 });
  }
}
