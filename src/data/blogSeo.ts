export type BlogSeoEntry = {
  title: string;
  description: string;
};

export const blogPostsSeo: Record<string, BlogSeoEntry> = {
  "wholesalers-embrace-apis": {
    title: "Wholesalers Must Embrace APIs to Stay Competitive | CoverForce",
    description:
      "Learn why surplus lines wholesalers need API-driven distribution to stay competitive, reduce manual work, and deliver faster quoting experiences to broker partners.",
  },
  "hidden-costs-slow-submission-workflows": {
    title: "Hidden Costs of Slow Submission Workflows | CoverForce",
    description:
      "Discover the hidden costs of slow commercial insurance submission workflows and how brokers and wholesalers can improve speed, accuracy, and placement rates.",
  },
  "true-bindability-commercial-quoting": {
    title: "True Bindability in Commercial Quoting | CoverForce",
    description:
      "Understand why true bindability matters in commercial quoting and how accurate, carrier-ready quotes help brokers close business faster with fewer reworks.",
  },
  "broker-codes-extended": {
    title: "Broker Codes, Extended: Flexible Insurance Ecosystem | CoverForce",
    description:
      "See how extended broker codes and delegated access help wholesalers build a more flexible commercial insurance ecosystem with better control and visibility.",
  },
  "venbrook-brooks-alliance": {
    title: "Venbrook and Brooks Alliance With CoverForce | CoverForce",
    description:
      "Venbrook wholesaler Brooks Insurance partners with CoverForce to enable on-demand commercial quoting and modern distribution for broker partners nationwide.",
  },
  "coverforce-cb-insights-2025": {
    title: "CoverForce Named CB Insights Top Insurtech 2025 | CoverForce",
    description:
      "CoverForce is named to CB Insights' 2025 list of the 50 most innovative insurtech startups transforming commercial insurance distribution and APIs.",
  },
  "coverforce-nowcerts-instant-cois": {
    title: "CoverForce and NowCerts Launch Instant COIs | CoverForce",
    description:
      "CoverForce partners with NowCerts to launch instant certificates of insurance, helping agencies automate COI delivery and improve client service workflows.",
  },
  "coverforce-series-a-funding": {
    title: "CoverForce Raises $13M Series A Funding | CoverForce",
    description:
      "CoverForce secures $13 million in Series A funding to expand its commercial insurance distribution platform, APIs, and quote-to-bind infrastructure.",
  },
  "coverforce-and-the-future-of-insurance-distribution": {
    title: "The Future of Insurance Distribution | CoverForce",
    description:
      "Explore how CoverForce is shaping the future of commercial insurance distribution with APIs, digital workflows, and modern infrastructure for brokers and carriers.",
  },
  "how-to-use-coverforce-to-automate-your-insurance-distribution": {
    title: "Automate Insurance Distribution With CoverForce | CoverForce",
    description:
      "Learn how to use CoverForce to automate commercial insurance distribution, from submission intake and quoting to binding across leading P&C carriers.",
  },
};

export const blogPostSlugs = Object.keys(blogPostsSeo);

export function getBlogSeo(slug: string): BlogSeoEntry {
  return (
    blogPostsSeo[slug] ?? {
      title: "Commercial Insurance Insights | CoverForce",
      description:
        "Read the latest commercial insurance insights, product updates, and industry news from the CoverForce team on distribution, APIs, and insurtech.",
    }
  );
}
