import type { Metadata } from "next";

// hiaisw.kr 은 www 로 리다이렉트되므로 www 를 대표 주소로 쓴다.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hiaisw.kr").replace(/\/$/, "");

export const SITE_NAME = "2026 전남광주통합특별시교육청 AI미래교육박람회";
export const SITE_SHORT_NAME = "AI미래교육박람회";
export const SITE_DESCRIPTION =
  "2026 AI 미래교육 박람회 공식 홈페이지. 전남광주통합특별시교육청이 여는 AI교육·SW교육 체험 부스, AI·SW 골든벨, AI교육원 전시체험 투어, 교원 연수, 기조 강연 (2026.10.31~11.1 개최, 광주 북구 AI교육원)";
export const SITE_TITLE = "2026 AI미래교육박람회 | 전남광주통합특별시교육청";

export const ORGANIZER_NAME = "전남광주통합특별시교육청";
export const HOST_NAME = "전남광주통합특별시교육청AI교육원";
export const VENUE_ADDRESS = "전남광주통합특별시 북구 능안로30번길 7 (오치동 5-25)";

export const ORGANIZER_REF = { "@type": "GovernmentOrganization", "@id": `${SITE_URL}/#organizer`, name: ORGANIZER_NAME };
export const HOST_REF = { "@type": "EducationalOrganization", "@id": `${SITE_URL}/#host`, name: HOST_NAME, url: SITE_URL };

export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentOrganization",
      "@id": `${SITE_URL}/#organizer`,
      name: ORGANIZER_NAME,
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#host`,
      name: HOST_NAME,
      parentOrganization: { "@id": `${SITE_URL}/#organizer` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "능안로30번길 7",
        addressLocality: "북구",
        addressRegion: "전남광주통합특별시",
        addressCountry: "KR",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: [SITE_SHORT_NAME, "2026 AI미래교육박람회", "AI 미래교육 페스타"],
      description: SITE_DESCRIPTION,
      inLanguage: "ko-KR",
      publisher: { "@id": `${SITE_URL}/#host` },
    },
  ],
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

const KEYWORD_WORDS = ["2026", "AI", "미래교육", "박람회"];

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
