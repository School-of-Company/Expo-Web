// 실행: node --env-file=.env.local scripts/db-setup.mts
// notices, daily_visits 테이블을 만든다. 이미 있으면 아무것도 하지 않으므로 여러 번 실행해도 안전하다.
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

await sql`create table if not exists notices (
  id serial primary key,
  title text not null,
  content text not null,
  date date not null default current_date
)`;

await sql`alter table notices add column if not exists attachments jsonb not null default '[]'`;

// 푸터 TODAY/TOTAL 페이지뷰. 날짜는 한국 시간 기준이다.
await sql`create table if not exists daily_visits (
  date date primary key,
  count integer not null default 0
)`;

console.log("notices, daily_visits tables ready");
