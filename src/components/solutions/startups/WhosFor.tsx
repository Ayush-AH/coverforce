"use client";

import { useRef } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

type AudienceCard = {
  title: string;
  description: string;
  image: string;
};

const audienceCards: AudienceCard[] = [
  {
    title: "STEALTH OR FUNDED TEAMS",
    description:
      "You're building quietly, backed by investors, or part of a trusted accelerator program.",
    image: "/images/startups/teams.png",
  },
  {
    title: "STUDIO-BUILT COMPANIES",
    description:
      "Your company started inside a venture studio, foundry, or company builder and is now ready to launch or grow.",
    image: "/images/startups/companies.png",
  },
  {
    title: "NEW BROKERAGES",
    description:
      "You're starting a brokerage, writing your first policies, or growing an early book of business.",
    image: "/images/startups/brokerages.png",
  },
];

const WhosFor = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
    descRef,
    theme: "dark",
  });

  return (
    <section ref={sectionRef} className="bg-[#121C49] text-white">
      <Container borderColor="#FFFFFF33">
        <div className="flex flex-col gap-10 py-16 md:gap-12 md:py-20 lg:gap-14 lg:py-24">
          <div
            ref={headerRef}
            className="grid gap-8 lg:grid-cols-2 lg:items-start lg:justify-between lg:gap-12"
          >
            <div className="flex flex-col justify-end space-y-5">
              <h2
                ref={headingRef}
                className="max-w-sm text-3xl font-heading font-regular leading-tight tracking-tight text-[#9AA8BC] md:text-4xl lg:text-3xl lg:leading-[1.15]"
              >
                <span data-split>Built for founders who are </span>
                <span
                  data-split
                  className="bg-linear-to-r from-[#A483FE] via-[#8B7CFF] to-[#C4B5FF] bg-clip-text text-transparent"
                >
                  serious
                </span>
                <span data-split> about insurance.</span>
              </h2>
              <Button href="/solutions/startups" variant="primary">
                Apply to Start Up Program
              </Button>
            </div>

            <div className="flex max-w-md flex-col items-start justify-end gap-6 text-left lg:ml-auto">
              <p
                ref={descRef}
                className="font-sans font-regular text-sm leading-[1.4] text-[#D1D1D1] md:text-[1.125rem]"
              >
                If you meet the criteria, apply below.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {audienceCards.map((card) => (
              <article
                key={card.title}
                className="flex min-h-[22rem] flex-col p-6 md:min-h-[24rem] md:p-8"
                style={{ backgroundColor: "#FAFAFA" }}
              >
                <p
                  className="text-sm font-mono font-medium uppercase"
                  style={{ color: "#3933A1" }}
                >
                  {card.title}
                </p>
                <p
                  className="mt-4 font-sans text-sm font-regular leading-relaxed md:text-sm"
                  style={{ color: "#3A34A5" }}
                >
                  {card.description}
                </p>
                <div className="relative mt-auto flex items-end justify-center pt-10">
                  <Image
                    src={card.image}
                    alt=""
                    width={280}
                    height={200}
                    className="h-auto w-full max-w-[14rem] object-contain object-bottom md:max-w-[19rem]"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhosFor;
