import Link from "next/link";
import ParticleCanvas from "@/components/hero/ParticleCanvas";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

export default function NotFound() {
  return (
    <section className="noise relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink pt-28">
      <div className="absolute inset-0 -z-10 opacity-80"><ParticleCanvas shape="galaxy" hue="#b9a6ff" density={0.65} links={false} /></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent,#0d0b13_75%)]" />
      <div className="container-x text-center">
        <p className="display text-[clamp(7rem,28vw,22rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(207,195,238,.55)]">404</p>
        <h1 className="mt-2 display h-md">This page drifted <span className="serif-i text-gradient">out of orbit.</span></h1>
        <p className="lead mx-auto mt-6 max-w-xl text-white/60">The page you are looking for does not exist or has moved. Let&apos;s get you back on track.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/contact/" variant="ghost">Contact us</Button>
        </div>
        <ul className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-2">
          {services.slice(0, 6).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}/`} className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm text-white/65 hover:border-brand-300 hover:text-white">{s.name}</Link></li>)}
        </ul>
      </div>
    </section>
  );
}
