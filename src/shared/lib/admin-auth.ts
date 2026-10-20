import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "admin_session";
// JS에서 읽을 수 있는 표시용 cookie. AdminShortcut 위젯이 관리 버튼을 보여줄지만 정하고, 권한 확인에는 쓰지 않는다.
const ADMIN_HINT_COOKIE = "admin_hint";
const MAX_AGE = 60 * 60 * 24 * 7;

function adminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is not set");
  return password;
}

function safeEqual(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b);
}

// 비밀번호를 서명 키로 쓰므로 ADMIN_PASSWORD를 바꾸면 기존 로그인이 모두 풀린다.
function sign(value: string) {
  return createHmac("sha256", adminPassword()).update(value).digest();
}

export function checkPassword(input: string) {
  const sha = (s: string) => createHash("sha256").update(s).digest();
  return safeEqual(sha(input), sha(adminPassword()));
}

export async function setAdminSession() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  const store = await cookies();
  const options = { secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: MAX_AGE, path: "/" } as const;
  store.set(COOKIE, `${exp}.${sign(exp).toString("hex")}`, { ...options, httpOnly: true });
  store.set(ADMIN_HINT_COOKIE, "1", options);
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE);
  store.delete(ADMIN_HINT_COOKIE);
}

export async function isAdmin() {
  const [exp, sig] = (await cookies()).get(COOKIE)?.value.split(".") ?? [];
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(Buffer.from(sig, "hex"), sign(exp));
}

/** 관리자 페이지와 모든 Server Action 맨 앞에서 호출한다. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
