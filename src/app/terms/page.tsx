import PageWrapper from "@/components/PageWrapper";
import LegalPage from "@/components/legal/LegalPage";
import { termsContent } from "@/content/legal/termsContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/terms");

const TermsPage = () => {
  return (
    <PageWrapper>
      <LegalPage {...termsContent} />
    </PageWrapper>
  );
};

export default TermsPage;
