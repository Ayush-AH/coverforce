"use client";

import { useRef, useState } from "react";
import Container from "@/components/common/Container";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";
import Image from "next/image";

type LaunchStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
};

const launchSteps: LaunchStep[] = [
  {
    id: "license",
    label: "STEP 01",
    title: "Get Licensed",
    description: "Secure producer and entity licenses with guided checklists.",
    image: "/images/startups/step1.png",
  },
  {
    id: "appointments",
    label: "STEP 02",
    title: "Access the Market",
    description: "Accelerate carrier appointments through our partner network.",
    image: "/images/startups/step2.png",
  },
  {
    id: "api",
    label: "STEP 03",
    title: "Connect the API",
    description: "Plug into CoverForce and start quoting in days, not months.",
    image: "/images/startups/step3.png",
  },
];

const Launch = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const active = launchSteps[activeStep];

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
    descRef,
  });

  return (
    <section id="launch" ref={sectionRef} className="bg-white text-[#0a143b]">
      <Container borderColor="#53535380">
        <div ref={headerRef} className="space-y-3 py-10 lg:hidden">
          <h2
            ref={headingRef}
            className="max-w-xs text-2xl font-heading font-regular leading-[1.2] tracking-tight text-[#0a143b]"
          >
            <span data-split>From idea to first bind Three steps</span>
          </h2>
          <p
            ref={descRef}
            className="max-w-sm font-sans text-sm font-regular leading-relaxed text-[#3E3E3E]"
          >
            Launching a brokerage used to be hard. We make it easier with ready
            infrastructure and trusted partners.
          </p>
        </div>

        {/* Mobile: step → image, stacked */}
        <div className="flex flex-col gap-12 pb-10 lg:hidden">
          {launchSteps.map((step) => (
            <div key={step.id} className="flex flex-col gap-5">
              <div className="border-t border-[#E5E7EB] py-4">
                <p className="font-mono text-sm font-regular leading-relaxed text-[#151f4d]">
                  {step.label}
                </p>
                <p className="mt-1 font-sans text-sm font-regular leading-relaxed text-[#151f4d]">
                  {step.title}
                </p>
                <p className="mt-1.5 font-sans text-sm font-regular leading-relaxed text-[#6B7280]">
                  {step.description}
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-md bg-[#F5F7FA]">
                <Image
                  className="h-auto w-full object-contain"
                  src={step.image}
                  alt={step.title}
                  width={1200}
                  height={900}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: click tabs to switch image */}
        <div className="hidden grid-cols-7 items-stretch gap-16 py-24 xl:gap-23 lg:grid">
          <div className="flex h-full min-h-0 flex-col lg:col-span-3">
            <div className="shrink-0 space-y-5">
              <h2 className="max-w-xs text-[1.75rem] font-heading font-regular leading-tight tracking-tight text-[#0a143b]">
                <span data-split>From idea to first bind Three steps</span>
              </h2>
              <p className="max-w-sm font-sans text-sm font-regular leading-relaxed text-[#3E3E3E]">
                Launching a brokerage used to be hard. We make it easier with ready
                infrastructure and trusted partners.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Launch steps"
              aria-orientation="vertical"
              className="mt-auto flex w-full max-w-sm flex-col gap-5 pt-10"
            >
              {launchSteps.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <button
                    key={step.id}
                    type="button"
                    role="tab"
                    id={`launch-tab-${step.id}`}
                    aria-selected={isActive}
                    aria-controls="launch-panel"
                    onClick={() => setActiveStep(index)}
                    className={`group flex w-full items-start gap-5 rounded-xl border border-[#E5E7EB] px-4 py-3.5 text-left outline-none transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-[#0a143b]/25 focus-visible:ring-offset-2 ${
                      isActive
                        ? "bg-white shadow-[0_1px_2px_rgba(10,20,59,0.04)]"
                        : "bg-transparent hover:bg-[#F8F9FC]"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full font-sans text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-[#0a143b] text-white"
                          : "bg-[#ECEEF2] text-[#9CA3AF] group-hover:bg-[#E5E7EB] group-hover:text-[#6B7280]"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-sans text-base leading-snug transition-colors duration-300 ${
                          isActive
                            ? "font-semibold text-[#0a143b]"
                            : "font-regular text-[#9CA3AF] group-hover:text-[#6B7280]"
                        }`}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`mt-1 block font-sans text-sm leading-relaxed transition-colors duration-300 ${
                          isActive
                            ? "text-[#4B5563]"
                            : "text-[#B0B5BF] group-hover:text-[#9CA3AF]"
                        }`}
                      >
                        {step.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            role="tabpanel"
            id="launch-panel"
            aria-labelledby={`launch-tab-${active.id}`}
            className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-md bg-[#F5F7FA] lg:col-span-4"
          >
            <div className="relative h-full w-full">
              {launchSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`transition-opacity duration-500 ease-out ${
                    activeStep === index
                      ? "relative h-full opacity-100"
                      : "pointer-events-none absolute inset-0 opacity-0"
                  }`}
                  aria-hidden={activeStep !== index}
                >
                  <Image
                    className="h-auto w-full object-contain"
                    src={step.image}
                    alt={step.title}
                    width={1200}
                    height={900}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Launch;
