"use client";

import SolutionScrollHero from "@/components/solutions/shared/SolutionScrollHero";
import { carrierHeroCardMock } from "@/components/solutions/carrier/OperatingSystem";
import { SOLUTION_GRAD_FLOW } from "@/data/wayCardStyles";

const HeroMock = carrierHeroCardMock;

const Hero = () => (
  <SolutionScrollHero
    eyebrow="Carrier and MGAs"
    title="Be present at the moment agents quote"
    description="Brokers are moving to multi-carrier platforms. CoverForce puts your products in the quoting flow, reaching 15,000+ agencies through one integration — live in 30 days."
    secondaryButtonHref="#workflow"
    secondaryButtonLabel="How it works"
    rightCard={HeroMock ? <HeroMock /> : null}
    rightCardTransferTargetId="carrier-step-1-card"
    showSecondSection={false}
    gradFlow={SOLUTION_GRAD_FLOW.carrier}
  />
);

export default Hero;
