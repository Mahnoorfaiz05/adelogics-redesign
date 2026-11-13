"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

/* A deliberately small desktop-only cursor enhancement. It paints only while
   the pointer is moving, instead of keeping a full-page animation loop alive. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    document.documentElement.classList.add("has-cursor");
    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const current = { ...target };
    let raf = 0;
    let shown = false;

    const setState = (state: string, text = "") => {
      if (!ring.current) return;
      ring.current.dataset.state = state;
      if (label.current) label.current.textContent = text;
    };
    const paint = () => {
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      dot.current?.style.setProperty("transform", `translate3d(${target.x}px, ${target.y}px, 0)`);
      ring.current?.style.setProperty("transform", `translate3d(${current.x}px, ${current.y}px, 0)`);
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.35) raf = requestAnimationFrame(paint);
      else raf = 0;
    };
    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!shown) {
        shown = true;
        if (ring.current) ring.current.style.opacity = "1";
        if (dot.current) dot.current.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onOver = (event: Event) => {
      const element = event.target as HTMLElement;
      const custom = element.closest<HTMLElement>("[data-cursor]");
      if (custom) {
        setState(custom.dataset.cursor!, custom.dataset.cursorLabel || (custom.dataset.cursor === "view" ? "View project" : ""));
        return;
      }
      if (element.closest("input, textarea, select")) return setState("text");
      if (element.closest("a, button, [role='button'], summary, label")) return setState("hover");
      setState("default");
    };
    const onDown = () => ring.current?.classList.add("scale-75");
    const onUp = () => ring.current?.classList.remove("scale-75");
    const onLeave = () => {
      shown = false;
      if (ring.current) ring.current.style.opacity = "0";
      if (dot.current) dot.current.style.opacity = "0";
    };

    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    addEventListener("pointerdown", onDown);
    addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (ring.current) ring.current.dataset.state = "default";
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden [@media(hover:hover)_and_(pointer:fine)]:block" aria-hidden="true">
      <style>{`
        .cur-ring{opacity:0;transition:opacity .2s}
        .cur-ring>div{width:34px;height:34px;margin:-17px 0 0 -17px;border:1px solid rgba(207,195,238,.55);border-radius:999px;display:grid;place-items:center;transition:width .32s cubic-bezier(.16,1,.3,1),height .32s cubic-bezier(.16,1,.3,1),margin .32s cubic-bezier(.16,1,.3,1),background .25s,border-color .25s}
        .cur-ring>div>span{font:600 10px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:#0d0b13;opacity:0;transition:opacity .2s;white-space:nowrap}
        .cur-ring[data-state=hover]>div{width:56px;height:56px;margin:-28px 0 0 -28px;background:rgba(167,146,216,.12);border-color:rgba(207,195,238,.9)}
        .cur-ring[data-state=view]>div,.cur-ring[data-state=drag]>div{width:88px;height:88px;margin:-44px 0 0 -44px;background:#cfc3ee;border-color:transparent}
        .cur-ring[data-state=view]>div>span,.cur-ring[data-state=drag]>div>span{opacity:1}
        .cur-ring[data-state=text]>div{width:3px;height:26px;margin:-13px 0 0 -1.5px;border-radius:2px;background:#cfc3ee;border-color:transparent}
        .cur-dot{opacity:0;transition:opacity .2s}
        .cur-dot>div{width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:999px;background:#fff;mix-blend-mode:difference}
      `}</style>
      <div ref={ring} className="cur-ring absolute left-0 top-0 transition-[scale] duration-150" data-state="default"><div><span ref={label} /></div></div>
      <div ref={dot} className="cur-dot absolute left-0 top-0"><div /></div>
    </div>
  );
}
