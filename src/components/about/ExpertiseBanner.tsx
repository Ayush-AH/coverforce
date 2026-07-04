"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExpertiseBanner = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section || !image) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        gsap.set(image, { y: 0, clearProps: "transform" });
        return;
      }

      gsap.set(image, { y: -60, force3D: true });

      const tween = gsap.to(image, {
        y: 60,
        ease: "none",
        force3D: true,
        overwrite: "auto",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // smoothing lag instead of hard 1:1 scrub
          invalidateOnRefresh: true,
        },
      });

      const lenis = window.lenis;
      const onLenisScroll = () => ScrollTrigger.update();
      lenis?.on("scroll", onLenisScroll);

      // Keep GSAP's ticker in sync with Lenis's rAF loop
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();

      return () => {
        lenis?.off("scroll", onLenisScroll);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-svh min-h-svh w-full overflow-hidden"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 scale-110 will-change-transform"
      >
        <Image
          src="/images/about/expertise.png"
          alt="A Convergence of Expertise"
          fill
          priority={false}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
};

export default ExpertiseBanner;