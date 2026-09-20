import { NAV_SECTIONS } from "./site-nav";
import { notices } from "@/entities/notice/model/data";
import { faqs } from "@/entities/faq/model/data";

export interface SearchItem {
  title: string;
  desc: string;
  href: string;
  group: string;
}

const pageItems: SearchItem[] = NAV_SECTIONS.flatMap((section) =>
  section.sub.map((s) => ({ title: s.label, desc: section.label, href: s.href, group: "페이지" }))
);

const noticeItems: SearchItem[] = notices.map((n) => ({
  title: n.title,
  desc: n.content[0] ?? "",
  href: `/notice/${n.id}`,
  group: "공지사항",
}));

const faqItems: SearchItem[] = faqs.map((f) => ({
  title: f.q,
  desc: f.a,
  href: "/notice/faq",
  group: "FAQ",
}));

export const searchIndex: SearchItem[] = [...pageItems, ...noticeItems, ...faqItems];
