import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import AccentText from "@/components/ui/AccentText";
import { LIcon, TechMark } from "@/components/ui/Icons";
import type { Project } from "@/data/projects";
import type { Service } from "@/data/services";
import type { TechCategory } from "@/data/technologies";

/**
 * Server-rendered service building blocks. The previous service routes used
 * several broad client modules for small pieces of interaction. These retain
 * the content and navigational affordances while keeping the page usable and
 * complete before JavaScript is parsed.
 */
export function ServiceDirectory({ services, light = false }: { services: Service[]; light?: boolean }) {
  const border = light ? "border-ink/15" : "border-white/10";
  const muted = light ? "text-ink/60" : "text-white/60";
  return (
    <ul className={`border-t ${border}`}>
      {services.map((service) => (
        <li key={service.slug} className={`border-b ${border}`}>
          <Link href={`/services/${service.slug}/`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 py-5 sm:gap-5 md:grid-cols-[72px_minmax(0,1fr)_minmax(13rem,0.8fr)_auto] md:py-6">
            <span className={`font-mono text-xs ${light ? "text-ink/45" : "text-white/45"}`}>{service.num}</span>
            <span className="flex min-w-0 items-center gap-3">
              <span className={`hidden h-10 w-10 shrink-0 place-items-center rounded-xl border sm:grid ${light ? "border-ink/15 text-brand-600" : "border-white/10 text-brand-200"}`}><LIcon name={service.icon} size={18} /></span>
              <span className="display text-[clamp(1.3rem,1rem+1.5vw,2.25rem)] leading-none transition-transform duration-300 group-hover:translate-x-1">{service.name}</span>
            </span>
            <span className={`hidden text-sm leading-relaxed md:block ${muted}`}>{service.short}</span>
            <span className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:text-white ${light ? "border-ink/15" : "border-white/15"}`}><ArrowUpRight size={17} /></span>
          </Link>
          <p className={`pb-5 text-sm leading-relaxed md:hidden ${muted}`}>{service.short}</p>
        </li>
      ))}
    </ul>
  );
}

export function ProcessSteps({ stages, light = false }: { stages: { name: string; text: string; items?: string[] }[]; light?: boolean }) {
  const muted = light ? "text-ink/65" : "text-white/60";
  const border = light ? "border-ink/15" : "border-white/10";
  return (
    <ol className={`grid gap-px overflow-hidden rounded-[26px] border ${border} ${light ? "bg-ink/10" : "bg-white/10"} md:grid-cols-2`}>
      {stages.map((stage, index) => (
        <li key={stage.name} className={`min-w-0 p-6 sm:p-7 ${light ? "bg-ivory" : "bg-ink-2"}`}>
          <p className="font-mono text-xs uppercase tracking-widest text-brand-400">Stage {String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 display text-3xl md:text-4xl">{stage.name}</h3>
          <p className={`mt-4 max-w-xl leading-relaxed ${muted}`}>{stage.text}</p>
          {stage.items && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {stage.items.map((item) => <li key={item} className={`rounded-full border px-3 py-1.5 text-xs ${border}`}>{item}</li>)}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

export function StaticFAQ({ items, light = false }: { items: { q: string; a: string; topic?: string }[]; light?: boolean }) {
  const border = light ? "border-ink/15" : "border-white/10";
  const muted = light ? "text-ink/65" : "text-white/60";
  return (
    <div className={`border-t ${border}`}>
      {items.map((item, index) => (
        <details key={item.q} open={index === 0} className={`group border-b ${border}`}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left marker:hidden md:py-6">
            <span className="flex min-w-0 items-baseline gap-4">
              {item.topic && <span className={`hidden shrink-0 font-mono text-xs uppercase tracking-wider md:inline ${light ? "text-ink/40" : "text-white/40"}`}>{item.topic}</span>}
              <span className="text-lg font-medium leading-snug md:text-xl">{item.q}</span>
            </span>
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-transform duration-300 group-open:rotate-180 ${border}`} aria-hidden="true"><Plus className="group-open:hidden" size={16} /><Minus className="hidden group-open:block" size={16} /></span>
          </summary>
          <p className={`max-w-3xl pb-6 leading-relaxed md:pl-32 ${muted}`}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function TechnologyGrid({ categories, service }: { categories: TechCategory[]; service?: Service }) {
  const tools = categories.flatMap((category) => category.items
    .filter((item) => !service || item.services.includes(service.slug) || service.technologies.includes(item.name))
    .map((item) => ({ ...item, category: category.name })));

  if (service && tools.length === 0) {
    return <p className="text-white/60">The final stack is agreed during planning around the requirements, integrations and team maintaining the product.</p>;
  }

  const cards = service ? tools : categories.map((category) => ({
    name: category.name,
    mono: String(category.items.length),
    category: category.blurb,
    icon: undefined,
    isCategory: true,
  }));

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {cards.map((item) => (
        <div key={item.name} className="rounded-[20px] border border-white/10 bg-ink p-4 sm:p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] text-white">
            {"isCategory" in item ? <span className="font-mono text-xs">{item.mono}</span> : <TechMark icon={item.icon} mono={item.mono} size={20} />}
          </span>
          <p className="mt-4 font-medium leading-snug">{item.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/45">{item.category}</p>
        </div>
      ))}
    </div>
  );
}

export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}/`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-ink-3">
        <Image src={project.cover} alt={`${project.name} — ${project.category}`} fill sizes="(min-width: 1024px) 42vw, (min-width: 768px) 45vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider opacity-50">{project.category} · {project.year}</p>
          <h3 className="mt-2 display text-2xl">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed opacity-60">{project.tagline}</p>
        </div>
        <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current/20 transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight size={17} /></span>
      </div>
    </Link>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => <li key={item} className="flex items-start gap-3"><Check size={16} className="mt-0.5 shrink-0 text-brand-300" /><span>{item}</span></li>)}
    </ul>
  );
}

export function AccentTitle({ children }: { children: string }) {
  return <AccentText text={children} />;
}
