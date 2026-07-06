import PageWrapper from "@/components/PageWrapper";
import LegalPage from "@/components/legal/LegalPage";
import { securityContent } from "@/content/legal/securityContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Security",
  description:
    "Learn how CoverForce protects insurance infrastructure with security by design, zero trust, continuous monitoring, and enterprise-grade controls.",
  path: "/security",
});

const SecurityPage = () => {
  return (
    <PageWrapper>
      <LegalPage {...securityContent} />
    </PageWrapper>
  );
};

export default SecurityPage;
