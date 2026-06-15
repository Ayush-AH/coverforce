"use client";

import { useHomeIntro } from "@/contexts/HomeIntroContext";
import type { ReactNode } from "react";

export default function HomeSectionsAfterIntro({ children }: { children: ReactNode }) {
  const { enabled, phase } = useHomeIntro();

  if (enabled && phase !== "done") return null;

  return <>{children}</>;
}
