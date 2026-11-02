"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

export function useExternalLinkGuard(href: string) {
  const router = useRouter();
  const isConfigured = href.trim().length > 0 && href !== "#";

  const onClick = (e: MouseEvent) => {
    if (!isConfigured) {
      e.preventDefault();
      router.push("/404");
    }
  };

  return { isConfigured, onClick };
}
