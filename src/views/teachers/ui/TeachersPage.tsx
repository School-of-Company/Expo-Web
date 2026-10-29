import SectionPage from "@/widgets/section-page/ui/SectionPage";
import { BoothBoard } from "@/widgets/booth-board";
import { teachersNavItems } from "@/shared/config/teachers-nav";
import { teacherBooths } from "@/entities/booth/model/data";

/** 구역(A·B·C)이 프로그램 분야와 1:1이라 분야로 탭을 나눈다. 탭 이름이 곧 분야라 분야 열은 뺀다. */
const byField = (field: string) => teacherBooths.filter((b) => b.field === field).map((b) => ({ ...b, field: undefined }));

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
        groups={["AI디지털 기반 에듀테크", "AI코스웨어", "AI·SW 관련 최신기술"].map((field) => ({
          title: field,
          nameLabel: "부스명",
          booths: byField(field),
        }))}
        listLabel="부스 안내"
        mapLabel="부스 배치도"
        map={{ src: "/corp-booth-map.png", alt: "미래교육박람회 기업 부스 배치도", width: 5033, height: 3580 }}
        tabbed
      />
    </SectionPage>
  );
}
