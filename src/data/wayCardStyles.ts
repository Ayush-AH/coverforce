export type CardBackground =
  | "accent"
  | "light"
  | "developer"
  | "wholesaler"
  | "broker"
  | "startup"
  | "carrier";

export type SolutionTheme = Exclude<CardBackground, "accent" | "light">;

type GradientStop = {
  hex: string;
  pos: number;
};

export type GradFlowRgb = {
  r: number;
  g: number;
  b: number;
};

export type GradFlowColors = {
  color1: GradFlowRgb;
  color2: GradFlowRgb;
  color3: GradFlowRgb;
};

const SOLUTION_GRADIENT_DEFS = {
  developer: [
    { hex: "190780", pos: 0 },
    { hex: "1D02B8", pos: 20 },
    { hex: "430AFF", pos: 40 },
    { hex: "2800FF", pos: 60 },
    { hex: "3A00FF", pos: 80 },
    { hex: "210D7C", pos: 100 },
  ],
  wholesaler: [
    { hex: "0045FF", pos: 0 },
    { hex: "008EFF", pos: 25 },
    { hex: "008EFF", pos: 50 },
    { hex: "8FD7FF", pos: 75 },
    { hex: "C3EBFF", pos: 100 },
  ],
  broker: [
    { hex: "322696", pos: 0 },
    { hex: "7F44FF", pos: 25 },
    { hex: "B482FF", pos: 50 },
    { hex: "A975FF", pos: 75 },
    { hex: "8E46FF", pos: 100 },
  ],
  startup: [
    { hex: "30DF71", pos: 0 },
    { hex: "1ED5B3", pos: 33 },
    { hex: "00DCF1", pos: 66 },
    { hex: "00DEFA", pos: 100 },
  ],
  carrier: [
    { hex: "E25E2F", pos: 0 },
    { hex: "DE5943", pos: 25 },
    { hex: "FC976B", pos: 50 },
    { hex: "FC976B", pos: 75 },
    { hex: "FDAB77", pos: 100 },
  ],
} as const satisfies Record<SolutionTheme, readonly GradientStop[]>;

function hexToRgb(hex: string): GradFlowRgb {
  const normalized = hex.replace("#", "");
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function buildGradientClass(stops: readonly GradientStop[]): string {
  const body = stops.map(({ hex, pos }) => `#${hex}_${pos}%`).join(",");
  return `bg-[linear-gradient(45deg,${body})]`;
}

function gradFlowFromStops(stops: readonly GradientStop[]): GradFlowColors {
  const mid = stops[Math.floor((stops.length - 1) / 2)];

  return {
    color1: hexToRgb(stops[0].hex),
    color2: hexToRgb(mid.hex),
    color3: hexToRgb(stops[stops.length - 1].hex),
  };
}

export const SOLUTION_GRAD_FLOW: Record<SolutionTheme, GradFlowColors> = {
  developer: gradFlowFromStops(SOLUTION_GRADIENT_DEFS.developer),
  wholesaler: gradFlowFromStops(SOLUTION_GRADIENT_DEFS.wholesaler),
  broker: gradFlowFromStops(SOLUTION_GRADIENT_DEFS.broker),
  startup: gradFlowFromStops(SOLUTION_GRADIENT_DEFS.startup),
  carrier: gradFlowFromStops(SOLUTION_GRADIENT_DEFS.carrier),
};

export const CARD_BACKGROUNDS: Record<CardBackground, string> = {
  accent:
    "bg-[linear-gradient(135deg,#4541CD_0%,#352D93_38%,#121C49_100%)]",
  light: "bg-[linear-gradient(135deg,#DADEF5_0%,#F8F0FC_55%,#FFFFFF_100%)]",
  developer: buildGradientClass(SOLUTION_GRADIENT_DEFS.developer),
  wholesaler: buildGradientClass(SOLUTION_GRADIENT_DEFS.wholesaler),
  broker: buildGradientClass(SOLUTION_GRADIENT_DEFS.broker),
  startup: buildGradientClass(SOLUTION_GRADIENT_DEFS.startup),
  carrier: buildGradientClass(SOLUTION_GRADIENT_DEFS.carrier),
};
