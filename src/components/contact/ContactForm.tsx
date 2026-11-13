"use client";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Info } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { services } from "@/data/services";

const budgets = ["Under $5,000", "$5,000 to $15,000", "$15,000 to $50,000", "$50,000 or more", "Not sure yet"];
const methods = [{ v: "email", l: "Email" }, { v: "phone", l: "Phone" }, { v: "whatsapp", l: "WhatsApp" }, { v: "video", l: "Video call" }];
type Errors = Partial<Record<string, string>>;

const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
};
const hasEmailJsConfig = Object.values(emailJsConfig).every(Boolean);

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [method, setMethod] = useState("email");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ type: "success" | "error"; title: string; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState("");
  const [subject, setSubject] = useState("New project enquiry");
  const lastAttempt = useRef<{ key: string; at: number }>({ key: "", at: 0 });

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("service");
    if (!q || !(services.some((s) => s.slug === q) || q === "not-sure")) return;
    const timer = window.setTimeout(() => {
      setService(q);
      const name = services.find((s) => s.slug === q)?.name;
      setSubject(name ? `${name} project enquiry` : "New project enquiry");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const needsPhone = method === "phone" || method === "whatsapp";

  const validate = (d: Record<string, string>): Errors => {
    const e: Errors = {};
    if (!d.name || d.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email || "")) e.email = "Please enter a valid email address.";
    if (!d.service) e.service = "Please choose a service.";
    if (!d.subject || d.subject.trim().length < 3) e.subject = "Please add a short subject.";
    if (!d.details || d.details.trim().length < 10) e.details = "Please tell us a little more (at least 10 characters).";
    if (needsPhone && !/^\+?[0-9\s()-]{7,}$/.test(d.phone || "")) e.phone = "Please enter a phone number so we can reach you.";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (loading) return;
    const data = Object.fromEntries(new FormData(ev.currentTarget).entries()) as Record<string, string>;
    const e = validate(data);
    setErrors(e);
    setStatus(null);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      (form.current?.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }

    if (!hasEmailJsConfig) {
      setStatus({
        type: "error",
        title: "Email delivery is being configured.",
        text: `Please email ${site.email} or use WhatsApp while the EmailJS service is connected.`,
      });
      return;
    }

    const key = JSON.stringify([data.name, data.email, data.subject, data.details]);
    if (key === lastAttempt.current.key && Date.now() - lastAttempt.current.at < 20_000) {
      setStatus({ type: "error", title: "Please wait before resending.", text: "We are already processing this enquiry. You can also message us on WhatsApp." });
      return;
    }

    setLoading(true);
    lastAttempt.current = { key, at: Date.now() };
    const firstName = (data.name || "").trim().split(/\s+/)[0];
    try {
      // Server-side validation and optional database backup. It never contains
      // EmailJS credentials and gracefully works when Postgres is not configured.
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        return;
      }
      if (!res.ok || !json.ok) throw new Error("Contact validation was unavailable");

      const serviceName = services.find((s) => s.slug === data.service)?.name || "Not sure yet";
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          to_email: site.email,
          from_name: data.name.trim(),
          from_email: data.email.trim(),
          reply_to: data.email.trim(),
          subject: data.subject.trim(),
          message: data.details.trim(),
          company: (data.company || "Not provided").trim(),
          service: serviceName,
          budget: data.budget || "Prefer not to say",
          preferred_contact_method: data.contact_method || "email",
          phone: (data.phone || "Not provided").trim(),
          submitted_at: new Date().toISOString(),
        },
        { publicKey: emailJsConfig.publicKey },
      );

      if (json.id) {
        fetch("/api/contact/", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: json.id }),
        }).catch(() => {});
      }
      form.current?.reset();
      setMethod("email");
      setService("");
      setSubject("New project enquiry");
      setStatus({
        type: "success",
        title: `Thank you${firstName ? `, ${firstName}` : ""}. Your message has been sent.`,
        text: "We will reply using your preferred contact method. If anything is urgent, message us on WhatsApp.",
      });
    } catch {
      setStatus({
        type: "error",
        title: "Sorry, your message could not be sent.",
        text: `Please try again shortly, email ${site.email}, or message us on WhatsApp.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const err = (k: string) => errors[k] ? <p id={`e-${k}`} className="mt-2 flex items-center gap-1.5 text-sm text-[#f08a7e]"><AlertCircle size={14} />{errors[k]}</p> : null;
  const label = "mb-2 block text-sm text-white/75";

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="relative space-y-6" aria-describedby="form-note">
      <p id="form-note" className="text-sm text-white/50">Fields marked * are required. It takes about two minutes.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <div><label htmlFor="f-name" className={label}>Name *</label><input id="f-name" name="name" autoComplete="name" className="field" aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />{err("name")}</div>
        <div><label htmlFor="f-email" className={label}>Business email *</label><input id="f-email" name="email" type="email" autoComplete="email" className="field" aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />{err("email")}</div>
        <div><label htmlFor="f-company" className={label}>Company</label><input id="f-company" name="company" autoComplete="organization" className="field" /></div>
        <div>
          <label htmlFor="f-service" className={label}>Project type *</label>
          <select id="f-service" name="service" className="field" value={service} onChange={(event) => setService(event.target.value)} aria-invalid={!!errors.service} aria-describedby={errors.service ? "e-service" : undefined}>
            <option value="">Select a service</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            <option value="not-sure">Not sure yet</option>
          </select>{err("service")}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="f-subject" className={label}>Subject *</label>
          <input id="f-subject" name="subject" value={subject} onChange={(event) => setSubject(event.target.value)} className="field" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "e-subject" : undefined} placeholder="e.g. Mobile app for a booking business" />
          {err("subject")}
        </div>
      </div>
      <fieldset>
        <legend className={label}>Budget range</legend>
        <div className="flex flex-wrap gap-2">
          <label className="cursor-pointer"><input type="radio" name="budget" value="" defaultChecked className="peer sr-only" /><span className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors peer-checked:border-transparent peer-checked:bg-ivory peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-brand-300">Prefer not to say</span></label>
          {budgets.map((b) => <label key={b} className="cursor-pointer"><input type="radio" name="budget" value={b} className="peer sr-only" /><span className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors peer-checked:border-transparent peer-checked:bg-ivory peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-brand-300">{b}</span></label>)}
        </div>
      </fieldset>
      <div>
        <label htmlFor="f-details" className={label}>Project description / message *</label>
        <textarea id="f-details" name="details" rows={6} className="field resize-y" placeholder="What are you building or improving, who is it for, and is there a deadline?" aria-invalid={!!errors.details} aria-describedby={errors.details ? "e-details" : undefined} />
        {err("details")}
      </div>
      <fieldset>
        <legend className={label}>Preferred contact method</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {methods.map((m) => <label key={m.v} className="cursor-pointer"><input type="radio" name="contact_method" value={m.v} checked={method === m.v} onChange={() => setMethod(m.v)} className="peer sr-only" /><span className="block rounded-2xl border border-white/15 px-4 py-3 text-center text-sm text-white/70 transition-all peer-checked:border-brand-300 peer-checked:bg-brand-500/20 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-300">{m.l}</span></label>)}
        </div>
      </fieldset>
      <AnimatePresence initial={false}>
        {needsPhone && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <label htmlFor="f-phone" className={label}>Phone number *</label>
            <input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="+92 313 8711670" className="field" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
            {err("phone")}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={loading} aria-disabled={loading} className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-brand-gradient px-8 py-4 font-medium text-white disabled:opacity-70">
          <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative">{loading ? "Sending…" : "Send enquiry"}</span>
          {loading ? <Loader2 size={18} className="relative animate-spin" /> : <ArrowUpRight size={18} className="relative transition-transform duration-500 group-hover:rotate-45" />}
        </button>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-u text-sm text-white/60">Prefer WhatsApp? Message us directly →</a>
      </div>

      <p className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/45">
        <Info size={15} className="mt-0.5 shrink-0 text-brand-300" />
        <span>{hasEmailJsConfig ? <>This form sends your enquiry to <a className="underline hover:text-white" href={`mailto:${site.email}`}>{site.email}</a> through EmailJS. Your sender email is included as the reply-to address.</> : <>EmailJS is not configured in this deployment yet. Please use <a className="underline hover:text-white" href={`mailto:${site.email}`}>{site.email}</a> or WhatsApp until it is connected.</>}</span>
      </p>

      <div aria-live="polite">
        <AnimatePresence>
          {status && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role={status.type === "error" ? "alert" : "status"} className={`flex gap-3 rounded-2xl p-5 ${status.type === "success" ? "bg-emerald-500/10 text-emerald-200" : "bg-red-500/10 text-red-200"}`}>
            {status.type === "success" ? <CheckCircle2 className="shrink-0" /> : <AlertCircle className="shrink-0" />}
            <div><p className="font-medium">{status.title}</p><p className="mt-1 text-sm opacity-80">{status.text}</p></div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </form>
  );
}
