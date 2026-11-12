import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, UserRound } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { Reveal, SplitHeading, Parallax, Marquee } from "@/components/anim/primitives";
import ScrollText from "@/components/anim/ScrollText";
import { Button, Eyebrow } from "@/components/ui/Button";
import { SectionHeader, FinalCTA } from "@/components/sections/blocks";
import { Team } from "@/components/sections/interactive-b";
import { values, collaboration, strengths } from "@/data/content";
import { serviceGroups, processStages, getService } from "@/data/services";

export const metadata: Metadata = {
  title: "About Adelogix: Software Development Partner",
  description: "Adelogix Software Technology designs, builds and supports digital products for startups, growing businesses and established companies.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Adelogix" shape="torus" hue="#c39be0" big="About"
        title="A software team that starts with your *business,* not the code."
        intro="Adelogix Software Technology designs, builds and supports digital products for startups, growing businesses and established companies."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        aside={
          <div className="glass rounded-[28px] p-7">
            <Image src="/assets/brand/adelogix-mark-white.png" alt="" width={56} height={48} />
            <p className="mt-6 display text-2xl">Design, development and support from one team.</p>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center">
              {[["12", "Services"], ["4", "Stages"], ["7", "Sectors"]].map(([n, l]) => <div key={l}><p className="display text-3xl text-gradient">{n}</p><p className="text-xs text-white/50">{l}</p></div>)}
            </div>
          </div>
        }
      >
        <Button href="/contact/">Discuss your project</Button>
        <Button href="#approach" variant="ghost">How we work</Button>
      </PageHero>

      {/* Story — sticky editorial */}
      <section className="surface-light py-24 md:py-40">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal variant="clip-up"><Eyebrow num="01" className="text-ink/60">Our story</Eyebrow></Reveal>
              <SplitHeading text="The partner we would *hire* ourselves." className="mt-6 display h-md" accentClass="serif-i text-brand-500" />
              <Reveal variant="mask" className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[28px]">
                <Parallax speed={0.2} className="absolute inset-[-10%]"><Image src="/assets/case-studies/usr-crm/05-dashboard.png" alt="USR CRM dashboard redesigned by Adelogix" fill sizes="40vw" className="object-cover" /></Parallax>
              </Reveal>
            </div>
          </div>
          <div className="space-y-10 lg:col-span-6 lg:col-start-7 lg:pt-20">
            <ScrollText text="We want to be the development partner we would hire ourselves: clear about what will be delivered, honest about trade-offs, and still around after launch." className="display text-[clamp(1.6rem,1rem+2vw,3rem)] leading-[1.1]" dim="rgba(13,11,19,.15)" bright="#0d0b13" />
            <Reveal variant="up"><p className="lead text-ink/70">Many businesses have a story about a software project that ran late, went over budget or produced something nobody wanted to use. Usually the cause was not the code. It was unclear goals, missing conversations and decisions made without the people who would live with the result.</p></Reveal>
            <Reveal variant="up"><p className="lead text-ink/70">Our aim is practical, reliable software that solves the problem it was built for, delivered in a way that keeps you informed and in control from the first workshop to the last release.</p></Reveal>
          </div>
        </div>
      </section>

      {/* Mission & vision — contrasting split */}
      <section className="grid md:grid-cols-2">
        <div className="relative overflow-hidden bg-brand-gradient p-10 py-20 md:p-16 md:py-28">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <Reveal variant="clip-up"><p className="eyebrow text-white/70">02 — Mission</p></Reveal>
          <SplitHeading as="h2" text="Practical, reliable software that solves the problem it was *built for.*" className="mt-8 display text-[clamp(1.8rem,1rem+2.4vw,3.4rem)]" accentClass="serif-i" />
        </div>
        <div className="relative overflow-hidden bg-ink-2 p-10 py-20 md:p-16 md:py-28">
          <div className="absolute inset-0 grid-lines opacity-60" />
          <Reveal variant="clip-up"><p className="eyebrow relative text-brand-300">03 — Vision</p></Reveal>
          <SplitHeading as="h2" text="To be the partner teams trust — clear, honest and still *around after launch.*" className="relative mt-8 display text-[clamp(1.8rem,1rem+2.4vw,3.4rem)]" />
        </div>
      </section>

      {/* Core values — stacking cards */}
      <section className="bg-ink py-24 md:py-36">
        <div className="container-x">
          <SectionHeader num="04" eyebrow="Core values" title="Four principles behind *every project.*" intro="The working habits that shape how we plan, build and communicate, whatever the size of the project." />
          <div className="mt-16 space-y-6">
            {values.map((v, i) => (
              <div key={v.title} className="sticky" style={{ top: `${110 + i * 26}px` }}>
                <Reveal variant="up" className={`grid gap-6 rounded-[32px] border border-white/10 p-8 md:grid-cols-12 md:items-center md:p-12 ${["bg-ink-3", "bg-[#241d36]", "bg-[#2c2342]", "bg-[#33284e]"][i]}`}>
                  <span className="display text-7xl text-gradient md:col-span-2 md:text-8xl">0{i + 1}</span>
                  <h3 className="display text-3xl md:col-span-5 md:text-4xl">{v.title}</h3>
                  <p className="text-white/60 md:col-span-5">{v.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership introduction (placeholder) */}
      <section className="surface-light py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal variant="mask" className="relative lg:col-span-5">
            <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[32px] bg-ink">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#6a42a0,transparent_60%)]" />
              <UserRound size={110} strokeWidth={0.8} className="relative text-white/40" />
              <span className="absolute left-5 top-5 rounded-full bg-amber-100 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-amber-800">Placeholder · to be confirmed</span>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal variant="clip-up"><Eyebrow num="05" className="text-ink/60">Leadership</Eyebrow></Reveal>
            <SplitHeading text="A message from our *founder.*" className="mt-6 display h-md" accentClass="serif-i text-brand-500" />
            <Reveal variant="blur" delay={0.2}>
              <p className="lead mt-8 text-ink/70">This space is reserved for a short introduction from the Founder &amp; CEO — their background, why Adelogix was started and what clients can expect when working with the team.</p>
              <p className="mt-6 text-sm text-ink/50">Editable placeholder: replace with the confirmed name, photograph and biography before publishing.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-ink py-24 md:py-36">
        <div className="container-x">
          <SectionHeader num="06" eyebrow="Team" title="Roles that carry your project from *idea to release.*" />
          <div className="mt-14"><Team /></div>
        </div>
      </section>

      {/* Expertise */}
      <section className="border-t border-white/10 bg-ink-2 py-24 md:py-36">
        <div className="container-x">
          <SectionHeader num="07" eyebrow="Company expertise" title="Six areas of *expertise.*" action={<Button href="/services/" variant="ghost">Explore services</Button>} />
          <Reveal stagger={0.08} variant="up" className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {serviceGroups.map((g, i) => (
              <div key={g.id} className="group relative bg-ink-2 p-8 transition-colors duration-500 hover:bg-ink-3">
                <span className="font-mono text-xs text-brand-300">0{i + 1}</span>
                <h3 className="mt-6 display text-2xl">{g.name}</h3>
                <p className="mt-3 text-sm text-white/55">{g.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {g.slugs.map((s) => <Link key={s} href={`/services/${s}/`} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75 hover:border-brand-300 hover:text-white">{getService(s)?.name}</Link>)}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Approach — horizontal rail */}
      <section id="approach" className="surface-light py-24 md:py-36">
        <div className="container-x">
          <SectionHeader light num="08" eyebrow="Development approach" title="How we work *with you.*" intro="One point of contact, regular progress updates at an agreed rhythm, and decisions recorded in writing." />
          <Reveal stagger={0.1} variant="right" className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processStages.map((s, i) => (
              <div key={s.name} className="group relative overflow-hidden rounded-[26px] bg-paper p-7 transition-all duration-700 hover:-translate-y-2 hover:bg-ink hover:text-ivory">
                <div className="flex items-center justify-between"><span className="font-mono text-xs opacity-50">Stage {i + 1}</span><span className="h-2 w-2 rounded-full bg-brand-400" /></div>
                <h3 className="mt-10 display text-3xl">{s.name}</h3>
                <p className="mt-4 text-sm opacity-70">{s.text}</p>
              </div>
            ))}
          </Reveal>
          <div className="mt-16 grid gap-8 border-t border-ink/10 pt-12 md:grid-cols-4">
            {collaboration.map((c) => (
              <Reveal key={c.title} variant="up"><h3 className="font-medium">{c.title}</h3><p className="mt-2 text-sm text-ink/60">{c.text}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Adelogix */}
      <section className="relative overflow-hidden bg-ink py-24 md:py-36">
        <Marquee speed={50} className="mb-16 opacity-90">
          {strengths.map((s) => <span key={s.title} className="mx-8 display text-5xl text-white/10 md:text-7xl">{s.title} <span className="text-brand-400/50">✦</span></span>)}
        </Marquee>
        <div className="container-x">
          <SectionHeader num="09" eyebrow="Why Adelogix" title="Habits that keep projects *predictable.*" />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
