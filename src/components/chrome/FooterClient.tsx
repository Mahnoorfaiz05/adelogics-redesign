"use client";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/components/providers/SmoothScroll";
import { Magnetic } from "@/components/anim/primitives";

export function BackToTop() {
  return (
    <Magnetic>
      <button onClick={scrollToTop} className="group inline-flex items-center gap-3 text-white/70 hover:text-white" aria-label="Back to top">
        Back to top
        <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-white/20 transition-colors group-hover:border-brand-300 group-hover:bg-brand-500/20">
          <ArrowUp size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
        </span>
      </button>
    </Magnetic>
  );
}

export function CookieSettingsButton() {
  return (
    <button className="link-u" onClick={() => window.dispatchEvent(new Event("adx:consent-open"))}>Cookie preferences</button>
  );
}
