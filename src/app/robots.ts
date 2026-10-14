import type { MetadataRoute } from "next";

import { SITE_URL } from "@/shared/config/site";

/**
 * AI 검색·답변 서비스의 크롤러. `*` 규칙으로도 허용되지만, 일부 서비스는 자기 이름이 명시된 규칙을 우선 확인하므로 따로 적는다.
 * 행사 안내는 널리 퍼질수록 좋으므로 학습용 크롤러(GPTBot, Google-Extended 등)도 막지 않는다.
 */
const AI_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/admin" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/admin" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
