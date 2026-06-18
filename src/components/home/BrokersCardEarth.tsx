"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function BrokersCardEarth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "120px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.35)_22%,#000_48%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.35)_22%,#000_48%)]"
    >
      <World
        visible={visible}
        data={[]}
        globeConfig={{
          lite: true,
          tone: "blue",
          hexPolygonResolution: 2,
          maxDpr: 1.25,
          cameraDistance: 275,
          autoRotate: true,
          autoRotateSpeed: 0.4,
          showAtmosphere: true,
          atmosphereColor: "#4F63E8",
          atmosphereAltitude: 0.1,
          globeColor: "#121C49",
          emissive: "#2530BE",
          emissiveIntensity: 0.12,
          shininess: 0.85,
          rings: 0,
          maxRings: 0,
        }}
      />
    </div>
  );
}
