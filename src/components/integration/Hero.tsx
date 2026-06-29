"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import HeroReveal from "@/components/common/HeroReveal";
import EyebrowPill from "@/components/common/EyebrowPill";

// Lazy-load – R3F must never run on the server
const IntegrationWaveCanvas = dynamic(
  () => import("@/components/integration/IntegrationWavePlane").then((m) => ({ default: m.IntegrationWaveCanvas })),
  { ssr: false }
);

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#121C49] text-white">
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 38%, rgba(49, 78, 155, 0.55) 0%, rgba(18, 28, 73, 0.92) 52%, #121C49 100%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[45%] w-full"
        aria-hidden
      >
        <IntegrationWaveCanvas className="h-full w-full" />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/developers/display-logo.svg"
            alt="CoverForce"
            width={320}
            height={320}
            className="w-16 opacity-95 md:w-20 lg:w-24"
          />
        </div>
      </div>

      <Container className="relative z-10">
        <div className="flex min-h-[130vh] flex-col">
          <HeroReveal className="flex flex-1 flex-col items-center justify-center px-6 pb-56 text-center md:pb-72">
            <EyebrowPill surface="dark" className="mx-auto">
              AI-Powered Insurance Distribution
            </EyebrowPill>

            <h1 className="max-w-4xl text-3xl font-heading font-normal leading-[1.15] tracking-tight md:text-4xl lg:text-5xl xl:text-5xl">
              One API. <br /> The entire market.
            </h1>

            <p className="mx-auto mt-8 max-w-xl font-sans text-sm font-regular leading-relaxed text-white/85 md:text-sm">
              Real-time visibility across submissions, quotes, binds, and carrier
              performance with enterprise controls for broker codes, commissions, and
              network oversight.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button href="#" balanced>
                Request a demo
              </Button>
              <Button href="/integration" balanced variant="secondary" surface="on-dark">
                View integrations
              </Button>
            </div>
          </HeroReveal>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
