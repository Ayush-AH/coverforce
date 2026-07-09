import Hero from "@/components/blog/Hero";
import Listing from "@/components/blog/Listing";
import PageWrapper from "@/components/PageWrapper";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/blog");

const BlogPage = () => {
  return (
    <PageWrapper>
      <Hero />
      <Listing />
    </PageWrapper>
  );
};

export default BlogPage;
