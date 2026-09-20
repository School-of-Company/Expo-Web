import { CapacityWidget } from "@/widgets/capacity-status";
import { CongestionWidget } from "@/widgets/congestion-status";
import { EventStatsRow } from "@/widgets/event-stats";
import { SectionPage } from "@/widgets/section-page";

export default function GuideStatusPage() {
  return (
    <SectionPage
      sectionHref="/about"
      title="실시간 현황"
      desc="행사장 혼잡도와 프로그램 접수 상황을 확인하고 방문 시간을 정하세요."
    >
      <EventStatsRow />

      <div className="mt-8 grid grid-cols-1 items-start gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CapacityWidget />
        </div>
        <div className="lg:col-span-2">
          <CongestionWidget />
        </div>
      </div>

      <p className="mt-6 text-body-xs text-fg-4">
        운영 데이터 연동 전이라 이 페이지의 모든 수치는 예시입니다.
      </p>
    </SectionPage>
  );
}
