"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import Button from "./Button";
import ApplyNoticeDialog from "./ApplyNoticeDialog";

/** 외부 신청 버튼. 신청 주소(env)가 비어 있으면 404 대신 신청 안내 창을 띄운다. */
export default function ApplyCtaButton({
  href,
  label,
  notice,
  noticeTitle,
}: {
  href: string;
  label: string;
  notice: ReactNode;
  noticeTitle: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isConfigured = href.trim().length > 0 && href !== "#";

  return (
    <>
      <Button
        href={href || "#"}
        external
        size="l"
        fullWidth
        className="mt-3"
        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
          if (isConfigured) return;
          e.preventDefault();
          dialogRef.current?.showModal();
        }}
      >
        {label}
        <span aria-hidden="true">→</span>
      </Button>
      <ApplyNoticeDialog ref={dialogRef} title={noticeTitle}>
        {notice}
      </ApplyNoticeDialog>
    </>
  );
}
