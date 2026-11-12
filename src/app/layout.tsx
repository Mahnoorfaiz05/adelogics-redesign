import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import Cursor from "@/components/chrome/Cursor";
import Preloader from "@/components/chrome/Preloader";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import FloatingActions from "@/components/chrome/FloatingActions";
import Consent from "@/components/chrome/Consent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"], display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", weight: "400", style: ["italic", "normal"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Adelogix | Web, Mobile & Custom Software Development", template: "%s | Adelogix" },
  description: site.description,
  applicationName: site.legalName,
  keywords: ["software development company", "web development", "mobile app development", "custom software", "UI/UX design", "SaaS development", "AI automation", "CRM development", "Adelogix"],
  icons: {
    icon: [{ url: "/assets/brand/icon-32.png", sizes: "32x32" }, { url: "/assets/brand/icon-192.png", sizes: "192x192" }],
    apple: "/assets/brand/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website", siteName: site.legalName, locale: "en_GB", url: "/",
    title: "Adelogix | Web, Mobile & Custom Software Development", description: site.description,
    images: [{ url: "/assets/case-studies/oriuspay/01-cover.png", width: 1200, height: 800, alt: "Adelogix — software development" }],
  },
  twitter: { card: "summary_large_image", title: "Adelogix | Software Development", description: site.description, images: ["/assets/case-studies/oriuspay/01-cover.png"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0d0b13", width: "device-width", initialScale: 1 };

const orgLd = {
  "@context": "https://schema.org", "@type": "Organization", name: site.legalName, url: site.url,
  logo: `${site.url}/assets/brand/adelogix-logo.png`, email: site.email, telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: "Bahawalpur", addressRegion: "Punjab", addressCountry: "PK", streetAddress: "Commercial Area" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem('adx-seen'))document.documentElement.dataset.seen='1'}catch(e){}` }} />
        <style>{`html[data-seen="1"] .preloader{display:none!important}`}</style>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
        <Consent />
      </body>
    </html>
  );
}
