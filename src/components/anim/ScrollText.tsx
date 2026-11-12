"use client";
import { useEffect, useRef } from "react";
import { registerGsap, prefersReducedMotion } from "@/lib/motion";

/* Words light up one by one as the statement scrolls through the viewport. */
export default function ScrollText({ text, className = "", dim = "rgba(245,244,240,0.16)", bright = "#f5f4f0" }: { text: string; className?: string; dim?: string; bright?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const { gsap } = registerGsap();
    const words = el.querySelectorAll<HTMLElement>("span[data-w]");
    if (prefersReducedMotion()) { gsap.set(words, { color: bright }); return; }
    const tw = gsap.fromTo(words, { color: dim }, { color: bright, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [dim, bright]);
  return (
    <p ref={ref} className={className} aria-label={text.replace(/\*/g, "")}>
      {text.split(" ").map((w, i) => {
        const accent = w.startsWith("*");
        return (
          <span key={i} aria-hidden="true">
            <span data-w style={{ color: dim }} className={accent ? "serif-i" : ""}>{w.replace(/\*/g, "")}</span>{" "}
          </span>
        );
      })}
    </p>
  );
}
