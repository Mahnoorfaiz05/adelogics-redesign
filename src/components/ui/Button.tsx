import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/anim/primitives";

type Props = { href: string; children: ReactNode; variant?: "primary" | "ghost" | "light" | "dark"; external?: boolean; className?: string; icon?: ReactNode; magnetic?: boolean };

const styles = {
  primary: "bg-brand-gradient text-white shadow-[0_10px_40px_-10px_rgba(123,73,158,.8)]",
  ghost: "border border-white/20 text-ivory hover:border-white/50",
  light: "bg-ivory text-ink",
  dark: "bg-ink text-ivory",
};

export function Button({ href, children, variant = "primary", external, className = "", icon, magnetic = true }: Props) {
  const inner = (
    <>
      <span className="absolute inset-0 -z-0 translate-y-full rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0" />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-white/15">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-7">
          <span className="grid h-7 w-7 place-items-center">{icon ?? <ArrowUpRight size={15} />}</span>
          <span className="grid h-7 w-7 place-items-center">{icon ?? <ArrowUpRight size={15} />}</span>
        </span>
      </span>
    </>
  );
  const cls = `group relative isolate inline-flex h-13 items-center gap-3 overflow-hidden rounded-full py-3 pl-6 pr-3 text-[0.95rem] font-medium transition-colors ${styles[variant]} ${className}`;
  const el = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
  return magnetic ? <Magnetic strength={0.25}>{el}</Magnetic> : el;
}

export function Eyebrow({ children, className = "", num }: { children: ReactNode; className?: string; num?: string }) {
  return (
    <p className={`eyebrow inline-flex items-center gap-3 ${className}`}>
      {num && <span className="text-brand-300">{num}</span>}
      <span className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}
