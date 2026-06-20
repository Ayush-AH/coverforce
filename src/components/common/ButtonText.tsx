"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "@/lib/SplitText";

type ButtonTextProps = {
  children: React.ReactNode;
  textClip: string;
  textLine: string;
  hovered: boolean;
};

const WAVE_WIDTH = 5;
const WAVE_PEAK = 2;
const WAVE_SPREAD = 1.4;
const MAX_BLUR = 2.5;

function smootherstep(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function waveBlur(dist: number): number {
  if (dist <= 0 || dist >= WAVE_WIDTH) return 0;

  const bell = Math.exp(-0.5 * Math.pow((dist - WAVE_PEAK) / WAVE_SPREAD, 2));
  return bell * MAX_BLUR;
}

function applyBlurWave(chars: HTMLSpanElement[], progress: number) {
  const waveSpan = chars.length + WAVE_WIDTH;
  const head = smootherstep(progress) * waveSpan;

  chars.forEach((char, index) => {
    const blur = waveBlur(head - index);
    char.style.filter = blur > 0.04 ? `blur(${blur.toFixed(2)}px)` : "";
  });
}

const ButtonText = ({ children, textClip, textLine, hovered }: ButtonTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const splitRef = useRef<SplitText | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const text = typeof children === "string" ? children : String(children);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    splitRef.current?.revert();
    el.textContent = text;

    const split = new SplitText(el, {
      type: "chars",
      charsClass: "button-split-char",
      wordsClass: "button-split-word",
    });

    split.chars.forEach((char) => {
      char.style.display = "inline-block";
      char.style.willChange = "filter";
    });

    splitRef.current = split;

    return () => {
      tweenRef.current?.kill();
      split.revert();
      splitRef.current = null;
    };
  }, [text]);

  useEffect(() => {
    const chars = splitRef.current?.chars;
    if (!chars?.length) return;

    if (!hovered) {
      tweenRef.current?.kill();
      gsap.set(chars, { clearProps: "filter" });
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    tweenRef.current?.kill();

    const progress = { value: 0 };
    tweenRef.current = gsap.to(progress, {
      value: 1,
      duration: 0.65,
      ease: "none",
      onUpdate: () => applyBlurWave(chars, progress.value),
      onComplete: () => {
        gsap.set(chars, { clearProps: "filter" });
      },
    });
  }, [hovered]);

  return (
    <span className={`block overflow-hidden ${textClip}`}>
      <span ref={textRef} className={`block whitespace-nowrap ${textLine}`}>
        {text}
      </span>
    </span>
  );
};

export default ButtonText;
