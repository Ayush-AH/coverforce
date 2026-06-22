"use client";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient
          id="sparkleGradient"
          x1="3"
          y1="2"
          x2="21"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#9C8CFB" />
          <stop offset="100%" stopColor="#2A1AA2" />
        </linearGradient>
      </defs>
      <path
        d="M12 1.5C12.5 7 14.2 10.3 18 12C14.2 13.7 12.5 17 12 22.5C11.5 17 9.8 13.7 6 12C9.8 10.3 11.5 7 12 1.5Z"
        fill="url(#sparkleGradient)"
      />
    </svg>
  );
}

function FilledArrowUp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path
        d="M8 2.5L13 8.2H9.6V13.5H6.4V8.2H3L8 2.5Z"
        fill="white"
      />
    </svg>
  );
}

function EndpointChart() {
  return (
    <div className="relative mt-3 h-auto w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#F3EFFE]">
      <svg
        viewBox="0 0 320 140"
        className="h-full w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="apiLineGradient"
            x1="0"
            y1="0"
            x2="320"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C9BEF2" />
            <stop offset="42%" stopColor="#C9BEF2" />
            <stop offset="63%" stopColor="#4F3CC9" />
            <stop offset="74%" stopColor="#4F3CC9" />
            <stop offset="100%" stopColor="#AEA0F2" />
          </linearGradient>
          <filter id="apiGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <line
          x1="0"
          y1="78"
          x2="320"
          y2="78"
          stroke="#E4DEFB"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />

        <path
          d="M0,78 C28,90 48,42 80,50 C112,58 124,108 152,100 C176,93 198,28 228,24 C254,21 292,34 320,52"
          fill="none"
          stroke="url(#apiLineGradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        <circle cx="228" cy="24" r="14" fill="#5B35E0" opacity="0.35" filter="url(#apiGlow)" />
        <circle cx="228" cy="24" r="7" fill="white" stroke="#4F3CC9" strokeWidth="3" />
      </svg>

      <div className="absolute bottom-3 left-0 right-0 flex justify-between px-3 font-heading text-xs font-medium text-[#D9D8DD]">
        {WEEK_DAYS.map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
    </div>
  );
}

export default function ApiEndpointSummaryMock() {
  return (
    <div className="flex w-full max-w-[820px] items-stretch justify-between gap-8 rounded-xl bg-white p-9 shadow-[0_24px_60px_-12px_rgba(91,53,224,0.18)] md:p-5">
      <div className="flex flex-col justify-between">
        <div className="flex items-start gap-2">
          <SparkleIcon className="mt-1.5 h-5 w-5 shrink-0" />
          <h3 className="max-w-[200px] font-heading text-sm font-semibold leading-[1.15] text-[#3B3A3A]">
            API Endpoint Summary
          </h3>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <p className="max-w-[190px] font-heading text-xs leading-snug text-[#70747D]">
            Your bindrate is up 5.23% VS last month
          </p>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EBF3E0]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#72AF23]">
              <FilledArrowUp className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[180px] shrink-0">
        <div className="flex items-baseline gap-3">
          <p className="font-heading text-lg font-semibold leading-none text-[#33279F]">
            24%
          </p>
          <p className="flex items-baseline gap-1 whitespace-nowrap font-heading text-xs">
            <span className="font-semibold text-[#72AF23]">↑ 5.23</span>
            <span className="font-normal text-xs text-[#70747D]">from last month</span>
          </p>
        </div>

        <EndpointChart />
      </div>
    </div>
  );
}