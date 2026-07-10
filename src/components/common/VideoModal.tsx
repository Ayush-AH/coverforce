"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RiCloseLine } from "@remixicon/react";
import { useVideoModal } from "@/contexts/VideoModalContext";
import { lockPageScroll } from "@/lib/scrollLock";
import { WAY_MODAL_CLOSE_TOTAL_MS, prefersReducedMotion } from "@/lib/wayModalMotion";

export default function VideoModal() {
  const { isOpen, src, title, close } = useVideoModal();
  const [isClosing, setIsClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const visible = isOpen || isClosing;

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const finishClose = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsClosing(false);
    close();
  }, [close]);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
  }, [isClosing]);

  useEffect(() => {
    if (!isClosing) return;

    const duration = prefersReducedMotion() ? 0 : WAY_MODAL_CLOSE_TOTAL_MS;

    const onEnd = (event: AnimationEvent) => {
      if (event.target !== overlayRef.current) return;
      finishClose();
    };

    const overlay = overlayRef.current;
    if (duration === 0) {
      finishClose();
      return;
    }

    const fallback = window.setTimeout(finishClose, duration + 80);
    overlay?.addEventListener("animationend", onEnd);

    return () => {
      window.clearTimeout(fallback);
      overlay?.removeEventListener("animationend", onEnd);
    };
  }, [isClosing, finishClose]);

  useEffect(() => {
    if (!visible) return;

    const unlockScroll = lockPageScroll();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible, handleClose]);

  useEffect(() => {
    if (!isOpen || isClosing) return;

    const frame = window.requestAnimationFrame(() => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = 0;
      video.play().catch(() => {});
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, isClosing, src]);

  if (!visible || typeof document === "undefined") return null;

  const overlayAnim = isClosing ? "way-modal-overlay-exit" : "way-modal-overlay-enter";
  const panelAnim = isClosing ? "way-modal-panel-exit" : "way-modal-panel-enter";

  return createPortal(
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[200] overflow-hidden overscroll-contain"
      role="presentation"
    >
      <div
        ref={overlayRef}
        className={`${overlayAnim} fixed inset-0 bg-[#0a143b]/55 backdrop-blur-[2px]`}
        aria-hidden
        onClick={handleClose}
      />

      <div
        className="relative z-10 flex min-h-full items-center justify-center p-4 sm:p-6"
        onClick={handleClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className={`${panelAnim} way-modal-panel relative w-full max-w-4xl overflow-hidden bg-white shadow-[0_24px_80px_rgba(10,20,59,0.18)]`}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-sm border border-[#535353]/15 bg-white text-[#0a143b] transition-colors hover:bg-[#F5F7FA] sm:right-5 sm:top-5"
            aria-label="Close video"
          >
            <RiCloseLine size={20} />
          </button>

          <div className="px-4 pb-5 pt-14 sm:px-6 sm:pb-6 sm:pt-16">
            <h2
              id="video-modal-title"
              className="max-w-2xl font-heading text-lg font-medium leading-snug text-[#2B409E] sm:text-xl"
            >
              {title}
            </h2>

            <div className="mt-4 overflow-hidden rounded-lg border border-[#E8ECF0] bg-black sm:mt-5">
              <video
                ref={videoRef}
                key={src}
                src={src}
                className="aspect-video w-full bg-black object-contain"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
