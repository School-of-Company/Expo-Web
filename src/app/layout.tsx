import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import { SITE } from "@/shared/config/site";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { ScrollToTopButton } from "@/widgets/scroll-to-top";

import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-medium bg-primary-50 px-4 py-2.5 text-body-s font-bold text-fg-on-primary transition-transform focus-visible:translate-y-0"
        >
          본문 바로가기
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
