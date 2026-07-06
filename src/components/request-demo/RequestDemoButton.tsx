"use client";

import type { ComponentProps, MouseEventHandler } from "react";
import Button from "@/components/common/Button";
import { useRequestDemo } from "@/contexts/RequestDemoContext";

type RequestDemoButtonProps = Omit<ComponentProps<typeof Button>, "href" | "onClick"> & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const RequestDemoButton = ({ onClick, ...props }: RequestDemoButtonProps) => {
  const { open } = useRequestDemo();

  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          open();
        }
      }}
    />
  );
};

export default RequestDemoButton;
