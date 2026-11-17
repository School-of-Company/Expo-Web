"use client";

import { CONGESTION_LABEL, CONGESTION_STYLE, useCongestionLevel } from "@/entities/congestion";
import { CONGESTION_URL } from "@/shared/config/site";
import Icon from "@/shared/ui/Icon";

/** "● 지금 박람회 혼잡도 여유 자세히 보기". 상태 글자에만 혼잡도 색과 형광펜 같은 밑줄을 준다. */
export default function CongestionStatus({ className = "" }: { className?: string }) {
  const level = useCongestionLevel();
  const style = CONGESTION_STYLE[level];
  return (
    <a
      href={CONGESTION_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/live flex items-center gap-2.5 whitespace-nowrap text-body-xs font-semibold text-fg-2 ${className}`}
    >
      <span className="flex shrink-0 items-center gap-1.5 text-fg-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-danger motion-reduce:hidden" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-danger" />
        </span>
        지금
      </span>
      <span aria-live="polite">
        박람회 혼잡도
        <span className={`ml-1 font-bold underline decoration-[3px] underline-offset-[3px] ${style.text} ${style.underline}`}>
          {CONGESTION_LABEL[level]}
        </span>
      </span>
      <span className="ml-auto flex items-center text-fg-3 transition-colors duration-150 ease-out group-hover/live:text-primary-50">
        자세히 보기
        <Icon
          name="chevron-right"
          className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover/live:translate-x-0.5"
        />
      </span>
    </a>
  );
}
