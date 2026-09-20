import Icon from "@/shared/ui/Icon";
import { guideNavItems } from "@/shared/config/guide-nav";
import { SectionPage } from "@/widgets/section-page";

const ADDRESS = "전남광주통합특별시 북구 능안로 30번길 7 (오치동 5-25)";
const KAKAO_MAP_SEARCH = "https://map.kakao.com/link/search/전남광주통합특별시 북구 능안로 30번길 7";

export default function GuideDirectionsPage() {
  return (
    <SectionPage navTitle="박람회 안내"
      navItems={guideNavItems} title="오시는 길" desc="대중교통·자가용 등 행사장까지 오시는 방법을 안내합니다.">
      <h2 className="text-heading-s font-bold text-fg-1">오시는 길</h2>

      {/* TODO: 카카오맵 SDK 연동 후 플레이스홀더를 지도로 교체한다. */}
      <div className="mt-4 flex aspect-[16/9] w-full items-center justify-center rounded-xlarge border border-dashed border-border-default bg-bg-subtle px-4 text-center text-body-s text-fg-3">
        카카오 지도 준비중 (전남광주통합특별시교육청AI교육원)
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 rounded-xlarge border border-border-default bg-bg-canvas p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-body-s font-semibold text-fg-1">
          <Icon name="map-pin" className="h-4 w-4 shrink-0 text-primary-60" />
          {ADDRESS}
        </p>
        <a
          href={KAKAO_MAP_SEARCH}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-small border border-primary-50 px-4 py-2 text-body-s font-semibold text-primary-60 transition-colors duration-150 ease-out hover:bg-primary-10"
        >
          카카오맵 길찾기
        </a>
      </div>
    </SectionPage>
  );
}
