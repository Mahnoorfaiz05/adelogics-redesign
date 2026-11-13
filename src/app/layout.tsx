import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import FloatingActions from "@/components/chrome/FloatingActions";
import Consent from "@/components/chrome/Consent";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Adelogix | Web, Mobile & Custom Software Development", template: "%s | Adelogix" },
  description: site.description,
  applicationName: site.legalName,
  keywords: ["software development company", "web development", "mobile app development", "custom software", "UI/UX design", "SaaS development", "AI automation", "CRM development", "Adelogix"],
  icons: {
    icon: [{ url: "/images/brand/icon-32.png", sizes: "32x32" }, { url: "/images/brand/icon-192.png", sizes: "192x192" }],
    apple: "/images/brand/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website", siteName: site.legalName, locale: "en_GB", url: "/",
    title: "Adelogix | Web, Mobile & Custom Software Development", description: site.description,
    images: [{ url: "/images/case-studies/oriuspay/01-cover.webp", width: 1200, height: 800, alt: "Adelogix — software development" }],
  },
  twitter: { card: "summary_large_image", title: "Adelogix | Software Development", description: site.description, images: ["/images/case-studies/oriuspay/01-cover.webp"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0d0b13", width: "device-width", initialScale: 1 };

const orgLd = {
  "@context": "https://schema.org", "@type": "Organization", name: site.legalName, url: site.url,
  logo: `${site.url}/images/brand/adelogix-logo-original.png`, email: site.email, telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: "Bahawalpur", addressRegion: "Punjab", addressCountry: "PK", streetAddress: "Commercial Area" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </head>
      <body>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
        <Consent />
      </body>
    </html>
  );
}
