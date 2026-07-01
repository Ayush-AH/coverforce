"use client";

import Image from "next/image";
import SolutionScrollHero from "@/components/solutions/shared/SolutionScrollHero";
import { SOLUTION_GRAD_FLOW } from "@/data/wayCardStyles";

const LIST_POINTS = [
  {
    id: "embedded",
    text: "Add commercial insurance quoting inside any vertical SaaS product — HR, fleet, property, or POS",
  },
  {
    id: "ai-apis",
    text: "Access document extraction, appetite matching, NAICS classification, and COI generation by API",
  },
  {
    id: "compliance",
    text: "SOC 2 Type II certified infrastructure with carrier compliance and regulatory requirements handled for you",
  },
] as const;

const Hero = () => (
  <SolutionScrollHero
    eyebrow="Developers"
    title="Embed commercial insurance into any product"
    titleClassName="max-w-xl text-3xl font-heading font-normal tracking-normal text-[#0a143b] md:text-4xl lg:text-[3.5rem] lg:leading-none"
    description="One API for 40+ carriers, AI-powered quoting, binding, and policy management so you can add commercial insurance without becoming an insurance company."
    listTag="API"
    listHeading="Insurance infrastructure, embedded instantly."
    listPoints={LIST_POINTS}
    rightCard={
      <Image
        src="/images/solution/developers.svg"
        alt="CoverForce developer platform"
        width={1200}
        height={900}
        className="h-auto w-full object-contain object-bottom"
        priority
      />
    }
    gradFlow={SOLUTION_GRAD_FLOW.developer}
  />
);

export default Hero;
