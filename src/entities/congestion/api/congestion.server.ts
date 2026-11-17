import { CONGESTION_URL } from "@/shared/config/site";
import { toCongestionLevel, type CongestionLevel } from "../model/level";

/** 혼잡도 서버의 현재 전체 단계를 읽는다. 응답이 없거나 모양이 어긋나면 "unknown"이다. */
export async function fetchCongestionLevel(): Promise<CongestionLevel> {
  try {
    const res = await fetch(`${CONGESTION_URL}/api/state`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!res.ok) return "unknown";
    const data: unknown = await res.json();
    const total = (data as { total?: { level?: unknown; online_cameras?: unknown } } | null)?.total;
    // 켜진 카메라가 하나도 없으면 "여유"로 보이지 않게 확인 중으로 둔다.
    if (!total || total.online_cameras === 0) return "unknown";
    return toCongestionLevel(total.level);
  } catch {
    return "unknown";
  }
}
