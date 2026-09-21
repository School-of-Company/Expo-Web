import type { Metadata } from "next";

import Button from "@/shared/ui/Button";
import Icon from "@/shared/ui/Icon";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <p className="text-display-m font-bold text-primary-50 sm:text-display-l">404</p>

      <h1 className="mt-4 text-heading-m font-bold text-fg-1 sm:text-heading-l">페이지를 찾을 수 없습니다</h1>

      <p className="mt-4 text-body-s leading-relaxed text-fg-3 sm:text-body-m">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
        <br />
        아직 준비 중인 페이지일 수 있습니다.
      </p>

      <Button href="/" className="mt-10">
        <Icon name="home" className="h-4 w-4 shrink-0" />
        홈으로 돌아가기
      </Button>
    </div>
  );
}
