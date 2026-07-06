import PageWrapper from "@/components/PageWrapper";
import LegalPage from "@/components/legal/LegalPage";
import { privacyContent } from "@/content/legal/privacyContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How CoverForce collects, uses, shares, and protects information across our website, platform, and APIs.",
  path: "/privacy",
});

const PrivacyPage = () => {
  return (
    <PageWrapper>
      <LegalPage {...privacyContent} />
    </PageWrapper>
  );
};

export default PrivacyPage;
