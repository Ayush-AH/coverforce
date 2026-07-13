"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BASE_PREMIUM = 1_021_677_315.11;
const PREMIUM_PER_TICK = 108.66;
const TICK_MS_MIN = 1_500;
const TICK_MS_MAX = 2_000;
const FLIP_MS = 0.45;

type GdpCounterProps = {
  className?: string;
};

const formatPremium = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const nextTickMs = () =>
  TICK_MS_MIN + Math.floor(Math.random() * (TICK_MS_MAX - TICK_MS_MIN + 1));

function FlipDigit({ digit }: { digit: string }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-baseline tabular-nums leading-none">
      <span className="invisible inline-block">{digit}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={digit}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: FLIP_MS, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 inline-flex items-center justify-center"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function FlipValue({ value }: { value: string }) {
  return (
    <span className="inline-flex items-baseline">
      {value.split("").map((char, index) =>
        /\d/.test(char) ? (
          <FlipDigit key={`d-${index}`} digit={char} />
        ) : (
          <span key={`s-${index}-${char}`} className="inline-block">
            {char}
          </span>
        ),
      )}
    </span>
  );
}

export const GdpCounter = ({ className }: GdpCounterProps) => {
  const [value, setValue] = useState(BASE_PREMIUM);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const schedule = () => {
      timeoutRef.current = setTimeout(() => {
        setValue((current) => current + PREMIUM_PER_TICK);
        schedule();
      }, nextTickMs());
    };

    schedule();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const formatted = formatPremium(value);

  return (
    <span
      className={`inline-flex items-baseline font-mono text-inherit ${className ?? ""}`}
      aria-label={formatted}
    >
      <FlipValue value={formatted} />
    </span>
  );
};
