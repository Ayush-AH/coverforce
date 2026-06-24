"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import {
  HeroCarouselNav,
  useHeroCarousel,
  type HeroSlide,
} from "@/components/product/HeroCarousel";

const SLIDES: HeroSlide[] = [
  {
    type: "copy",
    label: "Intelligence",
    title: (
      <>
        See appetite before
        <br />
        you submit.
      </>
    ),
    description:
      "Submission intelligence, appetite matching, and carrier analytics — powered by proprietary data no other platform has.",
  },
  {
    type: "stat",
    value: "95%+",
    label: "Pre-fill accuracy",
  },
  {
    type: "stat",
    value: "140K+",
    label: "Carrier interactions",
  },
  {
    type: "stat",
    value: "100%",
    label: "Pipeline visibility",
  },
];

const Hero = () => {
  const { activeIndex, handleSelectSlide, track } = useHeroCarousel(SLIDES);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121C49] pb-24 text-white md:pb-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(49, 78, 155, 0.55) 0%, rgba(18, 28, 73, 0.92) 52%, #121C49 100%)",
        }}
        aria-hidden
      />

      <Image
        src="/images/product/intelligence-bg.svg"
        alt=""
        width={1440}
        height={400}
        className="pointer-events-none absolute -bottom-16 left-0 z-[1] h-auto w-full"
        priority
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-3xl -translate-y-6 flex-col items-center px-6 py-16 text-center md:-translate-y-10 md:py-20">
          {track}
        </div>
      </Container>

      <HeroCarouselNav
        count={SLIDES.length}
        activeIndex={activeIndex}
        onSelect={handleSelectSlide}
        ariaLabel="Intelligence hero slides"
      />
    </section>
  );
};

export default Hero;
