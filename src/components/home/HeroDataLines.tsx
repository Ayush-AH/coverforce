"use client";

type DataLine = {
  id: number;
  left: string;
  duration: string;
  delay: string;
  opacity: string;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function formatLine(index: number): DataLine {
  const left = 4 + seededRandom(index + 1) * 92;
  const duration = 4.5 + seededRandom(index + 3) * 4;
  const delay = seededRandom(index + 4) * 10;
  const opacity = 0.2 + seededRandom(index + 5) * 0.28;

  return {
    id: index,
    left: `${left.toFixed(2)}%`,
    duration: `${duration.toFixed(2)}s`,
    delay: `${delay.toFixed(2)}s`,
    opacity: opacity.toFixed(2),
  };
}

const LINE_COUNT = 5;

const DATA_LINES: DataLine[] = Array.from({ length: LINE_COUNT }, (_, index) =>
  formatLine(index),
);

function DataLineMarker() {
  return (
    <div className="relative flex size-12 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-[#7653F19E] blur-[20px]" />
      <div className="relative flex size-4 items-center justify-center rounded-full">
        <div className="h-full w-[1.2px] rounded-full bg-gradient-to-b from-[#7F7AFF] via-[#504ADE] to-[#9792FF]" />
      </div>
    </div>
  );
}

export default function HeroDataLines() {
  return (
    <div
      className="pointer-events-none h-full w-full overflow-hidden motion-reduce:hidden"
      aria-hidden
    >
      {DATA_LINES.map((line) => (
        <div
          key={line.id}
          className="hero-data-drop absolute top-0 -translate-x-1/2 will-change-transform"
          style={{
            left: line.left,
            ["--line-opacity" as string]: line.opacity,
            animationDuration: line.duration,
            animationDelay: line.delay,
          }}
        >
          <DataLineMarker />
        </div>
      ))}
    </div>
  );
}
