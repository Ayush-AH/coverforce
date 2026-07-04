"use client";

import Container from "@/components/common/Container";
import EyebrowPill from "@/components/common/EyebrowPill";
import { MarqueeRow } from "@/components/solutions/wholesalers/MarqueeLine";

const OurTeam = () => {
  return (
    <section className="relative overflow-hidden bg-white text-[#0a143b]">
      <Container borderColor="#53535380">
        <div className="py-16 md:py-20 lg:py-24">
          <EyebrowPill surface="light" className="mb-0">
            Our Team Comes From
          </EyebrowPill>

          <div className="mt-10 md:mt-12 lg:mt-14">
            <MarqueeRow />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurTeam;
