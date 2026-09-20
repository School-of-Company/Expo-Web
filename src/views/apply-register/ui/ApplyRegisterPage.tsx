import { applyNavItems } from "@/shared/config/apply-nav";
import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";
import { ExternalApplyPanel } from "@/widgets/external-apply";
import { SectionPage } from "@/widgets/section-page";

export default function ApplyRegisterPage() {
  return (
    <SectionPage
      navTitle="사전신청"
      navItems={applyNavItems}
      title="사전등록"
      desc="AI·SW 한마당 사전등록 - 보호자 1인당 최대 5명, 학생·일반시민 1,000명 한정, 교사는 인원 제한이 없습니다."
    >
      <ExternalApplyPanel
        href={EXTERNAL_APPLY_LINKS.register}
        label="사전등록 신청하기"
        title="2026 전남광주통합특별시교육청 AI미래교육박람회 사전등록 안내"
        tagline="미래 교육의 변화를 먼저 만나보세요!"
        body={`2026 전남광주통합특별시교육청 AI미래교육박람회 사전등록을 원하신다면, 아래 링크를 클릭하여 간단한 절차로 사전등록을 완료하실 수 있습니다.\nAI·SW 교육과 기술의 최신 트렌드를 경험할 이번 기회를 놓치지 마세요!`}
      />
    </SectionPage>
  );
}
