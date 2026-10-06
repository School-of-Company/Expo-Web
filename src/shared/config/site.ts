import type { Metadata } from "next";

/** 운영 도메인. 배포 환경에서 NEXT_PUBLIC_SITE_URL 로 주입한다. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "2026 전남광주통합특별시교육청 AI미래교육박람회";
export const SITE_SHORT_NAME = "AI미래교육박람회";
export const SITE_DESCRIPTION =
  "2026 AI 미래교육 박람회 공식 홈페이지. 전남광주통합특별시교육청이 여는 AI교육·SW교육 체험 부스, AI·SW 골든벨, 오디세이 투어, 교원 연수, 미래교육 특강 사전등록 안내 (2026.10.31~11.1, 광주 북구 AI교육원)";
/** 검색 결과 title: 핵심어(2026 AI미래교육박람회)를 맨 앞에 둔다. */
export const SITE_TITLE = "2026 AI미래교육박람회 | 전남광주통합특별시교육청";

/** 페이지별 title/description/canonical/og:url 을 한 번에 만든다. title 은 루트 template 이 감싼다. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

const KEYWORD_WORDS = ["2026", "AI", "미래교육", "박람회"];

// 핵심어 2~4개의 모든 순서 조합을 붙여쓰기/띄어쓰기 두 형태로 만든다. (4단어 → 120개)
function permutations(words: string[], size: number): string[][] {
  if (size === 0) return [[]];
  return words.flatMap((w, i) =>
    permutations([...words.slice(0, i), ...words.slice(i + 1)], size - 1).map((rest) => [w, ...rest]),
  );
}

export const SITE_KEYWORDS = [
  "AI미래교육박람회",
  "전남광주통합특별시교육청",
  "AI교육원",
  ...[2, 3, 4].flatMap((n) => permutations(KEYWORD_WORDS, n)).flatMap((p) => [p.join(" "), p.join("")]),
];
