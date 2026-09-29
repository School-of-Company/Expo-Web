"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

/** 외부(env로 설정되는) 링크가 아직 비어있으면 이동 대신 404 페이지로 보낸다. */
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
