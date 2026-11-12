import type { ReactNode } from "react";
import PageHero from "./PageHero";
import { Reveal } from "@/components/anim/primitives";

export default function Legal({ title, intro, updated, sections }: { title: string; intro: string; updated: string; sections: { h: string; body: ReactNode }[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={intro} shape="cube" hue="#7d6ad0" crumbs={[{ label: "Home", href: "/" }, { label: title.replace(/\*/g, "") }]} />
      <section className="surface-light py-20 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow text-ink/50">Last updated</p>
              <p className="mt-2 font-medium">{updated}</p>
              <nav aria-label="On this page" className="mt-8 hidden lg:block">
                <ol className="space-y-2 text-sm text-ink/60">
                  {sections.map((s, i) => <li key={s.h}><a href={`#s-${i}`} className="link-u hover:text-ink">{s.h}</a></li>)}
                </ol>
              </nav>
            </div>
          </aside>
          <div className="space-y-12 lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <Reveal key={s.h} variant="up" as="article" className="scroll-mt-28">
                <h2 id={`s-${i}`} className="scroll-mt-28 display text-2xl md:text-3xl"><span className="mr-3 font-mono text-sm text-brand-500">{String(i + 1).padStart(2, "0")}</span>{s.h}</h2>
                <div className="mt-4 space-y-3 leading-relaxed text-ink/70 [&_a]:text-brand-600 [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">{s.body}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
