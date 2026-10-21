import Button from "@/shared/ui/Button";
import Icon from "@/shared/ui/Icon";
import { TEMP_PARKING } from "@/entities/parking/model/data";
import { guideNavItems } from "@/shared/config/guide-nav";
import { SectionPage } from "@/widgets/section-page";
import KakaoMap from "./KakaoMap";

const ADDRESS = "전남광주통합특별시 북구 능안로 30번길 7 (오치동 5-25)";
const SEARCH_QUERY = "전남광주통합특별시 북구 능안로 30번길 7";

const MAP_LINKS = [
  {
    label: "카카오맵 길찾기",
    href: `https://map.kakao.com/link/search/${SEARCH_QUERY}`,
    color: "bg-[#FEE500] text-black/85",
  },
  {
    label: "네이버지도 길찾기",
    href: `https://map.naver.com/p/search/${SEARCH_QUERY}`,
    color: "bg-[#03C75A] text-white",
  },
];

const BUS_STOPS = [
  { stop: "자연과학고", walk: "7분", buses: ["송정19", "첨단23", "문흥53", "용전86", "운림35"] },
  { stop: "문흥1동행정복지센터", walk: "10분", buses: ["문흥18", "문흥53", "운림35"] },
];

export default function GuideDirectionsPage() {
  return (
    <SectionPage navTitle="박람회 안내"
      navItems={guideNavItems} title="오시는 길" desc="대중교통·자가용 등 행사장까지 오시는 방법을 안내합니다.">
      <h2 className="text-heading-s font-bold text-fg-1">오시는 길</h2>

      <KakaoMap />

      <div className="mt-6 flex flex-col items-start gap-4 rounded-xlarge border border-border-default bg-bg-canvas p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-body-s font-semibold text-fg-1">
          <Icon name="map-pin" className="h-4 w-4 shrink-0 text-primary-50" />
          {ADDRESS}
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          {MAP_LINKS.map(({ label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-small px-4 py-2 text-body-s font-semibold transition-[filter] duration-150 ease-out hover:brightness-95 ${color}`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <h2 className="mt-10 text-heading-s font-bold text-fg-1">
        <span aria-hidden="true">🚌</span> 대중교통 이용 방법
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {BUS_STOPS.map(({ stop, walk, buses }) => (
          <li key={stop} className="rounded-xlarge border border-border-default bg-bg-canvas p-5">
            <p className="text-body-m font-bold text-fg-1">
              정류장: {stop} <span className="text-fg-3">(도보 {walk})</span>
            </p>
            <p className="mt-2 text-body-s text-fg-2">버스 번호: {buses.join(", ")}</p>
          </li>
        ))}
      </ul>

      <section className="relative mt-10 overflow-hidden rounded-xlarge border border-primary-10 bg-linear-to-br from-primary-5 via-bg-canvas to-primary-5 p-5 sm:p-7">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary-10/60 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-accent-10/50 blur-3xl" />

        <div className="relative flex items-start gap-3 sm:gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-large bg-primary-50 text-fg-on-primary shadow-2">
            <Icon name="parking" className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <h2 className="text-heading-s font-bold text-fg-1">임시 주차장 안내</h2>
            <p className="mt-1 break-keep text-body-s text-fg-2">
              <strong className="font-bold text-primary-50">행사장 내 주차가 불가하오니,</strong> 자차로 방문하시는 분은 인근 임시
              주차장을 이용해 주시기 바랍니다.
            </p>
          </div>
        </div>

        <div className="relative mt-5 rounded-large border border-border-default bg-bg-canvas/90 p-4 shadow-1 backdrop-blur-sm sm:p-5">
          <p className="flex items-center gap-2 text-body-s font-bold text-fg-1">
            <Icon name="car" className="h-4 w-4 text-primary-50" />
            임시 주차장
            <span className="rounded-pill bg-primary-50 px-2 py-0.5 text-body-xs font-semibold text-fg-on-primary">
              총 {TEMP_PARKING.length}곳
            </span>
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {TEMP_PARKING.map(({ name }, i) => (
              <li
                key={name}
                className="flex min-w-0 items-center gap-2 rounded-medium bg-bg-subtle px-3 py-2.5 text-body-s font-semibold text-fg-1"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-5 text-[11px] font-bold tabular-nums text-primary-50 ring-1 ring-primary-20">
                  {i + 1}
                </span>
                <span className="break-keep">{name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-5 flex justify-center">
          <Button href="/notice/parking">
            임시 주차장 자세히 보기
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </SectionPage>
  );
}
