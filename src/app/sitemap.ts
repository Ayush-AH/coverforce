import type { MetadataRoute } from "next";
import { siteRoutes } from "@/config/site";
import { authorSlugs } from "@/data/authorSeo";
import { blogPostSlugs } from "@/data/blogSeo";
import { absoluteUrl } from "@/utils/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = siteRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.priority,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPostSlugs.map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const authorRoutes: MetadataRoute.Sitemap = authorSlugs.map((slug) => ({
    url: absoluteUrl(`/author/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...authorRoutes];
}
