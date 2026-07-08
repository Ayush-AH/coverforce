"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiSearchLine, RiArrowUpDownLine } from "@remixicon/react";
import Container from "@/components/common/Container";

type Category = "Insights" | "Case Study" | "News";

type BlogPost = {
  slug: string;
  category: Category;
  title: string;
  image: string;
  date: string;
  readTime: string;
  wide?: boolean;
};

const POSTS: BlogPost[] = [
  {
    slug: "wholesalers-embrace-apis",
    category: "Insights",
    title: "Wholesalers Must Embrace APIs to Stay Competitive",
    image: "/images/blog/blog1.png",
    date: "October 16, 2025",
    readTime: "1 min read",
  },
  {
    slug: "hidden-costs-slow-submission-workflows",
    category: "Insights",
    title: "The Hidden Costs of Slow Submission Workflows in Commercial Insurance",
    image: "/images/blog/blog2.png",
    date: "October 16, 2025",
    readTime: "1 min read",
  },
  {
    slug: "true-bindability-commercial-quoting",
    category: "Insights",
    title: "True Bindability in Commercial Quoting: Why It Matters",
    image: "/images/blog/blog3.png",
    date: "October 16, 2025",
    readTime: "1 min read",
  },
  {
    slug: "broker-codes-extended",
    category: "Case Study",
    title: "Broker Codes, Extended: Building a More Flexible Insurance Ecosystem",
    image: "/images/blog/blog4.png",
    date: "October 16, 2025",
    readTime: "1 min read",
    wide: true,
  },
  {
    slug: "venbrook-brooks-alliance",
    category: "News",
    title:
      "Venbrook Wholesaler, Brooks Insurance, Strikes Alliance with CoverForce for On-Demand Quoting",
    image: "/images/blog/blog5.png",
    date: "October 16, 2025",
    readTime: "1 min read",
    wide: true,
  },
  {
    slug: "coverforce-cb-insights-2025",
    category: "News",
    title:
      "CoverForce Named to the 2025 CB Insights' List of the 50 Most Innovative Insurtech Startups",
    image: "/images/blog/blog6.png",
    date: "October 16, 2025",
    readTime: "1 min read",
  },
  {
    slug: "coverforce-nowcerts-instant-cois",
    category: "News",
    title: "CoverForce Partners With NowCerts to Launch Instant COIs",
    image: "/images/blog/blog7.png",
    date: "October 16, 2025",
    readTime: "1 min read",
  },
  {
    slug: "coverforce-series-a-funding",
    category: "News",
    title: "CoverForce Secures $13 Million in Series A Funding Led by...",
    image: "/images/blog/blog8.png",
    date: "October 16, 2025",
    readTime: "1 min read",
  },
];

const FILTERS = ["All", "Insights", "Case Study", "News"] as const;
type Filter = (typeof FILTERS)[number];

function CategoryPill({ label }: { label: Category }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[#0a143b] backdrop-blur-sm">
      <span className="size-1.5 shrink-0 rounded-full bg-[#413CC0]" aria-hidden />
      {label}
    </span>
  );
}

function BlogCard({ post, uniform }: { post: BlogPost; uniform?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col ${!uniform && post.wide ? "lg:col-span-3" : "lg:col-span-2"}`}
    >
      <div className="relative w-full overflow-hidden rounded-md bg-[#F7F7FB]">
        <div className="relative aspect-video w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-start p-3">
          <CategoryPill label={post.category} />
        </div>
      </div>

      <h3 className="mt-4 font-heading text-base font-medium leading-snug text-[#0a143b] transition-colors group-hover:text-[#413CC0] md:text-lg">
        {post.title}
      </h3>

      <p className="mt-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#6B7280]">
        {post.date}
        <span className="mx-2 text-[#C4C4C4]">&bull;</span>
        {post.readTime}
      </p>
    </Link>
  );
}

const Listing = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return POSTS.filter((post) => {
      const matchesFilter =
        activeFilter === "All" || post.category === activeFilter;
      const matchesQuery = post.title
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <section className="bg-white text-[#0a143b]">
      <Container borderColor="#53535380">
        <div className="pb-16 md:pb-20 lg:pb-24 pt-10 md:pt-14 lg:pt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {FILTERS.map((filter) => {
                const isActive = filter === activeFilter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-1.5 font-heading text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#413CC0] text-white"
                        : "bg-[#0801140a] text-[#50617a] hover:bg-[#08011412]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <RiSearchLine
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9CA3AF]"
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-full border border-[#E6E6E6] bg-white py-2 pl-9 pr-4 font-heading text-sm text-[#0a143b] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#413CC0]"
                />
              </div>
              <button
                type="button"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#50617a] transition-colors hover:border-[#413CC0] hover:text-[#413CC0]"
                aria-label="Sort"
              >
                <RiArrowUpDownLine className="size-4" />
              </button>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} uniform={activeFilter !== "All"} />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center font-heading text-sm text-[#50617a]">
              No articles found.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Listing;
