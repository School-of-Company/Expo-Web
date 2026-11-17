import { fetchCongestionLevel } from "@/entities/congestion/server";

// 혼잡도 서버가 CORS를 열어 두지 않아 브라우저 대신 여기서 읽어 전체 단계만 넘긴다.
export async function GET() {
  const level = await fetchCongestionLevel();
  return Response.json({ level }, { headers: { "Cache-Control": "no-store" } });
}
