import { notFound } from "next/navigation";
import { getNotice } from "@/entities/notice/api/notices";
import { NoticeForm } from "@/features/notice-admin";
import { requireAdmin } from "@/shared/lib/admin-auth";

export default async function Page(props: PageProps<"/admin/[id]">) {
  await requireAdmin();
  const { id } = await props.params;
  const notice = await getNotice(id);
  if (!notice) notFound();

  return (
    <>
      <h1 className="mb-6 text-heading-s font-bold text-fg-1">공지 수정</h1>
      <NoticeForm notice={notice} />
    </>
  );
}
