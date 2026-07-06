"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SectionRadialGlow from "@/components/common/SectionRadialGlow";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

gsap.registerPlugin(ScrollTrigger);

type AppetiteStatus = "writing" | "selective" | "decline";

type CarrierRow = {
  name: string;
  wc: AppetiteStatus;
  gl: AppetiteStatus;
  bop: AppetiteStatus;
  cyber: AppetiteStatus;
  umbr: AppetiteStatus;
};

const QUICK_TRY_TAGS = [
  "722511 — Full-Service Restaurants",
  "236220 — Commercial Building Construction",
  "541511 — Custom Computer Programming",
  "238220 — Plumbing & HVAC",
  "621111 — Physician Offices",
  "484110 — General Freight Trucking",
] as const;

const CARRIER_ROWS: CarrierRow[] = [
  {
    name: "Hartford",
    wc: "writing",
    gl: "writing",
    bop: "selective",
    cyber: "decline",
    umbr: "writing",
  },
  {
    name: "Travelers",
    wc: "selective",
    gl: "writing",
    bop: "writing",
    cyber: "selective",
    umbr: "writing",
  },
  {
    name: "AmTrust",
    wc: "writing",
    gl: "selective",
    bop: "decline",
    cyber: "decline",
    umbr: "selective",
  },
  {
    name: "Nationwide",
    wc: "writing",
    gl: "writing",
    bop: "writing",
    cyber: "selective",
    umbr: "writing",
  },
  {
    name: "Employers",
    wc: "writing",
    gl: "decline",
    bop: "decline",
    cyber: "decline",
    umbr: "decline",
  },
  {
    name: "CNA",
    wc: "selective",
    gl: "writing",
    bop: "selective",
    cyber: "writing",
    umbr: "selective",
  },
  {
    name: "Liberty Mutual",
    wc: "writing",
    gl: "writing",
    bop: "selective",
    cyber: "decline",
    umbr: "writing",
  },
  {
    name: "Chubb",
    wc: "selective",
    gl: "writing",
    bop: "writing",
    cyber: "writing",
    umbr: "writing",
  },
];

const STATUS_DOT: Record<AppetiteStatus, string> = {
  writing: "bg-[#95E070]",
  selective: "bg-[#FBC76F]",
  decline: "bg-[#E7E7E7]",
};

const DEFAULT_QUICK_TRY = QUICK_TRY_TAGS[1];

function getQuickTryLabel(tag: string) {
  const description = tag.split(" — ")[1];
  return description ? description.toLowerCase() : tag.toLowerCase();
}

const LINE_COLUMNS = ["WC", "GL", "BOP", "CYBER", "UMBR."] as const;

function StatusDot({ status }: { status: AppetiteStatus }) {
  return (
    <span
      className={`mx-auto block size-3 rounded-full ${STATUS_DOT[status]}`}
      aria-hidden
    />
  );
}

