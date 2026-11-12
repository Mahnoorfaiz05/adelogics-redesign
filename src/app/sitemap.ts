import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");
  const pages = ["/", "/about/", "/services/", "/technologies/", "/work/", "/contact/", "/privacy-policy/", "/terms/"];
  return [
    ...pages.map((p) => ({ url: base + p, lastModified: now, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}/`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
