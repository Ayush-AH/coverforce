"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type RequestDemoContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const RequestDemoContext = createContext<RequestDemoContextValue | null>(null);

export function RequestDemoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [isOpen, open, close],
  );

  return (
    <RequestDemoContext.Provider value={value}>{children}</RequestDemoContext.Provider>
  );
}

export function useRequestDemo() {
  const context = useContext(RequestDemoContext);
  if (!context) {
    throw new Error("useRequestDemo must be used within RequestDemoProvider");
  }
  return context;
}
