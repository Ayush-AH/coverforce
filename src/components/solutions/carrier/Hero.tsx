"use client";

import ApiEndpointSummaryMock from "@/components/solutions/carrier/ApiEndpointSummaryMock";
import SolutionScrollHero from "@/components/solutions/shared/SolutionScrollHero";
import { SOLUTION_GRAD_FLOW } from "@/data/wayCardStyles";

const LIST_POINTS = [
  {
    id: "integration",
    text: "One API connects your products to wholesalers, networks, and agencies nationwide — no separate partnerships required",
  },
  {
    id: "ai-validated",
    text: "AI validates every submission for completeness, extracts documents, and pre-answers underwriting questions",
  },
  {
    id: "connectivity",
    text: "Go from contract to production in 30 days with less than 10 hours of carrier engineering time",
  },
] as const;

const Hero = () => (
  <SolutionScrollHero
    eyebrow="Carrier and MGAs"
    title="Be present at the moment agents quote"
    description="Brokers are moving to multi-carrier platforms. CoverForce puts your products in the quoting flow, reaching 15,000+ agencies through one integration — live in 30 days."
    listTag="Distribution"
    listHeading="Carrier reach, accelerated instantly."
    listPoints={LIST_POINTS}
    rightCard={
      <div className="w-full max-w-[380px] md:max-w-[420px]">
        <ApiEndpointSummaryMock />
      </div>
    }
    gradFlow={SOLUTION_GRAD_FLOW.carrier}
  />
);

export default Hero;
