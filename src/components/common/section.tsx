import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export default function Section({
  children,
  className,
}: PropsWithChildren & PropsWithClassName) {
  return <section className={cn("p-5", className)}>{children}</section>;
}
