import Container from "../common/Container";
import SectionRadialGlow from "../common/SectionRadialGlow";
import ContactMap from "@/components/contact/ContactMap";

const Hero = () => {
  return (
    <section className="relative bg-[#151f4d] text-white">
      <Container borderColor="#FFFFFF33" className="relative">
        <SectionRadialGlow className="absolute !opacity-80 left-1/2 top-[18%] z-0 w-[100vw] max-w-[80rem] -translate-x-1/2 blur-[5.5rem] md:top-[18%] md:w-[95vw]" />
        <div className="relative min-h-[calc(100svh-2rem)]" aria-hidden />
      </Container>
      <ContactMap />
    </section>
  );
};

export default Hero;
