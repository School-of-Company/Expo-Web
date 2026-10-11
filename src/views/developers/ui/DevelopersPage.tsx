import Button from "@/shared/ui/Button";
import Icon from "@/shared/ui/Icon";

// TODO: 개발자 참여 소감 콘텐츠가 확정되면 이 안내 화면을 실제 후기 페이지로 교체한다.
export default function DevelopersPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <p className="text-body-s font-bold text-primary-50">개발자 후기</p>

      <h1 className="mt-3 text-heading-m font-bold text-fg-1 sm:text-heading-l">준비 중인 페이지입니다</h1>

      <p className="mt-4 text-body-s leading-relaxed text-fg-3 sm:text-body-m">
        박람회 홈페이지를 만든 개발자들의 참여 소감을 준비하고 있습니다.
        <br />
        조금만 기다려 주세요.
      </p>

      <Button href="/" className="mt-10">
        <Icon name="home" className="h-4 w-4 shrink-0" />
        메인화면 가기
      </Button>
    </div>
  );
}
