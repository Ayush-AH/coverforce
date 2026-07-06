import type { ReactNode } from "react";
import Link from "next/link";
import Container from "@/components/common/Container";

export type LegalSection = {
  title: string;
  paragraphs?: ReactNode[];
  listItems?: string[];
  bulletItems?: string[];
  numberedItems?: string[];
};

export type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  subtitle?: string;
  siteCovered?: string;
  notice?: string;
  lastUpdated?: string;
  tableOfContents?: string[];
  sections: LegalSection[];
  footerNote?: ReactNode;
};

const headingClass = "text-[#3D3D3D]";
const bodyClass =
  `font-sans text-sm font-regular leading-[1.7] md:text-base ${headingClass}`;
const linkClass = "text-[#3D3D3D] underline underline-offset-2";

const LegalPage = ({
  eyebrow,
  title,
  intro,
  subtitle,
  siteCovered,
  notice,
  lastUpdated,
  tableOfContents,
  sections,
  footerNote,
}: LegalPageProps) => {
  return (
    <section className="bg-white text-[#3D3D3D]">
      <Container borderColor="#53535380" borderBottom>
        <div className="mx-auto max-w-4xl py-20 md:py-24 lg:py-28">
          <div className="space-y-5">
            <h1
              className={`text-3xl font-heading font-normal leading-[1.12] tracking-tight md:text-4xl lg:text-[2.5rem] lg:leading-[1.1] ${headingClass}`}
            >
              {title}
            </h1>
            {siteCovered ? (
              <p className={bodyClass}>
                <span className={`font-medium ${headingClass}`}>Site Covered:</span> {siteCovered}
              </p>
            ) : null}
            {intro ? <div className={`space-y-4 ${bodyClass}`}>{intro}</div> : null}
            {subtitle ? (
              <p className={`font-heading text-lg font-medium leading-snug md:text-xl ${headingClass}`}>
                {subtitle}
              </p>
            ) : null}
            {lastUpdated ? (
              <p className={`font-mono text-[0.6875rem] font-medium uppercase tracking-[0.08em] ${bodyClass}`}>
                Effective date: {lastUpdated}
              </p>
            ) : null}
            {notice ? (
              <div className="rounded-md border border-[#E5E7EB] bg-[#FAFBFF] px-5 py-4">
                <p className={`${bodyClass} font-medium`}>{notice}</p>
              </div>
            ) : null}
            {tableOfContents?.length ? (
              <div className="rounded-md border border-[#E5E7EB] bg-[#FAFBFF] px-5 py-5">
                <h2 className={`font-heading text-base font-medium md:text-lg ${headingClass}`}>
                  Privacy Policy Table of Contents
                </h2>
                <ul className={`mt-4 space-y-2 ${bodyClass}`}>
                  {tableOfContents.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className={`mt-2 size-1 shrink-0 rounded-full bg-[#3D3D3D]`} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="mt-12 space-y-10 md:mt-14 md:space-y-12">
            {sections.map((section) => (
              <article key={section.title} className="space-y-4">
                <h2
                  className={`text-xl font-heading font-medium leading-snug tracking-tight md:text-2xl ${headingClass}`}
                >
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs?.map((paragraph, index) => (
                    <p key={`${section.title}-p-${index}`} className={bodyClass}>
                      {paragraph}
                    </p>
                  ))}
                  {section.bulletItems?.length ? (
                    <ul className={`list-disc space-y-2 pl-5 ${bodyClass}`}>
                      {section.bulletItems.map((item, index) => (
                        <li key={`${section.title}-bullet-${index}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.listItems?.length ? (
                    <ol
                      className={`list-[lower-alpha] space-y-3 pl-5 marker:font-medium marker:text-[#3D3D3D] ${bodyClass}`}
                    >
                      {section.listItems.map((item, index) => (
                        <li key={`${section.title}-li-${index}`}>{item}</li>
                      ))}
                    </ol>
                  ) : null}
                  {section.numberedItems?.length ? (
                    <ol className={`list-decimal space-y-3 pl-5 ${bodyClass}`}>
                      {section.numberedItems.map((item, index) => (
                        <li key={`${section.title}-num-${index}`}>{item}</li>
                      ))}
                    </ol>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          {footerNote ? (
            <div className={`${bodyClass} mt-12 border-t border-[#E5E7EB] pt-8`}>{footerNote}</div>
          ) : (
            <p className={`${bodyClass} mt-12 border-t border-[#E5E7EB] pt-8`}>
              Questions about these terms can be sent to{" "}
              <a href="mailto:info@coverforce.com" className={linkClass}>
                info@coverforce.com
              </a>{" "}
              or through our{" "}
              <Link href="/contact" className={linkClass}>
                contact page
              </Link>
              .
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default LegalPage;
