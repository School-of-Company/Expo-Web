import Image from "next/image";
import Link from "next/link";
import PromoVideo from "@/widgets/promo-video/ui/PromoVideo";
import TimelineSection from "@/widgets/event-timeline/ui/TimelineSection";
import QuickApplyGroups from "@/widgets/quick-apply/ui/QuickApplyGroups";
import RecentNotices from "@/widgets/recent-notices/ui/RecentNotices";
import Button from "@/shared/ui/Button";
import Badge from "@/shared/ui/Badge";
import Icon from "@/shared/ui/Icon";

const HERO_FACTS = [
  { label: "일정", value: "2026.10.31.(토)-11.1.(일)" },
  { label: "장소", value: "전남광주통합특별시교육청AI교육원" },
  { label: "대상", value: "학생 · 교원 · 일반 시민 누구나" },
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-border-default bg-bg-muted bg-cover bg-center bg-[url('/hero-bg.png')]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[9fr_11fr] lg:items-stretch">
            <div className="flex flex-col justify-between">
              <div>
                <h1>
                  <Image
                    src="/logo.png"
                    alt="2026 전남광주통합특별시교육청 AI미래교육박람회"
                    width={1230}
                    height={361}
                    className="h-26 w-auto sm:h-38"
                    priority
                  />
                </h1>
                <p className="mt-4 max-w-xl text-heading-s font-bold text-fg-2 sm:text-heading-m">AI로 연결되는 배움, 함께 여는 미래</p>
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

          <div className="mt-10 flex w-full flex-col items-start gap-4 rounded-xlarge bg-bg-canvas px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            {HERO_FACTS.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <Badge variant="outlined-primary">{f.label}</Badge>
                <span className="text-body-s font-bold text-fg-1 sm:text-body-m">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 sm:pt-14">
        <h2 className="text-heading-s font-bold text-fg-1">지금, 미래를 만나보세요</h2>
        <p className="mt-1 text-body-s text-fg-3">
          AI로 연결되는 배움의 장, 2026 전남광주통합특별시교육청 AI미래교육박람회. 학생, 교사, 지역사회가 함께 만드는 특별한 경험에 지금 참여하세요.
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
