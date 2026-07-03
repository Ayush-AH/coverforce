"use client";

import Image from "next/image";
import { useRef } from "react";
import Container from "@/components/common/Container";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

const investors = [
  {
    src: "/images/about/investor1.svg",
    alt: "Insight Partners",
    width: 286,
    height: 80,
  },
  {
    src: "/images/about/investor2.svg",
    alt: "QED Investors",
    width: 287,
    height: 80,
  },
  {
    src: "/images/about/investor3.svg",
    alt: "nyca",
    width: 260,
    height: 80,
  },
] as const;

const Investors = () => {
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
        <div className="flex flex-col items-center py-20 text-center md:py-24 lg:py-28">
          <div ref={headerRef} className="max-w-3xl">
            <h2
              ref={headingRef}
              className="text-3xl font-heading font-regular leading-[1.12] tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              <span data-split>Backed by Investors</span>
              <br />
              <span data-split>Shaping the Future of</span>
              <br />
              <span data-split>Insurance</span>
            </h2>
          </div>

          <div className="mt-14 flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-10 md:mt-16 md:gap-x-14 lg:mt-20 lg:gap-x-20">
            {investors.map((investor) => (
              <div
                key={investor.src}
                className="flex h-14 items-center justify-center md:h-16 lg:h-20"
              >
                <Image
                  src={investor.src}
                  alt={investor.alt}
                  width={investor.width}
                  height={investor.height}
                  className="h-full w-auto max-w-[11rem] object-contain object-center md:max-w-[13rem] lg:max-w-[15rem]"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Investors;
