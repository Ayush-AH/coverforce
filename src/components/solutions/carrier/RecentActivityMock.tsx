"use client";

import {
  RiArrowRightSLine,
  RiBuilding2Line,
  RiCheckLine,
  RiCloseLine,
  RiFocus3Line,
  RiGlobalLine,
  RiIdCardLine,
} from "@remixicon/react";

const ACTIVITY_ROWS = [
  {
    type: "Broker code",
    name: "Keven Dalton",
    approved: true,
    promote: "Grover Austin",
    time: "2h ago",
    icon: RiGlobalLine,
    bg: "#F3F0FF",
    color: "#5B35E0",
  },
  {
    type: "Agency Access",
    name: "Jackie Mora",
    approved: false,
    promote: "Tamika Bar'",
    time: "",
    icon: RiBuilding2Line,
    bg: "#ECFDF3",
    color: "#7CB518",
  },
  {
    type: "Producer Permission",
    name: "Lane Holden",
    approved: true,
    promote: "Lino Doug",
    time: "",
    icon: RiIdCardLine,
    bg: "#EFF6FF",
    color: "#4683E5",
  },
  {
    type: "Audit Trail",
    name: "Ismael Shepard",
    approved: true,
    promote: "Dewitt Va",
    time: "",
    icon: RiFocus3Line,
    bg: "#FEF2F2",
    color: "#EF4444",
  },
] as const;

const CHART_LEGEND = [
  { label: "Completed", color: "#5B35E0", value: "43%" },
  { label: "Pending", color: "#C4B5FD", value: "18%" },
  { label: "Overdue", color: "#7CB518", value: "25%" },
] as const;

function AccessControlChart() {
  return (
    <div className="flex flex-col items-center px-4 pb-4 pt-3 md:pb-5">
      <p className="font-heading text-sm font-semibold text-[#3C3B3B] md:text-base">
        Access Control
      </p>

      <div className="relative mt-3 flex size-[7.5rem] items-center justify-center md:mt-4 md:size-32">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(#5B35E0 0deg 155deg, #C4B5FD 155deg 220deg, #7CB518 220deg 310deg, #F3F4F6 310deg 360deg)",
          }}
        />
        <div className="relative flex size-[4.75rem] flex-col items-center justify-center rounded-full bg-white md:size-20">
          <span className="font-heading text-[0.5rem] font-medium leading-tight text-[#9CA3AF] md:text-[0.55rem]">
            Total
          </span>
          <span className="font-heading text-[0.5rem] font-medium leading-tight text-[#9CA3AF] md:text-[0.55rem]">
            Summary
          </span>
        </div>

        <span className="absolute left-1 top-6 font-heading text-[0.55rem] font-semibold text-[#5B35E0] md:left-2 md:top-7 md:text-xs">
          43%
        </span>
        <span className="absolute right-0 top-8 font-heading text-[0.55rem] font-semibold text-[#C4B5FD] md:right-1 md:top-9 md:text-xs">
          18%
        </span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-heading text-[0.55rem] font-semibold text-[#7CB518] md:bottom-3 md:text-xs">
          25%
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:mt-4">
        {CHART_LEGEND.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-1 font-heading text-[0.55rem] text-[#6B7280] md:text-[0.6rem]"
          >
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ActionBadge({ approved }: { approved: boolean }) {
  return (
    <span
      className={`inline-flex size-4 shrink-0 items-center justify-center rounded-full md:size-[18px] ${
        approved ? "bg-[#ECFDF3] text-[#7CB518]" : "bg-[#FEF2F2] text-[#EF4444]"
      }`}
    >
      {approved ? <RiCheckLine size={10} /> : <RiCloseLine size={10} />}
    </span>
  );
}

export default function RecentActivityMock() {
  return (
    <div className="relative mx-auto w-full max-w-[440px] min-h-[340px] overflow-visible pb-6 md:min-h-[370px] md:pb-8">
      {/* Back card — top-left */}
      <div className="absolute left-0 top-0 z-0 w-[94%] overflow-hidden rounded-2xl border border-[#E8EAEF] bg-white p-4 pb-10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] md:p-5 md:pb-12">
        <div className="flex items-center justify-between gap-3">
          <p className="font-heading text-sm font-semibold text-[#3C3B3B] md:text-base">
            Recent Activity
          </p>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-0.5 font-heading text-[0.65rem] font-medium text-[#5B35E0] md:text-xs"
          >
            View all
            <RiArrowRightSLine size={14} />
          </button>
        </div>

        <div className="mt-3 overflow-hidden md:mt-4">
          <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto_minmax(0,0.9fr)_auto] gap-x-2 border-b border-dashed border-[#E5E7EB] pb-2 font-heading text-[0.55rem] font-medium text-[#9CA3AF] md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto_minmax(0,1fr)_auto] md:gap-x-3 md:text-[0.6rem]">
            <span>Type</span>
            <span>Name</span>
            <span>Action</span>
            <span>Promote</span>
            <span>Time</span>
          </div>

          {ACTIVITY_ROWS.map((row) => {
            const Icon = row.icon;

            return (
              <div
                key={row.name}
                className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto_minmax(0,0.9fr)_auto] items-center gap-x-2 border-b border-dashed border-[#E5E7EB] py-2.5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto_minmax(0,1fr)_auto] md:gap-x-3 md:py-3"
              >
                <div className="flex min-w-0 items-center gap-1.5">
                  <span
                    className="flex size-5 shrink-0 items-center justify-center rounded-full md:size-6"
                    style={{ backgroundColor: row.bg, color: row.color }}
                  >
                    <Icon size={11} />
                  </span>
                  <span className="truncate font-heading text-[0.55rem] font-medium text-[#3C3B3B] md:text-[0.6rem]">
                    {row.type}
                  </span>
                </div>
                <span className="truncate font-heading text-[0.55rem] font-normal text-[#6B7280] md:text-[0.6rem]">
                  {row.name}
                </span>
                <ActionBadge approved={row.approved} />
                <span className="truncate font-heading text-[0.55rem] font-normal text-[#6B7280] md:text-[0.6rem]">
                  {row.promote}
                </span>
                <span className="font-heading text-[0.55rem] font-normal text-[#9CA3AF] md:text-[0.6rem]">
                  {row.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Front card — bottom-right overlap */}
      <div className="absolute right-0 top-[9.5rem] z-10 w-[58%] overflow-hidden rounded-2xl border border-[#E8EAEF] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.12)] md:top-[10.25rem] md:w-[56%]">
        <AccessControlChart />
      </div>
    </div>
  );
}
