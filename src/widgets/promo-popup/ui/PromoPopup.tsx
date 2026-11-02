"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const HIDE_KEY = "thanks-popup-hidden-date";

const today = () => new Date().toLocaleDateString("sv-SE");

export default function PromoPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(HIDE_KEY) === today()) return;
    } catch {
      // 저장소를 쓸 수 없으면 그냥 띄운다.
    }
    dialogRef.current?.showModal();
    // showModal()은 첫 포커스 가능 요소에 포커스를 주므로, 열릴 때 버튼에 포커스 링이 뜨지 않게 팝업 자체로 옮긴다.
    dialogRef.current?.focus();
  }, []);

  const close = () => dialogRef.current?.close();
  const hideToday = () => {
    try {
      localStorage.setItem(HIDE_KEY, today());
    } catch {
      // 저장하지 못해도 이번에는 닫는다.
    }
    close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="박람회 참여 감사 인사"
      tabIndex={-1}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto outline-none! max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[720px] overflow-hidden bg-bg-canvas p-0 shadow-4 backdrop:bg-gray-100/50"
    >
      <div className="relative">
        <Image
          src="/promo/thanks-popup.webp"
          alt="2026 AI미래교육박람회 참여해 주셔서 감사드립니다! 2026 AI미래교육박람회에 함께해 주신 모든 분들께 진심으로 감사드립니다. 앞으로도 AI와 미래교육이 만들어갈 더 나은 배움과 성장의 미래에 계속해서 많은 관심과 응원을 부탁드립니다. 전남광주통합특별시교육청, 전남광주통합특별시교육청AI교육원"
          width={1445}
          height={1088}
          sizes="(max-width: 752px) calc(100vw - 2rem), 720px"
          className="h-auto max-h-[calc(100dvh-6rem)] w-full object-contain"
        />
        <button
          type="button"
          onClick={close}
          aria-label="팝업 닫기"
          className="absolute right-0 top-0 h-11 w-11 cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between border-t border-border-default px-4 py-1 text-body-xs font-semibold text-fg-2">
        <label className="flex min-h-11 cursor-pointer items-center gap-2 transition-colors hover:text-fg-1">
          <input
            type="checkbox"
            onChange={(e) => e.target.checked && hideToday()}
            className="h-4 w-4 cursor-pointer accent-primary-50"
          />
          오늘 하루 열지 않기
        </label>
        <button type="button" onClick={close} className="min-h-11 cursor-pointer px-3 transition-colors hover:text-fg-1">
          닫기
        </button>
      </div>
    </dialog>
  );
}
