import { sql } from "@/shared/lib/db";
import type { VisitCounts } from "../model/types";

/**
 * 오늘(한국 시간) 페이지뷰를 1 올리고 올린 뒤의 TODAY/TOTAL을 돌려준다.
 * 같은 문장 안의 다른 select는 올리기 전 값을 보므로, TOTAL은 오늘을 뺀 합계에 올린 오늘 값을 더한다.
 */
export async function recordVisit(): Promise<VisitCounts> {
  const [row] = await sql`
    with today as (
      insert into daily_visits (date, count)
      values ((now() at time zone 'Asia/Seoul')::date, 1)
      on conflict (date) do update set count = daily_visits.count + 1
      returning date, count
    )
    select
      today.count as today,
      today.count + (select coalesce(sum(count), 0) from daily_visits where date <> today.date) as total
    from today
  `;
  return { today: Number(row.today), total: Number(row.total) };
}

/** 올리지 않고 지금 TODAY/TOTAL만 읽는다. */
export async function getVisitCounts(): Promise<VisitCounts> {
  const [row] = await sql`
    select
      coalesce(sum(count) filter (where date = (now() at time zone 'Asia/Seoul')::date), 0) as today,
      coalesce(sum(count), 0) as total
    from daily_visits
  `;
  return { today: Number(row.today), total: Number(row.total) };
}
