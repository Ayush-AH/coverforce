"use client";

import StartupRecentActivityCard from "@/components/solutions/startups/StartupRecentActivityCard";
import SolutionScrollHero from "@/components/solutions/shared/SolutionScrollHero";
import { SOLUTION_GRAD_FLOW } from "@/data/wayCardStyles";

const Hero = () => (
  <SolutionScrollHero
    eyebrow="Startups"
    title="The faster way to build a modern brokerage"
    titleClassName="max-w-xl text-3xl font-heading font-normal tracking-normal text-[#0a143b] md:text-4xl lg:text-[3.5rem] lg:leading-none"
    description="CoverForce gives early-stage startups the infrastructure, carriers, and ecosystem support to go from zero to launch in days."
    primaryButtonHref="/contact"
    secondaryButtonHref="#launch"
    rightCard={<StartupRecentActivityCard />}
    showSecondSection={false}
    showMarquee
    gradFlow={SOLUTION_GRAD_FLOW.startup}
  />
);

export default Hero;
