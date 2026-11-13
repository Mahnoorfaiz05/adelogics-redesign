"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { services, type Service } from "@/data/services";
import { techCategories, allTools } from "@/data/technologies";
import { LIcon, TechMark } from "@/components/ui/Icons";
import { Marquee, Reveal } from "@/components/anim/primitives";
import { registerGsap, isFinePointer } from "@/lib/motion";

/* ───────── Services: editorial index with floating cursor preview ───────── */
export function ServicesShowcase({ list = services, light = false }: { list?: Service[]; light?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = preview.current, w = wrap.current; if (!el || !w || !isFinePointer()) return;
    const { gsap } = registerGsap();
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: MouseEvent) => { const r = w.getBoundingClientRect(); xTo(e.clientX - r.left + 30); yTo(e.clientY - r.top - 120); };
    w.addEventListener("mousemove", move);
    return () => w.removeEventListener("mousemove", move);
  }, []);

  const s = active !== null ? list[active] : null;
  return (
    <div ref={wrap} className="relative" onMouseLeave={() => setActive(null)}>
      <ul className={`border-t ${light ? "border-ink/15" : "border-white/10"}`}>
        {list.map((svc, i) => (
          <li key={svc.slug} className={`border-b ${light ? "border-ink/15" : "border-white/10"}`} onMouseEnter={() => setActive(i)}>
            <div className="group relative">
              <Link href={`/services/${svc.slug}/`} className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:grid-cols-[80px_1fr_1.1fr_auto] md:gap-8 md:py-8" data-cursor="hover">
                <span className={`font-mono text-xs ${light ? "text-ink/40" : "text-white/40"}`}>{svc.num}</span>
                <span className="flex items-center gap-4">
                  <span className={`hidden h-12 w-12 shrink-0 place-items-center rounded-2xl border transition-all duration-700 group-hover:rotate-[-10deg] group-hover:scale-110 sm:grid ${light ? "border-ink/15 text-brand-500 group-hover:bg-ink group-hover:text-brand-200" : "border-white/10 text-brand-200 group-hover:bg-brand-500/25"}`}>
                    <LIcon name={svc.icon} size={20} />
                  </span>
                  <span className="display text-[clamp(1.35rem,1rem+1.8vw,2.6rem)] leading-none transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:group-hover:translate-x-4">{svc.name}</span>
                </span>
                <span className={`hidden text-sm leading-relaxed md:block ${light ? "text-ink/60" : "text-white/55"}`}>{svc.short}</span>
                <span className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:text-white ${light ? "border-ink/15" : "border-white/15"}`}><ArrowUpRight size={18} /></span>
              </Link>
              <button className="absolute right-12 top-1/2 inline-flex h-11 -translate-y-1/2 items-center rounded-full px-3 text-xs underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100 md:hidden" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-label={`${open === i ? "Hide" : "Show"} details for ${svc.name}`}>
                {open === i ? "Less" : "More"}
              </button>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand-gradient transition-transform duration-700 group-hover:scale-x-100" />
            </div>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden">
                  <p className={`pb-4 text-sm ${light ? "text-ink/65" : "text-white/60"}`}>{svc.short}</p>
                  <div className="flex flex-wrap gap-2 pb-6">{svc.tags.map((t) => <span key={t} className="rounded-full border border-current/20 px-3 py-1 text-xs opacity-70">{t}</span>)}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
      {/* Floating preview (desktop) */}
      <div ref={preview} className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block" aria-hidden="true">
        <AnimatePresence mode="wait">
          {s && (
            <motion.div key={s.slug} initial={{ opacity: 0, scale: 0.85, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-72 overflow-hidden rounded-3xl border border-white/10 bg-ink-2 p-6 text-ivory shadow-2xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl" style={{ background: s.hue, opacity: 0.5 }} />
              <div className="relative">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient"><LIcon name={s.icon} size={26} className="text-white" /></span>
                <p className="mt-5 display text-xl">{s.name}</p>
                <ul className="mt-4 space-y-2 text-xs text-white/70">
                  {s.deliverables.slice(1, 5).map((d) => <li key={d} className="flex items-center gap-2"><Check size={12} className="text-brand-300" />{d}</li>)}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────── Technology ecosystem: category orbit + detail panel ───────── */
export function TechEcosystem({ compact = false }: { compact?: boolean }) {
  const [cat, setCat] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const c = techCategories[cat];
  const item = hover !== null ? c.items[hover] : null;

  return (
    <div>
      <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none]" role="tablist" aria-label="Technology categories">
        <div className="flex w-max gap-2">
          {techCategories.map((t, i) => (
            <button key={t.id} role="tab" aria-selected={cat === i} onClick={() => { setCat(i); setHover(null); }}
              className={`relative flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-colors ${cat === i ? "text-ink" : "text-white/65 hover:text-white"}`}>
              {cat === i && <motion.span layoutId="tech-pill" className="absolute inset-0 rounded-full bg-ivory" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative"><LIcon name={t.lucide} size={16} /></span>
              <span className="relative whitespace-nowrap">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`mt-10 grid gap-10 lg:grid-cols-2 lg:items-center ${compact ? "" : "lg:min-h-[560px]"}`} role="tabpanel">
        {/* Orbit visual */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div className="absolute inset-[6%] rounded-full border border-dashed border-white/10 spin-slow" />
          <div className="absolute inset-[22%] rounded-full border border-white/10" />
          <div className="absolute inset-[36%] rounded-full bg-brand-500/20 blur-2xl" />
          <AnimatePresence mode="wait">
            <motion.div key={c.id} initial={{ scale: 0.6, opacity: 0, rotate: -40 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0.6, opacity: 0, rotate: 40 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
              <div className="absolute left-1/2 top-1/2 grid h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-gradient shadow-[0_0_80px_rgba(123,73,158,.6)]">
                <div className="text-center">
                  <LIcon name={c.lucide} size={30} className="mx-auto text-white" />
                  <p className="mt-1 font-mono text-[0.65rem] tracking-widest text-white/80">{c.short}</p>
                </div>
              </div>
              {c.items.map((it, i) => {
                const a = (i / c.items.length) * Math.PI * 2 - Math.PI / 2;
                const r = 40;
                return (
                  <button key={it.name} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onClick={() => setHover(i)}
                    className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + Math.cos(a) * r}%`, top: `${50 + Math.sin(a) * r}%` }} aria-label={it.name}>
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 + i * 0.07, type: "spring", stiffness: 300, damping: 18 }}
                      className={`float grid h-16 w-16 place-items-center rounded-2xl border backdrop-blur transition-all duration-300 md:h-20 md:w-20 ${hover === i ? "scale-110 border-brand-300 bg-brand-500/30 text-white" : "border-white/15 bg-white/[0.05] text-white/85"}`}
                      style={{ animationDelay: `${i * 0.6}s` }}>
                      <TechMark icon={it.icon} mono={it.mono} size={26} />
                    </motion.span>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Detail */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}>
              <p className="eyebrow text-brand-300">{String(cat + 1).padStart(2, "0")} / {String(techCategories.length).padStart(2, "0")}</p>
              <h3 className="mt-4 display text-4xl md:text-5xl">{c.name}</h3>
              <p className="mt-4 max-w-md text-white/60">{c.blurb}</p>
              <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {c.items.map((it, i) => (
                  <li key={it.name} onMouseEnter={() => setHover(i)} className={`flex items-start gap-4 py-4 transition-colors ${hover === i ? "text-white" : "text-white/70"}`}>
                    <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-colors ${hover === i ? "border-brand-300 bg-brand-500/25" : "border-white/10"}`}><TechMark icon={it.icon} mono={it.mono} size={16} /></span>
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 font-medium">{it.name}
                        {it.kind === "capability" && <span className="rounded-full bg-white/[0.07] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-white/50">Capability</span>}
                      </p>
                      <p className={`grid text-sm text-white/55 transition-all duration-500 ${hover === i ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 md:grid-rows-[0fr]"}`}><span className="overflow-hidden">{it.desc}</span></p>
                    </div>
                  </li>
                ))}
              </ul>
              {item && <p className="sr-only" aria-live="polite">{item.name}: {item.desc}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function ToolsMarquee() {
  const tools = [...allTools, ...techCategories.flatMap((c) => c.items.filter((i) => i.kind === "capability").slice(0, 1))];
  return (
    <Reveal variant="fade" className="space-y-4 py-4">
      <Marquee speed={45}>
        {tools.map((t) => (
          <span key={t.name} className="mx-3 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-white/75">
            <TechMark icon={t.icon} mono={t.mono} size={18} />{t.name}
          </span>
        ))}
      </Marquee>
      <Marquee speed={55} reverse>
        {techCategories.map((c) => (
          <span key={c.id} className="mx-6 flex items-center gap-4 display text-4xl text-white/15 md:text-6xl">
            {c.name}<span className="text-brand-400/60">✦</span>
          </span>
        ))}
      </Marquee>
    </Reveal>
  );
}
