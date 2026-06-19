"use client";

import OperatingSystemSection from "@/components/solutions/shared/OperatingSystemSection";
import AiExtractedDetailsMock from "@/components/solutions/carrier/AiExtractedDetailsMock";
import ConnectedSourcesMock from "@/components/solutions/carrier/ConnectedSourcesMock";
import RecentActivityMock from "@/components/solutions/carrier/RecentActivityMock";

const operatingRows = [
  {
    id: "integration",
    heading: "One Integration, 15,000+ Agencies",
    description:
      "One API connects your products to wholesalers, networks, and agencies nationwide — no separate partnerships required.",
    stat: "15K+",
    statLabelLines: ["Agencies", "Accessible"] as [string, string],
    Mock: AiExtractedDetailsMock,
  },
  {
    id: "ai-validated",
    heading: "AI-Validated, Error-Free Submissions",
    description:
      "AI validates every submission for completeness, extracts documents, pre-answers questions, and maps industry codes to your classification system.",
    stat: "0%",
    statLabelLines: ["API Error", "Rate"] as [string, string],
    Mock: RecentActivityMock,
  },
  {
    id: "connectivity",
    heading: "Carrier Connectivity Without the Long Build",
    description:
      "CoverForce handles the integration heavy lifting, helping your team go from contract to production in 30 days with less than 10 hours of carrier engineering time.",
    stat: "1",
    statLabelLines: ["Unified API", "For Programs"] as [string, string],
    Mock: ConnectedSourcesMock,
  },
];

export default function OperatingSystem() {
  return (
    <OperatingSystemSection
      sectionTitle={
        <>
       Built for Carrier Distribution at Scale
        </>
      }
      sectionDescription="See how inconsistent broker submissions compare to CoverForce — from standardized intake through bind, on one platform built to receive cleaner business at scale."
      ctaHref="/solutions/carrier"
      ctaLabel="Request a demo"
      statColor="#7CB518"
      rows={operatingRows}
    />
  );
}
