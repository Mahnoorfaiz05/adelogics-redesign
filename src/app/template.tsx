"use client";
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";

// Client-only flag: becomes true after the first hydrated mount, so the server
// render and the hydration render always match (no curtain on first load).
let hasNavigated = false;

/* Page transition: a branded curtain sweeps away on each route change. */
export default function Template({ children }: { children: ReactNode }) {
  const [skip] = useState(() => typeof window === "undefined" || !hasNavigated);
  useEffect(() => { hasNavigated = true; }, []);
  return (
    <>
      {!skip && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70] bg-ink"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.45, ease: [0.85, 0, 0.15, 1] }}
        >
          <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-gradient" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="display text-2xl tracking-tight text-white/80">Adelogix</span>
          </div>
        </motion.div>
      )}
      <motion.div
        initial={skip ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: skip ? 0 : 0.12 }}
      >
        {children}
      </motion.div>
    </>
  );
}
