import Hero from "@/components/home/Hero";
import ThreeWays from "@/components/home/ThreeWays";
import DistributionFlow from "@/components/home/DistributionFlow";
import DataAdvantage from "@/components/home/DataAdvantage";
import Review from "@/components/home/Review";
import CarrierResults from "@/components/home/CarrierResults";
import Explore from "@/components/home/Explore";
import { createPageMetadata } from "@/lib/seo";

const HomePage = () => {
  return (
    <>
      <Hero />
      <ThreeWays />
      <DistributionFlow />
      <DataAdvantage />
      <Review />
      <CarrierResults />
      <Explore />
    </>
  );
};

export default HomePage;

export async function generateMetadata() {
  return createPageMetadata("/");
}
