import SectionPage from "@/widgets/section-page/ui/SectionPage";
import { BoothBoard } from "@/widgets/booth-board";
import { teachersNavItems } from "@/shared/config/teachers-nav";
import { teacherBooths } from "@/entities/booth/model/data";

export default function TeachersPage() {
  return (
    <SectionPage
      title="AI코스웨어·에듀테크 체험 부스 안내"
      desc="미래교육의 변화를 만나고, 2030 미래교실을 그려보세요!"
      navTitle="미래교육박람회"
      navItems={teachersNavItems}
      showNav={false}
    >
      <BoothBoard
        groups={[{ nameLabel: "부스명", booths: teacherBooths }]}
        listLabel="부스 안내"
        mapLabel="부스 배치도"
        map={{ src: "/corp-booth-map.png", alt: "미래교육박람회 기업 부스 배치도", width: 5033, height: 3580 }}
      />
    </SectionPage>
  );
}
