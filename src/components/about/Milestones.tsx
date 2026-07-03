"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { src: "/images/about/milestone1.png", alt: "CoverForce milestone 1" },
  { src: "/images/about/milestone2.png", alt: "CoverForce milestone 2" },
  { src: "/images/about/milestone3.png", alt: "CoverForce milestone 3" },
  { src: "/images/about/milestone4.png", alt: "CoverForce milestone 4" },
] as const;

const CLIP_HIDDEN_BOTTOM = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
const CLIP_FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CLIP_HIDDEN_TOP = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

const Milestones = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const count = milestones.length;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const ctx = gsap.context(() => {
          panelRefs.current.forEach((el, index) => {
            if (!el) return;
            gsap.set(el, {
              clipPath: index === 0 ? CLIP_FULL : CLIP_HIDDEN_BOTTOM,
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight * count}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          milestones.forEach((_, index) => {
            if (index === 0) return;

            tl.to(
              panelRefs.current[index - 1],
              { clipPath: CLIP_HIDDEN_TOP, duration: 1, ease: "none" },
              index,
            );
            tl.to(
              panelRefs.current[index],
              { clipPath: CLIP_FULL, duration: 1, ease: "none" },
              index,
            );
          });
        }, section);

        const lenis = window.lenis;
        const onLenisScroll = () => ScrollTrigger.update();
        lenis?.on("scroll", onLenisScroll);

        return () => {
          lenis?.off("scroll", onLenisScroll);
          ctx.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative w-full">
      <div className="relative hidden h-svh min-h-svh w-full overflow-hidden lg:block">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.src}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            className="absolute bottom-0 left-0 h-full w-full"
            style={{
              clipPath: index === 0 ? CLIP_FULL : CLIP_HIDDEN_BOTTOM,
              zIndex: index + 1,
            }}
          >
            <Image
              src={milestone.src}
              alt={milestone.alt}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 p-6 lg:hidden">
        {milestones.map((milestone) => (
          <div
            key={`${milestone.src}-mobile`}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-md"
          >
            <Image
              src={milestone.src}
              alt={milestone.alt}
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Milestones;
