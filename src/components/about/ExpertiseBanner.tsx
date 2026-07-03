import Image from "next/image";

const ExpertiseBanner = () => {
  return (
    <section className="relative h-svh min-h-svh w-full overflow-hidden">
      <Image
        src="/images/about/expertise.png"
        alt="A Convergence of Expertise"
        fill
        priority={false}
        className="object-cover object-center"
        sizes="100vw"
      />
    </section>
  );
};

export default ExpertiseBanner;
