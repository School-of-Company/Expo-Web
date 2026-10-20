import {
  liveStatusItems,
  congestionUpdatedAt,
  CONGESTION_STYLE,
  type CongestionLevel,
} from "@/entities/congestion/model/data";
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

/**
 * 1안: 세 항목과 자세히 보기를 회색 알약 하나에 담고, 통째로 현황 페이지로 연결한다.
 * 상태는 색 점 + 같은 색 글자로 가볍게 표시한다.
 */
export function LiveStatusBarV1({ href, external }: LiveStatusBarProps) {
  return (
    <a
      {...linkProps(href, external)}
      className="group/live flex h-9 items-center rounded-pill border border-border-default bg-bg-subtle pl-3.5 pr-1 text-body-xs font-semibold whitespace-nowrap transition-colors duration-150 ease-out hover:border-primary-20 hover:bg-primary-5"
    >
      <span className="flex items-center gap-1.5 text-fg-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-danger opacity-60 motion-reduce:hidden" />
          <span className="relative h-2 w-2 rounded-full bg-danger" />
        </span>
        실시간
      </span>
      <ul className="ml-3 flex items-center">
        {liveStatusItems.map((item) => (
          <li key={item.label} className="flex h-4 items-center gap-1.5 border-l border-border-default px-3 text-fg-2">
            <Icon name={item.icon} className="h-4 w-4 shrink-0 text-fg-3" />
            {shortLabel(item.label)}
            <span className={`flex items-center gap-1 font-bold ${CONGESTION_STYLE[item.level].text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${CONGESTION_STYLE[item.level].dot}`} />
              {item.level}
            </span>
          </li>
        ))}
      </ul>
      <span className="flex h-7 items-center gap-0.5 rounded-pill bg-bg-canvas pl-3 pr-2 text-fg-2 transition-colors duration-150 ease-out group-hover/live:text-primary-50">
        자세히 보기
        <Icon
          name="chevron-right"
          className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover/live:translate-x-0.5"
        />
      </span>
    </a>
  );
}

/** 2안 칩 바탕·테두리. Tailwind가 찾을 수 있도록 클래스 이름을 통째로 적어 둔다. */
const CHIP_TINT: Record<CongestionLevel, string> = {
  "없음": "bg-gray-10 ring-gray-20",
  "여유": "bg-success/10 ring-success/25",
  "보통": "bg-warning/10 ring-warning/25",
  "혼잡": "bg-danger/10 ring-danger/25",
  "매우 혼잡": "bg-accent-70/10 ring-accent-70/25",
};

/**
 * 2안: LIVE 배지와 갱신 시각을 앞에 두고, 항목마다 혼잡도 색으로 옅게 물든 칩을 나란히 놓는다.
 * 바깥 틀 없이 칩 색만으로 상태가 한눈에 읽히게 한다.
 */
export function LiveStatusBarV2({ href, external }: LiveStatusBarProps) {
  return (
    <a
      {...linkProps(href, external)}
      className="group/live flex items-center gap-3 text-body-xs font-semibold whitespace-nowrap"
    >
      <span className="flex flex-col items-start leading-none">
        <span className="flex items-center gap-1 rounded-xsmall bg-danger px-1.5 py-[3px] text-[10px] font-extrabold tracking-wider text-fg-on-primary">
          <span className="h-1 w-1 animate-pulse rounded-full bg-fg-on-primary motion-reduce:animate-none" />
          LIVE
        </span>
        <span className="mt-1 text-[11px] font-medium text-fg-4 tabular-nums">{congestionUpdatedAt}</span>
      </span>
      <ul className="flex items-center gap-1.5">
        {liveStatusItems.map((item) => (
          <li
            key={item.label}
            className={`flex h-7 items-center gap-1 rounded-pill pl-2 pr-2.5 ring-1 ring-inset ${CHIP_TINT[item.level]}`}
          >
            <Icon name={item.icon} className={`h-4 w-4 shrink-0 ${CONGESTION_STYLE[item.level].text}`} />
            <span className="text-fg-2">{shortLabel(item.label)}</span>
            <span className={`font-bold ${CONGESTION_STYLE[item.level].text}`}>{item.level}</span>
          </li>
        ))}
      </ul>
      <span className="flex items-center gap-0.5 text-fg-3 transition-colors duration-150 ease-out group-hover/live:text-primary-50">
        자세히
        <Icon
          name="chevron-right"
          className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover/live:translate-x-0.5"
        />
      </span>
    </a>
  );
}

