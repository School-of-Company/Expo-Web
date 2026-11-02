"use client";

import type { Ref } from "react";
import Button from "@/shared/ui/Button";

export default function ApplyClosedDialog({ ref }: { ref: Ref<HTMLDialogElement> }) {
  return (
    <dialog
      ref={ref}
      aria-label="신청 마감 안내"
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      className="m-auto w-[calc(100%-2rem)] max-w-[480px] rounded-xlarge bg-bg-canvas p-8 text-left shadow-4 transition-[opacity,translate] duration-[240ms] ease-out backdrop:bg-gray-100/50 starting:translate-y-4 starting:opacity-0 motion-reduce:transition-none"
    >
      <h2 className="text-heading-xs font-bold text-fg-1">신청 마감 안내</h2>
      <p className="mt-5 break-keep text-body-s leading-relaxed text-fg-2">
        2026 AI미래교육박람회가 종료되어 <strong className="font-bold text-fg-1">모든 신청이 마감</strong>되었습니다.
        <br />
        참여해 주신 모든 분들께 감사드립니다.
      </p>
      <div className="mt-8 flex justify-end">
        <Button onClick={(e) => e.currentTarget.closest("dialog")?.close()} autoFocus>
          확인
        </Button>
      </div>
    </dialog>
  );
}
