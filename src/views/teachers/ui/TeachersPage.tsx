import SectionPage from "@/widgets/section-page/ui/SectionPage";
import { BoothBoard } from "@/widgets/booth-board";
import { teachersNavItems } from "@/shared/config/teachers-nav";
import { teacherBooths } from "@/entities/booth/model/data";

export default function TeachersPage() {
  return (
    <SectionPage
      title="미래교육박람회 부스 안내"
      desc="미래교육의 변화를 만나고, 2030 미래교실을 그려보세요!"
      navTitle="교사마당 (미래교육)"
      navItems={teachersNavItems}
    >
      <h2 className="text-heading-s font-bold text-fg-1">미래교육박람회 부스 안내</h2>

      <BoothBoard booths={teacherBooths} listLabel="부스 안내" mapLabel="부스 배치도" />
    </SectionPage>
  );
}
