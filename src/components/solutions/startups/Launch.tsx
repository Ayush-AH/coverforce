"use client";

import { useRef, useState } from "react";
import Container from "@/components/common/Container";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";
import Image from "next/image";

type LaunchStep = {
  id: string;
  label: string;
  title: string;
};

const launchSteps: LaunchStep[] = [
  { id: "license", label: "STEP 01", title: "Get License" },
  { id: "appointments", label: "STEP 02", title: "Accelerated carrier appointments" },
  { id: "api", label: "STEP 03", title: "Connect to the API" },
];



const Launch = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
    descRef,
  });

  return (
    <section ref={sectionRef} className="bg-white text-[#0a143b]">
      <Container borderColor="#53535380">
        <div className="grid gap-12 py-16 md:gap-14 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div className="space-y-10">
            <div ref={headerRef} className="space-y-5">
              <p className="text-[0.6875rem] font-sans font-medium uppercase tracking-[0.18em] text-[#8B95A8]">
                <span className="mr-2 text-[#A483FE]">•</span>
                How to launch
              </p>
              <h2
                ref={headingRef}
                className="max-w-lg text-3xl font-heading font-medium leading-[1.12] tracking-tight text-[#0a143b] md:text-4xl lg:text-[2.5rem] lg:leading-[1.1]"
              >
                <span data-split>From idea to first bind, </span>
                <span data-split className="text-[#4F63E8]">
                  Three
                </span>
                <span data-split> steps</span>
              </h2>
              <p
                ref={descRef}
                className="max-w-md font-sans text-sm font-regular leading-[1.5] text-[#50617a] md:text-[1.125rem]"
              >
                Launching a brokerage used to be hard. We make it easier with ready
                infrastructure and trusted partners.
              </p>
            </div>

            <div className="border-t border-[#E5E7EB]">
              {launchSteps.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className="block w-full text-left"
                  >
                    <div
                      className={`transition-all duration-300 ${isActive ? "h-1 bg-[#4F63E8]" : "h-px bg-[#E5E7EB]"
                        }`}
                    />
                    <div className="py-6">
                      <p
                        className={`text-[0.6875rem] font-sans font-medium uppercase tracking-[0.16em] ${isActive ? "text-[#4F63E8]" : "text-[#8B95A8]"
                          }`}
                      >
                        {step.label}
                      </p>
                      <p
                        className={`mt-2 text-lg font-heading font-medium leading-snug md:text-xl ${isActive ? "text-[#0a143b]" : "text-[#50617a]"
                          }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative mx-auto aspect-[1.05/1] w-full max-w-[34rem]">
            <Image className="w-full h-full object-contain" src="/images/startups/step1.png" alt="Launch" width={500} height={500} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Launch;
