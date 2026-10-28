"use client";

import { useSyncExternalStore } from "react";
import { liveStatusItems } from "@/entities/congestion/model/data";
import { toLiveStatus, type AreaStatus, type AreaType } from "./areaStatus";

const BASE_URL = (process.env.NEXT_PUBLIC_AREA_STATUS_URL ?? "https://parking.https.gsmsv.site").replace(/\/$/, "");

// 헤더·모바일 메뉴·현황 페이지가 함께 쓰므로 조회 결과와 SSE 연결을 한 벌만 둔다.
// 구독자가 하나라도 있는 동안만 연결을 유지하고, 모두 사라지면 닫는다.
let statuses: AreaStatus[] | null = null;
let source: EventSource | null = null;
let latestRequest = 0;
const listeners = new Set<() => void>();

async function refresh() {
  const request = ++latestRequest;
  try {
    const res = await fetch(`${BASE_URL}/api/public/area-statuses`, { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as AreaStatus[];
    // 늦게 도착한 이전 응답이 최신 값을 덮지 않게 한다.
    if (request !== latestRequest) return;
    statuses = data;
    listeners.forEach((notify) => notify());
  } catch {
    // 조회 실패 시 마지막 값을 그대로 둔다. 처음부터 실패하면 "확인 중"으로 보인다.
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    void refresh();
    source = new EventSource(`${BASE_URL}/api/public/events`);
    source.addEventListener("area-status-changed", () => void refresh());
    // 처음 연결과 재연결 직후에 다시 조회해, 연결이 끊긴 동안 놓친 변경을 메운다.
    source.onopen = () => void refresh();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      source?.close();
      source = null;
    }
  };
}

export function useAreaStatuses() {
  return useSyncExternalStore(subscribe, () => statuses, () => null);
}

const TYPE_BY_ICON = { users: "VENUE", car: "ROAD", parking: "PARKING" } as const satisfies Record<string, AreaType>;

/** 헤더 현황 줄에 쓰는 세 항목에 서버의 현재 상태를 입혀 돌려준다. */
export function useLiveStatusItems() {
  const current = useAreaStatuses();
  return liveStatusItems.map((item) => ({
    ...item,
    ...toLiveStatus(current?.find((s) => s.type === TYPE_BY_ICON[item.icon])),
  }));
}

export function useAreaStatus(type: AreaType) {
  const current = useAreaStatuses();
  return toLiveStatus(current?.find((s) => s.type === type));
}
