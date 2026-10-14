import { faqs, faqPlainAnswer } from "@/entities/faq/model/data";
import { getNotices } from "@/entities/notice/api/notices";
import { EVENT_DATES, timeline } from "@/entities/schedule/model/data";
import { HOST_NAME, ORGANIZER_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL, VENUE_ADDRESS } from "@/shared/config/site";
import { NAV_SECTIONS } from "@/shared/config/site-nav";

// sitemap 처럼 정적으로 만들고, 공지가 바뀌면 NOTICES_TAG 무효화로 다시 만든다.
export const dynamic = "force-static";

/** "[학생] 골든벨 신청" → "골든벨 신청 (학생)". 대괄호가 겹치면 마크다운 링크가 깨진다. */
const linkText = (label: string) => label.replace(/^\[(.+?)\]\s*(.+)$/, "$2 ($1)");

/**
 * AI 검색·답변 서비스가 읽는 사이트 요약(https://llmstxt.org).
 * 화면과 같은 데이터에서 만들어, 일정·FAQ·공지가 바뀌면 함께 바뀐다.
 */
export async function GET() {
  const notices = await getNotices();

  const body = [
    `# ${SITE_NAME}`,
    `> ${SITE_DESCRIPTION}`,
    "## 행사 정보",
    [
      "- 일시: 2026년 10월 31일(토) ~ 11월 1일(일)",
      `- 장소: ${HOST_NAME} (${VENUE_ADDRESS})`,
      `- 주최: ${ORGANIZER_NAME}`,
      `- 주관: ${HOST_NAME}`,
      `- 공식 홈페이지: ${SITE_URL}`,
    ].join("\n"),
    "## 일정",
    EVENT_DATES.map((date) =>
      [
        `### ${date}`,
        ...timeline
          .filter((item) => item.date === date)
          .map((item) => `- ${item.time} ${item.title} (${item.location})${item.detail.length ? `: ${item.detail.join(", ")}` : ""}`),
      ].join("\n"),
    ).join("\n\n"),
    "## 페이지",
    NAV_SECTIONS.map((section) =>
      [`### ${section.label}`, ...section.sub.map((s) => `- [${linkText(s.label)}](${SITE_URL}${s.href})`)].join("\n"),
    ).join("\n\n"),
    "## 자주 묻는 질문",
    faqs.map((f) => `### ${f.q}\n${faqPlainAnswer(f.a)}`).join("\n\n"),
    ...(notices.length
      ? ["## 공지사항", notices.map((n) => `- [${n.title}](${SITE_URL}/notice/${n.id}) (${n.date})`).join("\n")]
      : []),
  ].join("\n\n");

  return new Response(`${body}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
