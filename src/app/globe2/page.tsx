"use client";

import dynamic from "next/dynamic";

const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false });

export default function Globe2Page() {
  return <GlobeScene />;
}
