export type MegaMenuLink = {
  label: string;
  href: string;
};

export type MegaMenuColumn = {
  title: string;
  links: MegaMenuLink[];
};

export type MegaMenuFeatured = {
  title: string;
  subtitle: string;
  href: string;
};

export type MegaMenuPromo = {
  title: string;
  href: string;
  tag: string;
  readTime: string;
};

export type MegaMenuConfig = {
  featured: MegaMenuFeatured;
  columns: MegaMenuColumn[];
  promo?: MegaMenuPromo;
};

export const MEGA_MENUS: Record<string, MegaMenuConfig> = {
  Product: {
    featured: {
      title: "Product Overview",
      subtitle: "One platform for the full policy lifecycle",
      href: "/",
    },
    columns: [
      {
        title: "BY CAPABILITY",
        links: [
          { label: "Submission & Intake", href: "/" },
          { label: "Quote & Bind", href: "/" },
          { label: "Intelligence", href: "/" },
        ],
      },
      {
        title: "PLATFORM",
        links: [
          { label: "ACORD Automation", href: "/" },
          { label: "Carrier Submission", href: "/" },
          { label: "Document Center", href: "/" },
        ],
      },
    ],
    promo: {
      title: "Introducing: AI AutoFill",
      href: "/",
      tag: "PRODUCT",
      readTime: "3 MIN READ",
    },
  },
  Solutions: {
    featured: {
      title: "Solutions Hub",
      subtitle: "Built for every role in distribution",
      href: "/",
    },
    columns: [
      {
        title: "BY ROLE",
        links: [
          { label: "Wholesalers", href: "/" },
          { label: "Brokers", href: "/" },
          { label: "Carriers", href: "/" },
          { label: "Startups", href: "/" },
          { label: "Developers", href: "/" },
        ],
      },
      {
        title: "TOOLS",
        links: [
          { label: "ROI Calculator", href: "/" },
          { label: "Appetite Checker", href: "/" },
          { label: "2026 Carrier API Index", href: "/" },
        ],
      },
    ],
    promo: {
      title: "Compare Quotes Side by Side",
      href: "/",
      tag: "GUIDE",
      readTime: "5 MIN READ",
    },
  },
  Company: {
    featured: {
      title: "Resource Center",
      subtitle: "Latest insights and news",
      href: "/",
    },
    columns: [
      {
        title: "BY TYPE",
        links: [
          { label: "Blog", href: "/" },
          { label: "Customer stories", href: "/" },
          { label: "News", href: "/" },
        ],
      },
      {
        title: "COMPANY",
        links: [
          { label: "About CoverForce", href: "/" },
          { label: "Careers", href: "/" },
          { label: "Contact", href: "/" },
        ],
      },
    ],
    promo: {
      title: "Introducing: Business Pre-Fill",
      href: "/",
      tag: "NEWS",
      readTime: "4 MIN READ",
    },
  },
};
