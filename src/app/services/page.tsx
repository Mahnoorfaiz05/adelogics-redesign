import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import { Button, Eyebrow } from "@/components/ui/Button";
import AccentText from "@/components/ui/AccentText";
import { LIcon } from "@/components/ui/Icons";
import { ProcessSteps, ServiceDirectory, StaticFAQ, TechnologyGrid } from "@/components/sections/static-content";
import { services, serviceGroups, processStages, getService } from "@/data/services";
import { generalFaqs } from "@/data/content";
import { techCategories } from "@/data/technologies";

export const metadata: Metadata = {
  title: "Software Development Services",
  description: "Web development, mobile apps, custom software, UI/UX design, SaaS, AI and automation, CRM, ERP, WordPress, IT services, product development and DevOps.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        shape="helix"
        hue="#9a7cf2"
        big="Services"
        title="Design, development and the systems *in between.*"
        intro="Groups of services covering websites, apps, product design, business software and AI. Tell us what you need to achieve and we will recommend where to start."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <Button href="/contact/" magnetic={false}>Discuss your needs</Button>
        <Button href="#groups" variant="ghost" magnetic={false}>Browse by group</Button>
      </PageHero>

      <nav aria-label="Service groups" className="sticky top-[var(--header-h)] z-30 border-y border-white/10 bg-ink/95">
        <div className="container-x flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none]">
          {serviceGroups.map((group) => <a key={group.id} href={`#group-${group.id}`} className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-brand-300 hover:text-white">{group.name}</a>)}
        </div>
      </nav>

      <section className="surface-light section-space">
        <div className="container-x">
          <Eyebrow num="01" className="text-ink/60">All services</Eyebrow>
          <h2 className="mt-5 display h-md text-ink">Twelve services, <AccentText text="*one team.*" className="serif-i text-brand-500" /></h2>
          <p className="mt-4 max-w-2xl text-ink/65">Each item links to a detailed page covering scope, process, relevant technologies and common questions.</p>
          <div className="content-gap"><ServiceDirectory services={services} light /></div>
        </div>
      </section>

      <section id="groups" className="bg-ink section-space">
        <div className="container-x">
          <Eyebrow num="02" className="text-white/60">Services by group</Eyebrow>
          <h2 className="mt-5 display h-md">Related services, <AccentText text="*grouped together.*" /></h2>
          <div className="content-gap space-y-10 md:space-y-14">
            {serviceGroups.map((group, groupIndex) => (
              <section key={group.id} id={`group-${group.id}`} className="scroll-mt-28 grid gap-7 border-t border-white/10 pt-8 lg:grid-cols-12 lg:gap-10">
                <div className={`lg:col-span-5 ${groupIndex % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <p className="font-mono text-xs text-brand-300">Group {String(groupIndex + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 display text-3xl md:text-4xl">{group.name}</h3>
                  <p className="mt-4 max-w-xl text-white/60">{group.desc}</p>
                  <ul className="mt-6 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                    {group.items.map((item) => <li key={item} className="flex items-start gap-2"><Check size={14} className="mt-1 shrink-0 text-brand-300" />{item}</li>)}
                  </ul>
                </div>
                <div className={`grid gap-3 sm:grid-cols-2 lg:col-span-6 ${groupIndex % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  {group.slugs.map((slug) => {
                    const service = getService(slug)!;
                    return (
                      <Link key={slug} href={`/services/${slug}/`} className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-ink-3 p-5 sm:min-h-[250px] sm:p-6 ${group.slugs.length === 1 ? "sm:col-span-2" : ""}`}>
                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity duration-300 group-hover:opacity-50" style={{ background: service.hue }} />
                        <div className="relative flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] text-brand-200"><LIcon name={service.icon} size={22} /></span><span className="font-mono text-xs text-white/40">{service.num}</span></div>
                        <div className="relative"><h4 className="display text-2xl">{service.name}</h4><p className="mt-3 text-sm leading-relaxed text-white/60">{service.short}</p><span className="mt-5 inline-flex items-center gap-2 text-sm text-brand-200">Explore <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" /></span></div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-light section-space">
        <div className="container-x">
          <Eyebrow num="03" className="text-ink/60">What we deliver</Eyebrow>
          <h2 className="mt-5 display h-md text-ink">Deliverables at a <AccentText text="*glance.*" className="serif-i text-brand-500" /></h2>
          <div className="content-gap grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}/`} className="group rounded-[20px] border border-ink/10 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex items-center gap-3"><LIcon name={service.icon} size={18} className="text-brand-500" /><p className="font-medium">{service.name}</p></div>
                <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-ink/60">{service.deliverables.slice(1, 4).map((deliverable) => <li key={deliverable}>— {deliverable}</li>)}</ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-2 section-space">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><Eyebrow num="04" className="text-white/60">Technology ecosystem</Eyebrow><h2 className="mt-5 display h-md">Chosen for <AccentText text="*fit,* not fashion." /></h2></div><Button href="/technologies/" variant="ghost" magnetic={false}>All technologies</Button></div>
          <p className="mt-4 max-w-2xl text-white/60">The stack is selected during planning for the product, its integrations and the team that will maintain it.</p>
          <div className="content-gap"><TechnologyGrid categories={techCategories} /></div>
        </div>
      </section>

      <section className="bg-ink section-space">
        <div className="container-x"><Eyebrow num="05" className="text-white/60">Development process</Eyebrow><h2 className="mt-5 display h-md">Four clear <AccentText text="*stages.*" /></h2><div className="content-gap"><ProcessSteps stages={processStages} /></div></div>
      </section>

      <section className="surface-light section-space">
        <div className="container-x"><Eyebrow num="06" className="text-ink/60">FAQ</Eyebrow><h2 className="mt-5 display h-md text-ink">Common <AccentText text="*questions.*" className="serif-i text-brand-500" /></h2><div className="content-gap"><StaticFAQ light items={generalFaqs.slice(0, 6)} /></div></div>
      </section>

      <FinalCTA title="Not sure where to *start?*" text="Describe the problem you want to solve. We will recommend the right service — or a short discovery phase — and explain why." />
    </>
  );
}
