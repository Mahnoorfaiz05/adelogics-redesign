"use client";
import { useEffect, useRef } from "react";
import type { HeroShape } from "@/data/services";

type P = { x: number; y: number; z: number; s: number };

function build(shape: HeroShape, n: number): P[] {
  const pts: P[] = [];
  const rnd = () => Math.random() * 2 - 1;
  switch (shape) {
    case "sphere": {
      const ga = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), t = ga * i;
        pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r, s: Math.random() });
      }
      break;
    }
    case "helix": {
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 6, strand = i % 2 ? Math.PI : 0;
        pts.push({ x: Math.cos(t + strand) * 0.55, y: (i / n) * 2.4 - 1.2, z: Math.sin(t + strand) * 0.55, s: Math.random() });
      }
      break;
    }
    case "grid":
    case "wave": {
      const side = Math.round(Math.sqrt(n));
      for (let i = 0; i < side; i++) for (let j = 0; j < side; j++)
        pts.push({ x: (i / (side - 1)) * 2.6 - 1.3, y: 0, z: (j / (side - 1)) * 2.6 - 1.3, s: Math.random() });
      break;
    }
    case "rings": {
      const rings = 4;
      for (let i = 0; i < n; i++) {
        const ring = i % rings, t = (i / n) * Math.PI * 2 * rings + ring;
        const r = 0.45 + ring * 0.2, tilt = ring * 0.7;
        const x = Math.cos(t) * r, z = Math.sin(t) * r;
        pts.push({ x, y: z * Math.sin(tilt), z: z * Math.cos(tilt), s: Math.random() });
      }
      break;
    }
    case "cube": {
      const side = Math.max(3, Math.round(Math.cbrt(n)));
      for (let i = 0; i < side; i++) for (let j = 0; j < side; j++) for (let k = 0; k < side; k++)
        pts.push({ x: (i / (side - 1)) * 1.4 - 0.7, y: (j / (side - 1)) * 1.4 - 0.7, z: (k / (side - 1)) * 1.4 - 0.7, s: Math.random() });
      break;
    }
    case "torus": {
      for (let i = 0; i < n; i++) {
        const u = Math.random() * Math.PI * 2, v = Math.random() * Math.PI * 2, R = 0.75, r = 0.3;
        pts.push({ x: (R + r * Math.cos(v)) * Math.cos(u), y: r * Math.sin(v), z: (R + r * Math.cos(v)) * Math.sin(u), s: Math.random() });
      }
      break;
    }
    case "galaxy": {
      for (let i = 0; i < n; i++) {
        const arm = i % 3, d = Math.pow(Math.random(), 0.7), t = d * 5 + (arm * Math.PI * 2) / 3;
        pts.push({ x: Math.cos(t) * d * 1.2 + rnd() * 0.06, y: rnd() * 0.08 * (1 - d), z: Math.sin(t) * d * 1.2 + rnd() * 0.06, s: Math.random() });
      }
      break;
    }
  }
  return pts;
}

