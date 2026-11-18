import type { ReactNode } from "react";
import ParticleCanvas from "@/components/hero/ParticleCanvas";
import { SplitHeading, Reveal } from "@/components/anim/primitives";
import type { HeroShape } from "@/data/services";

/* Shared animated hero for inner pages. The composition stays cinematic without
   making visitors scroll through an empty viewport before reaching the page. */
export default function PageHero({
  title, intro, shape = "sphere", hue = "#a792d8", children, aside, align = "split",
}: {
  title: string; intro?: string; shape?: HeroShape; hue?: string;
  children?: ReactNode; aside?: ReactNode; align?: "split" | "center";
}) {
  const center = align === "center";
  return (
    <section className="noise relative isolate flex items-center overflow-hidden bg-ink py-14 sm:py-16 md:min-h-[min(68svh,720px)] md:py-20">
      <div className="absolute inset-0 -z-10 grid-lines opacity-70" />
      <div className="orb -left-32 top-10 -z-10 h-[460px] w-[460px] bg-brand-700/50" />
      <div className="orb right-0 bottom-0 -z-10 h-[380px] w-[380px]" style={{ background: hue, opacity: 0.18 }} />
      <div className={`absolute -z-10 ${center ? "inset-0" : "inset-y-0 right-[-20%] w-[120%] md:right-[-8%] md:w-[70%]"} opacity-90`}>
        <ParticleCanvas shape={shape} hue={hue} density={0.7} links={false} />
      </div>
      <div className={`container-x relative ${center ? "text-center" : ""}`}>
        <div className={`grid gap-8 ${aside ? "lg:grid-cols-12 lg:items-end" : ""}`}>
          <div className={aside ? "lg:col-span-8" : center ? "mx-auto max-w-5xl" : "max-w-5xl"}>
            <SplitHeading as="h1" text={title} immediate className="display h-lg text-balance" />
            {intro && (
              <Reveal variant="blur" delay={0.35} className={center ? "mx-auto max-w-2xl" : "max-w-2xl"}>
                <p className="lead mt-6 text-white/65">{intro}</p>
              </Reveal>
            )}
            {children && <Reveal variant="up" delay={0.55} className={`mt-8 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>{children}</Reveal>}
          </div>
          {aside && <Reveal variant="right" delay={0.45} className="lg:col-span-4">{aside}</Reveal>}
        </div>
      </div>
    </section>
  );
}
