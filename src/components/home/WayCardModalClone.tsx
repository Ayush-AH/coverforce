"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import {
  WAY_MODAL_CLOSE_MS,
  WAY_MODAL_EASE,
  WAY_MODAL_OPEN_MS,
  type WayModalRect,
  prefersReducedMotion,
} from "@/lib/wayModalMotion";

type ClonePhase = "idle" | "enter" | "exit";

type WayCardModalCloneProps = {
  origin: WayModalRect | null;
  targetRef: RefObject<HTMLElement | null>;
  phase: ClonePhase;
  children: ReactNode;
  onEnterComplete: () => void;
  onExitComplete: () => void;
};

function flipTransform(origin: WayModalRect, target: WayModalRect, invert: boolean) {
  const dx = origin.left - target.left + (origin.width - target.width) / 2;
  const dy = origin.top - target.top + (origin.height - target.height) / 2;
  const sx = origin.width / target.width;
  const sy = origin.height / target.height;
  return invert
    ? `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`
    : "translate3d(0, 0, 0) scale(1, 1)";
}

export default function WayCardModalClone({
  origin,
  targetRef,
  phase,
  children,
  onEnterComplete,
  onExitComplete,
}: WayCardModalCloneProps) {
  const cloneRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (phase === "idle") {
      setVisible(false);
      return;
    }

    if (!origin || !targetRef.current || !cloneRef.current) {
      if (phase === "enter") onEnterComplete();
      if (phase === "exit") onExitComplete();
      return;
    }

    if (prefersReducedMotion()) {
      if (phase === "enter") onEnterComplete();
      if (phase === "exit") onExitComplete();
      return;
    }

    const el = cloneRef.current;
    const target = targetRef.current.getBoundingClientRect();
    const duration = phase === "enter" ? WAY_MODAL_OPEN_MS : WAY_MODAL_CLOSE_MS;
    const invert = phase === "enter";

    el.style.position = "fixed";
    el.style.top = `${target.top}px`;
    el.style.left = `${target.left}px`;
    el.style.width = `${target.width}px`;
    el.style.height = `${target.height}px`;
    el.style.transform = flipTransform(origin, target, invert);
    el.style.opacity = invert ? "0.94" : "1";
    el.style.transition = "none";
    el.style.willChange = "transform, opacity";

    setVisible(true);

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = `transform ${duration}ms ${WAY_MODAL_EASE}, opacity ${duration}ms ${WAY_MODAL_EASE}`;
        el.style.transform = flipTransform(origin, target, !invert);
        el.style.opacity = invert ? "1" : "0";
      });
    });

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.target !== el || e.propertyName !== "transform") return;
      el.style.willChange = "auto";
      setVisible(false);
      if (phase === "enter") onEnterComplete();
      else onExitComplete();
    };

    el.addEventListener("transitionend", onTransitionEnd);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [origin, phase, targetRef, onEnterComplete, onExitComplete]);

  if (!visible && phase === "idle") return null;

  return (
    <div
      ref={cloneRef}
      className="pointer-events-none z-[210] flex items-center justify-center overflow-hidden [&>*]:!relative [&>*]:!top-auto [&>*]:!right-auto [&>*]:!bottom-auto [&>*]:!left-auto [&>*]:mx-auto [&>*]:scale-[1.15] sm:[&>*]:scale-[1.25]"
      aria-hidden
    >
      {children}
    </div>
  );
}
