import PageHero from "@/shared/ui/PageHero";
import { LocalNav } from "@/widgets/local-nav";
import { CapacityWidget } from "@/widgets/capacity-status";
import { CongestionWidget } from "@/widgets/congestion-status";
import { studentsNavItems } from "@/shared/config/students-nav";

export default function StudentsStandingPage() {
  return (
    <div>
      <PageHero
        title="실시간 참가 현황"
        desc="프로그램별 접수 현황과 구역별 혼잡도를 실시간으로 확인하세요."
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        <LocalNav title="학생마당 (AI·SW교육)" items={studentsNavItems} />

        <div className="min-w-0 flex-1 space-y-6">
          <h2 className="text-heading-s font-bold text-fg-1">실시간 참가 현황</h2>
          <p className="text-body-s text-fg-3">
            아래 정보는 현장 상황에 따라 실시간으로 변동될 수 있습니다.
          </p>

          <CapacityWidget />
          <CongestionWidget />
        </div>
      </div>
    </div>
  );
}
