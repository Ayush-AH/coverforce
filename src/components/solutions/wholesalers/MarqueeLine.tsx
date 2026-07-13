"use client";

import Image from "next/image";

import Container from "@/components/common/Container";

const DEFAULT_LOGOS = Array.from({ length: 15 }, (_, index) => ({
  src: `/images/marquee/logo (${index + 1}).png`,
  alt: `Partner logo ${index + 1}`,
}));

export type MarqueeLogo = {
  src: string;
  alt: string;
};

type MarqueeRowProps = {
  reverse?: boolean;
  offset?: boolean;
  logos?: readonly MarqueeLogo[];
  size?: "default" | "large";
};

const LOGO_SIZE_CLASS = {
  default:
    "h-8 w-auto max-h-8 object-contain opacity-90 grayscale contrast-200 brightness-0 md:h-6 md:max-h-6 lg:h-7 lg:max-h-7",
  large:
    "h-12 w-auto max-h-12 object-contain opacity-90 grayscale contrast-200 brightness-0 md:h-10 md:max-h-10 lg:h-12 lg:max-h-12",
} as const;

export function MarqueeRow({
  reverse = false,
  offset = false,
  logos = DEFAULT_LOGOS,
  size = "default",
}: MarqueeRowProps) {
  const items = [...logos, ...logos];

  return (
    <div
      className={`logo-marquee-viewport ${offset ? "logo-marquee-viewport--offset" : ""}`}
      aria-hidden
    >
      <div className={`logo-marquee-track ${reverse ? "logo-marquee-track--reverse" : ""}`}>
        {items.map((logo, index) => (
          <div key={`${logo.src}-${index}`} className="logo-marquee-item">
            <Image
              src={logo.src}
              alt=""
              width={size === "large" ? 180 : 120}
              height={size === "large" ? 60 : 40}
              className={LOGO_SIZE_CLASS[size]}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const MarqueeLine = ({ className }: { className?: string }) => {
  return (
    <section className="relative overflow-hidden">
      <Container borderColor="#53535380" borderBottom>
        <div className={`relative z-10 py-16 md:py-20 lg:py-46 ${className}`}>
          <MarqueeRow />
        </div>
      </Container>
    </section>
  );
};

export default MarqueeLine;
