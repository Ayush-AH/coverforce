"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { RiArrowRightSLine, RiCheckLine, RiCloseLine } from "@remixicon/react";

import type { WayCardModalContent } from "@/data/wayCardModals";
import {
  WAY_MODAL_PANEL_CLOSE_MS,
  type WayModalRect,
  prefersReducedMotion,
} from "@/lib/wayModalMotion";
import WayCardModalClone from "./WayCardModalClone";

type WayCardModalProps = {
  open: boolean;
  content: WayCardModalContent | null;
  preview: ReactNode;
  originRect: WayModalRect | null;
  onClose: () => void;
};

type StoredModal = {
  content: WayCardModalContent;
  preview: ReactNode;
  originRect: WayModalRect | null;
};

export default function WayCardModal({
  open,
  content,
  preview,
  originRect,
  onClose,
}: WayCardModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [stored, setStored] = useState<StoredModal | null>(null);
  const [clonePhase, setClonePhase] = useState<"idle" | "enter" | "exit">("idle");
  const [previewSettled, setPreviewSettled] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef(content);
  const previewNodeRef = useRef(preview);
  const originRef = useRef(originRect);

  contentRef.current = content;
  previewNodeRef.current = preview;
  originRef.current = originRect;

  useEffect(() => {
    if (!open || !contentRef.current) return;

    setStored({
      content: contentRef.current,
      preview: previewNodeRef.current,
      originRect: originRef.current,
    });
    setIsClosing(false);
    setPreviewSettled(prefersReducedMotion() || !originRef.current);
    setClonePhase(originRef.current && !prefersReducedMotion() ? "enter" : "idle");
  }, [open]);

  const visible = (open || isClosing) && stored !== null;

  const finishClose = useCallback(() => {
    setIsClosing(false);
    setStored(null);
    setClonePhase("idle");
    setPreviewSettled(false);
    onClose();
  }, [onClose]);

  const handleClose = useCallback(() => {
    if (isClosing || !stored) return;

    const canClone =
      stored.originRect && previewRef.current && !prefersReducedMotion();

    if (canClone) {
      setPreviewSettled(false);
      setClonePhase("exit");
      setIsClosing(true);
      return;
    }

    setIsClosing(true);
  }, [isClosing, stored]);

  useEffect(() => {
    if (!isClosing || clonePhase === "exit") return;

    const duration = prefersReducedMotion() ? 0 : WAY_MODAL_PANEL_CLOSE_MS;

    const onEnd = (e: AnimationEvent) => {
      if (e.target !== panelRef.current) return;
      finishClose();
    };

    const panel = panelRef.current;
    if (duration === 0) {
      finishClose();
      return;
    }

    const fallback = window.setTimeout(finishClose, duration + 80);
    panel?.addEventListener("animationend", onEnd);

    return () => {
      window.clearTimeout(fallback);
      panel?.removeEventListener("animationend", onEnd);
    };
  }, [isClosing, clonePhase, finishClose]);

  useEffect(() => {
    if (!visible) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible, handleClose]);

  if (!visible || !stored || typeof document === "undefined") return null;

  const overlayAnim = isClosing ? "way-modal-overlay-exit" : "way-modal-overlay-enter";
  const panelAnim = isClosing ? "way-modal-panel-exit" : "way-modal-panel-enter";
  const contentAnim = previewSettled && !isClosing ? "way-modal-content-visible" : "way-modal-content-hidden";
  const showInlinePreview = previewSettled && clonePhase !== "exit";

  return createPortal(
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain"
      role="presentation"
    >
      <div
        className={`${overlayAnim} fixed inset-0 bg-[rgb(229_237_245/0.9)] backdrop-blur-[6px]`}
        aria-hidden
        onClick={handleClose}
      />

      <div
        className="relative z-10 flex min-h-full items-center justify-center p-4 py-10 sm:p-6 sm:py-14 md:p-10 md:py-16"
        onClick={handleClose}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="way-card-modal-title"
          className={`${panelAnim} way-modal-panel relative w-full max-w-[1080px] rounded-2xl bg-white shadow-[0_24px_80px_rgba(10,20,59,0.18)]`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-6 top-6 z-20 flex size-11 items-center justify-center rounded-md bg-[#E8E0F5] text-[#0a143b] transition-colors hover:bg-[#dcd0f5]"
            aria-label="Close"
          >
            <RiCloseLine size={22} />
          </button>

          <div
            className={`${contentAnim} grid gap-10 px-8 pb-10 pt-16 sm:px-12 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-12`}
          >
            <div className="space-y-8">
              <div className="space-y-5 pr-10">
                <h2
                  id="way-card-modal-title"
                  className="font-heading text-3xl font-medium leading-tight tracking-tight text-[#0a143b] sm:text-[2rem]"
                >
                  {stored.content.title}
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-[#4A5778]">
                  {stored.content.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={stored.content.primaryCta.href}
                  className="inline-flex items-center gap-1 rounded-full bg-[#4F63E8] px-6 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-[#3d50d4]"
                >
                  {stored.content.primaryCta.label}
                  <RiArrowRightSLine size={20} />
                </Link>
                <Link
                  href={stored.content.secondaryCta.href}
                  className="inline-flex items-center rounded-full border border-[#4F63E8]/35 bg-white px-6 py-3 font-sans text-sm font-medium text-[#4F63E8] transition-colors hover:border-[#4F63E8] hover:bg-[#4F63E8]/5"
                >
                  {stored.content.secondaryCta.label}
                </Link>
              </div>
            </div>

            <ul className="space-y-5 lg:pt-2">
              {stored.content.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-[#D946A8]">
                    <RiCheckLine size={14} />
                  </span>
                  <span className="text-base leading-relaxed text-[#334155]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-b-2xl bg-linear-to-br from-[#D8EFFF] via-[#F3E8FF] to-[#FCE7F3] px-8 py-14 sm:min-h-[420px] sm:px-12 sm:py-16">
            <div
              ref={previewRef}
              className={`way-modal-preview-slot pointer-events-none relative mx-auto flex h-[340px] w-full max-w-[820px] items-center justify-center transition-opacity duration-300 sm:h-[380px] ${
                showInlinePreview ? "opacity-100" : "opacity-0"
              } [&>*]:!relative [&>*]:!top-auto [&>*]:!right-auto [&>*]:!bottom-auto [&>*]:!left-auto [&>*]:mx-auto [&>*]:scale-[1.15] sm:[&>*]:scale-[1.25]`}
            >
              {stored.preview}
            </div>
          </div>
        </div>
      </div>

      {stored.originRect && clonePhase !== "idle" ? (
        <WayCardModalClone
          origin={stored.originRect}
          targetRef={previewRef}
          phase={clonePhase}
          onEnterComplete={() => {
            setPreviewSettled(true);
            setClonePhase("idle");
          }}
          onExitComplete={() => {
            const panel = panelRef.current;
            if (!panel || prefersReducedMotion()) {
              finishClose();
              return;
            }

            let done = false;
            const complete = () => {
              if (done) return;
              done = true;
              finishClose();
            };

            panel.addEventListener("animationend", complete, { once: true });
            window.setTimeout(complete, WAY_MODAL_PANEL_CLOSE_MS + 60);
          }}
        >
          {stored.preview}
        </WayCardModalClone>
      ) : null}
    </div>,
    document.body,
  );
}
