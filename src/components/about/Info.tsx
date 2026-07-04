"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Container from "@/components/common/Container";
import { animateSplitTextReveal } from "@/lib/animateSplitTextReveal";

const paragraphClassName =
  "text-3xl font-heading font-regular leading-[1.12] text-[#454545] md:text-4xl lg:text-[1.6rem] lg:leading-[1.12]";

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
        <div className="grid gap-10 py-20 md:gap-12 md:py-44 lg:grid-cols-3 lg:items-start lg:gap-14 xl:gap-16">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-md lg:col-span-1 lg:mx-0 lg:max-w-none">
            <Image
              src="/images/about/info.png"
              alt="CoverForce team"
              width={640}
              height={480}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 90vw, 33vw"
            />
          </div>

          <div className="flex flex-col gap-8 lg:col-span-2 lg:gap-10 lg:pt-2">
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
