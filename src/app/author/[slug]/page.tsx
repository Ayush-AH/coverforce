import Hero from "@/components/author/Hero";
import MoreBlogs from "@/components/blogDets/MoreBlogs";
import PageWrapper from "@/components/PageWrapper";
import { authorSlugs, getAuthorSeo } from "@/data/authorSeo";
import { createArticleMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!authorSlugs.includes(slug)) notFound();
  const seo = getAuthorSeo(slug);

  return createArticleMetadata({
    title: seo.title,
    description: seo.description,
    path: `/author/${slug}`,
  });
}

export function generateStaticParams() {
  return authorSlugs.map((slug) => ({ slug }));
}

const AuthorPage = async ({ params }: AuthorPageProps) => {
  const { slug } = await params;
  if (!authorSlugs.includes(slug)) notFound();

  return (
    <PageWrapper>
      <Hero />
      <MoreBlogs title="More Insights from Cyrus Karai" />
    </PageWrapper>
  );
};

export default AuthorPage;
