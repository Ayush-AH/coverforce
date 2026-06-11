import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SplitText } from "@/lib/SplitText";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CHAR_DELAY = 0.038;

export type SplitTextRevealOptions = {
    trigger?: HTMLElement;
    start?: string;
    charDelay?: number;
    splitSelf?: boolean;
    charsClass?: string;
    wordsClass?: string;
};

export function animateSplitTextReveal(
    root: HTMLElement,
    options: SplitTextRevealOptions = {},
): () => void {
    const {
        trigger = root,
        start = "top 88%",
        charDelay = DEFAULT_CHAR_DELAY,
        splitSelf = false,
        charsClass = "split-reveal-char",
        wordsClass = "split-reveal-word",
    } = options;

    const targets = splitSelf
        ? [root]
        : Array.from(root.querySelectorAll<HTMLElement>("[data-split]"));

    if (!targets.length) return () => {};

    const splits: SplitText[] = [];
    const chars: HTMLSpanElement[] = [];

    targets.forEach((el) => {
        const split = new SplitText(el, { type: "chars", charsClass, wordsClass });
        splits.push(split);
        chars.push(...split.chars);
    });

    if (!chars.length) return () => {};

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(chars, { opacity: 1 });
        return () => splits.forEach((split) => split.revert());
    }

    gsap.set(chars, { opacity: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger,
            start,
            toggleActions: "play none none none",
            once: true,
        },
    });

    chars.forEach((char, index) => {
        tl.to(char, { opacity: 1, duration: 0.01, ease: "none" }, index * charDelay);
    });

    const lenis = window.lenis;
    const onLenisScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onLenisScroll);

    return () => {
        lenis?.off("scroll", onLenisScroll);
        tl.scrollTrigger?.kill();
        tl.kill();
        splits.forEach((split) => split.revert());
    };
}
