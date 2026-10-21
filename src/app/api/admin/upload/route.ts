import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdmin } from "@/shared/lib/admin-auth";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await request.json()) as HandleUploadBody;
  try {
    return NextResponse.json(
      await handleUpload({
        body,
        request,
        // 영상 제외, 파일당 20MB. 영상은 클라이언트에서 막는다(관리자 전용이라 서버 형식 제한 없음)
        onBeforeGenerateToken: async () => ({ addRandomSuffix: true, maximumSizeInBytes: 20 * 1024 * 1024 }),
      }),
    );
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