function LegendItem({
  status,
  label,
}: {
  status: AppetiteStatus;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 font-heading text-sm text-[#393939]">
      <span className={`size-2.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden />
      {label}
    </span>
  );
}

const Appetite = () => {
  const [selectedQuickTry, setSelectedQuickTry] = useState<string>(DEFAULT_QUICK_TRY);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
    descRef,
    theme: "dark",
  });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const container = resultsRef.current;
      if (!container) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-appetite-animate]");
      if (!items.length) return;

      const rows = items.filter((el) => el.tagName === "TR");
      const others = items.filter((el) => el.tagName !== "TR");

      const animateIn = () => {
        gsap.killTweensOf(items);
        gsap.set(rows, { opacity: 0, clearProps: "transform" });
        gsap.set(others, { opacity: 0, y: 20 });
        gsap.to(rows, {
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.07,
          overwrite: true,
        });
        gsap.to(others, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.07,
          overwrite: true,
        });
      };

      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.88;

      let st: ScrollTrigger | null = null;

      if (inView) {
        animateIn();
      } else {
        gsap.set(rows, { opacity: 0, clearProps: "transform" });
        gsap.set(others, { opacity: 0, y: 20 });
        st = ScrollTrigger.create({
          trigger: container,
          start: "top 88%",
          once: true,
          onEnter: animateIn,
        });
      }

      const lenis = window.lenis;
      const onLenisScroll = () => ScrollTrigger.update();
      lenis?.on("scroll", onLenisScroll);

      return () => {
        st?.kill();
        lenis?.off("scroll", onLenisScroll);
        gsap.killTweensOf(items);
      };
    },
    { scope: resultsRef, dependencies: [selectedQuickTry] },
  );

  return (
    <section id="appetite" ref={sectionRef} className="relative bg-[#121C49] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 58%, rgba(49, 78, 155, 0.55) 0%, rgba(18, 28, 73, 0.92) 52%, #121C49 100%)",
        }}
        aria-hidden
      />

      <Container borderColor="#FFFFFF33" className="relative z-10 border-t border-[#FFFFFF1A]">
        <div className="py-16 md:py-20 lg:py-24">
          <div
            ref={headerRef}
            className="relative z-10 mx-auto max-w-3xl text-center"
          >
            <h2
              ref={headingRef}
              className="mx-auto max-w-md text-3xl font-heading font-medium leading-[1.12] tracking-tight text-[#BCC5D6] md:text-4xl lg:text-[1.625rem] lg:leading-[1.12]"
            >
              <span data-split>CoverForce </span>
              <span data-split className="text-[#413CC0]">
                Appetite Engine
              </span>
            </h2>

            <p
              ref={descRef}
              className="mx-auto mt-5 max-w-xl font-sans font-regular text-sm leading-[1.4] text-white/80 md:text-[1.125rem]"
            >
              Check carrier appetite for any class code — powered by 140K+
              proprietary carrier interactions.
            </p>
          </div>

          <div className="relative mx-auto mt-12 max-w-5xl overflow-visible md:mt-14 lg:mt-16">
            <SectionRadialGlow className="absolute left-1/2 top-[58%] z-0 w-[145%] max-w-[76rem] -translate-x-1/2 -translate-y-[42%] blur-[4.5rem] opacity-90" />

            <div className="relative z-10 rounded-2xl bg-white p-5 text-[#0a143b] shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-8 lg:p-10">
            <form
              className="space-y-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <div>
                <label
                  htmlFor="naics-search"
                  className="mb-2 block font-mono text-sm font-medium uppercase text-[#2A297C]"
                >
                  Enter NAICS code or business type
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    id="naics-search"
                    type="text"
                    placeholder="722511 or Restaurant"
                    className="box-border min-h-10 h-10 max-h-10 min-w-0 flex-1 rounded-lg border border-[#E4E7EC] bg-white px-4 font-heading text-sm leading-none text-[#1A1A1A] outline-none transition-colors placeholder:text-[#9AA8BC] focus:border-[#5B35E0] focus:ring-1 focus:ring-[#5B35E0]/20"
                  />
                  <Button type="submit" variant="primary" className="shrink-0">
                    Check Appetite
                  </Button>
                </div>
              </div>

              <div>
                <p className="mb-3 font-mono text-sm font-medium uppercase text-[#2A297C]">
                  Quick try
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_TRY_TAGS.map((tag) => {
                    const isSelected = selectedQuickTry === tag;

                    return (
                    <button
                      key={tag}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedQuickTry(tag)}
                      className={`rounded-full border px-5 py-2 font-heading text-[0.6875rem] transition-colors md:text-xs ${
                        isSelected
                          ? "border-[#5B35E0]/30 bg-[#5B35E0]/8 text-[#3834A4]"
                          : "border-[#E4E7EC] bg-[#FAFBFC] text-[#6B7280] hover:border-[#C8CDD6]"
                      }`}
                    >
                      {tag}
                    </button>
                    );
                  })}
                </div>
              </div>
            </form>

            <div
              ref={resultsRef}
              className="mt-8 overflow-hidden border-t border-[#ECEEF2] pt-6 md:mt-10 md:pt-8"
            >
              <div
                data-appetite-animate
                className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="font-mono text-sm font-medium uppercase text-[#414141]">
                  Appetite results — {getQuickTryLabel(selectedQuickTry)}
                </p>
                <div className="flex flex-wrap items-center gap-10">
                  <LegendItem status="writing" label="Writing" />
                  <LegendItem status="selective" label="Selective" />
                  <LegendItem status="decline" label="Decline" />
                </div>
              </div>

              <div className="overflow-x-auto overflow-y-hidden rounded-xl border border-[#E6E6E6] bg-white">
                <table className="w-full min-w-[36rem] border-collapse">
                  <thead>
                    <tr
                      data-appetite-animate
                      className="border-b border-[#E6E6E6] bg-[#FAF7FF]"
                    >
                      <th className="px-4 py-3.5 text-left font-mono text-sm font-medium uppercase text-[#414141] md:px-5 md:py-4">
                        Carrier
                      </th>
                      {LINE_COLUMNS.map((column) => (
                        <th
                          key={column}
                          className="px-3 py-3.5 text-center font-mono text-sm font-medium uppercase text-[#414141] md:px-4 md:py-4"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {CARRIER_ROWS.map((carrier) => (
                      <tr
                        key={carrier.name}
                        data-appetite-animate
                        className="border-b border-[#E6E6E6] last:border-b-0"
                      >
                        <td className="px-4 py-3.5 font-sans text-sm font-regular text-[#33259F] md:px-5 md:py-4">
                          {carrier.name}
                        </td>
                        <td className="px-3 py-3.5 md:px-4 md:py-4">
                          <StatusDot status={carrier.wc} />
                        </td>
                        <td className="px-3 py-3.5 md:px-4 md:py-4">
                          <StatusDot status={carrier.gl} />
                        </td>
                        <td className="px-3 py-3.5 md:px-4 md:py-4">
                          <StatusDot status={carrier.bop} />
                        </td>
                        <td className="px-3 py-3.5 md:px-4 md:py-4">
                          <StatusDot status={carrier.cyber} />
                        </td>
                        <td className="px-3 py-3.5 md:px-4 md:py-4">
                          <StatusDot status={carrier.umbr} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Appetite;
