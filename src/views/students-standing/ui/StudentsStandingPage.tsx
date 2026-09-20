import SectionPage from "@/widgets/section-page/ui/SectionPage";
import { studentsNavItems } from "@/shared/config/students-nav";

export default function StudentsStandingPage() {
  return (
    <SectionPage
      title="상설 체험"
      desc="사전신청 없이 누구나 자유롭게 참여할 수 있는 상시 운영 체험존입니다."
      navTitle="학생마당 (AI·SW교육)"
      navItems={studentsNavItems}
    >
      <h2 className="text-heading-s font-bold text-fg-1">상설 체험</h2>
      <p className="mt-2 text-body-s text-fg-3">
        사전신청 없이 누구나 자유롭게 참여할 수 있는 상시 운영 체험존입니다. (3D프린팅 체험, AI 그림퀴즈, 코딩 보드게임 등)
      </p>
    </SectionPage>
  );
}
