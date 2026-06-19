"use client";

import {
  RiAddLine,
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiFileList3Line,
  RiFocus3Line,
  RiMessage2Line,
  RiNodeTree,
  RiStackLine,
  RiUserAddLine,
} from "@remixicon/react";

const FILE_TAGS = [
  { label: "PDF", bg: "#FEF2F2", color: "#EF4444" },
  { label: "DOCX", bg: "#EFF6FF", color: "#4683E5" },
  { label: "XLSX", bg: "#ECFDF3", color: "#6DAB4E" },
] as const;

const MENU_ITEMS = [
  { label: "Follow", icon: RiUserAddLine, active: false },
  { label: "Message", icon: RiMessage2Line, active: true },
  { label: "View API Docs", icon: RiCodeSSlashLine, active: false },
  { label: "Program Details", icon: RiFileList3Line, active: false },
] as const;

const INFRA_FEATURES = [
  {
    label: "Smart Routing",
    sub: "Right market, every time.",
    icon: RiFocus3Line,
    bg: "#F3F0FF",
    color: "#5B35E0",
  },
  {
    label: "Unified Data",
    sub: "One source of truth.",
    icon: RiDatabase2Line,
    bg: "#ECFDF3",
    color: "#6DAB4E",
  },
  {
    label: "Multi-Channel API",
    sub: "Connect every channel.",
    icon: RiNodeTree,
    bg: "#EFF6FF",
    color: "#4683E5",
  },
] as const;

export default function ProductDigitizationMock() {
  return (
    <div className="relative mx-auto w-full max-w-[440px] min-h-[340px] overflow-visible pb-4 md:min-h-[370px] md:pb-6">
      {/* Back card — Product Digitization, top-right */}
      <div className="absolute right-0 top-0 z-0 w-[94%] rounded-2xl border border-[#E8EAEF] bg-white p-4 pb-10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] md:p-5 md:pb-12">
        <div className="flex items-center justify-between gap-3 pr-16 md:pr-20">
          <p className="truncate font-heading text-sm font-medium text-[#3C3B3B] md:text-base">
            Product Digitization
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F3F0FF] px-2.5 py-1 font-heading text-[0.65rem] font-medium text-[#5B35E0] md:text-xs">
            1 Unified API
          </span>
        </div>

        <div className="relative mt-4 rounded-xl border border-dashed border-[#D1D5DB] bg-[#FAFBFC] px-4 py-5 md:mt-5 md:py-6">
          <button
            type="button"
            aria-label="Add program"
            className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-md bg-[#EFF6FF] text-[#4683E5]"
          >
            <RiAddLine size={14} />
          </button>

          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#4683E5] md:size-12">
              <RiStackLine size={20} />
            </span>
            <div className="min-w-0 pr-6">
              <p className="font-heading text-sm font-semibold text-[#3C3B3B] md:text-base">
                3 Programs Connected
              </p>
              <p className="mt-1 font-heading text-[0.65rem] font-normal leading-relaxed text-[#9CA3AF] md:text-xs">
                Existing programs wrapped into one unified API layer.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
          {FILE_TAGS.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center rounded-lg px-2.5 py-1 font-heading text-[0.65rem] font-medium md:text-xs"
              style={{ backgroundColor: tag.bg, color: tag.color }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Floating menu — right edge */}
        <div className="absolute right-3 top-[3.25rem] z-20 w-[7.5rem] overflow-hidden rounded-xl border border-[#E8EAEF] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.1)] md:top-[3.5rem] md:w-32">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-2 px-3 py-2 text-left font-heading text-[0.6rem] font-medium md:text-[0.65rem] ${
                  item.active
                    ? "bg-[#F3F0FF] text-[#5B35E0]"
                    : "text-[#6B7280] hover:bg-[#F9FAFB]"
                }`}
              >
                <Icon size={12} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Front card — Insurance Infrastructure, bottom-left overlap */}
      <div className="absolute left-0 top-[8.5rem] z-10 w-[88%] overflow-hidden rounded-2xl border border-[#E8EAEF] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.12)] md:top-[9.25rem] md:w-[86%]">
        <div className="px-4 pt-4 md:px-5 md:pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-heading text-sm font-semibold text-[#3C3B3B] md:text-base">
                Insurance Infrastructure
              </p>
              <p className="mt-1 font-heading text-[0.65rem] font-normal text-[#9CA3AF] md:text-xs">
                Send risks to the right market instantly.
              </p>
            </div>
            <span className="shrink-0 font-heading text-[0.65rem] font-semibold text-[#5B35E0] md:text-xs">
              API, 40+ Carriers
            </span>
          </div>
        </div>

        <div className="mx-4 my-3 border-t border-dashed border-[#E5E7EB] md:mx-5" />

        <div className="grid grid-cols-3 gap-2 px-3 pb-4 md:gap-3 md:px-4 md:pb-5">
          {INFRA_FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.label} className="min-w-0 text-center">
                <span
                  className="mx-auto flex size-8 items-center justify-center rounded-full md:size-9"
                  style={{ backgroundColor: feature.bg, color: feature.color }}
                >
                  <Icon size={14} />
                </span>
                <p className="mt-2 font-heading text-[0.6rem] font-semibold leading-tight text-[#3C3B3B] md:text-[0.65rem]">
                  {feature.label}
                </p>
                <p className="mt-0.5 font-heading text-[0.5rem] font-normal leading-snug text-[#9CA3AF] md:text-[0.55rem]">
                  {feature.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
