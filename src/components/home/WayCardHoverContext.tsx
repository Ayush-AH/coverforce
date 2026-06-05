"use client";

import { createContext, useContext } from "react";

const WayCardHoverContext = createContext(false);

export function WayCardHoverProvider({
  hovered,
  children,
}: {
  hovered: boolean;
  children: React.ReactNode;
}) {
  return (
    <WayCardHoverContext.Provider value={hovered}>{children}</WayCardHoverContext.Provider>
  );
}

export function useWayCardHover() {
  return useContext(WayCardHoverContext);
}
