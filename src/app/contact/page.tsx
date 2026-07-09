import React from "react";
import Hero from "@/components/contact/Hero";
import PageWrapper from "@/components/PageWrapper";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/contact");

const ContactPage = () => {
  return (
    <>
      <PageWrapper>
        <Hero />
      </PageWrapper>
    </>
  );
};

export default ContactPage;
