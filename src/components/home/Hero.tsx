import React from "react";
import Button from "@/components/common/Button";
import Container from "../common/Container";
import SectionRadialGlow from "../common/SectionRadialGlow";

type StatItem = {
  value: string;
  label: string;
};

const stats: StatItem[] = [
  { value: "140K+", label: "AI-labeled Carrier Interactions" },
  { value: "40+", label: "Carrier & MGA Integrations" },
  { value: "15,000+", label: "Agencies on Platform" },
  { value: "$500M+", label: "Gross Quoted Premium" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-2.5 font-mono text-sm font-medium uppercase tracking-[0.14em] text-white/70">
      <span
        className="inline-block size-2 shrink-0 rounded-full bg-linear-to-r from-[#FFFFFF] to-[#AFB3EF]"
        aria-hidden
      />
      {children}
    </p>
  );
}

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#141E4B] text-white">
      <Container borderColor="#FFFFFF1A">
        <div className="relative z-10 flex min-h-[calc(100svh-4.5rem)] flex-col justify-between py-16 md:py-20 lg:py-24">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <Eyebrow>The AI distribution flow</Eyebrow>

            <h1 className="mt-6 max-w-4xl text-3xl font-heading font-regular  leading-[1.1] tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
              AI-Native Insurance <br /> Distribution Platform
            </h1>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button href="/" variant="primary">
                Request demo
              </Button>
              <Button href="/" variant="secondary">
                Start a quote
              </Button>
            </div>
          </div>

          <div className="mt-16 border-t border-white/15 pt-10 md:mt-20 md:pt-12">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:flex md:divide-x md:divide-white/15">
              {stats.map((stat) => (
                <li
                  key={stat.label}
                  className="flex flex-col items-center gap-2 md:flex-1 md:px-8 lg:px-10 first:md:pl-0 last:md:pr-0"
                >
                  <p className="text-2xl font-heading font-regular tracking-tight md:text-3xl lg:text-5xl">
                    {stat.value}
                  </p>
                  <p className="text-xs font-sans text-center leading-relaxed text-white/55 md:text-lg">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative h-[min(420px,55vw)] w-full md:h-[480px] lg:h-[500px]">
          <SectionRadialGlow className="absolute left-1/2 top-20 z-0 -translate-x-1/2 -translate-y-1/3 md:top-20" />
          <div className="relative z-10 h-full w-full" aria-label="Partner network" />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
