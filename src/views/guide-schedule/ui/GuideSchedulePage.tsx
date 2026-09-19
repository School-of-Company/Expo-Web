import { TimelineSection } from "@/widgets/event-timeline";
import { SectionPage } from "@/widgets/section-page";

export default function GuideSchedulePage() {
  return (
    <SectionPage
      sectionHref="/about"
      title="전체 일정표"
      desc="2026 전남광주통합특별시교육청 AI미래교육박람회의 일자별·시간대별 프로그램 일정을 확인하세요."
    >
      <h2 className="text-heading-s font-bold text-fg-1">전체 일정표</h2>
      <div className="mt-4">
        <TimelineSection />
      </div>
    </SectionPage>
  );
}
