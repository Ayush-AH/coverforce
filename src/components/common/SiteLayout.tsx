"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LenisScroll from "@/components/common/LenisScroll";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ViewTransitions } from "next-view-transitions";

gsap.registerPlugin(ScrollTrigger);

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();

  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
      window.lenis?.resize();
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <ViewTransitions>
      <LenisScroll>
        <header>
          <Header />
        </header>

        <main>{children}</main>

        <footer>
          <Footer />
        </footer>
      </LenisScroll>
    </ViewTransitions>
  );
}
