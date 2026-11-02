"use client";

import { useRef, type ReactNode } from "react";
import { ApplyClosedDialog } from "@/features/apply-cta";
import Icon from "@/shared/ui/Icon";
import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import heroBgOrange from "../../../../public/hero-bg-orange.png";

export default function ExternalApplyPanel({
  label,
  title,
  tagline,
  body,
}: {
  label: string;
  title: string;
  tagline: string;
  body: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="relative isolate overflow-hidden rounded-xlarge border border-border-default bg-bg-canvas px-6 py-16 text-center text-fg-1 sm:px-12 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-45"
        style={{ backgroundImage: getBackgroundImage(heroBgOrange) }}
      />

      <div className="mx-auto max-w-2xl">
        <p className="text-heading-xs font-bold sm:text-heading-l">{title}</p>
        <p className="mt-3 text-body-l font-semibold text-primary-50 sm:text-heading-m">&ldquo;{tagline}&rdquo;</p>
        <p className="mt-6 text-left text-body-m leading-relaxed text-fg-2 sm:text-center sm:text-body-l">{body}</p>

        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="group mt-10 inline-flex items-center gap-2 rounded-medium bg-primary-50 px-10 py-4 text-body-m font-bold text-fg-on-primary transition-colors duration-150 ease-out hover:bg-primary-50/90 sm:text-body-l"
        >
          {label}
          <Icon name="arrow-right" className="h-6 w-6 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </button>
      </div>

      <ApplyClosedDialog ref={dialogRef} />
    </div>
  );
}
