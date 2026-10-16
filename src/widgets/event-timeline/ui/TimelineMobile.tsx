"use client";

import { useState } from "react";
import { EVENT_DATES, timeline, type EventDate, type TimelineItem } from "@/entities/schedule/model/data";
import Icon from "@/shared/ui/Icon";

/** 이 시간 이상 이어지는 프로그램은 "종일 운영"으로 묶어 타임라인 위에 한 번만 보여준다. */
const ALL_DAY_MINUTES = 4 * 60;
/** 회차가 여러 개인 프로그램. 타임라인에서는 한 줄로 접어 두고 펼쳐서 회차를 본다. */
const GROUPED_TITLE = "교원 자율연수";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const startOf = (time: string) => time.split("~")[0];
const endOf = (time: string) => time.split("~")[1];
const durationOf = (time: string) => toMinutes(endOf(time)) - toMinutes(startOf(time));

type Row = { kind: "item"; item: TimelineItem } | { kind: "group"; title: string; sessions: TimelineItem[] };

function buildDay(date: EventDate) {
  const items = timeline.filter((t) => t.date === date);
  const allDay = items.filter((t) => durationOf(t.time) >= ALL_DAY_MINUTES);
  const sessions = items.filter((t) => t.title === GROUPED_TITLE);
  const rows: Row[] = items
    .filter((t) => !allDay.includes(t) && t.title !== GROUPED_TITLE)
    .map((item) => ({ kind: "item", item }));

  if (sessions.length > 0) {
    // 접힌 줄은 첫 회차가 시작하는 시각 자리에 끼워 넣는다.
    const at = rows.findIndex((r) => r.kind === "item" && toMinutes(startOf(r.item.time)) > toMinutes(startOf(sessions[0].time)));
    rows.splice(at === -1 ? rows.length : at, 0, { kind: "group", title: GROUPED_TITLE, sessions });
  }
  return { allDay, rows };
}

const DAYS = EVENT_DATES.map((date) => ({ date, ...buildDay(date) }));

function TimeCell({ time }: { time: string }) {
  return (
    <p className="w-12 shrink-0 pt-0.5 text-body-xs font-bold leading-tight tabular-nums text-primary-50">
      {startOf(time)}
      <span className="block font-medium text-fg-3">~{endOf(time)}</span>
    </p>
  );
}

function SessionGroup({ title, sessions }: { title: string; sessions: TimelineItem[] }) {
  const [open, setOpen] = useState(false);
  const range = `${startOf(sessions[0].time)}~${endOf(sessions[sessions.length - 1].time)}`;

  return (
    <li className="flex gap-3 py-3">
      <TimeCell time={range} />
      <div className="min-w-0 flex-1">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-2 text-left"
        >
          <span>
            <span className="block text-body-s font-bold text-fg-1">{title}</span>
            <span className="text-body-xs text-fg-3">{sessions.length}개 회차 · 회차별 강의실 상이</span>
          </span>
          <Icon
            name="chevron-down"
            className={`mt-0.5 h-5 w-5 shrink-0 text-fg-3 transition-transform duration-200 ease-out ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul className="mt-2 flex flex-col gap-2 rounded-medium bg-bg-subtle p-3">
            {sessions.map((s) => (
              <li key={s.time} className="text-body-xs">
                <p className="font-semibold tabular-nums text-fg-1">
                  {s.time} <span className="font-medium text-fg-3">· {s.location}</span>
                </p>
                <p className="mt-0.5 break-keep text-fg-2">{s.detail.join(" ")}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

/**
 * 좁은 폭 전용 일정표. 항목이 많아 카드로 늘어놓으면 스크롤이 길어지므로
 * 날짜 탭으로 하루씩 보여주고, 종일 운영 프로그램과 회차형 프로그램은 묶어서 줄 수를 줄인다.
 */
export default function TimelineMobile() {
  const [active, setActive] = useState(0);
  const day = DAYS[active];

  return (
    <div>
      <div role="tablist" aria-label="행사 일자" className="grid grid-cols-2 gap-1 rounded-large bg-bg-subtle p-1">
        {DAYS.map((d, i) => {
          const isActive = i === active;
          return (
            <button
              key={d.date}
              type="button"
              role="tab"
              id={`timeline-tab-${i}`}
              aria-selected={isActive}
              aria-controls="timeline-panel"
              onClick={() => setActive(i)}
              className={`rounded-medium py-2 text-body-s font-bold transition-colors duration-150 ease-out ${
                isActive ? "bg-bg-canvas text-primary-50 shadow-1" : "text-fg-3"
              }`}
            >
              {d.date}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id="timeline-panel" aria-labelledby={`timeline-tab-${active}`} className="mt-4">
        {day.allDay.length > 0 && (
          <section aria-label="종일 운영" className="rounded-large border border-border-default p-4">
            <p className="text-body-xs font-bold text-primary-50">
              종일 운영 <span className="tabular-nums">{day.allDay[0].time}</span>
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {day.allDay.map((t) => (
                <li key={t.title} className="flex items-baseline justify-between gap-3 text-body-xs">
                  <span className="font-semibold text-fg-1">{t.title}</span>
                  <span className="shrink-0 text-right text-fg-3">{t.location}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ul className="mt-2 divide-y divide-border-default">
          {day.rows.map((row) =>
            row.kind === "group" ? (
              <SessionGroup key={row.title} title={row.title} sessions={row.sessions} />
            ) : (
              <li key={`${row.item.time}-${row.item.title}`} className="flex gap-3 py-3">
                <TimeCell time={row.item.time} />
                <div className="min-w-0 flex-1">
                  <p className="text-body-s font-bold text-fg-1">{row.item.title}</p>
                  <p className="flex items-center gap-1 text-body-xs text-fg-3">
                    <Icon name="map-pin" className="h-3.5 w-3.5 shrink-0" />
                    {row.item.location}
                  </p>
                  {row.item.detail.length > 0 && (
                    <p className="mt-1 break-keep text-body-xs text-fg-2">{row.item.detail.join(" · ")}</p>
                  )}
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}