/** 3안 게이지에서 채울 막대 수. 혼잡할수록 막대가 많이 찬다. */
const GAUGE_FILL: Record<CongestionLevel, number> = { "없음": 0, "여유": 1, "보통": 2, "혼잡": 3, "매우 혼잡": 4 };
const GAUGE_HEIGHTS = ["h-1.5", "h-2", "h-2.5", "h-3"];

/**
 * 3안: 연한 브랜드색 알약에 담고, 혼잡도는 신호 세기처럼 높아지는 4칸 막대 게이지로 보여 준다.
 */
export function LiveStatusBarV3({ href, external }: LiveStatusBarProps) {
  return (
    <a
      {...linkProps(href, external)}
      className="group/live flex h-9 items-center rounded-pill border border-primary-10 bg-primary-5 pl-1 pr-3 text-body-xs font-semibold whitespace-nowrap text-fg-1 transition-colors duration-150 ease-out hover:border-primary-20 hover:bg-primary-10"
    >
      <span className="flex h-7 items-center gap-1.5 rounded-pill bg-bg-canvas px-2.5 text-primary-50 shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-danger motion-reduce:hidden" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-danger" />
        </span>
        실시간
      </span>
      <ul className="flex items-center">
        {liveStatusItems.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5 px-3">
            <Icon name={item.icon} className="h-4 w-4 shrink-0 text-fg-3" />
            <span className="text-fg-2">{shortLabel(item.label)}</span>
            <span aria-hidden className="flex h-3 items-end gap-[2px]">
              {GAUGE_HEIGHTS.map((height, i) => (
                <span
                  key={height}
                  className={`w-[3px] rounded-full ${height} ${
                    i < GAUGE_FILL[item.level] ? CONGESTION_STYLE[item.level].bar : "bg-gray-20"
                  }`}
                />
              ))}
            </span>
            <span className="font-bold">{item.level}</span>
          </li>
        ))}
      </ul>
      <span className="sr-only">자세히 보기</span>
      <Icon
        name="chevron-right"
        className="h-4 w-4 text-fg-3 transition-[color,translate] duration-150 ease-out group-hover/live:text-primary-50 group-hover/live:translate-x-0.5"
      />
    </a>
  );
}

/** 4안 아이콘 원 바탕·아이콘 색. Tailwind가 찾을 수 있도록 클래스 이름을 통째로 적어 둔다. */
const ICON_TINT: Record<CongestionLevel, string> = {
  "없음": "bg-gray-10 text-fg-3",
  "여유": "bg-success/10 text-success",
  "보통": "bg-warning/10 text-warning",
  "혼잡": "bg-danger/10 text-danger",
  "매우 혼잡": "bg-accent-70/10 text-accent-70",
};

/**
 * 4안: 항목마다 혼잡도 색으로 물든 아이콘 원 옆에 이름(위)과 상태(아래)를 두 줄로 쌓는다.
 * 가로로 늘어놓지 않아 네 안 중 가장 짧고, 대시보드 지표처럼 읽힌다.
 */
