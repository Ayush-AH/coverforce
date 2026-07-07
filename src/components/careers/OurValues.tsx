"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/common/Container";
import EyebrowPill from "@/components/common/EyebrowPill";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";
import {
  CARD_BACKGROUND_STYLES,
  type CardBackground,
} from "@/data/wayCardStyles";

gsap.registerPlugin(ScrollTrigger);

const WayCardDotGridScene = dynamic(
  () => import("@/components/home/WayCardDotGridScene"),
  { ssr: false, loading: () => null },
);

function useLazyInView<T extends HTMLElement>(rootMargin = "240px 0px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return { ref, visible };
}

type ValueCard = {
  id: string;
  label: string;
  body: string;
  background: CardBackground;
};

const VALUE_CARDS: ValueCard[] = [
  {
    id: "customer-obsessed",
    label: "Be Customer Obsessed",
    body: "We're insurance people who love delighting our customers—and their customers too.",
    background: "startup",
  },
  {
    id: "modern-simple",
    label: "Modern & Simple",
    body: "Insurance is simple in idea, complex in practice. We make it smarter and easier for people and businesses.",
    background: "wholesaler",
  },
  {
    id: "security-trust",
    label: "Build Security & Trust",
    body: "We earn trust through world-class security and engineering, ensuring carriers and customers can rely on us.",
    background: "developer",
  },
];

const CARD_HEIGHT = "min-h-[22rem] md:min-h-[29rem]";

function ValueCardItem({ card }: { card: ValueCard }) {
  const [hovered, setHovered] = useState(false);
  const { ref: cardRef, visible: inView } = useLazyInView<HTMLElement>();

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`values-card values-card-shell way-card-shell  group relative flex ${CARD_HEIGHT} flex-col overflow-hidden rounded-md`}
    >
      <div className="way-card-body values-card-body absolute inset-0 overflow-hidden rounded-md">
        <div
          className="absolute inset-0 rounded-md"
          style={{ background: CARD_BACKGROUND_STYLES[card.background] }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-md"
          aria-hidden
        >
          {inView ? <WayCardDotGridScene variant="dark" active={hovered} /> : null}
        </div>
      </div>

      <div className="values-card-content pointer-events-none relative z-10 flex w-full flex-1 flex-col justify-center p-6 md:p-8">
        <div className="max-w-[22rem]">
          <p className="font-mono text-[0.6875rem] font-medium uppercase text-white md:text-sm">
            {card.label}
          </p>
          <p className="mt-3 font-heading text-base font-medium leading-[1.35] tracking-tight text-white md:mt-5 md:text-2xl md:leading-[1.3]">
            {card.body}
          </p>
        </div>
      </div>
    </article>
  );
}

const OurValues = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
    descRef,
  });

  useGSAP(
    () => {
      const grid = cardsGridRef.current;
      if (!grid) return;

      const cards = gsap.utils.toArray<HTMLElement>(".values-card", grid);
      if (!cards.length) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, x: 0, clearProps: "transform" });
        return;
      }

      gsap.set(cards, { opacity: 0, x: 72 });

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 78%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      revealTl.to(cards, {
        opacity: 1,
        x: 0,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.14,
        clearProps: "transform",
      });

      const lenis = window.lenis;
      let scrollPending = false;
      const onLenisScroll = () => {
        if (scrollPending) return;
        scrollPending = true;
        requestAnimationFrame(() => {
          ScrollTrigger.update();
          scrollPending = false;
        });
      };
      lenis?.on("scroll", onLenisScroll);

      ScrollTrigger.refresh();

      return () => {
        lenis?.off("scroll", onLenisScroll);
        revealTl.scrollTrigger?.kill();
        revealTl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white text-[#0a143b]">
      <style>{`
        .values-card-shell.way-card-shell {
          --way-card-hover-scale: 1.03;
        }

        .values-card-shell .way-card-body {
          transition: transform 800ms cubic-bezier(0.165, 0.84, 0.44, 1);
          transform: translate3d(0, 0, 0) scale(1);
        }
      `}</style>
      <Container borderColor="#53535380" className="relative z-10">
        <div className="flex flex-col gap-10 py-16 md:py-20 lg:gap-14 lg:py-24">
          <div
            ref={headerRef}
            className="grid gap-8 lg:grid-cols-2 lg:items-end lg:justify-between lg:gap-12"
          >
            <div className="flex flex-col items-start justify-end space-y-5">
              <EyebrowPill surface="light" className="mb-0">
                Our Values
              </EyebrowPill>
              <h2
                ref={headingRef}
                className="max-w-md text-3xl font-heading font-medium leading-[1.12] tracking-tight text-[#9AA8BC] md:text-4xl lg:text-[1.625rem] lg:leading-[1.12]"
              >
                <span data-split>Built for efficiency</span>
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
            ref={cardsGridRef}
            className="grid gap-4 md:grid-cols-3 md:gap-6 lg:gap-8"
          >
            {VALUE_CARDS.map((card) => (
              <ValueCardItem key={card.id} card={card} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurValues;
