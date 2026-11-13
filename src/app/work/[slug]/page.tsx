import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Reveal, SplitHeading, Parallax, Counter } from "@/components/anim/primitives";
import ScrollText from "@/components/anim/ScrollText";
import { Button, Eyebrow } from "@/components/ui/Button";
import { TechMark } from "@/components/ui/Icons";
import { SectionHeader, ProjectCard, FinalCTA } from "@/components/sections/blocks";
import ParticleCanvas from "@/components/hero/ParticleCanvas";
import { projects, getProject, relatedProjects } from "@/data/projects";
import { getService } from "@/data/services";
import { allTools } from "@/data/technologies";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} Case Study`, description: p.summary, alternates: { canonical: `/work/${p.slug}/` },
    openGraph: { title: `${p.name} — ${p.tagline}`, description: p.summary, images: [{ url: p.cover, width: 1200, height: 800 }] },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.findIndex((x) => x.slug === slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const related = relatedProjects(slug, 3);
  const [g0, g1, ...rest] = p.gallery;

  return (
    <>
      {/* Project-specific hero */}
      <section className="noise relative isolate overflow-hidden bg-ink pb-12 pt-24 sm:pt-28 md:pb-24 md:pt-36">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(ellipse at 70% 20%, ${p.color}66, transparent 60%)` }} />
        <div className="absolute inset-0 -z-10 opacity-60"><ParticleCanvas shape="wave" hue="#cfc3ee" density={0.8} links={false} /></div>
        <div className="container-x">
          <Reveal variant="fade" as="nav" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/50" aria-label="Breadcrumb">
              <li><Link href="/" className="link-u">Home</Link></li><li>/</li><li><Link href="/work/" className="link-u">Work</Link></li><li>/</li><li aria-current="page" className="text-white/80">{p.name}</li>
            </ol>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal variant="clip-up"><p className="eyebrow text-brand-200">{p.category} · {p.industry} · {p.year}</p></Reveal>
              <SplitHeading as="h1" immediate text={p.name} className="mt-6 display h-xl" />
              <SplitHeading as="p" immediate delay={0.3} text={p.tagline} className="mt-6 max-w-3xl display text-[clamp(1.4rem,1rem+1.6vw,2.6rem)] text-white/80" />
            </div>
            <Reveal variant="right" delay={0.5} className="lg:col-span-4">
              <p className="text-white/65">{p.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="#overview">Read the case study</Button>
              </div>
            </Reveal>
          </div>
          <Reveal variant="mask" delay={0.3} className="relative mt-10 aspect-[3/2] overflow-hidden rounded-[28px] sm:mt-14 md:aspect-[16/9] md:rounded-[32px]">
            <Parallax speed={0.15} className="absolute inset-[-8%]"><Image src={p.cover} alt={`${p.name} — case study cover`} fill priority sizes="100vw" className="object-cover" /></Parallax>
          </Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
            {[["Category", p.category], ["Industry", p.industry], ["Year", p.year], ["Services", p.services.map((s) => getService(s)?.name).join(", ")]].map(([k, v]) => (
              <Reveal key={k} variant="up"><dt className="eyebrow text-white/40">{k}</dt><dd className="mt-2 text-sm text-white/85">{v}</dd></Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="surface-light scroll-mt-20 py-16 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3"><Reveal variant="clip-up"><Eyebrow num="01" className="text-ink/60">Project overview</Eyebrow></Reveal></div>
          <div className="lg:col-span-9">
            <ScrollText text={p.overview} className="display text-[clamp(1.5rem,1rem+1.9vw,3rem)] leading-[1.12]" dim="rgba(13,11,19,.14)" bright="#0d0b13" />
            <Reveal variant="up" className="mt-12 grid gap-8 md:grid-cols-2">
              <div><p className="eyebrow text-ink/50">Business context</p><p className="mt-3 text-ink/70">{p.context}</p></div>
              <div>
                <p className="eyebrow text-ink/50">Project goals</p>
                <ul className="mt-3 space-y-2 text-ink/70">{p.goals.map((g) => <li key={g} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-brand-500" />{g}</li>)}</ul>
              </div>
            </Reveal>
          </div>
        </div>
        {g0 && (
          <div className="container-x mt-12 md:mt-20">
            <Reveal variant="mask" className="relative aspect-[3/2] overflow-hidden rounded-[28px]"><Image src={g0.src} alt={g0.alt} fill sizes="100vw" className="object-cover" /></Reveal>
          </div>
        )}
      </section>

      {/* Challenge / Approach / Solution */}
      <section className="bg-ink py-16 md:py-28">
        <div className="container-x">
          <div className="grid gap-4 lg:grid-cols-3">
            {[["02", "The challenge", p.challenge, "bg-ink-2"], ["03", "Our approach", `We worked across ${p.services.map((s) => getService(s)?.name).join(", ")}, keeping one goal in front of every decision: ${p.goals[0].charAt(0).toLowerCase() + p.goals[0].slice(1)}.`, "bg-ink-3"], ["04", "The solution", p.solution, "bg-brand-gradient"]].map(([n, t, d, bg], k) => (
              <Reveal key={t} variant="up" delay={k * 0.12} className={`flex min-h-[280px] flex-col justify-between rounded-[26px] p-6 sm:min-h-[320px] sm:p-8 md:min-h-[340px] md:rounded-[28px] md:p-10 ${bg}`}>
                <span className="font-mono text-xs text-white/60">{n}</span>
                <div><h2 className="display text-3xl md:text-4xl">{t}</h2><p className="mt-4 text-white/75">{d}</p></div>
              </Reveal>
            ))}
          </div>
          {g1 && (
            <Reveal variant="mask" className="relative mt-4 aspect-[3/2] overflow-hidden rounded-[28px]"><Image src={g1.src} alt={g1.alt} fill sizes="100vw" className="object-cover" /></Reveal>
          )}
        </div>
      </section>

      {/* Key features + technology */}
      <section className="surface-light py-16 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal variant="clip-up"><Eyebrow num="05" className="text-ink/60">Key features</Eyebrow></Reveal>
            <SplitHeading text="What we *built.*" className="mt-6 display h-md" accentClass="serif-i text-brand-500" />
            <ol className="mt-10 border-t border-ink/10">
              {p.features.map((f, k) => (
                <Reveal as="li" key={f} variant="left" className="flex gap-6 border-b border-ink/10 py-5">
                  <span className="font-mono text-xs text-brand-500">{String(k + 1).padStart(2, "0")}</span><span className="text-lg">{f}</span>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-32">
              <Reveal variant="clip-up"><Eyebrow num="06" className="text-ink/60">Technology used</Eyebrow></Reveal>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {p.tech.map((t) => {
                  const tool = allTools.find((x) => x.name === t || x.name.startsWith(t));
                  return (
                    <Reveal key={t} variant="scale" className="rounded-2xl bg-ink p-5 text-ivory">
                      <TechMark icon={tool?.icon} mono={tool?.mono || t.slice(0, 2)} size={24} />
                      <p className="mt-4 font-medium">{t}</p>
                    </Reveal>
                  );
                })}
              </div>
              <div className="mt-8 rounded-2xl border border-ink/10 p-6">
                <p className="eyebrow text-ink/50">Screens in this case study</p>
                <p className="mt-2 display text-5xl"><Counter value={p.gallery.length + 1} /></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots & mockups */}
      <section className="bg-ink py-16 md:py-28">
        <div className="container-x">
          <SectionHeader num="07" eyebrow="Screens & mockups" title="Inside the *product.*" />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {rest.map((img, k) => (
              <Reveal key={img.src} variant={k % 3 === 0 ? "mask" : "up"} className={`group relative overflow-hidden rounded-[24px] bg-ink-3 ${k % 3 === 0 ? "md:col-span-2" : ""}`}>
                <div className="relative aspect-[3/2]"><Image src={img.src} alt={img.alt} fill sizes={k % 3 === 0 ? "100vw" : "50vw"} className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" /></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / next */}
      <nav aria-label="More case studies" className="grid border-y border-white/10 bg-ink md:grid-cols-2">
        <Link href={`/work/${prev.slug}/`} className="group flex items-center gap-6 border-b border-white/10 p-8 transition-colors hover:bg-ink-2 md:border-b-0 md:border-r md:p-12" data-cursor="view">
          <ArrowLeft className="transition-transform group-hover:-translate-x-2" />
          <div><p className="eyebrow text-white/40">Previous</p><p className="mt-2 display text-3xl md:text-4xl">{prev.name}</p></div>
        </Link>
        <Link href={`/work/${next.slug}/`} className="group flex items-center justify-end gap-6 p-8 text-right transition-colors hover:bg-ink-2 md:p-12" data-cursor="view">
          <div><p className="eyebrow text-white/40">Next</p><p className="mt-2 display text-3xl md:text-4xl">{next.name}</p></div>
          <ArrowRight className="transition-transform group-hover:translate-x-2" />
        </Link>
      </nav>

      {/* Related */}
      <section className="surface-light py-16 md:py-28">
        <div className="container-x">
          <SectionHeader light num="08" eyebrow="Relevant projects" title="Related *work.*" action={<Button href="/work/" variant="dark">All work</Button>} />
          <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-3">
            {related.map((r, k) => <Reveal key={r.slug} variant="up" delay={k * 0.1}><ProjectCard p={r} /></Reveal>)}
          </div>
        </div>
      </section>

      <FinalCTA title="Planning something *similar?*" text="Tell us about your project and we will share how we would approach it." />
    </>
  );
}
