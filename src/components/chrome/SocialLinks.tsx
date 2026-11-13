import { site } from "@/lib/site";
import { BrandIcon, LinkedInIcon } from "@/components/ui/Icons";

const platforms = [
  { key: "linkedin", label: "LinkedIn", href: site.socials.linkedin, icon: <LinkedInIcon size={17} /> },
  { key: "facebook", label: "Facebook", href: site.socials.facebook, icon: <BrandIcon name="siFacebook" size={17} /> },
  { key: "instagram", label: "Instagram", href: site.socials.instagram, icon: <BrandIcon name="siInstagram" size={17} /> },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow text-white/40">Follow Adelogix</p>
      <ul className="mt-4 flex flex-wrap items-center gap-2.5" aria-label="Adelogix social profiles">
        {platforms.map((p) => (
          <li key={p.key}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Adelogix on ${p.label}`}
              className="group grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/75 transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-500/25 hover:text-white focus-visible:-translate-y-1"
            >
              <span className="transition-transform duration-500 group-hover:scale-110">{p.icon}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 max-w-[19rem] text-[0.7rem] leading-relaxed text-white/35">Official LinkedIn, Facebook and Instagram profiles.</p>
    </div>
  );
}
