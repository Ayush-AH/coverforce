import PageWrapper from "@/components/PageWrapper";
import LegalPage from "@/components/legal/LegalPage";
import { termsContent } from "@/content/legal/termsContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Service",
  description:
    "CoverForce Terms of Service governing access to and use of CoverForce.com, its subdomains, platform, APIs, and related services.",
  path: "/terms",
});

const TermsPage = () => {
  return (
    <PageWrapper>
      <LegalPage {...termsContent} />
    </PageWrapper>
  );
};

export default TermsPage;
