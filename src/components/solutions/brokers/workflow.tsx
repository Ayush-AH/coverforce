"use client";

import { useRef, useState, useLayoutEffect, useEffect, useCallback } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

// One arc = one step. Dots sit at the two base endpoints of the arc.
// The icon sits centered above the arc's peak.
const ICON_RATIO = 0.1;    // icon radius as a fraction of ARC_W, keeps icon size proportional
const SIDE_PAD = 14;        // left/right breathing room so the first/last dot and icon aren't clipped flush against the edge
const DOT_R = 5;
const ENTER_DISTANCE = 18;  // px the icon + label travel down as they enter from the top

// Colors
const ACTIVE_COLOR = "#2B409E";
const INACTIVE_TEXT = "#373737";
const INACTIVE_STROKE = "#a8adb4";
const INACTIVE_CIRCLE_FILL = "#eef0f3";
const INACTIVE_CIRCLE_STROKE = "#d7dae0";
const INACTIVE_ICON = "#5b6472";
const PARAGRAPH_GRAY = "#b9bfc9";

// Phase boundaries within a single step's local progress (0..1).
// 0 -> ENTER_END: icon + label drop down and fade/color in from above the
//                  arc, landing fully colored by the time they're in place
// 0 -> ARC_DRAW_END: the arc border draws in, and the paragraph text fills
//                     in step with it (same window, both finish together)
const ENTER_END = 0.3;
const ARC_DRAW_END = 0.4;
const PARAGRAPH_FADE_IN_END = 0.15;

