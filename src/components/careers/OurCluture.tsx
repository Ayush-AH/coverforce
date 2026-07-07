"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/common/Container";
import EyebrowPill from "@/components/common/EyebrowPill";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

gsap.registerPlugin(ScrollTrigger);

type CultureItem = {
  src: string;
  alt: string;
  caption: string;
  placement: string;
  imageHeight?: "large" | "medium";
};

const CULTURE_PARALLAX_TRAVEL = [
  { start: -52, end: 78 },
  { start: 64, end: -72 },
  { start: -36, end: 72 },
  { start: 72, end: -88 },
  { start: -46, end: 62 },
  { start: 50, end: -56 },
] as const;

const IMAGE_HEIGHTS = {
  large:
    "relative h-[18rem] w-full overflow-hidden rounded-xl sm:h-[22rem] md:h-[26rem] lg:h-[32rem]",
  medium:
    "relative h-[16rem] w-full overflow-hidden rounded-xl sm:h-[18rem] md:h-[22rem] lg:h-[26rem]",
} as const;

const cultureItems: CultureItem[] = [
  {
    src: "/images/careers/image1.png",
    alt: "Team meeting collaboration",
    caption:
      "3,000+ employees across 170 countries working together as one team.",
    placement: "lg:col-span-5 lg:row-span-6",
    imageHeight: "large",
  },
  {
    src: "/images/careers/image2.png",
    alt: "Colleagues discussing work",
    caption: "Brings our global team together to connect, celebrate, and align around the future we’re building.",
    placement: "lg:col-span-7 lg:col-start-6 lg:row-span-6 lg:row-start-1",
    imageHeight: "large",
  },
  {
    src: "/images/careers/image3.png",
    alt: "Team outdoor adventure",
    caption: "96% of employees report a strong sense of acceptance.",
    placement: "lg:col-span-6 lg:row-span-3 lg:row-start-7 lg:mt-10 xl:mt-12",
    imageHeight: "medium",
  },
  {
    src: "/images/careers/image4.png",
    alt: "Global team gathering outdoors",
    caption:
      "94% of employees say they're proud to tell others where they work.",
    placement: "lg:col-span-6 lg:col-start-7 lg:row-span-3 lg:row-start-9",
    imageHeight: "medium",
  },
];

const bottomCulturePair = {
  left: {
    src: "/images/careers/image5.png",
    alt: "Diverse team group photo",
    caption:
      "A culture that inspires pride and innovation.",
    placement: "",
    imageHeight: "large" as const,
  },
  right: {
    src: "/images/careers/image6.png",
    alt: "Team in modern office space",
    caption: "Where talent thrives and ideas come to life.",
    placement: "",
    imageHeight: "medium" as const,
  },
};

const captionClassName =
  "max-w-md font-heading text-2xl font-medium leading-[1.12] tracking-tight text-[#444444] md:text-3xl lg:text-[1.375rem] lg:leading-[1.12]";

function CultureImage({
  item,
  className = "",
}: {
  item: CultureItem;
  className?: string;
}) {
  const imageWrapClass = item.imageHeight
    ? IMAGE_HEIGHTS[item.imageHeight]
    : "relative min-h-[14rem] w-full overflow-hidden rounded-xl";

  return (
    <div className={`${imageWrapClass} ${className}`}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover"
        sizes={
          item.imageHeight
            ? "(max-width: 1024px) 100vw, 42vw"
            : "(max-width: 1024px) 100vw, 33vw"
        }
      />
    </div>
  );
}

function BottomCulturePair({
  left,
  right,
}: {
  left: CultureItem;
  right: CultureItem;
}) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:col-span-12 lg:row-start-12 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-4 xl:gap-x-8">
      <div className="culture-parallax-card flex flex-col gap-4 md:gap-5 lg:col-span-5 lg:gap-0">
        <div className="sm:min-h-[22rem] md:min-h-[26rem] lg:flex lg:min-h-[32rem] lg:items-end">
          <CultureImage item={left} className="w-full" />
        </div>
        <p className={`${captionClassName} lg:mt-4`}>{left.caption}</p>
      </div>

      <div className="culture-parallax-card flex flex-col gap-4 md:gap-5 lg:col-span-4 lg:col-start-6 lg:gap-0">
        <div className="sm:min-h-[22rem] md:min-h-[26rem] lg:flex lg:min-h-[32rem] lg:items-end">
          <CultureImage item={right} className="w-full" />
        </div>
        <p className={`${captionClassName} lg:mt-4`}>{right.caption}</p>
      </div>
    </div>
  );
}

function CultureCard({
  item,
  className = "",
}: {
  item: CultureItem;
  className?: string;
}) {
  return (
    <article
      className={`culture-parallax-card flex min-h-0 flex-col gap-4 md:gap-5 ${item.imageHeight ? "" : "h-full"} ${className}`}
    >
      <CultureImage item={item} />
      <p className={`${captionClassName} shrink-0`}>{item.caption}</p>
    </article>
  );
}

const OurCluture = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
    descRef,
  });

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (reducedMotion || isMobile) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        ".culture-parallax-card",
        grid,
      );
      const cleanups: Array<() => void> = [];

      cards.forEach((card, index) => {
        const travel =
          CULTURE_PARALLAX_TRAVEL[index] ?? CULTURE_PARALLAX_TRAVEL[0];

        gsap.set(card, { y: travel.start, force3D: true });

        const tween = gsap.to(card, {
          y: travel.end,
          ease: "none",
          force3D: true,
          overwrite: "auto",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        cleanups.push(() => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      });

      const lenis = window.lenis;
      const onLenisScroll = () => ScrollTrigger.update();
      lenis?.on("scroll", onLenisScroll);
      ScrollTrigger.refresh();

      return () => {
        lenis?.off("scroll", onLenisScroll);
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white text-[#0a143b]">
      <Container borderColor="#53535380">
        <div className="py-16 md:py-20 lg:py-24">
          <div
            ref={headerRef}
            className="grid gap-8 lg:grid-cols-2 lg:items-end lg:justify-between lg:gap-12"
          >
            <div className="flex flex-col items-start justify-end space-y-5">
              <EyebrowPill surface="light" className="mb-0">
                Our Culture
              </EyebrowPill>

              <h2
                ref={headingRef}
                className="max-w-md text-3xl font-heading font-medium leading-[1.12] tracking-tight text-[#9AA8BC] md:text-4xl lg:text-[1.625rem] lg:leading-[1.12]"
              >
                <span data-split>Driven by People,</span>
                <br />
                <span data-split>Powered by Purpose</span>
              </h2>
            </div>

            <div className="max-w-md text-left lg:ml-auto">
              <p
                ref={descRef}
                className="font-sans font-regular text-sm leading-[1.4] text-[#797979] md:text-[1.125rem]"
              >
                Our values shape our culture, decisions, and the impact we create
                every day.
              </p>
            </div>
          </div>

          <div
            ref={gridRef}
            className="mt-14 grid grid-cols-1 gap-10 md:mt-16 md:gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-10 xl:gap-x-8"
          >
            {cultureItems.map((item) => (
              <CultureCard
                key={item.src}
                item={item}
                className={item.placement}
              />
            ))}
            <BottomCulturePair
              left={bottomCulturePair.left}
              right={bottomCulturePair.right}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurCluture;