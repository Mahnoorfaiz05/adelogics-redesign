import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { Reveal, Tilt } from "@/components/anim/primitives";
import { Button } from "@/components/ui/Button";
import { LIcon } from "@/components/ui/Icons";
import { SectionHeader, FinalCTA } from "@/components/sections/blocks";
import { ServicesShowcase, TechEcosystem, ToolsMarquee } from "@/components/sections/interactive-a";
import { ProcessTimeline, FAQ } from "@/components/sections/interactive-b";
import { services, serviceGroups, processStages, getService } from "@/data/services";
import { generalFaqs } from "@/data/content";

export const metadata: Metadata = {
  title: "Software Development Services",
  description: "Web development, mobile apps, custom software, UI/UX design, SaaS, AI and automation, CRM, ERP, WordPress, IT services, product development and DevOps.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services" shape="helix" hue="#9a7cf2" big="Services"
        title="Design, development and the systems *in between.*"
        intro="Groups of services covering websites, apps, product design, business software and AI. Tell us what you need to achieve and we will recommend where to start."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <Button href="/contact/">Discuss your needs</Button>
        <Button href="#groups" variant="ghost">Browse by group</Button>
      </PageHero>

      {/* Category navigation (sticky) */}
      <nav aria-label="Service groups" className="sticky top-[var(--header-h)] z-30 border-y border-white/10 bg-ink/85 backdrop-blur-xl">
        <div className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {serviceGroups.map((g) => (
            <a key={g.id} href={`#group-${g.id}`} className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-brand-300 hover:text-white">{g.name}</a>
          ))}
        </div>
      </nav>

      {/* Interactive showcase */}
      <section className="surface-light py-20 md:py-28">
        <div className="container-x">
          <SectionHeader light eyebrow="All services" num="01" title="Twelve services, *one team.*" intro="Each item links to the page that covers it in detail — scope, process, technologies and common questions." />
          <div className="mt-14"><ServicesShowcase light /></div>
        </div>
      </section>

      {/* Groups — alternating feature rows */}
      <section id="groups" className="bg-ink py-20 md:py-28">
        <div className="container-x">
          <SectionHeader num="02" eyebrow="Services by group" title="Related services, *grouped together.*" />
          <div className="mt-20 space-y-16 md:space-y-20">
            {serviceGroups.map((g, gi) => (
              <div key={g.id} id={`group-${g.id}`} className="scroll-mt-32 grid gap-10 lg:grid-cols-12">
                <Reveal variant={gi % 2 ? "right" : "left"} className={`lg:col-span-5 ${gi % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <p className="font-mono text-xs text-brand-300">Group 0{gi + 1}</p>
                  <h3 className="mt-4 display text-4xl md:text-5xl">{g.name}</h3>
                  <p className="mt-5 text-white/60">{g.desc}</p>
                  <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {g.items.map((it) => <li key={it} className="flex items-start gap-2 text-sm text-white/70"><Check size={14} className="mt-1 shrink-0 text-brand-300" />{it}</li>)}
                  </ul>
                </Reveal>
                <div className={`grid gap-4 sm:grid-cols-2 lg:col-span-6 ${gi % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  {g.slugs.map((slug, i) => {
                    const s = getService(slug)!;
                    return (
                      <Reveal key={slug} variant="scale" delay={i * 0.1} className={g.slugs.length === 1 ? "sm:col-span-2" : ""}>
                        <Tilt className="h-full rounded-[28px]">
                          <Link href={`/services/${slug}/`} className="group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-ink-3 p-7">
                            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl transition-opacity duration-700 group-hover:opacity-70" style={{ background: s.hue }} />
                            <div className="relative flex items-start justify-between">
                              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.06] text-brand-200 transition-all duration-700 group-hover:rotate-[-10deg] group-hover:bg-brand-gradient group-hover:text-white"><LIcon name={s.icon} size={24} /></span>
                              <span className="font-mono text-xs text-white/40">{s.num}</span>
                            </div>
                            <div className="relative">
                              <h4 className="display text-2xl">{s.name}</h4>
                              <p className="mt-3 text-sm text-white/60">{s.short}</p>
                              <span className="mt-6 inline-flex items-center gap-2 text-sm text-brand-200">Explore <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" /></span>
                            </div>
                          </Link>
                        </Tilt>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables snapshot */}
      <section className="surface-light py-20 md:py-28">
        <div className="container-x">
          <SectionHeader light num="03" eyebrow="What we deliver" title="Deliverables at a *glance.*" />
          <Reveal stagger={0.04} variant="up" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="group rounded-[22px] border border-ink/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center gap-3"><LIcon name={s.icon} size={18} className="text-brand-500" /><p className="font-medium">{s.name}</p></div>
                <ul className="mt-4 space-y-1.5 text-sm text-ink/60">{s.deliverables.slice(1, 4).map((d) => <li key={d}>— {d}</li>)}</ul>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Technology ecosystem */}
      <section className="overflow-hidden bg-ink-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHeader num="04" eyebrow="Technology ecosystem" title="Chosen for *fit,* not fashion." action={<Button href="/technologies/" variant="ghost">All technologies</Button>} />
          <div className="mt-14"><TechEcosystem compact /></div>
        </div>
        <div className="mt-14"><ToolsMarquee /></div>
      </section>

      {/* Process */}
      <section className="bg-ink py-20 md:py-28">
        <div className="container-x">
          <SectionHeader num="05" eyebrow="Development process" title="Four clear *stages.*" />
          <div className="mt-20"><ProcessTimeline stages={processStages} /></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="surface-light py-20 md:py-28">
        <div className="container-x">
          <SectionHeader light num="06" eyebrow="FAQ" title="Common *questions.*" />
          <div className="mt-14"><FAQ light items={generalFaqs.slice(0, 6)} /></div>
        </div>
      </section>

      <FinalCTA title="Not sure where to *start?*" text="Describe the problem you want to solve. We will recommend the right service — or a short discovery phase — and explain why." />
    </>
  );
}
