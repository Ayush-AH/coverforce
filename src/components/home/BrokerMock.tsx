"use client";

import MockWithCardHover from "@/components/common/MockWithCardHover";
import { PeriodicIncrementalStat } from "@/components/common/AnimatedPercent";
import { MICRO_EASE, MICRO_TAB_COLOR_MS, MICRO_WORKFLOW_MS } from "@/lib/motion";
import { RiUserFill } from "@remixicon/react";
import { useEffect, useState } from "react";

const ROTATE_MS = 8000;
const CHART_MAX = 85;

const CHART_BARS_REST = [15, 25, 35, 45, 55, 65, 75, CHART_MAX] as const;
const CHART_BARS_HOVER = [12, 28, 32, 48, 52, 68, 72, 80] as const;

const HEIGHT_TRANSITION = `height ${MICRO_TAB_COLOR_MS}ms ${MICRO_EASE}`;
const WORKFLOW_WIDTH_TRANSITION = `width ${MICRO_WORKFLOW_MS}ms ${MICRO_EASE}`;

const WORKFLOW_START = 62;
const WORKFLOW_MAX = 68;
const WORKFLOW_HOVER = 68;

type BrokerMockProps = {
  cardHovered?: boolean;
};

function useWorkflowPercent(cardHovered: boolean) {
  const [percent, setPercent] = useState(WORKFLOW_START);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const id = window.setInterval(() => {
      setPercent((current) => {
        const next = current + 1;
        return next > WORKFLOW_MAX ? WORKFLOW_START : next;
      });
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, []);

  return cardHovered ? WORKFLOW_HOVER : percent;
}

export default function BrokerMock({ cardHovered = false }: BrokerMockProps) {
  const chartHeights = cardHovered ? CHART_BARS_HOVER : CHART_BARS_REST;
  const workflowPercent = useWorkflowPercent(cardHovered);

  return (
    <div className="relative mx-auto w-full max-md:mt-10 max-md:sm:mt-12 max-md:h-[300px] max-md:max-w-[280px] max-md:overflow-visible md:pointer-events-none md:h-[260px] md:max-w-[300px]">
      <div className="absolute top-0 right-0 max-md:w-full md:-right-20 md:w-full">
        <div className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
          <div className="max-md:px-4 max-md:pt-3 max-md:pb-2.5 px-5 pt-4 pb-3">
            <p className="text-[9px] font-mono font-medium uppercase tracking-wide text-[#6B7280]">
              Quotes Returned Today
            </p>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-1 text-[#0a143b]">
              <PeriodicIncrementalStat
                start={40}
                step={1}
                max={47}
                intervalMs={ROTATE_MS}
                suffix="+"
                suffixClassName="max-md:text-base md:text-lg font-sans font-medium leading-none text-[#494646]"
                className="max-md:text-base md:text-lg font-sans font-medium leading-none text-[#494646]"
              />
              <span className="max-md:text-base md:text-lg font-sans font-medium leading-none text-[#494646]">
                carriers
              </span>
            </div>
          </div>

          <div className="border-t border-neutral-100" />

          <div className="flex max-md:items-end max-md:gap-2 max-md:px-3 max-md:pt-2 max-md:pb-3 items-start gap-3 px-5 pt-3 pb-4">
            <div className="min-w-0 flex-1 max-md:pb-1">
              <p className="text-[10px] font-sans font-normal text-[#323233] md:whitespace-nowrap">
                AI pre-filled application
              </p>
              <p className="mt-0.5 text-[10px] font-sans font-normal text-[#6B7280]">
                Pipeline visible
              </p>
            </div>

            <div className="max-md:origin-bottom-right max-md:scale-[0.82] md:scale-100">
              <div
                className="flex shrink-0 items-end gap-2 border-b border-dashed border-[#CCCCCC]"
                style={{ height: `${CHART_MAX}px` }}
              >
                {chartHeights.map((barHeight, i) => (
                  <div
                    key={i}
                    className="flex w-[9px] items-end"
                    style={{ height: `${CHART_MAX}px` }}
                  >
                    <div
                      className="w-full rounded-t-[3px]"
                      style={{
                        height: `${barHeight}px`,
                        background: "#6366F1",
                        opacity: 0.35 + i * 0.09,
                        transition: HEIGHT_TRANSITION,
                      }}
                    />
                  </div>
                ))}
                <div className="ml-0.5 flex items-center self-stretch">
                  <span
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      fontSize: "7px",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#a3a3a3",
                      lineHeight: 1,
                    }}
                  >
                    Time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-10 max-md:w-full md:-left-20 md:w-full">
        <div className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.14)]">
          <div className="flex items-center gap-3 border border-[#F3F4F6] px-4 py-2.5">
            <span className="flex size-[23px] shrink-0 items-center justify-center rounded-full bg-[#F9FAFB]">
              <RiUserFill color="#6F6F6F" size={11} />
            </span>
            <div>
              <p className="text-xs font-heading font-medium leading-tight text-[#3C3B3B]">
                Broker Workflow
              </p>
              <p className="truncate text-[0.60rem] font-heading font-normal leading-tight text-[#3C3B3B]">
                One workflow for every producer
              </p>
            </div>
          </div>

          <div className="px-4 pt-3 pb-4">
            <span
              className="max-md:text-xl md:text-2xl font-sans font-medium leading-none text-[#494646] tabular-nums"
              style={{ transition: WORKFLOW_WIDTH_TRANSITION }}
            >
              {workflowPercent}%
            </span>
            <div className="flex items-start max-md:gap-4 max-md:pt-2 gap-10 pt-3">
              <div className="shrink-0">
                <p className="mt-1 text-xs font-heading font-medium uppercase tracking-normal text-[#4F46E5]">
                  Faster Quoting
                </p>
                <p className="mt-0.5 truncate text-[0.60rem] font-heading font-normal leading-tight text-[#3C3B3B]">
                  Quote time reduction
                </p>
              </div>

              <div className="w-full pt-2">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[8px] font-medium uppercase tracking-normal text-[#797979]">
                    Intake
                  </span>
                  <span className="text-[8px] font-medium uppercase tracking-normal text-[#797979]">
                    Bind
                  </span>
                </div>
                <div
                  className="relative overflow-hidden rounded-full"
                  style={{ height: "8px", background: "#e5e7eb" }}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${workflowPercent}%`,
                      background: "linear-gradient(90deg, #5B35E0 0%, #A78BFA 100%)",
                      transition: WORKFLOW_WIDTH_TRANSITION,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrokerMockWithCardHover() {
  return (
    <MockWithCardHover>
      {(cardHovered) => <BrokerMock cardHovered={cardHovered} />}
    </MockWithCardHover>
  );
}
