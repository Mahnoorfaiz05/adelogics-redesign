import ParticleCanvas from "@/components/hero/ParticleCanvas";
import { Marquee, Reveal, SplitHeading } from "@/components/anim/primitives";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";

/* Restored animated closing sequence. The canvas is dynamically imported by
   ParticleCanvas and is paused off-screen by the field implementation. */
export default function FinalCTA({
  title = "Let's Build Something *Great Together.*",
  text = "Tell us what you are working on. We will ask the right questions and suggest a practical way forward, whether that is a full project or a short discovery phase.",
}: { title?: string; text?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 md:py-32">
      <div className="absolute inset-0 -z-10 opacity-80"><ParticleCanvas shape="galaxy" hue="#b9a6ff" density={0.65} links={false} /></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0d0b13_72%)]" />
      <Marquee speed={60} className="pointer-events-none absolute top-10 -z-10 opacity-[0.05]">
        {["Discover", "Plan", "Build", "Launch", "Support"].map((word) => <span key={word} className="display px-8 text-[9rem] leading-none">{word} ✦</span>)}
      </Marquee>
      <div className="container-x text-center">
        <Reveal variant="clip-up"><p className="eyebrow text-brand-300">Start a project</p></Reveal>
        <SplitHeading text={title} className="mx-auto mt-6 max-w-5xl display h-lg text-balance" />
        <Reveal variant="blur" delay={0.3}><p className="lead mx-auto mt-8 max-w-2xl text-white/60">{text}</p></Reveal>
        <Reveal variant="up" delay={0.45} className="mt-12 flex flex-wrap justify-center gap-3">
          <Button href="/contact/">Start a project enquiry</Button>
          <Button href={whatsappLink()} external variant="ghost" icon={<WhatsAppIcon size={15} />}>Message on WhatsApp</Button>
        </Reveal>
        <Reveal stagger={0.1} variant="up" className="mx-auto mt-16 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
          {[["Share a short brief", "A few sentences is enough"], ["We talk it through", "By your preferred method"], ["You get a clear proposal", "Scope, approach and estimate"]].map(([heading, detail], index) => (
            <div key={heading} className="glass rounded-2xl p-5">
              <span className="font-mono text-xs text-brand-300">0{index + 1}</span>
              <p className="mt-3 font-medium">{heading}</p>
              <p className="text-sm text-white/50">{detail}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