const ICONS = {
  mail: (
    <path d="M3 6h18v12H3V6zm0 0l9 7 9-7" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  doc: (
    <path d="M6 3h8l4 4v14H6V3zm8 0v4h4M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  refresh: (
    <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M4 4v5h5M20 20v-5h-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  clock: (
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  scale: (
    <path d="M12 3v18M5 7l-3 7a3 3 0 0 0 6 0L5 7zm14 0l-3 7a3 3 0 0 0 6 0l-3-7zM5 7h14M8 21h8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  check: (
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
} as const;

type WorkflowIconKey = keyof typeof ICONS;

type WorkflowStep = {
  label: string;
  icon: WorkflowIconKey;
  text: string;
  mobileText?: string;
};

const manualSteps: WorkflowStep[] = [
  {
    label: "Email Intake",
    icon: "mail",
    mobileText: "Submissions pile up as unstructured emails, PDFs, and attachments before anyone can quote.",
    text: "Submissions arrive as unstructured emails, PDFs, and attachments — producers spend hours sorting and forwarding before underwriting can even begin.",
  },
  {
    label: "Manual Review",
    icon: "doc",
    mobileText: "Underwriters review every submission by hand for missing data and compliance gaps.",
    text: "Underwriters comb through every submission by hand, checking for missing data, inconsistent formatting, and compliance gaps before a quote can even begin.",
  },
  {
    label: "Re-enter Data",
    icon: "refresh",
    mobileText: "Producers retype the same details into multiple carrier portals, one field at a time.",
    text: "Producers retype the same applicant details into multiple carrier portals, copying values from PDFs and emails one field at a time.",
  },
  {
    label: "Wait for Quotes",
    icon: "clock",
    mobileText: "Submissions sit in carrier queues for days while producers chase status updates.",
    text: "Submissions sit in carrier queues for days while underwriters work through backlogs, leaving producers chasing status updates instead of clients.",
  },
  {
    label: "Manual Compare",
    icon: "scale",
    mobileText: "Spreadsheets get built by hand to compare coverage and premiums across carriers.",
    text: "Spreadsheets get built by hand to line up coverage limits, exclusions, and premiums across carriers before a recommendation can be made.",
  },
  {
    label: "Slow Bind",
    icon: "check",
    mobileText: "Policies are bound across portals and email chains with no single source of truth.",
    text: "Policies are bound across carrier portals, email chains, and internal systems — with documents scattered and no single source of truth.",
  },
];

const coverforceSteps: WorkflowStep[] = [
  {
    label: "Smart Intake",
    icon: "mail",
    mobileText: "Enter client information once and use it across every carrier.",
    text: "AI reads inbound emails, ACORDs, loss runs, and prior policies. Turns unstructured submissions into clean, structured applications. Auto-fills key policy, business, and risk details. Routes submissions to the right underwriter or desk.",
  },
  {
    label: "Carrier Submission",
    icon: "doc",
    mobileText: "Submit to 40+ carriers from one workflow — no portal logins or rekeying.",
    text: "Send structured applications to every appointed carrier from a single screen. Dynamic carrier questions surface automatically so nothing gets missed.",
  },
  {
    label: "Market Selection",
    icon: "refresh",
    mobileText: "AI appetite matching surfaces the right markets for every risk instantly.",
    text: "CoverForce matches each submission to carrier appetite in real time, so producers know where to quote before they start.",
  },
  {
    label: "Routing",
    icon: "clock",
    mobileText: "Submissions route to the right desk or underwriter automatically.",
    text: "Intelligent routing sends each submission to the right team member based on LOB, carrier, and workload — no manual triage.",
  },
  {
    label: "Binding",
    icon: "scale",
    mobileText: "Compare quotes side by side and bind in one connected flow.",
    text: "Line up coverage limits, exclusions, and premiums across carriers in one view — then bind without leaving the platform.",
  },
  {
    label: "Renewals",
    icon: "check",
    mobileText: "Renewals run on the same data — no re-entry, no lost history.",
    text: "Once a quote is approved, policies are bound and issued instantly, with documents delivered straight to the producer and client in one connected flow.",
  },
];

type WorkflowMode = "manual" | "coverforce";

function WorkflowModeToggle({
  mode,
  onChange,
}: {
  mode: WorkflowMode;
  onChange: (mode: WorkflowMode) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const manualBtnRef = useRef<HTMLButtonElement>(null);
  const coverforceBtnRef = useRef<HTMLButtonElement>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const activeBtn = mode === "manual" ? manualBtnRef.current : coverforceBtnRef.current;
    if (!container || !activeBtn) return;

    const updatePill = () => {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setPillStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    };

    updatePill();

    const ro = new ResizeObserver(updatePill);
    ro.observe(container);
    return () => ro.disconnect();
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex overflow-hidden rounded-full bg-[#151f4d] p-[2px]"
    >
      {/* Sliding white capsule, positioned behind the buttons */}
      {pillStyle && (
        <div
          className="absolute top-[2px] bottom-[2px] rounded-full bg-white transition-[left,width] duration-300 ease-out"
          style={{ left: pillStyle.left, width: pillStyle.width }}
        />
      )}

      <button
        ref={manualBtnRef}
        type="button"
        onClick={() => onChange("manual")}
        className={`relative z-10 px-3 py-1.5 font-mono text-[9px] font-medium rounded-full uppercase transition-colors duration-300 md:px-4 md:py-2 md:text-xs ${
          mode === "manual" ? "text-[#151f4d]" : "text-white"
        }`}
      >
        Manual Workflow
      </button>
      <button
        ref={coverforceBtnRef}
        type="button"
        onClick={() => onChange("coverforce")}
        className={`relative z-10 px-3 py-1.5 font-mono text-[9px] font-medium rounded-full uppercase transition-colors duration-300 md:px-4 md:py-2 md:text-xs ${
          mode === "coverforce" ? "text-[#151f4d]" : "text-white"
        }`}
      >
        With CoverForce
      </button>
    </div>
  );
}

// --- helpers -----------------------------------------------------------

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const v = parseInt(h, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function lerpColor(a: string, b: string, t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const r = Math.round(r1 + (r2 - r1) * clamped);
  const g = Math.round(g1 + (g2 - g1) * clamped);
  const bl = Math.round(b1 + (b2 - b1) * clamped);
  return `rgb(${r}, ${g}, ${bl})`;
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

// Shared step-progress helpers — used by both the desktop arc connector
// and the mobile stepper so their animations stay in sync.
function getArcFill(i: number, activeIndex: number, stepProgress: number) {
  if (i < activeIndex) return 1;
  if (i > activeIndex) return 0;
  return stepProgress / ARC_DRAW_END;
}
function getColorActv(i: number, activeIndex: number, stepProgress: number) {
  if (i < activeIndex) return 1;
  if (i > activeIndex) return 0;
  // Fills in color across the same window as the drop-in entrance, so
  // by the time the icon lands in place it's already fully colored.
  return clamp01(stepProgress / ENTER_END);
}
function getEnterProgress(i: number, activeIndex: number, stepProgress: number) {
  return getColorActv(i, activeIndex, stepProgress);
}

// Height (px) reserved for the mobile sticky nav bar. Kept as a single
// constant so the scroll-progress math (compute) and the "jump back to
// step 1" math (scrollTrackToStart) can never disagree about how much
// space the nav eats — a mismatch between the two was what made the
// toggle look like it was landing on the wrong scroll position instead
// of cleanly snapping to the top of the section.
const MOBILE_NAV_FALLBACK_HEIGHT = 56;

function getMobileNavOffset(): number {
  if (typeof window === "undefined") return 0;
  if (window.matchMedia("(min-width: 1024px)").matches) return 0;
  const header = document.querySelector(".site-view-header");
  return header?.getBoundingClientRect().height ?? MOBILE_NAV_FALLBACK_HEIGHT;
}

const MOBILE_ICON_SIZE = 40; // matches size-10
const MOBILE_ICON_R = 18;    // leaves room for the 2px stroke inside the 40px box
const MOBILE_ICON_CIRCUMFERENCE = 2 * Math.PI * MOBILE_ICON_R;

// --- letter-by-letter fill text -----------------------------------------

function FillText({ text, progress }: { text: string; progress: number }) {
  const filledCount = Math.floor(text.length * clamp01(progress));
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            color: i < filledCount ? ACTIVE_COLOR : PARAGRAPH_GRAY,
            transition: "color 0.12s linear",
          }}
        >
          {ch}
        </span>
      ))}
    </>
  );
}

// --- single arc + dot + icon for one step -------------------------------

function ArcStep({
  step,
  x1,
  x2,
  cx,
  ARC_H,
  r,
  ICON_R,
  arcFill,
  colorActv,
  enterProgress,
}: {
  step: WorkflowStep;
  x1: number;
  x2: number;
  cx: number;
  ARC_H: number;
  r: number;
  ICON_R: number;
  arcFill: number;
  colorActv: number;
  enterProgress: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  const arcPath = `M ${x1} ${ARC_H} A ${r} ${r} 0 0 1 ${x2} ${ARC_H}`;
  const fillPath = `${arcPath} L ${x1} ${ARC_H} Z`;

  useLayoutEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength());
    }
  }, [arcPath]);

  const dashOffset = length * (1 - clamp01(arcFill));
  const circleFill = lerpColor(INACTIVE_CIRCLE_FILL, ACTIVE_COLOR, colorActv);
  const circleStroke = lerpColor(INACTIVE_CIRCLE_STROKE, ACTIVE_COLOR, colorActv);
  const iconColor = lerpColor(INACTIVE_ICON, "#ffffff", colorActv);

  return (
    <g>
      {arcFill > 0 && <path d={fillPath} fill="url(#arcGradient)" opacity={clamp01(arcFill)} />}

      {/* background dashed track, always visible */}
      <path
        d={arcPath}
        fill="none"
        stroke={INACTIVE_STROKE}
        strokeWidth={1.5}
        strokeDasharray="3 6"
        strokeLinecap="round"
      />

      {/* foreground solid arc that draws in as arcFill increases */}
      <path
        ref={pathRef}
        d={arcPath}
        fill="none"
        stroke={ACTIVE_COLOR}
        strokeWidth={2}
        strokeLinecap="round"
        style={{
          strokeDasharray: length || undefined,
          strokeDashoffset: length ? dashOffset : undefined,
          opacity: length ? 1 : 0,
        }}
      />

      <circle cx={x1} cy={ARC_H} r={DOT_R} fill={ACTIVE_COLOR} />
      <circle cx={x2} cy={ARC_H} r={DOT_R} fill={ACTIVE_COLOR} />

      {/* icon circle + icon: hidden above the arc until this step becomes
          active, then drops down and fades in */}
      <g
        style={{
          opacity: enterProgress,
          transform: `translateY(${(1 - enterProgress) * -ENTER_DISTANCE}px)`,
          transformOrigin: `${cx}px 0px`,
          transition: "opacity 0.05s linear",
        }}
      >
        <circle
          cx={cx}
          cy={0}
          r={ICON_R}
          fill={circleFill}
          stroke={circleStroke}
          strokeOpacity={1 - colorActv}
        />
        <g transform={`translate(${cx - ICON_R * 0.46}, ${-ICON_R * 0.46})`} style={{ color: iconColor }}>
          <svg width={ICON_R * 0.92} height={ICON_R * 0.92} viewBox="0 0 24 24">
            {ICONS[step.icon]}
          </svg>
        </g>
      </g>
    </g>
  );
}

