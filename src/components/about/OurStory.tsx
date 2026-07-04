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
      <Container borderColor="#53535380">
        <div className="flex flex-col items-center py-20 md:py-24 lg:py-28">
          <div
            ref={headerRef}
            className="flex flex-col items-center justify-end space-y-5 text-center"
          >
            <EyebrowPill surface="light" className="mx-auto mb-0">
              Our Story
            </EyebrowPill>

            <h2
              ref={headingRef}
              className="max-w-md text-3xl font-heading font-medium leading-[1.12] tracking-tight text-[#9AA8BC] md:text-4xl lg:text-[1.625rem] lg:leading-[1.12]"
            >
              <span data-split>Why CoverForce Was <br/> Founded</span>
            </h2>
          </div>

          <div className="mt-10 w-full max-w-3xl space-y-6 text-left md:mt-12 lg:mt-14">
            <p className="text-3xl font-heading font-regular leading-[1.12] text-[#454545] md:text-4xl lg:text-[1.6rem] lg:leading-[1.12]">
              CoverForce was born out of a simple observation: commercial insurance needed
              digital enablers. Despite being a trillion-dollar industry, the process of
              quoting, binding, and managing insurance policies remained slow, fragmented,
              and paper-heavy — costing agents time, limiting carriers&apos; reach, and
              frustrating business owners.
            </p>
            <p className="text-3xl font-heading font-regular leading-[1.12] text-[#454545] md:text-4xl lg:text-[1.6rem] lg:leading-[1.12]">
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
