import Image from "next/image";
import Link from "next/link";
import { RiTwitterXFill, RiLinkedinFill } from "@remixicon/react";
import Container from "@/components/common/Container";

type Author = {
  name: string;
  role: string;
  avatar: string;
  breadcrumb: string;
  bio: string;
  socials: { label: string; href: string; icon: typeof RiTwitterXFill }[];
};

const AUTHOR: Author = {
  name: "Cyrus Karai",
  role: "CEO & Co-Founder",
  avatar: "/images/blog/author.png",
  breadcrumb: "Insights",
  bio: "Cyrus Karai is the CEO and Co-Founder of CoverForce, where he leads the company's vision, strategy, and growth. With extensive experience across financial services, insurance, and consulting, Cyrus is passionate about transforming the commercial insurance industry through technology. Prior to founding CoverForce, he held leadership positions at Credit Suisse and PwC, advising organizations on strategy, transformation, and operational excellence. A Wharton MBA and Chartered Accountant, Cyrus combines deep industry expertise with a commitment to innovation, helping build modern infrastructure for the future of commercial insurance.",
  socials: [
    { label: "X (Twitter)", href: "#", icon: RiTwitterXFill },
    { label: "LinkedIn", href: "#", icon: RiLinkedinFill },
  ],
};

const Hero = () => {
  return (
    <section className="bg-white text-[#0a143b]">
      <Container borderColor="#53535380" borderBottom>
        <div className="mx-auto max-w-4xl py-14 md:py-20 lg:py-24">
          <nav className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#9AA8BC]">
            <Link href="/blog" className="transition-colors hover:text-[#413CC0]">
              Blogs
            </Link>
            <span className="text-[#C4C4C4]">/</span>
            <Link href="/blog" className="transition-colors hover:text-[#413CC0]">
              {AUTHOR.breadcrumb}
            </Link>
            <span className="text-[#C4C4C4]">/</span>
            <span className="text-[#50617a]">Author</span>
          </nav>

          <div className="mt-8 flex flex-col items-center text-center">
            <Image
              src={AUTHOR.avatar}
              alt={AUTHOR.name}
              width={128}
              height={128}
              priority
              className="size-28 rounded-full object-cover md:size-32"
            />

            <h1 className="mt-6 font-heading text-3xl font-medium tracking-tight text-[#0a143b] md:text-4xl">
              {AUTHOR.name}
            </h1>

            <p className="mt-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#6B7280]">
              {AUTHOR.role}
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              {AUTHOR.socials.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-full bg-[#0a143b] text-white transition-colors hover:bg-[#413CC0]"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-10 text-[0.9375rem] leading-[1.75] text-[#50617a]">
            {AUTHOR.bio}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
