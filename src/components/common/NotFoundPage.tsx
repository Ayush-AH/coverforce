import Container from "./Container";
import Button from "./Button";
import { getBottomBorderStyle } from "./containerStyles";

export default function NotFoundPage() {
  return (
    <section className="bg-white text-[#0a143b]">
      <Container className="relative">
        <div className="mx-auto flex h-svh max-w-2xl flex-col items-center justify-center px-4 text-center">
          <h1 className="max-w-4xl text-3xl font-heading font-regular leading-[1.1] tracking-tight text-[#0a143b] md:text-4xl lg:text-5xl xl:text-5xl">
            This page isn&apos;t on our map
          </h1>

          <p className="mt-4 max-w-sm font-sans text-xs leading-[1.4] text-[#50617a] md:text-sm">
            The link may be broken or the page may have moved. Head back home to
            continue quoting and binding in one workflow.
          </p>

          <Button href="/" variant="outline" className="mt-8">
            Back to home
          </Button>
        </div>
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 block h-0"
          style={getBottomBorderStyle("#e5e7eb")}
          aria-hidden
        />
      </Container>
    </section>
  );
}
