import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { site, whatsappLink, nav } from "@/lib/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { BackToTop, CookieSettingsButton } from "./FooterClient";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  // Contact channels; the verified social profile links are rendered by <SocialLinks />.
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

      <div className="container-x relative pt-14 sm:pt-16 md:pt-24">
        {/* Top CTA band */}
        <div className="flex flex-col gap-7 border-b border-white/10 pb-10 sm:gap-8 sm:pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
          <div>
            <p className="eyebrow text-brand-300">Have a project in mind?</p>
            <Link href="/contact/" className="group mt-4 inline-flex items-center gap-3 display text-[clamp(2.15rem,7vw,6rem)]">
              <span>Let&apos;s <span className="serif-i text-gradient">talk</span></span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-gradient transition-transform duration-500 group-hover:rotate-45 sm:h-14 sm:w-14 md:h-20 md:w-20"><ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-9 md:w-9" /></span>
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-2 self-start md:self-auto" aria-label="Contact channels">
            {channels.map((c) => (
              <a key={c.label} href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={c.label}
                className="group grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-500/20 hover:text-white sm:h-12 sm:w-12">
                <span className="transition-transform duration-500 group-hover:scale-110">{c.icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-12 md:py-16">
          <div className="sm:col-span-2 md:col-span-4">
            <span className="inline-flex rounded-xl bg-ivory p-2.5"><Image src="/images/brand/adelogix-logo-original.png" alt="Adelogix" width={234} height={51} className="h-8 w-auto" /></span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60 sm:mt-6">
              {site.legalName} designs, builds and supports web platforms, mobile apps and custom business software for startups, growing companies and established teams.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-white/70 sm:mt-8">
              <li><a href={`mailto:${site.email}`} className="link-u inline-flex min-h-11 max-w-full items-center gap-3 break-all"><Mail size={15} className="shrink-0 text-brand-300" />{site.email}</a></li>
              <li><a href={site.phoneHref} className="link-u inline-flex min-h-11 items-center gap-3"><Phone size={15} className="shrink-0 text-brand-300" />{site.phone}</a></li>
              <li><a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="link-u inline-flex min-h-11 max-w-sm items-start gap-3 leading-relaxed"><MapPin size={15} className="mt-1.5 shrink-0 text-brand-300" /><span>{site.location}</span></a></li>
            </ul>
            <SocialLinks className="mt-8 sm:mt-9" />
          </div>
          <FooterCol title="Company" className="md:col-span-2" links={[...nav.map((n) => ({ label: n.label, href: n.href })), { label: "Privacy Policy", href: "/privacy-policy/" }, { label: "Terms & Conditions", href: "/terms/" }]} />
          <FooterCol title="Services" className="md:col-span-3" links={services.map((s) => ({ label: s.name, href: `/services/${s.slug}/` }))} />
          <FooterCol title="Work" className="sm:col-span-2 md:col-span-3" links={[...projects.map((p) => ({ label: p.name, href: `/work/${p.slug}/` })), { label: "Technologies", href: "/technologies/" }]} />
        </div>

        {/* Giant wordmark */}
        <div className="pointer-events-none select-none overflow-hidden pt-2" aria-hidden="true">
          <p className="display text-center text-[20vw] leading-[0.82] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(207,195,238,.18)] sm:text-[16vw] xl:text-[17rem]">Adelogix</p>
        </div>

        <div className="grid gap-6 border-t border-white/10 py-7 text-xs text-white/50 sm:py-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <p className="max-w-[22rem] leading-relaxed md:max-w-none">© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 leading-relaxed md:justify-center">
            <li><Link href="/privacy-policy/" className="link-u inline-flex min-h-11 items-center">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="link-u inline-flex min-h-11 items-center">Terms &amp; Conditions</Link></li>
            <li><CookieSettingsButton /></li>
            <li><Link href="/sitemap.xml" className="link-u inline-flex min-h-11 items-center">Sitemap</Link></li>
          </ul>
          <div className="md:justify-self-end"><BackToTop /></div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = "" }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow text-white/40">{title}</p>
      <ul className="mt-4 space-y-1 text-sm sm:mt-5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group inline-flex min-h-11 items-center gap-1.5 text-white/70 transition-colors hover:text-white md:min-h-0 md:py-1.5">
              <span className="h-px w-0 bg-brand-300 transition-all duration-500 group-hover:w-3" />{l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
