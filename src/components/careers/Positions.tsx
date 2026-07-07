"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import EyebrowPill from "@/components/common/EyebrowPill";
import { containerPadding, getBottomBorderStyle } from "@/components/common/containerStyles";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

gsap.registerPlugin(ScrollTrigger);

type JobListing = {
  title: string;
  location: string;
  type: string;
  href: string;
};

type JobCategory = {
  name: string;
  jobs: JobListing[];
};

const jobCategories: JobCategory[] = [
  {
    name: "Engineering Roles",
    jobs: [
      {
        title: "Business Analyst – Commercial Insurance",
        location: "Remote [India]",
        type: "Full Time",
        href: "#",
      },
      {
        title: "Founding AI Engineer",
        location: "Remote [India]",
        type: "Full Time",
        href: "#",
      },
      {
        title: "Software Engineer – Backend",
        location: "Remote [India]",
        type: "Full Time",
        href: "#",
      },
    ],
  },
  {
    name: "Sales",
    jobs: [
      {
        title: "Enterprise Account Executive",
        location: "Remote [India]",
        type: "Full Time",
        href: "#",
      },
      {
        title: "Marketing Associate",
        location: "Remote [India]",
        type: "Full Time",
        href: "#",
      },
    ],
  },
  {
    name: "More Jobs",
    jobs: [
      {
        title: "Enterprise Account Executive",
        location: "Remote [India]",
        type: "Full Time",
        href: "#",
      },
      {
        title: "Marketing Associate",
        location: "Remote [India]",
        type: "Full Time",
        href: "#",
      },
    ],
  },
];

const BORDER_COLOR = "#53535380";

const GRADIENT_TEXT =
  "bg-gradient-to-r from-[#0032C9] via-[#5B35E0] to-[#9B8AFB] bg-clip-text text-transparent";

const TABLE_GRID =
  "lg:grid lg:grid-cols-[minmax(0,1fr)_11rem_8rem_auto] lg:gap-x-6";

const ROW_BASE =
  `grid grid-cols-2 gap-x-4 gap-y-4 ${containerPadding} lg:col-span-full lg:grid-cols-subgrid lg:items-center lg:gap-x-6 lg:gap-y-0`;

const COL_LOCATION =
  "font-mono text-sm font-medium uppercase text-[#444444] lg:justify-self-start lg:text-left";

const COL_TYPE = COL_LOCATION;

const COL_HEADER =
  `hidden font-heading text-base font-medium lg:block lg:justify-self-start lg:text-left ${GRADIENT_TEXT}`;

function JobRow({ job }: { job: JobListing }) {
  return (
    <article
      className={`positions-row ${ROW_BASE} py-5 lg:py-6`}
      style={getBottomBorderStyle(BORDER_COLOR)}
    >
      <h3 className="col-span-2 max-w-sm font-heading text-base font-semibold leading-snug text-[#444444] md:text-xl md:font-medium">
        {job.title}
      </h3>

      <p className={COL_LOCATION}>{job.location}</p>

      <p className={COL_TYPE}>{job.type}</p>

      <div className="col-span-2 flex justify-start pt-1 lg:col-span-1 lg:justify-end lg:pt-0">
        <Button href={job.href} size="sm">
          Apply
        </Button>
      </div>
    </article>
  );
}

function JobCategoryBlock({ category }: { category: JobCategory }) {
  return (
    <div className={`mt-14 first:mt-0 md:mt-16 ${TABLE_GRID}`}>
      <div className={`positions-row ${ROW_BASE} py-4 lg:py-5`}>
        <p
          className={`font-heading text-base font-medium md:text-[0.9375rem] ${GRADIENT_TEXT}`}
        >
          {category.name}
        </p>
        <p className={COL_HEADER}>Location</p>
        <p className={COL_HEADER}>Type</p>
        <span className="hidden lg:block" aria-hidden />
      </div>

      {category.jobs.map((job) => (
        <JobRow key={`${category.name}-${job.title}`} job={job} />
      ))}
    </div>
  );
}

const Positions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const positionsListRef = useRef<HTMLDivElement>(null);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
  });

  useGSAP(
    () => {
      const list = positionsListRef.current;
      if (!list) return;

      const rows = gsap.utils.toArray<HTMLElement>(".positions-row", list);
      if (!rows.length) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      gsap.set(rows, { opacity: 0, y: 28 });

      const tweens = rows.map((row) =>
        gsap.to(row, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }),
      );

      const lenis = window.lenis;
      let scrollPending = false;
      const onLenisScroll = () => {
        if (scrollPending) return;
        scrollPending = true;
        requestAnimationFrame(() => {
          ScrollTrigger.update();
          scrollPending = false;
        });
      };
      lenis?.on("scroll", onLenisScroll);

      ScrollTrigger.refresh();

      return () => {
        lenis?.off("scroll", onLenisScroll);
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      };
    },
    { scope: sectionRef },
  );

  return (
    <section id="positions" ref={sectionRef} className="bg-[FAFBFF] text-[#0a143b]">
      <Container borderColor={BORDER_COLOR} className="!px-0">
        <div className="py-16 md:py-20 lg:py-24">
          <div
            ref={headerRef}
            className={`flex flex-col items-start justify-end space-y-5 ${containerPadding}`}
          >
            <EyebrowPill surface="light" className="mb-0">
              Open Positions
            </EyebrowPill>

            <h2
              ref={headingRef}
              className="max-w-md text-3xl font-heading font-medium leading-[1.12] tracking-tight text-[#9AA8BC] md:text-4xl lg:text-[1.625rem] lg:leading-[1.12]"
            >
              <span data-split>Join Our Growing Team</span>
            </h2>
          </div>

          <div ref={positionsListRef} className="mt-14 md:mt-16 lg:mt-20">
            {jobCategories.map((category) => (
              <JobCategoryBlock key={category.name} category={category} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Positions;
