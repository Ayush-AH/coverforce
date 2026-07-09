export type AuthorSeoEntry = {
  title: string;
  description: string;
};

export const authorsSeo: Record<string, AuthorSeoEntry> = {
  "cyrus-karai": {
    title: "Cyrus Karai | Author at CoverForce",
    description:
      "Read articles by Cyrus Karai, CEO and Co-Founder of CoverForce, on commercial insurance distribution, APIs, insurtech innovation, and industry strategy.",
  },
};

export const authorSlugs = Object.keys(authorsSeo);

export function getAuthorSeo(slug: string): AuthorSeoEntry {
  return (
    authorsSeo[slug] ?? {
      title: "Authors | CoverForce Blog",
      description:
        "Explore articles and insights from CoverForce authors on commercial insurance distribution, technology, and the future of the P&C industry.",
    }
  );
}
