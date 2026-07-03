"use client";

import Image from "next/image";
import { useRef } from "react";
import Container from "@/components/common/Container";
import EyebrowPill from "@/components/common/EyebrowPill";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

const leaders = [
  {
    name: "Cyrus Karai",
    role: "CEO & Co-Founder",
    bio: "Wharton MBA and Chartered Accountant. Former Credit Suisse and PwC leader driving company vision, strategy, and growth.",
    image: "/images/about/member1.png",
  },
  {
    name: "Kaivan Wadia",
    role: "CTO & Co-Founder",
    bio: "Former Amazon Software Development Manager with deep expertise in building and scaling technology platforms.",
    image: "/images/about/member2.png",
  },
  {
    name: "Behram Dinshaw",
    role: "Chairman & Co-Founder",
    bio: "President of Farmers Insurance and former Travelers executive with 25+ years of insurance leadership experience.",
    image: "/images/about/member3.png",
  },
  {
    name: "Cyrus Karai",
    role: "CEO & Co-Founder",
    bio: "Wharton MBA and Chartered Accountant. Former Credit Suisse and PwC leader driving company vision, strategy, and growth.",
    image: "/images/about/member1.png",
  },
  {
    name: "Kaivan Wadia",
    role: "CTO & Co-Founder",
    bio: "Former Amazon Software Development Manager with deep expertise in building and scaling technology platforms.",
    image: "/images/about/member2.png",
  },
  {
    name: "Behram Dinshaw",
    role: "Chairman & Co-Founder",
    bio: "President of Farmers Insurance and former Travelers executive with 25+ years of insurance leadership experience.",
    image: "/images/about/member3.png",
  },
  {
    name: "Cyrus Karai",
    role: "CEO & Co-Founder",
    bio: "Wharton MBA and Chartered Accountant. Former Credit Suisse and PwC leader driving company vision, strategy, and growth.",
    image: "/images/about/member1.png",
  }
] as const;

const Leaderships = () => {
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
        <div className="py-20 md:py-24 lg:py-28">
          <div ref={headerRef} className="max-w-xl">
            <EyebrowPill surface="light" className="mb-0">
              Leaderships
            </EyebrowPill>

            <h2
              ref={headingRef}
              className="mt-4 text-3xl font-heading font-regular leading-[1.12] tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              A blend of insurance and engineering expertise
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8 xl:gap-12">
            {leaders.map((leader) => (
              <article key={leader.name}>
                <div className="relative aspect-square w-full overflow-hidden bg-[#F5F7FA]">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <h3 className="mt-5 text-xl font-heading font-medium leading-tight tracking-tight text-[#0a143b] md:text-2xl">
                  {leader.name}
                </h3>

                <p className="mt-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#50617a] md:text-xs">
                  {leader.role}
                </p>

                <p className="mt-4 font-sans text-sm font-regular leading-[1.65] text-[#50617a] md:text-base md:leading-[1.7]">
                  {leader.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Leaderships;
