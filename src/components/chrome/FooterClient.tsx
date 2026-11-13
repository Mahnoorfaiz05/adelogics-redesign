"use client";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button onClick={scrollToTop} className="group inline-flex min-h-11 items-center gap-3 text-white/70 hover:text-white" aria-label="Back to top">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-300 group-hover:bg-brand-500"><ArrowUp size={16} /></span>
      <span className="link-u text-sm">Back to top</span>
    </button>
  );
}

export function CookieSettingsButton() {
  return <button className="link-u inline-flex min-h-11 items-center" onClick={() => window.dispatchEvent(new Event("adx:consent-open"))}>Cookie preferences</button>;
}
