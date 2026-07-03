"use client";

import { useRef } from "react";
import Container from "@/components/common/Container";
import EyebrowPill from "@/components/common/EyebrowPill";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

const OurStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
  });

  return (
    <section ref={sectionRef} className="bg-white text-[#0a143b]">
      <Container borderColor="#53535333">
        <div className="flex flex-col items-center py-20 md:py-24 lg:py-28">
          <div ref={headerRef} className="flex flex-col items-center text-center">
            <EyebrowPill surface="light" className="mx-auto">
              Our Story
            </EyebrowPill>

            <h2
              ref={headingRef}
              className="max-w-3xl text-3xl font-heading font-regular leading-[1.12] tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              Why CoverForce Was Founded
            </h2>
          </div>

          <div className="mt-10 w-full max-w-3xl space-y-6 text-left md:mt-12 lg:mt-14">
            <p className="font-sans text-sm font-regular leading-[1.65] text-[#50617a] md:text-base md:leading-[1.7]">
              CoverForce was born out of a simple observation: commercial insurance needed
              digital enablers. Despite being a trillion-dollar industry, the process of
              quoting, binding, and managing insurance policies remained slow, fragmented,
              and paper-heavy — costing agents time, limiting carriers&apos; reach, and
              frustrating business owners.
            </p>
            <p className="font-sans text-sm font-regular leading-[1.65] text-[#50617a] md:text-base md:leading-[1.7]">
              In 2020, we saw an opportunity to reimagine the infrastructure stack of
              insurance. The vision was clear: create a single API and platform that could
              connect agents, platforms, and carriers seamlessly — making commercial
              insurance distribution as simple and instant as any modern digital transaction.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurStory;
