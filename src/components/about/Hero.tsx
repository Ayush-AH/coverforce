import Image from "next/image";
import Container from "@/components/common/Container";
import HeroReveal from "@/components/common/HeroReveal";

const Hero = () => {
  return (
    <section className="relative h-svh min-h-svh overflow-hidden text-white">
      <Image
        src="/images/about/about.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/10"
        aria-hidden
      />

      <Container
        borderColor="#FFFFFF33"
        className="relative flex h-svh min-h-svh items-end pb-14 md:pb-20 lg:pb-24"
      >
        <HeroReveal className="max-w-xl text-left md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-3xl font-heading font-normal leading-[1.12] tracking-tight md:text-4xl lg:text-5xl xl:text-[3.25rem] xl:leading-[1.08]">
            Building intelligent infrastructure for commercial insurance distribution.
          </h1>
        </HeroReveal>
      </Container>
    </section>
  );
};

export default Hero;
