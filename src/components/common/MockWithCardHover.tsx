"use client";

import { useState, type ReactNode } from "react";

type MockWithCardHoverProps = {
  children: (cardHovered: boolean) => ReactNode;
};

export default function MockWithCardHover({ children }: MockWithCardHoverProps) {
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      {children(cardHovered)}
    </div>
  );
}
