import { Fragment } from "react";

import Badge from "@/shared/ui/Badge";
import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import organizerLogo from "../../../../public/logos/organizer-dark.svg";
import hostLogo from "../../../../public/logos/host-dark.svg";
import { guideNavItems } from "@/shared/config/guide-nav";
import { SectionPage } from "@/widgets/section-page";

import EventIntro from "./EventIntro";
import PosterPreview from "./PosterPreview";

/** value를 배열로 주면 각 조각은 줄바꿈 없이 붙여 두고, 좁은 화면에서는 조각 사이에서만 줄을 바꾼다. */
const OVERVIEW: { label: string; value: string | string[]; note?: string }[] = [
  { label: "행사명", value: "2026 전남광주통합특별시교육청 AI미래교육박람회" },
  { label: "주제", value: "AI로 연결되는 배움, 함께 여는 미래" },
  {
    label: "일정",
    value: ["2026. 10. 31.(토) 9:30 ~ 17:00 /", "11. 1.(일) 9:30 ~ 16:00"],
    note: "(행사장 개방 9:00 예정)",
  },
  { label: "장소", value: "전남광주통합특별시교육청AI교육원 일원" },
  { label: "대상", value: "관내 초‧중‧고‧특수학교 학생, 교직원, 학부모, 일반시민 등" },
];

/** 개요 표 마지막 줄에 로고로 보여주는 주최·주관. 밝은 배경용으로 글자는 어둡고 엠블럼은 컬러인 SVG를 쓴다. */
const ORGANIZERS = [
  { role: "주최", label: "전남광주통합특별시교육청", logo: organizerLogo, aspect: "aspect-[1923/180]" },
  { role: "주관", label: "전남광주통합특별시교육청AI교육원", logo: hostLogo, aspect: "aspect-[2200/180]" },
];

function OverviewRow({ label, value, note }: (typeof OVERVIEW)[number]) {
  return (
    <div className="contents">
      <dt>
        <Badge
          variant="solid-primary"
          className="w-full justify-center whitespace-nowrap px-3 py-1 text-body-xs sm:px-4 sm:py-1.5 sm:text-body-s"
        >
          {label}
        </Badge>
      </dt>
      <dd className="w-fit text-body-s font-medium leading-relaxed text-fg-1 lg:text-body-m">
        {Array.isArray(value)
          ? value.map((part, i) => (
              <Fragment key={part}>
                {i > 0 && " "}
                <span className="whitespace-nowrap">{part}</span>
              </Fragment>
            ))
          : value}
        {note && <span className="block text-right">{note}</span>}
      </dd>
    </div>
  );
}

export default function GuideOverviewPage() {
  return (
    <SectionPage
      navTitle="박람회 안내"
      navItems={guideNavItems}
      title="행사 개요"
      desc="행사 개요부터 오시는 길까지, 2026 전남광주통합특별시교육청 AI미래교육박람회의 모든 기본 정보를 확인하세요."
    >
      <h2 className="text-heading-s font-bold text-fg-1">행사 개요</h2>

      <div className="mt-4 flex flex-col gap-6 xl:flex-row">
        <PosterPreview />
        <EventIntro />
      </div>

      <dl className="mt-6 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-4 rounded-xlarge border border-border-default bg-bg-canvas p-4 sm:gap-x-5 sm:p-6">
        {OVERVIEW.map((row) => (
          <OverviewRow key={row.label} {...row} />
        ))}
        <div className="contents">
          <dt>
            <Badge
              variant="solid-primary"
              className="w-full justify-center whitespace-nowrap px-3 py-1 text-body-xs sm:px-4 sm:py-1.5 sm:text-body-s"
            >
              주최/주관
            </Badge>
          </dt>
          <dd className="flex flex-wrap items-center gap-x-10 gap-y-3">
            {ORGANIZERS.map(({ role, label, logo, aspect }) => (
              <span
                key={role}
                role="img"
                aria-label={`${role} ${label} 로고`}
                className={`block h-5 sm:h-6 ${aspect} max-w-full bg-contain bg-left bg-no-repeat`}
                style={{ backgroundImage: getBackgroundImage(logo, { unoptimized: true }) }}
              />
            ))}
          </dd>
        </div>
      </dl>
    </SectionPage>
  );
}
