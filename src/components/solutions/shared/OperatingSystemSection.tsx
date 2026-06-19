"use client";

import { useRef, type ComponentType, type ReactNode } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";
import OperatingPlatformMock from "@/components/solutions/brokers/OperatingPlatformMock";
import OperatingAiMock from "@/components/solutions/brokers/OperatingAiMock";
import OperatingVisibilityMock from "@/components/solutions/brokers/OperatingVisibilityMock";

export type OperatingRow = {
  id: string;
  heading: string;
  description: string;
  stat: string;
  statLabelLines: [string, string];
  Mock?: ComponentType;
};

export type OperatingSystemConfig = {
  sectionTitle: ReactNode;
  sectionDescription: string;
  ctaHref?: string;
  ctaLabel?: string;
  statColor?: string;
  rows: OperatingRow[];
};

const DEFAULT_MOCKS: Record<string, ComponentType> = {
  platform: OperatingPlatformMock,
  ai: OperatingAiMock,
  visibility: OperatingVisibilityMock,
};

export default function OperatingSystemSection({
  sectionTitle,
  sectionDescription,
  ctaHref = "/",
  ctaLabel = "Start a quote",
  statColor = "#33259F",
  rows,
}: OperatingSystemConfig) {
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
    <section ref={sectionRef} className="min-h-screen bg-white text-[#0a143b]">
      <Container borderColor="#53535380" borderBottom={true}>
        <div className="py-16 md:py-20 lg:py-24">
          <div
            ref={headerRef}
            className="mb-24 grid gap-8 lg:grid-cols-2 lg:items-start lg:justify-between lg:gap-12"
          >
            <div className="flex flex-col justify-end space-y-5">
              <h2
                ref={headingRef}
                className="max-w-md text-3xl font-heading font-medium leading-[1.12] tracking-tight text-[#BCC5D6] md:text-4xl lg:text-[1.625rem] lg:leading-[1.12]"
              >
                <span data-split>{sectionTitle}</span>
              </h2>
              <Button href={ctaHref} variant="outline">
                {ctaLabel}
              </Button>
            </div>

            <div className="flex max-w-md flex-col items-end gap-6 text-left lg:ml-auto">
              <p
                ref={descRef}
                className="font-sans font-regular text-sm leading-[1.4] text-[#50617a] md:text-[1.125rem]"
              >
                {sectionDescription}
              </p>
            </div>
          </div>

          <div className="space-y-36">
            {rows.map((row) => {
              const Mock = row.Mock ?? DEFAULT_MOCKS[row.id];

              return (
                <div
                  key={row.id}
                  className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20"
                >
                  <div className="flex flex-col justify-center">
                    <h3 className="max-w-lg text-2xl font-heading font-regular leading-[1.2] tracking-tight text-[#444444] md:text-3xl lg:max-w-md lg:text-[1.75rem] lg:leading-[1.25]">
                      {row.heading}
                    </h3>
                    <p className="mt-8 max-w-sm font-heading text-sm font-regular leading-relaxed text-[#444444] md:mt-6 md:text-sm">
                      {row.description}
                    </p>
                    <div className="mt-10 flex items-center gap-4 md:mt-8 md:gap-5">
                      <span
                        className="text-2xl font-heading font-regular leading-[1.2] tracking-tight md:text-3xl lg:text-[1.75rem] lg:leading-[1.25]"
                        style={{ color: statColor }}
                      >
                        {row.stat}
                      </span>
                      <span
                        className="font-heading text-sm font-medium leading-[1.2] md:text-xs"
                        style={{ color: statColor }}
                      >
                        {row.statLabelLines[0]}
                        <br />
                        {row.statLabelLines[1]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    {Mock ? <Mock /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
