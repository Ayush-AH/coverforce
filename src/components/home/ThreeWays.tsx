import React, { type ReactNode } from "react";
import Image from "next/image";

import Container from "../common/Container";
type WayCardProps = {
  label: string;
  tagline: string;
  taglinePosition?: "left" | "right";
  variant: "dark" | "light";
  children: ReactNode;
  className?: string;
  /** Figma 1179×530 — full-width center card, scales with container */
  wide?: boolean;
  /** Solid #9F7CFF background (first & last cards) */
  accent?: boolean;
  /** Custom card background color (e.g. second card) */
  cardBg?: string;
  /** Background image path (e.g. second card) */
  cardBgImage?: string;
};

function CardBottomStrip({ label, tagline }: { label: string; tagline: string }) {
  return (
    <div
      className="-mx-5 -mb-5 mt-auto flex items-center justify-between gap-4 border-t border-[#E8E0F5]/60 px-4 py-3 md:-mx-6 md:-mb-6 md:px-5 md:py-3.5"
      style={{
        background: "linear-gradient(90deg, #F8F3FF 0%, #F1F1FF 100%)",
      }}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className="h-9 w-1.5 shrink-0 rounded-sm"
          style={{
            background:
              "repeating-linear-gradient(135deg, #5B35E0 0 3px, #ffffff 3px 6px)",
          }}
          aria-hidden
        />
        <span
          className="size-1.5 shrink-0 rounded-full bg-[#797979]"
          aria-hidden
        />
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#797979]">
          {label}
        </span>
      </div>
      <p className="shrink-0 text-right text-sm font-semibold leading-snug text-[#0a143b] md:text-base">
        {tagline}
      </p>
    </div>
  );
}

