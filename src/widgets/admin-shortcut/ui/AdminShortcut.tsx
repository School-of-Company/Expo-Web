"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import Icon from "@/shared/ui/Icon";

const noopSubscribe = () => () => {};

/** 관리자로 로그인한 브라우저에서만 메인 페이지 맨 위에 뜨는 바로가기 */
export default function AdminShortcut() {
  // 표시용 cookie(admin_hint)라 변경 이벤트가 없다. 로그인·로그아웃 뒤 페이지를 옮겨 다시 렌더링될 때 새로 읽힌다.
  // 권한은 서버가 httpOnly 세션 cookie로 따로 확인한다.
  const isAdmin = useSyncExternalStore(
    noopSubscribe,
    () => document.cookie.split("; ").includes("admin_hint=1"),
    () => false,
  );

  if (!isAdmin) return null;

  return (
    <div className="bg-primary-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
        <p className="text-body-s font-semibold text-fg-on-primary">관리자로 로그인되어 있습니다.</p>
        <Link
          href="/admin"
          className="flex h-10 items-center gap-2 rounded-small bg-bg-canvas px-4 text-body-s font-bold text-primary-50 transition-colors duration-150 ease-out hover:bg-bg-subtle"
        >
          <Icon name="clipboard" className="h-4 w-4" />
          공지 관리로 이동
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
