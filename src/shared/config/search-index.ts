import { NAV_SECTIONS } from "./site-nav";
import type { Notice } from "@/entities/notice/model/types";
import { faqs, faqPlainAnswer } from "@/entities/faq/model/data";

export interface SearchItem {
  title: string;
  desc: string;
  href: string;
  group: string;
}

const pageItems: SearchItem[] = NAV_SECTIONS.flatMap((section) =>
  section.sub.map((s) => ({ title: s.label, desc: section.label, href: s.href, group: "페이지" }))
);

const faqItems: SearchItem[] = faqs.map((f) => ({
  title: f.q,
  desc: faqPlainAnswer(f.a),
  href: "/notice/faq",
  group: "FAQ",
}));

export function buildSearchIndex(notices: Notice[]): SearchItem[] {
  const noticeItems = notices.map((n) => ({ title: n.title, desc: n.content[0] ?? "", href: `/notice/${n.id}`, group: "공지사항" }));
  return [...pageItems, ...noticeItems, ...faqItems];
}
