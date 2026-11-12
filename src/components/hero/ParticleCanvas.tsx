"use client";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

// Lazy-load the canvas engine so it never blocks first paint.
const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function ParticleCanvas(props: ComponentProps<typeof ParticleField>) {
  return <ParticleField {...props} />;
}
