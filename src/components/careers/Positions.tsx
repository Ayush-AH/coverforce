"use client";

import Link from "next/link";
import { useRef } from "react";
import Container from "@/components/common/Container";
import EyebrowPill from "@/components/common/EyebrowPill";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

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

const GRADIENT_TEXT =
  "bg-gradient-to-r from-[#0032C9] via-[#5B35E0] to-[#9B8AFB] bg-clip-text text-transparent";

const GRADIENT_BG =
  "bg-gradient-to-r from-[#0032C9] via-[#5B35E0] to-[#9B8AFB]";

const ROW_GRID =
  "grid grid-cols-1 gap-4 border-b border-dashed border-[#CCCCCC] py-5 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_11rem_8rem_5.5rem] lg:items-center lg:gap-6 lg:py-6";

function ApplyButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-8 w-fit items-center justify-center rounded-full px-5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90 ${GRADIENT_BG}`}
    >
      Apply
    </Link>
  );
}

function JobRow({ job }: { job: JobListing }) {
  return (
    <article className={ROW_GRID}>
      <h3 className="font-heading text-base font-medium leading-snug text-[#0a143b] md:text-[1.0625rem]">
        {job.title}
      </h3>

      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#9AA8BC] lg:text-center">
        {job.location}
      </p>

      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#9AA8BC] lg:text-center">
        {job.type}
      </p>

      <div className="lg:flex lg:justify-end">
        <ApplyButton href={job.href} />
      </div>
    </article>
  );
}

function JobCategoryBlock({ category }: { category: JobCategory }) {
  return (
    <div className="mt-14 first:mt-0 md:mt-16">
      <div
        className={`${ROW_GRID} border-t border-dashed border-[#CCCCCC] py-4 lg:py-5`}
      >
        <p
          className={`font-heading text-sm font-medium md:text-[0.9375rem] ${GRADIENT_TEXT}`}
        >
          {category.name}
        </p>
        <p
          className={`hidden font-heading text-sm font-medium lg:block lg:text-center ${GRADIENT_TEXT}`}
        >
          Location
        </p>
        <p
          className={`hidden font-heading text-sm font-medium lg:block lg:text-center ${GRADIENT_TEXT}`}
        >
          Type
        </p>
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

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
  });

  return (
    <section ref={sectionRef} className="bg-white text-[#0a143b]">
      <Container borderColor="#53535333" borderBottom>
        <div className="py-16 md:py-20 lg:py-24">
          <div ref={headerRef} className="max-w-3xl">
            <EyebrowPill surface="light" className="mb-0">
              Open Positions
            </EyebrowPill>

            <h2
              ref={headingRef}
              className="mt-4 text-3xl font-heading font-regular leading-[1.12] tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              <span data-split>Join Our</span>{" "}
              <span className={GRADIENT_TEXT}>Growing Team</span>
            </h2>
          </div>

          <div className="mt-14 md:mt-16 lg:mt-20">
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
