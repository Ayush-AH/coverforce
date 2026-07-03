"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/common/Container";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";
import {
  CARD_BACKGROUND_STYLES,
  type CardBackground,
} from "@/data/wayCardStyles";

gsap.registerPlugin(ScrollTrigger);

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

const CARD_HEIGHT = "min-h-[28rem] md:min-h-[29rem]";

function ValueCardItem({ card }: { card: ValueCard }) {
  return (
    <article
      className={`values-card flex ${CARD_HEIGHT} flex-col justify-end overflow-hidden rounded-md p-6 md:p-8`}
      style={{ background: CARD_BACKGROUND_STYLES[card.background] }}
    >
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white md:text-xs">
        {card.label}
      </p>
      <p className="mt-4 font-heading text-base font-medium leading-[1.35] tracking-tight text-white md:mt-5 md:text-xl md:leading-[1.3]">
        {card.body}
      </p>
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
      <Container borderColor="#53535333" className="relative z-10">
        <div className="flex flex-col gap-10 py-16 md:py-20 lg:gap-14 lg:py-24">
          <div
            ref={headerRef}
            className="grid gap-8 lg:grid-cols-2 lg:items-start lg:justify-between lg:gap-12"
          >
            <div className="flex flex-col items-start justify-end space-y-5">
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
                className="font-sans font-regular text-sm leading-[1.4] text-[#3F3F3F] md:text-[1.125rem]"
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
