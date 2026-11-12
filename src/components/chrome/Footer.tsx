import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { site, whatsappLink, nav } from "@/lib/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { BackToTop, CookieSettingsButton } from "./FooterClient";
import SocialLinks from "./SocialLinks";
import { Reveal } from "@/components/anim/primitives";

export default function Footer() {
  // Contact channels only. Social platforms are handled by <SocialLinks />, which
  // renders inactive icons until an official profile URL is configured.
  const channels = [
    { label: "WhatsApp", href: whatsappLink(), icon: <WhatsAppIcon size={18} />, ext: true },
    { label: "Email", href: `mailto:${site.email}`, icon: <Mail size={18} />, ext: false },
    { label: "Call", href: site.phoneHref, icon: <Phone size={18} />, ext: false },
    { label: "Location", href: site.mapUrl, icon: <MapPin size={18} />, ext: true },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-ivory" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="orb -left-40 top-0 h-[420px] w-[420px] bg-brand-700/40" />
      <div className="orb -right-40 bottom-20 h-[380px] w-[380px] bg-steel/10" />

      <div className="container-x relative pt-20 md:pt-28">
        {/* Top CTA band */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-16 md:flex-row md:items-end md:justify-between">
          <Reveal variant="blur">
            <p className="eyebrow text-brand-300">Have a project in mind?</p>
            <Link href="/contact/" className="group mt-4 inline-flex items-center gap-4 display text-[clamp(2.4rem,7vw,6rem)]" data-cursor="hover">
              <span>Let&apos;s <span className="serif-i text-gradient">talk</span></span>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-gradient transition-transform duration-700 group-hover:rotate-45 md:h-20 md:w-20"><ArrowUpRight className="h-6 w-6 md:h-9 md:w-9" /></span>
            </Link>
          </Reveal>
          <div className="flex flex-wrap gap-2" aria-label="Contact channels">
            {channels.map((c) => (
              <a key={c.label} href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={c.label}
                className="group grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-500/20 hover:text-white">
                <span className="transition-transform duration-500 group-hover:scale-110">{c.icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Image src="/assets/brand/adelogix-logo-white.png" alt="Adelogix" width={170} height={39} className="h-9 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {site.legalName} designs, builds and supports web platforms, mobile apps and custom business software for startups, growing companies and established teams.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/70">
              <li><a href={`mailto:${site.email}`} className="link-u inline-flex items-center gap-3"><Mail size={15} className="text-brand-300" />{site.email}</a></li>
              <li><a href={site.phoneHref} className="link-u inline-flex items-center gap-3"><Phone size={15} className="text-brand-300" />{site.phone}</a></li>
              <li><a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-start gap-3"><MapPin size={15} className="mt-0.5 shrink-0 text-brand-300" />{site.location}</a></li>
            </ul>
            <SocialLinks className="mt-9" />
          </div>
          <FooterCol title="Company" className="md:col-span-2" links={[...nav.map((n) => ({ label: n.label, href: n.href })), { label: "Privacy Policy", href: "/privacy-policy/" }]} />
          <FooterCol title="Services" className="md:col-span-3" links={services.map((s) => ({ label: s.name, href: `/services/${s.slug}/` }))} />
          <FooterCol title="Work" className="md:col-span-3" links={[...projects.map((p) => ({ label: p.name, href: `/work/${p.slug}/` })), { label: "Technologies", href: "/technologies/" }]} />
        </div>

        {/* Giant wordmark */}
        <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <p className="display text-center text-[22vw] leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(207,195,238,.18)] xl:text-[17rem]">Adelogix</p>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-white/10 py-8 text-xs text-white/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li><Link href="/privacy-policy/" className="link-u">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="link-u">Terms &amp; Conditions</Link></li>
            <li><CookieSettingsButton /></li>
            <li><Link href="/sitemap.xml" className="link-u">Sitemap</Link></li>
          </ul>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = "" }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow text-white/40">{title}</p>
      <ul className="mt-5 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
              <span className="h-px w-0 bg-brand-300 transition-all duration-500 group-hover:w-3" />{l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
