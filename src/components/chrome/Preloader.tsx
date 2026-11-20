"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { registerGsap, markReady, prefersReducedMotion } from "@/lib/motion";

/* Branded preloader once per session. The timeline waits for the local, official
   logo asset to load so there is never a blank logo at the start of the animation. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  // A cached image resolves immediately through onLoad. On a failed or unusually
  // slow image request, release the sequence after a short grace period so the
  // first visit can never become a blank, permanently blocked page.
  useEffect(() => {
    const seen = document.documentElement.dataset.seen === "1";
    if (seen || prefersReducedMotion() || logoLoaded) return;
    const fallback = window.setTimeout(() => setLogoLoaded(true), 1500);
    return () => window.clearTimeout(fallback);
  }, [logoLoaded]);

  useEffect(() => {
    const seen = document.documentElement.dataset.seen === "1";
    if (seen || prefersReducedMotion()) {
      markReady();
      const timer = window.setTimeout(() => setDone(true), 0);
      return () => window.clearTimeout(timer);
    }
    if (!logoLoaded) return;

    const { gsap } = registerGsap();
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem("adx-seen", "1"); } catch {}
        setDone(true);
      },
    });
    tl.from(".pl-mark", { scale: 0.82, opacity: 0, rotate: -12, duration: 0.45, ease: "expo.out" })
      .to(counter, { v: 100, duration: 0.75, ease: "power2.inOut", onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, "0"); } }, 0.05)
      .to(".pl-bar", { scaleX: 1, duration: 0.75, ease: "power2.inOut" }, 0.05)
      .add(() => markReady(), "-=0.05")
      .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "expo.inOut" }, "+=0.02");
    return () => { tl.kill(); };
  }, [logoLoaded]);

  if (done) return null;
  return (
    <div ref={root} className="preloader fixed inset-0 z-[10000] grid place-items-center bg-ink" style={{ clipPath: "inset(0% 0% 0% 0%)" }} role="status" aria-label="Loading Adelogix">
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="relative flex flex-col items-center gap-6">
        <Image
          src="/images/brand/adelogix-logo-original.png"
          alt="Adelogix"
          width={234}
          height={51}
          className="pl-mark h-auto w-[min(234px,56vw)] brightness-0 invert"
          priority
          onLoad={() => setLogoLoaded(true)}
          onError={() => setLogoLoaded(true)}
        />
        <div className="h-px w-48 bg-white/10"><div className="pl-bar h-px origin-left scale-x-0 bg-brand-gradient" /></div>
      </div>
      <span ref={num} className="absolute bottom-8 right-8 font-mono text-sm text-white/50">000</span>
      <span className="absolute bottom-8 left-8 eyebrow text-white/40">Software Technology</span>
    </div>
  );
}
