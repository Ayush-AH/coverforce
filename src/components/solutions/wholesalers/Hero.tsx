"use client";

import SolutionScrollHero from "@/components/solutions/shared/SolutionScrollHero";
import { wholesalersHeroCardMock } from "@/components/solutions/wholesalers/OperatingSystem";
import { SOLUTION_GRAD_FLOW } from "@/data/wayCardStyles";

const HeroMock = wholesalersHeroCardMock;

const Hero = () => (
  <SolutionScrollHero
    eyebrow="Wholesalers"
    title="Scale your wholesale operation from one platform"
    description="CoverForce centralizes intake, routing, broker controls, and program distribution so your wholesale team can move faster without changing how retailers submit business."
    primaryButtonHref="/contact"
    primaryButtonLabel="Talk to sales"
    secondaryButtonHref="#workflow"
    secondaryButtonLabel="How it works"
    rightCard={HeroMock ? <HeroMock /> : null}
    rightCardTransferTargetId="wholesalers-step-1-card"
    showMarquee
    showSecondSection={false}
    gradFlow={SOLUTION_GRAD_FLOW.wholesaler}
  />
);

export default Hero;
