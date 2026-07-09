import Hero from "@/components/blogDets/Hero";
import Content from "@/components/blogDets/Content";
import MoreBlogs from "@/components/blogDets/MoreBlogs";
import { blogPostSlugs, getBlogSeo } from "@/data/blogSeo";
import { createArticleMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!blogPostSlugs.includes(slug)) notFound();
  const seo = getBlogSeo(slug);

  return createArticleMetadata({
    title: seo.title,
    description: seo.description,
    path: `/blog/${slug}`,
  });
}

export function generateStaticParams() {
  return blogPostSlugs.map((slug) => ({ slug }));
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params;
  if (!blogPostSlugs.includes(slug)) notFound();

  return (
    <>
      <Hero />
      <Content />
      <MoreBlogs />
    </>
  );
};

export default BlogDetailPage;
