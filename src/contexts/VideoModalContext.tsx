"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEMO_VIDEO_SRC, DEMO_VIDEO_TITLE } from "@/data/demoVideo";

type VideoModalOptions = {
  src?: string;
  title?: string;
};

type VideoModalContextValue = {
  isOpen: boolean;
  src: string;
  title: string;
  open: (options?: VideoModalOptions) => void;
  close: () => void;
};

const VideoModalContext = createContext<VideoModalContextValue | null>(null);

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState(DEMO_VIDEO_SRC);
  const [title, setTitle] = useState(DEMO_VIDEO_TITLE);

  const open = useCallback((options?: VideoModalOptions) => {
    setSrc(options?.src ?? DEMO_VIDEO_SRC);
    setTitle(options?.title ?? DEMO_VIDEO_TITLE);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      src,
      title,
      open,
      close,
    }),
    [isOpen, src, title, open, close],
  );

  return <VideoModalContext.Provider value={value}>{children}</VideoModalContext.Provider>;
}

export function useVideoModal() {
  const context = useContext(VideoModalContext);
  if (!context) {
    throw new Error("useVideoModal must be used within VideoModalProvider");
  }
  return context;
}
