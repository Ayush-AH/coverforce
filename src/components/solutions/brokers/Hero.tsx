"use client";

import SolutionScrollHero from "@/components/solutions/shared/SolutionScrollHero";
import { brokersHeroCardMock } from "@/components/solutions/brokers/OperatingSystem";
import { SOLUTION_GRAD_FLOW } from "@/data/wayCardStyles";

const HeroMock = brokersHeroCardMock;

const Hero = () => (
  <SolutionScrollHero
    eyebrow="Brokers"
    title="Standardise commercial lines everywhere."
    titleClassName="max-w-xl text-3xl font-heading font-normal tracking-normal text-[#0a143b] md:text-4xl lg:text-[3.5rem] lg:leading-none"
    secondaryButtonHref="#workflow"
    secondaryButtonLabel="How Program Works"
    rightCard={HeroMock ? <HeroMock /> : null}
    rightCardTransferTargetId="brokers-step-1-card"
    showSecondSection={false}
    gradFlow={SOLUTION_GRAD_FLOW.broker}
  />
);

export default Hero;
