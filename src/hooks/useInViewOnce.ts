"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { MICRO_IO_OPTIONS } from "@/lib/motion";

export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = MICRO_IO_OPTIONS,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || fired.current) return;
      fired.current = true;
      setVisible(true);
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, visible];
}
