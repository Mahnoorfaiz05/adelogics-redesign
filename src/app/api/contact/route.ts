import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const SERVICES = new Set([
  "web-development", "mobile-app-development", "custom-software-development", "ui-ux-design", "saas-development",
  "ai-development-automation", "crm-development", "erp-cms-development", "wordpress-development", "it-services",
  "product-development", "devops-cloud", "not-sure",
]);
const METHODS = new Set(["email", "phone", "whatsapp", "video"]);
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: "Invalid request." }, { status: 400 }); }

  // Honeypot: silently accept bots without storing.
  if (clip(body.website, 200)) return Response.json({ ok: true, id: null });

  const data = {
    name: clip(body.name, 120), email: clip(body.email, 200), company: clip(body.company, 160),
    service: clip(body.service, 60), budget: clip(body.budget, 60), details: clip(body.details, 5000),
    contactMethod: clip(body.contact_method, 20) || "email", phone: clip(body.phone, 40),
  };
  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!emailRe.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!SERVICES.has(data.service)) errors.service = "Please choose a service.";
  if (data.details.length < 10) errors.details = "Please tell us a little more (at least 10 characters).";
  if (!METHODS.has(data.contactMethod)) errors.contact_method = "Please choose a contact method.";
  if ((data.contactMethod === "phone" || data.contactMethod === "whatsapp") && !/^\+?[0-9\s()-]{7,}$/.test(data.phone))
    errors.phone = "Please enter a phone number so we can reach you.";
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  try {
    const [row] = await db.insert(enquiries).values({
      ...data, company: data.company || null, budget: data.budget || null, phone: data.phone || null,
    }).returning({ id: enquiries.id });
    return Response.json({ ok: true, id: row.id });
  } catch (e) {
    console.error("enquiry insert failed", e);
    // Validation passed — let the client continue with email delivery.
    return Response.json({ ok: true, id: null, stored: false });
  }
}

// Mark that the email (FormSubmit) delivery succeeded for a stored enquiry.
export async function PATCH(req: Request) {
  try {
    const { id } = (await req.json()) as { id?: number };
    if (typeof id === "number") await db.update(enquiries).set({ emailDelivered: true }).where(eq(enquiries.id, id));
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
