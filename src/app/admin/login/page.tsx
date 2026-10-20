import { redirect } from "next/navigation";
import { LoginForm } from "@/features/notice-admin";
import { isAdmin } from "@/shared/lib/admin-auth";

export default async function Page() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-6 text-heading-s font-bold text-fg-1">관리자 로그인</h1>
      <LoginForm />
    </div>
  );
}