function WayCard({
  label,
  tagline,
  taglinePosition = "right",
  variant,
  children,
  className = "",
  wide = false,
  accent = false,
  cardBg,
  cardBgImage,
}: WayCardProps) {
  const isDark = variant === "dark";
  const isLightText = accent || (isDark && !cardBg);

  return (
    <article
      className={`relative flex w-full flex-col overflow-hidden rounded-sm p-5 md:p-6 ${
        wide ? "aspect-[1179/530]" : "aspect-[580/530]"
      } ${
        cardBg
          ? "text-[#0a143b]"
          : accent
            ? "bg-[#9F7CFF] text-white"
            : isDark
              ? "bg-gradient-to-br from-[#5B35E0] via-[#4a2d9e] to-[#3d2878] text-white"
              : "bg-gradient-to-br from-[#EDE8F8] via-[#F5F3FA] to-white text-[#0a143b]"
      } ${className}`}
      style={cardBg ? { backgroundColor: cardBg } : undefined}
    >
      {cardBgImage && (
        <div className="pointer-events-none absolute -translate-y-1/5 left-1/2 z-0 h-[150%] w-[150%] -translate-x-1/2  md:-top-24 lg:-top-28">
          <Image
            src={cardBgImage}
            alt=""
            fill
            className="object-cover object-center  w-full h-full "
            sizes="(max-width: 768px) 100vw, 50vw"
            aria-hidden
          />
        </div>
      )}

      {accent && (
        <span
          className="pointer-events-none absolute -left-8 -top-2 z-0 aspect-square w-[200%] rounded-full bg-[#2C33BB] md:-left-12 md:-top-4 blur-3xl"
          aria-hidden
        />
      )}

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
      <div
        className={`flex items-start gap-4 ${cardBgImage ? "justify-end" : "justify-between"}`}
      >
        {!cardBgImage && (
          <span
            className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
              isLightText ? "text-white/80" : "text-[#0a143b]/60"
            }`}
          >
            {label}
          </span>
        )}
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#8E68F9]">
          <Image
            src="/images/expandicon.svg"
            alt=""
            width={20}
            height={20}
            className="size-5"
            aria-hidden
          />
        </span>
      </div>

      <div className="relative mt-4 flex min-h-0 flex-1 items-center justify-center overflow-hidden py-2">
        {children}
      </div>

      {cardBgImage ? (
        <CardBottomStrip label={label} tagline={tagline} />
      ) : (
        <p
          className={`mt-auto text-sm font-semibold leading-snug md:text-base ${
            taglinePosition === "left" ? "text-left" : "text-right"
          } ${isLightText ? "text-white" : "text-[#0a143b]"}`}
        >
          {tagline}
        </p>
      )}
      </div>
    </article>
  );
}

function WholesalerMock() {
  return (
    <div className="w-full max-w-[280px] space-y-3">
      <div className="rounded-xl bg-white p-4 text-[#0a143b] shadow-lg">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Active (2)
        </p>
        <div className="mt-3 space-y-2 text-xs">
          <div className="flex justify-between border-b border-neutral-100 pb-2">
            <span className="text-neutral-500">ACTID 23</span>
            <span className="font-medium">In review</span>
          </div>
          <div className="flex justify-between">
            <span>Gross Premium</span>
            <span className="font-semibold">$1,200,000</span>
          </div>
          <div className="flex justify-between">
            <span>Net Premium</span>
            <span className="font-semibold">$925,000</span>
          </div>
        </div>
      </div>
      <div className="ml-8 rounded-lg bg-white/90 px-3 py-2 text-[10px] text-[#0a143b] shadow-md">
        New submission received
      </div>
    </div>
  );
}

function BrokerMock() {
  return (
    <div className="w-full max-w-[260px] rounded-xl bg-white p-5 text-[#0a143b] shadow-lg">
      <p className="text-xs font-semibold text-neutral-500">Broker Workflow</p>
      <p className="mt-2 text-2xl font-semibold">60% faster quotes</p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-100">
        <div className="h-full w-[60%] rounded-full bg-[#5B35E0]" />
      </div>
      <div className="mt-6 flex items-end gap-1">
        {[40, 65, 45, 80, 55, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-[#5B35E0]/80"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <p className="mt-2 text-right text-xs font-medium text-neutral-500">
        40+ carriers
      </p>
    </div>
  );
}

function DeveloperMock() {
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-5 text-[#0a143b] shadow-xl md:max-w-lg md:p-6">
      <p className="text-sm font-semibold">Developers</p>
      <p className="text-xs text-neutral-500">Built with Coverforce API</p>
      <div className="mt-4 flex gap-2">
        {["All", "Integration", "Testing"].map((tab, i) => (
          <span
            key={tab}
            className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wide ${
              i === 1
                ? "bg-[#5B35E0] text-white"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>
      <ul className="mt-5 space-y-3 text-sm">
        {[
          "API Key Generated",
          "Sandbox Connected",
          "Test Quote Successful",
        ].map((item) => (
          <li
            key={item}
            className="flex items-center justify-between border-b border-neutral-100 pb-3 last:border-0"
          >
            <span>{item}</span>
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-700">
              Done
            </span>
          </li>
        ))}
      </ul>
    </div>  
  );
}

const ThreeWays = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[min(122vw,1200px)] overflow-hidden md:h-[min(116vw,1420px)] lg:h-[min(112vw,1700px)]">
        <Image
          src="/images/Group%201000006214.svg"
          alt=""
          fill
          className="translate-y-10 object-cover object-top md:translate-y-14 lg:translate-y-16"
          sizes="100vw"
          aria-hidden
        />
      </div>

      <Container borderColor="#0A143B1A">
        <div className="relative z-10 py-16 md:py-20 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-10 xl:gap-14">
            <div className="space-y-5 md:space-y-6">
              <p className="flex items-center gap-2.5 text-xs font-mono font-medium uppercase tracking-[0.14em] text-[#797979]">
                <span
                  className="inline-block size-2 shrink-0 rounded-full bg-[#797979]"
                  aria-hidden
                />
                Built for your role
              </p>
              <h2 className="max-w-xl text-3xl font-heading font-medium leading-[1.12] tracking-tight text-[#424242] md:text-4xl lg:text-4xl lg:leading-[1.1]">
                One platform.
                <br />
                Three Ways to Use It.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-[#091843BF]   md:text-base lg:pt-8 xl:pt-10">
              Whether you&apos;re routing submissions, quoting carriers, or
              building on our API, CoverForce adapts to your role.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:mt-14">
            <WayCard
              label="Wholesalers"
              tagline="Grow distribution efficiently"
              variant="dark"
              accent
            >
              <WholesalerMock />
            </WayCard>

            <WayCard
              label="Brokers"
              tagline="One workflow for every producer"
              variant="light"
              cardBg="#FFFFFFCC"
              cardBgImage="/images/secondcardbg.svg"
            >
              <BrokerMock />
            </WayCard>

            <WayCard
              label="Developers"
              tagline="Build insurance products on Coverforce APIs"
              taglinePosition="left"
              variant="dark"
              wide
              cardBg="#8A80DDAB"
              className="md:col-span-2"
            >
              <DeveloperMock />
            </WayCard>

            <WayCard
              label="Startups"
              tagline="One workflow for every producer"
              variant="light"
              cardBg="#FFFFFFCC"
              cardBgImage="/images/secondcardbg.svg"
            >
              <BrokerMock />
            </WayCard>

            <WayCard
              label="Carriers"
              tagline="Grow distribution efficiently"
              variant="dark"
              accent
            >
              <WholesalerMock />
            </WayCard>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ThreeWays;
