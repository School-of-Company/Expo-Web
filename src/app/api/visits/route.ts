import { getVisitCounts, recordVisit } from "@/entities/visit/api/visits";

/** 검색엔진·미리보기 봇은 세지 않는다. 사람이 연 페이지만 페이지뷰로 친다. */
const BOT_UA = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse/i;

/** 푸터가 페이지를 열 때마다(새로고침 포함) 호출해 페이지뷰를 1 올리고 TODAY/TOTAL을 받아 간다. */
export async function POST(request: Request) {
  const isBot = BOT_UA.test(request.headers.get("user-agent") ?? "");
  try {
    const counts = isBot ? await getVisitCounts() : await recordVisit();
    return Response.json(counts, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("visit count failed", error);
    return Response.json({ error: "visit count failed" }, { status: 500 });
  }
}
