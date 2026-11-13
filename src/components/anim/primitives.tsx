"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { registerGsap, prefersReducedMotion, isFinePointer, onReady } from "@/lib/motion";

/* ───────── SplitHeading: word-masked reveal. Wrap words in *asterisks* for serif accent ───────── */
export function SplitHeading({
  text, as = "h2", className = "", immediate = false, delay = 0, accentClass = "serif-i text-gradient", stagger = 0.06,
}: { text: string; as?: "h1" | "h2" | "p"; className?: string; immediate?: boolean; delay?: number; accentClass?: string; stagger?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const { gsap } = registerGsap();
    const words = el.querySelectorAll<HTMLElement>(".split-word");
    // On compact touch screens a large number of word-level triggers delays
    // reading and scrolling. The headings remain fully visible there.
    if (prefersReducedMotion() || window.matchMedia("(max-width: 767px)").matches) { gsap.set(words, { yPercent: 0, opacity: 1 }); return; }
    gsap.set(words, { yPercent: 115, rotate: 4 });
    let tween: gsap.core.Tween | undefined;
    const run = () => {
      tween = gsap.to(words, {
        yPercent: 0, rotate: 0, duration: 1.15, ease: "expo.out", stagger, delay,
        scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
      });
    };
    if (immediate) onReady(run); else run();
    return () => { tween?.scrollTrigger?.kill(); tween?.kill(); };
  }, [immediate, delay, stagger]);

  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  const nodes: ReactNode[] = [];
  let k = 0;
  parts.forEach((p) => {
    const accent = p.startsWith("*") && p.endsWith("*");
    const clean = accent ? p.slice(1, -1) : p;
    clean.split(/(\s+)/).forEach((w) => {
      if (!w) return;
      if (w.includes("\n")) { nodes.push(<br key={k++} />); return; }
      if (/^\s+$/.test(w)) { nodes.push(" "); return; }
      nodes.push(
        <span key={k++} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
          <span className={`split-word ${accent ? accentClass + " pr-[0.06em]" : ""}`}>{w}</span>
        </span>
      );
    });
  });
  const setElement = (node: HTMLElement | null) => { ref.current = node; };
  const content = <span aria-hidden="true">{nodes}</span>;
  const label = text.replace(/\*/g, "");
  if (as === "h1") return <h1 ref={setElement} className={className} aria-label={label}>{content}</h1>;
  if (as === "p") return <p ref={setElement} className={className} aria-label={label}>{content}</p>;
  return <h2 ref={setElement} className={className} aria-label={label}>{content}</h2>;
}

/* ───────── Reveal: several distinct treatments (not just fade) ───────── */
type RevealVariant = "up" | "fade" | "mask" | "scale" | "left" | "right" | "blur" | "clip-up";
export function Reveal({
  children, variant = "up", className = "", delay = 0, stagger = 0, as = "div", start = "top 86%", style, duration = 1.1,
}: { children: ReactNode; variant?: RevealVariant; className?: string; delay?: number; stagger?: number; as?: "div" | "li" | "ul" | "article" | "nav"; start?: string; style?: CSSProperties; duration?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const { gsap } = registerGsap();
    const targets = stagger ? el.querySelectorAll<HTMLElement>(":scope > *") : [el];
    if (prefersReducedMotion() || window.matchMedia("(max-width: 767px)").matches) return;
    const from: gsap.TweenVars = {
      up: { y: 60, opacity: 0 }, fade: { opacity: 0 }, scale: { scale: 0.88, opacity: 0 },
      left: { x: -80, opacity: 0 }, right: { x: 80, opacity: 0 }, blur: { opacity: 0, filter: "blur(14px)", y: 20 },
      mask: { clipPath: "inset(100% 0% 0% 0% round 24px)", scale: 1.08 }, "clip-up": { clipPath: "inset(0% 0% 100% 0%)", y: 30 },
    }[variant];
    const to: gsap.TweenVars = {
      y: 0, x: 0, opacity: 1, scale: 1, filter: "blur(0px)", clipPath: variant === "mask" ? "inset(0% 0% 0% 0% round 24px)" : "inset(0% 0% 0% 0%)",
      duration, delay, stagger, ease: variant === "mask" ? "expo.inOut" : "expo.out",
      scrollTrigger: { trigger: el, start, once: true },
    };
    if (variant !== "mask" && variant !== "clip-up") delete to.clipPath;
    const tw = gsap.fromTo(targets, from, to);
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [variant, delay, stagger, start, duration]);
  const setElement = (node: HTMLElement | null) => { ref.current = node; };
  const props = { ref: setElement, className, style };
  if (as === "li") return <li {...props}>{children}</li>;
  if (as === "ul") return <ul {...props}>{children}</ul>;
  if (as === "article") return <article {...props}>{children}</article>;
  if (as === "nav") return <nav {...props}>{children}</nav>;
  return <div {...props}>{children}</div>;
}

/* ───────── Magnetic ───────── */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || !isFinePointer() || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener("mousemove", move); el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [strength]);
  return <span ref={ref} className={`inline-block will-change-transform ${className}`}>{children}</span>;
}

/* ───────── Tilt (3D) ───────── */
export function Tilt({ children, className = "", max = 8, glare = true }: { children: ReactNode; className?: string; max?: number; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || !isFinePointer() || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    gsap.set(el, { transformPerspective: 900, transformStyle: "preserve-3d" });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * max * 2); rx(-(py - 0.5) * max * 2);
      if (glareRef.current) glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.18), transparent 55%)`;
    };
    const leave = () => { rx(0); ry(0); if (glareRef.current) glareRef.current.style.background = "transparent"; };
    el.addEventListener("mousemove", move); el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [max]);
  return (
    <div ref={ref} className={`relative will-change-transform ${className}`}>
      {children}
      {glare && <div ref={glareRef} className="pointer-events-none absolute inset-0 rounded-[inherit] transition-[background] duration-300" />}
    </div>
  );
}

/* ───────── Parallax ───────── */
export function Parallax({ children, speed = 0.2, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || prefersReducedMotion() || window.matchMedia("(max-width: 1023px)").matches) return;
    const { gsap } = registerGsap();
    const tw = gsap.fromTo(el, { yPercent: -speed * 50 }, { yPercent: speed * 50, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [speed]);
  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>;
}

/* ───────── Counter ───────── */
// Render verified numbers in the server HTML instead of briefly exposing “0”
// until hydration. This is clearer for visitors, assistive technology and search.
export function Counter({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  return <span className={className}>{value}{suffix}</span>;
}

/* ───────── Marquee ───────── */
export function Marquee({ children, speed = 40, reverse = false, className = "" }: { children: ReactNode; speed?: number; reverse?: boolean; className?: string }) {
  return (
    <div className={`marquee overflow-hidden ${reverse ? "marquee-reverse" : ""} ${className}`} style={{ ["--marquee-speed" as string]: `${speed}s` }}>
      <div className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
