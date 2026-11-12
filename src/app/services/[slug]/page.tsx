import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, X } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ScrollText from "@/components/anim/ScrollText";
import { Reveal, Tilt } from "@/components/anim/primitives";
import { Button, Eyebrow } from "@/components/ui/Button";
import { LIcon, TechMark } from "@/components/ui/Icons";
import { SectionHeader, ProjectCard, FinalCTA } from "@/components/sections/blocks";
import { ProcessTimeline, FAQ } from "@/components/sections/interactive-b";
import { services, getService, serviceGroups, processStages } from "@/data/services";
import { projects } from "@/data/projects";
import { techCategories } from "@/data/technologies";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.name} Services`, description: s.intro || s.short, alternates: { canonical: `/services/${s.slug}/` },
    openGraph: { title: `${s.name} | Adelogix`, description: s.short },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const idx = services.findIndex((x) => x.slug === slug);
  const variant = idx % 3;
  const group = serviceGroups.find((g) => g.slugs.includes(slug));
  const related = [...(group?.slugs.filter((x) => x !== slug) ?? []), ...services.map((x) => x.slug).filter((x) => x !== slug && !group?.slugs.includes(x))].slice(0, 4).map((x) => getService(x)!);
  const cases = (s.caseStudies.length ? s.caseStudies.map((c) => projects.find((p) => p.slug === c)!) : projects.filter((p) => p.services.some((x) => group?.slugs.includes(x)))).filter(Boolean).slice(0, 4);
  const tools = techCategories.flatMap((c) => c.items.filter((i) => i.services.includes(slug) || s.technologies.includes(i.name)).map((i) => ({ ...i, cat: c.name })));
  const stages = processStages.map((p, i) => ({ name: p.name, text: s.process[i] || p.text }));

  return (
    <>
      <PageHero
        eyebrow={`Service ${s.num} — ${s.name}`} shape={s.shape} hue={s.hue} big={s.num}
        title={s.headline.replace(/(\w+)\.$/, "*$1.*")}
        intro={s.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services/" }, { label: s.name }]}
        aside={
          <Tilt className="rounded-[28px]">
            <div className="glass relative overflow-hidden rounded-[28px] p-7">
              <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full blur-3xl" style={{ background: s.hue, opacity: 0.45 }} />
              <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient float"><LIcon name={s.icon} size={28} className="text-white" /></span>
              <p className="relative mt-6 eyebrow text-white/50">Most often included</p>
              <ul className="relative mt-4 space-y-2.5 text-sm text-white/80">
                {s.deliverables.slice(1, 5).map((d) => <li key={d} className="flex items-start gap-2"><Check size={14} className="mt-0.5 shrink-0 text-brand-300" />{d}</li>)}
              </ul>
              <div className="relative mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">{s.tags.map((t) => <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs">{t}</span>)}</div>
            </div>
          </Tilt>
        }
      >
        <Button href={`/contact/?service=${s.slug}`}>Discuss your project</Button>
        <Button href="#included" variant="ghost">What is included</Button>
      </PageHero>

      {/* Introduction */}
      <section className="surface-light py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3"><Reveal variant="clip-up"><Eyebrow num="01" className="text-ink/60">Introduction</Eyebrow></Reveal></div>
          <div className="lg:col-span-9">
            <ScrollText text={s.short + " " + s.intro} className="display text-[clamp(1.6rem,1rem+2.2vw,3.4rem)] leading-[1.08]" dim="rgba(13,11,19,.14)" bright="#0d0b13" />
          </div>
        </div>
      </section>

      {/* Problems we solve — three layout variants */}
      <section className="bg-ink py-24 md:py-36">
        <div className="container-x">
          <SectionHeader num="02" eyebrow="Problems we solve" title={s.challengesTitle.replace("familiar?", "*familiar?*")} />
          {variant === 0 && (
            <Reveal stagger={0.1} variant="up" className="mt-14 grid gap-4 md:grid-cols-2">
              {s.challenges.map((c, i) => (
                <div key={c.title} className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-ink-2 p-8 transition-colors duration-500 hover:border-red-300/30">
                  <div className="flex items-center justify-between"><span className="font-mono text-xs text-white/40">Problem 0{i + 1}</span><span className="grid h-9 w-9 place-items-center rounded-full bg-red-400/10 text-red-300"><X size={16} /></span></div>
                  <h3 className="mt-8 display text-2xl">{c.title}</h3>
                  <p className="mt-3 text-white/55">{c.desc}</p>
                </div>
              ))}
            </Reveal>
          )}
          {variant === 1 && (
            <ul className="mt-14 border-t border-white/10">
              {s.challenges.map((c, i) => (
                <Reveal as="li" key={c.title} variant="left" className="grid gap-4 border-b border-white/10 py-8 md:grid-cols-12 md:items-baseline">
                  <span className="display text-5xl text-white/15 md:col-span-2">0{i + 1}</span>
                  <h3 className="display text-2xl md:col-span-4">{c.title}</h3>
                  <p className="text-white/55 md:col-span-6">{c.desc}</p>
                </Reveal>
              ))}
            </ul>
          )}
          {variant === 2 && (
            <div className="mt-14 grid gap-4 lg:grid-cols-4">
              {s.challenges.map((c, i) => (
                <Reveal key={c.title} variant="clip-up" delay={i * 0.1} className={`rounded-[26px] p-7 ${i % 2 ? "bg-ink-3 lg:mt-12" : "glass"}`}>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 font-mono text-xs">0{i + 1}</span>
                  <h3 className="mt-8 text-xl font-medium">{c.title}</h3>
                  <p className="mt-3 text-sm text-white/55">{c.desc}</p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our solution */}
      <section className="relative overflow-hidden bg-brand-900 py-24 md:py-36">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="orb -right-20 top-0 h-[420px] w-[420px]" style={{ background: s.hue, opacity: 0.35 }} />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal variant="clip-up"><Eyebrow num="03" className="text-white/60">Our solution</Eyebrow></Reveal>
            <h2 className="mt-6 display h-md">{s.solutionTitle}</h2>
            <Reveal variant="blur" delay={0.2}><p className="lead mt-8 text-white/70">{s.solutionText}</p></Reveal>
          </div>
          <Reveal as="ul" stagger={0.12} variant="right" className="space-y-3 self-end lg:col-span-5 lg:col-start-8">
            {s.solutionPoints.map((p) => (
              <li key={p} className="glass flex items-start gap-4 rounded-2xl p-5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-gradient"><Check size={14} /></span>
                <span className="text-white/85">{p}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Features & deliverables */}
      <section id="included" className="surface-light scroll-mt-24 py-24 md:py-36">
        <div className="container-x">
          <SectionHeader light num="04" eyebrow="Features & deliverables" title="What we can *deliver.*" intro="Every project is scoped individually. These are the deliverables most often included in this service." />
          <Reveal stagger={0.06} variant={variant === 1 ? "scale" : "up"} className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {s.deliverables.map((d, i) => (
              <div key={d} className={`group flex min-h-[150px] flex-col justify-between rounded-[22px] p-6 transition-all duration-500 hover:-translate-y-1 ${i === 0 ? "bg-ink text-ivory sm:col-span-2 lg:col-span-1" : "bg-white hover:shadow-xl"}`}>
                <span className={`font-mono text-xs ${i === 0 ? "text-brand-300" : "text-ink/40"}`}>{String(i + 1).padStart(2, "0")}</span>
                <p className="display text-xl leading-tight">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Technology stack */}
      <section className="bg-ink-2 py-24 md:py-32">
        <div className="container-x">
          <SectionHeader num="05" eyebrow="Technology stack" title="Tools we use for *this work.*" intro="The final stack is chosen during planning, based on your requirements and the team that will maintain the product." action={<Link href="/technologies/" className="link-u text-sm text-brand-200">All technologies →</Link>} />
          <Reveal stagger={0.06} variant="scale" className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {tools.map((t) => (
              <div key={t.name} className="group rounded-[22px] border border-white/10 bg-ink p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-300/50">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/[0.05] text-white transition-transform duration-500 group-hover:scale-110"><TechMark icon={t.icon} mono={t.mono} size={22} /></span>
                <p className="mt-5 font-medium">{t.name}</p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider text-white/40">{t.cat}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink py-24 md:py-36">
        <div className="container-x">
          <SectionHeader num="06" eyebrow="Development process" title="How the work runs, *stage by stage.*" />
          <div className="mt-20"><ProcessTimeline stages={stages} /></div>
        </div>
      </section>

      {/* Case studies */}
      {cases.length > 0 && (
        <section className="surface-light py-24 md:py-36">
          <div className="container-x">
            <SectionHeader light num="07" eyebrow={s.caseStudies.length ? "Selected case studies" : "Related work"} title="Case studies for *this service.*" action={<Button href="/work/" variant="dark">All work</Button>} />
            <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {cases.map((p, i) => <Reveal key={p.slug} variant="up" delay={(i % 2) * 0.1} className={i % 2 ? "md:mt-20" : ""}><ProjectCard p={p} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-ink-2 py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal variant="clip-up"><Eyebrow num="08" className="text-white/60">FAQ</Eyebrow></Reveal>
            <h2 className="mt-6 display text-4xl md:text-5xl">{s.faqTitle}</h2>
            <Reveal variant="blur"><p className="mt-6 text-white/55">Something else on your mind? Ask us directly and we will give you a straight answer.</p></Reveal>
          </div>
          <div className="lg:col-span-8"><FAQ items={s.faqs} /></div>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-ink py-24 md:py-32">
        <div className="container-x">
          <SectionHeader num="09" eyebrow="Related services" title="Often paired *with this.*" />
          <Reveal stagger={0.08} variant="up" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}/`} className="group relative overflow-hidden rounded-[24px] border border-white/10 p-6 transition-colors duration-500 hover:bg-ink-3">
                <div className="flex items-center justify-between"><LIcon name={r.icon} className="text-brand-200" /><ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" /></div>
                <p className="mt-10 display text-xl">{r.name}</p>
                <p className="mt-2 text-sm text-white/50">{r.short}</p>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <FinalCTA title={s.ctaTitle.replace(/(\w+\??)$/, "*$1*")} text={s.ctaText} />
    </>
  );
}
