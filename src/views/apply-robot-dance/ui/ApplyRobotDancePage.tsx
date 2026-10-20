import { SectionPage } from "@/widgets/section-page";
import { EVENT_DATES, type EventDate } from "@/entities/schedule/model/data";

interface Show {
  title: string;
  times: string[];
}

const SHOWS: Record<EventDate, Show[]> = {
  "10.31(토)": [
    { title: "로봇개(GO2) 공연", times: ["14:00", "15:00", "16:00"] },
    { title: "알파미니·파이보 로봇 댄스", times: ["14:30", "15:30"] },
  ],
  "11.1(일)": [
    { title: "로봇개(GO2) 공연", times: ["10:00", "11:00", "14:00", "15:00"] },
    { title: "알파미니·파이보 로봇 댄스", times: ["10:30", "11:30", "14:30"] },
  ],
};

export default function ApplyRobotDancePage() {
  return (
    <SectionPage
      title="로봇 댄스 공연"
      desc="박람회 기간 동안 로봇개(GO2)와 알파미니·파이보 로봇이 펼치는 댄스 공연을 만나보세요."
      showNav={false}
    >
      <h2 className="text-heading-s font-bold text-fg-1">로봇 댄스 공연</h2>
      <p className="mt-2 text-body-s text-fg-2">공연 일정: 10.31(토) ~ 11.1(일)</p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {EVENT_DATES.map((date) => (
          <section key={date} aria-label={date} className="rounded-xlarge border border-border-default bg-bg-canvas p-5">
            <p className="text-body-m font-bold text-primary-50">{date}</p>
            <ul className="mt-3 flex flex-col gap-3">
              {SHOWS[date].map((show) => (
                <li key={show.title}>
                  <p className="text-body-s font-bold text-fg-1">{show.title}</p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {show.times.map((t) => (
                      <li key={t} className="rounded-pill bg-bg-subtle px-3 py-1 text-body-xs font-semibold tabular-nums text-fg-2">
                        {t}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-4 text-body-s font-bold text-fg-1">※ 공연별 소요 시간: 각 5분</p>
    </SectionPage>
  );
}
