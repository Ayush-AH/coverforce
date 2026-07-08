"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/common/Container";
import EyebrowPill from "@/components/common/EyebrowPill";
import { useSectionHeaderReveal } from "@/hooks/useSectionHeaderReveal";

gsap.registerPlugin(ScrollTrigger);

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

function chunkMembers<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

const Leaderships = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leadersGridRef = useRef<HTMLDivElement>(null);

  useSectionHeaderReveal({
    scopeRef: sectionRef,
    headerRef,
    headingRef,
  });

  useGSAP(
    () => {
      const grid = leadersGridRef.current;
      if (!grid) return;

      const members = gsap.utils.toArray<HTMLElement>(".leader-member", grid);
      if (!members.length) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(members, { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      gsap.set(members, { opacity: 0, y: 28 });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 639px)",
          isTablet: "(min-width: 640px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isDesktop } = context.conditions ?? {};
          const columns = isDesktop ? 3 : 2;
          const rows = chunkMembers(members, columns);

          rows.forEach((rowMembers) => {
            gsap.to(rowMembers, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.12,
              clearProps: "transform",
              scrollTrigger: {
                trigger: rowMembers[0],
                start: "top 88%",
                toggleActions: "play none none none",
                once: true,
              },
            });

          });
        },
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
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white text-[#0a143b]">
      <style>{`
        .leader-image-shell.way-card-shell {
          --way-card-hover-scale: 1.03;
          clip-path: inset(0);
        }

        .leader-image-shell .way-card-body {
          transition: transform 800ms cubic-bezier(0.165, 0.84, 0.44, 1);
          transform: translate3d(0, 0, 0) scale(1);
        }
      `}</style>
      <Container borderColor="#53535380" borderBottom>
        <div className="py-20 md:py-24 lg:py-28">
          <div
            ref={headerRef}
            className="flex max-w-xl flex-col items-start justify-end space-y-5"
          >
            <EyebrowPill surface="light" className="mb-0">
              Leaderships
            </EyebrowPill>

            <h2
              ref={headingRef}
              className="max-w-md text-2xl font-heading font-medium leading-[1.15] tracking-tight text-[#9AA8BC] sm:text-3xl sm:leading-[1.12] md:text-4xl lg:text-[1.625rem] lg:leading-[1.12]"
            >
              <span data-split>A blend of insurance and</span>
              <br />
              <span data-split>engineering expertise</span>
            </h2>
          </div>

          <div
            ref={leadersGridRef}
            className="mt-12 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8 xl:gap-12"
          >
            {leaders.map((leader, index) => (
              <article key={index} className="leader-member">
                <div className="leader-image-shell way-card-shell relative aspect-square w-full overflow-hidden bg-[#F5F7FA]">
                  <div className="way-card-body absolute inset-0 overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-heading font-medium leading-tight tracking-tight text-[#000000] md:text-2xl">
                  {leader.name}
                </h3>

                <p className="mt-1 font-mono text-[0.6875rem] font-medium uppercase text-[#3A3A3A] md:text-sm">
                  {leader.role}
                </p>

                <p className="mt-4 font-sans text-sm font-regular leading-[1.65] text-[#3A3A3A] md:text-base md:leading-[1.7]">
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
