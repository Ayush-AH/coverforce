'use client'
import Image from "next/image";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import HeroReveal from "@/components/common/HeroReveal";
import EyebrowPill from "@/components/common/EyebrowPill";
import { GradFlow } from 'gradflow'

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-white text-[#0a143b]">
      <Container borderColor="#53535380" borderBottom={true}>
        <div className="grid h-screen grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <HeroReveal className="flex h-full flex-col justify-center space-y-8">
            <EyebrowPill surface="light">Developers</EyebrowPill>
            <h1 className="max-w-xl text-3xl font-heading font-normal tracking-normal text-[#0a143b] md:text-4xl lg:text-[3.5rem] lg:leading-none">
              Embed commercial insurance into any product
            </h1>
            <p className="max-w-sm font-heading text-sm font-regular leading-relaxed text-[#444444]  md:text-sm">One API for 40+ carriers, AI-powered quoting, binding, and policy management so you can add commercial insurance without becoming an insurance company.</p>

            <div className="flex flex-wrap gap-4">
              <Button href="/solutions/startups" balanced>
                Apply to Start Up Program
              </Button>
              <Button href="#program-overview" balanced variant="secondary">
                How Program Works
              </Button>
            </div>
          </HeroReveal>

          <div className="relative flex items-center justify-center">
            <Image
              src="/images/solution/developers.svg"
              alt="CoverForce startups program"
              width={1200}
              height={900}
              className="h-auto w-full object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </Container>
      <div className="absolute top-0 right-0 z-0 h-full w-[50vw]">
        <GradFlow
          config={{
            color1: { r: 20, g: 28, b: 55 },
            color2: { r: 129, g: 64, b: 255 },
            color3: { r: 81, g: 0, b: 255 },
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
