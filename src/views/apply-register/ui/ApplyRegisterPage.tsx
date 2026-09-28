import { applyNavItems } from "@/shared/config/apply-nav";
import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";
import { ExternalApplyPanel } from "@/widgets/external-apply";
import { SectionPage } from "@/widgets/section-page";

export default function ApplyRegisterPage() {
  return (
    <SectionPage
      navTitle="사전신청"
      navItems={applyNavItems}
      showNav={false}
      title="사전등록"
      desc="AI와 함께하는 미래교육, 지금 사전 등록하고 만나보세요!"
    >
      <ExternalApplyPanel
        href={EXTERNAL_APPLY_LINKS.register}
        label="사전등록 신청 및 조회"
        title="AI미래교육박람회 사전등록 안내"
        tagline="AI로 연결되는 배움, 함께 여는 미래에 여러분을 초대합니다."
        body={`쾌적한 관람과 원활한 행사 운영을 위해 행사일별 오전·오후 각 1,000명씩 사전 등록자 입장을 진행합니다.\n사전 등록 없이도 방문하실 수 있으나, 현장 혼잡도에 따라 입장이 지연되거나 제한될 수 있으니 가급적 사전 등록 후 방문해 주시기 바랍니다.`}
      />
    </SectionPage>
  );
}
