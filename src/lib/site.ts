// Central, verified company details. Keep customer-facing contact information and
// official profile URLs in one place so every page stays in sync.
export const site = {
  name: "Adelogix",
  legalName: "Adelogix Software Technology",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.adelogix.com",
  tagline: "Software built around how your business really works.",
  description:
    "Adelogix designs and develops web platforms, mobile apps and custom business systems for startups, growing companies and established teams.",
  email: "Adelogixteam@gmail.com",
  phone: "+92 313 8711670",
  phoneHref: "tel:+923138711670",
  whatsappNumber: "923138711670",
  location: "Commercial Area, Bahawalpur, Punjab, Pakistan",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Commercial%20Area%2C%20Bahawalpur%2C%20Punjab%2C%20Pakistan",
  mapEmbed:
    "https://www.google.com/maps?q=Commercial%20Area%2C%20Bahawalpur%2C%20Punjab%2C%20Pakistan&output=embed&hl=en",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
  socials: {
    linkedin: "https://www.linkedin.com/company/adelogix-software-solutions/home/",
    facebook: "http://facebook.com/adelogix",
    instagram: "https://www.instagram.com/adelogix/",
  },
} as const;

// This is the approved click-to-chat message used by the floating control and
// every WhatsApp CTA. The Cloud API is optional; this link always works without it.
export const whatsappLink = () =>
  "https://wa.me/923138711670?text=Hello%20Adelogix%20Team!%20I%20visited%20your%20website%20and%20would%20like%20to%20discuss%20a%20project";

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/", mega: true },
  { label: "Technologies", href: "/technologies/" },
  { label: "Work", href: "/work/" },
  { label: "Contact", href: "/contact/" },
];
