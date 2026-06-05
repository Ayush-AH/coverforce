export const WAY_MODAL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const WAY_MODAL_EASE_OUT = "cubic-bezier(0.33, 1, 0.68, 1)";

export const WAY_MODAL_OPEN_MS = 520;
export const WAY_MODAL_CLOSE_MS = 480;
export const WAY_MODAL_OVERLAY_OPEN_MS = 360;
export const WAY_MODAL_OVERLAY_CLOSE_MS = 340;
export const WAY_MODAL_PANEL_OPEN_MS = 520;
export const WAY_MODAL_PANEL_CLOSE_MS = 440;
export const WAY_MODAL_CONTENT_DELAY_MS = 120;

export type WayModalRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export function rectFromDOM(rect: DOMRect): WayModalRect {
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
