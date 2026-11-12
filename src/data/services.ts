import raw from "./services-content.json";

export type ServiceContent = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  short: string;
  challengesTitle: string;
  challenges: { title: string; desc: string }[];
  solutionTitle: string;
  solutionText: string;
  solutionPoints: string[];
  deliverables: string[];
  process: string[];
  technologies: string[];
  caseStudies: string[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
};

export type HeroShape = "sphere" | "helix" | "grid" | "rings" | "wave" | "cube" | "torus" | "galaxy";

// Visual identity per service, so every service page gets its own hero.
const meta: Record<string, { num: string; icon: string; shape: HeroShape; hue: string; tags: string[] }> = {
  "web-development": { num: "01", icon: "Globe", shape: "grid", hue: "#8b6cf0", tags: ["Websites", "Portals", "Web apps"] },
  "mobile-app-development": { num: "02", icon: "Smartphone", shape: "rings", hue: "#a792d8", tags: ["iOS", "Android", "Store release"] },
  "custom-software-development": { num: "03", icon: "Boxes", shape: "cube", hue: "#7b8fd6", tags: ["Internal tools", "Dashboards", "Integrations"] },
  "ui-ux-design": { num: "04", icon: "PenTool", shape: "wave", hue: "#c39be0", tags: ["Figma", "Design systems", "Prototypes"] },
  "saas-development": { num: "05", icon: "Layers", shape: "torus", hue: "#9a7cf2", tags: ["Multi-tenant", "Billing", "Admin"] },
  "ai-development-automation": { num: "06", icon: "Sparkles", shape: "galaxy", hue: "#b48cff", tags: ["AI assistants", "Extraction", "Workflows"] },
  "crm-development": { num: "07", icon: "Users", shape: "sphere", hue: "#8ea3d8", tags: ["Pipelines", "Quotes", "Reports"] },
  "erp-cms-development": { num: "08", icon: "Database", shape: "cube", hue: "#7d6ad0", tags: ["Inventory", "Finance", "Headless CMS"] },
  "wordpress-development": { num: "09", icon: "LayoutTemplate", shape: "grid", hue: "#a9b8c9", tags: ["Themes", "Plugins", "WooCommerce"] },
  "it-services": { num: "10", icon: "ServerCog", shape: "helix", hue: "#8fa9c9", tags: ["AWS", "GCP", "Support"] },
  "product-development": { num: "11", icon: "Rocket", shape: "torus", hue: "#b19df0", tags: ["MVP", "Design", "Release"] },
  "devops-cloud": { num: "12", icon: "Cloud", shape: "helix", hue: "#9cb2d6", tags: ["CI/CD", "IaC", "Monitoring"] },
};

export type Service = ServiceContent & (typeof meta)[string];

export const services: Service[] = (raw as ServiceContent[]).map((s) => ({ ...s, ...meta[s.slug] }));

export const getService = (slug: string) => services.find((s) => s.slug === slug);

// Existing service grouping from the original Services page.
export const serviceGroups = [
  {
    id: "web",
    name: "Web Development",
    desc: "Business websites, portals and web applications, built from the database up to the interface people click.",
    slugs: ["web-development", "wordpress-development"],
    items: ["Full-Stack Web Development", "Frontend Development", "Backend Development", "Web Application Development", "Responsive Web Development", "WordPress Development"],
  },
  {
    id: "mobile",
    name: "Mobile Development",
    desc: "Apps for iOS and Android, with the backend, admin tools and store release included.",
    slugs: ["mobile-app-development"],
    items: ["Mobile App Development", "Android App Development", "iOS App Development"],
  },
  {
    id: "design",
    name: "Product Design",
    desc: "Research, structure and interface design in Figma, finished with files developers can build from directly.",
    slugs: ["ui-ux-design", "product-development"],
    items: ["UI/UX Design", "Mobile App Design", "Website Design", "Web Application Design", "Wireframing", "Figma Design", "Landing Page Design", "Admin Panel Design", "Developer Handoff", "CRM Dashboard Design"],
  },
  {
    id: "systems",
    name: "Custom Software & Business Systems",
    desc: "Software that runs your operations: products, internal tools, CRMs, ERPs and the data underneath them.",
    slugs: ["custom-software-development", "saas-development", "crm-development", "erp-cms-development"],
    items: ["Custom Software Development", "SaaS Development", "CRM Development", "ERP & CMS Development", "Admin Panel Development", "Database Design & Development"],
  },
  {
    id: "ai",
    name: "AI & Integrations",
    desc: "AI features, automation and the integrations that let your tools share data instead of people re-typing it.",
    slugs: ["ai-development-automation"],
    items: ["AI Development & Automation", "AI-Powered Application Development", "API Integration", "Third-Party Integrations"],
  },
  {
    id: "it",
    name: "IT Services",
    desc: "Cloud infrastructure, DevOps practices and IT support that keep systems available, secure and able to grow.",
    slugs: ["it-services", "devops-cloud"],
    items: ["DevOps & Cloud Infrastructure", "AWS Cloud Solutions", "Google Cloud Platform (GCP)", "Cloud Deployment & Management", "Infrastructure Management"],
  },
];

export const processStages = [
  { name: "Discover", text: "We learn how your business works, who the users are and what the project has to achieve.", items: ["Goals and requirements summary", "Users and key journeys", "Risks and open questions"] },
  { name: "Plan", text: "We agree the scope, technical approach and timeline, so you know what will be delivered and when.", items: ["Scope and phased estimate", "Technical approach", "Timeline and milestones"] },
  { name: "Build", text: "We design, develop and test in stages, sharing working software for your feedback along the way.", items: ["Designs and prototypes", "Staged, reviewable releases", "Testing before every release"] },
  { name: "Launch & Support", text: "We deploy, hand over what your team needs and provide the support we agreed at the start.", items: ["Deployment and go-live", "Documentation and access", "Agreed ongoing support"] },
];
