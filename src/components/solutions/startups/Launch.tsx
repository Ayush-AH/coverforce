"use client";

import { useRef, useState } from "react";
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

const INACTIVE_COLOR = "#E5E7EB";
const ACTIVE_COLOR = "#151f4d";

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
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
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
          const pos = i;

          tl.to(progressRefs.current[i], { scaleX: 1, duration: 1, ease: "none" }, pos);
          tl.to(labelRefs.current[i], { color: ACTIVE_COLOR, duration: 1, ease: "none" }, pos);
          tl.to(titleRefs.current[i], { color: ACTIVE_COLOR, duration: 1, ease: "none" }, pos);

          if (i > 0) {
            tl.to(
              imageRefs.current[i - 1],
              { clipPath: CLIP_HIDDEN_TOP, duration: 1, ease: "none" },
              pos,
            );
          }

          tl.to(
            imageRefs.current[i],
            { clipPath: CLIP_FULL, duration: 1, ease: "none" },
            pos,
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const handleStepClick = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const target = st.start + (index / launchSteps.length) * (st.end - st.start);
    gsap.to(window, { scrollTo: target, duration: 0.8, ease: "power2.inOut" });
  };

  return (
    <section id="launch" ref={sectionRef} className="bg-white text-[#0a143b]">
      <Container borderColor="#53535380">
        <div ref={headerRef} className="space-y-3 py-10 lg:hidden">
          <h2
            ref={headingRef}
            className="max-w-xs text-2xl font-heading font-regular leading-[1.2] tracking-tight text-[#0a143b]"
          >
            <span data-split>From idea to first bind Three steps</span>
          </h2>
          <p
            ref={descRef}
            className="max-w-sm font-sans text-sm font-regular leading-relaxed text-[#3E3E3E]"
          >
            Launching a brokerage used to be hard. We make it easier with ready
            infrastructure and trusted partners.
          </p>
        </div>

        {/* Mobile: step → image, stacked */}
        <div className="flex flex-col gap-12 pb-10 lg:hidden">
          {launchSteps.map((step) => (
            <div key={step.id} className="flex flex-col gap-5">
              <div className="border-t border-[#E5E7EB] py-4">
                <p className="font-mono text-sm font-regular leading-relaxed text-[#151f4d]">
                    {step.label}
                  </p>
                  <p className="mt-1 font-sans text-sm font-regular leading-relaxed text-[#151f4d]">
                    {step.title}
                  </p>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-50">
                <Image
                  className="h-full w-full object-cover"
                  src={step.image}
                  alt={step.title}
                  width={500}
                  height={500}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: pinned scroll with side-by-side layout */}
        <div className="hidden h-screen grid-cols-7 items-center gap-23 pt-27 pb-12 lg:grid">
          <div className="flex h-full flex-col justify-between lg:col-span-3">
            <div className="space-y-5">
              <h2 className="max-w-xs text-[1.75rem] font-heading font-regular leading-tight tracking-tight text-[#0a143b]">
                <span data-split>From idea to first bind Three steps</span>
              </h2>
              <p className="max-w-sm font-sans text-sm font-regular leading-relaxed text-[#3E3E3E]">
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
                      className="h-1 w-full origin-left bg-[#151f4d]"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>
                  <div className="py-6">
                    <p
                      ref={(el) => {
                        labelRefs.current[index] = el;
                      }}
                      className="font-mono text-sm font-regular leading-relaxed"
                    >
                      {step.label}
                    </p>
                    <p
                      ref={(el) => {
                        titleRefs.current[index] = el;
                      }}
                      className="font-sans text-sm font-regular leading-relaxed"
                    >
                      {step.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-full w-full overflow-hidden rounded-md bg-gray-50 lg:col-span-4">
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
                  className="h-full w-full object-cover"
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
