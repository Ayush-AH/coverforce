"use client";

import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";
import React, { useEffect, useRef, useState } from "react";

const NODES = [
  {
    id: "market-access",
    label: "MARKET ACCESS",
    icon: "🏢",
    position: { x: 50, y: 12 }, // top center
    anchor: "bottom",
  },
  {
    id: "api-integration",
    label: "API INTEGRATION",
    icon: "⚙",
    position: { x: 86, y: 32 }, // top right
    anchor: "left",
  },
  {
    id: "custom-policy",
    label: "CUSTOM POLICY",
    icon: "◇",
    position: { x: 86, y: 55 }, // middle right
    anchor: "left",
  },
  {
    id: "distribution-layer",
    label: "DISTRIBUTION LAYER",
    icon: "✦",
    position: { x: 86, y: 78 }, // bottom right
    anchor: "left",
  },
  {
    id: "licensing-provider",
    label: "LICENSING PROVIDER",
    icon: "⊟",
    position: { x: 14, y: 32 }, // top left
    anchor: "right",
  },
  {
    id: "compliance",
    label: "COMPLIANCE",
    icon: "◎",
    position: { x: 14, y: 55 }, // middle left
    anchor: "right",
  },
  {
    id: "enablement-partner",
    label: "ENABLEMENT PARTNER",
    icon: "△",
    position: { x: 14, y: 78 }, // bottom left
    anchor: "right",
  },
];

const CENTER = { x: 50, y: 55 };

const NodeCard = ({
  label,
  icon,
  anchor,
}: {
  label: string;
  icon: string;
  anchor: string;
}) => (
  <div
    className="absolute"
    style={{
      transform:
        anchor === "right"
          ? "translate(-100%, -50%)"
          : anchor === "left"
            ? "translate(0%, -50%)"
            : anchor === "bottom"
              ? "translate(-50%, -100%)"
              : "translate(-50%, 0%)",
    }}
  >
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E7F0",
        borderRadius: 8,
        padding: "7px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minWidth: 160,
        boxShadow: "0 1px 4px rgba(80,80,120,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          fontSize: 11,
          fontFamily: "monospace",
          letterSpacing: "0.08em",
          color: "#3D3D5C",
          fontWeight: 500,
        }}
      >
        <span style={{ color: "#8B8BAD", fontSize: 12 }}>{icon}</span>
        {label}
      </div>
      <div
        style={{
          width: "55%",
          height: 3,
          borderRadius: 2,
          background: "#E8E8F4",
        }}
      />
    </div>
  </div>
);

const Enablement = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<
    { x1: number; y1: number; x2: number; y2: number; dot1: [number, number]; dot2: [number, number] }[]
  >([]);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
    descRef,
  });

  // Compute SVG lines from percentage positions
  useEffect(() => {
    const compute = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const { width, height } = wrap.getBoundingClientRect();

      const cx = (CENTER.x / 100) * width;
      const cy = (CENTER.y / 100) * height;

      const computed = NODES.map((node) => {
        const nx = (node.position.x / 100) * width;
        const ny = (node.position.y / 100) * height;

        // dot on node side (close to card)
        const DOT_OFFSET = 18;
        let dx = nx,
          dy = ny;
        if (node.anchor === "right") dx = nx - DOT_OFFSET;
        else if (node.anchor === "left") dx = nx + DOT_OFFSET;
        else if (node.anchor === "bottom") dy = ny - DOT_OFFSET;
        else dy = ny + DOT_OFFSET;

        // dot on center side (close to central circle)
        const CIRCLE_R = 52;
        const angle = Math.atan2(ny - cy, nx - cx);
        const ex = cx + Math.cos(angle) * CIRCLE_R;
        const ey = cy + Math.sin(angle) * CIRCLE_R;

        return {
          x1: ex,
          y1: ey,
          x2: dx,
          y2: dy,
          dot1: [ex, ey] as [number, number],
          dot2: [dx, dy] as [number, number],
        };
      });

      setLines(computed);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <section ref={sectionRef} className="bg-white text-[#0a143b]">
      <Container borderColor="#53535380">
        <div className="py-16 md:py-20 lg:py-24">
          <div
            ref={headerRef}
            className="grid gap-8 lg:grid-cols-2 lg:items-start lg:justify-between lg:gap-12"
          >
            <div className="flex flex-col justify-end space-y-5">
              <h2
                ref={headingRef}
                className="max-w-md text-3xl font-heading font-medium leading-[1.12] tracking-tight text-[#BCC5D6] md:text-4xl lg:text-[1.625rem] lg:leading-[1.12]"
              >
                <span data-split>Interested in becoming a </span>
                <span data-split style={{ color: "#3933A1" }}>
                  program partner?
                </span>
              </h2>
              <Button href="/" variant="outline">
                Book a Call
              </Button>
            </div>

            <div className="flex max-w-md flex-col items-end gap-6 text-left lg:ml-auto">
              <p
                ref={descRef}
                className="font-sans font-regular text-sm leading-[1.4] text-[#50617a] md:text-[1.125rem]"
              >
                We partner with market access and enablement providers that help
                early-stage digital brokerages launch faster. If your business supports
                that journey, we&apos;d like to hear from you.
              </p>
            </div>
          </div>

        {/* Diagram area */}
        <div
          ref={wrapRef}
          className="relative mt-12 w-full md:mt-14 lg:mt-16"
          style={{ height: 380 }}
        >
          {/* SVG lines layer */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
          >
            <defs>
              <marker
                id="dot"
                viewBox="0 0 6 6"
                refX="3"
                refY="3"
                markerWidth="6"
                markerHeight="6"
              >
                <circle cx="3" cy="3" r="2.5" fill="#C5C5E0" />
              </marker>
            </defs>
            {lines.map((line, i) => (
              <g key={i}>
                <line
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#C5C5E0"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  opacity={0.7}
                />
                {/* dot near center */}
                <circle cx={line.dot1[0]} cy={line.dot1[1]} r={2.5} fill="#C5C5E0" />
                {/* dot near card */}
                <circle cx={line.dot2[0]} cy={line.dot2[1]} r={2.5} fill="#C5C5E0" />
              </g>
            ))}
          </svg>

          {/* Central circle */}
          <div
            className="absolute"
            style={{
              left: `${CENTER.x}%`,
              top: `${CENTER.y}%`,
              transform: "translate(-50%, -50%)",
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "radial-gradient(circle, #EAE8FD 0%, #D8D4FB 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            {/* Coverforce logo placeholder — swap with your actual SVG */}
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <path
                d="M21 6C13.268 6 7 12.268 7 20C7 27.732 13.268 34 21 34C25.5 34 30.5 31 32 27H27C25.8 29 23.5 30.5 21 30.5C15.2 30.5 10.5 25.8 10.5 20C10.5 14.2 15.2 9.5 21 9.5C23.5 9.5 25.8 10.8 27 13H32C30.5 9 25.5 6 21 6Z"
                fill="#5B52E7"
              />
            </svg>
          </div>

          {/* Node cards */}
          {NODES.map((node) => (
            <div
              key={node.id}
              className="absolute"
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
                zIndex: 20,
              }}
            >
              <NodeCard
                label={node.label}
                icon={node.icon}
                anchor={node.anchor}
              />
            </div>
          ))}
        </div>
        </div>
      </Container>
    </section>
  );
};

export default Enablement;