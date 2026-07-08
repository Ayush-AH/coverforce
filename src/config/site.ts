export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  locale: string;
  language: string;
  ogImage: string;
  keywords: string[];
  contact: {
    phone: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
};

export type SiteRoute = {
  path: string;
  label: string;
  title: string;
  description: string;
  priority: number;
};

export const siteConfig: SiteConfig = {
  name: "CoverForce",
  description: "CoverForce is a platform for creating and managing insurance policies.",
  url: "https://coverforce.com",
  locale: "en_IN",
  language: "en-IN",
  ogImage: "/og.png",
  keywords: ["CoverForce", "Insurance", "Platform", "Management", "Policy", "Creation"],
  contact: {
    phone: "",
    email: "",
  },
  address: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "IN",
  },
  socials: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "https://www.linkedin.com/company/coverforceinc",
  },
};

export const siteRoutes: SiteRoute[] = [
  {
    path: "/",
    label: "Home",
    title: "Home",
    description: siteConfig.description,
    priority: 1,
  },
  {
    path: "/product/submission-intake",
    label: "Submission Intake",
    title: "Submission Intake",
    description:
      "Turn emails and documents into insurance-ready submissions with AI-powered intake.",
    priority: 0.9,
  },
  {
    path: "/product/quote-bind",
    label: "Quote & Bind",
    title: "Quote & Bind",
    description:
      "Instant quotes and one-click binding across leading commercial carriers.",
    priority: 0.9,
  },
  {
    path: "/product/intelligence",
    label: "Intelligence",
    title: "Intelligence",
    description:
      "AI-native appetite matching and insurance intelligence for faster decisions.",
    priority: 0.9,
  },
  {
    path: "/solutions/carrier",
    label: "Carriers",
    title: "Solutions for Carriers",
    description:
      "Unlock new distribution channels and faster underwriting with CoverForce.",
    priority: 0.8,
  },
  {
    path: "/solutions/brokers",
    label: "Brokers",
    title: "Solutions for Brokers",
    description:
      "One workflow from intake to bind for retail and independent brokers.",
    priority: 0.8,
  },
  {
    path: "/solutions/wholesalers",
    label: "Wholesalers",
    title: "Solutions for Wholesalers",
    description:
      "Track submissions across retail agencies with on-demand quoting.",
    priority: 0.8,
  },
  {
    path: "/solutions/startups",
    label: "Startups",
    title: "Solutions for Startups",
    description:
      "The faster way to build a modern brokerage on CoverForce infrastructure.",
    priority: 0.8,
  },
  {
    path: "/solutions/developers",
    label: "Developers",
    title: "Solutions for Developers",
    description:
      "Developer-first infrastructure for quote-to-bind workflows.",
    priority: 0.8,
  },
  {
    path: "/developers",
    label: "Developers",
    title: "Developers",
    description:
      "Open APIs, MCP support, sandbox access, and docs to go from integration to production.",
    priority: 0.8,
  },
  {
    path: "/integration",
    label: "Integrations",
    title: "Integrations",
    description:
      "Connect CoverForce with the tools and carriers your team already uses.",
    priority: 0.7,
  },
  {
    path: "/pricing",
    label: "Pricing",
    title: "Pricing",
    description: "Simple, transparent pricing for teams of every size.",
    priority: 0.7,
  },
  {
    path: "/blog",
    label: "Blog",
    title: "Blog",
    description:
      "Insights, news, and case studies on the future of commercial insurance.",
    priority: 0.7,
  },
  {
    path: "/about",
    label: "About",
    title: "About",
    description: "Why CoverForce was founded and the team building it.",
    priority: 0.6,
  },
  {
    path: "/careers",
    label: "Careers",
    title: "Careers",
    description: "Join our growing team shaping the future of insurance.",
    priority: 0.6,
  },
  {
    path: "/contact",
    label: "Contact",
    title: "Contact",
    description: "Get in touch with the CoverForce team.",
    priority: 0.6,
  },
  {
    path: "/terms",
    label: "Terms",
    title: "Terms of Service",
    description: "The terms governing your use of CoverForce.",
    priority: 0.3,
  },
  {
    path: "/privacy",
    label: "Privacy",
    title: "Privacy Policy",
    description: "How CoverForce collects, uses, and protects your data.",
    priority: 0.3,
  },
  {
    path: "/security",
    label: "Security",
    title: "Security",
    description: "How CoverForce keeps your data safe and secure.",
    priority: 0.3,
  },
];
