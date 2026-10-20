"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import ApplyNoticeDialog from "@/shared/ui/ApplyNoticeDialog";
import Icon from "@/shared/ui/Icon";
import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import { useExternalLinkGuard } from "@/shared/lib/useExternalLinkGuard";
import heroBgOrange from "../../../../public/hero-bg-orange.png";

export default function ExternalApplyPanel({
  href,
  label,
  title,
  tagline,
  body,
  notice,
}: {
  href: string;
  label: string;
  title: string;
  tagline: string;
  body: ReactNode;
  /** 신청 주소(env)가 비어 있을 때 버튼을 누르면 404 대신 띄울 신청 안내. */
  notice?: ReactNode;
}) {
  const { isConfigured, onClick: guardClick } = useExternalLinkGuard(href);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onClick = (e: MouseEvent) => {
    if (notice && !isConfigured) {
      e.preventDefault();
      dialogRef.current?.showModal();
      return;
    }
    guardClick(e);
  };

  return (
    <div className="relative isolate overflow-hidden rounded-xlarge border border-border-default bg-bg-canvas px-6 py-16 text-center text-fg-1 sm:px-12 sm:py-24">
      {/* 오른쪽 아래로 번지는 주황 물결 사진을 옅게 깔아, 글자가 사진에 묻히지 않게 한다. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-45"
        style={{ backgroundImage: getBackgroundImage(heroBgOrange) }}
      />

      <div className="mx-auto max-w-2xl">
        <p className="text-heading-xs font-bold sm:text-heading-l">{title}</p>
        <p className="mt-3 text-body-l font-semibold text-primary-50 sm:text-heading-m">&ldquo;{tagline}&rdquo;</p>
        <p className="mt-6 text-left text-body-m leading-relaxed text-fg-2 sm:text-center sm:text-body-l">{body}</p>

        <a
          href={isConfigured ? href : "#"}
          target={isConfigured ? "_blank" : undefined}
          rel={isConfigured ? "noopener noreferrer" : undefined}
          onClick={onClick}
          className="group mt-10 inline-flex items-center gap-2 rounded-medium bg-primary-50 px-10 py-4 text-body-m font-bold text-fg-on-primary transition-colors duration-150 ease-out hover:bg-primary-50/90 sm:text-body-l"
        >
          {label}
          <Icon name="arrow-right" className="h-6 w-6 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </a>
      </div>

      {notice && (
        <ApplyNoticeDialog ref={dialogRef} title="신청 오픈 일정">
          {notice}
        </ApplyNoticeDialog>
      )}
    </div>
  );
}
