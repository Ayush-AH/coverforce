"use client";

import ContactMapSvg from "@/components/contact/ContactMapSvg";
import styles from "@/components/contact/ContactMap.module.css";

const ContactMap = () => {
  return (
    <div
      className={`${styles.map} pointer-events-none absolute inset-x-0 top-0 z-10 h-full w-full`}
      aria-hidden
    >
      <ContactMapSvg
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Global office map with New York highlighted"
      />
    </div>
  );
};

export default ContactMap;
