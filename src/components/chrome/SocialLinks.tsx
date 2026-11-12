import { site } from "@/lib/site";
import { BrandIcon, LinkedInIcon } from "@/components/ui/Icons";

/**
 * Footer social icons. Platforms stay visible even before official profiles exist:
 * an empty URL in `site.socials` renders a clearly inactive, non-clickable icon
 * ("Profile coming soon") instead of inventing a link. Paste the official URL in
 * src/lib/site.ts or set the matching NEXT_PUBLIC_SOCIAL_* env var to activate it.
 */
const platforms = [
  { key: "linkedin", label: "LinkedIn", icon: <LinkedInIcon size={17} /> },
  { key: "facebook", label: "Facebook", icon: <BrandIcon name="siFacebook" size={17} /> },
  { key: "instagram", label: "Instagram", icon: <BrandIcon name="siInstagram" size={17} /> },
  { key: "x", label: "X", icon: <BrandIcon name="siX" size={15} /> },
  { key: "youtube", label: "YouTube", icon: <BrandIcon name="siYoutube" size={18} /> },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  const items = platforms.map((p) => ({ ...p, href: (site.socials[p.key] || "").trim() }));
  const activeCount = items.filter((i) => i.href).length;

  return (
    <div className={className}>
      <p className="eyebrow text-white/40">Follow Adelogix</p>
      <ul className="mt-4 flex flex-wrap items-center gap-2.5" aria-label="Adelogix social profiles">
        {items.map((p) =>
          p.href ? (
            <li key={p.key}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`Adelogix on ${p.label}`}
                className="group grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/75 transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-500/25 hover:text-white focus-visible:-translate-y-1">
                <span className="transition-transform duration-500 group-hover:scale-110">{p.icon}</span>
              </a>
            </li>
          ) : (
            <li key={p.key}>
              <span aria-disabled="true" title={`${p.label} — official profile coming soon`}
                className="group relative grid h-11 w-11 cursor-not-allowed place-items-center rounded-full border border-dashed border-white/15 text-white/35">
                {p.icon}
                <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 hidden -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-ink-3 px-3 py-1.5 text-[0.68rem] text-white/80 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
                  {p.label} · coming soon
                </span>
                <span className="sr-only">{p.label} — official profile coming soon</span>
              </span>
            </li>
          )
        )}
      </ul>
      <p className="mt-3 max-w-[19rem] text-[0.7rem] leading-relaxed text-white/35">
        {activeCount === 0
          ? "Official social profiles are not published yet. Icons are shown for reference and are not links."
          : `${activeCount} verified profile${activeCount > 1 ? "s" : ""} linked. Unlinked platforms are shown for reference only.`}
      </p>
    </div>
  );
}
