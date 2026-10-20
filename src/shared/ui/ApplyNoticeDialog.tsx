"use client";

import type { ReactNode, Ref } from "react";
import Button from "./Button";

/**
 * 신청 주소(env)가 비어 있을 때 404 대신 띄우는 신청 안내 창.
 * 여는 쪽에서 ref로 showModal()을 부른다. 네이티브 <dialog>가 포커스 가두기와 Esc 닫기를 처리한다.
 */
export default function ApplyNoticeDialog({
  ref,
  title,
  children,
}: {
  ref: Ref<HTMLDialogElement>;
  title: string;
  children: ReactNode;
}) {
  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      className="m-auto w-[calc(100%-2rem)] max-w-[480px] rounded-xlarge bg-bg-canvas p-8 text-left shadow-4 transition-[opacity,translate] duration-[240ms] ease-out backdrop:bg-gray-100/50 starting:translate-y-4 starting:opacity-0 motion-reduce:transition-none"
    >
      <h2 className="text-heading-xs font-bold text-fg-1">{title}</h2>
      <div className="mt-5">{children}</div>
      <div className="mt-8 flex justify-end">
        <Button onClick={(e) => e.currentTarget.closest("dialog")?.close()} autoFocus>
          확인
        </Button>
      </div>
    </dialog>
  );
}
