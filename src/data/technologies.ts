// Technologies & capabilities.
// "tool" entries are named on the existing Adelogix website (services or case studies).
// "capability" entries describe services Adelogix offers without naming a specific
// framework that has not been confirmed. Add named frameworks only after confirmation.
export type Tech = {
  name: string;
  kind: "tool" | "capability";
  icon?: string; // simple-icons key for a verified product mark
  lucide?: string; // descriptive graphical icon for a capability
  desc: string;
  services: string[];
};

export type TechCategory = { id: string; name: string; lucide: string; blurb: string; items: Tech[] };

export const techCategories: TechCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    lucide: "MonitorSmartphone",
    blurb: "Interfaces that load fast, rank well and work on every screen size.",
    items: [
      { name: "Responsive Web Interfaces", kind: "capability", lucide: "MonitorSmartphone", desc: "Layouts tested on real phone, tablet and desktop sizes.", services: ["web-development"] },
      { name: "Web Applications", kind: "capability", lucide: "PanelsTopLeft", desc: "Logged-in products customers use every day.", services: ["web-development", "saas-development"] },
      { name: "Technical SEO", kind: "capability", lucide: "Search", desc: "Metadata, sitemaps, clean URLs and structured data.", services: ["web-development", "wordpress-development"] },
      { name: "Performance & Accessibility", kind: "capability", lucide: "Accessibility", desc: "Speed and accessibility improvements on new and existing sites.", services: ["web-development"] },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    lucide: "Server",
    blurb: "Properly modelled backends, secure authentication and integrations.",
    items: [
      { name: "Backend & API Development", kind: "capability", lucide: "Network", desc: "The services and APIs your apps and admin tools depend on.", services: ["web-development", "custom-software-development"] },
      { name: "Stripe", kind: "tool", icon: "siStripe", desc: "Payment flows such as Emyy's booking checkout.", services: ["saas-development", "mobile-app-development"] },
      { name: "PayPal & Apple Pay", kind: "tool", icon: "siPaypal", desc: "Subscription payments, as in the Fast VPN app.", services: ["mobile-app-development"] },
      { name: "Skrill", kind: "tool", lucide: "CreditCard", desc: "Deposit, withdrawal and cashout flows, as designed for TruNext.", services: ["ui-ux-design"] },
      { name: "Multi-tenant Architecture", kind: "capability", lucide: "Layers", desc: "Tenant data separation, roles and billing for SaaS.", services: ["saas-development"] },
    ],
  },
  {
    id: "mobile",
    name: "Mobile",
    lucide: "Smartphone",
    blurb: "iOS and Android apps, from prototype to store release.",
    items: [
      { name: "iOS", kind: "tool", icon: "siApple", desc: "Native-feeling iPhone apps published under your Apple account.", services: ["mobile-app-development"] },
      { name: "Android", kind: "tool", icon: "siAndroid", desc: "Android apps released on Google Play.", services: ["mobile-app-development"] },
      { name: "Cross-platform Codebase", kind: "capability", lucide: "Code2", desc: "One shared codebase for iOS and Android where it makes sense.", services: ["mobile-app-development"] },
      { name: "Offline Sync & Push", kind: "capability", lucide: "BellRing", desc: "Offline-ready data, push notifications and in-app messaging.", services: ["mobile-app-development"] },
    ],
  },
  {
    id: "database",
    name: "Database",
    lucide: "Database",
    blurb: "Data structures your reporting, integrations and growth rely on.",
    items: [
      { name: "Database Design", kind: "capability", lucide: "Database", desc: "Database design and development for custom systems.", services: ["custom-software-development", "erp-cms-development"] },
      { name: "Reporting & Exports", kind: "capability", lucide: "ChartNoAxesCombined", desc: "Dashboards, reports and data exports.", services: ["erp-cms-development", "crm-development"] },
      { name: "Data Migration", kind: "capability", lucide: "RefreshCw", desc: "Moving existing data safely into new systems.", services: ["crm-development", "web-development"] },
      { name: "Backups & Recovery", kind: "capability", lucide: "DatabaseBackup", desc: "Backups and disaster recovery plans.", services: ["it-services"] },
    ],
  },
  {
    id: "cms",
    name: "CMS",
    lucide: "LayoutTemplate",
    blurb: "Content systems editors actually enjoy using.",
    items: [
      { name: "WordPress", kind: "tool", icon: "siWordpress", desc: "Custom themes and plugins that are fast, secure and simple.", services: ["wordpress-development"] },
      { name: "WooCommerce", kind: "tool", icon: "siWoocommerce", desc: "Online stores on WordPress.", services: ["wordpress-development"] },
      { name: "Headless CMS", kind: "capability", lucide: "PanelsTopLeft", desc: "Structured content delivered to any frontend.", services: ["erp-cms-development"] },
      { name: "Custom CMS", kind: "capability", lucide: "Library", desc: "Content modelling with clear fields and previews.", services: ["erp-cms-development"] },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    lucide: "Cloud",
    blurb: "Infrastructure as code, automated pipelines and monitoring.",
    items: [
      { name: "AWS", kind: "tool", lucide: "Cloud", desc: "Secure, reproducible AWS environments sized for real traffic.", services: ["it-services", "devops-cloud"] },
      { name: "Google Cloud", kind: "tool", icon: "siGooglecloud", desc: "Google Cloud Platform architecture and management.", services: ["it-services", "devops-cloud"] },
      { name: "CI/CD Pipelines", kind: "capability", lucide: "GitBranch", desc: "Automated builds, tests and deployments.", services: ["devops-cloud"] },
      { name: "Infrastructure as Code", kind: "capability", lucide: "Code2", desc: "Infrastructure defined in code and easy to reproduce.", services: ["it-services", "devops-cloud"] },
      { name: "Monitoring & Alerts", kind: "capability", lucide: "Gauge", desc: "Logging, monitoring and alerting across environments.", services: ["devops-cloud"] },
    ],
  },
  {
    id: "design",
    name: "UI/UX",
    lucide: "PenTool",
    blurb: "Research-led design, finished as developer-ready systems.",
    items: [
      { name: "Figma", kind: "tool", icon: "siFigma", desc: "Wireframes, prototypes, design systems and handoff.", services: ["ui-ux-design"] },
      { name: "Design Systems", kind: "capability", lucide: "Library", desc: "Colour, type and component systems, as built for Uplift.ai and OriusPay.", services: ["ui-ux-design"] },
      { name: "Clickable Prototypes", kind: "capability", lucide: "MousePointerClick", desc: "Prototypes tested before development begins.", services: ["ui-ux-design", "mobile-app-development"] },
      { name: "Developer Handoff", kind: "capability", lucide: "HardDriveDownload", desc: "Specs and files developers can build from directly.", services: ["ui-ux-design"] },
    ],
  },
  {
    id: "ai",
    name: "AI & Automation",
    lucide: "Sparkles",
    blurb: "Practical AI with human review where accuracy matters.",
    items: [
      { name: "AI Assistants", kind: "capability", lucide: "Bot", desc: "Assistants trained on your own content, like OriusPay's Horus.", services: ["ai-development-automation"] },
      { name: "Document Extraction", kind: "capability", lucide: "FileSearch", desc: "Extracting and classifying information from documents.", services: ["ai-development-automation"] },
      { name: "Workflow Automation", kind: "capability", lucide: "Workflow", desc: "Automations between business tools, logged and auditable.", services: ["ai-development-automation"] },
      { name: "API & Third-party Integrations", kind: "capability", lucide: "Plug", desc: "Connecting the tools your team already uses.", services: ["ai-development-automation"] },
    ],
  },
];

export const allTools = techCategories.flatMap((c) => c.items.filter((i) => i.kind === "tool"));
