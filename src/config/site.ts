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
  name: "Website Name",
  description: "Website description",
  url: "https://localhost:3000",
  locale: "en_IN",
  language: "en-IN",
  ogImage: "/og.png",
  keywords: ["", "", "", ""],
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
    linkedin: "",
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
    path: "/about",
    label: "About",
    title: "About",
    description: "",
    priority: 0.8,
  },
  {
    path: "/contact",
    label: "Contact",
    title: "Contact",
    description: "",
    priority: 0.7,
  },
];
