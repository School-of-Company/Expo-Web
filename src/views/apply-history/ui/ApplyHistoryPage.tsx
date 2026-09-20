import { ApplyLookupForm } from "@/features/apply-lookup";
import { applyNavItems } from "@/shared/config/apply-nav";
import { SectionPage } from "@/widgets/section-page";

export default function ApplyHistoryPage() {
  return (
    <SectionPage
      navTitle="사전신청"
      navItems={applyNavItems}
      title="신청 내역 조회 · 취소"
      desc="신청 시 등록한 휴대폰 번호로 나의 모든 신청 내역을 확인하고 취소할 수 있습니다."
      contentClassName="mx-auto w-full max-w-xl flex-1"
    >
      <ApplyLookupForm />
    </SectionPage>
  );
}
