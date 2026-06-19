"use client";

import OperatingSystemSection from "@/components/solutions/shared/OperatingSystemSection";
import OperatingPlatformMock from "@/components/solutions/brokers/OperatingPlatformMock";
import OperatingAiMock from "@/components/solutions/brokers/OperatingAiMock";
import BrokerCodeControlsMock from "@/components/solutions/wholesalers/BrokerCodeControlsMock";

const operatingRows = [
  {
    id: "inbox",
    heading: "AI Inbox & Document Reader",
    description:
      "AI turns emails, ACORDs, loss runs, and proposals into structured applications with 95%+ accuracy, then generates COIs from bound policy data eliminating manual rekeying.",
    stat: "95%+",
    statLabelLines: ["Extraction", "Accuracy"] as [string, string],
    Mock: OperatingAiMock,
  },
  {
    id: "appetite",
    heading: "AI Appetite Engine & Smart Routing",
    description:
      "Every submission is checked against live carrier appetite before underwriting, so your team avoids no-quote markets and gives agents faster answers.",
    stat: "40+",
    statLabelLines: ["Carriers In", "One Submission"] as [string, string],
    Mock: OperatingAiMock,
  },
  {
    id: "broker-codes",
    heading: "Broker Code Delegation & Network Controls",
    description:
      "Manage broker codes, agency access, and producer permissions from one dashboard with full control and a clear audit trail.",
    stat: "200+",
    statLabelLines: ["Broker Codes", "Managed"] as [string, string],
    Mock: BrokerCodeControlsMock,
  },
  {
    id: "digitization",
    heading: "Product Digitization",
    description:
      "Put your proprietary programs on API rails without rip-and-replace. CoverForce wraps existing systems into unified endpoints, giving retailers permitted access, cross-quoting, more at-bats, and full visibility before E&S escalation.",
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
          wholesale distribution
        </>
      }
      sectionDescription="See how fragmented broker workflows compare to CoverForce — from delegated intake through bind, on one platform built to scale your wholesale operation."
      ctaHref="/solutions/wholesalers"
      ctaLabel="Talk to sales"
      rows={operatingRows}
    />
  );
}