export default function ParticleField({
  shape = "sphere", className = "", density = 1, hue = "#a792d8", links = true, scale = 1, offsetX = 0,
}: { shape?: HeroShape; className?: string; density?: number; hue?: string; links?: boolean; scale?: number; offsetX?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    // The previous particle counts plus an O(n²) link pass were expensive on
    // mid-range phones. Keep the visual depth while using a smaller, capped scene.
    const base = shape === "cube" ? 150 : shape === "grid" || shape === "wave" ? 180 : 160;
    const count = Math.max(48, Math.round(base * density * (mobile ? 0.55 : 1)));
    const drawLinks = links && !mobile;
    const frameInterval = mobile ? 33 : 22;
    const pts = build(shape, count);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, raf = 0, visible = true, t = 0, lastDraw = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, sx: -9999, sy: -9999 };
    const rgb = hexToRgb(hue);

    const resize = () => {
      const r = canvas.getBoundingClientRect(); w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !reduced) raf = requestAnimationFrame(loop);
    }, { threshold: 0 });
    io.observe(canvas);
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2; mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      mouse.sx = e.clientX - r.left; mouse.sy = e.clientY - r.top;
    };
    if (finePointer) window.addEventListener("pointermove", onMove, { passive: true });

    const proj = new Float32Array(pts.length * 3);
    const linkDist = shape === "cube" ? 0.32 : shape === "grid" || shape === "wave" ? 0.2 : shape === "helix" ? 0.36 : 0.3;

    function frame() {
      t += 0.0055;
      mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx!.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.42 * scale;
      const cx = w / 2 + offsetX * w, cy = h / 2;
      const flat = shape === "grid" || shape === "wave";
      const ay = t * (flat ? 0.15 : 0.6) + mouse.x * 0.6;
      const ax = (flat ? 0.95 : 0.25) + mouse.y * 0.35;
      const cyA = Math.cos(ay), syA = Math.sin(ay), cxA = Math.cos(ax), sxA = Math.sin(ax);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        let x = p.x, y = p.y, z = p.z;
        if (flat) y = Math.sin(x * 2.4 + t * 3) * 0.16 + Math.cos(z * 2.2 + t * 2) * 0.14;
        else { const b = 1 + Math.sin(t * 2 + p.s * 6) * 0.025; x *= b; y *= b; z *= b; }
        const x1 = x * cyA - z * syA, z1 = x * syA + z * cyA;
        const y2 = y * cxA - z1 * sxA, z2 = y * sxA + z1 * cxA;
        const f = 2.6 / (2.6 + z2);
        let sx = cx + x1 * R * f, sy = cy + y2 * R * f;
        const dx = sx - mouse.sx, dy = sy - mouse.sy, d2 = dx * dx + dy * dy;
        if (d2 < 14000) { const k = (1 - d2 / 14000) * 18; const d = Math.sqrt(d2) || 1; sx += (dx / d) * k; sy += (dy / d) * k; }
        proj[i * 3] = sx; proj[i * 3 + 1] = sy; proj[i * 3 + 2] = z2;
      }
      if (drawLinks) {
        ctx!.lineWidth = 0.6;
        const ld2 = linkDist * linkDist;
        for (let i = 0; i < pts.length; i++) {
          const a = pts[i];
          for (let j = i + 1; j < pts.length; j++) {
            const b = pts[j];
            const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z, d = dx * dx + dy * dy + dz * dz;
            if (d < ld2) {
              const depth = (2 - (proj[i * 3 + 2] + proj[j * 3 + 2]) / 2) / 3;
              ctx!.strokeStyle = `rgba(${rgb},${(1 - d / ld2) * 0.28 * depth})`;
              ctx!.beginPath(); ctx!.moveTo(proj[i * 3], proj[i * 3 + 1]); ctx!.lineTo(proj[j * 3], proj[j * 3 + 1]); ctx!.stroke();
            }
          }
        }
      }
      for (let i = 0; i < pts.length; i++) {
        const z = proj[i * 3 + 2], depth = Math.max(0.12, (1.4 - z) / 2.4);
        const size = (0.7 + pts[i].s * 1.5) * (2.6 / (2.6 + z));
        const dx = proj[i * 3] - mouse.sx, dy = proj[i * 3 + 1] - mouse.sy;
        const near = dx * dx + dy * dy < 9000;
        ctx!.fillStyle = near ? `rgba(255,255,255,${Math.min(1, depth + 0.3)})` : `rgba(${rgb},${depth})`;
        ctx!.beginPath(); ctx!.arc(proj[i * 3], proj[i * 3 + 1], near ? size * 1.6 : size, 0, Math.PI * 2); ctx!.fill();
      }
    }
    function loop(now: number) {
      if (!visible || document.hidden) { raf = 0; return; }
      if (!lastDraw || now - lastDraw >= frameInterval) {
        frame();
        lastDraw = now;
      }
      raf = requestAnimationFrame(loop);
    }
    const onVis = () => {
      if (!document.hidden && visible && !raf && !reduced) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);
    if (reduced) frame(); else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      if (finePointer) window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [shape, density, hue, links, scale, offsetX]);

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}

function hexToRgb(hex: string) {
  const m = hex.replace("#", "");
  const n = parseInt(m.length === 3 ? m.split("").map((c) => c + c).join("") : m, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}
