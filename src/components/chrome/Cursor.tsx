"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

/* Custom cursor: precise dot + lagging ring + subtle trail.
   States: hover (links/buttons), view (data-cursor="view"), text (inputs), hidden.
   Disabled automatically on touch / coarse pointers. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const trail = useRef<HTMLDivElement[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    document.documentElement.classList.add("has-cursor");
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const r = { x: pos.x, y: pos.y };
    const tr = trail.current.map(() => ({ x: pos.x, y: pos.y }));
    let raf = 0, shown = false;

    const setState = (state: string, text = "") => {
      const el = ring.current; if (!el) return;
      el.dataset.state = state;
      if (label.current) label.current.textContent = text;
    };
    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      if (!shown) { shown = true; ring.current!.style.opacity = "1"; dot.current!.style.opacity = "1"; }
    };
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      const c = t.closest<HTMLElement>("[data-cursor]");
      if (c) { setState(c.dataset.cursor!, c.dataset.cursorLabel || (c.dataset.cursor === "view" ? "View Project" : "")); return; }
      if (t.closest("input, textarea, select")) return setState("text");
      if (t.closest("a, button, [role='button'], summary, label")) return setState("hover");
      setState("default");
    };
    const onDown = () => ring.current?.classList.add("scale-75");
    const onUp = () => ring.current?.classList.remove("scale-75");
    const onLeave = () => { shown = false; ring.current!.style.opacity = "0"; dot.current!.style.opacity = "0"; };

    const loop = () => {
      r.x += (pos.x - r.x) * 0.16; r.y += (pos.y - r.y) * 0.16;
      dot.current!.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      ring.current!.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
      let px = pos.x, py = pos.y;
      tr.forEach((p, i) => {
        p.x += (px - p.x) * (0.35 - i * 0.04); p.y += (py - p.y) * (0.35 - i * 0.04);
        const el = trail.current[i]; if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        px = p.x; py = p.y;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    addEventListener("pointerdown", onDown); addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      removeEventListener("pointermove", onMove); document.removeEventListener("pointerover", onOver);
      removeEventListener("pointerdown", onDown); removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => { if (ring.current) ring.current.dataset.state = "default"; }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden [@media(hover:hover)_and_(pointer:fine)]:block" aria-hidden="true">
      <style>{`
        .cur-ring{opacity:0;transition:opacity .3s}
        .cur-ring>div{width:38px;height:38px;margin:-19px 0 0 -19px;border:1px solid rgba(207,195,238,.55);border-radius:999px;display:grid;place-items:center;transition:width .45s cubic-bezier(.16,1,.3,1),height .45s cubic-bezier(.16,1,.3,1),margin .45s cubic-bezier(.16,1,.3,1),background .35s,border-color .35s}
        .cur-ring>div>span{font:600 11px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:#0d0b13;opacity:0;transition:opacity .25s;white-space:nowrap}
        .cur-ring[data-state=hover]>div{width:64px;height:64px;margin:-32px 0 0 -32px;background:rgba(167,146,216,.12);border-color:rgba(207,195,238,.9)}
        .cur-ring[data-state=view]>div,.cur-ring[data-state=drag]>div{width:104px;height:104px;margin:-52px 0 0 -52px;background:#cfc3ee;border-color:transparent}
        .cur-ring[data-state=view]>div>span,.cur-ring[data-state=drag]>div>span{opacity:1}
        .cur-ring[data-state=text]>div{width:3px;height:30px;margin:-15px 0 0 -1.5px;border-radius:2px;background:#cfc3ee;border-color:transparent}
        .cur-ring[data-state=hide]>div{width:0;height:0;margin:0;border-color:transparent}
        .cur-dot{opacity:0;transition:opacity .3s}
        .cur-dot>div{width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:999px;background:#fff;mix-blend-mode:difference}
      `}</style>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} ref={(el) => { if (el) trail.current[i] = el; }} className="absolute left-0 top-0">
          <div className="rounded-full bg-brand-300" style={{ width: 4 - i * 0.6, height: 4 - i * 0.6, opacity: 0.35 - i * 0.06, margin: `-${(4 - i * 0.6) / 2}px 0 0 -${(4 - i * 0.6) / 2}px` }} />
        </div>
      ))}
      <div ref={ring} className="cur-ring absolute left-0 top-0 transition-[scale] duration-200" data-state="default"><div><span ref={label} /></div></div>
      <div ref={dot} className="cur-dot absolute left-0 top-0"><div /></div>
    </div>
  );
}
