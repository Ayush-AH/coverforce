import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/calculation");

type CalculationLayoutProps = {
  children: ReactNode;
};

export default function CalculationLayout({ children }: CalculationLayoutProps) {
  return children;
}
