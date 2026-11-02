"use client";

import Button from "@/shared/ui/Button";
import Icon from "@/shared/ui/Icon";

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <h1 className="text-heading-m font-bold text-fg-1 sm:text-heading-l">일시적인 오류가 발생했습니다</h1>
      <p className="mt-4 text-body-s leading-relaxed text-fg-3 sm:text-body-m">잠시 후 다시 시도해 주세요.</p>
      <div className="mt-10 flex gap-3">
        <Button onClick={() => retry()}>다시 시도</Button>
        <Button href="/" variant="secondary">
          <Icon name="home" className="h-4 w-4 shrink-0" />
          홈으로
        </Button>
      </div>
    </div>
  );
}
