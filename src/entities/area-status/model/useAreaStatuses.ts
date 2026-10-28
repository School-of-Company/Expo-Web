"use client";

import { useSyncExternalStore } from "react";
import { liveStatusItems } from "@/entities/congestion/@x/area-status";
import { fetchAreaStatuses, openAreaStatusEvents } from "../api/areaStatuses";
import { toLiveStatus, type AreaStatus, type AreaType } from "./areaStatus";

// 헤더·모바일 메뉴·현황 페이지가 함께 쓰므로 조회 결과와 SSE 연결을 한 벌만 둔다.
// 구독자가 하나라도 있는 동안만 연결을 유지하고, 모두 사라지면 닫는다.
let statuses: AreaStatus[] | null = null;
let source: EventSource | null = null;
let latestRequest = 0;
let appliedRequest = 0;
const listeners = new Set<() => void>();

async function refresh() {
  const request = ++latestRequest;
  try {
    const data = await fetchAreaStatuses();
    // 이미 적용된 응답보다 먼저 시작한 요청의 응답만 버린다. 나중 요청이 실패해도 앞선 정상 응답은 쓴다.
    if (!data || request < appliedRequest) return;
    appliedRequest = request;
    statuses = data;
    listeners.forEach((notify) => notify());
  } catch {
    // 조회 실패 시 마지막 값을 그대로 둔다. 처음부터 실패하면 "확인 중"으로 보인다.
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    source = openAreaStatusEvents();
    source.addEventListener("area-status-changed", () => void refresh());
    // 첫 조회는 연결이 열릴 때 한다. 재연결 직후에도 다시 조회해 끊긴 동안 놓친 변경을 메운다.
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
