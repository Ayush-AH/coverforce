"use client";

import Image from "next/image";
import { CheckCircle2, ChevronDown } from "lucide-react";
import Container from "@/components/common/Container";

const FORM_FIELDS = [
  {
    id: "industry",
    label: "INDUSTRY",
    value: "Retail Store",
    options: ["Retail Store", "Restaurant", "Construction", "Professional Services"],
  },
  {
    id: "revenue",
    label: "ANNUAL REVENUE",
    value: "$1M - $5M",
    options: ["Under $1M", "$1M - $5M", "$5M - $10M", "$10M+"],
    highlighted: true,
  },
  {
    id: "state",
    label: "STATE",
    value: "FL",
    options: ["FL", "CA", "TX", "NY"],
  },
  {
    id: "employees",
    label: "EMPLOYEES",
    value: "10 - 20",
    options: ["1 - 9", "10 - 20", "21 - 49", "50+"],
  },
] as const;

const ALSO_ELIGIBLE_LOGOS = [
  { src: "/images/process/logo3.svg", alt: "CompWest" },
  { src: "/images/process/logo6.svg", alt: "Coterie" },
  { src: "/images/process/logo8.svg", alt: "biBerk" },
  { src: "/images/Employers.svg", alt: "EMPLOYERS" },
  { src: "/images/process/logo4.svg", alt: "Chubb" },
  { src: "/images/process/logo5.svg", alt: "Coalition" },
  { src: "/images/process/logo7.svg", alt: "Liberty Mutual" },
] as const;

function FormSelect({
  label,
  value,
  options,
  highlighted = false,
}: {
  label: string;
  value: string;
  options: readonly string[];
  highlighted?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[#3834A4]">
        {label}
      </span>
      <div className="relative">
        <select
          defaultValue={value}
          className={`w-full appearance-none rounded-lg border bg-white px-4 py-3.5 pr-10 font-heading text-sm font-medium text-[#1A1A1A] outline-none transition-colors ${
            highlighted
              ? "border-[#5B35E0] ring-1 ring-[#5B35E0]/20"
              : "border-[#E4E7EC] focus:border-[#5B35E0] focus:ring-1 focus:ring-[#5B35E0]/20"
          }`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#9AA8BC]"
          aria-hidden
        />
      </div>
    </label>
  );
}

function MatchResultsCard() {
  return (
    <div className="rounded-2xl border border-[#ECEEF2] bg-white p-5 shadow-[0_20px_60px_rgba(18,28,73,0.08)] md:p-6 lg:p-7">
      <div className="border-b border-[#ECEEF2] pb-5">
        <p className="font-heading text-lg font-semibold text-[#3834A4] md:text-xl">
          8 carriers matched
        </p>
        <p className="mt-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[#9AA8BC]">
          RETAIL STORE / FL / $1M-$5M / 10-49 EMPLOYEES
        </p>
      </div>

      <div className="py-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#6DAB4E]">
            TOP MATCH
          </span>
          <span className="inline-flex items-center gap-1.5 font-heading text-xs font-medium text-[#6DAB4E] md:text-sm">
            <CheckCircle2 className="size-3.5 shrink-0" aria-hidden />
            92% appetite match
          </span>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-[#F0784A] to-[#E63946] p-4 md:gap-5 md:p-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white md:size-14">
            <Image
              src="/images/process/logo1.svg"
              alt="AmTrust"
              width={72}
              height={28}
              className="h-5 w-auto object-contain md:h-6"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-lg font-semibold leading-tight text-white md:text-xl">
              AmTrust
            </p>
            <p className="mt-0.5 font-heading text-xs font-regular text-white/85 md:text-sm">
              Worker&apos;s Compensation
            </p>
          </div>
          <p className="shrink-0 font-heading text-lg font-semibold leading-none text-white md:text-xl">
            $4,200–$5,800
          </p>
        </div>
      </div>

      <div className="border-t border-[#ECEEF2] pt-5">
        <p className="mb-3 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#9AA8BC]">
          ALSO ELIGIBLE
        </p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 md:gap-2.5">
          {ALSO_ELIGIBLE_LOGOS.map((logo) => (
            <div
              key={logo.alt}
              className="flex aspect-[1.35/1] items-center justify-center rounded-lg border border-[#ECEEF2] bg-white px-2 py-3"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={80}
                height={32}
                className="h-4 w-auto max-w-full object-contain md:h-5"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col items-start justify-between gap-4 border-t border-[#ECEEF2] pt-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-heading text-sm font-semibold text-[#3834A4] md:text-base">
            Estimated Response
          </p>
          <p className="mt-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[#9AA8BC]">
            QUOTES AVAILABLE IN MINUTES
          </p>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#E8E4FF] px-5 py-2.5 font-heading text-xs font-semibold text-[#3834A4] transition-colors hover:bg-[#DDD6FE] md:text-sm"
        >
          GET QUOTES
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}

const CarrierMatch = () => {
  return (
    <section className="bg-[#F4F5F7] text-[#0a143b]">
      <Container borderColor="#53535340">
        <div className="py-16 md:py-20 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="max-w-lg">
              <h2 className="font-heading text-3xl font-semibold leading-[1.15] tracking-tight text-[#1A1A1A] md:text-4xl lg:text-[2.5rem]">
                Find the right{" "}
                <span className="text-[#3834A4]">carrier for your business</span>{" "}
                risk
              </h2>

              <p className="mt-4 font-heading text-base font-semibold text-[#3834A4] md:text-lg">
                CoverForce Carrier Match
              </p>

              <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-[#6B7280] md:text-[0.9375rem]">
                Click any sample document below and watch CoverForce extract and
                structure every field in real time.
              </p>

              <form
                className="mt-8 space-y-4"
                onSubmit={(event) => event.preventDefault()}
              >
                {FORM_FIELDS.map((field) => (
                  <FormSelect
                    key={field.id}
                    label={field.label}
                    value={field.value}
                    options={field.options}
                    highlighted={"highlighted" in field && field.highlighted}
                  />
                ))}

                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-gradient-to-r from-[#F0784A] to-[#E63946] px-6 py-4 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-95 md:text-sm"
                >
                  Find Matching Carriers
                </button>
              </form>
            </div>

            <MatchResultsCard />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CarrierMatch;
