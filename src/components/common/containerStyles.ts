import type { CSSProperties } from "react";

export const containerPadding = "px-2 md:px-4 lg:px-6 xl:px-6";

export const DEFAULT_BORDER_COLOR = "#e5e7eb";

export function getSideBorderStyle(
  color: string = DEFAULT_BORDER_COLOR,
): CSSProperties {
  return {
    borderLeft: "0.001rem solid transparent",
    borderRight: "0.001rem solid transparent",
    borderImage: `repeating-linear-gradient(180deg, ${color} 0px, ${color} 5px, transparent 5px, transparent 12px) 1`,
  };
}
