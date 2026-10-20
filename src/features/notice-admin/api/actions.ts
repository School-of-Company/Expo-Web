"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
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

export async function saveNotice(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id")) || null;
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  if (!title || !content || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("제목, 내용, 날짜를 모두 입력해 주세요.");

  if (id) {
    await sql`update notices set title = ${title}, content = ${content}, date = ${date} where id = ${id}`;
  } else {
    await sql`insert into notices (title, content, date) values (${title}, ${content}, ${date})`;
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
