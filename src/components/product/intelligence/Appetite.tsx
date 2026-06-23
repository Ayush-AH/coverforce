"use client";

import Container from "@/components/common/Container";
import SectionRadialGlow from "@/components/common/SectionRadialGlow";

type AppetiteStatus = "writing" | "selective" | "decline";

type CarrierRow = {
  name: string;
  wc: AppetiteStatus;
  gl: AppetiteStatus;
  bop: AppetiteStatus;
  cyber: AppetiteStatus;
  umbr: AppetiteStatus;
};

const QUICK_TRY_TAGS = [
  "722511 — Full-Service Restaurants",
  "236220 — Commercial Building Construction",
  "541511 — Custom Computer Programming",
  "238220 — Plumbing & HVAC",
  "621111 — Physician Offices",
  "484110 — General Freight Trucking",
] as const;

const CARRIER_ROWS: CarrierRow[] = [
  {
    name: "Hartford",
    wc: "writing",
    gl: "writing",
    bop: "selective",
    cyber: "decline",
    umbr: "writing",
  },
  {
    name: "Travelers",
    wc: "selective",
    gl: "writing",
    bop: "writing",
    cyber: "selective",
    umbr: "writing",
  },
  {
    name: "AmTrust",
    wc: "writing",
    gl: "selective",
    bop: "decline",
    cyber: "decline",
    umbr: "selective",
  },
  {
    name: "Nationwide",
    wc: "writing",
    gl: "writing",
    bop: "writing",
    cyber: "selective",
    umbr: "writing",
  },
  {
    name: "Employers",
    wc: "writing",
    gl: "decline",
    bop: "decline",
    cyber: "decline",
    umbr: "decline",
  },
  {
    name: "CNA",
    wc: "selective",
    gl: "writing",
    bop: "selective",
    cyber: "writing",
    umbr: "selective",
  },
  {
    name: "Liberty Mutual",
    wc: "writing",
    gl: "writing",
    bop: "selective",
    cyber: "decline",
    umbr: "writing",
  },
  {
    name: "Chubb",
    wc: "selective",
    gl: "writing",
    bop: "writing",
    cyber: "writing",
    umbr: "writing",
  },
];

const STATUS_DOT: Record<AppetiteStatus, string> = {
  writing: "bg-[#72AF23]",
  selective: "bg-[#F0784A]",
  decline: "bg-[#D8DCE3]",
};

const LINE_COLUMNS = ["WC", "GL", "BOP", "CYBER", "UMBR."] as const;

function StatusDot({ status }: { status: AppetiteStatus }) {
  return (
    <span
      className={`mx-auto block size-3 rounded-full ${STATUS_DOT[status]}`}
      aria-hidden
    />
  );
}

function LegendItem({
  status,
  label,
}: {
  status: AppetiteStatus;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 font-heading text-[0.6875rem] text-[#6B7280]">
      <span className={`size-2.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden />
      {label}
    </span>
  );
}

const Appetite = () => {
  return (
    <section className="relative  bg-[#121C49] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(49, 78, 155, 0.55) 0%, rgba(18, 28, 73, 0.92) 52%, #121C49 100%)",
        }}
        aria-hidden
      />

      <Container borderColor="#FFFFFF33" className="relative z-10 border-t border-[#FFFFFF1A]">
        <div className="py-16 md:py-20 lg:py-24">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-[2rem]">
              CoverForce Appetite Engine
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/75 md:text-[0.9375rem]">
              Check carrier appetite for any class code — powered by 140K+
              proprietary carrier interactions.
            </p>
          </div>

          <div className="relative mx-auto mt-10 max-w-5xl overflow-visible md:mt-12">
            <SectionRadialGlow className="absolute left-1/2 top-1/2 z-0 w-[125%] max-w-[68rem] -translate-x-1/2 -translate-y-1/2 blur-[4rem] opacity-90" />

            <div className="relative z-10 rounded-2xl bg-white p-5 text-[#0a143b] shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-8 lg:p-10">
            <form
              className="space-y-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <div>
                <label
                  htmlFor="naics-search"
                  className="mb-2 block font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#3834A4]"
                >
                  Enter NAICS code or business type
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="naics-search"
                    type="text"
                    defaultValue="236220 — Commercial Building Construction"
                    className="min-w-0 flex-1 rounded-lg border border-[#E4E7EC] bg-white px-4 py-3.5 font-heading text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#9AA8BC] focus:border-[#5B35E0] focus:ring-1 focus:ring-[#5B35E0]/20"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-gradient-to-r from-[#3834A4] to-[#5B35E0] px-6 py-3.5 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-95 md:px-8 md:text-sm"
                  >
                    Check Appetite
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-3 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#3834A4]">
                  Quick try
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_TRY_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`rounded-full border px-3 py-1.5 font-heading text-[0.6875rem] transition-colors md:text-xs ${
                        tag.includes("236220")
                          ? "border-[#5B35E0]/30 bg-[#5B35E0]/8 text-[#3834A4]"
                          : "border-[#E4E7EC] bg-[#FAFBFC] text-[#6B7280] hover:border-[#C8CDD6]"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </form>

            <div className="mt-8 border-t border-[#ECEEF2] pt-6 md:mt-10 md:pt-8">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[#6B7280]">
                  Appetite results — commercial building construction
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <LegendItem status="writing" label="Writing" />
                  <LegendItem status="selective" label="Selective" />
                  <LegendItem status="decline" label="Decline" />
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl bg-[#F8F9FB]">
                <table className="w-full min-w-[36rem] border-collapse">
                  <thead>
                    <tr className="border-b border-[#ECEEF2]">
                      <th className="px-4 py-3 text-left font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[#6B7280] md:px-5">
                        Carrier
                      </th>
                      {LINE_COLUMNS.map((column) => (
                        <th
                          key={column}
                          className="px-3 py-3 text-center font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[#6B7280] md:px-4"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CARRIER_ROWS.map((carrier) => (
                      <tr
                        key={carrier.name}
                        className="border-b border-[#ECEEF2] last:border-b-0"
                      >
                        <td className="px-4 py-3.5 font-heading text-sm font-medium text-[#3834A4] md:px-5 md:py-4">
                          {carrier.name}
                        </td>
                        <td className="px-3 py-3.5 md:px-4 md:py-4">
                          <StatusDot status={carrier.wc} />
                        </td>
                        <td className="px-3 py-3.5 md:px-4 md:py-4">
                          <StatusDot status={carrier.gl} />
                        </td>
                        <td className="px-3 py-3.5 md:px-4 md:py-4">
                          <StatusDot status={carrier.bop} />
                        </td>
                        <td className="px-3 py-3.5 md:px-4 md:py-4">
                          <StatusDot status={carrier.cyber} />
                        </td>
                        <td className="px-3 py-3.5 md:px-4 md:py-4">
                          <StatusDot status={carrier.umbr} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Appetite;
