import SectionPage from "@/widgets/section-page/ui/SectionPage";
import ProgramInfoPanel from "@/shared/ui/ProgramInfoPanel";
import { studentsNavItems } from "@/shared/config/students-nav";

export default function StudentsGoldenBellPage() {
  return (
    <SectionPage
      title="AI·SW 골든벨"
      desc="AI·SW 시대를 이끌어 갈 여러분의 도전이 시작됩니다!"
      navTitle="학생마당 (AI·SW교육)"
      navItems={studentsNavItems}
    >
      <h2 className="text-heading-s font-bold text-fg-1">AI·SW 골든벨</h2>

      <ProgramInfoPanel
        schedules={[
          { label: "초등일시", value: "10.31(토) 13:30~14:30" },
          { label: "중고등일시", value: "11.1(일) 11:00~12:00" },
        ]}
        facts={[
          { label: "대상", value: "초·중·고 희망학생 (초등 100명, 중등 100명)" },
          { label: "장소", value: "3층 대강당" },
        ]}
        notes={[
          { label: "내용", text: "AI·SW 기초상식 및 IT 관련 일반상식 퀴즈" },
          { label: "운영방식", text: "사전신청(50명)과 현장신청(50명)을 통해 참여 가능" },
        ]}
        cta={{ href: "/apply/goldenbell", label: "골든벨 사전 신청 및 조회" }}
      />
    </SectionPage>
  );
}
