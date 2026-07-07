"use client";

import SolutionScrollHero from "@/components/solutions/shared/SolutionScrollHero";
import { developersHeroCardMock } from "@/components/solutions/developers/OperatingSystem";
import { SOLUTION_GRAD_FLOW } from "@/data/wayCardStyles";

const HeroMock = developersHeroCardMock;

const Hero = () => (
  <SolutionScrollHero
    eyebrow="Developers"
    title="Embed commercial insurance into any product"
    titleClassName="max-w-xl text-3xl font-heading font-normal tracking-normal text-[#0a143b] md:text-4xl lg:text-[3.5rem] lg:leading-none"
    description="One API for 40+ carriers, AI-powered quoting, binding, and policy management so you can add commercial insurance without becoming an insurance company."
    secondaryButtonHref="#workflow"
    secondaryButtonLabel="How Program Works"
    rightCard={HeroMock ? <HeroMock /> : null}
    rightCardTransferTargetId="developers-step-1-card"
    showSecondSection={false}
    gradFlow={SOLUTION_GRAD_FLOW.developer}
  />
);

export default Hero;