export function LiveStatusBarV4({ href, external }: LiveStatusBarProps) {
  return (
    <a {...linkProps(href, external)} className="group/live flex items-center whitespace-nowrap">
      <ul className="flex items-center">
        {liveStatusItems.map((item) => (
          <li key={item.label} className="flex items-center gap-2 border-l border-border-default px-3.5 first:border-l-0 first:pl-0">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${ICON_TINT[item.level]}`}>
              <Icon name={item.icon} className="h-4 w-4" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium text-fg-3">{shortLabel(item.label)}</span>
              <span className={`text-[13px] font-bold ${CONGESTION_STYLE[item.level].text}`}>{item.level}</span>
            </span>
          </li>
        ))}
      </ul>
      <span className="ml-1 flex flex-col items-center border-l border-border-default pl-3.5 leading-tight text-fg-3 transition-colors duration-150 ease-out group-hover/live:text-primary-50">
        <span className="flex items-center gap-1 text-[11px] font-medium">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-danger motion-reduce:hidden" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-danger" />
          </span>
          {congestionUpdatedAt}
        </span>
        <span className="flex items-center text-[13px] font-semibold">
          자세히 보기
          <Icon
            name="chevron-right"
            className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover/live:translate-x-0.5"
          />
        </span>
      </span>
    </a>
  );
}

/**
 * 5안: 흰 카드를 세 칸으로 나누고 칸마다 아래에 혼잡도 색 줄을 그어 신호등처럼 읽히게 한다.
 * 끝에는 브랜드색 정사각 화살표 버튼을 붙여 눌러서 더 볼 수 있다는 것을 분명히 한다.
 */
export function LiveStatusBarV5({ href, external }: LiveStatusBarProps) {
  return (
    <a
      {...linkProps(href, external)}
      className="group/live flex h-9 items-stretch overflow-hidden rounded-medium border border-border-default bg-bg-canvas text-body-xs font-semibold whitespace-nowrap transition-colors duration-150 ease-out hover:border-primary-30"
    >
      <ul className="flex">
        {liveStatusItems.map((item) => (
          <li
            key={item.label}
            className="relative flex items-center gap-1.5 border-l border-border-default px-3 first:border-l-0"
          >
            <Icon name={item.icon} className="h-4 w-4 shrink-0 text-fg-3" />
            <span className="text-fg-2">{shortLabel(item.label)}</span>
            <span className={`font-bold ${CONGESTION_STYLE[item.level].text}`}>{item.level}</span>
            <span aria-hidden className={`absolute inset-x-0 bottom-0 h-[3px] ${CONGESTION_STYLE[item.level].bar}`} />
          </li>
        ))}
      </ul>
      <span className="flex w-9 items-center justify-center bg-primary-50 text-fg-on-primary transition-colors duration-150 ease-out group-hover/live:bg-primary-60">
        <span className="sr-only">자세히 보기</span>
        <Icon
          name="chevron-right"
          className="h-4 w-4 transition-transform duration-150 ease-out group-hover/live:translate-x-0.5"
        />
      </span>
    </a>
  );
}

/** 6안 상태 글자 밑줄 색. Tailwind가 찾을 수 있도록 클래스 이름을 통째로 적어 둔다. */
const UNDERLINE_TINT: Record<CongestionLevel, string> = {
  "없음": "decoration-gray-30",
  "여유": "decoration-success/40",
  "보통": "decoration-warning/40",
  "혼잡": "decoration-danger/40",
  "매우 혼잡": "decoration-accent-70/40",
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
export function LiveLevelText({ level }: { level: CongestionLevel }) {
  return (
    <span
      className={`ml-1 font-bold underline decoration-[3px] underline-offset-[3px] ${CONGESTION_STYLE[level].text} ${UNDERLINE_TINT[level]}`}
    >
      {level}
    </span>
  );
}

/**
 * 6안: 아이콘·틀 없이 "지금 행사장 혼잡 · 도로 보통 · 주차 혼잡" 한 문장으로 읽히게 하고,
 * 상태 글자에만 혼잡도 색과 굵은 밑줄을 줘서 형광펜으로 표시한 것처럼 보이게 한다.
 */
export function LiveStatusBarV6({ href, external }: LiveStatusBarProps) {
  return (
    <a
      {...linkProps(href, external)}
      className="group/live flex items-center gap-2.5 text-body-xs font-semibold whitespace-nowrap text-fg-2"
    >
      <LiveNowLabel />
      <ul className="flex items-center">
        {liveStatusItems.map((item) => (
          <li key={item.label} className="flex items-center before:mx-2 before:text-fg-4 before:content-['·'] first:before:hidden">
            {shortLabel(item.label)}
            <LiveLevelText level={item.level} />
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
