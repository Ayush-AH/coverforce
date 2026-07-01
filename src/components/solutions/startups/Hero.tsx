"use client";

import StartupRecentActivityCard from "@/components/solutions/startups/StartupRecentActivityCard";
import SolutionScrollHero from "@/components/solutions/shared/SolutionScrollHero";

const LIST_POINTS = [
  {
    id: "pricing",
    text: "Qualified teams get low-cost pricing built for early-stage brokerages and designed to grow with your book",
  },
  {
    id: "carriers",
    text: "50+ carrier integrations are ready from day one through our API, with warm carrier introductions when you're ready",
  },
  {
    id: "licensing",
    text: "Members get special partner pricing and trusted licensing support to get licensed and secure appointments",
  },
] as const;

const Hero = () => (
  <SolutionScrollHero
    eyebrow="Startups"
    title="The faster way to build a modern brokerage"
    titleClassName="max-w-xl text-3xl font-heading font-normal tracking-normal text-[#0a143b] md:text-4xl lg:text-[3.5rem] lg:leading-none"
    description="CoverForce gives early-stage startups the infrastructure, carriers, and ecosystem support to go from zero to launch in days."
    listTag="Program"
    listHeading="Everything you need to launch, in one place."
    listPoints={LIST_POINTS}
    rightCard={<StartupRecentActivityCard />}
    showMarquee
    gradFlow={{
      color1: { r: 21, g: 75, b: 193 },
      color2: { r: 184, g: 122, b: 255 },
      color3: { r: 218, g: 202, b: 255 },
    }}
  />
);

export default Hero;
