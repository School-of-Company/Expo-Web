import SectionPage from "@/widgets/section-page/ui/SectionPage";
import ProgramInfoPanel from "@/shared/ui/ProgramInfoPanel";
import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";

export default function StudentsAiTourPage() {
  return (
    <SectionPage
      title="AI교육원 전시체험 투어"
      desc="AI교육원 내 아이콘 시티·스쿨·넥스트로 떠나는 흥미진진한 AI·SW 탐험!"
      showNav={false}
    >
      <h2 className="text-heading-s font-bold text-fg-1">AI교육원 전시체험 투어</h2>

      <ProgramInfoPanel
        schedules={[
          { label: "1회차", value: "10.31.(토) 10:30~11:30" },
          { label: "2회차", value: "10.31.(토) 13:00~14:00" },
          { label: "3회차", value: "10.31.(토) 14:00~15:00" },
        ]}
        facts={[
          { label: "대상", value: "초·중·고·특수 학생" },
          { label: "장소", value: "AI교육원 1층" },
        ]}
        notes={[
          { label: "내용", text: "AI교육원 내 아이콘 시티·스쿨·넥스트를 둘러보는 AI·SW 탐험 프로그램" },
          { label: "운영방식", text: "회차별 2팀 운영(팀당 8명)" },
        ]}
        cta={{ href: EXTERNAL_APPLY_LINKS.aiTour || "#", label: "투어 사전 신청 및 조회", external: true }}
      />
    </SectionPage>
  );
}
