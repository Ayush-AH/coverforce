"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

gsap.registerPlugin(ScrollTrigger);

type AudienceCard = {
  title: string;
  description: string;
  image: string;
};

const audienceCards: AudienceCard[] = [
  {
    title: "STEALTH OR FUNDED TEAMS",
    description:
      "You're building quietly, backed by investors, or part of a trusted accelerator program.",
    image: "/images/startups/teams.png",
  },
  {
    title: "STUDIO-BUILT COMPANIES",
    description:
      "Your company started inside a venture studio, foundry, or company builder and is now ready to launch or grow.",
    image: "/images/startups/companies.png",
  },
  {
    title: "NEW BROKERAGES",
    description:
      "You're starting a brokerage, writing your first policies, or growing an early book of business.",
    image: "/images/startups/brokerages.png",
  },
];

const REVEAL_EASE = "power3.out";

const WhosFor = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
    descRef,
    theme: "dark",
  });

  useGSAP(
    () => {
      const grid = cardsGridRef.current;
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (!grid || !cards.length) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, x: 72, force3D: true });
      });

      const st = ScrollTrigger.create({
        trigger: grid,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: REVEAL_EASE,
            onComplete: () => gsap.set(cards, { clearProps: "transform" }),
          });
        },
      });

      const lenis = window.lenis;
      const onLenisScroll = () => ScrollTrigger.update();
      lenis?.on("scroll", onLenisScroll);

      return () => {
        lenis?.off("scroll", onLenisScroll);
        st.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-[#121C49] text-white">
      <Container borderColor="#FFFFFF33">
        <div className="flex flex-col gap-10 py-16 md:gap-12 md:py-20 lg:gap-14 lg:py-24">
          <div
            ref={headerRef}
            className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start lg:justify-between lg:gap-x-12 lg:gap-y-5"
          >
            <h2
              ref={headingRef}
              className="order-1 max-w-sm text-2xl font-heading font-regular leading-[1.15] tracking-tight text-[#9AA8BC] sm:text-3xl md:text-4xl lg:col-start-1 lg:row-start-1 lg:text-3xl lg:leading-[1.15]"
            >
              <span data-split>Built for founders who are </span>
              <span
                data-split
                className="bg-linear-to-r from-[#A483FE] via-[#8B7CFF] to-[#C4B5FF] bg-clip-text text-transparent"
              >
                serious
              </span>
              <span data-split> about insurance.</span>
            </h2>

            <div className="order-2 flex max-w-md flex-col items-start justify-end gap-6 text-left lg:col-start-2 lg:row-start-1 lg:ml-auto">
              <p
                ref={descRef}
                className="font-sans font-regular text-sm leading-[1.4] text-[#D1D1D1] md:text-[1.125rem]"
              >
                If you meet the criteria, apply below.
              </p>
            </div>

            <div className="order-3 lg:col-start-1 lg:row-start-2">
              <Button href="/contact" surface="on-dark">
                Apply to Start Up Program
              </Button>
            </div>
          </div>

          <div ref={cardsGridRef} className="grid gap-4 md:grid-cols-3 md:gap-5">
            {audienceCards.map((card, index) => (
              <article
                key={card.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="flex min-h-[22rem] flex-col p-6 will-change-transform md:min-h-[24rem] md:p-8"
                style={{ backgroundColor: "#FAFAFA" }}
              >
                <p
                  className="text-sm font-mono font-medium uppercase"
                  style={{ color: "#3933A1" }}
                >
                  {card.title}
                </p>
                <p
                  className="mt-4 font-sans text-sm font-regular leading-relaxed md:text-sm"
                  style={{ color: "#3A34A5" }}
                >
                  {card.description}
                </p>
                <div className="relative mt-auto flex items-end justify-center pt-10">
                  <Image
                    src={card.image}
                    alt=""
                    width={280}
                    height={200}
                    className="h-auto w-full max-w-[14rem] object-contain object-bottom md:max-w-[19rem]"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhosFor;
