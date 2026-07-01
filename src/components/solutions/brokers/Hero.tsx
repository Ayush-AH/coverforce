"use client";

import OperatingPlatformMock from "@/components/solutions/brokers/OperatingPlatformMock";
import SolutionScrollHero from "@/components/solutions/shared/SolutionScrollHero";
import { SOLUTION_GRAD_FLOW } from "@/data/wayCardStyles";

const LIST_POINTS = [
  {
    id: "platform",
    text: "One workflow for every producer — 40+ carrier integrations, dynamic carrier questions, and no portal logins",
  },
  {
    id: "ai",
    text: "AI extraction, appetite matching, UW question assistance, and on-demand COI generation in one workflow",
  },
  {
    id: "visibility",
    text: "Real-time dashboards show submission volume, quote rates, bind rates, and premium by office and producer",
  },
] as const;

const Hero = () => (
  <SolutionScrollHero
    eyebrow="Brokers"
    title="Standardise commercial lines everywhere."
    titleClassName="max-w-xl text-3xl font-heading font-normal tracking-normal text-[#0a143b] md:text-4xl lg:text-[3.5rem] lg:leading-none"
    listTag="Platform"
    listHeading="Commercial lines, standardized everywhere."
    listPoints={LIST_POINTS}
    rightCard={<OperatingPlatformMock variant="hero" />}
    gradFlow={SOLUTION_GRAD_FLOW.broker}
  />
);

export default Hero;
