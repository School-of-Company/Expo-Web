import Link from "next/link";
import PromoVideo from "@/widgets/promo-video/ui/PromoVideo";
import TimelineSection from "@/widgets/event-timeline/ui/TimelineSection";
import QuickApplyGroups from "@/widgets/quick-apply/ui/QuickApplyGroups";
import RecentNotices from "@/widgets/recent-notices/ui/RecentNotices";
import Button from "@/shared/ui/Button";
import Badge from "@/shared/ui/Badge";
import Icon from "@/shared/ui/Icon";
import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import heroBg from "../../../../public/hero-bg.png";
import logo from "../../../../public/logo.png";

const HERO_FACTS = [
  { label: "일정", value: "2026.10.31.(토)-11.1.(일)" },
  { label: "장소", value: "전남광주통합특별시교육청AI교육원" },
  { label: "대상", value: "학생 · 교원 · 일반 시민 누구나" },
];

export default function HomePage() {
  const heroBgImage = getBackgroundImage(heroBg, { shouldPreload: true });

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border-default bg-[#f9e7e4]">
        {/*
          사진을 히어로 높이에 맞춰 원본 비율 그대로 이어 붙이고(잘라내지 않아야 이음새가 맞는다),
          절반(3장) 폭만큼 좌→우로 흘려 반복한다. 3장이면 2560px 와이드 화면까지 빈틈 없이 덮는다.
          <img>가 아닌 배경으로 깔아 사진을 끌거나 저장할 수 없게 한다.
        */}
        <div aria-hidden className="absolute inset-y-0 left-0 -z-10 flex w-max animate-[hero-bg-flow_40s_linear_infinite] motion-reduce:animate-none">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="aspect-[1672/941] h-full bg-cover bg-center" style={{ backgroundImage: heroBgImage }} />
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[9fr_11fr] xl:grid-cols-[2fr_3fr] lg:items-stretch">
            <div className="flex flex-col justify-between">
              <div>
                <h1>
                  <span
                    role="img"
                    aria-label="2026 전남광주통합특별시교육청 AI미래교육박람회"
                    className="block aspect-[1200/438] h-32 bg-contain bg-no-repeat sm:h-48"
                    style={{ backgroundImage: getBackgroundImage(logo, { shouldPreload: true, blur: false, width: 526 }) }}
                  />
                </h1>
                <p className="mt-4 max-w-xl text-[22px] font-extrabold leading-[1.3] text-primary-50 sm:text-[29px]">AI로 연결되는 배움, 함께 여는 미래</p>
              </div>

              <Button href="/apply/register" size="l" className="mt-8 w-fit">
                사전등록하기
                <Icon name="arrow-right" className="h-6 w-6 transition-transform duration-150 ease-out group-hover:translate-x-1" />
              </Button>
            </div>

            <div>
              <PromoVideo />
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col items-start gap-4 rounded-xlarge bg-bg-canvas px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            {HERO_FACTS.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <Badge variant="solid-primary">{f.label}</Badge>
                <span className="text-body-s font-bold text-fg-1 sm:text-body-m lg:whitespace-nowrap">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 sm:pt-14">
        <h2 className="text-heading-s font-bold text-fg-1">모두를 위한 AI미래교육</h2>
        <p className="mt-1 text-body-s text-fg-3">
          AI로 연결되는 배움의 장, 학생, 교사, 지역사회가 함께 만드는 특별한 경험에 지금 참여하세요.
        </p>
        <div className="mt-4">
          <QuickApplyGroups />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-heading-s font-bold text-fg-1">행사 일정</h2>
          <Link href="/guide/schedule" className="flex shrink-0 items-center gap-1 text-body-s font-semibold text-fg-link hover:underline">
            전체 일정표 보기
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4">
          <TimelineSection />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-heading-s font-bold text-fg-1">공지사항</h2>
          <Link href="/notice" className="flex shrink-0 items-center gap-1 text-body-s font-semibold text-fg-link hover:underline">
            전체보기
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4">
          <RecentNotices />
        </div>
      </section>
    </div>
  );
}
