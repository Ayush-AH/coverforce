import Image from "next/image";
import { RiArrowRightSLine, RiCheckLine, RiCloseLine } from "@remixicon/react";

const ACTIVITY_ROWS = [
  {
    name: "Markel",
    status: "Appointment Submitted",
    approved: true,
    time: "2h ago",
    logo: "/images/solution/recent-logo1.svg",
    logoBg: "#F3F0FF",
  },
  {
    name: "Travelers",
    status: "Appointment Approved",
    approved: false,
    time: "3h ago",
    logo: "/images/solution/recent-logo2.svg",
    logoBg: "#ECFDF3",
  },
  {
    name: "Chubb",
    status: "Documents Requested",
    approved: true,
    time: "4h ago",
    logo: "/images/solution/recent-logo3.svg",
    logoBg: "#E0F7FA",
  },
  {
    name: "The Hartford",
    status: "Appointment in review",
    approved: true,
    time: "5h ago",
    logo: "/images/solution/recent-logo4.svg",
    logoBg: "#FCE7F3",
  },
] as const;

function StatusIcon({ approved }: { approved: boolean }) {
  return (
    <span
      className={`inline-flex size-3 shrink-0 items-center justify-center rounded-full md:size-3 ${
        approved ? "bg-[#72AF23] text-[#FFFFFF]" : "bg-[#F92020] text-[#FFFFFF]"
      }`}
    >
      {approved ? <RiCheckLine size={8} /> : <RiCloseLine size={8} />}
    </span>
  );
}

export default function StartupRecentActivityCard() {
  return (
    <div className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[1.75rem] border border-[#E8EAEF] bg-white p-4 shadow-[0_16px_48px_rgba(0,0,0,0.12)] md:py-5 px-6">
      <div className="flex items-center justify-between gap-3 pb-2">
        <p className="font-heading text-lg font-semibold text-[#3C3B3B] md:text-sm">
          Recent Activity
        </p>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-0.5 font-heading text-sm font-medium text-[#5B35E0] md:text-sm"
        >
          View all
          <RiArrowRightSLine size={12} />
        </button>
      </div>

      <div className="">
        {ACTIVITY_ROWS.map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)_auto_auto] items-center gap-x-3 border-b border-dashed border-[#E5E7EB] py-4 last:border-b-0 md:gap-x-4 md:py-2"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full md:size-8"
                style={{ backgroundColor: row.logoBg }}
              >
                <Image
                  src={row.logo}
                  alt={row.name}
                  width={24}
                  height={24}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="truncate font-sans text-sm font-medium text-[#111827] md:text-xs">
                {row.name}
              </span>
            </div>

            <span className="truncate font-sans text-xs font-normal text-[#111827]/60 md:text-xs">
              {row.status}
            </span>

            <StatusIcon approved={row.approved} />

            <span className="shrink-0 font-heading text-xs font-normal text-[#111827]/60 md:text-xs">
              {row.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
