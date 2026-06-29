'use client'
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import HeroReveal from "@/components/common/HeroReveal";
import EyebrowPill from "@/components/common/EyebrowPill";
import ApiEndpointSummaryMock from "@/components/solutions/carrier/ApiEndpointSummaryMock";
import { GradFlow } from 'gradflow'

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-white text-[#0a143b]">
      <Container borderColor="#53535380" borderBottom={true}>
        <div className="grid h-screen grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <HeroReveal className="flex flex-col justify-center space-y-8">
            <EyebrowPill surface="light">Carrier and MGAs</EyebrowPill>
            <h1 className="max-w-xl text-3xl font-heading font-normal leading-[1.12] tracking-tight text-[#0a143b] md:text-4xl lg:text-[3.5rem] lg:leading-[1.1]">
            Be present at the moment agents quote
              </h1>
              <p className="max-w-sm font-heading text-sm font-regular leading-relaxed text-[#444444]  md:text-sm">Brokers are moving to multi-carrier platforms. CoverForce puts your products in the quoting flow, reaching 15,000+ agencies through one integration — live in 30 days.</p>
            <div className="flex flex-wrap gap-4">
              <Button href="/solutions/startups" balanced>
                Apply to Start Up Program
              </Button>
              <Button href="#program-overview" balanced variant="secondary">
                How Program Works
              </Button>
            </div>
          </HeroReveal>

          <div className="relative z-10 flex items-center justify-center">
            <div className="w-full max-w-[380px] md:max-w-[420px]">
              <ApiEndpointSummaryMock />
            </div>
          </div>
        </div>
      </Container>
      <div className="absolute top-0 right-0 z-0 h-full w-[50vw]">
        <GradFlow
          config={{
            color1: { r: 69, g: 65, b: 205 },
            color2: { r: 53, g: 45, b: 147 },
            color3: { r: 18, g: 28, b: 73 },
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
