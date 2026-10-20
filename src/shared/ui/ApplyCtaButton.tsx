"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import Button from "./Button";
import ApplyNoticeDialog from "./ApplyNoticeDialog";

/** 외부 신청 버튼. 신청 주소(env)가 비어 있거나 신청 기간(opensAt~closesAt)이 아니면 신청 안내 창을 띄운다. */
export default function ApplyCtaButton({
  href,
  label,
  notice,
  noticeTitle,
  opensAt,
  closesAt,
}: {
  href: string;
  label: string;
  notice: ReactNode;
  noticeTitle: string;
  /** 신청 시작·마감 시각(ISO, 예: "2026-10-26T08:30:00+09:00"). 클릭 시점 기준으로 비교한다. */
  opensAt?: string;
  closesAt?: string;
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
          const now = Date.now();
          const inPeriod = (!opensAt || now >= Date.parse(opensAt)) && (!closesAt || now <= Date.parse(closesAt));
          if (isConfigured && inPeriod) return;
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
