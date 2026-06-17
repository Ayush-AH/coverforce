"use client";

import { useEffect, useRef, useState } from "react";

type ScrollingDigitProps = {
  value: number;
};

const ScrollingDigit = ({ value }: ScrollingDigitProps) => {
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "1.2em",
        lineHeight: "1.2em",
      }}
    >
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(-${value * 1.2}em)`,
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            style={{ height: "1.2em", lineHeight: "1.2em" }}
          >
            {i}
          </span>
        ))}
      </span>
    </span>
  );
};

/**
 * Renders "1.66557461%" where the last 3 digits scroll like an odometer.
 *
 * Scroll speeds (configurable via props):
 *   digit1Interval — rightmost digit  (default 2 000 ms)
 *   digit2Interval — middle digit     (default 20 000 ms)
 *   digit3Interval — leftmost digit   (default 200 000 ms)
 */
type GdpCounterProps = {
  digit1Interval?: number;
  digit2Interval?: number;
  digit3Interval?: number;
  className?: string;
};

export const GdpCounter = ({
  digit1Interval = 2_000,
  digit2Interval = 20_000,
  digit3Interval = 200_000,
  className,
}: GdpCounterProps) => {
  const [d1, setD1] = useState(1); // rightmost  → "1"
  const [d2, setD2] = useState(6); // middle     → "6"
  const [d3, setD3] = useState(4); // left       → "4"

  useEffect(() => {
    const t1 = setInterval(() => setD1(v => (v + 1) % 10), digit1Interval);
    const t2 = setInterval(() => setD2(v => (v + 1) % 10), digit2Interval);
    const t3 = setInterval(() => setD3(v => (v + 1) % 10), digit3Interval);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearInterval(t3);
    };
  }, [digit1Interval, digit2Interval, digit3Interval]);

  return (
    <span className={`font-mono text-white/90 ${className ?? ""}`}>
      1.6655
      <ScrollingDigit value={d3} />
      <ScrollingDigit value={d2} />
      <ScrollingDigit value={d1} />
      %
    </span>
  );
};