"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

const KEY = "adelogix-consent";
type W = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; __gaLoaded?: boolean };

function loadGA() {
  const windowWithAnalytics = window as W;
  if (!site.ga4Id || windowWithAnalytics.__gaLoaded) return;
  windowWithAnalytics.__gaLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(site.ga4Id)}`;
  document.head.appendChild(script);
  windowWithAnalytics.dataLayer = windowWithAnalytics.dataLayer || [];
  windowWithAnalytics.gtag = function () { (windowWithAnalytics.dataLayer as unknown[]).push(arguments); };
  windowWithAnalytics.gtag("js", new Date());
  windowWithAnalytics.gtag("config", site.ga4Id, { anonymize_ip: true });
}

export default function Consent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let value: string | null = null;
    try { value = localStorage.getItem(KEY); } catch {}
    if (value === "granted") loadGA();
    if (!value && site.ga4Id) {
      const timer = setTimeout(() => setOpen(true), 3500);
      return () => clearTimeout(timer);
    }
  }, []);
  useEffect(() => {
    const show = () => setOpen(true);
    addEventListener("adx:consent-open", show);
    return () => removeEventListener("adx:consent-open", show);
  }, []);
  const choose = (value: "granted" | "denied") => {
    try { localStorage.setItem(KEY, value); } catch {}
    if (value === "granted") loadGA();
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div role="dialog" aria-label="Cookie preferences" className="fixed bottom-4 left-4 z-[44] w-[calc(100vw-110px)] max-w-sm rounded-3xl border border-white/10 bg-ink-2/90 p-5 text-sm shadow-2xl md:bottom-6 md:left-6">
      <p className="font-medium">Cookie preferences</p>
      <p className="mt-2 text-white/60">The site works without cookies. With your consent we may use analytics cookies to understand how the site is used. <Link href="/privacy-policy/" className="underline">Privacy Policy</Link></p>
      <div className="mt-4 flex flex-wrap gap-2"><button onClick={() => choose("granted")} className="rounded-full bg-brand-gradient px-4 py-2 font-medium">Accept analytics</button><button onClick={() => choose("denied")} className="rounded-full border border-white/20 px-4 py-2">Essential only</button></div>
    </div>
  );
}
