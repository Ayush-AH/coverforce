"use client";

import Image from "next/image";
import { useRef } from "react";
import Container from "@/components/common/Container";
import EyebrowPill from "@/components/common/EyebrowPill";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

type CultureItem = {
  src: string;
  alt: string;
  caption: string;
  placement: string;
  imageHeight?: "large" | "medium";
};

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
    caption: "96% of employees report a strong sense of acceptance.",
    placement: "lg:col-span-7 lg:col-start-6 lg:row-span-6 lg:row-start-1",
    imageHeight: "large",
  },
  {
    src: "/images/careers/image3.png",
    alt: "Team outdoor adventure",
    caption: "A culture that inspires pride and innovation.",
    placement: "lg:col-span-6 lg:row-span-3 lg:row-start-7",
    imageHeight: "medium",
  },
  {
    src: "/images/careers/image4.png",
    alt: "Global team gathering outdoors",
    caption:
      "Brings our global team together to connect, celebrate, and align around the future we're building.",
    placement: "lg:col-span-6 lg:col-start-7 lg:row-span-3 lg:row-start-9",
    imageHeight: "medium",
  },
];

const bottomCulturePair = {
  left: {
    src: "/images/careers/image5.png",
    alt: "Diverse team group photo",
    caption:
      "94% of employees say they're proud to tell others where they work.",
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
  "max-w-md font-heading text-sm font-regular leading-[1.45] text-[#3F3F3F] md:text-[0.9375rem]";

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
      <div className="flex flex-col gap-4 md:gap-5 lg:col-span-5 lg:gap-0">
        <div className="sm:min-h-[22rem] md:min-h-[26rem] lg:flex lg:min-h-[32rem] lg:items-end">
          <CultureImage item={left} className="w-full" />
        </div>
        <p className={`${captionClassName} lg:mt-4`}>{left.caption}</p>
      </div>

      <div className="flex flex-col gap-4 md:gap-5 lg:col-span-4 lg:col-start-6 lg:gap-0">
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
  const imageWrapClass = item.imageHeight
    ? IMAGE_HEIGHTS[item.imageHeight]
    : "relative min-h-[14rem] w-full flex-1 overflow-hidden rounded-xl lg:min-h-0";

  return (
    <article
      className={`flex min-h-0 flex-col gap-4 md:gap-5 ${item.imageHeight ? "" : "h-full"} ${className}`}
    >
      <div className={imageWrapClass}>
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
      <p className="max-w-md shrink-0 font-heading text-sm font-regular leading-[1.45] text-[#3F3F3F] md:text-[0.9375rem]">
        {item.caption}
      </p>
    </article>
  );
}

const OurCluture = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
    descRef,
  });

  return (
    <section ref={sectionRef} className="bg-white text-[#0a143b]">
      <Container borderColor="#53535333">
        <div className="py-16 md:py-20 lg:py-24">
          <div
            ref={headerRef}
            className="grid gap-8 lg:grid-cols-2 lg:items-start lg:justify-between lg:gap-12"
          >
            <div className="max-w-xl">
              <EyebrowPill surface="light" className="mb-0">
                Our Culture
              </EyebrowPill>

              <h2
                ref={headingRef}
                className="mt-4 text-3xl font-heading font-regular leading-[1.12] tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
              >
                <span data-split>Driven by People,</span>
                <br />
                <span data-split>Powered by Purpose</span>
              </h2>
            </div>

            <div className="max-w-md lg:ml-auto">
              <p
                ref={descRef}
                className="font-sans font-regular text-sm leading-[1.4] text-[#3F3F3F] md:text-[1.125rem]"
              >
                Our values shape our culture, decisions, and the impact we create
                every day.
              </p>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 md:mt-16 md:gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-10 xl:gap-x-8">
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