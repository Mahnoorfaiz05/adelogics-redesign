import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { getService } from "@/data/services";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

const SERVICES = new Set([
  "web-development", "mobile-app-development", "custom-software-development", "ui-ux-design", "saas-development",
  "ai-development-automation", "crm-development", "erp-cms-development", "wordpress-development", "it-services",
  "product-development", "devops-cloud", "not-sure",
]);
const METHODS = new Set(["email", "phone", "whatsapp", "video"]);
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

// The primary names are server-only. The public names are retained as a migration
// fallback for the existing deployment until the Vercel variables are renamed.
const emailJsConfig = {
  serviceId: process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  templateId: process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
};
const emailJsReady = Object.values(emailJsConfig).every(Boolean);

type Enquiry = {
  name: string;
  email: string;
  company: string;
  subject: string;
  service: string;
  budget: string;
  details: string;
  contactMethod: string;
  phone: string;
};

export async function GET() {
  return Response.json({ deliveryConfigured: emailJsReady });
}

async function sendWithEmailJs(data: Enquiry) {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: emailJsConfig.serviceId,
      template_id: emailJsConfig.templateId,
      user_id: emailJsConfig.publicKey,
      template_params: {
        to_email: site.email,
        from_name: data.name,
        from_email: data.email,
        reply_to: data.email,
        subject: data.subject,
        message: data.details,
        company: data.company === "yes" ? "Yes" : "No",
        service: getService(data.service)?.name || "Not sure yet",
        budget: data.budget || "Prefer not to say",
        preferred_contact_method: data.contactMethod,
        phone: data.phone || "Not provided",
        submitted_at: new Date().toISOString(),
      },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    console.error("EmailJS delivery failed", { status: response.status });
    throw new Error("Email delivery failed");
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: "Invalid request." }, { status: 400 }); }

  // Honeypot: silently accept bots without storing or forwarding.
  if (clip(body.website, 200)) return Response.json({ ok: true, delivered: false, stored: false });

  const data: Enquiry = {
    name: clip(body.name, 120), email: clip(body.email, 200), company: clip(body.company, 160), subject: clip(body.subject, 200),
    service: clip(body.service, 60), budget: clip(body.budget, 60), details: clip(body.details, 5000),
    contactMethod: clip(body.contact_method, 20) || "email", phone: clip(body.phone, 40),
  };
  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (data.subject.length < 3) errors.subject = "Please add a short subject.";
  if (!emailRe.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!SERVICES.has(data.service)) errors.service = "Please choose a service.";
  if (data.company !== "yes" && data.company !== "no") errors.company = "Please select yes or no.";
  if (data.details.length < 10) errors.details = "Please tell us a little more (at least 10 characters).";
  if (!METHODS.has(data.contactMethod)) errors.contact_method = "Please choose a contact method.";
  if ((data.contactMethod === "phone" || data.contactMethod === "whatsapp") && !/^\+?[0-9\s()-]{7,}$/.test(data.phone)) {
    errors.phone = "Please enter a phone number so we can reach you.";
  }
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  if (!emailJsReady) {
    return Response.json({
      ok: false,
      error: "Email delivery is not configured on this deployment. Please use email or WhatsApp instead.",
    }, { status: 503 });
  }

  try {
    await sendWithEmailJs(data);
  } catch {
    return Response.json({
      ok: false,
      error: "We could not send your enquiry just now. Please try again shortly or contact us by email or WhatsApp.",
    }, { status: 502 });
  }

  // A database record is an optional backup. Delivery has already been accepted
  // by EmailJS, so an unavailable database never turns a successful enquiry into
  // an error for the visitor.
  if (!db) return Response.json({ ok: true, delivered: true, stored: false });

  try {
    const [row] = await db.insert(enquiries).values({
      ...data,
      company: data.company || null,
      budget: data.budget || null,
      phone: data.phone || null,
      emailDelivered: true,
    }).returning({ id: enquiries.id });
    return Response.json({ ok: true, delivered: true, stored: true, id: row.id });
  } catch (error) {
    console.error("enquiry backup insert failed", error);
    return Response.json({ ok: true, delivered: true, stored: false });
  }
}
