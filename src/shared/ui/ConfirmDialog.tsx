"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Button from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  /** 행동 질문형: "공지를 삭제하시겠습니까?" */
  title: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** 되돌릴 수 없는 행동이면 확인 버튼을 빨간색으로 */
  danger?: boolean;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// 네이티브 <dialog>.showModal()이 포커스 가두기, Esc 닫기, 배경 비활성화를 처리한다.
// 실수로 Enter를 눌러도 실행되지 않게 처음 포커스는 취소 버튼에 둔다.
export default function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = "확인",
  cancelLabel = "취소",
  danger = false,
  pending = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        if (!pending) onCancel();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !pending) onCancel();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-[480px] rounded-xlarge bg-bg-canvas p-8 shadow-4 transition-[opacity,translate] duration-[240ms] ease-out backdrop:bg-gray-100/50 starting:translate-y-4 starting:opacity-0 motion-reduce:transition-none"
    >
      <h2 id="confirm-dialog-title" className="text-heading-xs font-bold text-fg-1">
        {title}
      </h2>
      {children && <div className="mt-3 text-body-s leading-relaxed text-fg-2">{children}</div>}
      <div className="mt-8 flex justify-end gap-2">
        <Button variant="tertiary" onClick={onCancel} disabled={pending} autoFocus>
          {cancelLabel}
        </Button>
        <Button variant={danger ? "danger" : "primary"} onClick={onConfirm} disabled={pending}>
          {pending ? "처리 중…" : confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}
