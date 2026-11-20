import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { Reveal, SplitHeading, Parallax, Marquee } from "@/components/anim/primitives";
import ScrollText from "@/components/anim/ScrollText";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/sections/blocks";
import { Team } from "@/components/sections/interactive-b";
import { collaboration, founder, strengths, values } from "@/data/content";
import { serviceGroups, processStages, getService } from "@/data/services";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "About Adelogix: Software Development Partner",
  description: "Adelogix Software Technology designs, builds and supports digital products for startups, growing businesses and established companies.",
  alternates: { canonical: "/about/" },
};

const aboutIntro = "We want to be the development partner we would hire ourselves: clear about what will be delivered, honest about trade offs, and still around after launch.";

export default function AboutPage() {
  return (
    <>
      <PageHero
        shape="torus" hue="#c39be0"
        eyebrow="ABOUT"
        title="A software team that starts with your *business.*"
        intro={aboutIntro}
        aside={
          <div className="glass rounded-[28px] p-7">
            <span className="inline-grid h-14 w-16 place-items-center rounded-xl bg-ivory p-2"><Image src="/images/brand/adelogix-mark-original.png" alt="" width={54} height={47} /></span>
            <p className="mt-6 display text-2xl">Design, development and support from one team.</p>
          </div>
        }
      >
        <Button href="/contact/">Discuss your project</Button>
        <Button href="#approach" variant="ghost">How we work</Button>
      </PageHero>

      <section className="surface-light section-space">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow mb-4 text-brand-600">OUR APPROACH</p>
              <SplitHeading text="The partner we would *hire.*" className="display h-md" accentClass="serif-i text-brand-500" />
              <Reveal variant="mask" className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[28px]">
                <Parallax speed={0.2} className="absolute inset-[-10%]"><Image src="/images/case-studies/usr-crm/05-dashboard.webp" alt="USR CRM dashboard redesigned by Adelogix" fill sizes="40vw" className="object-cover" /></Parallax>
              </Reveal>
            </div>
          </div>
          <div className="space-y-8 lg:col-span-6 lg:col-start-7 lg:pt-8">
            <ScrollText text="Reliable software starts with clear conversations, practical choices and a team that stays accountable after release." className="display text-[clamp(1.6rem,1rem+2vw,3rem)] leading-[1.1]" dim="rgba(13,11,19,.15)" bright="#0d0b13" />
            <Reveal variant="up"><p className="lead text-ink/70">Many businesses have a story about a software project that ran late, went over budget or produced something nobody wanted to use. Usually the cause was not the code. It was unclear goals, missing conversations and decisions made without the people who would live with the result.</p></Reveal>
            <Reveal variant="up"><p className="lead text-ink/70">Our aim is practical software that solves the problem it was built for, delivered in a way that keeps you informed and in control from the first workshop to the last release.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative overflow-hidden bg-brand-gradient p-6 py-14 sm:p-10 sm:py-16 md:p-16 md:py-20">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <p className="eyebrow mb-4 text-white/75">PURPOSE</p>
          <SplitHeading as="h2" text="Practical software that solves the problem it was *built for.*" className="mt-2 display text-[clamp(1.8rem,1rem+2.4vw,3.4rem)]" accentClass="serif-i" />
        </div>
        <div className="relative overflow-hidden bg-ink-2 p-6 py-14 sm:p-10 sm:py-16 md:p-16 md:py-20">
          <div className="absolute inset-0 grid-lines opacity-60" />
          <p className="relative eyebrow mb-4 text-brand-200">PARTNERSHIP</p>
          <SplitHeading as="h2" text="The partner teams trust to stay *clear and involved.*" className="relative mt-2 display text-[clamp(1.8rem,1rem+2.4vw,3.4rem)]" />
        </div>
      </section>

      <section className="bg-ink section-space">
        <div className="container-x">
          <SectionHeader eyebrow="VALUES" title="Principles behind every *project.*" intro="The working habits that shape how we plan, build and communicate, whatever the size of the project." />
          <div className="mt-10 space-y-4 md:mt-12 md:space-y-5">
            {values.map((v, i) => (
              <div key={v.title} className="md:sticky" style={{ top: `${110 + i * 26}px` }}>
                <Reveal variant="up" className={`grid gap-6 rounded-[32px] border border-white/10 p-8 md:grid-cols-10 md:items-center md:p-10 ${["bg-ink-3", "bg-[#241d36]", "bg-[#2c2342]", "bg-[#33284e]"][i]}`}>
                  <h3 className="display text-3xl md:col-span-5 md:text-4xl">{v.title}</h3>
                  <p className="text-white/60 md:col-span-5">{v.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-light section-space">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal variant="mask" className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-ink shadow-[0_20px_50px_rgba(13,11,19,.14)] md:rounded-[32px]">
              <Image
                src={founder.image}
                alt="Muhammad Noman, CEO and Founder of Adelogix"
                fill
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 100vw"
                className="object-cover"
                style={{ objectPosition: founder.position }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/45 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-white backdrop-blur-sm">CEO &amp; Founder</span>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow mb-4 text-brand-600">LEADERSHIP</p>
            <SplitHeading text="Leading with *clarity.*" className="display h-md" accentClass="serif-i text-brand-500" />
            <Reveal variant="blur" delay={0.2}>
              <p className="mt-7 eyebrow text-brand-600">{founder.role}</p>
              <p className="mt-3 display text-2xl text-ink">{founder.name}</p>
              <p className="lead mt-7 text-ink/70">{founder.bio} He leads a team that takes clients from discovery through launch and ongoing support, with clear scope, practical decisions and regular communication.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink section-space">
        <div className="container-x">
          <SectionHeader eyebrow="TEAM" title="People who carry the work *forward.*" />
          <div className="mt-12"><Team /></div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink-2 section-space">
        <div className="container-x">
          <SectionHeader eyebrow="SERVICES" title="Experience where it *counts.*" action={<Button href="/services/" variant="ghost">Explore services</Button>} />
          <Reveal stagger={0.08} variant="up" className="mt-12 grid gap-px overflow-hidden rounded-[28px] bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {serviceGroups.map((g) => (
              <div key={g.id} className="group relative bg-ink-2 p-8 transition-colors duration-500 hover:bg-ink-3">
                <h3 className="display text-2xl">{g.name}</h3>
                <p className="mt-3 text-sm text-white/55">{g.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {g.slugs.map((s) => <Link key={s} href={`/services/${s}/`} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75 hover:border-brand-300 hover:text-white">{getService(s)?.name}</Link>)}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="approach" className="surface-light section-space">
        <div className="container-x">
          <SectionHeader eyebrow="PROCESS" light title="How we work *together.*" intro="One point of contact, regular progress updates at an agreed rhythm, and decisions recorded in writing." />
          <Reveal stagger={0.1} variant="right" className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processStages.map((s) => (
              <div key={s.name} className="group relative overflow-hidden rounded-[26px] bg-paper p-7 transition-all duration-700 hover:-translate-y-2 hover:bg-ink hover:text-ivory">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-400" />
                <h3 className="mt-8 display text-3xl">{s.name}</h3>
                <p className="mt-4 text-sm opacity-70">{s.text}</p>
              </div>
            ))}
          </Reveal>
          <div className="mt-10 grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-4">
            {collaboration.map((c) => (
              <Reveal key={c.title} variant="up"><h3 className="font-medium">{c.title}</h3><p className="mt-2 text-sm text-ink/60">{c.text}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink section-space">
        <Marquee speed={50} className="mb-12 opacity-90 md:mb-16">
          {strengths.map((s) => <span key={s.title} className="mx-8 display text-5xl text-white/10 md:text-7xl">{s.title} <span className="text-brand-400/50">✦</span></span>)}
        </Marquee>
        <div className="container-x">
          <SectionHeader eyebrow="WHY ADELOGIX" title="What keeps projects *predictable.*" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {strengths.map((s, i) => (
              <Reveal key={s.title} variant="scale" delay={i * 0.06} className="glass group rounded-[24px] p-6 transition-transform duration-500 hover:-translate-y-1">
                <ArrowUpRight className="text-brand-300 transition-transform duration-500 group-hover:rotate-45" />
                <h3 className="mt-8 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-white/55">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA title="Have a project *in mind?*" text="Tell us about your requirements. We will reply with questions, ideas and a practical next step." />
    </>
  );
}
