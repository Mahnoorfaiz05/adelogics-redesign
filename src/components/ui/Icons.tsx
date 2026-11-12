import {
  Globe, Smartphone, Boxes, PenTool, Layers, Sparkles, Users, Database, LayoutTemplate, ServerCog, Rocket, Cloud,
  HeartPulse, GraduationCap, ShoppingBag, Landmark, Building2, Plane, Car, MonitorSmartphone, Server, type LucideIcon,
} from "lucide-react";
import { siWordpress, siWoocommerce, siApple, siAndroid, siFigma, siGooglecloud, siStripe, siPaypal, siWhatsapp, siInstagram, siFacebook, siX } from "simple-icons";

const si = { siWordpress, siWoocommerce, siApple, siAndroid, siFigma, siGooglecloud, siStripe, siPaypal, siWhatsapp, siInstagram, siFacebook, siX };

const lucideMap: Record<string, LucideIcon> = {
  Globe, Smartphone, Boxes, PenTool, Layers, Sparkles, Users, Database, LayoutTemplate, ServerCog, Rocket, Cloud,
  HeartPulse, GraduationCap, ShoppingBag, Landmark, Building2, Plane, Car, MonitorSmartphone, Server,
};

export function LIcon({ name, size = 22, className = "", strokeWidth = 1.5 }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  const C = lucideMap[name] ?? Sparkles;
  return <C size={size} className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

type SimpleIcon = { path: string; hex: string; title: string };
export function BrandIcon({ name, size = 22, className = "", color }: { name: string; size?: number; className?: string; color?: string }) {
  const icon = (si as unknown as Record<string, SimpleIcon>)[name];
  if (!icon) return null;
  return (
    <svg role="img" aria-label={icon.title} viewBox="0 0 24 24" width={size} height={size} className={className} fill={color ?? "currentColor"}>
      <path d={icon.path} />
    </svg>
  );
}

export function TechMark({ icon, mono, size = 22, className = "" }: { icon?: string; mono?: string; size?: number; className?: string }) {
  if (icon) return <BrandIcon name={icon} size={size} className={className} />;
  return <span className={`font-mono text-[0.7rem] font-semibold tracking-wider ${className}`}>{mono}</span>;
}

export function WhatsAppIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <BrandIcon name="siWhatsapp" size={size} className={className} />;
}

export function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
