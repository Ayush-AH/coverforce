"use client";

import { useRef } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
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
      <Container borderColor="#53535380" borderBottom={true}>
        <div className="flex flex-col gap-10 py-16 md:gap-12 md:py-20 lg:gap-42 lg:py-24">
          <div
            ref={headerRef}
            className="grid gap-8 lg:grid-cols-2 lg:items-start lg:justify-between lg:gap-12"
          >
            <div className="flex flex-col justify-end space-y-5">
              <h2
                ref={headingRef}
                className="max-w-sm text-3xl font-heading font-regular leading-tight tracking-tight text-[#9AA8BC] md:text-4xl lg:text-3xl lg:leading-[1.15]"
              >
                <span data-split>Everything you need to </span>
                <span
                  data-split
                  className="bg-linear-to-r from-[#A483FE] via-[#8B7CFF] to-[#C4B5FF] bg-clip-text text-transparent"
                >
                  launch.
                </span>
              </h2>
            </div>

            <div className="flex max-w-md flex-col items-start justify-end gap-6 text-left lg:ml-auto">
              <p
                ref={descRef}
                className="font-sans font-regular text-sm leading-[1.4] text-[#50617a] md:text-[1.125rem]"
              >
                We&apos;ve packaged the infrastructure, pricing, and relationships that used to take years to build so you can focus on customer acquisition and placement.
              </p>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-24">
            {programItems.map((item) => (
              <article key={item.number} className="space-y-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-2xl font-heading font-medium leading-none text-[#0101BE] md:text-lg">
                    {item.number}
                  </span>
                  <h3 className="text-lg font-sans font-medium leading-snug text-[#000000] md:text-base">
                    {item.title}
                  </h3>
                </div>
                <p className="max-w-sm font-sans text-sm font-regular leading-relaxed text-[#3E3E3E] md:text-sm">
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
