"use client";

import { useActionState } from "react";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { login } from "../api/actions";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <Input id="password" name="password" type="password" label="비밀번호" required autoFocus error={error} />
      <Button type="submit" disabled={pending} fullWidth>
        {pending ? "확인 중…" : "로그인"}
      </Button>
    </form>
  );
}
