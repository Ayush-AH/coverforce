import Hero from "@/components/pricing/Hero";
import PricingPlans from "@/components/pricing/PricingPlans";
import PageWrapper from '@/components/PageWrapper'
import HowPricingWorks from '@/components/pricing/HowPricingWorks'

const PricingPage = () => {
  return (
    <>
      <PageWrapper>
        <Hero />
        <PricingPlans />
        <HowPricingWorks />
      </PageWrapper>
    </>
  );
};

export default PricingPage;
