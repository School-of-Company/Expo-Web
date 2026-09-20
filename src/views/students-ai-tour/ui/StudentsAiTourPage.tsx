import SectionPage from "@/widgets/section-page/ui/SectionPage";
import ProgramInfoPanel from "@/shared/ui/ProgramInfoPanel";
import { studentsNavItems } from "@/shared/config/students-nav";

export default function StudentsAiTourPage() {
  return (
    <SectionPage
      title="AI교육원 탐방 (오디세이 투어)"
      desc="실제 AI교육원 시설을 둘러보는 견학 프로그램입니다. 10.31(토) 3개 회차로 운영되며 회차별 2팀, 팀당 8명 한정입니다."
      navTitle="학생마당 (AI·SW교육)"
      navItems={studentsNavItems}
    >
      <h2 className="text-heading-s font-bold text-fg-1">AI교육원 탐방 (오디세이 투어)</h2>

      <ProgramInfoPanel
        schedules={[
          { label: "1회차", value: "10.31(토) 10:00~11:00" },
          { label: "2회차", value: "10.31(토) 13:30~14:30" },
          { label: "3회차", value: "10.31(토) 15:00~16:00" },
        ]}
        facts={[
          { label: "대상", value: "학생 (팀 단위 신청, 회차별 2팀 · 팀당 8명)" },
          { label: "장소", value: "AI교육원 일원" },
        ]}
        notes={[
          { label: "내용", text: "AI교육원 시설 견학 및 AI 체험 프로그램" },
          { label: "운영방식", text: "회차별 2팀 한정 사전신청, 팀당 8명 참여 가능" },
        ]}
        cta={{ href: "/apply/odyssey", label: "탐방 신청하기" }}
      />
    </SectionPage>
  );
}
