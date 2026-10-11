import { getNotices } from "@/entities/notice/api/notices";
import { AdminNoticeList, LogoutButton } from "@/features/notice-admin";
import { requireAdmin } from "@/shared/lib/admin-auth";

export default async function Page() {
  await requireAdmin();
  const notices = await getNotices();

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-heading-s font-bold text-fg-1">공지 관리</h1>
        <LogoutButton />
      </div>

      <AdminNoticeList notices={notices} />
    </>
  );
}
