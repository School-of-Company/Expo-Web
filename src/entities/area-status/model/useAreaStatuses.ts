"use client";

import { useSyncExternalStore } from "react";
import { liveStatusItems } from "@/entities/congestion/@x/area-status";
import { fetchAreaStatuses, openAreaStatusEvents } from "../api/areaStatuses";
import { toLiveStatus, type AreaStatus, type AreaType } from "./areaStatus";

// 헤더·모바일 메뉴·현황 페이지가 함께 쓰므로 조회 결과와 SSE 연결을 한 벌만 둔다.
// 구독자가 있고 탭이 보이는 동안만 연결을 유지한다. 탭이 숨겨지거나 구독자가 모두 사라지면 닫는다.
let statuses: AreaStatus[] | null = null;
let source: EventSource | null = null;
let controller: AbortController | null = null;
let refreshTimer: ReturnType<typeof setTimeout> | undefined;
let failures = 0;
let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
let reconnects = 0;
let openedAt = 0;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());

/** 실패가 이어질수록 2초, 4초, 8초… 로 늘리고 1분에서 멈춘다. */
const backoff = (attempt: number) => Math.min(1000 * 2 ** attempt, 60_000);

/** 행사장·도로·주차 변경이 연달아 와도 한 번만 조회한다. */
function scheduleRefresh(delay = 200) {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(refresh, delay);
}

async function refresh() {
  // 새 조회를 시작하면 진행 중인 이전 조회는 취소해, 늦게 온 이전 응답이 최신 값을 덮지 않게 한다.
  controller?.abort();
  const current = (controller = new AbortController());
  const timeout = setTimeout(() => current.abort(), 10_000);
  let data = null;
  try {
    data = await fetchAreaStatuses(current.signal);
  } catch {
    // 네트워크 오류·타임아웃은 아래에서 실패로 센다.
  } finally {
    clearTimeout(timeout);
  }
  // 더 새 조회가 시작됐거나 연결을 닫아 취소된 경우다.
  if (current !== controller) return;
  if (data) {
    failures = 0;
    statuses = data;
    notify();
    return;
  }
  failures++;
  // 세 번 연달아 실패하면 오래된 값이 실시간처럼 보이지 않게 "확인 중"으로 돌린다.
  if (failures >= 3 && statuses) {
    statuses = null;
    notify();
  }
  scheduleRefresh(backoff(failures));
}

function connect() {
  source = openAreaStatusEvents();
  source.addEventListener("area-status-changed", () => scheduleRefresh());
  // 첫 조회는 연결이 열릴 때 한다. 재연결 직후에도 다시 조회해 끊긴 동안 놓친 변경을 메운다.
  source.onopen = () => {
    openedAt = Date.now();
    scheduleRefresh();
  };
  // 브라우저는 4xx·5xx 응답으로 CLOSED가 되면 다시 잇지 않고, 그 밖의 끊김은 백오프 없이 몇 초마다 다시 잇는다.
  // 그래서 오류가 나면 직접 닫고 백오프를 두고 다시 연다.
  source.onerror = () => {
    source?.close();
    source = null;
    // 30초 넘게 유지된 연결이었으면 일시적인 끊김으로 보고 대기 시간을 처음부터 센다.
    if (openedAt && Date.now() - openedAt > 30_000) reconnects = 0;
    openedAt = 0;
    reconnectTimer = setTimeout(connect, backoff(reconnects++));
  };
}

function disconnect() {
  source?.close();
  source = null;
  clearTimeout(reconnectTimer);
  clearTimeout(refreshTimer);
  controller?.abort();
  controller = null;
}

// 다시 보이면 새로 연결하고, 연결이 열리면서 숨겨진 동안 바뀐 상태를 다시 조회한다.
function onVisibilityChange() {
  disconnect();
  if (!document.hidden) connect();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!document.hidden) connect();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      disconnect();
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
