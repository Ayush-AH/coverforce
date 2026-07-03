import Image from "next/image";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import HeroReveal from "@/components/common/HeroReveal";
import EyebrowPill from "@/components/common/EyebrowPill";

const Hero = () => {
  return (
    <section className="relative h-svh min-h-svh overflow-hidden text-white">
      <Image
        src="/images/careers/careers-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />

      <Container
        borderColor="#FFFFFF33"
        className="relative flex h-svh min-h-svh items-center justify-center"
      >
        <HeroReveal className="flex max-w-4xl flex-col items-center text-center">
          <EyebrowPill surface="dark" className="mx-auto mb-0">
            Careers
          </EyebrowPill>

          <h1 className="mt-4 text-4xl font-heading font-normal leading-[1.08] tracking-tight md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
          Join a team of 
            <br />
            Industry Experts
          </h1>

          <div className="mt-10 md:mt-12">
            <Button href="/contact" balanced surface="on-dark">
            Explore open positions
            </Button>
          </div>
        </HeroReveal>
      </Container>
    </section>
  );
};

export default Hero;
