"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { Attachment } from "@/entities/notice/model/types";
import { NOTICES_TAG } from "@/entities/notice/api/notices";
import { checkPassword, clearAdminSession, requireAdmin, setAdminSession } from "@/shared/lib/admin-auth";
import { sql } from "@/shared/lib/db";

export async function login(_prev: string | undefined, formData: FormData) {
  if (!checkPassword(String(formData.get("password") ?? ""))) return "비밀번호가 올바르지 않습니다.";
  await setAdminSession();
  redirect("/admin");
}

export async function logout() {
  await clearAdminSession();
  redirect("/admin/login");
}

// 클라이언트가 보낸 값이므로 Vercel Blob URL만 통과시킨다.
function parseAttachments(raw: FormDataEntryValue | null): Attachment[] {
  try {
    const list = JSON.parse(String(raw ?? "[]"));
    return list
      .filter((a: Attachment) => /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//.test(a?.url))
      .map((a: Attachment) => ({ url: a.url, name: String(a.name), type: String(a.type) }));
  } catch {
    return [];
  }
}

export async function saveNotice(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id")) || null;
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  if (!title || !content) throw new Error("제목과 내용을 모두 입력해 주세요.");
  const attachments = parseAttachments(formData.get("attachments"));
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });

  if (id) {
    await sql`update notices set title = ${title}, content = ${content}, attachments = ${JSON.stringify(attachments)}::jsonb where id = ${id}`;
  } else {
    await sql`insert into notices (title, content, date, attachments) values (${title}, ${content}, ${today}, ${JSON.stringify(attachments)}::jsonb)`;
  }
  revalidateTag(NOTICES_TAG, { expire: 0 });
  redirect("/admin");
}

export async function deleteNotices(ids: string[]) {
  await requireAdmin();
  if (!Array.isArray(ids)) return;
  const numericIds = ids.map(Number).filter(Number.isInteger);
  if (numericIds.length === 0) return;
  await sql`delete from notices where id = any(${numericIds}::int[])`;
  revalidateTag(NOTICES_TAG, { expire: 0 });
}
