import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import { Reveal } from "@/components/anim/primitives";
import { Button } from "@/components/ui/Button";
import { LIcon, TechMark } from "@/components/ui/Icons";
import { SectionHeader, FinalCTA } from "@/components/sections/blocks";
import { TechEcosystem, ToolsMarquee } from "@/components/sections/interactive-a";
import { techCategories, allTools } from "@/data/technologies";
import { getService } from "@/data/services";

export const metadata: Metadata = {
  title: "Technologies We Use",
  description: "The tools and capabilities Adelogix uses across frontend, backend, mobile, databases, CMS, cloud & DevOps, UI/UX and AI & automation.",
  alternates: { canonical: "/technologies/" },
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technologies" shape="rings" hue="#8fa9c9" align="center" big="Stack"
        title="Technology chosen for *fit,* not fashion."
        intro="The stack for each project is chosen for what it has to do, who will maintain it and how it is expected to grow."
        crumbs={[{ label: "Home", href: "/" }, { label: "Technologies" }]}
      >
        <Button href="#ecosystem">Explore the ecosystem</Button>
        <Button href="/contact/" variant="ghost">Discuss your stack</Button>
      </PageHero>

      <div className="border-y border-white/10 bg-ink py-6"><ToolsMarquee /></div>

      <section id="ecosystem" className="relative overflow-hidden bg-ink py-20 md:py-28">
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="container-x relative">
          <SectionHeader num="01" eyebrow="Interactive ecosystem" title="Eight areas, *one connected* stack." intro="Select a category, then hover or tap an orbiting node for details. Named tools are ones we have used on client work; capabilities describe what we deliver in that area." />
          <div className="mt-14"><TechEcosystem /></div>
        </div>
      </section>

      {/* Categorised showcase — bento */}
      <section className="surface-light py-20 md:py-28">
        <div className="container-x">
          <SectionHeader light num="02" eyebrow="Categorised showcase" title="Everything, *at a glance.*" />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {techCategories.map((c, i) => (
              <Reveal key={c.id} variant={i % 2 ? "clip-up" : "scale"} delay={(i % 4) * 0.06}
                className={`group relative overflow-hidden rounded-[28px] p-7 ${i === 0 || i === 5 ? "lg:col-span-2" : ""} ${i % 3 === 0 ? "bg-ink text-ivory" : "bg-white"}`}>
                <div className="flex items-center justify-between">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-700 group-hover:rotate-[-12deg] ${i % 3 === 0 ? "bg-brand-gradient text-white" : "bg-brand-100 text-brand-600"}`}><LIcon name={c.lucide} /></span>
                  <span className="font-mono text-xs opacity-40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 display text-3xl">{c.name}</h3>
                <p className="mt-2 text-sm opacity-60">{c.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {c.items.map((it) => (
                    <li key={it.name} className="group/chip relative">
                      <span tabIndex={0} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs outline-none transition-colors ${i % 3 === 0 ? "border-white/15 hover:bg-white/10 focus:bg-white/10" : "border-ink/10 hover:bg-ink hover:text-ivory focus:bg-ink focus:text-ivory"}`}>
                        <TechMark icon={it.icon} mono={it.mono} size={13} className="!text-[0.55rem]" />{it.name}
                      </span>
                      <span role="tooltip" className="pointer-events-none absolute bottom-[calc(100%+8px)] left-0 z-10 w-56 translate-y-2 rounded-xl bg-ink-3 p-3 text-xs text-white/80 opacity-0 shadow-xl transition-all duration-300 group-hover/chip:translate-y-0 group-hover/chip:opacity-100 group-focus-within/chip:translate-y-0 group-focus-within/chip:opacity-100">{it.desc}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal variant="fade" className="mt-10 text-sm text-ink/55">
            Named tools on client work: {allTools.map((t) => t.name).join(", ")}. The final stack for every project is agreed during planning.
          </Reveal>
        </div>
      </section>

      {/* Related services by category */}
      <section className="bg-ink py-20 md:py-28">
        <div className="container-x">
          <SectionHeader num="03" eyebrow="Related services" title="Where each area *shows up.*" />
          <ul className="mt-14 border-t border-white/10">
            {techCategories.map((c) => {
              const svc = Array.from(new Set(c.items.flatMap((i) => i.services)));
              return (
                <Reveal as="li" key={c.id} variant="left" className="group grid gap-4 border-b border-white/10 py-7 md:grid-cols-12 md:items-center">
                  <div className="flex items-center gap-4 md:col-span-4">
                    <LIcon name={c.lucide} className="text-brand-300 transition-transform duration-500 group-hover:scale-125" />
                    <h3 className="display text-2xl transition-transform duration-500 group-hover:translate-x-2">{c.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 md:col-span-8">
                    {svc.map((s) => <Link key={s} href={`/services/${s}/`} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:border-brand-300 hover:text-white">{getService(s)?.name}</Link>)}
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <FinalCTA title="Have a stack in mind — or *need advice?*" text="Tell us what you are building and who will maintain it. We will recommend a stack that suits your budget, team and growth plans." />
    </>
  );
}
