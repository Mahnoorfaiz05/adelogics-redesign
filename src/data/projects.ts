// Case studies — content taken from the existing Adelogix case study pages.
// No metrics or client results have been added beyond what those pages state.
export type Project = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  category: string;
  filter: "Mobile" | "Web" | "FinTech" | "Design";
  industry: string;
  year: string;
  summary: string;
  services: string[];
  tech: string[];
  overview: string;
  context: string;
  challenge: string;
  solution: string;
  features: string[];
  goals: string[];
  color: string;
  cover: string;
  gallery: { src: string; alt: string }[];
};

const g = (slug: string, files: string[], name: string) =>
  files.map((f) => ({
    src: `/images/case-studies/${slug}/${f}.webp`,
    alt: `${name} — ${f.replace(/^\d+-/, "").replace(/-/g, " ")} (case study visual)`,
  }));

export const projects: Project[] = [
  {
    slug: "uplift-ai",
    name: "Uplift.ai",
    tagline: "An AI fitness coach that asks before it advises.",
    intro: "Uplift.ai brings workouts, meal logging with AI Scan, activity tracking and a chat coach into one clean mobile app.",
    category: "Mobile app",
    filter: "Mobile",
    industry: "Health & Fitness",
    year: "2023",
    summary: "AI fitness app combining training, meals and daily health tracking with an AI coach, designed, developed and deployed by Adelogix in 2023.",
    services: ["mobile-app-development", "ui-ux-design", "product-development"],
    tech: ["Figma", "iOS", "Android"],
    overview: "Uplift.ai is a mobile fitness app that combines training, meals and daily health tracking with an AI coach. Adelogix Software Technology designed, developed and deployed it for a client in 2023, over about three to four months.",
    context: "A fitness app needing to display calories, macros, workouts, activity and AI coaching on one small screen without overwhelming users.",
    challenge: "The hard part was fitting five kinds of data on one small screen: calories, macros, workouts, activity and an AI coach, each with its own numbers and inputs.",
    solution: "We used a small set of repeated patterns: one large figure leads every data screen, one question per step in a six-step assessment, and one list row used across the app for notifications, search and settings.",
    features: ["Six-step fitness assessment", "AI Scan for meal logging from photos", "Chat with an AI coach", "Guided workouts", "Activity tracking", "Design system with colour, type and effect styles"],
    goals: ["Display five types of health data clearly on one small screen", "Create repeatable design patterns across all data screens", "Launch from first screens to live app in about 3–4 months"],
    color: "#6d4bd8",
    cover: "/images/case-studies/uplift-ai/01-introduction.webp",
    gallery: g("uplift-ai", ["02-overview", "03-challenge-and-solution", "04-key-features", "05-design-system", "06-ui-screens", "07-user-flow", "08-our-process", "09-final-showcase"], "Uplift.ai"),
  },
  {
    slug: "fast-vpn",
    name: "Fast VPN",
    tagline: "Private browsing, one tap away.",
    intro: "Fast VPN connects people to a secure server in a single tap, with clear proof of protection after connecting.",
    category: "Mobile app",
    filter: "Mobile",
    industry: "Security",
    year: "2025",
    summary: "iOS VPN app connecting users to a secure server in a single tap, designed, developed and delivered by Adelogix in 2025.",
    services: ["mobile-app-development", "ui-ux-design", "product-development"],
    tech: ["Figma", "iOS"],
    overview: "Fast VPN is an iOS app that connects users to a secure server in a single tap. Adelogix Software Technology designed, developed and delivered the complete project in 2025, over about 2–2.5 months.",
    context: "VPN apps often feel technical. Servers, protocols, security settings and subscriptions compete for attention, but users need one clear answer fast: am I protected right now?",
    challenge: "Make a VPN app feel simple and non-technical while still providing all the security features users expect.",
    solution: "Built around one large connect button with clear proof after connecting: session timer, IP address and live download and upload speeds. Everything else sits one step away from the home screen.",
    features: ["One-tap connect with live session timer and IP address", "Server locations with Free and Premium tabs, search and signal strength", "Built-in speed test: download, upload, ping, jitter, packet loss, charts and history", "Premium plans from 1 month to 2 years", "PayPal, Google Pay, Apple Pay and card payments", "Face ID, Touch ID and PIN security", "Full light and dark mode across 193 screens"],
    goals: ["Give users one clear answer: am I protected right now?", "Keep all 193 screens consistent across light and dark mode with one design system", "Deliver from first idea to final app in about 2–2.5 months"],
    color: "#2f6bd6",
    cover: "/images/case-studies/fast-vpn/01-introduction.webp",
    gallery: g("fast-vpn", ["02-overview", "03-challenge-and-solution", "04-key-features", "05-design-system", "06-ui-screens", "07-user-flow", "08-process", "09-final-showcase"], "Fast VPN"),
  },
  {
    slug: "emyy",
    name: "Emyy",
    tagline: "One app to hire local freelancers, or become one.",
    intro: "Emyy is a local services marketplace with two sides in one app. Customers find and hire local freelancers. Freelancers get requests, manage bookings and track earnings.",
    category: "Marketplace app",
    filter: "Mobile",
    industry: "Local Services",
    year: "2026",
    summary: "Local services marketplace connecting customers with local freelancers, with mobile app and website developed by Adelogix, delivered February 2026.",
    services: ["web-development", "mobile-app-development", "product-development"],
    tech: ["Figma", "Stripe"],
    overview: "Emyy is a local services marketplace that connects customers with local freelancers for everyday services. Adelogix Software Technology developed the mobile app and the website, delivered in February 2026.",
    context: "Finding a local baker, dog walker or cleaner should not feel like a job of its own. Users needed one app to search, request quotes, chat, book and pay.",
    challenge: "Two very different users sharing the same quotes, chats and bookings, with both seeing the same status in real time.",
    solution: "A two-sided marketplace where one account can switch between customer and freelancer roles, with real-time booking states, Stripe payments and a freelancer workspace.",
    features: ["Search freelancers by category, rating and rate", "Request one quote or Multiquote to several freelancers at once", "Chat with text, voice notes and photos", "Confirm and pay through Stripe", "Clear booking states including extra-time requests", "Freelancer workspace for performance, earnings, availability and reviews", "Website with search, categories, freelancer lists and profiles"],
    goals: ["Deliver mobile app and website with 57 mobile screens and 6 web pages", "Support two user roles in one account with real-time status sync", "Launch in February 2026"],
    color: "#e2733b",
    cover: "/images/case-studies/emyy/01-hero.webp",
    gallery: g("emyy", ["02-overview", "03-key-features", "04-brand", "05-roles", "06-quotes", "07-chat-and-booking", "08-freelancers", "09-user-flow", "10-website", "11-web-pages", "12-components", "13-closing"], "Emyy"),
  },
  {
    slug: "oriuspay",
    name: "OriusPay",
    tagline: "Payments, payouts, compliance and an AI assistant, in one web app.",
    intro: "OriusPay is a merchant finance dashboard that helps merchants act on their money, not just see it.",
    category: "Finance dashboard",
    filter: "FinTech",
    industry: "FinTech",
    year: "2026",
    summary: "Merchant finance dashboard designed and developed end to end by Adelogix in 2026, with 17 modules on one sidebar.",
    services: ["web-development", "custom-software-development", "ui-ux-design", "product-development"],
    tech: ["Figma"],
    overview: "OriusPay is a finance dashboard for merchants. Merchants follow revenue and transactions, handle refunds and disputes, request payouts, file VAT documents, track costs and manage stores. Horus, an AI assistant, is available on every screen. Adelogix handled UI/UX design and development end to end.",
    context: "Most merchant dashboards show you the money. Very few help you act on it. Merchants needed one place for payments, payouts, VAT compliance and security.",
    challenge: "Create a finance dashboard where merchants can act on their data, not just view it, with 17 modules accessible from one sidebar.",
    solution: "An action-first dashboard with KPI cards, cash flow, transaction pipeline, Horus AI assistant, Quick Actions for payment links and QR codes, and side drawers for every record.",
    features: ["Action-first dashboard with eight KPI cards, cash flow and transaction pipeline", "Horus AI assistant with ready prompts", "Quick Actions: payment links, QR codes, data exports", "Money flows: transactions, refunds, chargebacks, disputes and payouts", "VAT documents with clear review status", "Roles and permissions", "MFA with ten recovery codes and trusted-device limit", "Designed loading, empty, success and error states on every screen"],
    goals: ["Design and develop 17 modules on one sidebar", "Create one design system built on Outfit and a ten-step colour scale", "Complete 7-step process from discovery to launch"],
    color: "#1d2a8a",
    cover: "/images/case-studies/oriuspay/01-cover.webp",
    gallery: g("oriuspay", ["02-overview", "03-our-process", "04-information-architecture", "05-dashboard", "06-horus-ai-and-quick-actions", "07-money-flows", "08-compliance-and-control", "09-secure-access", "10-states-and-feedback", "11-design-system", "12-closing"], "OriusPay"),
  },
  {
    slug: "trunext",
    name: "TruNext",
    tagline: "Crypto, but finally easy to read.",
    intro: "TruNext is a crypto investment platform where investors always know where their money is and what happens next.",
    category: "Crypto investment platform",
    filter: "Design",
    industry: "FinTech",
    year: "2026",
    summary: "Crypto investment platform built around GNSE gold-backed token. UI/UX design by Adelogix across web app, mobile app and admin panel.",
    services: ["ui-ux-design"],
    tech: ["Figma"],
    overview: "TruNext is a crypto investment platform built around GNSE, its gold-backed token. Investors choose an investment package, invest in GNSE, track balances and withdraw through Skrill. The TruNext team manages users, investments and packages from a dedicated admin panel. Adelogix designed the full UI/UX in 2026.",
    context: "Crypto apps lose users not because of the market but because confusing screens make it hard to find basic information like balances.",
    challenge: "Design a crypto investment platform where money is always easy to read, across three surfaces: web app, mobile app and admin panel.",
    solution: "One navy-and-white interface shared across all three surfaces, with comparable package cards, a clear wallet, one money-movement pattern and four-step onboarding.",
    features: ["User web app: dashboard, investment packages, GNSE investment, referrals, wallet and cashout", "Mobile app with the same investor flows", "Admin panel: users, investments and package management", "Four investment packages on one comparable card pattern", "USDT and Gold-Backed Token balances side by side", "One money-movement pattern: link Skrill once, then same steps for every deposit, withdrawal and cashout", "Four-step onboarding"],
    goals: ["Design one system across three surfaces with consistent navy-and-white interface", "Make comparing investment packages take seconds", "Create calm visual system for financial trust"],
    color: "#15306b",
    cover: "/images/case-studies/trunext/01-hero.webp",
    gallery: g("trunext", ["02-overview", "03-ecosystem", "04-investment-packages", "05-wallet-and-tokens", "06-skrill-and-cashout", "07-referral-program", "08-mobile-app", "09-admin-panel", "10-onboarding", "11-visual-style", "12-thank-you"], "TruNext"),
  },
  {
    slug: "usr-crm",
    name: "USR CRM",
    tagline: "The CRM behind every USR event.",
    intro: "USR's CRM is where staff take enquiries, build quotes, confirm bookings, plan events and track payments. We rebuilt it around a calm stone and sage palette.",
    category: "CRM system",
    filter: "Web",
    industry: "Events & Hospitality",
    year: "2026",
    summary: "Web CRM for a UK team of international DJs and music producers, redesigned and developed by Adelogix in 2026 with responsive mobile layout.",
    services: ["crm-development", "web-development", "custom-software-development", "ui-ux-design"],
    tech: ["Figma"],
    overview: "USR CRM is a web application used by USR, a UK team of international DJs and music producers, to manage enquiries, quotes, bookings, events and payments. Adelogix Software Technology redesigned and developed it in 2026, including a responsive mobile layout.",
    context: "The old dashboard was dark and loud, with bright gradient cards and a heavy sidebar. USR needed a calmer structure for managing event bookings.",
    challenge: "Redesign a dark, gradient-heavy CRM dashboard into a calm, clear interface while keeping all the same information and functionality.",
    solution: "Rebuilt around a calm stone and sage palette, a slim icon menu and one screen showing the whole day's business, with event sheets, a DJ colour-coded calendar and admin reports.",
    features: ["New enquiries with live quote: packages, extras, equipment and running total", "Open enquiry follow-up with email updates, brochures and quotes", "Full event sheet for every confirmed booking", "Completed events with emails, invoices and payment status", "Calendar colour-coded by DJ", "Admin and supplier reports: price, cost, profit and payments", "Users and roles, file uploads, downloads and rig lists"],
    goals: ["Replace dark gradient dashboard with calm stone and sage interface", "Deliver 14 desktop screens each with matching mobile layout", "Redesign and develop in 2026"],
    color: "#6f7f63",
    cover: "/images/case-studies/usr-crm/01-hero.webp",
    gallery: g("usr-crm", ["02-overview", "03-redesign", "04-event-lifecycle", "05-dashboard", "06-quote-builder", "07-event-sheet", "08-calendar-and-completed-events", "09-reports", "10-operations", "11-mobile", "12-design-language", "13-closing"], "USR CRM"),
  },
  {
    slug: "xenpop",
    name: "XENPOP",
    tagline: "Crypto mining, one tap a day.",
    intro: "XENPOP lets people mine and earn coins from their phone with no special hardware and no technical setup.",
    category: "Crypto mining platform",
    filter: "FinTech",
    industry: "FinTech",
    year: "2026",
    summary: "Community-powered crypto mining platform with mobile app, website and admin panel, designed and developed by Adelogix in 2026.",
    services: ["web-development", "mobile-app-development", "custom-software-development", "ui-ux-design", "product-development"],
    tech: ["Figma"],
    overview: "XENPOP is a community-powered crypto mining platform. People mine and earn coins from their phone, with no special hardware and no technical setup. The Adelogix Software Technology team designed and developed the complete platform in 2026: a mobile app, a website and an admin panel.",
    context: "Most crypto apps are built for experts. XENPOP was built for everyone else, needing a full platform across three touchpoints.",
    challenge: "Keeping three different interfaces (mobile app, website, admin panel) feeling like one product with a shared design system.",
    solution: "A shared design system built around XENPOP blue and the XEN coin, tying together a tap-to-mine mobile app, a dark landing page and a KYC/admin panel.",
    features: ["Mobile app: tap-to-mine sessions with live countdown and hourly rate", "Step-by-step KYC with document photos and face check", "Wallet to send and receive coins", "Website landing page for the platform", "Admin panel for users, verification and platform management", "Shared typography and colour system across all three touchpoints"],
    goals: ["Design and develop a mobile app, website and admin panel as one product", "Make crypto mining approachable for non-experts", "Deliver the complete platform in 2026"],
    color: "#2563eb",
    cover: "/images/case-studies/xenpop/01-hero.webp",
    gallery: g("xenpop", ["02-what-is-xenpop", "03-three-touchpoints", "04-mining", "05-everything-in-one-app", "06-verification", "07-wallet", "08-screen-map", "09-website", "10-admin-panel", "11-typography-and-colour", "12-closing"], "XENPOP"),
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const relatedProjects = (slug: string, n = 3) => {
  const p = getProject(slug);
  return projects
    .filter((x) => x.slug !== slug)
    .map((x) => ({ x, score: x.services.filter((s) => p?.services.includes(s)).length + (x.industry === p?.industry ? 2 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((r) => r.x);
};
