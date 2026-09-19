/** 박람회 기본 정보 · 주최/주관 로고 · 푸터 연락처. */
export const SITE = {
  name: "2026 전남광주통합특별시교육청 AI미래교육박람회",
  description:
    "2026 전남광주통합특별시교육청 AI미래교육박람회 공식 홈페이지입니다.",
  credits: [
    {
      label: "주최",
      name: "전남광주통합특별시교육청",
      logo: "/images/logo-host.svg",
      width: 214,
      height: 20,
    },
    {
      label: "주관",
      name: "전남광주통합특별시교육청AI교육원",
      logo: "/images/logo-organizer.svg",
      width: 242,
      height: 20,
    },
  ],
  contacts: [
    { label: "주소", value: "전남광주통합특별시교육청AI교육원" },
    { label: "연락처", value: "02-0000-0000" },
    { label: "관람관련문의", value: "02-0000-0000" },
  ],
  copyright:
    "Copyright © 2026 전남광주통합특별시교육청 AI미래교육박람회. All rights reserved.",
} as const;
