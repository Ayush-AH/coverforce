"use client";

import type { MouseEvent, MouseEventHandler } from "react";
import Button, { type ButtonAsButtonProps } from "@/components/common/Button";
import { useVideoModal } from "@/contexts/VideoModalContext";

type WatchDemoButtonProps = Omit<ButtonAsButtonProps, "onClick"> & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  videoSrc?: string;
  videoTitle?: string;
};

const WatchDemoButton = ({
  onClick,
  videoSrc,
  videoTitle,
  ...props
}: WatchDemoButtonProps) => {
  const { open } = useVideoModal();

  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event as MouseEvent<HTMLButtonElement>);
        if (!event.defaultPrevented) {
          open({
            src: videoSrc,
            title: videoTitle,
          });
        }
      }}
    />
  );
};

export default WatchDemoButton;
