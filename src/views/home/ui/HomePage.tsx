import Link from "next/link";
import PromoVideo from "@/widgets/promo-video/ui/PromoVideo";
import TimelineSection from "@/widgets/event-timeline/ui/TimelineSection";
import QuickApplyGroups from "@/widgets/quick-apply/ui/QuickApplyGroups";
import RecentNotices from "@/widgets/recent-notices/ui/RecentNotices";
import { AdminShortcut } from "@/widgets/admin-shortcut";
import Button from "@/shared/ui/Button";
import Badge from "@/shared/ui/Badge";
import Icon from "@/shared/ui/Icon";
import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import heroBg from "../../../../public/hero-bg.png";
import logo from "../../../../public/logo.png";
import logoStacked from "../../../../public/logo-stacked.png";

const HERO_FACTS = [
  { label: "장소", value: "전남광주통합특별시교육청AI교육원" },
  { label: "대상", value: "관내 학생 · 교원 · 학부모 등" },
];

export default function HomePage() {
  const heroBgImage = getBackgroundImage(heroBg, { shouldPreload: true });

  return (
    <div>
      <AdminShortcut />
      {/* <img>가 아닌 배경으로 깔아 사진을 끌거나 저장할 수 없게 한다. 영상 로딩 전·모션 축소 시에는 이 이미지가 보인다. */}
      <section
        className="relative overflow-hidden border-b border-border-default bg-[#eef0fb] bg-cover bg-center"
        style={{ backgroundImage: heroBgImage }}
      >
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          src="/hero-bg.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr] xl:grid-cols-[3fr_5fr] lg:items-stretch">
            <div className="flex flex-col">
              <div>
                {/* 영상과 나란히 놓이는 lg 이상에서는 세로형 로고, 한 줄로 쌓이는 좁은 화면에서는 가로형 로고를 쓴다. */}
                <h1>
                  <span
                    role="img"
                    aria-label="2026 전남광주통합특별시교육청 AI미래교육박람회"
                    className="block aspect-[2400/612] w-[351px] max-w-full bg-contain bg-no-repeat sm:w-[526px] lg:hidden"
                    style={{
                      backgroundImage: getBackgroundImage(logo, { shouldPreload: true, blur: false, width: 526, media: "(max-width: 1023.98px)" }),
                    }}
                  />
                  <span
                    role="img"
                    aria-label="2026 전남광주통합특별시교육청 AI미래교육박람회"
                    className="hidden aspect-[1080/1024] w-[300px] bg-contain bg-no-repeat lg:block xl:w-[340px]"
                    style={{
                      backgroundImage: getBackgroundImage(logoStacked, { shouldPreload: true, blur: false, width: 340, media: "(min-width: 1024px)" }),
                    }}
                  />
                </h1>
                <p className="mt-2 max-w-xl text-balance break-keep text-[22px] font-extrabold leading-[1.3] text-primary-50 sm:text-[30px]">AI로 연결되는 배움, 함께 여는 미래</p>
              </div>

              <div className="mt-4">
                <p className="text-[28px] font-extrabold leading-none tracking-tight text-primary-50 sm:text-[34px]">
                  10.31.<sup className="-top-[1em] ml-0.5 text-[0.4em] font-bold">토</sup> – 11.01.<sup className="-top-[1em] ml-0.5 text-[0.4em] font-bold">일</sup>
                </p>
                <p className="mt-3 w-fit bg-primary-50 px-4 py-2 text-body-s font-bold text-fg-on-primary sm:text-body-m">
                  시작 시간 9:30 ~ 끝나는 시간 16:00
                </p>
              </div>
            </div>

            <div>
              <PromoVideo />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr] lg:gap-6">
            <div className="flex flex-col items-start gap-4 rounded-xlarge bg-bg-canvas px-6 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
              {HERO_FACTS.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <Badge variant="solid-primary">{f.label}</Badge>
                  <span className="text-body-s font-bold text-fg-1 sm:whitespace-nowrap sm:text-body-m">{f.value}</span>
                </div>
              ))}
            </div>

            {/* 주기적으로 빛이 스치는 메인 CTA. 동작 줄이기 설정에서는 빛을 끈다. */}
            <Button
              href="/apply/register"
              size="l"
              fullWidth
              className="relative overflow-hidden bg-linear-to-r from-primary-60 via-primary-50 to-primary-40 shadow-3 hover:from-primary-50 hover:via-primary-40 lg:h-full lg:rounded-xlarge lg:text-heading-s"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-[cta-shine_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent motion-reduce:hidden"
              />
              사전등록하기
              <Icon
                name="arrow-right"
                className="h-6 w-6 transition-transform duration-200 ease-out group-hover:translate-x-1.5 motion-reduce:transition-none"
              />
            </Button>
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
