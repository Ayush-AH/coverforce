"use client";

import Image from "next/image";
import {
  RiArrowRightSLine,
  RiBuilding2Line,
  RiFileTextLine,
  RiMapPinLine,
  RiNodeTree,
  RiShieldCheckLine,
} from "@remixicon/react";

const ORBIT_LOGOS = [
  { src: "/images/solution/nationwide.svg", alt: "Nationwide", top: "8%", left: "50%", size: 28 },
  { src: "/images/solution/travelers.svg", alt: "Travelers", top: "38%", left: "82%", size: 26 },
  { src: "/images/chubb.svg", alt: "Chubb", top: "72%", left: "68%", size: 24 },
  { src: "/images/liverty.svg", alt: "Liberty Mutual", top: "62%", left: "18%", size: 24 },
] as const;

const MATCH_BADGES = [
  { label: "State checked", icon: RiMapPinLine, bg: "#F3F0FF", color: "#5B35E0" },
  { label: "NAICS verified", icon: RiBuilding2Line, bg: "#ECFDF3", color: "#6DAB4E" },
  { label: "E&S fallback", icon: RiShieldCheckLine, bg: "#EFF6FF", color: "#4683E5" },
] as const;

const AVATARS = [
  "/images/avatar1.png",
  "/images/avatar2.png",
  "/images/network/logo (1).png",
] as const;

function AppetiteHubGraphic() {
  return (
    <div className="relative mx-auto mt-3 h-[148px] w-full max-w-[300px] md:mt-4 md:h-[156px]">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 300 156"
        fill="none"
        aria-hidden
      >
        <circle cx="150" cy="78" r="34" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="150" cy="78" r="52" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="150" cy="78" r="68" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="150" y1="78" x2="150" y2="22" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="150" y1="78" x2="248" y2="68" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="150" y1="78" x2="218" y2="118" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="150" y1="78" x2="72" y2="108" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="3 3" />
      </svg>

      <div className="absolute left-1/2 top-1/2 z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-[#5B35E0] font-heading text-sm font-semibold text-white shadow-[0_4px_16px_rgba(91,53,224,0.35)] md:size-12 md:text-base">
        AI
      </div>

      {ORBIT_LOGOS.map((logo) => (
        <div
          key={logo.alt}
          className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-white bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          style={{
            top: logo.top,
            left: logo.left,
            width: logo.size,
            height: logo.size,
          }}
        >
          <Image src={logo.src} alt={logo.alt} width={logo.size - 6} height={logo.size - 6} className="object-contain" />
        </div>
      ))}

      <span className="absolute bottom-[6%] left-[14%] z-10 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-[#F3F4F6] font-heading text-[0.55rem] font-semibold text-[#6B7280] md:text-[0.6rem]">
        +39
      </span>
    </div>
  );
}

export default function AiAppetiteEngineMock() {
  return (
    <div className="relative mx-auto w-full max-w-[440px] min-h-[300px] overflow-visible pb-2 md:min-h-[330px] md:pb-4">
      {/* Back card — top-left */}
      <div className="absolute left-0 top-0 z-0 w-[94%] rounded-2xl border border-[#E8EAEF] bg-white p-4 pb-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)] md:p-5 md:pb-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F3F0FF] text-[#5B35E0]">
              <RiNodeTree size={16} />
            </span>
            <p className="truncate font-heading text-sm font-medium text-[#3C3B3B] md:text-base">
              AI Appetite Engine
            </p>
          </div>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-0.5 font-heading text-[0.65rem] font-medium text-[#5B35E0] md:text-xs"
          >
            See all
            <RiArrowRightSLine size={14} />
          </button>
        </div>

        <AppetiteHubGraphic />

        <div className="mt-2 md:mt-3">
          <p className="font-heading text-lg font-medium leading-tight text-[#3C3B3B] md:text-xl">
            8 Carriers Matched
          </p>
          <p className="mt-0.5 font-heading text-xs font-normal text-[#9CA3AF] md:text-sm">
            Submission pre-qualified
          </p>
        </div>
      </div>

      {/* Front card — bottom-right overlap */}
      <div className="absolute right-0 top-[7.75rem] z-10 w-[86%] overflow-hidden rounded-2xl border border-[#E8EAEF] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.12)] md:top-[8.5rem] md:w-[85%]">
        <div className="flex items-center justify-between gap-3 border-b border-[#F3F4F6] px-4 py-3">
          <p className="inline-flex items-center gap-2 font-heading text-sm font-medium text-[#3C3B3B] md:text-base">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#F3F0FF] text-[#5B35E0]">
              <RiFileTextLine size={14} />
            </span>
            Best Match
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="font-heading text-xs font-medium text-[#6B7280] md:text-sm">45+</span>
            <div className="flex -space-x-1.5">
              {AVATARS.map((src) => (
                <span
                  key={src}
                  className="relative size-6 overflow-hidden rounded-full border-2 border-white md:size-7"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="28px" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-4 py-4 md:py-5">
          {MATCH_BADGES.map((badge) => {
            const Icon = badge.icon;

            return (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-heading text-[0.65rem] font-medium md:text-xs"
                style={{ backgroundColor: badge.bg, color: badge.color }}
              >
                <Icon size={12} />
                {badge.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
