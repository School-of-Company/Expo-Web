"use client";

import { useLiveStatusItems } from "@/entities/area-status/model/useAreaStatuses";
import { CONGESTION_STYLE, type CongestionLevel } from "@/entities/congestion/model/data";
import Icon from "@/shared/ui/Icon";

interface LiveStatusBarProps {
  href: string;
  external: boolean;
}

/** "행사장 현황" → "행사장"처럼 한 줄에 모아 보일 때는 뒤의 "현황"을 뗀다. */
export const shortLabel = (label: string) => label.replace(/\s*현황$/, "");

const linkProps = (href: string, external: boolean) => ({
  href,
  target: external ? "_blank" : undefined,
  rel: external ? "noopener noreferrer" : undefined,
});

/** 6안 상태 글자 밑줄 색. Tailwind가 찾을 수 있도록 클래스 이름을 통째로 적어 둔다. */
const UNDERLINE_TINT: Record<CongestionLevel, string> = {
  "없음": "decoration-gray-30",
  "여유": "decoration-success/40",
  "보통": "decoration-warning/40",
  "혼잡": "decoration-warning/40",
  "매우 혼잡": "decoration-danger/40",
};

/** 6안 맨 앞의 "● 지금" 표시. 빨간 점이 퍼져 나가며 실시간 정보임을 알린다. */
export function LiveNowLabel() {
  return (
    <span className="flex shrink-0 items-center gap-1.5 text-fg-1">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-danger motion-reduce:hidden" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-danger" />
      </span>
      지금
    </span>
  );
}

/** 6안 상태 글자. 혼잡도 색 글자에 같은 색의 옅고 두꺼운 밑줄을 그어 형광펜처럼 보이게 한다. */
export function LiveLevelText({ level, text }: { level: CongestionLevel; text: string }) {
  return (
    <span
      className={`ml-1 font-bold underline decoration-[3px] underline-offset-[3px] ${CONGESTION_STYLE[level].text} ${UNDERLINE_TINT[level]}`}
    >
      {text}
    </span>
  );
}

/**
 * 6안: 아이콘·틀 없이 "지금 행사장 혼잡 · 도로 보통 · 주차 혼잡" 한 문장으로 읽히게 하고,
 * 상태 글자에만 혼잡도 색과 굵은 밑줄을 줘서 형광펜으로 표시한 것처럼 보이게 한다.
 */
export function LiveStatusBarV6({ href, external }: LiveStatusBarProps) {
  const items = useLiveStatusItems();
  return (
    <a
      {...linkProps(href, external)}
      className="group/live flex items-center gap-2.5 text-body-xs font-semibold whitespace-nowrap text-fg-2"
    >
      <LiveNowLabel />
      <ul className="flex items-center">
        {items.map((item) => (
          <li key={item.label} className="flex items-center before:mx-2 before:text-fg-4 before:content-['·'] first:before:hidden">
            {shortLabel(item.label)}
            <LiveLevelText level={item.level} text={item.text} />
          </li>
        ))}
      </ul>
      <span className="flex items-center text-fg-3 transition-colors duration-150 ease-out group-hover/live:text-primary-50">
        자세히 보기
        <Icon
          name="chevron-right"
          className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover/live:translate-x-0.5"
        />
      </span>
    </a>
  );
}
