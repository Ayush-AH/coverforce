import Image from "next/image";
import Container from "@/components/common/Container";

const paragraphClassName =
  "text-2xl font-heading font-regular leading-[1.2] tracking-tight md:text-[1.75rem] md:leading-[1.18] lg:text-[2rem] lg:leading-[1.15]";

const Info = () => {
  return (
    <section className="bg-white text-[#0a143b]">
      <Container borderColor="#53535333" borderBottom>
        <div className="grid gap-10 py-20 md:gap-12 md:py-24 lg:grid-cols-3 lg:items-start lg:gap-14 xl:gap-16">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl lg:col-span-1 lg:mx-0 lg:max-w-none">
            <Image
              src="/images/about/info.png"
              alt="CoverForce team"
              width={640}
              height={480}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 90vw, 33vw"
            />
          </div>

          <div className="flex flex-col gap-8 lg:col-span-2 lg:gap-10 lg:pt-2">
            <p className={paragraphClassName}>
              <span className="text-[#0a143b]">
                Today, CoverForce continues to invest in building the most reliable,
              </span>{" "}
              <span className="text-[#BCC5D6]">
                developer-friendly infrastructure for commercial insurance.
              </span>
            </p>

            <p className={`${paragraphClassName} text-[#BCC5D6]`}>
              Our mission remains the same as it was at the start: to empower carriers,
              agencies, and platforms with technology that makes insurance distribution
              effortless, scalable, and built for the future.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Info;
