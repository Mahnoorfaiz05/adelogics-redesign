import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SplitHeading, Reveal, Counter, Tilt, Marquee } from "@/components/anim/primitives";
import { Button, Eyebrow } from "@/components/ui/Button";
import { LIcon, WhatsAppIcon } from "@/components/ui/Icons";
import ParticleCanvas from "@/components/hero/ParticleCanvas";
import { industries, highlights, strengths } from "@/data/content";
import { getService } from "@/data/services";
import type { Project } from "@/data/projects";
import { whatsappLink } from "@/lib/site";

export function SectionHeader({ num, eyebrow, title, intro, light, className = "", action }: { num?: string; eyebrow: string; title: string; intro?: string; light?: boolean; className?: string; action?: React.ReactNode }) {
  return (
    <div className={`grid gap-8 md:grid-cols-12 md:items-end ${className}`}>
      <div className="md:col-span-8">
        <Reveal variant="clip-up"><Eyebrow num={num} className={light ? "text-ink/60" : "text-white/60"}>{eyebrow}</Eyebrow></Reveal>
        <SplitHeading text={title} className="mt-6 display h-md text-balance" accentClass={light ? "serif-i text-brand-500" : "serif-i text-gradient"} />
      </div>
      {(intro || action) && (
        <Reveal variant="blur" delay={0.2} className="md:col-span-4">
          {intro && <p className={`leading-relaxed ${light ? "text-ink/65" : "text-white/60"}`}>{intro}</p>}
          {action && <div className="mt-6">{action}</div>}
        </Reveal>
      )}
    </div>
  );
}

export function ProjectCard({ p, size = "md", index }: { p: Project; size?: "md" | "lg"; index?: number }) {
  return (
    <Link href={`/work/${p.slug}/`} className="group block" data-cursor="view" aria-label={`${p.name} case study`}>
      <Tilt max={5} className="overflow-hidden rounded-[28px]">
        <div className={`relative overflow-hidden rounded-[28px] bg-ink-3 ${size === "lg" ? "aspect-[16/10]" : "aspect-[3/2]"}`}>
          <Image src={p.cover} alt={`${p.name} — ${p.category}`} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="absolute bottom-5 left-5 right-5 flex translate-y-4 flex-wrap gap-2 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            {p.services.slice(0, 3).map((s) => <span key={s} className="rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur">{getService(s)?.name}</span>)}
          </div>
        </div>
      </Tilt>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-current opacity-50">{index !== undefined && `${String(index + 1).padStart(2, "0")} · `}{p.category} · {p.year}</p>
          <h3 className="mt-2 display text-2xl md:text-3xl">{p.name}</h3>
          <p className="mt-2 max-w-md text-sm opacity-60">{p.tagline}</p>
        </div>
        <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-current/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:text-white"><ArrowUpRight size={18} /></span>
      </div>
    </Link>
  );
}

