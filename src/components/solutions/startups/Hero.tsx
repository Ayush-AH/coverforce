'use client'
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import HeroReveal from "@/components/common/HeroReveal";
import EyebrowPill from "@/components/common/EyebrowPill";
import StartupRecentActivityCard from "@/components/solutions/startups/StartupRecentActivityCard";
import { MarqueeRow } from "@/components/solutions/wholesalers/MarqueeLine";
import { GradFlow } from 'gradflow'

const Hero = () => {
  return (
    <section className="relative h-svh overflow-hidden bg-white text-[#0a143b]">
      <Container borderColor="#53535380" className="relative z-10 flex h-full flex-col">
        <div className="grid h-full min-h-0 flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <HeroReveal className="flex h-full flex-col justify-center space-y-8">
            <EyebrowPill surface="light">Startups</EyebrowPill>
            <h1 className="max-w-xl text-3xl font-heading font-normal tracking-normal text-[#0a143b] md:text-4xl lg:text-[3.5rem] lg:leading-none">
              The faster way to build a modern brokerage
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
            <StartupRecentActivityCard />
          </div>
        </div>

        <div className="relative z-10 shrink-0 pb-6 md:pb-8">
          <MarqueeRow />
        </div>
      </Container>
      <div className="absolute top-0 right-0 z-0 h-full w-[50vw]">
        <GradFlow
          config={{
            color1: { r: 21, g: 75, b: 193 },
            color2: { r: 184, g: 122, b: 255 },
            color3: { r: 218, g: 202, b: 255 },
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
