import Image from "next/image";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import StartupRecentActivityCard from "@/components/solutions/startups/StartupRecentActivityCard";
import MarqueeLine from "../wholesalers/MarqueeLine";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-white text-[#0a143b]">
      <Container borderColor="#53535380">
        <div className="relative z-10 grid h-screen grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-8">
            <h1 className="max-w-xl text-3xl font-heading font-normal tracking-normal text-[#0a143b] md:text-4xl lg:text-6xl lg:leading-none">
              The faster way to build a modern brokerage
            </h1>
            <div className="flex flex-wrap gap-4">
              <Button href="/solutions/startups" variant="outline">
                Apply to Start Up Program
              </Button>
              <Button href="#program-overview" variant="outline">
                How Program Works
              </Button>
            </div>
          </div>

          <div className="relative z-10 flex h-full w-full items-center justify-center lg:justify-end">
            <StartupRecentActivityCard />
          </div>
        </div>
      </Container>
      <MarqueeLine className="!py-24 !pt-10" />
      <Image
        src="/images/solution/startup-bg.png"
        alt="CoverForce startups program"
        width={1200}
        height={900}
        className="absolute top-0 right-0 z-0 h-full w-[50vw] object-cover"
        priority
      />
    </section>
  );
};

export default Hero;
