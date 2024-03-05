import i18n from "@/i18n";
import { PropsWithLang } from "@/i18n/types";
import { cn } from "@/lib/utils";
import NextLink, { LinkProps } from "next/link";
import React, { PropsWithChildren } from "react";

export default function Link({
  lang,
  outerRef,
  ...rest
}: LinkProps &
  PropsWithLang &
  PropsWithChildren &
  PropsWithClassName & { outerRef?: any }) {
  const hrf =
    lang && lang !== i18n.defaultLocale ? `/${lang}${rest.href}` : rest.href;
  return (
    <NextLink
      ref={outerRef}
      {...rest}
      href={hrf}
      className={cn(rest.className)}
    />
  );
}
