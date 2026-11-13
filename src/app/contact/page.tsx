import type { Metadata } from "next";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import { Reveal, Magnetic } from "@/components/anim/primitives";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { SectionHeader } from "@/components/sections/blocks";
import { FAQ } from "@/components/sections/interactive-b";
import { site, whatsappLink } from "@/lib/site";
import { nextSteps, generalFaqs } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact Us: Discuss Your Project",
  description: "Tell Adelogix about your project. Email, phone, WhatsApp or the project enquiry form — we reply using your preferred contact method.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const cards = [
    { icon: <Mail size={20} />, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: <Phone size={20} />, label: "Phone", value: site.phone, href: site.phoneHref },
    { icon: <WhatsAppIcon size={20} />, label: "WhatsApp", value: "Message us on WhatsApp", href: whatsappLink(), ext: true },
    { icon: <MapPin size={20} />, label: "Location", value: site.location, href: site.mapUrl, ext: true },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact" shape="galaxy" hue="#b48cff" big="Hello"
        title="Tell us about your *project.*"
        intro="Whether you have a detailed brief or just an idea, start here. A short message is enough for us to understand what you need and suggest a next step."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      >
        <Button href="#form">Start your enquiry</Button>
        <Button href={whatsappLink()} external variant="ghost" icon={<WhatsAppIcon size={15} />}>WhatsApp us</Button>
      </PageHero>

      <section id="form" className="relative scroll-mt-20 bg-ink-2 py-20 md:py-32">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <aside className="space-y-3 lg:col-span-4">
            <Reveal variant="clip-up"><p className="eyebrow text-brand-300">Contact information</p></Reveal>
            <Reveal stagger={0.08} variant="left" className="space-y-3 pt-4">
              {cards.map((c) => (
                <a key={c.label} href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-ink p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-300/50">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-brand-200 transition-colors group-hover:bg-brand-gradient group-hover:text-white">{c.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-white/40">{c.label}</span>
                    <span className="mt-1 block break-words text-white/85">{c.value}</span>
                  </span>
                  <ArrowUpRight size={16} className="ml-auto mt-1 shrink-0 text-white/30 transition-all group-hover:rotate-45 group-hover:text-white" />
                </a>
              ))}
            </Reveal>
            <Reveal variant="up" className="pt-4">
              <Magnetic>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 font-medium text-white shadow-[0_10px_40px_-10px_rgba(37,211,102,.7)]">
                  <WhatsAppIcon size={20} /> Chat on WhatsApp
                </a>
              </Magnetic>
            </Reveal>
          </aside>
          <Reveal variant="up" className="glass rounded-[32px] bg-ink/60 p-6 sm:p-8 md:p-12 lg:col-span-8">
            <h2 className="display text-3xl md:text-4xl">Project enquiry</h2>
            <div className="mt-6"><ContactForm /></div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="bg-ink">
        <div className="container-x py-20 md:py-28">
          <SectionHeader eyebrow="Office location" title="Based in *Bahawalpur,* working worldwide." intro={site.location} />
          <Reveal variant="mask" className="relative mt-12 overflow-hidden rounded-[28px] border border-white/10">
            <iframe title="Adelogix office location map" src={site.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[360px] w-full grayscale invert-[0.92] hue-rotate-180 md:h-[460px]" />
            <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="glass absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/70 px-4 py-2 text-sm">Open in Google Maps <ArrowUpRight size={14} /></a>
          </Reveal>
        </div>
      </section>

      {/* What happens next */}
      <section className="surface-light py-20 md:py-28">
        <div className="container-x">
          <SectionHeader light eyebrow="What happens next" title="After you get *in touch.*" />
          <div className="relative mt-16 grid gap-6 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-ink/10 md:block" />
            {nextSteps.map((s, i) => (
              <Reveal key={s.title} variant="up" delay={i * 0.15} className="relative">
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-ink font-mono text-sm text-ivory">0{i + 1}</span>
                <h3 className="mt-8 display text-2xl">{s.title}</h3>
                <p className="mt-3 text-ink/60">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeader eyebrow="Before you write" title="Quick *answers.*" className="!block" /></div>
          <div className="lg:col-span-8"><FAQ items={generalFaqs.filter((f) => ["Pricing", "Timelines", "Communication", "Support"].includes(f.topic))} /></div>
        </div>
      </section>
    </>
  );
}
