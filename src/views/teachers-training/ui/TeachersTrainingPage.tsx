import PageHero from "@/shared/ui/PageHero";
import LocalNav from "@/widgets/local-nav/ui/LocalNav";
import ProgramInfoPanel from "@/shared/ui/ProgramInfoPanel";
import { teachersNavItems } from "@/shared/config/teachers-nav";
import { trainingPrograms } from "@/entities/training-program/model/data";

export default function TeachersTrainingPage() {
  return (
    <div>
      <PageHero title="교사 연수" desc="현직 교원을 위한 연수 프로그램입니다. 삼성·애플·구글 3개 세션으로 운영되며 세부 일정은 추후 안내됩니다." />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        <LocalNav title="교사마당 (미래교육)" items={teachersNavItems} />

        <div className="min-w-0 flex-1">
          <h2 className="text-heading-s font-bold text-fg-1">교사 연수</h2>

          <ProgramInfoPanel
            schedules={trainingPrograms.map((t) => ({ label: t.title, value: t.time }))}
            facts={[
              { label: "대상", value: "현직 교원 (1인당 최대 2개 세션 신청)" },
              { label: "장소", value: "장소 추후 안내" },
            ]}
            notes={[
              { label: "내용", text: "삼성·애플·구글과 함께하는 교원 대상 협력 연수 프로그램" },
              { label: "운영방식", text: "세션별 정원 한정, 세부 일정은 홈페이지를 통해 추후 공지" },
            ]}
            cta={{ href: "/apply/teacher-training", label: "연수 신청하기" }}
          />
        </div>
      </div>
    </div>
  );
}
