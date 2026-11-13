"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Minus, Plus, Quote, UserRound } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { getService } from "@/data/services";
import { testimonials, team } from "@/data/content";
import { registerGsap, prefersReducedMotion } from "@/lib/motion";
import { ProjectCard } from "./blocks";
import { Reveal } from "@/components/anim/primitives";

/* ───────── Featured projects: pinned horizontal scroll (desktop) ───────── */
export function FeaturedProjects({ list = projects }: { list?: Project[] }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = registerGsap();
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const t = track.current!, s = section.current!;
      const dist = () => t.scrollWidth - window.innerWidth + 80;
      const tw = gsap.to(t, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: s, start: "top top", end: () => `+=${dist()}`, scrub: 0.8, pin: true, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (self) => { if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`; } },
      });
      gsap.utils.toArray<HTMLElement>(".hp-img").forEach((img) => {
        gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: img, containerAnimation: tw, start: "left right", end: "right left", scrub: true } });
      });
      return () => { tw.scrollTrigger?.kill(); tw.kill(); };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={section} className="relative overflow-hidden lg:h-screen">
      <div ref={track} className="flex flex-col gap-8 px-[var(--gutter)] sm:gap-10 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-10 lg:pr-[30vw]">
        {list.map((p, i) => (
          <Link key={p.slug} href={`/work/${p.slug}/`} data-cursor="view" className="group relative block w-full shrink-0 lg:w-[min(62vw,980px)]">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[30px] bg-ink-3">
              <div className="hp-img absolute inset-[-8%]">
                <Image src={p.cover} alt={`${p.name} — ${p.category}`} fill sizes="(min-width:1024px) 62vw, 100vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute left-5 top-5 flex flex-wrap gap-2 md:left-7 md:top-7">
                <span className="rounded-full bg-ink/60 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-white backdrop-blur">{p.category}</span>
                <span className="rounded-full bg-ink/60 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-white/70 backdrop-blur">{p.year}</span>
              </div>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-8 md:bottom-8">
                <div>
                  <span className="font-mono text-xs text-brand-200">{String(i + 1).padStart(2, "0")} — {p.industry}</span>
                  <h3 className="mt-2 display text-3xl text-white md:text-6xl">{p.name}</h3>
                  <p className="mt-2 hidden max-w-lg text-sm text-white/70 md:block">{p.tagline}</p>
                  <div className="mt-4 hidden flex-wrap gap-2 md:flex">
                    {p.services.slice(0, 3).map((s) => <span key={s} className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/80">{getService(s)?.name}</span>)}
                  </div>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ivory text-ink transition-transform duration-500 group-hover:rotate-45 md:h-16 md:w-16"><ArrowUpRight /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-8 left-[var(--gutter)] right-[var(--gutter)] hidden h-px bg-white/10 lg:block"><div ref={bar} className="h-px origin-left scale-x-0 bg-brand-gradient" /></div>
    </div>
  );
}

/* ───────── Process timeline: scroll-scrubbed progress line ───────── */
export function ProcessTimeline({ stages, light = false }: { stages: { name: string; text: string; items?: string[] }[]; light?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion() || window.matchMedia("(max-width: 1023px)").matches) {
      // Keep the timeline legible and static on touch/reduced-motion views.
      el.dataset.staticTimeline = "true";
      if (line.current) line.current.style.transform = "scaleY(1)";
      return () => { delete el.dataset.staticTimeline; };
    }
    const { gsap, ScrollTrigger } = registerGsap();
    const st = ScrollTrigger.create({
      trigger: el, start: "top 65%", end: "bottom 60%", scrub: true,
      onUpdate: (self) => {
        if (line.current) line.current.style.transform = `scaleY(${self.progress})`;
        const next = Math.min(stages.length - 1, Math.floor(self.progress * stages.length * 0.999));
        // ScrollTrigger can fire many times per frame; only re-render when the stage changes.
        if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
      },
    });
    const tw = gsap.from(el.querySelectorAll(".pt-card"), { opacity: 0, x: 40, stagger: 0.12, duration: 0.75, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 80%", once: true } });
    return () => { st.kill(); tw.scrollTrigger?.kill(); tw.kill(); };
  }, [stages.length]);
  const muted = light ? "text-ink/55" : "text-white/55";
  return (
    <div ref={root} className="relative pl-12 md:pl-0">
      <div className={`absolute bottom-0 left-4 top-0 w-px md:left-1/2 ${light ? "bg-ink/10" : "bg-white/10"}`}>
        <div ref={line} className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-brand-300 via-brand-400 to-steel" />
      </div>
      <ol className="space-y-10 md:space-y-16">
        {stages.map((s, i) => (
          <li key={s.name} className="relative md:grid md:grid-cols-2 md:gap-12">
            <span className={`timeline-step absolute -left-12 top-1 grid h-8 w-8 place-items-center rounded-full border font-mono text-[0.7rem] transition-all duration-500 md:left-1/2 md:-translate-x-1/2 ${i <= active ? "scale-110 border-transparent bg-brand-gradient text-white shadow-[0_0_30px_rgba(123,73,158,.7)]" : light ? "border-ink/20 bg-ivory text-ink/50" : "border-white/20 bg-ink text-white/50"}`}>{i + 1}</span>
            <div className={`pt-card ${i % 2 ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}>
              <p className={`font-mono text-xs uppercase tracking-widest ${i <= active ? "text-brand-400" : muted}`}>Stage {i + 1} of {stages.length}</p>
              <h3 className="mt-3 display text-4xl md:text-6xl">{s.name}</h3>
              <p className={`mt-4 leading-relaxed ${muted} ${i % 2 ? "" : "md:ml-auto"} max-w-md`}>{s.text}</p>
              {s.items && (
                <ul className={`mt-5 flex flex-wrap gap-2 ${i % 2 ? "" : "md:justify-end"}`}>
                  {s.items.map((it) => <li key={it} className={`rounded-full border px-3 py-1.5 text-xs ${light ? "border-ink/15" : "border-white/15 text-white/75"}`}>{it}</li>)}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ───────── Testimonials (SAMPLE placeholders — clearly marked) ───────── */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const t = testimonials[i];
  const go = (d: number) => { setDir(d); setI((x) => (x + d + testimonials.length) % testimonials.length); };
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="relative min-h-[320px] overflow-hidden rounded-[32px] border border-ink/10 bg-white p-8 md:p-12">
          <Quote className="absolute right-8 top-8 h-16 w-16 text-brand-200" strokeWidth={1} />
          {!t.verified && (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-amber-800">
              Sample content · unverified · not genuine customer feedback
            </p>
          )}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={i} custom={dir} initial={{ opacity: 0, x: dir * 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -60 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
              <blockquote className="display text-2xl leading-snug text-ink md:text-3xl">“{t.feedback}”</blockquote>
              <div className="mt-8 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-paper text-ink/40">{t.image ? <Image src={t.image} alt={t.name} width={56} height={56} className="rounded-full" /> : <UserRound />}</span>
                <div className="text-sm">
                  <p className="font-medium text-ink">{t.name}</p>
                  <p className="text-ink/55">{t.company} · {t.country}</p>
                  <p className="text-ink/45">{t.project}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-8 lg:col-span-4">
        <div className="space-y-3 text-ink/60"><p className="font-mono text-[0.7rem] uppercase tracking-wider text-amber-700">Unverified placeholders</p><p>No client testimonial has been published yet. These cards use sample content only; they are not genuine customer feedback and no client identity is implied.</p><p>Verified quotes will replace them once written permission is received.</p></div>
        <div className="flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-14 w-14 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-ivory"><ArrowLeft size={18} /></button>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-14 w-14 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-ivory"><ArrowRight size={18} /></button>
          <span className="ml-3 font-mono text-sm text-ink/50">{String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
        </div>
        <Link href="/work/" className="link-u self-start font-medium text-brand-500">Read our case studies →</Link>
      </div>
    </div>
  );
}

/* ───────── Team (original supplied team photographs) ───────── */
export function Team({ light = false }: { light?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {team.map((member, index) => {
        const imageAlt = member.name === "Name not published"
          ? "Adelogix CEO and Founder"
          : `${member.name}, ${member.role} at Adelogix`;
        return (
          <Reveal as="article" key={`${member.name}-${index}`} variant="up" delay={index * 0.06}
            className={`group overflow-hidden rounded-[24px] border transition-all duration-500 hover:-translate-y-1 ${light ? "border-ink/10 bg-white text-ink shadow-sm" : "border-white/10 bg-ink-3 text-ivory"}`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-2">
              <Image
                src={member.image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 42vw, 100vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
                style={{ objectPosition: member.position }}
              />
            </div>
            <div className="min-h-[142px] p-5">
              <p className={`eyebrow ${light ? "text-brand-600" : "text-brand-300"}`}>{member.role}</p>
              <h3 className="mt-3 display text-xl leading-none">{member.name}</h3>
              <p className={`mt-3 text-xs leading-relaxed ${light ? "text-ink/60" : "text-white/60"}`}>{member.bio}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ───────── FAQ accordion ───────── */
export function FAQ({ items, light = false }: { items: { q: string; a: string; topic?: string }[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className={`border-t ${light ? "border-ink/15" : "border-white/10"}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className={`border-b ${light ? "border-ink/15" : "border-white/10"}`}>
            <h3>
              <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7">
                <span className="flex min-w-0 items-baseline gap-4">
                  {f.topic && <span className={`hidden w-28 shrink-0 font-mono text-xs uppercase tracking-wider md:inline ${light ? "text-ink/40" : "text-white/40"}`}>{f.topic}</span>}
                  <span className="block min-w-0 text-lg font-medium leading-snug transition-transform duration-500 group-hover:translate-x-1 md:text-xl">{f.q}</span>
                </span>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${isOpen ? "rotate-180 border-transparent bg-brand-gradient text-white" : light ? "border-ink/20" : "border-white/20"}`}>
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                  <p className={`max-w-3xl pb-7 leading-relaxed md:pl-32 ${light ? "text-ink/65" : "text-white/60"}`}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/* ───────── Work grid with animated filters ───────── */
export function WorkGrid() {
  const filters = ["All", "Mobile", "Web", "FinTech", "Design"] as const;
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = projects.filter((p) => f === "All" || p.filter === f || (f === "Web" && p.services.includes("web-development")) || (f === "Design" && p.services.includes("ui-ux-design")) || (f === "Mobile" && p.services.includes("mobile-app-development")));
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter projects">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)} aria-pressed={f === x} className={`relative rounded-full px-5 py-2.5 text-sm transition-colors ${f === x ? "text-ivory" : "text-ink/60 hover:text-ink"}`}>
            {f === x && <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <span className="relative">{x} <span className="opacity-50">({x === "All" ? projects.length : projects.filter((p) => p.filter === x || (x === "Web" && p.services.includes("web-development")) || (x === "Design" && p.services.includes("ui-ux-design")) || (x === "Mobile" && p.services.includes("mobile-app-development"))).length})</span></span>
          </button>
        ))}
      </div>
      <motion.div layout className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
              className={i % 2 === 1 ? "md:mt-8" : ""}>
              <ProjectCard p={p} index={projects.indexOf(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
