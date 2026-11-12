"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Ready signal — resolves when the preloader has finished (or was skipped).
type W = Window & { __adxReady?: boolean; __adxCbs?: (() => void)[] };
export function onReady(cb: () => void) {
  if (typeof window === "undefined") return;
  const w = window as W;
  if (w.__adxReady) cb();
  else (w.__adxCbs ||= []).push(cb);
}
export function markReady() {
  const w = window as W;
  if (w.__adxReady) return;
  w.__adxReady = true;
  (w.__adxCbs || []).forEach((c) => c());
  w.__adxCbs = [];
}
