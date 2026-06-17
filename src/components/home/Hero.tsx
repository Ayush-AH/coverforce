"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Button from "@/components/common/Button";
import Container from "../common/Container";
import SectionRadialGlow from "../common/SectionRadialGlow";
import dynamic from "next/dynamic";
import { RiPlayFill } from "@remixicon/react";

const OpticalFiber = dynamic(() => import("./OpticalFiber"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});
import {
  HOME_INTRO_EASE,
  HOME_INTRO_HERO_RISE_MS,
  HOME_INTRO_LOADER_FADE_MS,
  HOME_INTRO_LOADER_WAVE_MS,
  HOME_INTRO_NAV_MS,
  HOME_INTRO_NETWORK_MS,
  useHomeIntro,
} from "@/contexts/HomeIntroContext";
import { animateLoaderWordsWave } from "@/lib/animateSplitTextReveal";

const INTRO_TITLE_LINES = [
  ["AI-Native", "Insurance"],
  ["Distribution", "Platform"],
] as const;

type StatItem = {
  value: string;
  label: string;
};

const stats: StatItem[] = [
  { value: "140K+", label: "AI-labeled Carrier Interactions" },
  { value: "40+", label: "Carrier & MGA Integrations" },
  { value: "15,000+", label: "Agencies on Platform" },
  { value: "$500M+", label: "Gross Quoted Premium" },
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { enabled: introEnabled, phase: introPhase } = useHomeIntro();
  const [introSettled, setIntroSettled] = useState(!introEnabled);
  const introComplete = !introEnabled || introPhase === "done";
  const isIntroWhiteBg =
    introEnabled &&
    !introSettled &&
    (introPhase === "loader-in" ||
      introPhase === "loader-fade" ||
      introPhase === "loader-wave");
  const introTitleMuted =
    introEnabled &&
    (introPhase === "loader-in" ||
      introPhase === "loader-fade" ||
      introPhase === "loader-wave" ||
      introPhase === "hero-rise");
  const networkVisible = !introEnabled || introPhase === "network" || introPhase === "done";
  const heroRiseStartedRef = useRef(false);
  const introFadeStartedRef = useRef(false);
  const introWaveStartedRef = useRef(false);
  const waveCleanupRef = useRef<(() => void) | null>(null);
  const moveTargetRef = useRef({ x: 0, y: 0 });

  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const titleSlotRef = useRef<HTMLDivElement | null>(null);
  const titleLineRef = useRef<HTMLHeadingElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const textAnimatedRef = useRef(false);
  const borderAnimatedRef = useRef(false);
  const [borderOpacity, setBorderOpacity] = useState(introEnabled ? 0 : 1);

  const [activeIndex, setActiveIndex] = useState(1);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const statCount = useMemo(() => stats.length, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const slot = titleSlotRef.current;
    const title = titleLineRef.current;
    if (!section || !slot || !title || !introEnabled) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(section, { clearProps: "all" });
      gsap.set(slot, { clearProps: "all" });
      gsap.set(title, { clearProps: "all" });
      return;
    }

    gsap.set(section, { backgroundColor: "#ffffff" });

    const pinTitleCenter = () => {
      const slotRect = slot.getBoundingClientRect();

      moveTargetRef.current = {
        x: slotRect.left + slotRect.width / 2 - window.innerWidth / 2,
        y: slotRect.top + slotRect.height / 2 - window.innerHeight / 2,
      };

      gsap.set(slot, {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 30,
        pointerEvents: "none",
      });
      gsap.set(title, {
        x: 0,
        y: 0,
        force3D: true,
      });
    };

    pinTitleCenter();
  }, [introEnabled]);

  useEffect(() => {
    return () => {
      waveCleanupRef.current?.();
      waveCleanupRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (!introEnabled || introPhase !== "loader-fade" || introFadeStartedRef.current) return;
    const title = titleLineRef.current;
    if (!title) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    introFadeStartedRef.current = true;
    gsap.fromTo(
      title,
      { opacity: 0 },
      {
        opacity: 1,
        duration: HOME_INTRO_LOADER_FADE_MS / 1000,
        ease: "power2.out",
      },
    );
  }, [introEnabled, introPhase]);

  useEffect(() => {
    if (!introEnabled || introPhase !== "loader-wave" || introWaveStartedRef.current) return;
    const line = titleLineRef.current;
    if (!line) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    introWaveStartedRef.current = true;
    waveCleanupRef.current?.();
    waveCleanupRef.current = animateLoaderWordsWave(line, {
      theme: "light",
      colors: {
        idle: "#BCC5D6",
        active: "#0032C9",
        done: "#0a143b",
      },
      duration: HOME_INTRO_LOADER_WAVE_MS / 1000 - 0.15,
      delay: 0.05,
      charsClass: "loader-wave-char",
      wordsClass: "loader-wave-word",
    });
  }, [introEnabled, introPhase]);

  useEffect(() => {
    const section = sectionRef.current;
    const slot = titleSlotRef.current;
    const title = titleLineRef.current;
    if (!section || !slot || !title || !introEnabled || introPhase !== "hero-rise" || heroRiseStartedRef.current) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(section, { backgroundColor: "#121C49" });
      gsap.set(slot, { clearProps: "all" });
      gsap.set(title, { clearProps: "all" });
      setIntroSettled(true);
      return;
    }

    heroRiseStartedRef.current = true;
    const chars = title.querySelectorAll<HTMLElement>(".loader-wave-char");
    const { x, y } = moveTargetRef.current;
    const riseDur = HOME_INTRO_HERO_RISE_MS / 1000;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        waveCleanupRef.current?.();
        waveCleanupRef.current = null;
        gsap.set(slot, {
          clearProps: "position,left,top,width,height,margin,display,alignItems,justifyContent,zIndex,pointerEvents",
        });
        gsap.set(title, { clearProps: "transform" });
        gsap.set(section, { backgroundColor: "#121C49" });
        setIntroSettled(true);
      },
    });

    tl.to(section, { backgroundColor: "#121C49", duration: riseDur }, 0);
    tl.to(title, { x, y, duration: riseDur }, 0);
    if (chars.length) {
      tl.to(chars, { color: "#ffffff", duration: riseDur * 0.85 }, 0.1);
    }
  }, [introEnabled, introPhase]);

  useEffect(() => {
    if (!introEnabled) {
      setBorderOpacity(1);
      return;
    }

    if (introPhase === "nav" && !borderAnimatedRef.current) {
      borderAnimatedRef.current = true;
      const borderProxy = { value: 0 };
      gsap.fromTo(
        borderProxy,
        { value: 0 },
        {
          value: 1,
          duration: HOME_INTRO_NAV_MS / 1000,
          ease: "power3.out",
          onUpdate: () => setBorderOpacity(borderProxy.value),
        },
      );
    }
  }, [introEnabled, introPhase]);

  useEffect(() => {
    if (introPhase !== "text" || textAnimatedRef.current) return;
    textAnimatedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (buttonsRef.current) {
      gsap.set(buttonsRef.current, { opacity: 0, y: 18 });
      gsap.to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        onComplete: () => {
          if (buttonsRef.current) {
            gsap.set(buttonsRef.current, { clearProps: "transform" });
          }
        },
      });
    }
  }, [introPhase]);

  useLayoutEffect(() => {
    const update = () => {
      const listEl = listRef.current;
      const itemEl = itemRefs.current[activeIndex];
      if (!listEl || !itemEl) return;

      const listRect = listEl.getBoundingClientRect();
      const itemRect = itemEl.getBoundingClientRect();
      setIndicator({
        left: itemRect.left - listRect.left,
        width: itemRect.width,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeIndex, statCount]);

  const sectionBgClass =
    !introEnabled || introSettled || introPhase === "nav" || introPhase === "text" || introPhase === "network" || introPhase === "done"
      ? "bg-[#121C49]"
      : isIntroWhiteBg
        ? "bg-white"
        : "";

  return (
    <section
      ref={sectionRef}
      className={`relative isolate overflow-hidden text-white ${sectionBgClass}`}
    >
      <Container borderColor="#FFFFFF33" borderOpacity={borderOpacity} className="px-0! pb-2">

        {/* ── 100vh block: heading + button + network ── */}
        <div className="relative z-10 flex h-screen flex-col justify-between pt-16 md:pt-20 lg:pt-20">

          {/* Heading + CTA */}
          <div
            ref={headingRef}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <div ref={titleSlotRef} className="mt-6 flex w-full justify-center">
              <h1
                ref={titleLineRef}
                data-loader-line
                className={`max-w-4xl px-6 text-3xl font-heading font-medium leading-[1.15] tracking-tight will-change-transform md:text-4xl lg:text-5xl xl:text-5xl ${
                  introEnabled && introPhase === "loader-in" ? "opacity-0" : ""
                } ${introTitleMuted ? "text-[#BCC5D6]" : "text-white"}`}
              >
              {INTRO_TITLE_LINES.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {lineIndex > 0 ? <br /> : null}
                  {line.map((word, wordIndex) => (
                    <React.Fragment key={word}>
                      <span className="inline-block overflow-hidden align-bottom pb-0.5">
                        <span data-loader-word-inner className="inline-block">
                          {word}
                        </span>
                      </span>
                      {wordIndex < line.length - 1 ? (
                        <span aria-hidden className="inline">
                          {" "}
                        </span>
                      ) : null}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </h1>
            </div>
            <div
              ref={buttonsRef}
              className={`mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center ${
                introEnabled &&
                (introPhase === "loader-in" ||
                  introPhase === "loader-fade" ||
                  introPhase === "loader-wave" ||
                  introPhase === "hero-rise" ||
                  introPhase === "nav")
                  ? "pointer-events-none opacity-0"
                  : ""
              }`}
            >
              <Button href="/" variant="primary">
                Request Demo
              </Button>
              <Button href="/" variant="secondary" icon={RiPlayFill}>
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Network image — inside 100vh, pushed to bottom via justify-between */}
          <div className="relative h-[min(420px,55vw)] w-full overflow-hidden md:h-[480px] lg:h-[380px]">
            <div
              className={`relative z-10 h-full w-full motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                networkVisible ? "translate-y-0 opacity-100" : "translate-y-[22%] opacity-0"
              }`}
              style={{
                transition: `transform ${HOME_INTRO_NETWORK_MS}ms ${HOME_INTRO_EASE}, opacity ${HOME_INTRO_NETWORK_MS}ms ${HOME_INTRO_EASE}`,
              }}
              aria-label="Partner network"
            >
              <OpticalFiber
                className="h-full w-full"
                contentScale={1.5}
                fanSpread={0.58}
                fanReach={1.2}
                fanHeight={0.7}
                fanOffsetX={0.45}
                fov={86}
              />
            </div>
          </div>
        </div>

        {/* ── Stats — below the fold ── */}
        <div
          className={`relative motion-reduce:opacity-100 ${
            introComplete ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: `opacity 500ms ${HOME_INTRO_EASE}`,
          }}
        >
        <SectionRadialGlow className="absolute left-1/2 top-20 z-0 -translate-x-1/2 -translate-y-1/3 md:top-20" />
          <ul
            ref={listRef}
            className="relative grid grid-cols-2 gap-x-6 gap-y-10 md:flex md:py-10"
            onMouseLeave={() => setActiveIndex(1)}
          >
            <div
              className="pointer-events-none w-full absolute inset-y-0 hidden md:block"
              aria-hidden
            >
              {/* Top full-width line + moving segment */}
              <div className="absolute left-0 top-0 h-[0.05rem] w-full bg-white/5">
                <div
                  className="h-full rounded-full linear-line_color transition-[transform,width] duration-300 ease-out"
                  style={{
                    width: `${indicator.width}px`,
                    transform: `translateX(${indicator.left}px)`,
                  }}
                />
              </div>

              {/* Bottom full-width line + moving segment */}
              <div className="absolute left-0 bottom-0 h-[0.05rem] w-full bg-white/5">
                <div
                  className="h-full rounded-full linear-line_color transition-[transform,width] duration-300 ease-out"
                  style={{
                    width: `${indicator.width}px`,
                    transform: `translateX(${indicator.left}px)`,
                  }}
                />
              </div>
            </div>

            {stats.map((stat, index) => (
              <li
                key={stat.label}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onMouseEnter={() => setActiveIndex(index)}
                className="flex flex-col items-center gap-2 md:flex-1 md:px-8"
              >
                <p
                  className={`text-2xl font-heading font-regular tracking-tight transition-colors md:text-3xl lg:text-4xl ${
                    index === activeIndex ? "text-white" : "text-[#8296B0]"
                  }`}
                >
                  {stat.value}
                </p>
                <p
                  className={`text-xs font-sans font-regular text-center leading-relaxed transition-colors md:text-lg ${
                    index === activeIndex ? "text-white/80" : "text-[#8296B0]"
                  }`}
                >
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

      </Container>
    </section>
  );
};

export default Hero;
