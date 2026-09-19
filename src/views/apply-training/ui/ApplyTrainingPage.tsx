import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";
import { ExternalApplyPanel } from "@/widgets/external-apply";
import { SectionPage } from "@/widgets/section-page";

export default function ApplyTrainingPage() {
  return (
    <SectionPage
      sectionHref="/apply"
      title="교사 연수 신청"
      desc="삼성·애플·구글 3개 세션 중 최대 2개까지 신청 가능합니다. 세션별 세부 일정은 추후 안내될 예정입니다."
    >
      <ExternalApplyPanel
        href={EXTERNAL_APPLY_LINKS.teacherTraining}
        label="연수 신청하기"
        title="교사 연수 신청 안내"
        tagline="AI 시대를 준비하는 교육의 첫걸음"
        body={`삼성·애플·구글과 함께하는 교원 대상 연수 프로그램으로, 아래 링크를 클릭하여 간단한 절차로 신청을 완료하실 수 있습니다.\n세션별 정원이 한정되어 있으니 서둘러 신청해 주세요!`}
      />
    </SectionPage>
  );
}
