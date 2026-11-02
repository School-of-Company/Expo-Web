import { getVisitCounts, recordVisit } from "@/entities/visit/server";

const BOT_UA = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse/i;

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
