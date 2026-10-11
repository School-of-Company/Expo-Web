import SectionPage from "@/widgets/section-page/ui/SectionPage";
import Icon from "@/shared/ui/Icon";
import ParkingMapPreview from "./ParkingMapPreview";
import { noticeNavItems } from "@/shared/config/notice-nav";

export default function NoticeParkingPage() {
  return (
    <SectionPage
      title="주차안내"
      desc="행사장 주차 안내를 확인하세요."
      navTitle="알림마당"
      navItems={noticeNavItems}
      contentClassName="min-w-0 flex-1 rounded-xlarge border border-border-default bg-bg-canvas p-6"
    >
      <p className="flex items-center gap-2 text-body-m font-bold text-fg-1">
        <Icon name="car" className="h-5 w-5 text-primary-50" />
        전남광주통합특별시교육청AI교육원 주차장
      </p>
      <ul className="mt-3 space-y-2 text-body-s text-fg-2">
        <li>· 행사장(또는 건물) 주변 교통 혼잡과 주차 공간 부족으로 인해 자차 이용 시 큰 불편이 예상됩니다. 원활한 방문을 위해 대중교통을 이용해 주실 것을 적극 권고드립니다.</li>
      </ul>
      <p className="mt-4 text-body-s font-semibold text-fg-1">대중교통 이용 방법</p>
      <ul className="mt-2 space-y-2 text-body-s text-fg-2">
        <li>· 버스 정류장: 자연과학고 (도보 7분) — 송정19, 첨단23, 문흥53, 용전86, 운림35</li>
        <li>· 버스 정류장: 문흥1동행정복지센터 (도보 10분) — 문흥18, 문흥53, 운림35</li>
      </ul>
      <ul className="mt-4 space-y-2 text-body-s text-fg-2">
        <li>· 행사 당일 본원 주차장 내에서 야외 체험 부스가 운영되어 청사 내 주차가 전면 불가합니다.</li>
        <li>· 부득이하게 자차를 이용하실 경우, 아래 인근 학교 및 기관 임시 주차장을 이용해 주십시오.</li>
      </ul>
      <p className="mt-4 text-body-s font-semibold text-fg-1">
        ※ 임시 주차장 안내: 문산초, 문산중, 용봉중, 오정초, 문우초, 문흥중, 우산중, 문정초, 문정여고, 교육연수원
      </p>
      <ParkingMapPreview />
    </SectionPage>
  );
}
