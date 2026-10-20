import SectionPage from "@/widgets/section-page/ui/SectionPage";
import Icon from "@/shared/ui/Icon";
import ParkingMapPreview from "./ParkingMapPreview";
import { noticeNavItems } from "@/shared/config/notice-nav";
import { TEMP_PARKING } from "@/entities/parking/model/data";

const BUS_STOPS = [
  { stop: "자연과학고 정류장", walk: "7분", buses: ["송정19", "첨단23", "문흥53", "용전86", "운림35"] },
  { stop: "문흥1동행정복지센터 정류장", walk: "10분", buses: ["문흥18", "문흥53", "운림35"] },
];

const mapLinks = (address: string) => {
  const query = encodeURIComponent(`광주 ${address}`);
  return [
    { label: "카카오맵", href: `https://map.kakao.com/link/search/${query}`, iconClass: "text-[#F2B600]" },
    { label: "네이버지도", href: `https://map.naver.com/p/search/${query}`, iconClass: "text-[#03C75A]" },
  ];
};

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2.5 rounded-medium bg-primary-5 px-4 py-3 text-body-s font-bold text-primary-50">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary-50 text-[12px] leading-none font-extrabold text-fg-on-primary"
      >
        !
      </span>
      {children}
    </p>
  );
}

export default function NoticeParkingPage() {
  return (
    <SectionPage
      title="주차안내"
      desc="행사장 주차 안내를 확인하세요."
      navTitle="알림마당"
      navItems={noticeNavItems}
      contentClassName="min-w-0 flex-1 rounded-xlarge border border-border-default bg-bg-canvas p-6"
    >
      <h2 className="flex items-center gap-2 break-keep text-heading-xs font-bold text-fg-1">
        <Icon name="car" className="h-6 w-6 shrink-0 text-primary-50" />
        전남광주통합특별시교육청 AI교육원 주차 안내
      </h2>
      <p className="mt-2 break-keep text-body-s text-fg-2">
        행사장 주변 교통 혼잡과 주차 공간 부족으로 자차 이용 시 큰 불편이 예상됩니다.
        <br />
        행사 당일 본원 주차장 내에서 야외 체험 부스가 운영되어 청사 내 주차가 전면 불가합니다.
      </p>
      <div className="mt-4">
        <Notice>행사 당일 AI교육원 내 주차가 불가합니다. 대중교통 이용을 권장드립니다.</Notice>
      </div>

      <h3 className="mt-8 text-body-l font-bold text-fg-1">
        <span aria-hidden="true">🚌</span> 대중교통 이용 방법
      </h3>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {BUS_STOPS.map(({ stop, walk, buses }) => (
          <li key={stop} className="rounded-large border border-border-default p-4">
            <p className="flex flex-wrap items-center gap-2 text-body-s font-bold text-fg-1">
              {stop}
              <span className="rounded-pill bg-primary-5 px-2 py-0.5 text-body-xs font-semibold text-primary-50">도보 {walk}</span>
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {buses.map((bus) => (
                <li key={bus} className="rounded-pill bg-bg-subtle px-3 py-1 text-body-xs font-semibold text-fg-2">
                  {bus}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h3 className="mt-8 text-body-l font-bold text-fg-1">임시 주차장 위치</h3>
      <p className="mt-1 break-keep text-body-s text-fg-2">
        부득이하게 자차 이용 시, 아래의 인근 학교 및 기관 임시 주차장을 이용해 주시기 바랍니다.
      </p>
      <ParkingMapPreview />

      <h3 className="mt-8 flex items-center gap-2 text-body-l font-bold text-fg-1">
        임시 주차장 안내
        <span className="rounded-pill bg-primary-5 px-2 py-0.5 text-body-xs font-semibold text-primary-50">
          총 {TEMP_PARKING.length}곳
        </span>
      </h3>
      <p className="mt-1 text-body-s text-fg-2">가까운 임시 주차장을 확인하고 지도로 이동하세요.</p>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
        {TEMP_PARKING.map(({ name, address }) => (
          <li key={name} className="min-w-0 rounded-large border border-border-default p-3 sm:p-4">
            <p className="break-keep text-body-s font-bold text-primary-50">{name}</p>
            <p className="mt-0.5 break-keep text-body-xs text-fg-2">{address}</p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {mapLinks(address).map(({ label, href, iconClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} ${label}에서 보기 (새 창)`}
                  className="flex items-center gap-1 text-body-xs font-semibold text-fg-2 hover:text-primary-50 hover:underline"
                >
                  <Icon name="map-pin" filled className={`h-3.5 w-3.5 shrink-0 ${iconClass}`} />
                  {label}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </SectionPage>
  );
}
