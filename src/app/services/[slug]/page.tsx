import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, X } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import { Button, Eyebrow } from "@/components/ui/Button";
import AccentText from "@/components/ui/AccentText";
import { LIcon } from "@/components/ui/Icons";
import { CompactProjectCard, ProcessSteps, StaticFAQ, TechnologyGrid } from "@/components/sections/static-content";
import { services, getService, serviceGroups, processStages } from "@/data/services";
import { projects } from "@/data/projects";
import { techCategories } from "@/data/technologies";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} Services`, description: service.intro || service.short, alternates: { canonical: `/services/${service.slug}/` },
    openGraph: { title: `${service.name} | Adelogix`, description: service.short },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const group = serviceGroups.find((item) => item.slugs.includes(slug));
  const related = [
    ...(group?.slugs.filter((item) => item !== slug) ?? []),
    ...services.map((item) => item.slug).filter((item) => item !== slug && !group?.slugs.includes(item)),
  ].slice(0, 4).map((item) => getService(item)!);
  const cases = (service.caseStudies.length
    ? service.caseStudies.map((item) => projects.find((project) => project.slug === item)!)
    : projects.filter((project) => project.services.some((item) => group?.slugs.includes(item))))
    .filter(Boolean)
    .slice(0, 4);
  const stages = processStages.map((stage, index) => ({ name: stage.name, text: service.process[index] || stage.text, items: stage.items }));

  return (
    <>
      <PageHero
        eyebrow={`Service ${service.num} — ${service.name}`}
        shape={service.shape}
        hue={service.hue}
        big={service.num}
        title={service.headline.replace(/(\w+)\.$/, "*$1.*")}
        intro={service.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services/" }, { label: service.name }]}
        aside={
          <div className="glass relative overflow-hidden rounded-[26px] p-6">
            <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full blur-3xl" style={{ background: service.hue, opacity: 0.4 }} />
            <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient"><LIcon name={service.icon} size={25} className="text-white" /></span>
            <p className="relative mt-5 eyebrow text-white/50">Most often included</p>
            <ul className="relative mt-3 space-y-2 text-sm text-white/80">
              {service.deliverables.slice(1, 5).map((deliverable) => <li key={deliverable} className="flex items-start gap-2"><Check size={14} className="mt-0.5 shrink-0 text-brand-300" />{deliverable}</li>)}
            </ul>
            <div className="relative mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">{service.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs">{tag}</span>)}</div>
          </div>
        }
      >
        <Button href={`/contact/?service=${service.slug}`} magnetic={false}>Discuss your project</Button>
        <Button href="#included" variant="ghost" magnetic={false}>What is included</Button>
      </PageHero>

      <section className="surface-light section-space">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3"><Eyebrow num="01" className="text-ink/60">Introduction</Eyebrow></div>
          <div className="lg:col-span-9">
            <p className="display max-w-5xl text-[clamp(1.55rem,1rem+2.05vw,3.1rem)] leading-[1.1] text-ink">{service.short} {service.intro}</p>
          </div>
        </div>
      </section>

      <section className="bg-ink section-space">
        <div className="container-x">
          <Eyebrow num="02" className="text-white/60">Problems we solve</Eyebrow>
          <h2 className="mt-5 max-w-3xl display h-md"><AccentText text={service.challengesTitle.replace("familiar?", "*familiar?*")} /></h2>
          <div className="content-gap grid gap-3 md:grid-cols-2">
            {service.challenges.map((challenge, index) => (
              <article key={challenge.title} className="rounded-[22px] border border-white/10 bg-ink-2 p-6">
                <div className="flex items-center justify-between"><span className="font-mono text-xs text-white/40">Problem {String(index + 1).padStart(2, "0")}</span><span className="grid h-8 w-8 place-items-center rounded-full bg-red-400/10 text-red-300"><X size={15} /></span></div>
                <h3 className="mt-6 display text-xl">{challenge.title}</h3>
                <p className="mt-3 leading-relaxed text-white/55">{challenge.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-900 section-space">
        <div className="absolute inset-0 grid-lines opacity-35" />
        <div className="orb -right-20 top-0 h-[320px] w-[320px]" style={{ background: service.hue, opacity: 0.3 }} />
        <div className="container-x relative grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow num="03" className="text-white/60">Our solution</Eyebrow>
            <h2 className="mt-5 display h-md">{service.solutionTitle}</h2>
            <p className="lead mt-6 max-w-2xl text-white/70">{service.solutionText}</p>
          </div>
          <ul className="grid gap-3 lg:col-span-5 lg:col-start-8">
            {service.solutionPoints.map((point) => (
              <li key={point} className="glass flex items-start gap-3 rounded-2xl p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-gradient"><Check size={13} /></span><span className="text-white/85">{point}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="included" className="surface-light scroll-mt-24 section-space">
        <div className="container-x">
          <Eyebrow num="04" className="text-ink/60">Features &amp; deliverables</Eyebrow>
          <h2 className="mt-5 display h-md text-ink">What we can <AccentText text="*deliver.*" className="serif-i text-brand-500" /></h2>
          <p className="mt-4 max-w-2xl text-ink/65">Every project is scoped individually. These are the deliverables most often included in this service.</p>
          <div className="content-gap grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {service.deliverables.map((deliverable, index) => (
              <div key={deliverable} className={`rounded-[20px] p-5 ${index === 0 ? "bg-ink text-ivory" : "bg-white shadow-sm ring-1 ring-ink/5"}`}>
                <span className={`font-mono text-xs ${index === 0 ? "text-brand-300" : "text-ink/40"}`}>{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-10 display text-xl leading-tight">{deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-2 section-space">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow num="05" className="text-white/60">Technology stack</Eyebrow>
              <h2 className="mt-5 display h-md">Tools we use for <AccentText text="*this work.*" /></h2>
            </div>
            <Link href="/technologies/" className="link-u text-sm text-brand-200">All technologies →</Link>
          </div>
          <p className="mt-4 max-w-2xl text-white/60">The final stack is chosen during planning, based on requirements and the team that will maintain the product.</p>
          <div className="content-gap"><TechnologyGrid categories={techCategories} service={service} /></div>
        </div>
      </section>

      <section className="bg-ink section-space">
        <div className="container-x">
          <Eyebrow num="06" className="text-white/60">Development process</Eyebrow>
          <h2 className="mt-5 display h-md">How the work runs, <AccentText text="*stage by stage.*" /></h2>
          <div className="content-gap"><ProcessSteps stages={stages} /></div>
        </div>
      </section>

      {cases.length > 0 && (
        <section className="surface-light section-space">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div><Eyebrow num="07" className="text-ink/60">{service.caseStudies.length ? "Selected case studies" : "Related work"}</Eyebrow><h2 className="mt-5 display h-md text-ink">Case studies for <AccentText text="*this service.*" className="serif-i text-brand-500" /></h2></div>
              <Button href="/work/" variant="dark" magnetic={false}>All work</Button>
            </div>
            <div className="content-gap grid gap-x-6 gap-y-10 md:grid-cols-2">
              {cases.map((project) => <CompactProjectCard key={project.slug} project={project} />)}
            </div>
          </div>
        </section>
      )}

      <section className="bg-ink-2 section-space">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow num="08" className="text-white/60">FAQ</Eyebrow>
            <h2 className="mt-5 display text-4xl md:text-5xl">{service.faqTitle}</h2>
            <p className="mt-5 text-white/55">Something else on your mind? Ask us directly and we will give you a straight answer.</p>
          </div>
          <div className="lg:col-span-8"><StaticFAQ items={service.faqs} /></div>
        </div>
      </section>

      <section className="bg-ink section-space">
        <div className="container-x">
          <Eyebrow num="09" className="text-white/60">Related services</Eyebrow>
          <h2 className="mt-5 display h-md">Often paired <AccentText text="*with this.*" /></h2>
          <div className="content-gap grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}/`} className="group rounded-[22px] border border-white/10 p-5 transition-colors duration-300 hover:bg-ink-3">
                <div className="flex items-center justify-between"><LIcon name={item.icon} className="text-brand-200" /><ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" /></div>
                <p className="mt-8 display text-xl">{item.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA title={service.ctaTitle.replace(/(\w+\??)$/, "*$1*")} text={service.ctaText} />
    </>
  );
}
