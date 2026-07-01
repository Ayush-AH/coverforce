"use client";

import BrokerCodeControlsMock from "@/components/solutions/wholesalers/BrokerCodeControlsMock";
import SolutionScrollHero from "@/components/solutions/shared/SolutionScrollHero";
import { SOLUTION_GRAD_FLOW } from "@/data/wayCardStyles";

const LIST_POINTS = [
  {
    id: "ai-intake",
    text: "AI reads submissions, ACORDs, and loss runs before they reach your underwriters",
  },
  {
    id: "broker-controls",
    text: "Broker codes and agency permissions managed privately with a full audit trail",
  },
  {
    id: "integrations",
    text: "Works with your AMS, carrier portals, email intake, and existing workflows",
  },
] as const;

const Hero = () => (
  <SolutionScrollHero
    eyebrow="Wholesalers"
    title="Scale your wholesale operation from one platform"
    description="CoverForce gives early-stage startups the infrastructure, carriers, and ecosystem support to go from zero to launch in days."
    listTag="Platform"
    listHeading="Wholesale workflows, enhanced instantly."
    listPoints={LIST_POINTS}
    rightCard={<BrokerCodeControlsMock />}
    showMarquee
    gradFlow={SOLUTION_GRAD_FLOW.wholesaler}
  />
);

export default Hero;
