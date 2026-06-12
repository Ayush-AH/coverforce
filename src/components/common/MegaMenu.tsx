"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiAddLine, RiArrowRightLine, RiChat3Line } from "@remixicon/react";
import Container from "./Container";
import type { MegaMenuConfig } from "@/data/megaMenu";

export const MEGA_MENU_CLIP_CLOSED = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
export const MEGA_MENU_CLIP_OPEN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
export const CLIP_DURATION_MS = 550;
const CLIP_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const CONTENT_BASE_DELAY = 120;
const CONTENT_STAG = 70;

type MegaMenuProps = {
  open: boolean;
  enterKey: number;
  config: MegaMenuConfig;
  onMouseEnter: () => void;
  onClipClosed?: () => void;
};

function Reveal({
  enter,
  enterKey,
  delay,
  className = "",
  children,
}: {
  enter: boolean;
  enterKey: number;
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  const settledRef = useRef(false);

  useEffect(() => {
    settledRef.current = false;
  }, [enterKey]);

  useEffect(() => {
    if (!enter) return;
    const timer = window.setTimeout(() => {
      settledRef.current = true;
    }, 480 + delay);
    return () => window.clearTimeout(timer);
  }, [enter, delay, enterKey]);

  const visible = enter || settledRef.current;

  return (
    <div
      className={`${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"} ${className}`}
      style={{
        transition: enter
          ? `opacity 480ms ${CLIP_EASE} ${delay}ms, transform 480ms ${CLIP_EASE} ${delay}ms`
          : "none",
      }}
    >
      {children}
    </div>
  );
}

function PromoGraphic({
  enter,
  enterKey,
  delay,
}: {
  enter: boolean;
  enterKey: number;
  delay: number;
}) {
  return (
    <Reveal enter={enter} enterKey={enterKey} delay={delay}>
      <div
        className="relative h-[4.5rem] w-[7.5rem] shrink-0 overflow-hidden rounded-xs bg-[#0032C9]"
        aria-hidden
      >
        <Image
          src="/images/mega-menu-promo.png"
          alt=""
          fill
          sizes="120px"
          className="object-cover object-center"
        />
      </div>
    </Reveal>
  );
}

function MegaMenuColumn({
  title,
  links,
  enter,
  enterKey,
  baseDelay,
}: {
  title: string;
  links: MegaMenuConfig["columns"][number]["links"];
  enter: boolean;
  enterKey: number;
  baseDelay: number;
}) {
  return (
    <div className="min-w-0 flex-1">
      <Reveal enter={enter} enterKey={enterKey} delay={baseDelay}>
        <p className="mb-4 flex items-center gap-1 font-heading text-[0.65rem] font-medium tracking-[0.14em] text-[#0032C9]">
          <RiAddLine className="size-3 shrink-0" aria-hidden />
          {title}
        </p>
      </Reveal>
      <ul>
        {links.map((link, index) => (
          <li key={link.label}>
            <Reveal enter={enter} enterKey={enterKey} delay={baseDelay + CONTENT_STAG * (index + 1)}>
              <Link
                href={link.href}
                className="group flex items-center justify-between py-3 font-heading text-sm font-regular text-[#0a143b] transition-colors hover:text-[#0032C9]"
              >
                <span>{link.label}</span>
                <RiArrowRightLine
                  className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden
                />
              </Link>
            </Reveal>
            {index < links.length - 1 ? (
              <span className="block h-px bg-[#E8ECF0]" aria-hidden />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MegaMenu({
  open,
  enterKey,
  config,
  onMouseEnter,
  onClipClosed,
}: MegaMenuProps) {
  const [clipShown, setClipShown] = useState(false);
  const [contentEnter, setContentEnter] = useState(false);

  useEffect(() => {
    if (open) {
      setClipShown(false);
      setContentEnter(false);

      const clipFrame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setClipShown(true));
      });
      const contentTimer = window.setTimeout(() => setContentEnter(true), 100);

      return () => {
        cancelAnimationFrame(clipFrame);
        window.clearTimeout(contentTimer);
      };
    }

    setContentEnter(false);
    setClipShown(false);
    const timer = window.setTimeout(() => onClipClosed?.(), CLIP_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [open, onClipClosed]);

  const columnBaseDelay = CONTENT_BASE_DELAY + CONTENT_STAG * 2;
  const promoDelay = columnBaseDelay + CONTENT_STAG * 8;

  return (
    <div
      className="absolute inset-x-0 top-full z-40 -mt-px border-t border-[#E8ECF0] bg-white shadow-[0_24px_48px_-12px_rgba(10,20,59,0.14)] will-change-[clip-path] motion-reduce:transition-none"
      style={{
        clipPath: clipShown ? MEGA_MENU_CLIP_OPEN : MEGA_MENU_CLIP_CLOSED,
        WebkitClipPath: clipShown ? MEGA_MENU_CLIP_OPEN : MEGA_MENU_CLIP_CLOSED,
        transition: `clip-path ${CLIP_DURATION_MS}ms ${CLIP_EASE}, -webkit-clip-path ${CLIP_DURATION_MS}ms ${CLIP_EASE}`,
        pointerEvents: open ? "auto" : "none",
      }}
      onMouseEnter={onMouseEnter}
    >
      <Container className="py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6 xl:gap-10">
          <Reveal enter={contentEnter} enterKey={enterKey} delay={CONTENT_BASE_DELAY} className="lg:col-span-3">
            <Link
              href={config.featured.href}
              className="group relative flex min-h-[11.5rem] flex-col justify-between overflow-hidden rounded-xs bg-[#0B1D4A] p-6"
            >
              <RiChat3Line className="size-5 text-white/90" aria-hidden />
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-heading text-sm font-medium leading-tight tracking-[0.02em] text-white">
                    {config.featured.title}
                  </p>
                  <p className="mt-1 font-heading text-xs tracking-[0.04em] text-white/65">
                    {config.featured.subtitle}
                  </p>
                </div>
                <RiArrowRightLine
                  className="size-5 shrink-0 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-8 sm:flex-row lg:col-span-5 lg:gap-10 xl:gap-14">
            {config.columns.map((column, index) => (
              <MegaMenuColumn
                key={column.title}
                title={column.title}
                links={column.links}
                enter={contentEnter}
                enterKey={enterKey}
                baseDelay={columnBaseDelay + CONTENT_STAG * 3 * index}
              />
            ))}
          </div>

          {config.promo ? (
            <div className="flex items-start gap-4 lg:col-span-4 lg:justify-end">
              <PromoGraphic enter={contentEnter} enterKey={enterKey} delay={promoDelay} />
              <Reveal
                enter={contentEnter}
                enterKey={enterKey}
                delay={promoDelay + CONTENT_STAG}
                className="min-w-0 pt-1"
              >
                <Link href={config.promo.href} className="group block">
                  <p className="flex items-center gap-2 font-heading text-sm font-medium leading-snug text-[#0a143b] transition-colors group-hover:text-[#0032C9] md:text-base">
                    {config.promo.title}
                    <RiArrowRightLine className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-sm border border-[#D1D5DB] px-2.5 py-1">
                    <span className="font-heading text-[0.6rem] font-medium tracking-[0.12em] text-[#6B7280]">
                      {config.promo.tag}
                    </span>
                    <span className="h-3 w-px bg-[#D1D5DB]" aria-hidden />
                    <span className="font-heading text-[0.6rem] font-medium tracking-[0.12em] text-[#6B7280]">
                      {config.promo.readTime}
                    </span>
                  </div>
                </Link>
              </Reveal>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
