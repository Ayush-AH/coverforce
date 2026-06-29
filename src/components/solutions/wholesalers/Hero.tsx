'use client'
import Image from "next/image";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import HeroReveal from "@/components/common/HeroReveal";
import EyebrowPill from "@/components/common/EyebrowPill";
import BrokerCodeControlsMock from "@/components/solutions/wholesalers/BrokerCodeControlsMock";
import { MarqueeRow } from "@/components/solutions/wholesalers/MarqueeLine";
import { GradFlow } from 'gradflow'
const Hero = () => {
  return (
    <section className="relative h-svh bg-white text-[#0a143b] overflow-hidden">
      <Container borderColor="#53535380" className="relative z-10 flex h-full flex-col">
        <div className="grid h-full min-h-0 flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <HeroReveal className="flex h-full flex-col justify-center space-y-8">
            <EyebrowPill surface="light">Wholesalers</EyebrowPill>
            <h1 className="max-w-xl text-3xl font-heading font-normal leading-[1.12] tracking-tight text-[#0a143b] md:text-4xl lg:text-[3.5rem] lg:leading-[1.1]">
            Scale your wholesale operation from one platform
              </h1>
              <p className="max-w-sm font-heading text-sm font-regular leading-relaxed text-[#444444]  md:text-sm">CoverForce gives early-stage startups the infrastructure, carriers, and ecosystem support to go from zero to launch in days.</p>
            <div className="flex flex-wrap gap-4">
              <Button href="/solutions/startups" balanced>
                Apply to Start Up Program
              </Button>
              <Button href="#program-overview" balanced variant="secondary">
                How Program Works
              </Button>
            </div>
          </HeroReveal>

          <div className="relative z-10 flex h-full min-h-0 w-full items-center justify-center">
            <BrokerCodeControlsMock />
          </div>
        </div>

        <div className="relative z-10 shrink-0 pb-6 md:pb-8">
          <MarqueeRow />
        </div>
      </Container>
      <div className="absolute top-0 right-0 z-0 h-full w-[50vw]">
      <GradFlow
      config={{
        color1: { r: 0, g: 69, b: 255 },
        color2: { r: 54, g: 182, b: 255 },
        color3: { r: 211, g: 241, b: 255 },
        speed: 0.4,
        scale: 1,
        type: 'stripe',
        noise: 0.08
      }}
      />
        <div className="absolute transform-origin-bottom-right -rotate-35 -bottom-50 -right-45 z-0 h-40 w-full bg-white"></div>
      </div>
      
    </section>
  );
};

export default Hero;
