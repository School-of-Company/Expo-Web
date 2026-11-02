import { unstable_cache } from "next/cache";
import { sql } from "@/shared/lib/db";
import type { Attachment, Notice } from "../model/types";

export const NOTICES_TAG = "notices";

export const getNotices = unstable_cache(
  async (): Promise<Notice[]> => {
    const rows = await sql`
      select id::text, title, content, attachments, to_char(date, 'YYYY.MM.DD') as date
      from notices
      order by date desc, id desc
    `;
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      date: r.date,
      attachments: r.attachments as Attachment[],
      content: (r.content as string)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    }));
  },
  ["notices"],
  { tags: [NOTICES_TAG], revalidate: 3600 },
);

export async function getNotice(id: string) {
  return (await getNotices()).find((n) => n.id === id);
}
