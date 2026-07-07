"use client";
import Container from "../common/Container";
import SectionRadialGlow from "../common/SectionRadialGlow";
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import MapPoints from './MapPoints';
import ContactForm from "./ContactForm";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {

  const containerRef = useRef(null)

  useGSAP(()=>{
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:containerRef.current,
        start:"top top",
        end:"bottom bottom",
        scrub:true,
      }
    })

    tl.to(".us_map_bg",{
      opacity:0.05
    })
  })

  return (
    <section ref={containerRef}  className="relative bg-[#151f4d] text-white">
      <Container borderColor="#FFFFFF33" className="relative">
        <SectionRadialGlow className="absolute !opacity-80 left-1/2 top-[18%] z-0 w-[100vw] max-w-[80rem] -translate-x-1/2 blur-[5.5rem] md:top-[18%] md:w-[95vw]" />
      </Container>

      <div className=" us_map_bg w-full h-screen sticky top-0 overflow-hidden z-10">
        <Canvas
          camera={{ position: [0, 0, 500], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <MapPoints />
          </Suspense>
        </Canvas>
      </div>

      <div className="">
        <ContactForm />
      </div>
    </section>
  );
};

export default Hero;
