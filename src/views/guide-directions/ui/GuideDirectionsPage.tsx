import Icon from "@/shared/ui/Icon";
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

      <h2 className="mt-10 text-heading-s font-bold text-fg-1">대중교통 이용 방법</h2>
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
    </SectionPage>
  );
}
