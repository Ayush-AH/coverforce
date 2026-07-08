import Hero from "@/components/blog/Hero";
import Listing from "@/components/blog/Listing";
import PageWrapper from "@/components/PageWrapper";

const BlogPage = () => {
  return (
    <PageWrapper>
      <Hero />
      <Listing />
    </PageWrapper>
  );
};

export default BlogPage;
