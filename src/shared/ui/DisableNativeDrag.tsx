"use client";

import { useEffect } from "react";

/** 이미지·링크의 브라우저 기본 드래그를 막는다. CSS user-drag를 지원하지 않는 Firefox용 보완. */
export default function DisableNativeDrag() {
  useEffect(() => {
    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof Element && e.target.closest("img, svg, a")) e.preventDefault();
    };
    document.addEventListener("dragstart", onDragStart);
    return () => document.removeEventListener("dragstart", onDragStart);
  }, []);

  return null;
}
