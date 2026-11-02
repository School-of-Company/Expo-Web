import { SectionPage } from "@/widgets/section-page";
import { BoothBoard } from "@/widgets/booth-board";
import { booths, companyBooths, invitedSchoolBooths, type Booth } from "@/entities/booth";

const byPrefix = (list: Booth[], prefix: string) => list.filter((b) => b.no.startsWith(`${prefix}-`));

export default function StudentsPage() {
  return (
    <SectionPage
      title="AI·SW 체험한마당 부스 안내"
      desc="전남광주 초·중·고 학생들과 기관에서 운영한 다채로운 AI·SW 체험 프로그램입니다."
    >
      <BoothBoard
        groups={[
          { title: "초등학교", nameLabel: "학교명", booths: byPrefix(booths, "E") },
          { title: "중학교", nameLabel: "학교명", booths: byPrefix(booths, "M") },
          { title: "고등학교", nameLabel: "학교명", booths: byPrefix(booths, "H") },
          { title: "드론", nameLabel: "학교명", booths: byPrefix(booths, "D") },
          { title: "특별", nameLabel: "운영 기관", booths: [...companyBooths, ...invitedSchoolBooths] },
        ]}
        listLabel="체험부스 안내"
        mapLabel="부스 배치도"
        map={{ src: "/student-booth-map.png", alt: "AI·SW 체험한마당 부스 배치도", width: 5033, height: 3580 }}
        tabbed
      />
    </SectionPage>
  );
}
