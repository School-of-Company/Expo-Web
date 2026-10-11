"use client";

import { useState, useTransition } from "react";
import Button from "@/shared/ui/Button";
import ConfirmDialog from "@/shared/ui/ConfirmDialog";
import { logout } from "../api/actions";

export default function LogoutButton() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <Button variant="tertiary" size="s" onClick={() => setOpen(true)}>
        로그아웃
      </Button>
      <ConfirmDialog
        open={open}
        title="로그아웃하시겠습니까?"
        confirmLabel="로그아웃"
        pending={pending}
        onConfirm={() => startTransition(() => logout())}
        onCancel={() => setOpen(false)}
      >
        공지를 다시 관리하려면 비밀번호를 입력해야 합니다.
      </ConfirmDialog>
    </>
  );
}
