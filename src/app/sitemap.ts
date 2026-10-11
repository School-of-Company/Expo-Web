import type { MetadataRoute } from "next";

import { getNotices } from "@/entities/notice/api/notices";
import { SITE_URL } from "@/shared/config/site";

const STATIC_PATHS = [
  "/",
  "/guide",
  "/guide/schedule",
  "/guide/map",
  "/guide/directions",
  "/students",
  "/students/standing",
  "/teachers",
  "/apply/register",
  "/apply/goldenbell",
  "/apply/odyssey",
  "/apply/training",
  "/apply/lecture",
  "/notice",
  "/notice/faq",
  "/notice/parking",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notices = await getNotices();
  return [
    ...STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path}` })),
    // 공지 날짜 형식: "2026.08.20"
    ...notices.map((n) => ({
      url: `${SITE_URL}/notice/${n.id}`,
      lastModified: new Date(n.date.replaceAll(".", "-")),
    })),
  ];
}
