"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { registerGsap, markReady, prefersReducedMotion } from "@/lib/motion";

/* Branded preloader — once per session. Return visits skip it via an inline
   head script that sets html[data-seen] before paint (see layout.tsx). */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const seen = document.documentElement.dataset.seen === "1";
    if (seen || prefersReducedMotion()) { setDone(true); markReady(); return; }
    const { gsap } = registerGsap();
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem("adx-seen", "1"); } catch {}
        setDone(true);
      },
    });
    tl.from(".pl-mark", { scale: 0.6, opacity: 0, rotate: -30, duration: 0.9, ease: "expo.out" })
      .from(".pl-letter", { yPercent: 110, stagger: 0.04, duration: 0.8, ease: "expo.out" }, "-=0.6")
      .to(counter, { v: 100, duration: 1.3, ease: "power2.inOut", onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, "0"); } }, 0.1)
      .to(".pl-bar", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0.1)
      .add(() => markReady(), "-=0.1")
      .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "+=0.05");
    return () => { tl.kill(); };
  }, []);

  if (done) return null;
  return (
    <div ref={root} className="preloader fixed inset-0 z-[10000] grid place-items-center bg-ink" style={{ clipPath: "inset(0% 0% 0% 0%)" }} role="status" aria-label="Loading Adelogix">
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="relative flex flex-col items-center gap-6">
        <Image src="/assets/brand/adelogix-mark-white.png" alt="" width={84} height={72} className="pl-mark" priority />
        <div className="flex overflow-hidden text-3xl font-semibold tracking-[-0.04em] display">
          {"Adelogix".split("").map((c, i) => <span key={i} className="pl-letter inline-block">{c}</span>)}
        </div>
        <div className="h-px w-48 bg-white/10"><div className="pl-bar h-px origin-left scale-x-0 bg-brand-gradient" /></div>
      </div>
      <span ref={num} className="absolute bottom-8 right-8 font-mono text-sm text-white/50">000</span>
      <span className="absolute bottom-8 left-8 eyebrow text-white/40">Software Technology</span>
    </div>
  );
}
