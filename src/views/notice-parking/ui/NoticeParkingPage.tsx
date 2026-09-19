import PageHero from "@/shared/ui/PageHero";
import { LocalNav } from "@/widgets/local-nav";
import Icon from "@/shared/ui/Icon";
import { noticeNavItems } from "@/shared/config/notice-nav";

export default function NoticeParkingPage() {
  const navItems = noticeNavItems.map((item) => (item.key === "parking" ? { ...item, active: true } : item));

  return (
    <div>
      <PageHero title="주차안내" desc="행사장 주차 안내를 확인하세요." />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        <LocalNav title="알림마당" items={navItems} />

        <div className="min-w-0 flex-1 rounded-xlarge border border-border-default bg-bg-canvas p-6">
          <p className="flex items-center gap-2 text-body-m font-bold text-fg-1">
            <Icon name="car" className="h-5 w-5 text-primary-60" />
            전남광주통합특별시교육청AI교육원 주차장
          </p>
          <ul className="mt-3 space-y-2 text-body-s text-fg-2">
            <li>· 주차장 내 야외 체험 부스가 함께 운영되어 주차 공간이 한정되니 대중교통 이용을 강력히 권장합니다.</li>
            <li>· 사전등록 시 발급되는 QR코드를 제시하면 2시간 무료 주차가 제공됩니다.</li>
            <li>· 장애인 및 임산부 우선 주차 구역이 별도 마련되어 있습니다.</li>
            <li>· 만차 시 인근 공영주차장(도보 5분) 이용을 안내해 드립니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
