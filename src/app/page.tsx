import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import HomeHero from "@/components/hero/HomeHero";
import ScrollText from "@/components/anim/ScrollText";
import { Reveal, Parallax, SplitHeading, Magnetic } from "@/components/anim/primitives";
import { Button } from "@/components/ui/Button";
import { SectionHeader, Industries, Highlights } from "@/components/sections/blocks";
import { ServicesShowcase, TechEcosystem, ToolsMarquee } from "@/components/sections/interactive-a";
import { FeaturedProjects, ProcessTimeline, Testimonials, Team, FAQ } from "@/components/sections/interactive-b";
import { processStages } from "@/data/services";
import { generalFaqs } from "@/data/content";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="surface-light relative overflow-hidden section-space">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal variant="mask" className="relative hidden aspect-[4/5] overflow-hidden rounded-[28px] lg:block">
                <Parallax speed={0.25} className="absolute inset-[-12%]">
                  <Image src="/images/case-studies/uplift-ai/09-final-showcase.webp" alt="Uplift.ai mobile app screens designed by Adelogix" fill sizes="30vw" className="object-cover" />
                </Parallax>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <ScrollText
                text="A software partner that starts with your *business,* not the code."
                className="display text-[clamp(1.8rem,1.1rem+2.9vw,4.2rem)] leading-[1.05]" dim="rgba(13,11,19,0.14)" bright="#0d0b13"
              />
              <div className="mt-14 grid gap-10 md:grid-cols-2">
                <Reveal variant="mask" className="relative aspect-[3/2] overflow-hidden rounded-[24px]">
                  <Image src="/images/case-studies/oriuspay/05-dashboard.webp" alt="OriusPay merchant dashboard designed and developed by Adelogix" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                </Reveal>
                <div className="flex flex-col justify-between gap-8">
                  <Reveal as="ul" stagger={0.1} variant="left" className="space-y-4 text-ink/75">
                    {["Your process is understood before anything is built", "Scope, timeline and cost agreed in writing", "Proven technology your team can maintain", "Design, development and support from one team"].map((t) => (
                      <li key={t} className="border-b border-ink/10 pb-4">{t}</li>
                    ))}
                  </Reveal>
                  <Reveal variant="up"><Link href="/about/" className="group inline-flex items-center gap-3 font-medium text-ink">More about Adelogix<span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-ivory transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={16} /></span></Link></Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-ink section-space">
        <div className="orb right-0 top-20 h-[400px] w-[400px] bg-brand-600/25" />
        <div className="container-x relative">
          <SectionHeader title="Design and development, *connected.*" intro="Websites, apps, product design, business systems and AI support—each with a clear scope, process and next step." action={<Button href="/services/" variant="ghost">All services</Button>} />
          <div className="mt-14"><ServicesShowcase /></div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-ink-2 section-space">
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="container-x relative">
          <SectionHeader title="Tools chosen for the *work.*" intro="The stack is selected for the job, the team maintaining it and the way the product needs to grow." action={<Button href="/technologies/" variant="ghost">Explore technologies</Button>} />
          <div className="mt-12"><TechEcosystem /></div>
        </div>
        <div className="mt-14"><ToolsMarquee /></div>
      </section>

      <section className="relative bg-ink pt-14 md:pt-20">
        <div className="container-x mb-10 md:mb-12">
          <SectionHeader title="Selected *work.*" intro="Products designed and developed for health, security, local services, FinTech and events." action={<Button href="/work/" variant="ghost">All case studies</Button>} />
        </div>
        <FeaturedProjects />
        <div className="h-12 lg:h-0" />
      </section>

      <section className="surface-light relative section-space">
        <div className="container-x">
          <SectionHeader light title="A clear way to *build.*" intro="A practical path from the first conversation to launch, with visible progress throughout." />
          <div className="mt-10"><ProcessTimeline light stages={processStages} /></div>
        </div>
      </section>

      <div className="border-t border-ink/10"><Industries /></div>
      <Highlights />

      <section className="surface-light relative section-space">
        <div className="container-x">
          <SectionHeader light title="Illustrative testimonial *layout.*" intro="The names and quotes below are fictional demonstration content only—not customer feedback, endorsements or affiliations. Authentic client reviews will replace them only after written approval is received." />
          <div className="mt-12"><Testimonials /></div>
        </div>
      </section>

      <section className="relative bg-ink section-space">
        <div className="container-x">
          <SectionHeader title="The team behind the *work.*" intro="Design, development and delivery under one roof. Profiles are shown only with information supplied by the team." />
          <div className="mt-12"><Team /></div>
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-ink-2 section-space">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SplitHeading text="Questions, *answered.*" className="display h-md" />
            <Reveal variant="blur" delay={0.2}><p className="mt-6 text-white/60">Something else on your mind? Ask us directly and we will give you a straight answer.</p></Reveal>
            <Reveal variant="up" delay={0.3} className="mt-8"><Magnetic><Link href="/contact/" className="link-u text-brand-200">Ask a question →</Link></Magnetic></Reveal>
          </div>
          <div className="lg:col-span-8"><FAQ items={generalFaqs} /></div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
