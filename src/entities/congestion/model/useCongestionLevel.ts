"use client";

import { useSyncExternalStore } from "react";
import { toCongestionLevel, type CongestionLevel } from "./level";

const POLL_MS = 5000;

// 헤더가 데스크톱·모바일 두 곳에서 쓰므로 조회는 한 벌만 돌린다. 탭이 숨겨지면 멈춘다.
let level: CongestionLevel = "unknown";
let timer: ReturnType<typeof setTimeout> | undefined;
let controller: AbortController | null = null;
const listeners = new Set<() => void>();

function set(next: CongestionLevel) {
  if (next === level) return;
  level = next;
  listeners.forEach((listener) => listener());
}

async function poll() {
  controller?.abort();
  const current = (controller = new AbortController());
  let next: CongestionLevel = "unknown";
  try {
    const res = await fetch("/api/congestion", { cache: "no-store", signal: current.signal });
    if (res.ok) next = toCongestionLevel(((await res.json()) as { level?: unknown }).level);
  } catch {
    // 취소·네트워크 오류는 확인 중으로 둔다.
  }
  if (current !== controller) return;
  set(next);
  timer = setTimeout(poll, POLL_MS);
}

function stop() {
  clearTimeout(timer);
  controller?.abort();
  controller = null;
}

function onVisibilityChange() {
  stop();
  if (!document.hidden) poll();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!document.hidden) poll();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stop();
    }
  };
}

export function useCongestionLevel() {
  return useSyncExternalStore(subscribe, () => level, () => "unknown" as const);
}
