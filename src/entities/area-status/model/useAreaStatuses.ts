"use client";

import { useSyncExternalStore } from "react";
import { liveStatusItems } from "@/entities/congestion/@x/area-status";
import { fetchAreaStatuses, openAreaStatusEvents } from "../api/areaStatuses";
import { toLiveStatus, type AreaStatus, type AreaType } from "./areaStatus";

// 헤더·모바일 메뉴·현황 페이지가 함께 쓰므로 조회 결과와 SSE 연결을 한 벌만 둔다.
// 구독자가 하나라도 있는 동안만 연결을 유지하고, 모두 사라지면 닫는다.
let statuses: AreaStatus[] | null = null;
let source: EventSource | null = null;
let controller: AbortController | null = null;
let refreshTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

/** 행사장·도로·주차 변경이 연달아 와도 한 번만 조회한다. */
function scheduleRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(refresh, 200);
}

async function refresh() {
  // 새 조회를 시작하면 진행 중인 이전 조회는 취소해, 늦게 온 이전 응답이 최신 값을 덮지 않게 한다.
  controller?.abort();
  const current = (controller = new AbortController());
  try {
    const data = await fetchAreaStatuses(current.signal);
    if (!data) return;
    statuses = data;
    listeners.forEach((notify) => notify());
  } catch {
    // 조회 실패·취소 시 마지막 값을 그대로 둔다. 처음부터 실패하면 "확인 중"으로 보인다.
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    source = openAreaStatusEvents();
    source.addEventListener("area-status-changed", scheduleRefresh);
    // 첫 조회는 연결이 열릴 때 한다. 재연결 직후에도 다시 조회해 끊긴 동안 놓친 변경을 메운다.
    source.onopen = scheduleRefresh;
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      source?.close();
      source = null;
      clearTimeout(refreshTimer);
      controller?.abort();
      controller = null;
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
