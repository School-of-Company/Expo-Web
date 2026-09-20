import PageHero from "@/shared/ui/PageHero";
import LocalNav from "@/widgets/local-nav/ui/LocalNav";
import ProgramInfoPanel from "@/shared/ui/ProgramInfoPanel";
import { teachersNavItems } from "@/shared/config/teachers-nav";

export default function TeachersLecturePage() {
  return (
    <div>
      <PageHero title="미래교육 특강" desc="10.31(토) 오전 11시 진행되는 미래교육 특강입니다. 선착순 300명 참여 가능합니다." />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        <LocalNav title="교사마당 (미래교육)" items={teachersNavItems} />

        <div className="min-w-0 flex-1">
          <h2 className="text-heading-s font-bold text-fg-1">미래교육 특강</h2>

          <ProgramInfoPanel
            schedules={[{ label: "특강일시", value: "10.31(토) 오전 11:00" }]}
            facts={[
              { label: "대상", value: "학생·교사·일반 시민 (선착순 300명)" },
              { label: "장소", value: "장소 추후 안내" },
            ]}
            notes={[
              { label: "내용", text: "미래교육 특강 (세부 주제 추후 안내)" },
              { label: "운영방식", text: "선착순 300명, 사전신청 권장" },
            ]}
            cta={{ href: "/apply/teacher-lecture", label: "특강 신청하기" }}
          />
        </div>
      </div>
    </div>
  );
}
