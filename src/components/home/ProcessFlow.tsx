import React from "react";
import Container from "../common/Container";
import { processSteps } from "@/data/processSteps";
import Image from "next/image";
import { RiMailLine, RiSparkling2Fill } from "@remixicon/react";

function Step1Wireframe() {
    return (
        <div className="relative w-full h-full aspect-square flex justify-center items-center">
            <Image src="/images/process/step1wire.svg" alt="Graph preview" width={120} height={120} className="h-full w-full object-cover" />
            <Step1Final />
        </div>
    );
}

function Step1Final() {
    return (
        <div className="bg-white absolute top-0 left-0 w-full h-full aspect-square">
            <Image src="/images/process/step1final.svg" alt="Graph preview" width={120} height={120} className="h-full w-full object-cover" />
        </div>
    );
}

// A single wrapper that will host step wireframe/final UIs.
function ProcessWrapper() {
    return (
        <div className="relative aspect-square w-full flex justify-center items-center overflow-hidden">
            <Step1Wireframe />
        </div>
    );
}

const ProcessFlow = () => {
    return (
        <section className="bg-white">
            <Container borderColor="#5353531A">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                    <div className="flex flex-col">
                        {
                            processSteps.map((intake, index) => (
                                <div className={`step${index + 1} h-screen flex flex-col justify-center`} key={index}>
                                    <p className="text-sm font-mono font-medium uppercase tracking-[0.14em] text-[#0130BE]">
                                        {intake.tag}
                                    </p>
                                    <h3 className="mt-4  text-2xl font-heading font-regular tracking-tight text-[#0a143b] md:text-3xl lg:text-3xl">
                                        {intake.heading.pre}{" "}
                                        <span className="bg-linear-to-r from-[#4F63E8] to-[#0130BE] bg-clip-text text-transparent">
                                            {intake.heading.highlightLines[0]} <br />
                                            {intake.heading.highlightLines[1]}
                                        </span>{" "}
                                        {intake.heading.postLines[0]} <br />{" "}
                                        {intake.heading.postLines[1]}
                                    </h3>
                                    <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#4A5778] font-sans font-regular md:text-sm">
                                        {intake.desc}
                                    </p>

                                    <ul className="mt-10 space-y-3">
                                        {intake.points.map((feature, index) => {
                                            const icon =
                                                feature.icon === "sparkle" ? (
                                                    <RiSparkling2Fill className="size-3" />
                                                ) : (
                                                    <RiMailLine className="size-3" />
                                                );

                                            return (
                                                <li key={feature.id} className={`flex gap-4 py-4 ${index == intake.points.length - 1 ? '' : 'border-b border-black/10'}`}>
                                                    <span
                                                        className={`flex size-6 shrink-0 items-center justify-center rounded-full border border-[#424242] ${feature.highlighted ? "bg-[#0130BE] text-white" : ""
                                                            }`}
                                                    >
                                                        {icon}
                                                    </span>
                                                    <p
                                                        className={`max-w-sm text-sm leading-relaxed font-heading font-regular md:text-sm ${feature.highlighted ? "text-[#0130BE]" : "text-[#424242]"
                                                            }`}
                                                    >
                                                        {feature.text}{" "}
                                                        {feature.highlighted && (
                                                            <span className="inline-flex rounded-full bg-[#0130BE] px-4 py-0.2 text-[10px] uppercase tracking-wide text-white">
                                                                AI
                                                            </span>
                                                        )}
                                                    </p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))
                        }
                    </div>

                    <div className="sticky top-0 flex h-screen w-full items-center justify-center lg:justify-end">
                        <div className="flex w-full max-w-md justify-center lg:justify-end">
                            <ProcessWrapper />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
export default ProcessFlow
