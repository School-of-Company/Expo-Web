import type { Metadata } from "next";

import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_SHORT_NAME, SITE_TITLE, SITE_URL } from "@/shared/config/site";

import { getNotices } from "@/entities/notice/api/notices";
import { buildSearchIndex } from "@/shared/config/search-index";
import DisableNativeDrag from "@/shared/ui/DisableNativeDrag";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { ScrollToTopButton } from "@/widgets/scroll-to-top";

// Pretendard 가변 폰트 동적 서브셋: 굵기 전체를 파일 하나로, 페이지에 쓰인 글자가 든 조각(unicode-range)만 받는다.
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | 2026 ${SITE_SHORT_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
      ? { "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION }
      : undefined,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const searchIndex = buildSearchIndex(await getNotices());

  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-medium bg-primary-50 px-4 py-2.5 text-sm font-bold text-fg-on-primary transition-transform focus-visible:translate-y-0"
        >
          본문 바로가기
        </a>
        <Header searchIndex={searchIndex} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTopButton />
        <DisableNativeDrag />
      </body>
    </html>
  );
}