/* Industries — expanding panels on desktop, stacked tiles on mobile */
export function Industries({ num = "07", light = true }: { num?: string; light?: boolean }) {
  return (
    <section className={`${light ? "surface-light" : "bg-ink"} relative py-16 md:py-28`}>
      <div className="container-x">
        <SectionHeader light={light} num={num} eyebrow="Industries we serve" title="Sectors with their own *rules* and pressures." intro="Each sector has its own users, rules and pressures. These are the industries we design and develop for, with the services that most often apply." />
        <Reveal stagger={0.07} variant="up" className="mt-16 flex flex-col gap-3 lg:h-[520px] lg:flex-row">
          {industries.map((ind, i) => (
            <div key={ind.name} tabIndex={0} className={`group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[26px] p-6 outline-none transition-[flex-grow,background] duration-700 ease-[cubic-bezier(.16,1,.3,1)] lg:flex-1 lg:hover:flex-[3.2] lg:focus-within:flex-[3.2] ${light ? "bg-paper hover:bg-ink hover:text-ivory focus:bg-ink focus:text-ivory" : "bg-ink-3 hover:bg-brand-700"}`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs opacity-50">0{i + 1}</span>
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-current/15 transition-transform duration-700 group-hover:rotate-[-12deg] group-hover:scale-110"><LIcon name={ind.icon} /></span>
              </div>
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-brand-400/0 blur-3xl transition-colors duration-700 group-hover:bg-brand-400/50" />
              <div className="relative">
                <h3 className="display text-2xl lg:whitespace-nowrap lg:[writing-mode:vertical-rl] lg:rotate-180 lg:group-hover:[writing-mode:horizontal-tb] lg:group-hover:rotate-0 lg:group-focus-within:[writing-mode:horizontal-tb] lg:group-focus-within:rotate-0">{ind.full}</h3>
                <div className="grid transition-all duration-700 lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-within:grid-rows-[1fr] lg:group-focus-within:opacity-100">
                  <div className="overflow-hidden">
                    <p className="mt-3 max-w-sm text-sm opacity-70">{ind.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ind.services.map((s) => (
                        <Link key={s} href={`/services/${s}/`} className="pointer-events-auto rounded-full border border-current/25 px-3 py-1 text-xs hover:bg-white hover:text-ink">{getService(s)?.name}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal variant="fade" className={`mt-8 text-sm ${light ? "text-ink/60" : "text-white/60"}`}>
          Working in another sector? <Link href="/contact/" className="link-u font-medium text-brand-500">Tell us about your business →</Link>
        </Reveal>
      </div>
    </section>
  );
}

/* Highlights — verified facts only */
export function Highlights({ num = "08" }: { num?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 md:py-28">
      <div className="orb left-1/3 top-0 h-[400px] w-[400px] bg-brand-600/30" />
      <div className="container-x relative">
        <SectionHeader num={num} eyebrow="Company highlights" title="Why teams choose to *work with us.*" intro="Most software projects that struggle do so because of unclear scope, poor communication or the wrong technology. These are the habits we use to avoid all three." />
        <div className="mt-16 grid grid-cols-2 border-l border-t border-white/10 lg:grid-cols-4">
          {highlights.map((h) => (
            <Reveal key={h.label} variant="fade" className="group relative overflow-hidden border-b border-r border-white/10 p-6 md:p-10">
              <div className="absolute inset-x-0 bottom-0 h-0 bg-brand-gradient transition-all duration-700 group-hover:h-1" />
              <Counter value={h.value} suffix={h.suffix} className="display block text-6xl text-gradient md:text-8xl" />
              <p className="mt-4 text-sm text-white/60">{h.label}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-white/10 md:grid-cols-5">
          {strengths.map((s, i) => (
            <Reveal key={s.title} variant="up" delay={i * 0.08} className="group bg-ink-2 p-7 transition-colors duration-500 hover:bg-ink-3">
              <span className="font-mono text-xs text-brand-300">0{i + 1}</span>
              <h3 className="mt-6 text-lg font-medium">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Final CTA */
export function FinalCTA({ title = "Let's Build Something *Great Together.*", text = "Tell us what you are working on. We will ask the right questions and suggest a practical way forward, whether that is a full project or a short discovery phase." }: { title?: string; text?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 md:py-32">
      <div className="absolute inset-0 -z-10 opacity-80"><ParticleCanvas shape="galaxy" hue="#b9a6ff" density={0.65} links={false} /></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0d0b13_72%)]" />
      <Marquee speed={60} className="pointer-events-none absolute top-10 -z-10 opacity-[0.05]">
        {["Discover", "Plan", "Build", "Launch", "Support"].map((w) => <span key={w} className="display px-8 text-[9rem] leading-none">{w} ✦</span>)}
      </Marquee>
      <div className="container-x text-center">
        <Reveal variant="clip-up"><p className="eyebrow text-brand-300">Start a project</p></Reveal>
        <SplitHeading text={title} className="mx-auto mt-6 max-w-5xl display h-lg text-balance" />
        <Reveal variant="blur" delay={0.3}><p className="lead mx-auto mt-8 max-w-2xl text-white/60">{text}</p></Reveal>
        <Reveal variant="up" delay={0.45} className="mt-12 flex flex-wrap justify-center gap-3">
          <Button href="/contact/">Start a project enquiry</Button>
          <Button href={whatsappLink()} external variant="ghost" icon={<WhatsAppIcon size={15} />}>Message on WhatsApp</Button>
        </Reveal>
        <Reveal stagger={0.1} variant="up" className="mx-auto mt-16 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
          {[["Share a short brief", "A few sentences is enough"], ["We talk it through", "By your preferred method"], ["You get a clear proposal", "Scope, approach and estimate"]].map(([a, b], i) => (
            <div key={a} className="glass rounded-2xl p-5">
              <span className="font-mono text-xs text-brand-300">0{i + 1}</span>
              <p className="mt-3 font-medium">{a}</p>
              <p className="text-sm text-white/50">{b}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
