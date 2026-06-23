"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";

const WORKFLOW_STEPS = [
  {
    id: "multi-carrier",
    label: "ENTERPRISE MULTI-CARRIER SUBMISSION",
    image: "/images/product/quote1.svg",
    width: 444,
    height: 469,
    headline: (
      <>
        One application reaches{" "}
        <span className="text-[#9AA8BC]">40+ carrier sanctioned integrations</span>{" "}
        simultaneously.
      </>
    ),
  },
  {
    id: "quote-comparison",
    label: "BINDABLE QUOTE COMPARISON",
    image: "/images/product/quote2.svg",
    width: 442,
    height: 432,
    headline: (
      <>
        Compare bindable quotes side by side with{" "}
        <span className="text-[#9AA8BC]">named carrier outcomes</span> and clear
        premium breakdowns.
      </>
    ),
  },
  {
    id: "bind-payment",
    label: "ONE-CLICK BIND & PAYMENT",
    image: "/images/product/quote3.svg",
    width: 444,
    height: 469,
    headline: (
      <>
        Bind policies and collect payment in{" "}
        <span className="text-[#9AA8BC]">one click</span> without leaving the
        workflow.
      </>
    ),
  },
  {
    id: "compliance",
    label: "E&S COMPLIANCE BUILT IN",
    image: "/images/product/quote4.svg",
    width: 467,
    height: 432,
    headline: (
      <>
        E&S compliance checks are built into every submission{" "}
        <span className="text-[#9AA8BC]">before you send</span>.
      </>
    ),
  },
  {
    id: "ams-sync",
    label: "AMS SYNC & RENEWALS",
    image: "/images/product/quote5.svg",
    width: 444,
    height: 469,
    headline: (
      <>
        Sync policies to your AMS and automate renewals{" "}
        <span className="text-[#9AA8BC]">without duplicate entry</span>.
      </>
    ),
  },
] as const;

function NavItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 py-2 text-left font-mono text-[0.6875rem] font-medium uppercase leading-snug tracking-[0.1em] transition-colors duration-300 md:text-xs ${
        active ? "text-[#1A1A1A]" : "text-[#C8CDD6] hover:text-[#9AA8BC]"
      }`}
    >
      <span
        className={`size-1.5 shrink-0 rounded-full transition-colors duration-300 ${
          active ? "bg-[#1A1A1A]" : "bg-transparent"
        }`}
        aria-hidden
      />
      <span>{label}</span>
    </button>
  );
}

const QuoteWorkFlow = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  const scrollToPanel = useCallback((index: number) => {
    panelRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
    if (!panels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const index = Number(visible[0].target.getAttribute("data-index"));
        if (!Number.isNaN(index)) setActiveIndex(index);
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white text-[#0a143b]">
      <Container borderColor="#53535340">
        <div className="py-16 md:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(13rem,17rem)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav className="flex flex-row gap-6 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
                {WORKFLOW_STEPS.map((step, index) => (
                  <NavItem
                    key={step.id}
                    label={step.label}
                    active={activeIndex === index}
                    onClick={() => scrollToPanel(index)}
                  />
                ))}
              </nav>
            </aside>

            <div className="min-w-0">
              {WORKFLOW_STEPS.map((step, index) => (
                <article
                  key={step.id}
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  data-index={index}
                  className="flex min-h-[70vh] flex-col justify-center gap-10 py-10 first:pt-0 last:pb-0 md:min-h-[80vh] md:gap-12 lg:min-h-screen lg:py-16"
                >
                  <p className="max-w-3xl indent-12 text-left font-heading text-2xl font-regular leading-[1.35] tracking-tight text-[#1A1A1A] md:indent-16 md:text-3xl lg:indent-20 lg:text-[2rem] lg:leading-[1.3]">
                    {step.headline}
                  </p>

                  <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px]">
                    <Image
                      src={step.image}
                      alt={`${step.label} preview`}
                      width={step.width}
                      height={step.height}
                      className="h-auto w-full"
                      sizes="(max-width: 768px) 280px, 400px"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default QuoteWorkFlow;
