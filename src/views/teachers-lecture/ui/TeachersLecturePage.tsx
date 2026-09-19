import PageHero from "@/shared/ui/PageHero";
import { LocalNav } from "@/widgets/local-nav";
import ProgramInfoPanel from "@/shared/ui/ProgramInfoPanel";
import { ExternalApplyPanel } from "@/widgets/external-apply";
import { teachersNavItems } from "@/shared/config/teachers-nav";
import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";

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
            cta={{ href: EXTERNAL_APPLY_LINKS.teacherLecture, label: "특강 신청 바로가기" }}
          />

          <div className="mt-10">
            <ExternalApplyPanel
              href={EXTERNAL_APPLY_LINKS.teacherLecture}
              label="특강 신청하기"
              title="미래교육 특강 신청"
              tagline="선착순 300명, 지금 바로 신청하세요"
              body={"학생·교사·일반 시민 누구나 참여할 수 있는 미래교육 특강입니다.\n외부 신청 페이지에서 신청서를 작성해 주세요."}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
