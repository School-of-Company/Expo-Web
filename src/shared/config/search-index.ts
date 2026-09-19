import { SITE_NAVIGATION } from "./navigation";
import { notices } from "@/entities/notice/model/data";
import { faqs } from "@/entities/faq/model/data";

export interface SearchItem {
  title: string;
  desc: string;
  href: string;
  group: string;
}

const pageItems: SearchItem[] = SITE_NAVIGATION.flatMap((section) =>
  section.children.map((c) => ({ title: c.label, desc: section.label, href: c.href, group: "페이지" }))
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
