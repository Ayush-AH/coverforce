"use client";

import type { ComponentProps } from "react";
import Button from "@/components/common/Button";
import RequestDemoButton from "@/components/request-demo/RequestDemoButton";
import { isRequestDemoLabel } from "@/lib/requestDemo";

type RequestDemoCtaProps = Omit<ComponentProps<typeof Button>, "href"> & {
  label: string;
  href: string;
};

export default function RequestDemoCta({ label, href, ...props }: RequestDemoCtaProps) {
  if (isRequestDemoLabel(label)) {
    return <RequestDemoButton {...props}>{label}</RequestDemoButton>;
  }

  return (
    <Button href={href} {...props}>
      {label}
    </Button>
  );
}
