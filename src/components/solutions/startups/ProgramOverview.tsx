"use client";

import { useRef } from "react";
import Container from "@/components/common/Container";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

type ProgramItem = {
  number: string;
  title: string;
  description: string;
};

const programItems: ProgramItem[] = [
  {
    number: "01",
    title: "Preferred startup pricing",
    description:
      "Qualified teams get low-cost pricing built for early-stage brokerages and designed to grow with your book.",
  },
  {
    number: "02",
    title: "Carrier connectivity & access",
    description:
      "50+ carrier integrations are ready from day one through our API, with warm carrier introductions when you're ready for direct appointments.",
  },
  {
    number: "03",
    title: "Preferred partner pricing",
    description:
      "Members get special partner pricing and trusted licensing support, helping you get licensed, secure carrier appointments.",
  },
];

const ProgramOverview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
    descRef,
  });

  return (
    <section id="program-overview" ref={sectionRef} className="bg-white text-[#0a143b]">
      <Container borderColor="#53535380">
        <div className="flex flex-col gap-12 py-16 md:gap-14 md:py-20 lg:gap-16 lg:py-24">
          <div
            ref={headerRef}
            className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-12"
          >
            <div className="space-y-5">
              <p className="text-[0.6875rem] font-sans font-medium uppercase tracking-[0.18em] text-[#8B95A8]">
                <span className="mr-2 text-[#A483FE]">•</span>
                Program overview
              </p>
              <h2
                ref={headingRef}
                className="max-w-xl text-3xl font-heading font-medium leading-[1.12] tracking-tight text-[#0a143b] md:text-4xl lg:text-[2.5rem] lg:leading-[1.1]"
              >
                <span data-split>Everything you need to launch.</span>
              </h2>
            </div>

            <p
              ref={descRef}
              className="max-w-md font-sans text-sm font-regular leading-[1.5] text-[#50617a] md:text-[1.125rem] lg:pt-8"
            >
              We&apos;ve packaged the infrastructure, pricing, and relationships that used to
              take years to build so you can focus on customer acquisition and placement.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-10">
            {programItems.map((item) => (
              <article key={item.number} className="space-y-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-2xl font-heading font-medium leading-none text-[#4F63E8] md:text-[1.75rem]">
                    {item.number}
                  </span>
                  <h3 className="text-lg font-heading font-medium leading-snug text-[#0a143b] md:text-xl">
                    {item.title}
                  </h3>
                </div>
                <p className="max-w-sm font-sans text-sm font-regular leading-relaxed text-[#50617a] md:text-[0.9375rem]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProgramOverview;
