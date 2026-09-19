import { CapacityWidget } from "@/widgets/capacity-status";
import { CongestionWidget } from "@/widgets/congestion-status";
import { EventStatsRow } from "@/widgets/event-stats";
import { SectionPage } from "@/widgets/section-page";

export default function GuideStatusPage() {
  return (
    <SectionPage
      sectionHref="/about"
      title="실시간 현황"
      desc="행사장 혼잡도, 주차, 접수 현황을 실시간(예시 데이터)으로 확인하세요."
    >
      <EventStatsRow />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CapacityWidget />
        <CongestionWidget />
      </div>
    </SectionPage>
  );
}
