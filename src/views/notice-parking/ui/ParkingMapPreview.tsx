"use client";

import { useRef } from "react";
import Image from "next/image";
import Icon from "@/shared/ui/Icon";

const ALT =
  "AI교육원 주변 주차 가능 학교 지도: 우산중, 용봉중, 오정초, 문우초, 문흥중, 문정여고, 문정초, 교육연수원, 문산중, 문산초";

export default function ParkingMapPreview() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="주차 안내 지도 크게보기"
        className="relative mt-6 block w-full cursor-zoom-in overflow-hidden rounded-large border border-border-default"
      >
        <Image
          src="/parking-map.png"
          alt={ALT}
          width={3648}
          height={1724}
          sizes="(min-width: 1024px) 900px, 100vw"
          className="h-auto w-full"
        />
        <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-large bg-black/50 px-4 py-2 text-sm font-semibold text-white">
          지도 크게보기
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
          src="/parking-map.png"
          alt={ALT}
          width={3648}
          height={1724}
          sizes="95vw"
          className="h-auto max-h-[85vh] w-[95vw] object-contain"
        />
      </dialog>
    </>
  );
}
