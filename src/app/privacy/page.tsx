import PageWrapper from "@/components/PageWrapper";
import LegalPage from "@/components/legal/LegalPage";
import { privacyContent } from "@/content/legal/privacyContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/privacy");

const PrivacyPage = () => {
  return (
    <PageWrapper>
      <LegalPage {...privacyContent} />
    </PageWrapper>
  );
};

export default PrivacyPage;
