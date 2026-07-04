"use client";

import { type ReactNode } from "react";
import Container from "./Container";
import Button from "./Button";
import EyebrowPill from "./EyebrowPill";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

type FooterLinkData = {
  label: string;
  href: string;
};

type FooterColumnData = {
  title: string;
  links: FooterLinkData[];
};

type LegalLink = {
  label: string;
  href: string;
};

const footerColumns: FooterColumnData[] = [
  {
    title: "Products",
    links: [
      { label: "Submission and Intake", href: "/product/submission-intake" },
      { label: "Quotes and Bind", href: "/product/quote-bind" },
      { label: "Intelligence", href: "/product/intelligence" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Wholesalers", href: "/solutions/wholesalers" },
      { label: "Brokers", href: "/solutions/brokers" },
      { label: "Carriers", href: "/solutions/carrier" },
      { label: "Startups", href: "/solutions/startups" },
      { label: "Developers", href: "/solutions/developers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blogs and Insights", href: "/" },
      { label: "Career", href: "/" },
      { label: "Contact", href: "/" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "ROI Calculator", href: "/calculation" },
      { label: "Appetite Checker", href: "/product/intelligence" },
      { label: "2026 Carrier API Index", href: "/" },
    ],
  },
];

const standaloneLinks: FooterLinkData[] = [
  { label: "Integration", href: "/integration" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
];

const legalLinks: LegalLink[] = [
  { label: "Terms of Use", href: "/" },
  { label: "Privacy", href: "/" },
  { label: "Security", href: "/" },
];

const socialLinks = [
  { label: "YouTube", href: "#", icon: YoutubeIcon },
  { label: "X", href: siteConfig.socials.twitter || "#", icon: XIcon },
  { label: "LinkedIn", href: siteConfig.socials.linkedin || "#", icon: LinkedinIcon },
] as const;

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.5V8.5l6.3 3.5-6.3 3.5Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function FooterBullet({ className = "" }: { className?: string }) {
  return (
    <span
      className={`size-1.5 shrink-0 rounded-full bg-[#151f4d] ${className}`}
      aria-hidden
    />
  );
}

function FooterHoverBullet() {
  return (
    <span
      className="absolute left-0 top-1/2 size-2 -translate-y-1/2 origin-left scale-0 rounded-full bg-[#151f4d] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100"
      aria-hidden
    />
  );
}

const footerLinkHover =
  "transition-[padding-left,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:pl-3.5 hover:text-[#151f4d]";

type FooterLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

function FooterSubLink({ href, children, className = "" }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex pl-0 font-heading text-xs font-medium leading-snug text-[#3F3F3F]/80 ${footerLinkHover} ${className}`}
    >
      <FooterHoverBullet />
      {children}
    </Link>
  );
}

function FooterTopLink({ href, children, className = "" }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-heading text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#151f4d] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#0032C9] ${className}`}
    >
      <FooterBullet className="transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125 group-hover:bg-[#0032C9]" />
      {children}
    </Link>
  );
}

function FooterLegalLink({ href, children, className = "" }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex pl-0 font-heading text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#3F3F3F] ${footerLinkHover} ${className}`}
    >
      <FooterHoverBullet />
      {children}
    </Link>
  );
}

type FooterColumnProps = FooterColumnData;

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 font-heading text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#151f4d]">
        <FooterBullet />
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <FooterSubLink href={href}>{label}</FooterSubLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = () => {
  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#F9F8FF] text-[#0a143b]">
      <Container borderColor="#53535380">
        <div className="relative z-10 pt-12 md:pt-16 lg:pt-20">

          {/* ── Top: CTA banner ── */}
          <div className="relative min-h-[22rem] overflow-hidden border-b border-neutral-200 md:min-h-[26rem] lg:min-h-[30rem]">
            <Image
              src="/images/footer.png"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />

            <div className="relative z-10 flex min-h-[inherit] items-center px-6 pt-16 pb-12 md:px-10 md:pt-20 md:pb-16 lg:px-12 lg:pt-24 lg:pb-20">
              <div className="max-w-xl text-left lg:max-w-2xl">
                <EyebrowPill surface="dark" className="mb-0">
                  Explore the platform
                </EyebrowPill>

                <h2 className="mt-5 text-2xl font-heading font-regular leading-[1.12] tracking-tight text-white md:mt-6 md:text-3xl lg:text-4xl lg:leading-[1.1]">
                  One submission is all it takes. Compare multiple carriers and bind
                  the right policy quickly with CoverForce.
                </h2>

                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
                  <Button href="/" balanced surface="on-dark">
                    Request demo
                  </Button>
                  <Button href="/" balanced variant="secondary" surface="on-dark">
                    Book a call
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Nav columns + social icons ── */}
          <div className="border-b border-neutral-200 pt-10 pb-8 md:pt-12 md:pb-10 lg:pt-14 lg:pb-12">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-10">
              {footerColumns.map((column) => (
                <FooterColumn key={column.title} {...column} />
              ))}

              <div>
                <ul className="space-y-4">
                  {standaloneLinks.map(({ label, href }) => (
                    <li key={label}>
                      <FooterTopLink href={href}>{label}</FooterTopLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-5 md:mt-12">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#151f4d] transition-colors hover:text-[#0032C9]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="relative flex flex-col items-center gap-5 py-6 font-heading md:flex-row md:justify-between md:py-8">
            <ul className="flex flex-wrap justify-center gap-5 sm:gap-8 md:justify-start">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <FooterLegalLink href={href}>{label}</FooterLegalLink>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={scrollToTop}
              className={`group relative inline-flex pl-0 font-heading text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#3F3F3F] ${footerLinkHover} md:absolute md:left-1/2 md:-translate-x-1/2`}
            >
              <FooterHoverBullet />
              Back to Top
            </button>

            <p className="text-center font-heading text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#3F3F3F] md:text-right">
              © {new Date().getFullYear()} — Copyright CoverForce
            </p>
          </div>

        </div>
      </Container>
    </footer>
  );
};

export default Footer;