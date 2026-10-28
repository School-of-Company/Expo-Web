import { AREA_STATUS_URL } from "@/shared/config/site";
import { parseAreaStatuses, type AreaStatus } from "../model/areaStatus";

/** 현재 상태 목록을 읽는다. 응답이 실패했거나 모양이 어긋나면 null이다. */
export async function fetchAreaStatuses(): Promise<AreaStatus[] | null> {
  const res = await fetch(`${AREA_STATUS_URL}/api/public/area-statuses`, { cache: "no-store" });
  if (!res.ok) return null;
  return parseAreaStatuses(await res.json());
}

/** 상태가 바뀔 때마다 area-status-changed 이벤트를 보내는 SSE 연결을 연다. */
export function openAreaStatusEvents() {
  return new EventSource(`${AREA_STATUS_URL}/api/public/events`);
}
