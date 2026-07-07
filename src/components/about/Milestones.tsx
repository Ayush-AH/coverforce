"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/common/Container";
import EyebrowPill from "@/components/common/EyebrowPill";
import {
  containerPadding,
  getBottomBorderStyle,
} from "@/components/common/containerStyles";

gsap.registerPlugin(ScrollTrigger);

const BORDER_COLOR = "#FFFFFF40";

type Milestone = {
  src: string;
  alt: string;
  number: string;
  title: string;
  description: string;
};

const milestones: Milestone[] = [
  {
    src: "/images/about/milestone1.png",
    alt: "CoverForce milestone 1",
    number: "01",
    title: "Partnered with ISU Steadfast",
    description:
      "Collaborated with the second-largest U.S. agency network to build carrier integration infrastructure from the ground up.",
  },
  {
    src: "/images/about/milestone2.png",
    alt: "CoverForce milestone 2",
    number: "02",
    title: "Scaled carrier connectivity",
    description:
      "Expanded integrations across commercial lines, enabling agencies to quote and bind through a single unified workflow.",
  },
  {
    src: "/images/about/milestone3.png",
    alt: "CoverForce milestone 3",
    number: "03",
    title: "Launched API-first distribution",
    description:
      "Introduced a modern insurance API layer that connects platforms, agencies, and carriers in real time.",
  },
  {
    src: "/images/about/milestone4.png",
    alt: "CoverForce milestone 4",
    number: "04",
    title: "Accelerated national growth",
    description:
      "Continued building the infrastructure layer for commercial insurance distribution across new markets and partners.",
  },
];

const CLIP_HIDDEN_BOTTOM = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
const CLIP_FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CLIP_HIDDEN_TOP = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

const IMAGE_TRAVEL = 18;

const MILESTONE_OVERLAY_GRADIENT =
  "linear-gradient(135deg, rgba(0, 0, 0, 0.54) 0%, rgba(0, 0, 0, 0.27) 100%)";

const milestoneDisplayClassName =
  "font-heading text-[3.5rem] font-semibold leading-none tracking-tight text-white md:text-[4.5rem] lg:text-[3.5rem]";

function MilestoneContent({ milestone }: { milestone: Milestone }) {
  return (
    <div className="relative flex h-full flex-col">
      <div
        className="flex min-h-[42%] flex-col justify-end md:min-h-[45%]"
        style={getBottomBorderStyle(BORDER_COLOR)}
      >
        <div className={`${containerPadding} pb-8 md:pb-10`}>
          <p className={milestoneDisplayClassName}>{milestone.number}</p>
        </div>
      </div>

      <div
        className={`grid flex-1 content-start gap-6 pt-8 md:gap-8 md:pt-10 lg:grid-cols-[auto_minmax(0,40rem)] lg:items-start lg:justify-between lg:gap-10 lg:pt-12 ${containerPadding}`}
      >
        <EyebrowPill surface="dark" className="mb-0">
          Milestones
        </EyebrowPill>
        <div className="w-full lg:max-w-160 lg:justify-self-end">
          <h2 className={milestoneDisplayClassName}>{milestone.title}</h2>
          <p className="mt-4 max-w-xl font-sans text-sm font-semibold leading-[1.55] text-white md:text-xl md:leading-[1.6]">
            {milestone.description}
          </p>
        </div>
      </div>
    </div>
  );
}

const Milestones = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageWrapRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const count = milestones.length;
      const ctx = gsap.context(() => {
        panelRefs.current.forEach((el, index) => {
          if (!el) return;
          gsap.set(el, {
            clipPath: index === 0 ? CLIP_FULL : CLIP_HIDDEN_BOTTOM,
          });
        });

        imageWrapRefs.current.forEach((el, index) => {
          if (!el) return;
          gsap.set(el, {
            yPercent: index === 0 ? 0 : IMAGE_TRAVEL,
            force3D: true,
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

          const pos = index - 1;

          const prevPanel = panelRefs.current[index - 1];
          const currPanel = panelRefs.current[index];
          const prevImage = imageWrapRefs.current[index - 1];
          const currImage = imageWrapRefs.current[index];

          tl.to(prevPanel, { clipPath: CLIP_HIDDEN_TOP, duration: 1, ease: "none" }, pos);
          tl.to(prevImage, { yPercent: -IMAGE_TRAVEL, duration: 1, ease: "none" }, pos);

          tl.to(currPanel, { clipPath: CLIP_FULL, duration: 1, ease: "none" }, pos);
          tl.to(currImage, { yPercent: 0, duration: 1, ease: "none" }, pos);
        });
      }, section);

      const lenis = window.lenis;
      const onLenisScroll = () => ScrollTrigger.update();
      lenis?.on("scroll", onLenisScroll);

      return () => {
        lenis?.off("scroll", onLenisScroll);
        ctx.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative w-full">
      <div className="relative h-dvh min-h-dvh w-full overflow-hidden lg:h-svh lg:min-h-svh">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.src}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            className="absolute bottom-0 left-0 h-full w-full overflow-hidden"
            style={{
              clipPath: index === 0 ? CLIP_FULL : CLIP_HIDDEN_BOTTOM,
              zIndex: index + 1,
            }}
          >
            <div
              ref={(el) => {
                imageWrapRefs.current[index] = el;
              }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={milestone.src}
                alt={milestone.alt}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: MILESTONE_OVERLAY_GRADIENT }}
                aria-hidden
              />
            </div>

            <div className="pointer-events-none absolute inset-0 z-10">
              <Container borderColor={BORDER_COLOR} className="h-full px-0!">
                <MilestoneContent milestone={milestone} />
              </Container>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Milestones;
