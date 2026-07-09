import React from "react";
import PageWrapper from "@/components/PageWrapper";
import Hero from "@/components/careers/Hero";
import OurValues from "@/components/careers/OurValues";
import OurCluture from "@/components/careers/OurCluture";
import Positions from "@/components/careers/Positions";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/careers");

const CareerPage = () => {
  return (
    <>
      <PageWrapper>
        <Hero />
        <OurValues />
        <OurCluture />
        <Positions />
      </PageWrapper>
    </>
  );
};

export default CareerPage;
