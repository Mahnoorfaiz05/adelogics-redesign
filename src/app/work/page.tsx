import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { Reveal, Marquee, Parallax } from "@/components/anim/primitives";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/sections/blocks";
import { WorkGrid } from "@/components/sections/interactive-b";
import { projects, getProject } from "@/data/projects";
import { getService } from "@/data/services";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Our Work: Case Studies",
  description: "Case studies from Adelogix: Uplift.ai, Fast VPN, Emyy, OriusPay, TruNext, USR CRM and XENPOP.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  const featured = getProject("oriuspay")!;
  return (
    <>
      <PageHero
        eyebrow="Our work" shape="wave" hue="#b19df0" big="Work"
        title="Products we have *designed* and built."
        intro="Mobile apps, marketplaces, finance dashboards, CRMs and crypto platforms — each with its own case study covering the challenge, approach and solution."
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
      >
        <Button href="#projects">Browse projects</Button>
        <Button href="/contact/" variant="ghost">Discuss a similar project</Button>
      </PageHero>

      <div className="border-y border-white/10 bg-ink py-6">
        <Marquee speed={40}>
          {projects.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}/`} className="group mx-6 flex items-center gap-5" data-cursor="view">
              <span className="relative h-14 w-20 overflow-hidden rounded-lg"><Image src={p.cover} alt="" fill sizes="80px" className="object-cover" /></span>
              <span className="display text-4xl text-white/30 transition-colors group-hover:text-white md:text-5xl">{p.name}</span>
              <span className="text-brand-400/60">✦</span>
            </Link>
          ))}
        </Marquee>
      </div>

      {/* Featured project */}
      <section className="relative overflow-hidden bg-ink section-space">
        <div className="container-x">
          <Reveal variant="clip-up"><p className="eyebrow text-brand-300">Featured project</p></Reveal>
          <Link href={`/work/${featured.slug}/`} className="group mt-8 grid gap-10 lg:grid-cols-12 lg:items-center" data-cursor="view">
            <Reveal variant="mask" className="relative aspect-[3/2] overflow-hidden rounded-[32px] lg:col-span-8">
              <Parallax speed={0.15} className="absolute inset-[-8%]"><Image src={featured.cover} alt={`${featured.name} cover`} fill sizes="(min-width:1024px) 66vw, 100vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-105" /></Parallax>
            </Reveal>
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-wider text-white/45">{featured.category} · {featured.industry} · {featured.year}</p>
              <h2 className="mt-4 display text-5xl md:text-7xl">{featured.name}</h2>
              <p className="mt-5 text-white/65">{featured.tagline}</p>
              <p className="mt-4 text-sm text-white/50">{featured.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">{featured.services.map((s) => <span key={s} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{getService(s)?.name}</span>)}</div>
              <span className="mt-8 inline-flex items-center gap-3 font-medium">Read the case study <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={18} /></span></span>
            </div>
          </Link>
        </div>
      </section>

      <section id="projects" className="surface-light scroll-mt-20 section-space">
        <div className="container-x">
          <SectionHeader light num="01" eyebrow="All projects" title="Filter by *what we did.*" />
          <div className="mt-12"><WorkGrid /></div>
        </div>
      </section>

      <FinalCTA title="Planning something *similar?*" text="Tell us about your project and we will share how we would approach it." />
    </>
  );
}
