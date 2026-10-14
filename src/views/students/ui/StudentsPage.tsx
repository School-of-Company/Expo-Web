import SectionPage from "@/widgets/section-page/ui/SectionPage";
import { BoothBoard } from "@/widgets/booth-board";
import { booths, companyBooths, invitedSchoolBooths } from "@/entities/booth/model/data";

export default function StudentsPage() {
  return (
    <SectionPage
      title="AI·SW 체험한마당 부스 안내"
      desc="전남광주 초·중·고 학생들과 기관에서 운영하는 다채로운 AI·SW 체험 프로그램을 만나보세요."
    >
      <h2 className="text-heading-s font-bold text-fg-1">AI·SW 체험한마당 부스 안내</h2>

      <BoothBoard
        groups={[
          { title: "(학교) AI·SW체험 프로그램 목록", nameLabel: "학교명", booths },
          { title: "(기업) 기업 연계 체험 프로그램 목록", nameLabel: "기업명", booths: companyBooths },
          { title: "[학교] 전남 학교 초청 프로그램 목록", nameLabel: "학교명", booths: invitedSchoolBooths },
        ]}
        listLabel="체험부스 안내"
        mapLabel="부스 배치도"
      />
    </SectionPage>
  );
}
