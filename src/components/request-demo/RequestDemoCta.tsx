"use client";

import Button, { type ButtonStyleProps } from "@/components/common/Button";
import RequestDemoButton from "@/components/request-demo/RequestDemoButton";
import { isRequestDemoLabel } from "@/lib/requestDemo";

type RequestDemoCtaProps = {
  label: string;
  href: string;
} & ButtonStyleProps;

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
