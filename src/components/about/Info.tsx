"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Container from "@/components/common/Container";
import { animateSplitTextReveal } from "@/lib/animateSplitTextReveal";

const paragraphClassName =
  "text-base font-heading font-regular leading-[1.5] text-[#454545] sm:text-lg md:text-4xl md:leading-[1.12] lg:text-[1.6rem] lg:leading-[1.12]";

const Info = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const paragraphs = [para1Ref.current, para2Ref.current].filter(
        (el): el is HTMLParagraphElement => Boolean(el),
      );

      const cleanups = paragraphs.map((paragraph) =>
        animateSplitTextReveal(paragraph, {
          trigger: paragraph,
          splitSelf: true,
          start: "top 85%",
          end: "top 50%",
        }),
      );

      return () => cleanups.forEach((cleanup) => cleanup());
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white text-[#0a143b]">
      <Container borderColor="#53535380">
        <div className="flex flex-col items-center py-20 md:py-24 lg:py-28">
          <div className="w-full max-w-3xl space-y-6 text-left">
            <p ref={para1Ref} className={paragraphClassName}>
              Today, CoverForce continues to invest in building the most reliable,
              developer-friendly infrastructure for commercial insurance.
            </p>

            <p ref={para2Ref} className={paragraphClassName}>
              Our mission remains the same as it was at the start: to empower carriers,
              agencies, and platforms with technology that makes insurance distribution
              effortless, scalable, and built for the future.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Info;
