"use client";

import {
  RiArrowRightSLine,
  RiAwardLine,
  RiCheckLine,
  RiCloseLine,
  RiFileTextLine,
  RiFocus3Line,
  RiMoneyDollarCircleLine,
  RiShieldCheckLine,
} from "@remixicon/react";

const CARRIER_MATCHES = [
  {
    name: "Travelers",
    badge: "Best overall match",
    badgeBg: "#F7F0FF",
    badgeColor: "#B87AFF",
    barColor: "#B87AFF",
  },
  {
    name: "Chubb",
    badge: "Strong match",
    badgeBg: "#ECFDF3",
    badgeColor: "#72AF23",
    barColor: "#72AF23",
  },
  {
    name: "Liberty Mutual",
    badge: "Strong match",
    badgeBg: "#E3EDFD",
    badgeColor: "#1B78FB",
    barColor: "#1B78FB",
  },
] as const;

const AUTOMATION_STEPS = [
  { label: "Intake", icon: RiFileTextLine, bg: "#F3F0FF", color: "#5B35E0" },
  { label: "Match", icon: RiFocus3Line, bg: "#ECFDF3", color: "#6DAB4E" },
  { label: "Quote", icon: RiMoneyDollarCircleLine, bg: "#EDE9FE", color: "#7C3AED" },
  { label: "Bind", icon: RiShieldCheckLine, bg: "#EFF6FF", color: "#4683E5" },
  { label: "COI", icon: RiAwardLine, bg: "#FEF2F2", color: "#EF4444" },
] as const;

function MatchStatus({
  ok,
  label,
}: {
  ok: boolean;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 font-heading text-[0.55rem] font-normal md:text-[0.6rem]`}
      
    >
      <span
      className={`flex size-2 items-center justify-center rounded-full ${
        ok ? "bg-[#72AF23]" : "bg-[#EF4444]"
      }`}
      >
      {ok ? <RiCheckLine size={6} color="#FFFFFF" /> : <RiCloseLine size={6} color="#FFFFFF" />}
      </span>
      {label}
    </span>
  );
}

export default function OperatingAiMock() {
  return (
    <div className="relative mx-auto w-full max-w-[440px] min-h-[320px] md:min-h-[360px]">
      <div className="absolute left-0 top-0 w-[94%] overflow-hidden rounded-2xl border border-[#E8EAEF] bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,0.08)] md:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-heading text-sm font-semibold text-[#3C3B3B] md:text-base">
            Top Carrier Matches
          </p>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#EFF6E7] px-2.5 py-1 font-heading text-[0.65rem] font-medium text-[#72AF23] md:text-xs"
          >
            <RiCheckLine size={12} />
            Generate
          </button>
        </div>

        <div className="mt-4 divide-y divide-[#F3F4F6] md:mt-5">
          {CARRIER_MATCHES.map((carrier) => (
            <div
              key={carrier.name}
              className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto] items-start gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="font-heading text-xs font-medium text-[#3C3B3B] md:text-sm">
                  {carrier.name}
                </p>
                <span
                  className="mt-1 inline-block rounded-md px-2 py-0.5 font-heading text-[0.55rem] font-medium md:text-[0.6rem]"
                  style={{
                    backgroundColor: carrier.badgeBg,
                    color: carrier.badgeColor,
                  }}
                >
                  {carrier.badge}
                </span>
              </div>

              <div className="min-w-0 pt-0.5">
                <div className="h-2.5 overflow-hidden rounded-full bg-[#EEF0F4]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "62%", backgroundColor: carrier.barColor }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between gap-x-3 gap-y-1">
                  <MatchStatus ok label="Appetite Fit" />
                  <MatchStatus ok={false} label="Loss History" />
                </div>
              </div>

              <p className="whitespace-nowrap pt-0.5 ml-2 font-heading text-xs font-medium text-[#3C3B3B] md:text-xs">
                98% Match
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 right-0 z-10 w-[80%] overflow-hidden rounded-2xl border border-[#E8EAEF] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between gap-3  px-4 pt-4">
          <p className="font-heading text-sm font-semibold text-[#3C3B3B] md:text-sm">
            End-to-end Automation
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-0.5 font-heading text-[0.65rem] font-medium text-[#5B35E0] md:text-xs"
          >
            See all
            <RiArrowRightSLine size={14} />
          </button>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-y-1.5 px-3 py-4 md:px-4 md:py-5">
          {AUTOMATION_STEPS.map((step, index) => {
            const Icon = step.icon;
            const gridCol = index * 2 + 1;

            return (
              <div key={step.label} className="contents">
                <div
                  className="flex justify-center"
                  style={{ gridColumn: gridCol, gridRow: 1 }}
                >
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl md:size-10"
                    style={{ backgroundColor: step.bg, color: step.color }}
                  >
                    <Icon size={16} />
                  </span>
                </div>

                <p
                  className="text-center font-heading text-[0.55rem] font-normal text-[#6B7280] md:text-[0.6rem]"
                  style={{ gridColumn: gridCol, gridRow: 2 }}
                >
                  {step.label}
                </p>

                {index < AUTOMATION_STEPS.length - 1 ? (
                  <span
                    className="flex items-center justify-center text-[#D1D5DB]"
                    style={{ gridColumn: gridCol + 1, gridRow: 1 }}
                    aria-hidden
                  >
                    <svg width="14" height="6" viewBox="0 0 14 6" fill="none">
                      <path
                        d="M0 3h10M10 3l-2.5-2M10 3l-2.5 2"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="2 2"
                      />
                    </svg>
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
