"use client";

import Image from "next/image";
import {
  RiAttachment2,
  RiBuilding2Line,
  RiCalendarLine,
  RiCheckLine,
  RiFileTextLine,
  RiNodeTree,
  RiSparkling2Line,
} from "@remixicon/react";

const EXTRACTED_FIELDS = [
  {
    label: "Account name",
    value: "Summit Risk Advisors",
    icon: RiBuilding2Line,
    bg: "#F3F0FF",
    color: "#5B35E0",
  },
  {
    label: "Line of Business",
    value: "Commercial Package",
    icon: RiNodeTree,
    bg: "#F3F0FF",
    color: "#5B35E0",
  },
  {
    label: "Document Type",
    value: "ACORD 125, loss run",
    icon: RiFileTextLine,
    bg: "#ECFDF3",
    color: "#7CB518",
  },
  {
    label: "Effective Date",
    value: "02/06/2026",
    icon: RiCalendarLine,
    bg: "#EFF6FF",
    color: "#4683E5",
  },
] as const;

const ATTACHMENT_FILES = [
  { label: "PDF", bg: "#FEF2F2", color: "#EF4444" },
  { label: "DOCX", bg: "#EFF6FF", color: "#4683E5" },
  { label: "XLSX", bg: "#ECFDF3", color: "#7CB518" },
] as const;

const AVATARS = [
  "/images/avatar1.png",
  "/images/avatar2.png",
  "/images/network/logo (1).png",
] as const;

export default function AiExtractedDetailsMock() {
  return (
    <div className="relative mx-auto w-full max-w-[440px] min-h-[320px] overflow-visible pb-4 md:min-h-[350px] md:pb-6">
      {/* Back card — top-right */}
      <div className="absolute right-0 top-0 z-0 w-[94%] rounded-2xl border border-[#E8EAEF] bg-white p-4 pb-10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] md:p-5 md:pb-12">
        <div className="flex items-center justify-between gap-3 border-b border-dashed border-[#E5E7EB] pb-3">
          <p className="inline-flex items-center gap-1.5 font-heading text-[0.65rem] font-semibold tracking-wide text-[#6B7280] md:text-xs">
            <RiSparkling2Line size={14} className="text-[#5B35E0]" />
            <RiSparkling2Line size={12} className="-ml-2 text-[#5B35E0]/70" />
            AI EXTRACTED DETAILS
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#ECFDF3] px-2.5 py-1 font-heading text-[0.65rem] font-medium text-[#7CB518] md:text-xs">
            <RiCheckLine size={12} />
            Processed by AI
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 md:mt-4 md:gap-2.5">
          {EXTRACTED_FIELDS.map((field) => {
            const Icon = field.icon;

            return (
              <div
                key={field.label}
                className="flex items-start gap-2 rounded-xl border border-[#EEF0F4] bg-white p-2.5 md:p-3"
              >
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full md:size-8"
                  style={{ backgroundColor: field.bg, color: field.color }}
                >
                  <Icon size={14} />
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-[0.6rem] font-semibold text-[#3C3B3B] md:text-[0.65rem]">
                    {field.label}
                  </p>
                  <p className="mt-0.5 truncate font-heading text-[0.55rem] font-normal text-[#9CA3AF] md:text-[0.6rem]">
                    {field.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 flex justify-end pr-1 md:mt-2.5">
          <div className="rounded-xl border border-[#EEF0F4] bg-white px-3 py-2 text-right md:px-3.5">
            <p className="font-heading text-[0.6rem] font-semibold text-[#3C3B3B] md:text-[0.65rem]">
              Confidence Score
            </p>
            <p className="mt-0.5 font-heading text-sm font-semibold text-[#7CB518] md:text-base">
              98%+
            </p>
          </div>
        </div>
      </div>

      {/* Front card — bottom-left overlap */}
      <div className="absolute left-0 top-[8.25rem] z-10 w-[88%] overflow-hidden rounded-2xl border border-[#E8EAEF] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.12)] md:top-[9rem] md:w-[86%]">
        <div className="flex items-center justify-between gap-3 border-b border-[#F3F4F6] px-4 py-3">
          <p className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-[#3C3B3B] md:text-base">
            <RiAttachment2 size={16} className="text-[#5B35E0]" />
            5 Attachments
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

        <div className="flex flex-wrap items-center gap-2 px-4 py-4 md:py-5">
          {ATTACHMENT_FILES.map((file) => (
            <span
              key={file.label}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#EEF0F4] bg-white px-2.5 py-1.5 font-heading text-[0.65rem] font-medium md:text-xs"
            >
              <span
                className="flex size-4 items-center justify-center rounded font-heading text-[0.45rem] font-bold text-white"
                style={{ backgroundColor: file.color }}
              >
                {file.label.charAt(0)}
              </span>
              {file.label}
            </span>
          ))}
          <span className="inline-flex items-center rounded-lg bg-[#F3F0FF] px-2.5 py-1.5 font-heading text-[0.65rem] font-semibold text-[#5B35E0] md:text-xs">
            2+
          </span>
        </div>
      </div>
    </div>
  );
}
