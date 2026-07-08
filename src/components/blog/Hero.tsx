import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import EyebrowPill from "@/components/common/EyebrowPill";

const FEATURED_POST = {
  href: "/blog/coverforce-named-cb-insights-2025",
  image: "/images/blog/blog6.png",
  category: "News",
  title:
    "CoverForce Named to the 2025 CB Insights' List of the 50 Most Innovative Insurtech Startups",
  date: "October 16, 2025",
  readTime: "1 min read",
};

const Hero = () => {
  return (
    <section className="bg-white text-[#0a143b]">
      <Container borderColor="#53535380" borderBottom>
        <div className="py-14 md:py-20 lg:py-24">
          <Link
            href={FEATURED_POST.href}
            className="group mx-auto block w-full"
          >
            <div className="relative w-full overflow-hidden rounded-md">
              <div className="relative aspect-video w-full">
                <Image
                  src={FEATURED_POST.image}
                  alt={FEATURED_POST.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 42rem"
                />
              </div>
            </div>

            <div className="mt-6">
              <EyebrowPill surface="light" className="mb-0">
                {FEATURED_POST.category}
              </EyebrowPill>

              <h2 className="mt-4 max-w-2xl font-heading text-3xl font-medium leading-[1.12] tracking-tight text-[#0a143b] transition-colors md:text-4xl lg:text-[1.625rem] lg:leading-[1.12]">
                {FEATURED_POST.title}
              </h2>

              <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#6B7280]">
                {FEATURED_POST.date}
                <span className="mx-2 text-[#C4C4C4]">&bull;</span>
                {FEATURED_POST.readTime}
              </p>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
