"use client";

import { useRef } from "react";
import Image from "next/image";
import Icon from "@/shared/ui/Icon";

const ALT = "2026 AI미래교육박람회 포스터";

export default function PosterPreview() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <div className="w-full shrink-0 sm:w-72 lg:self-start">
      <button
        type="button"
        onClick={open}
        aria-label="포스터 크게보기"
        className="relative block w-full cursor-zoom-in overflow-hidden rounded-xlarge border border-border-default"
      >
        <Image
          src="/poster.png"
          alt={ALT}
          width={963}
          height={1400}
          className="h-auto w-full"
        />
        <span className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-large bg-black/50 py-3 text-sm font-semibold text-white">
          포스터 크게보기
          <Icon name="search" className="h-4 w-4" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-none max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-black/80"
      >
        <button
          type="button"
          onClick={close}
          aria-label="닫기"
          className="fixed right-4 top-4 rounded-full bg-black/60 p-2 text-white"
        >
          <Icon name="close" />
        </button>
        <Image
          src="/poster.png"
          alt={ALT}
          width={963}
          height={1400}
          sizes="95vw"
          className="h-[85vh] w-auto max-w-[95vw] object-contain"
        />
      </dialog>
    </div>
  );
}
