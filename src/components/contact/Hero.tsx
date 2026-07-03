import Image from "next/image";
import Container from "../common/Container";
import SectionRadialGlow from "../common/SectionRadialGlow";

const Hero = () => {
  return (
    <section className="relative  bg-[#151f4d] text-white">
      <Container borderColor="#FFFFFF33" className="relative">
        <SectionRadialGlow className="absolute !opacity-80 left-1/2 top-[18%] z-0 w-[100vw] max-w-[80rem] -translate-x-1/2 blur-[5.5rem] md:top-[18%] md:w-[95vw]" />
        <div className="relative min-h-[calc(100svh-2rem)]" aria-hidden />
      </Container>
      <Image
          src="/images/map.svg"
          alt=""
          fill
          priority
          className="absolute z-10 top-0 left-0 w-full h-auto object-contain"
          sizes="100vw"
        />
    </section>
  );
};

export default Hero;
