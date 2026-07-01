"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiCheckLine } from "@remixicon/react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

gsap.registerPlugin(ScrollTrigger);

type PricingPlan = {
  id: string;
  title: string;
  badge?: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  cardClassName: string;
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
      href: "/solutions/startups",
    },
    cardClassName: "bg-[#154AED]",
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
      href: "/",
    },
    cardClassName: "bg-[#5B35E0]",
  },
];

function FeatureItem({ children }: { children: string }) {
  return (
    <li className="pricing-feature group">
      <div className="flex items-start gap-3 transition-transform duration-300 ease-out group-hover:translate-x-2">
        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#7CD20D] text-[#0a143b]">
          <RiCheckLine className="size-3" aria-hidden />
        </span>
        <span className="font-sans text-sm font-regular leading-relaxed text-white/95">
          {children}
        </span>
      </div>
    </li>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article
      className={`pricing-card flex min-h-[40rem] flex-col rounded-xl p-8 text-white will-change-transform md:min-h-[46rem] md:p-12 lg:min-h-[50rem] lg:p-10 ${plan.cardClassName}`}
    >
      <div className="flex items-center gap-3">
        <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
          {plan.title}
        </h2>
        {plan.badge ? (
          <span className="rounded-full bg-white px-2.5 py-1 font-sans text-xs font-semibold text-[#413CC0]">
            {plan.badge}
          </span>
        ) : null}
      </div>

      <p className="mt-5 font-sans text-sm font-regular leading-relaxed text-white">
        {plan.description}
      </p>

      <ul className="mt-8 flex flex-1 flex-col gap-4">
        {plan.features.map((feature) => (
          <FeatureItem key={feature}>{feature}</FeatureItem>
        ))}
      </ul>



      <Button
        href={plan.cta.href}
        variant="primary"
        surface="on-dark"
        balanced
        className="w-full"
      >
        {plan.cta.label}
      </Button>
    </article>
  );
}

const PricingPlans = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");

      gsap.set(cards, { opacity: 0, y: 48 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.45,
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
              toggleActions: "play none none none",
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
      <Container borderColor="#53535333">
        <div className="grid items-stretch gap-6 py-12 md:grid-cols-2 md:gap-8 md:py-16 lg:py-20 px-26">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PricingPlans;
