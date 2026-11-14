import type { ReactNode } from "react";
import Link from "next/link";
import ParticleCanvas from "@/components/hero/ParticleCanvas";
import { SplitHeading, Reveal } from "@/components/anim/primitives";
import type { HeroShape } from "@/data/services";

/* Shared animated hero for inner pages. Each page passes its own shape, hue and
   layout so heroes stay distinct while feeling part of one brand. */
export default function PageHero({
  eyebrow, title, intro, shape = "sphere", hue = "#a792d8", crumbs = [], children, aside, align = "split", big,
}: {
  eyebrow: string; title: string; intro?: string; shape?: HeroShape; hue?: string; crumbs?: { label: string; href?: string }[];
  children?: ReactNode; aside?: ReactNode; align?: "split" | "center"; big?: string;
}) {
  const center = align === "center";
  return (
    <section className="noise relative isolate flex min-h-0 items-start overflow-hidden bg-ink pb-12 pt-8 sm:min-h-[60svh] sm:pb-14 sm:pt-12 md:min-h-[82svh] md:items-end md:pb-20 md:pt-28">
      <div className="absolute inset-0 -z-10 grid-lines opacity-70" />
      <div className="orb -left-32 top-10 -z-10 h-[460px] w-[460px] bg-brand-700/50" />
      <div className="orb right-0 bottom-0 -z-10 h-[380px] w-[380px]" style={{ background: hue, opacity: 0.18 }} />
      <div className={`absolute -z-10 ${center ? "inset-0" : "inset-y-0 right-[-20%] w-[120%] md:right-[-8%] md:w-[70%]"} opacity-90`}>
        <ParticleCanvas shape={shape} hue={hue} density={0.7} links={false} />
      </div>
      {big && (
        <p aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[18%] -z-10 -translate-x-1/2 select-none whitespace-nowrap display text-[26vw] leading-none text-white/[0.025]">{big}</p>
      )}
      <div className={`container-x relative ${center ? "text-center" : ""}`}>
        {crumbs.length > 0 && (
          <Reveal variant="fade" as="nav" className={`mb-8 ${center ? "flex justify-center" : ""}`}>
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/50" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  {c.href ? <Link href={c.href} className="link-u hover:text-white">{c.label}</Link> : <span aria-current="page" className="text-white/80">{c.label}</span>}
                  {i < crumbs.length - 1 && <span>/</span>}
                </li>
              ))}
            </ol>
          </Reveal>
        )}
        <div className={`grid gap-10 ${aside ? "lg:grid-cols-12 lg:items-end" : ""}`}>
          <div className={aside ? "lg:col-span-8" : center ? "mx-auto max-w-5xl" : "max-w-5xl"}>
            <Reveal variant="clip-up" className={center ? "flex justify-center" : ""}>
              <p className="eyebrow inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-brand-200 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-300" />{eyebrow}
              </p>
            </Reveal>
            <SplitHeading as="h1" text={title} immediate className="mt-7 display h-lg text-balance" />
            {intro && (
              <Reveal variant="blur" delay={0.5} className={center ? "mx-auto max-w-2xl" : "max-w-2xl"}>
                <p className="lead mt-7 text-white/65">{intro}</p>
              </Reveal>
            )}
            {children && <Reveal variant="up" delay={0.7} className={`mt-10 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>{children}</Reveal>}
          </div>
          {aside && <Reveal variant="right" delay={0.6} className="lg:col-span-4">{aside}</Reveal>}
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 md:flex" aria-hidden="true">
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="relative h-9 w-5 rounded-full border border-white/25">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-white/70" style={{ animation: "scroll-dot 1.8s ease-in-out infinite" }} />
        </span>
      </div>
    </section>
  );
}
