import AccentText from "@/components/ui/AccentText";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";

/** A compact, server-rendered closing CTA shared by content pages. */
export default function FinalCTA({
  title = "Let's Build Something *Great Together.*",
  text = "Tell us what you are working on. We will ask the right questions and suggest a practical way forward, whether that is a full project or a short discovery phase.",
}: { title?: string; text?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink section-space">
      <div className="absolute inset-0 -z-10 grid-lines opacity-40" />
      <div className="orb -right-24 top-1/2 -z-10 h-[320px] w-[320px] -translate-y-1/2 bg-brand-600/35" />
      <div className="container-x text-center">
        <p className="eyebrow text-brand-300">Start a project</p>
        <h2 className="mx-auto mt-5 max-w-5xl display h-lg text-balance"><AccentText text={title} /></h2>
        <p className="lead mx-auto mt-6 max-w-2xl text-white/60">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/contact/" magnetic={false}>Start a project enquiry</Button>
          <Button href={whatsappLink()} external variant="ghost" magnetic={false}>Message on WhatsApp</Button>
        </div>
        <ol className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3 sm:text-center">
          {[["01", "Share a short brief", "A few sentences is enough"], ["02", "We talk it through", "By your preferred method"], ["03", "You get a clear proposal", "Scope, approach and estimate"]].map(([number, heading, detail]) => (
            <li key={number} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-mono text-xs text-brand-300">{number}</p>
              <p className="mt-2 font-medium">{heading}</p>
              <p className="mt-1 text-xs text-white/55">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
