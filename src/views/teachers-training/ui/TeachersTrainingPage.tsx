import PageHero from "@/shared/ui/PageHero";
import { LocalNav } from "@/widgets/local-nav";
import ProgramInfoPanel from "@/shared/ui/ProgramInfoPanel";
import { ExternalApplyPanel } from "@/widgets/external-apply";
import { teachersNavItems } from "@/shared/config/teachers-nav";
import { trainingPrograms } from "@/entities/training-program/model/data";
import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";

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
            cta={{ href: EXTERNAL_APPLY_LINKS.teacherTraining, label: "연수 신청 바로가기" }}
          />

          <div className="mt-10">
            <ExternalApplyPanel
              href={EXTERNAL_APPLY_LINKS.teacherTraining}
              label="연수 신청하기"
              title="교사 연수 신청"
              tagline="세션별 정원 한정, 지금 바로 신청하세요"
              body={"삼성·애플·구글 3개 세션 중 최대 2개까지 신청할 수 있습니다.\n외부 신청 페이지에서 신청서를 작성해 주세요."}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
