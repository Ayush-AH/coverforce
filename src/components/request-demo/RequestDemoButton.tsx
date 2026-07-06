"use client";

import type { MouseEvent, MouseEventHandler } from "react";
import Button, { type ButtonAsButtonProps } from "@/components/common/Button";
import { useRequestDemo } from "@/contexts/RequestDemoContext";

type RequestDemoButtonProps = Omit<ButtonAsButtonProps, "onClick"> & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const RequestDemoButton = ({ onClick, ...props }: RequestDemoButtonProps) => {
  const { open } = useRequestDemo();

  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event as MouseEvent<HTMLButtonElement>);
        if (!event.defaultPrevented) {
          open();
        }
      }}
    />
  );
};

export default RequestDemoButton;
