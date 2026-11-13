import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import HomeHero from "@/components/hero/HomeHero";
import ScrollText from "@/components/anim/ScrollText";
import { Reveal, Parallax, SplitHeading, Magnetic } from "@/components/anim/primitives";
import { Button, Eyebrow } from "@/components/ui/Button";
import { SectionHeader, Industries, Highlights, FinalCTA } from "@/components/sections/blocks";
import { ServicesShowcase, TechEcosystem, ToolsMarquee } from "@/components/sections/interactive-a";
import { FeaturedProjects, ProcessTimeline, Testimonials, Team, FAQ } from "@/components/sections/interactive-b";
import { processStages } from "@/data/services";
import { generalFaqs } from "@/data/content";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      {/* 01 Hero */}
      <HomeHero />

      {/* 02 About introduction — editorial */}
      <section className="surface-light relative overflow-hidden py-20 md:py-32">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal variant="clip-up"><Eyebrow num="02" className="text-ink/60">About Adelogix</Eyebrow></Reveal>
              <Reveal variant="mask" className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-[28px] lg:block">
                <Parallax speed={0.25} className="absolute inset-[-12%]">
                  <Image src="/images/case-studies/uplift-ai/09-final-showcase.webp" alt="Uplift.ai mobile app screens designed by Adelogix" fill sizes="30vw" className="object-cover" />
                </Parallax>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <ScrollText
                text="A software partner that starts with your *business,* not the code. We help businesses turn requirements into dependable products, from the first workshop to the releases that follow launch."
                className="display text-[clamp(1.8rem,1.1rem+2.9vw,4.2rem)] leading-[1.05]" dim="rgba(13,11,19,0.14)" bright="#0d0b13"
              />
              <div className="mt-16 grid gap-10 md:grid-cols-2">
                <Reveal variant="mask" className="relative aspect-[3/2] overflow-hidden rounded-[24px]">
                  <Image src="/images/case-studies/oriuspay/05-dashboard.webp" alt="OriusPay merchant dashboard designed and developed by Adelogix" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                </Reveal>
                <div className="flex flex-col justify-between gap-8">
                  <Reveal as="ul" stagger={0.1} variant="left" className="space-y-4 text-ink/75">
                    {["Your process is understood before anything is built", "Scope, timeline and cost agreed in writing", "Proven technology your team can maintain", "Design, development and support from one team"].map((t, i) => (
                      <li key={t} className="flex gap-4 border-b border-ink/10 pb-4"><span className="font-mono text-xs text-brand-500">0{i + 1}</span>{t}</li>
                    ))}
                  </Reveal>
                  <Reveal variant="up"><Link href="/about/" className="group inline-flex items-center gap-3 font-medium text-ink">More about Adelogix<span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-ivory transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={16} /></span></Link></Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Services */}
      <section className="relative bg-ink py-20 md:py-28">
        <div className="orb right-0 top-20 h-[400px] w-[400px] bg-brand-600/25" />
        <div className="container-x relative">
          <SectionHeader num="03" eyebrow="Services" title="What we *design* and build." intro="Twelve core services covering websites, apps, product design, business systems and AI. Each one has its own page with scope, process and common questions." action={<Button href="/services/" variant="ghost">All services</Button>} />
          <div className="mt-16"><ServicesShowcase /></div>
        </div>
      </section>

      {/* 04 Technology ecosystem */}
      <section className="relative overflow-hidden border-t border-white/10 bg-ink-2 py-20 md:py-28">
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="container-x relative">
          <SectionHeader num="04" eyebrow="Technology ecosystem" title="The *tools* we build with." intro="The stack for each project is chosen for what it has to do, who will maintain it and how it is expected to grow." action={<Button href="/technologies/" variant="ghost">Explore technologies</Button>} />
          <div className="mt-14"><TechEcosystem /></div>
        </div>
        <div className="mt-16"><ToolsMarquee /></div>
      </section>

      {/* 05 Featured projects */}
      <section className="relative bg-ink pt-24 md:pt-36">
        <div className="container-x mb-14">
          <SectionHeader num="05" eyebrow="Featured projects" title="Selected *work.*" intro="Products we have designed and developed for clients in health, security, local services, FinTech and events." action={<Button href="/work/" variant="ghost">All case studies</Button>} />
        </div>
        <FeaturedProjects />
        <div className="h-16 lg:h-0" />
      </section>

      {/* 06 Process */}
      <section className="surface-light relative py-20 md:py-28">
        <div className="container-x">
          <SectionHeader light num="06" eyebrow="Development process" title="From first conversation to *launch.*" intro="Every project follows the same four stages, so you always know where things stand and what comes next." />
          <div className="mt-20"><ProcessTimeline light stages={processStages} /></div>
        </div>
      </section>

      {/* 07 Industries */}
      <div className="border-t border-ink/10"><Industries num="07" /></div>

      {/* 08 Highlights */}
      <Highlights num="08" />

      {/* 09 Testimonials */}
      <section className="surface-light relative py-20 md:py-28">
        <div className="container-x">
          <SectionHeader light num="09" eyebrow="Sample testimonials" title="Reviews, *once approved.*" intro="Nothing below is a real client quote yet. These placeholders show the layout we will use once clients approve their words — until then, the case studies show what we have built." />
          <div className="mt-14"><Testimonials /></div>
        </div>
      </section>

      {/* 10 Team */}
      <section className="relative bg-ink py-20 md:py-28">
        <div className="container-x">
          <SectionHeader num="10" eyebrow="Our team" title="The people behind the *product.*" intro="Design, development and delivery under one roof. Profiles are shown only with the information supplied by the team." />
          <div className="mt-14"><Team /></div>
        </div>
      </section>

      {/* 11 FAQ */}
      <section className="relative border-t border-white/10 bg-ink-2 py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal variant="clip-up"><Eyebrow num="11" className="text-white/60">FAQ</Eyebrow></Reveal>
            <SplitHeading text="Questions, *answered.*" className="mt-6 display h-md" />
            <Reveal variant="blur" delay={0.2}><p className="mt-6 text-white/60">Something else on your mind? Ask us directly and we will give you a straight answer.</p></Reveal>
            <Reveal variant="up" delay={0.3} className="mt-8"><Magnetic><Link href="/contact/" className="link-u text-brand-200">Ask a question →</Link></Magnetic></Reveal>
          </div>
          <div className="lg:col-span-8"><FAQ items={generalFaqs} /></div>
        </div>
      </section>

      {/* 12 Final CTA */}
      <FinalCTA />
    </>
  );
}
