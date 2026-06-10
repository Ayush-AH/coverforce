"use client";

import dynamic from "next/dynamic";

const GlobeDemo = dynamic(() => import("@/components/globe-demo"), { ssr: false });

export default function Globe3Page() {
  return <GlobeDemo />;
}
