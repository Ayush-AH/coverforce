"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

type LenisScrollProps = {
  children: ReactNode;
};

export default function LenisScroll({ children }: LenisScrollProps) {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const instance = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 0.7,
      gestureOrientation: "vertical",
    });

    lenis.current = instance;
    window.lenis = instance;

    let frame: number;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const handleResize = () => {
      instance.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      instance.destroy();
      lenis.current = null;
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
