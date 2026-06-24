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
    label: "Quote & bind",
    title: (
      <>
        Quote, compare, and bind
        <br />
        in one workflow.
      </>
    ),
    description:
      "Submit to 40+ carriers from a single application, compare quotes side by side, and bind without leaving the platform.",
  },
  {
    type: "stat",
    value: "40+",
    label: "Carriers in one workflow",
  },
  {
    type: "stat",
    value: "500%",
    label: "More apps per underwriter",
  },
  {
    type: "stat",
    value: "<60s",
    label: "Quote to bind",
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
        src="/images/product/quotes-bg.svg"
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
        ariaLabel="Quote hero slides"
      />
    </section>
  );
};

export default Hero;
