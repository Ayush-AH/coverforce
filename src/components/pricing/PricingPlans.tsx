"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiCheckLine } from "@remixicon/react";
import Container from "@/components/common/Container";
import RequestDemoCta from "@/components/request-demo/RequestDemoCta";
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

type PricingPlan = {
  id: string;
  title: string;
  badge?: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  background: CardBackground;
};

const PLANS: PricingPlan[] = [
  {
    id: "startup",
    title: "Startup",
    badge: "New",
    description:
      "For insurtechs, new brokerages, and early-stage startups. Full platform access from day one. Start building in sandbox with no time limit, go live when you're ready, and scale with pricing that grows as you do.",
    features: [
      "Free Sandbox Access",
      "Standard API Integrations",
      "Basic AI Intake Tools",
      "Community Support",
    ],
    cta: {
      label: "Apply to our startup program",
      href: "/contact",
    },
    background: "startup",
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description:
      "For wholesalers, brokers, carriers, and organizations at scale. The full CoverForce platform with unlimited usage, enterprise controls, dedicated support, and custom integrations built for organizations processing thousands of submissions per month.",
    features: [
      "All 40+ carrier integrations — unlimited usage",
      "Full AI suite — 10 production capabilities",
      "Broker code management & carrier code delegation",
      "E&S compliance — surplus lines tax, covering letters",
      "Performance analytics & commission tracking",
      "AMS integration — Applied EPIC, AMS360, Nexsure, Salesforce",
    ],
    cta: {
      label: "Talk to sales",
      href: "/contact",
    },
    background: "developer",
  },
];

function FeatureItem({ children }: { children: string }) {
  return (
    <li className="pricing-feature">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#7CD20D] text-[#0a143b]">
          <RiCheckLine className="size-3" aria-hidden />
        </span>
        <span className="font-sans text-sm font-regular leading-relaxed text-white">
          {children}
        </span>
      </div>
    </li>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  const cardRef = useRef<HTMLElement>(null);
  const hoverTweenRef = useRef<gsap.core.Timeline | null>(null);
  const { ref: lazyRef, visible: inView } = useLazyInView<HTMLElement>();
  const [hovered, setHovered] = useState(false);
  const isEnterprise = plan.id === "enterprise";

  const setRefs = (el: HTMLElement | null) => {
    cardRef.current = el;
    lazyRef.current = el;
  };

  const handleMouseEnter = () => {
    setHovered(true);
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const points = card.querySelectorAll<HTMLElement>(".pricing-feature");

    hoverTweenRef.current?.kill();
    hoverTweenRef.current = gsap
      .timeline({ defaults: { ease: "power3.out", overwrite: "auto" } })
      .to(card, { y: -24, duration: 0.9 }, 0)
      .to(
        points,
        {
          y: "-0.35rem",
          duration: 0.75,
          stagger: 0.05,
        },
        0.18,
      );
  };

  const handleMouseLeave = () => {
    setHovered(false);
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const points = card.querySelectorAll<HTMLElement>(".pricing-feature");

    hoverTweenRef.current?.kill();
    hoverTweenRef.current = gsap
      .timeline({ defaults: { ease: "power3.inOut", overwrite: "auto" } })
      .to(
        points,
        {
          y: 0,
          duration: 0.55,
          stagger: { each: 0.035, from: "end" },
        },
        0,
      )
      .to(card, { y: 0, duration: 0.8 }, 0.08);
  };

  return (
    <article
      ref={setRefs}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pricing-card pricing-plan-card-shell way-card-shell group/pricing relative flex flex-col overflow-hidden rounded-md will-change-transform transform-gpu lg:will-change-transform ${
        isEnterprise
          ? "min-h-[38rem] sm:min-h-[40rem]"
          : "min-h-[34rem] sm:min-h-[36rem]"
      } md:min-h-[42rem] lg:min-h-[46rem]`}
    >
      <div className="way-card-body absolute inset-0 overflow-hidden rounded-md">
        <div
          className="absolute inset-0 rounded-md"
          style={{ background: CARD_BACKGROUND_STYLES[plan.background] }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-md"
          aria-hidden
        >
          {inView ? <WayCardDotGridScene variant="dark" active={hovered} /> : null}
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5 text-white sm:p-8 md:p-12 lg:p-10">
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
            {plan.title}
          </h2>
          {plan.badge ? (
            <span className="rounded-full bg-white px-2.5 py-1 font-sans text-xs font-semibold text-[#413CC0]">
              {plan.badge}
            </span>
          ) : null}
        </div>

        <p className="mt-4 font-sans text-sm font-regular leading-relaxed text-white sm:mt-5">
          {plan.description}
        </p>

        <ul className="mt-6 flex flex-1 flex-col gap-3 sm:mt-8 sm:gap-4">
          {plan.features.map((feature) => (
            <FeatureItem key={feature}>{feature}</FeatureItem>
          ))}
        </ul>

        <RequestDemoCta
          label={plan.cta.label}
          href={plan.cta.href}
          variant="primary"
          surface="on-dark"
          balanced
          className="w-full border-transparent !bg-white !text-[#2E2E2E]"
        />
      </div>
    </article>
  );
}

const PricingPlans = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(cards, { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 48 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.45,
        clearProps: "transform",
      });

      cards.forEach((card) => {
        const points = card.querySelectorAll<HTMLElement>(".pricing-feature");
        if (points.length) {
          gsap.set(points, { opacity: 0, y: 24 });

          gsap.to(points, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              toggleActions: "play none none once",
              once: true,
            },
          });
        }
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
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="plans" className="bg-white text-[#0a143b]">
      <style>{`
        .pricing-plan-card-shell.way-card-shell {
          --way-card-hover-scale: 1.03;
          border-radius: 0.375rem;
          clip-path: inset(4px 4.798048790430439px 4px 4.798048790430439px round 0.375rem);
        }

        @media (prefers-reduced-motion: no-preference) {
          @media (hover: hover) {
            .pricing-plan-card-shell.way-card-shell:hover {
              clip-path: inset(4px 4.798048790430439px 4px 4.798048790430439px round 0.375rem);
            }
          }
        }

        .pricing-plan-card-shell .way-card-body,
        .pricing-plan-card-shell .way-card-body > div {
          border-radius: 0.375rem;
        }

        .pricing-plan-card-shell .way-card-body {
          transition: transform 800ms cubic-bezier(0.165, 0.84, 0.44, 1);
          transform: translate3d(0, 0, 0) scale(1);
        }
      `}</style>
      <Container borderColor="#53535333">
        <div className="grid grid-cols-1 items-stretch gap-4 py-12 sm:gap-6 md:grid-cols-2 md:gap-8 md:px-26 md:py-16 lg:py-20">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PricingPlans;
