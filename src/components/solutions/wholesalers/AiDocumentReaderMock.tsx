"use client";

import {
  RiArrowRightSLine,
  RiCheckLine,
  RiFileCheckLine,
  RiFileTextLine,
  RiMailLine,
  RiShieldCheckLine,
  RiStackLine,
  RiTimeLine,
} from "@remixicon/react";

const STATUS_TAGS = [
  { label: "Email Parsed", icon: RiMailLine, bg: "#F3F0FF", color: "#5B35E0" },
  { label: "ACORD read", icon: RiFileTextLine, bg: "#FEF2F2", color: "#EF4444" },
  { label: "COI ready", icon: RiShieldCheckLine, bg: "#EFF6FF", color: "#4683E5" },
] as const;

const FILE_TYPES = [
  { label: "PDF", bg: "#FEE2E2", color: "#EF4444" },
  { label: "DOC", bg: "#DBEAFE", color: "#4683E5" },
  { label: "XLS", bg: "#DCFCE7", color: "#6DAB4E" },
] as const;

export default function AiDocumentReaderMock() {
  return (
    <div className="relative mx-auto w-full max-w-[440px] min-h-[300px] overflow-visible pb-2 md:min-h-[320px] md:pb-4">
      {/* Back card — top-right */}
      <div className="absolute right-0 top-0 z-0 w-[94%] rounded-2xl border border-[#E8EAEF] bg-white p-4 pb-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)] md:p-5 md:pb-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F3F0FF] text-[#5B35E0]">
              <RiStackLine size={16} />
            </span>
            <p className="truncate font-heading text-sm font-medium text-[#3C3B3B] md:text-base">
              AI Document Reader
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#ECFDF3] px-2.5 py-1 font-heading text-[0.65rem] font-medium text-[#6DAB4E] md:text-xs">
            <RiCheckLine size={12} />
            95%+ Accuracy
          </span>
        </div>

        <div className="mt-5 md:mt-6">
          <p className="font-heading text-2xl font-medium leading-tight text-[#3C3B3B] md:text-[1.75rem]">
            12 Docs Processed
          </p>
          <p className="mt-1 font-heading text-xs font-normal text-[#9CA3AF] md:text-sm">
            Submission packet converted
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 md:mt-6">
          {STATUS_TAGS.map((tag) => {
            const Icon = tag.icon;

            return (
              <span
                key={tag.label}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-heading text-[0.65rem] font-medium md:text-xs"
                style={{ backgroundColor: tag.bg, color: tag.color }}
              >
                <Icon size={12} />
                {tag.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Front card — bottom-left overlap, top sits on status row */}
      <div className="absolute left-0 top-[7.5rem] z-10 w-[86%] overflow-hidden rounded-2xl border border-[#E8EAEF] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.12)] md:top-[8.25rem] md:w-[85%]">
        <div className="flex items-center justify-between gap-3 border-b border-[#F3F4F6] px-4 py-3">
          <p className="inline-flex items-center gap-1.5 font-heading text-sm font-medium text-[#3C3B3B] md:text-base">
            Latest Result
            <RiTimeLine size={14} className="text-[#9CA3AF]" />
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-0.5 font-heading text-[0.65rem] font-medium text-[#5B35E0] md:text-xs"
          >
            See all Plan
            <RiArrowRightSLine size={14} />
          </button>
        </div>

        <div className="flex items-center gap-3 px-4 py-4 md:py-5">
          <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#6DAB4E] md:size-11">
            <RiFileCheckLine size={20} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-sm font-medium text-[#3C3B3B] md:text-base">
              Commercial Property App
            </p>
            <p className="mt-0.5 font-heading text-[0.65rem] font-normal text-[#9CA3AF] md:text-xs">
              Auto-filled • Auto-filled
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <span className="font-heading text-xs font-medium text-[#6B7280] md:text-sm">
              +5
            </span>
            <div className="flex -space-x-1">
              {FILE_TYPES.map((file) => (
                <span
                  key={file.label}
                  className="flex size-5 items-center justify-center rounded-full border border-white font-heading text-[0.45rem] font-semibold md:size-6 md:text-[0.5rem]"
                  style={{ backgroundColor: file.bg, color: file.color }}
                  title={file.label}
                >
                  {file.label.charAt(0)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
