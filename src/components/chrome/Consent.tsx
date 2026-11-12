"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";

const KEY = "adelogix-consent"; // same storage key as the original site
type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; __gaLoaded?: boolean };

function loadGA() {
  const w = window as W;
  if (!site.ga4Id || w.__gaLoaded) return;
  w.__gaLoaded = true;
  const s = document.createElement("script");
  s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(site.ga4Id)}`;
  document.head.appendChild(s);
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () { (w.dataLayer as unknown[]).push(arguments); };
  w.gtag("js", new Date()); w.gtag("config", site.ga4Id, { anonymize_ip: true });
}

export default function Consent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let v: string | null = null;
    try { v = localStorage.getItem(KEY); } catch {}
    if (v === "granted") loadGA();
    if (!v && site.ga4Id) { const t = setTimeout(() => setOpen(true), 3500); return () => clearTimeout(t); }
  }, []);
  useEffect(() => {
    const h = () => setOpen(true);
    addEventListener("adx:consent-open", h);
    return () => removeEventListener("adx:consent-open", h);
  }, []);
  const choose = (v: "granted" | "denied") => {
    try { localStorage.setItem(KEY, v); } catch {}
    if (v === "granted") loadGA();
    setOpen(false);
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog" aria-label="Cookie preferences"
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 z-[44] border border-white/10 bg-ink-2 w-[calc(100vw-110px)] max-w-sm rounded-3xl bg-ink-2/90 p-5 text-sm shadow-2xl md:bottom-6 md:left-6"
        >
          <p className="font-medium">Cookie preferences</p>
          <p className="mt-2 text-white/60">The site works without cookies. With your consent we may use analytics cookies to understand how the site is used. <Link href="/privacy-policy/" className="underline">Privacy Policy</Link></p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => choose("granted")} className="rounded-full bg-brand-gradient px-4 py-2 font-medium">Accept analytics</button>
            <button onClick={() => choose("denied")} className="rounded-full border border-white/20 px-4 py-2">Essential only</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
