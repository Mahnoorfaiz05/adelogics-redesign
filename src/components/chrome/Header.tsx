"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Mail, Phone } from "lucide-react";
import { nav, site, whatsappLink } from "@/lib/site";
import { services, serviceGroups } from "@/data/services";
import { LIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Magnetic } from "@/components/anim/primitives";

type W = Window & { __lenis?: { stop: () => void; start: () => void } };

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 12);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => { setMega(false); setMobile(false); });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const w = window as W;
    if (mobile) { w.__lenis?.stop(); document.body.style.overflow = "hidden"; }
    else { w.__lenis?.start(); document.body.style.overflow = ""; }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMega(false); setMobile(false); } };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [mobile]);

  const openMega = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMega(true); };
  const closeMega = () => { closeTimer.current = setTimeout(() => setMega(false), 140); };
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled || mega ? "border-white/10 bg-ink/85 shadow-[0_14px_40px_-25px_rgba(0,0,0,.8)] backdrop-blur-xl" : "border-transparent bg-ink/35 backdrop-blur-sm"}`}
        onMouseLeave={closeMega}
      >
        <div className="mx-auto flex min-h-[var(--header-h)] max-w-[1440px] items-center justify-between gap-4 px-4 py-2.5 sm:mx-4 md:px-6 xl:mx-auto">
          <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label="Adelogix home">
            <span className="rounded-lg bg-ivory px-2 py-1"><Image src="/images/brand/adelogix-logo-original.png" alt="Adelogix" width={234} height={51} className="h-6 w-auto md:h-7" priority /></span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href} onMouseEnter={item.mega ? openMega : () => setMega(false)}>
                  {item.mega ? (
                    <div className="flex items-center">
                      <Link href={item.href} className={`group relative rounded-full px-4 py-2 text-[0.92rem] transition-colors ${isActive(item.href) ? "text-white" : "text-white/70 hover:text-white"}`}>
                        {item.label}
                        {isActive(item.href) && <motion.span layoutId="nav-dot" className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-300" />}
                      </Link>
                      <button aria-label="Toggle services menu" aria-expanded={mega} aria-controls="mega-menu" onClick={() => setMega((m) => !m)} className="-ml-3 rounded-full p-1.5 text-white/60 hover:text-white">
                        <ChevronDown size={14} className={`transition-transform duration-300 ${mega ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  ) : (
                    <Link href={item.href} className={`group relative block rounded-full px-4 py-2 text-[0.92rem] transition-colors ${isActive(item.href) ? "text-white" : "text-white/70 hover:text-white"}`}>
                      <span className="relative block overflow-hidden">
                        <span className="block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full">{item.label}</span>
                        <span className="absolute inset-0 translate-y-full text-brand-200 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0">{item.label}</span>
                      </span>
                      {isActive(item.href) && <motion.span layoutId="nav-dot" className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-300" />}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Magnetic strength={0.3}>
                <Link href="/contact/" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-white">
                  <span className="relative z-10">Discuss Your Project</span>
                  <ArrowUpRight size={16} className="relative z-10 transition-transform duration-500 group-hover:rotate-45" />
                  <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-500 group-hover:translate-y-0" />
                </Link>
              </Magnetic>
            </div>
            <button
              className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
              aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} aria-controls="mobile-menu" onClick={() => setMobile((m) => !m)}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-px w-5 bg-white transition-all duration-500 ${mobile ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-5 bg-white transition-all duration-500 ${mobile ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              id="mega-menu" onMouseEnter={openMega}
              initial={{ opacity: 0, y: -12, clipPath: "inset(0% 0% 100% 0% round 28px)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 28px)" }}
              exit={{ opacity: 0, y: -8, clipPath: "inset(0% 0% 100% 0% round 28px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="glass mx-3 mt-2 hidden max-w-[1440px] overflow-hidden rounded-[28px] bg-ink-2/[0.97] lg:block xl:mx-auto"
            >
              <div className="grid grid-cols-12 gap-8 p-8">
                <div className="col-span-3 flex flex-col justify-between border-r border-white/10 pr-8">
                  <div>
                    <p className="eyebrow text-brand-300">Services</p>
                    <p className="mt-4 display text-3xl leading-tight">Design, development and the systems <span className="serif-i text-gradient">in between.</span></p>
                  </div>
                  <Link href="/services/" className="link-u mt-8 inline-flex items-center gap-2 self-start text-sm text-white/80">All services <ArrowUpRight size={14} /></Link>
                </div>
                <div className="col-span-9 grid grid-cols-3 gap-x-6 gap-y-1">
                  {services.map((s, i) => (
                    <motion.div key={s.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.025, duration: 0.5 }}>
                      <Link href={`/services/${s.slug}/`} className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-white/[0.06]">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-brand-200 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-brand-300/50 group-hover:bg-brand-500/20">
                          <LIcon name={s.icon} size={18} />
                        </span>
                        <span>
                          <span className="flex items-center gap-1.5 text-[0.92rem] font-medium text-white">{s.name}<ArrowUpRight size={13} className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" /></span>
                          <span className="mt-0.5 line-clamp-1 text-xs text-white/50">{s.tags.join(" · ")}</span>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 px-8 py-4 text-xs text-white/50">
                <span>{serviceGroups.length} service groups · {services.length} core services</span>
                <a href={`mailto:${site.email}`} className="link-u">{site.email}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu"
            initial={{ clipPath: "circle(0% at 92% 5%)" }} animate={{ clipPath: "circle(150% at 92% 5%)" }} exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink lg:hidden" data-lenis-prevent
          >
            <div className="absolute inset-0 grid-lines opacity-50" />
            <div className="orb -right-20 top-20 h-72 w-72 bg-brand-500/40" />
            <div className="relative flex min-h-full flex-col px-6 pb-10 pt-28">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <Link href={item.href} className={`flex items-baseline gap-3 py-4 display text-[2.4rem] ${isActive(item.href) ? "text-brand-200" : "text-white"}`}>
                        <span className="font-mono text-xs text-white/40">0{i + 1}</span>{item.label}
                      </Link>
                      {item.mega && (
                        <button aria-label="Show services" aria-expanded={mobileServices} onClick={() => setMobileServices((v) => !v)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15">
                          <ChevronDown size={18} className={`transition-transform ${mobileServices ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    {item.mega && (
                      <AnimatePresence>
                        {mobileServices && (
                          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="grid grid-cols-1 gap-1 overflow-hidden pb-4 sm:grid-cols-2">
                            {services.map((s) => (
                              <li key={s.slug}>
                                <Link href={`/services/${s.slug}/`} className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-white/75 hover:bg-white/5">
                                  <LIcon name={s.icon} size={16} className="text-brand-300" />{s.name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-auto space-y-3 pt-10 text-sm text-white/70">
                <Link href="/contact/" className="flex w-full items-center justify-between rounded-full bg-brand-gradient px-6 py-4 font-medium text-white">Discuss Your Project <ArrowUpRight size={18} /></Link>
                <div className="grid grid-cols-3 gap-2">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 py-3"><WhatsAppIcon size={18} />WhatsApp</a>
                  <a href={site.phoneHref} className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 py-3"><Phone size={18} />Call</a>
                  <a href={`mailto:${site.email}`} className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 py-3"><Mail size={18} />Email</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
