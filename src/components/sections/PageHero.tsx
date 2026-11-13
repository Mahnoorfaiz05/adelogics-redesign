import type { ReactNode } from "react";
import Link from "next/link";
import AccentText from "@/components/ui/AccentText";
import type { HeroShape } from "@/data/services";

/*
 * Shared inner-page hero. It deliberately stays server-rendered: headings,
 * breadcrumbs and calls to action are visible immediately, while the visual
 * identity comes from inexpensive CSS layers instead of a route-wide canvas.
 */
export default function PageHero({
  eyebrow, title, intro, shape = "sphere", hue = "#a792d8", crumbs = [], children, aside, align = "split", big,
}: {
  eyebrow: string; title: string; intro?: string; shape?: HeroShape; hue?: string; crumbs?: { label: string; href?: string }[];
  children?: ReactNode; aside?: ReactNode; align?: "split" | "center"; big?: string;
}) {
  const center = align === "center";
  return (
    <section className="noise relative isolate flex min-h-[54svh] items-end overflow-hidden bg-ink pb-8 pt-20 sm:min-h-[56svh] sm:pb-10 sm:pt-24 md:min-h-[64svh] md:pb-16 md:pt-24" data-hero-shape={shape}>
      <div className="absolute inset-0 -z-10 grid-lines opacity-60" />
      <div className="orb -left-32 top-10 -z-10 h-[390px] w-[390px] bg-brand-700/45" />
      <div className="orb right-0 bottom-0 -z-10 h-[320px] w-[320px]" style={{ background: hue, opacity: 0.18 }} />
      <div className="absolute right-[7%] top-[16%] -z-10 hidden h-48 w-48 rotate-12 rounded-[38%] border border-white/10 bg-white/[0.025] shadow-[0_0_80px_rgba(123,73,158,.22)] md:block" />
      {big && (
        <p aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[17%] -z-10 -translate-x-1/2 select-none whitespace-nowrap display text-[24vw] leading-none text-white/[0.025]">{big}</p>
      )}
      <div className={`container-x relative ${center ? "text-center" : ""}`}>
        {crumbs.length > 0 && (
          <nav className={`mb-6 ${center ? "flex justify-center" : ""}`} aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/50">
              {crumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  {crumb.href ? <Link href={crumb.href} className="link-u hover:text-white">{crumb.label}</Link> : <span aria-current="page" className="text-white/80">{crumb.label}</span>}
                  {index < crumbs.length - 1 && <span>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={`grid gap-8 ${aside ? "lg:grid-cols-12 lg:items-end" : ""}`}>
          <div className={aside ? "lg:col-span-8" : center ? "mx-auto max-w-5xl" : "max-w-5xl"}>
            <p className="eyebrow inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-brand-200">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />{eyebrow}
            </p>
            <h1 className="mt-6 display h-lg text-balance"><AccentText text={title} /></h1>
            {intro && <p className={`lead mt-6 text-white/65 ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{intro}</p>}
            {children && <div className={`mt-8 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>{children}</div>}
          </div>
          {aside && <div className="lg:col-span-4">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
