"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Container from "@/components/common/Container";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type LaunchStep = {
  id: string;
  label: string;
  title: string;
  image: string;
};

const launchSteps: LaunchStep[] = [
  { id: "license", label: "STEP 01", title: "Get License", image: "/images/startups/step1.png" },
  { id: "appointments", label: "STEP 02", title: "Accelerated carrier appointments", image: "/images/startups/step2.png" },
  { id: "api", label: "STEP 03", title: "Connect to the API", image: "/images/startups/step3.png" },
];

const CLIP_HIDDEN_BOTTOM = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
const CLIP_FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CLIP_HIDDEN_TOP = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

const INACTIVE_COLOR = "#3E3E3E";
const ACTIVE_COLOR = "#0130BE";

const Launch = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
    descRef,
  });

  useGSAP(() => {
    if (!sectionRef.current) return;

    const steps = launchSteps.length;

    const ctx = gsap.context(() => {
      // initial state — every image starts hidden at the bottom
      progressRefs.current.forEach((el) => el && gsap.set(el, { scaleX: 0 }));
      labelRefs.current.forEach((el) => el && gsap.set(el, { color: INACTIVE_COLOR }));
      titleRefs.current.forEach((el) => el && gsap.set(el, { color: INACTIVE_COLOR }));
      imageRefs.current.forEach((el) => el && gsap.set(el, { clipPath: CLIP_HIDDEN_BOTTOM }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * steps}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(steps - 1, Math.floor(self.progress * steps));
            setActiveStep(idx);
          },
          onRefresh: (self) => {
            scrollTriggerRef.current = self;
          },
        },
      });

      launchSteps.forEach((_, i) => {
        const pos = i; // each step occupies 1 unit of timeline time

        // progress bar fill + label/title color
        tl.to(progressRefs.current[i], { scaleX: 1, duration: 1, ease: "none" }, pos);
        tl.to(labelRefs.current[i], { color: ACTIVE_COLOR, duration: 1, ease: "none" }, pos);
        tl.to(titleRefs.current[i], { color: ACTIVE_COLOR, duration: 1, ease: "none" }, pos);

        // outgoing image (previous step) wipes out the top
        if (i > 0) {
          tl.to(
            imageRefs.current[i - 1],
            { clipPath: CLIP_HIDDEN_TOP, duration: 1, ease: "none" },
            pos
          );
        }

        // current image wipes in from the bottom
        tl.to(
          imageRefs.current[i],
          { clipPath: CLIP_FULL, duration: 1, ease: "none" },
          pos
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleStepClick = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const target = st.start + (index / launchSteps.length) * (st.end - st.start);
    gsap.to(window, { scrollTo: target, duration: 0.8, ease: "power2.inOut" });
  };

  return (
    <section ref={sectionRef} className="bg-white text-[#0a143b]">
      <Container borderColor="#53535380">
        <div className="grid h-screen gap-12 pt-24 pb-12 md:gap-14 lg:grid-cols-7 lg:items-center lg:gap-23">
          <div className="h-full flex flex-col justify-between lg:col-span-3">
            <div ref={headerRef} className="space-y-5">
              <h2
                ref={headingRef}
                className="mt-4 max-w-xs text-2xl font-heading font-regular leading-[1.2] tracking-tight text-[#0a143b] md:text-3xl lg:max-w-xs lg:text-[1.75rem] lg:leading-[1.25]"
              >
                <span data-split>From idea to first bind Three steps</span>
              </h2>
              <p
                ref={descRef}
                className="max-w-sm font-sans text-sm font-regular leading-relaxed text-[#3E3E3E] md:text-sm"
              >
                Launching a brokerage used to be hard. We make it easier with ready
                infrastructure and trusted partners.
              </p>
            </div>

            <div className="border-t border-[#E5E7EB]">
              {launchSteps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleStepClick(index)}
                  aria-current={activeStep === index}
                  className="block w-full text-left"
                >
                  <div className="h-1 w-full bg-[#E5E7EB]">
                    <div
                      ref={(el) => {
                        progressRefs.current[index] = el;
                      }}
                      className="h-1 w-full origin-left bg-[#0130BE]"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>
                  <div className="py-6">
                    <p
                      ref={(el) => {
                        labelRefs.current[index] = el;
                      }}
                      className="font-mono text-sm font-regular leading-relaxed md:text-sm"
                    >
                      {step.label}
                    </p>
                    <p
                      ref={(el) => {
                        titleRefs.current[index] = el;
                      }}
                      className="font-sans text-sm font-regular leading-relaxed md:text-sm"
                    >
                      {step.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 relative mx-auto h-full w-full">
            {launchSteps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className="absolute inset-0"
                style={{ clipPath: CLIP_HIDDEN_BOTTOM }}
              >
                <Image
                  className="h-full w-full object-contain"
                  src={step.image}
                  alt={step.title}
                  width={500}
                  height={500}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Launch;