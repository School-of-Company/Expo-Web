import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";
import { ExternalApplyPanel } from "@/widgets/external-apply";
import { SectionPage } from "@/widgets/section-page";

export default function ApplyLecturePage() {
  return (
    <SectionPage
      sectionHref="/apply"
      title="미래교육 특강 신청"
      desc="AI 시대 교실을 위한 교원 대상 특강입니다. 10.31(토) 오전 11시 단일 회차, 선착순 300명입니다."
    >
      <ExternalApplyPanel
        href={EXTERNAL_APPLY_LINKS.teacherLecture}
        label="특강 신청하기"
        title="미래교육 특강 신청 안내"
        tagline="미래 교육의 변화를 가장 먼저 만나보세요!"
        body={`AI 시대 교실을 위한 미래교육 특강으로, 아래 링크를 클릭하여 간단한 절차로 신청을 완료하실 수 있습니다.\n선착순 300명 한정이니 이번 기회를 놓치지 마세요!`}
      />
    </SectionPage>
  );
}
