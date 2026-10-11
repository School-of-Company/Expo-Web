import { unstable_cache } from "next/cache";
import { sql } from "@/shared/lib/db";
import type { Notice } from "../model/types";

export const NOTICES_TAG = "notices";

// 전체 공지를 한 번에 캐시하고, 관리자가 글을 바꿀 때만 NOTICES_TAG로 무효화한다.
// 목록 전체를 한 번에 읽는다. 공지가 수천 건이 되면 페이지 단위 쿼리로 바꿀 것
export const getNotices = unstable_cache(
  async (): Promise<Notice[]> => {
    const rows = await sql`
      select id::text, title, content, to_char(date, 'YYYY.MM.DD') as date
      from notices
      order by date desc, id desc
    `;
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      date: r.date,
      content: (r.content as string)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    }));
  },
  ["notices"],
  { tags: [NOTICES_TAG] },
);

export async function getNotice(id: string) {
  return (await getNotices()).find((n) => n.id === id);
}
