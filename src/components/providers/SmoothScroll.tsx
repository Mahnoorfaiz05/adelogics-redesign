"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { registerGsap, prefersReducedMotion } from "@/lib/motion";

type W = Window & { __lenis?: Lenis };

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Native scrolling is quicker and more predictable on touch devices. Lenis
    // is fetched only for a fine-pointer desktop where it adds real value.
    const desktopPointer = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion() || !desktopPointer) return;

    let cancelled = false;
    let cleanup = () => {};
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const { gsap, ScrollTrigger } = registerGsap();
      const lenis = new Lenis({ duration: 0.9, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      (window as W).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const onClick = (event: MouseEvent) => {
        const anchor = (event.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
        if (!anchor) return;
        const id = anchor.getAttribute("href")!;
        if (id.length < 2) return;
        const element = document.querySelector(id);
        if (element) { event.preventDefault(); lenis.scrollTo(element as HTMLElement, { offset: -80 }); }
      };
      document.addEventListener("click", onClick);
      cleanup = () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
        delete (window as W).__lenis;
      };
    });

    return () => { cancelled = true; cleanup(); };
  }, []);

  // Reset scroll on every route. ScrollTrigger only needs a refresh for the
  // desktop effects that use it; skipping it on touch avoids needless work.
  useEffect(() => {
    const w = window as W;
    if (!window.location.hash) {
      if (w.__lenis) w.__lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    }
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    const { ScrollTrigger } = registerGsap();
    const timer = setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export function scrollToTop() {
  const w = window as W;
  if (w.__lenis) w.__lenis.scrollTo(0, { duration: 0.75 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
