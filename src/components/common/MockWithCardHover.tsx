"use client";

import { useWayCardHover } from "@/components/home/WayCardHoverContext";
import type { ReactNode } from "react";

type MockWithCardHoverProps = {
  children: (cardHovered: boolean) => ReactNode;
};

export default function MockWithCardHover({ children }: MockWithCardHoverProps) {
  const cardHovered = useWayCardHover();
  return <>{children(cardHovered)}</>;
}
