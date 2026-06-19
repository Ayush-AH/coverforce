"use client";

import OperatingSystemSection from "@/components/solutions/shared/OperatingSystemSection";
import OperatingPlatformMock from "@/components/solutions/brokers/OperatingPlatformMock";
import OperatingAiMock from "@/components/solutions/brokers/OperatingAiMock";

const operatingRows = [
  {
    id: "embedded",
    heading: "Embedded Insurance",
    description:
      "Add commercial insurance quoting inside any vertical SaaS product — HR, fleet, property, or POS. Users stay in your product, powered by one REST API, sandbox access, and Slack support.",
    stat: "95%+",
    statLabelLines: ["Extraction", "Accuracy"] as [string, string],
    Mock: OperatingPlatformMock,
  },
  {
    id: "ai-apis",
    heading: "AI-Powered Insurance APIs",
    description:
      "Access CoverForce's AI suite by API — document extraction, appetite matching, NAICS classification, underwriting support, and COI generation. Build smart insurance workflows without training your own models.",
    stat: "200+",
    statLabelLines: ["Broker Codes", "Managed"] as [string, string],
    Mock: OperatingAiMock,
  },
  {
    id: "compliance",
    heading: "Compliance & Infrastructure",
    description:
      "SOC 2 Type II certified and built to scale. CoverForce manages carrier compliance, surplus lines, and regulatory requirements, so your team can focus on product instead of paperwork.",
    stat: "1",
    statLabelLines: ["Unified API", "For Programs"] as [string, string],
    Mock: OperatingPlatformMock,
  },
];

export default function OperatingSystem() {
  return (
    <OperatingSystemSection
      sectionTitle={
        <>
          Precision engineering for
          insurance products
        </>
      }
      sectionDescription="See how custom integrations compare to CoverForce — from API-first intake through bind, on infrastructure built for developers shipping commercial insurance products."
      ctaHref="/solutions/developers"
      ctaLabel="View API docs"
      rows={operatingRows}
    />
  );
}
