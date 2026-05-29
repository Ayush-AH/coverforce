import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../common/Container";
type CarrierResult = {
  id: string;
  brand: React.ReactNode;
  title: string;
  description: string;
};

const carrierResults: CarrierResult[] = [
  {
    id: "employers",
    brand: (
      <span className="font-black tracking-[0.2em] text-white">EMPLOYERS</span>
    ),
    title: "0% Error Rate",
    description:
      "Only integration partner to achieve 0% API error rate on submission data.",
  },
  {
    id: "nationwide",
    brand: (
      <span className="text-lg font-bold tracking-wide text-white">
        NATIONWIDE
      </span>
    ),
    title: "Live in 12 Weeks",
    description:
      "BOP integration: under 12 weeks, less than 10 hours carrier eng time.",
  },
  {
    id: "chubb",
    brand: (
      <span className="text-xl font-light tracking-[0.35em] text-white">
        CHUBB
      </span>
    ),
    title: "Trust & Quality",
    description:
      "Submission quality → first wholesale partner appointed in 2+ years.",
  },
  {
    id: "liberty",
    brand: (
      <span className="flex flex-col text-white leading-tight">
        <span className="text-sm font-semibold italic">Liberty Mutual</span>
        <span className="text-[10px] font-medium uppercase tracking-wider opacity-90">
          Insurance
        </span>
      </span>
    ),
    title: "5-Point Bind Advantage",
    description:
      "Only integration partner to achieve 0% API error rate on submission data.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
      <span className="inline-block size-2 shrink-0 bg-[#5B35E0]" aria-hidden />
      {children}
    </p>
  );
}

function CarrierCard({ result }: { result: CarrierResult }) {
  return (
    <article className="flex flex-col gap-6 border-t border-white/15 pt-8 md:gap-8 md:pt-10">
      <div className="min-h-[2.5rem]">{result.brand}</div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white md:text-xl">
          {result.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/65">
          {result.description}
        </p>
      </div>
    </article>
  );
}

const CarrierResults = () => {
  return (
    <section className="relative overflow-hidden bg-[#0a143b] py-16 text-white md:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70"
        aria-hidden
      >
        <Image
          src="/carrier-results-wave.svg"
          alt=""
          width={1440}
          height={400}
          className="h-auto w-[120%] max-w-none object-cover"
        />
      </div>

      <Container>
        <div className="relative z-10 flex flex-col gap-14 lg:gap-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div className="space-y-5">
              <Eyebrow>Named carrier results</Eyebrow>
              <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Carrier results that speak for themselves
              </h2>
            </div>

            <div className="flex flex-col gap-6 lg:items-end lg:text-right">
              <p className="max-w-md text-sm leading-relaxed text-white/75 lg:ml-auto">
                Named outcomes provide clear, organized quote comparisons from
                appointed carriers, helping agents from production carrier
                partnerships.
              </p>
              <Link
                href="/"
                className="inline-flex w-fit rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#0a143b] transition-opacity hover:opacity-90 lg:ml-auto"
              >
                Explore Carrier
              </Link>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {carrierResults.map((result) => (
              <CarrierCard key={result.id} result={result} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CarrierResults;
