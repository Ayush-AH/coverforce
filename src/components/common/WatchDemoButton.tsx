"use client";

import type { ComponentProps, MouseEventHandler } from "react";
import Button from "@/components/common/Button";
import { useVideoModal } from "@/contexts/VideoModalContext";

type WatchDemoButtonProps = Omit<ComponentProps<typeof Button>, "href" | "onClick"> & {
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
        onClick?.(event);
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
