"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";

/** 신청 주소(env)가 비어 있으면 사전등록 안내 페이지로 보낸다. */
const REGISTER_URL = EXTERNAL_APPLY_LINKS.register.trim();

const HIDE_KEY = "promo-popup-hidden-date";

/** 로컬 시간 기준 오늘 날짜(YYYY-MM-DD). "오늘 하루 열지 않기"는 날짜가 바뀌면 풀린다. */
const today = () => new Date().toLocaleDateString("sv-SE");

/**
 * 메인 화면 진입 시 한 번 띄우는 기조 강연 홍보 팝업.
 * 이미지 속 "신청하기" 버튼 자리에 링크를 겹쳐 사전등록 신청 주소(env)로 바로 보낸다. 네이티브 <dialog>가 포커스 가두기와 Esc 닫기를 처리한다.
 */
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
      aria-label="기조 강연 안내"
      tabIndex={-1}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto outline-none! max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[420px] overflow-hidden bg-bg-canvas p-0 shadow-4 backdrop:bg-gray-100/50"
    >
      <div className="relative">
        <Image
          src="/promo/keynote-popup.webp"
          alt="2026 AI 미래교육박람회 기조강연. AI 시대, 살아남기를 넘어 번영하기. 한양대학교 이상욱 교수, 10월 31일 토요일 11시부터 12시 30분, AI교육원"
          width={1122}
          height={1402}
          sizes="420px"
          priority
          className="h-auto max-h-[calc(100dvh-6rem)] w-full object-contain"
        />
        {/* 이미지 속 "신청하기" 버튼 위치(가로 29~71%, 세로 91~98%)에 맞춘 클릭 영역. */}
        {REGISTER_URL ? (
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            aria-label="사전등록 신청하기"
            className="absolute left-[29%] top-[91%] h-[7%] w-[42%]"
          />
        ) : (
          <Link
            href="/apply/register"
            onClick={close}
            aria-label="사전등록 신청하기"
            className="absolute left-[29%] top-[91%] h-[7%] w-[42%]"
          />
        )}
      </div>
      <div className="flex items-center justify-between border-t border-border-default px-4 py-3 text-body-xs font-semibold text-fg-2">
        <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-fg-1">
          <input
            type="checkbox"
            onChange={(e) => e.target.checked && hideToday()}
            className="h-4 w-4 cursor-pointer accent-primary-50"
          />
          오늘 하루 열지 않기
        </label>
        <button type="button" onClick={close} className="cursor-pointer transition-colors hover:text-fg-1">
          닫기
        </button>
      </div>
    </dialog>
  );
}
