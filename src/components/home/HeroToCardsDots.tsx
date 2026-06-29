"use client";

/**
 * HeroToCardsDots — five dots with a two-phase scroll journey:
 *
 *  Phase 1 (ThreeWays): dots emerge near the OpticalFiber, ride down the
 *    container borders (3 left, 2 right) and peel into each card's EyebrowPill,
 *    turning white and handing off to the pill dot.
 *
 *  Phase 2 (ProcessFlow): the dots reappear blue on the section's left container
 *    line and each peels in to sit just before its step's tag as that step
 *    scrolls into view.
 *
 * All positions/targets are measured live every frame so the dots track the page
 * (including the pinned ProcessFlow timeline).
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useHomeIntro } from "@/contexts/HomeIntroContext";

const DOT_COLOR = "#121C49";
// Match the EyebrowPill dot (size-1.5 = 0.375rem = 6px) throughout.
const DOT_SIZE = 6;
const PARK_GAP = 0.06;
// ThreeWays: pill viewport position (height fractions) over which the dot travels.
const PEEL_START = 1.12;
const PEEL_END = 0.48;
// ProcessFlow: step-tag viewport position over which the dot peels to the tag.
const PF_PEEL_START = 0.8;
const PF_PEEL_END = 0.5;
// Gray for dots still waiting on the line; they turn blue once they reach their tag.
const PF_INACTIVE = "#BCC5D6";

type DotConfig = { label: string; side: "left" | "right"; rank: number };

const DOTS: DotConfig[] = [
  { label: "Wholesalers", side: "left", rank: 0 },
  { label: "Developers", side: "left", rank: 1 },
  { label: "Startups", side: "left", rank: 2 },
  { label: "Brokers", side: "right", rank: 0 },
  { label: "Carriers", side: "right", rank: 1 },
];

const rectOf = (sel: string) =>
  document.querySelector<HTMLElement>(sel)?.getBoundingClientRect();

export default function HeroToCardsDots() {
  const layerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { enabled: introEnabled, phase: introPhase } = useHomeIntro();

  useEffect(() => {
    if (introEnabled && introPhase !== "done") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layer = layerRef.current;
    if (!layer) return;

    const section = document.querySelector<HTMLElement>("[data-threeways]");
    if (!section) return;

    const container = section.firstElementChild as HTMLElement | null;
    const originEl = document.querySelector<HTMLElement>("[data-hero-dots-origin]");
    const ease = gsap.parseEase("power2.inOut");

    const update = () => {
      const vh = window.innerHeight || 1;
      const sRect = section.getBoundingClientRect();
      const contRect = (container ?? section).getBoundingClientRect();
      const leftX = contRect.left;
      const rightX = contRect.right;

      // ── ProcessFlow phase detection ──
      const pf = document.querySelector<HTMLElement>("[data-processflow]");
      const pfRect = pf?.getBoundingClientRect();
      const pfCont = (pf?.firstElementChild as HTMLElement | null)?.getBoundingClientRect();
      const inPF =
        !!pfRect && pfRect.top < vh * 0.85 && pfRect.bottom > vh * 0.15;

      // ── ThreeWays visibility (tied to the OpticalFiber emergence) ──
      const originRect = originEl?.getBoundingClientRect();
      const twEnter = originRect
        ? gsap.utils.clamp(0, 1, (vh * 0.9 - originRect.top) / (vh * 0.3))
        : gsap.utils.clamp(0, 1, (vh * 1.2 - sRect.top) / (vh * 0.3));
      const twExit = gsap.utils.clamp(0, 1, sRect.bottom / (vh * 0.2));
      const twVis = Math.min(twEnter, twExit);

      // ── ProcessFlow visibility ──
      let pfVis = 0;
      let pfEnter = 0;
      if (pfRect) {
        pfEnter = gsap.utils.clamp(0, 1, (vh - pfRect.top) / (vh * 0.4));
        const pfLeave = gsap.utils.clamp(0, 1, pfRect.bottom / (vh * 0.25));
        pfVis = Math.min(pfEnter, pfLeave);
      }

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const cfg = DOTS[i];

        if (inPF && pfCont) {
          // ── Phase 2: ProcessFlow — sit in the reserved dot slot before each tag ──
          const tagRect = rectOf(`[data-step-tag="${i}"]`);
          if (!tagRect) {
            dot.style.opacity = "0";
            return;
          }
          const lineX = pfCont.left;
          const tagCenterY = tagRect.top + tagRect.height / 2;

          // All five dots stay parked on the container line, stacked and
          // vertically centered as a group, so every point is always visible.
          const waitY = (0.5 + (i - (DOTS.length - 1) / 2) * 0.09) * vh;

          // Visible entrance: slide in onto the left line from off-screen left
          // as the section enters (staggered). Normalised so every dot settles
          // exactly on the line once the section is fully in view.
          const stagger = 0.06;
          const enterT = ease(
            gsap.utils.clamp(
              0,
              1,
              (pfEnter - i * stagger) / (1 - stagger * (DOTS.length - 1)),
            ),
          );
          const lineRideX = lineX - (1 - enterT) * 90;

          const peel = gsap.utils.clamp(
            0,
            1,
            (PF_PEEL_START * vh - tagCenterY) / ((PF_PEEL_START - PF_PEEL_END) * vh),
          );

          // Stay on the container line, centered; never move toward the tag.
          const x = lineRideX;
          const y = waitY;

          // Inactive dots stay gray; the dot whose step is active turns blue.
          const activeT = gsap.utils.clamp(0, 1, (peel - 0.85) / 0.15);

          dot.style.width = `${DOT_SIZE}px`;
          dot.style.height = `${DOT_SIZE}px`;
          dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
          dot.style.background = gsap.utils.interpolate(PF_INACTIVE, DOT_COLOR, activeT);
          dot.style.boxShadow = activeT > 0 ? `0 0 ${4 * activeT}px ${DOT_COLOR}` : "none";
          dot.style.opacity = String(Math.min(pfVis, enterT));
          return;
        }

        // ── Phase 1: ThreeWays — fiber → card pill ──
        const target = document.querySelector<HTMLElement>(
          `[data-card-dot="${cfg.label}"]`,
        );
        if (!target) {
          dot.style.opacity = "0";
          return;
        }

        const tr = target.getBoundingClientRect();
        const tx = tr.left + tr.width / 2;
        const ty = tr.top + tr.height / 2;
        const borderX = cfg.side === "left" ? leftX : rightX;

        const topPark = (0.12 + cfg.rank * PARK_GAP) * vh;
        const bottomPark = (0.9 - cfg.rank * PARK_GAP) * vh;

        const peel = gsap.utils.clamp(
          0,
          1,
          (PEEL_START * vh - ty) / ((PEEL_START - PEEL_END) * vh),
        );
        const e = ease(peel);

        const y = gsap.utils.clamp(topPark, bottomPark, ty);
        const x = borderX + (tx - borderX) * e;

        dot.style.width = `${DOT_SIZE}px`;
        dot.style.height = `${DOT_SIZE}px`;
        dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        const colorT = gsap.utils.clamp(0, 1, (peel - 0.6) / 0.4);
        dot.style.background = gsap.utils.interpolate(DOT_COLOR, "#FFFFFF", colorT);
        dot.style.boxShadow = `0 0 ${10 * (1 - e) + 2}px ${DOT_COLOR}`;

        // On arrival, hand off: fade the traveling dot out and the pill dot in.
        const arrived = gsap.utils.clamp(0, 1, (peel - 0.9) / 0.1);
        dot.style.opacity = String(twVis * (1 - arrived));
        target.style.opacity = String(arrived);
      });
    };

    update();

    const lenis = window.lenis;
    const onScroll = () => update();
    lenis?.on("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      lenis?.off("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      DOTS.forEach((cfg) => {
        const target = document.querySelector<HTMLElement>(
          `[data-card-dot="${cfg.label}"]`,
        );
        if (target) target.style.opacity = "";
      });
    };
  }, [introEnabled, introPhase]);

  return (
    <div ref={layerRef} className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      {DOTS.map((cfg, i) => (
        <div
          key={cfg.label}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
          className="absolute left-0 top-0 rounded-full will-change-transform"
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            background: DOT_COLOR,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
