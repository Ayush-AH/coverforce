import React from "react";
import Link from "next/link";
import Container from "../common/Container";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
      <span className="inline-block size-2 shrink-0 bg-[#5B35E0]" aria-hidden />
      {children}
    </p>
  );
}

const Explore = () => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#1e3a8a_0%,#0f1d4a_45%,#0a143b_100%)] py-20 text-white md:py-24 lg:py-28">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow>Explore the platform</Eyebrow>

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            Start a New Quote
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
            Start quoting faster with CoverForce. Submit once, compare carriers,
            and bind in one platform.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#0a143b] transition-opacity hover:opacity-90"
            >
              Request demo
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-transparent px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Book a call
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Explore;
