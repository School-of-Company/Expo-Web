import { NoticeForm } from "@/features/notice-admin";
import { requireAdmin } from "@/shared/lib/admin-auth";

export default async function Page() {
  await requireAdmin();

  return (
    <>
      <h1 className="mb-6 text-heading-s font-bold text-fg-1">새 공지</h1>
      <NoticeForm />
    </>
  );
}
