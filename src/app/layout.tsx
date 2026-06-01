import "../styles/globals.css";
import SiteLayout from "@/components/common/SiteLayout";
import { createRootMetadata } from "@/lib/seo";
import type { ReactNode } from "react";

export const experimental = {
  viewTransition: true,
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}

export const metadata = createRootMetadata();