// --- mobile vertical stepper --------------------------------------------

function MobileWorkflowStepper({
  steps,
  activeIndex,
  stepProgress,
}: {
  steps: WorkflowStep[];
  activeIndex: number;
  stepProgress: number;
}) {
  return (
    <div className="flex flex-col overflow-visible pl-1 lg:hidden">
      {steps.map((step, i) => {
        const isActive = i === activeIndex;
        const colorActv = getColorActv(i, activeIndex, stepProgress);
        const ringProgress = clamp01(getArcFill(i, activeIndex, stepProgress));
        const lineFill = i < activeIndex ? 1 : i === activeIndex ? ringProgress : 0;

        const diskFill = lerpColor(INACTIVE_CIRCLE_FILL, ACTIVE_COLOR, colorActv);
        const iconColor = lerpColor(INACTIVE_ICON, "#ffffff", colorActv);
        const ringDashoffset = MOBILE_ICON_CIRCUMFERENCE * (1 - ringProgress);

        return (
          <div key={step.label} className="flex gap-3">
            <div className="flex w-10 shrink-0 flex-col items-center overflow-visible">
              <div
                className="relative shrink-0 overflow-visible"
                style={{ width: MOBILE_ICON_SIZE, height: MOBILE_ICON_SIZE }}
              >
                <svg
                  width={MOBILE_ICON_SIZE}
                  height={MOBILE_ICON_SIZE}
                  viewBox={`0 0 ${MOBILE_ICON_SIZE} ${MOBILE_ICON_SIZE}`}
                  className="absolute inset-0 overflow-visible"
                >
                  {/* filled disk — crossfades gray to indigo as the step activates */}
                  <circle
                    cx={MOBILE_ICON_SIZE / 2}
                    cy={MOBILE_ICON_SIZE / 2}
                    r={MOBILE_ICON_R}
                    fill={diskFill}
                  />
                  {/* static gray track underneath, for steps not yet reached */}
                  <circle
                    cx={MOBILE_ICON_SIZE / 2}
                    cy={MOBILE_ICON_SIZE / 2}
                    r={MOBILE_ICON_R}
                    fill="none"
                    stroke={INACTIVE_CIRCLE_STROKE}
                    strokeWidth={2}
                  />
                  {/* border draws in clockwise as the step's scroll progress advances.
                      Rotated via an SVG attribute on just this circle (not a CSS
                      transform on the whole <svg>) so nothing can push the ring
                      outside its box on sub-pixel rounding — a circle looks
                      identical rotated, so the fill/track circles are unaffected. */}
                  <circle
                    cx={MOBILE_ICON_SIZE / 2}
                    cy={MOBILE_ICON_SIZE / 2}
                    r={MOBILE_ICON_R}
                    fill="none"
                    stroke={ACTIVE_COLOR}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray={MOBILE_ICON_CIRCUMFERENCE}
                    strokeDashoffset={ringDashoffset}
                    transform={`rotate(-90 ${MOBILE_ICON_SIZE / 2} ${MOBILE_ICON_SIZE / 2})`}
                  />
                </svg>
                <svg
                  className="absolute inset-0 m-auto size-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ color: iconColor }}
                  aria-hidden
                >
                  {ICONS[step.icon]}
                </svg>
              </div>

              {i < steps.length - 1 && (
                <div className="relative my-1 w-px flex-1 min-h-5 overflow-hidden bg-[#d7dae0]">
                  <div
                    className="absolute inset-x-0 top-0 bg-[#2B409E]"
                    style={{ height: `${lineFill * 100}%` }}
                  />
                </div>
              )}
            </div>

            <div className={`min-w-0 flex-1 ${i < steps.length - 1 ? "pb-3.5" : "pb-0"}`}>
              <p
                className="text-sm font-semibold"
                style={{ color: lerpColor(PARAGRAPH_GRAY, ACTIVE_COLOR, colorActv) }}
              >
                {step.label}
              </p>
              {isActive && (
                <p
                  className="mt-1.5 text-sm leading-[1.45]"
                  style={{
                    color: ACTIVE_COLOR,
                    opacity: clamp01(stepProgress / PARAGRAPH_FADE_IN_END),
                  }}
                >
                  {step.mobileText ?? step.text}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- connector row (labels + svg arcs) ----------------------------------

function WorkflowConnector({ steps, rawIndex }: { steps: WorkflowStep[]; rawIndex: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Fit every step within the container width — no horizontal scrolling.
  const ARC_W = containerWidth > 0 ? (containerWidth - SIDE_PAD * 2) / steps.length : 200;
  const ARC_H = ARC_W / 2;
  const ICON_R = Math.max(18, ARC_W * ICON_RATIO);
  const TOP_PAD = ICON_R + 16;

  const totalWidth = steps.length * ARC_W + SIDE_PAD * 2;
  const svgHeight = TOP_PAD + ARC_H + DOT_R + 4;

  const activeIndex = Math.min(steps.length - 1, Math.floor(rawIndex));
  const stepProgress = clamp01(rawIndex - activeIndex);

  // All steps are visible at once, so the strip never slides left.
  const shift = 0;

  const getArcFillLocal = (i: number) => getArcFill(i, activeIndex, stepProgress);
  const getColorActvLocal = (i: number) => getColorActv(i, activeIndex, stepProgress);
  const getEnterProgressLocal = (i: number) => getEnterProgress(i, activeIndex, stepProgress);

  return (
    <div ref={wrapperRef} className="hidden w-full lg:block">
      {/* Labels */}
      <div className="flex" style={{ width: totalWidth, transform: `translateX(-${shift}px)` }}>
        <div style={{ width: SIDE_PAD, flexShrink: 0 }} />
        {steps.map((step, i) => {
          const enterProgress = getEnterProgressLocal(i);
          return (
            <div key={step.label} className="flex justify-center" style={{ width: ARC_W }}>
              <span
                className="text-sm md:text-base font-semibold whitespace-nowrap"
                style={{
                  color: lerpColor(INACTIVE_TEXT, ACTIVE_COLOR, getColorActvLocal(i)),
                  opacity: enterProgress,
                  transform: `translateY(${(1 - enterProgress) * -ENTER_DISTANCE}px)`,
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Arcs */}
      <svg width={totalWidth} height={svgHeight} viewBox={`0 0 ${totalWidth} ${svgHeight}`}>
        <defs>
          <linearGradient id="arcGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={ACTIVE_COLOR} stopOpacity="0" />
            <stop offset="100%" stopColor={ACTIVE_COLOR} stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <g transform={`translate(${SIDE_PAD - shift}, ${TOP_PAD})`}>
          {steps.map((step, i) => {
            const x1 = i * ARC_W;
            const x2 = x1 + ARC_W;
            const cx = x1 + ARC_W / 2;
            const r = ARC_W / 2;

            return (
              <ArcStep
                key={step.label}
                step={step}
                x1={x1}
                x2={x2}
                cx={cx}
                ARC_H={ARC_H}
                r={r}
                ICON_R={ICON_R}
                arcFill={getArcFillLocal(i)}
                colorActv={getColorActvLocal(i)}
                enterProgress={getEnterProgressLocal(i)}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

// --- main section --------------------------------------------------------

const Workflow = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [workflowMode, setWorkflowMode] = useState<WorkflowMode>("coverforce");
  const [rawIndex, setRawIndex] = useState(0);
  const [isModeResetting, setIsModeResetting] = useState(false);
  const modeResetLockRef = useRef(false);
  const computeScrollProgressRef = useRef<() => void>(() => {});

  const steps = workflowMode === "manual" ? manualSteps : coverforceSteps;

  // Scrolls the window so the top of the scroll track lines up exactly with
  // where compute() below treats "0% progress" as being — i.e. `rect.top -
  // navOffset === 0`. Using the exact same offset function as compute()
  // (getMobileNavOffset) is what guarantees this always lands on step 1
  // instead of a few pixels off, which on mobile was enough to make the
  // newly-swapped-in steps look like they'd been appended below the old
  // ones rather than cleanly replacing them in place.
  const scrollTrackToStart = useCallback((smooth: boolean) => {
    const track = trackRef.current;
    if (!track) return;

    const navOffset = getMobileNavOffset();
    const top = track.getBoundingClientRect().top + window.scrollY - navOffset;

    if (window.lenis) {
      window.lenis.scrollTo(top, {
        immediate: !smooth,
        duration: smooth ? 1 : 0,
      });
      return;
    }

    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  }, []);

  const handleWorkflowModeChange = useCallback(
    (mode: WorkflowMode) => {
      if (mode === workflowMode) return;

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      // Lock the scroll listener and force step 1 immediately, then fire the
      // scroll — all synchronously in this click handler, before the steps
      // list swaps. Waiting on requestAnimationFrame here was the bug: it
      // let the new step content render at whatever scroll position the
      // user happened to be at, which on mobile reads as "the new list got
      // appended below the old one" instead of a clean reset to the top.
      modeResetLockRef.current = true;
      setIsModeResetting(true);
      setRawIndex(0);
      setWorkflowMode(mode);
      scrollTrackToStart(isDesktop);

      // Lenis immediate scroll may not emit a scroll event — sync once the
      // jump has been applied so the stepper isn't stuck waiting for input.
      if (!isDesktop) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => computeScrollProgressRef.current());
        });
      }

      window.setTimeout(
        () => {
          setIsModeResetting(false);
          modeResetLockRef.current = false;
          requestAnimationFrame(() => computeScrollProgressRef.current());
        },
        isDesktop ? 650 : 50,
      );
    },
    [workflowMode, scrollTrackToStart],
  );

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
  });

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      if (modeResetLockRef.current) return;

      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const navOffset = getMobileNavOffset();
      const viewportH = window.innerHeight - navOffset;
      const scrollable = rect.height - viewportH;
      if (scrollable <= 0) {
        setRawIndex(0);
        return;
      }
      const scrolled = Math.min(scrollable, Math.max(0, -(rect.top - navOffset)));
      const progress = scrolled / scrollable;
      setRawIndex(progress * steps.length);
    };

    computeScrollProgressRef.current = compute;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const lenis = window.lenis;
    lenis?.on("scroll", onScroll);
    compute();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      lenis?.off("scroll", onScroll);
    };
  }, [steps.length]);

  const activeIndex = isModeResetting
    ? 0
    : Math.min(steps.length - 1, Math.floor(rawIndex));
  const stepProgress = isModeResetting ? 0 : clamp01(rawIndex - activeIndex);
  const paragraphOpacity = Math.min(1, stepProgress / PARAGRAPH_FADE_IN_END);
  // Text fill now tracks the semicircle border draw (arcFill), not the
  // icon color fill — so the paragraph fills in while the arc line itself
  // is drawing, and finishes right as the border completes.
  const textFill = clamp01(stepProgress / ARC_DRAW_END);
  const activeStep = steps[activeIndex];

  return (
    <section ref={sectionRef} id="workflow" className="scroll-mt-14 bg-white text-[#0a143b] lg:scroll-mt-0">
      <Container borderColor="#53535380" borderBottom={true}>
        {/* Tall scroll track. Its height determines how much scroll distance
            it takes to move through all steps while the content stays pinned. */}
        <div ref={trackRef} style={{ height: `${(steps.length + 1) * 100}vh` }} className="relative">
          <div className="sticky top-14 flex min-h-[calc(100svh-3.5rem)] flex-col gap-6 overflow-x-hidden pb-8 pt-2 md:gap-8 lg:top-0 lg:h-screen lg:min-h-0 lg:justify-between lg:gap-8 lg:overflow-hidden lg:py-36 lg:pb-18">
            <div
              ref={headerRef}
              className="flex shrink-0 flex-col items-center gap-5 text-center lg:grid lg:grid-cols-2 lg:items-end lg:justify-between lg:gap-12 lg:text-left"
            >
              <div className="flex flex-col items-center space-y-4 lg:items-start lg:justify-end lg:space-y-5">
                <h2
                  ref={headingRef}
                  className="max-w-md text-[1.75rem] font-heading font-medium leading-[1.12] tracking-tight text-[#0a143b] md:text-4xl lg:text-[1.625rem] lg:text-[#BCC5D6] lg:leading-[1.12]"
                >
                  <span data-split>From intake to bind, <br />
                    reimagined
                  </span>
                  <span data-split>.</span>
                </h2>
                <p className="max-w-xs text-sm leading-[1.45] text-[#50617a] lg:hidden">
                  Compare manual workflows with CoverForce from intake to bind.
                </p>
                <div className="hidden lg:block">
                  <Button href="/contact">Start a quote</Button>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <WorkflowModeToggle mode={workflowMode} onChange={handleWorkflowModeChange} />
              </div>
            </div>

            <div className="w-full lg:flex-none">
              <MobileWorkflowStepper
                key={`mobile-${workflowMode}`}
                steps={steps}
                activeIndex={activeIndex}
                stepProgress={stepProgress}
              />
              <WorkflowConnector
                key={`desktop-${workflowMode}`}
                steps={steps}
                rawIndex={rawIndex}
              />
            </div>

            <div className="hidden min-h-28 items-end lg:flex">
              <p
                key={`${workflowMode}-${activeIndex}`}
                className="max-w-2xl text-3xl font-heading font-medium leading-[1.12] tracking-tight md:text-4xl lg:text-2xl lg:leading-[1.12]"
                style={{ opacity: paragraphOpacity, transition: "opacity 0.3s ease" }}
              >
                <FillText text={activeStep.text} progress={textFill} />
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Workflow;