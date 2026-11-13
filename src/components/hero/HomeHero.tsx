"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Database, LayoutGrid, Workflow } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";
import { SplitHeading } from "@/components/anim/primitives";
import { Button } from "@/components/ui/Button";
import { registerGsap, onReady, prefersReducedMotion, isFinePointer } from "@/lib/motion";

const quick = [
  { label: "Web platforms", href: "/services/web-development/" },
  { label: "Mobile apps", href: "/services/mobile-app-development/" },
  { label: "SaaS products", href: "/services/saas-development/" },
  { label: "Business systems", href: "/services/custom-software-development/" },
  { label: "AI & automation", href: "/services/ai-development-automation/" },
  { label: "Product design", href: "/services/ui-ux-design/" },
];

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const visual = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const { gsap } = registerGsap();
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.set([".hh-fade", ".hh-card", ".hh-quick"], { opacity: 0 });
        onReady(() => {
          const tl = gsap.timeline({ delay: 0.2 });
          tl.fromTo(".hh-fade", { y: 30, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.12, duration: 1.1, ease: "expo.out" }, 0.5)
            .fromTo(".hh-card", { y: 60, opacity: 0, scale: 0.85, rotateX: 30 }, { y: 0, opacity: 1, scale: 1, rotateX: 0, stagger: 0.15, duration: 1.4, ease: "expo.out" }, 0.4)
            .fromTo(".hh-quick", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: "expo.out" }, 0.9)
            .fromTo(".hh-visual", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2, ease: "expo.out" }, 0);
        });
        // Scroll exit
        gsap.to(content.current, { yPercent: -18, opacity: 0.2, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
        gsap.to(visual.current, { scale: 1.25, yPercent: 10, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      }
    }, el);

    // Mouse parallax on glass cards
    let cleanup = () => {};
    if (!reduced && isFinePointer()) {
      const cards = gsap.utils.toArray<HTMLElement>(".hh-card", el);
      const setters = cards.map((c) => ({ x: gsap.quickTo(c, "x", { duration: 1.2, ease: "power3.out" }), y: gsap.quickTo(c, "y", { duration: 1.2, ease: "power3.out" }), d: Number(c.dataset.depth || 1) }));
      const move = (e: PointerEvent) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        setters.forEach((s) => { s.x(nx * 40 * s.d); s.y(ny * 30 * s.d); });
      };
      addEventListener("pointermove", move);
      cleanup = () => removeEventListener("pointermove", move);
    }
    return () => { ctx.revert(); cleanup(); };
  }, []);

  return (
    <section ref={root} className="noise relative isolate flex min-h-[calc(100svh-var(--header-h))] flex-col justify-end overflow-hidden bg-ink pt-20 md:pt-24">
      <div className="absolute inset-0 -z-20 grid-lines" />
      <div className="orb -left-40 top-1/4 -z-10 h-[520px] w-[520px] bg-brand-700/60" />
      <div className="orb right-[-10%] top-[-10%] -z-10 h-[600px] w-[600px] bg-brand-400/25" />
      <div className="orb bottom-0 right-1/4 -z-10 h-[300px] w-[300px] bg-steel/15" />

      {/* 3D particle globe */}
      <div ref={visual} className="hh-visual absolute inset-0 -z-10 lg:left-[38%]">
        <ParticleCanvas shape="sphere" hue="#b9a6ff" density={1.3} scale={1.05} />
      </div>

      {/* Floating glass cards */}
      <div className="pointer-events-none absolute inset-0 -z-[5] hidden lg:block" style={{ perspective: 1000 }} aria-hidden="true">
        <div className="hh-card glass absolute right-[3%] top-[56%] w-56 rounded-2xl p-4" data-depth="1.4">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient"><LayoutGrid size={16} /></span><div><p className="text-sm font-medium">Interfaces</p><p className="text-xs text-white/50">Web · Mobile · Admin</p></div></div>
          <div className="mt-4 space-y-1.5"><div className="h-1.5 w-full rounded bg-white/10" /><div className="h-1.5 w-3/4 rounded bg-white/10" /><div className="h-1.5 w-1/2 rounded bg-brand-300/50" /></div>
        </div>
        <div className="hh-card glass absolute right-[7%] top-[34%] w-52 rounded-2xl p-4" data-depth="0.8">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10"><Workflow size={16} /></span><div><p className="text-sm font-medium">Logic</p><p className="text-xs text-white/50">APIs · Workflows</p></div></div>
          <div className="mt-4 flex items-end gap-1.5">{[40, 65, 30, 80, 55, 90, 70].map((h, i) => <span key={i} className="w-full rounded-sm bg-gradient-to-t from-brand-600 to-brand-300" style={{ height: h * 0.4 }} />)}</div>
        </div>
        <div className="hh-card glass absolute bottom-[25%] right-[27%] w-60 rounded-2xl p-4" data-depth="1.8">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-steel/20"><Database size={16} /></span><div><p className="text-sm font-medium">Data &amp; AI</p><p className="text-xs text-white/50">Databases · Automation</p></div></div>
          <p className="mt-3 font-mono text-[0.65rem] text-brand-200">● your process — connected</p>
        </div>
      </div>

      <div ref={content} className="container-x relative pb-10 md:pb-14">
        <p className="hh-fade eyebrow inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-brand-200 backdrop-blur">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-brand-300" /></span>
          Software development partner
        </p>
        <SplitHeading as="h1" immediate delay={0.3} stagger={0.07} text="Software built around how your *business* really works." className="mt-8 max-w-[15ch] display h-xl" />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="hh-fade lead max-w-xl text-white/65">
              Adelogix designs and develops web platforms, mobile apps and custom business systems for startups, growing companies and established teams. We start with your process, choose technology that suits it, and stay involved after launch.
            </p>
            <div className="hh-fade mt-9 flex flex-wrap gap-3">
              <Button href="/contact/">Discuss Your Project</Button>
              <Button href="/work/" variant="ghost">Explore Our Work</Button>
            </div>
          </div>
          <ul className="flex flex-wrap gap-2 lg:col-span-5 lg:col-start-8 lg:justify-end">
            {quick.map((q) => (
              <li key={q.href} className="hh-quick">
                <Link href={q.href} className="inline-block rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-white/70 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300/60 hover:text-white">{q.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/45">
          <span className="hh-fade flex items-center gap-3">
            <span className="relative h-9 w-5 rounded-full border border-white/25"><span className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-white/70" style={{ animation: "scroll-dot 1.8s ease-in-out infinite" }} /></span>
            Scroll to explore
          </span>
          <span className="hh-fade hidden font-mono sm:block">Design to deployment · Web, iOS &amp; Android · Support after launch</span>
        </div>
      </div>
    </section>
  );
}
