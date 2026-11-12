// Central, verified company details. Values here come from the existing
// Adelogix website (adelogics.vercel.app). Do not add unverified details.
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
  // Existing working email integration (FormSubmit) used by the original site.
  formEndpoint: "https://formsubmit.co/Adelogixteam@gmail.com",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
  // Social profiles: only add URLs for verified official profiles.
  // Icons render automatically once a URL is provided.
  socials: {
    linkedin: "",
    instagram: "",
    facebook: "",
    x: "",
  } as Record<string, string>,
};

export const whatsappLink = (message = "Hello Adelogix, I would like to discuss a project.") =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/", mega: true },
  { label: "Technologies", href: "/technologies/" },
  { label: "Work", href: "/work/" },
  { label: "Contact", href: "/contact/" },
];
