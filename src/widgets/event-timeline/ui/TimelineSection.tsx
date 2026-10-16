import { EVENT_DATES, timeline } from "@/entities/schedule/model/data";
import TimelineMobile from "./TimelineMobile";

const groups = EVENT_DATES.map((date) => ({ date, items: timeline.filter((t) => t.date === date) }));

export default function TimelineSection() {
  return (
    // 좌측 메뉴 유무에 따라 같은 화면 폭에서도 쓸 수 있는 폭이 달라서, 화면 폭이 아니라 이 영역 폭을 기준으로 카드/표를 전환한다.
    <div className="@container">
      {/* 좁은 폭: 항목이 많아 날짜 탭과 묶음 표시로 줄 수를 줄인 전용 목록을 쓴다. */}
      <div className="@min-[48rem]:hidden">
        <TimelineMobile />
      </div>

      <div className="hidden overflow-x-auto rounded-xlarge border border-border-default @min-[48rem]:block">
        <table className="w-full border-collapse text-left text-body-s">
          <thead>
            <tr className="border-b-2 border-fg-1 bg-bg-canvas text-fg-1">
              <th className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">일자</th>
              <th className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">구분</th>
              <th className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">시간</th>
              <th className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">장소</th>
              <th className="h-12 w-full px-4 text-center font-bold">주요내용</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(({ date, items }, dateIndex) =>
              items.map((item, i) => (
                <tr
                  key={`${date}-${item.time}-${item.title}`}
                  className={i === 0 && dateIndex > 0 ? "border-t-2 border-gray-40" : "border-t border-gray-20"}
                >
                  {i === 0 && (
                    <td
                      rowSpan={items.length}
                      className="whitespace-nowrap border-r border-gray-20 bg-bg-subtle px-4 py-3 text-center font-bold text-fg-1"
                    >
                      {date}
                    </td>
                  )}
                  <td className="whitespace-nowrap border-r border-gray-20 px-4 py-3 text-center font-semibold text-fg-1">{item.title}</td>
                  <td className="whitespace-nowrap border-r border-gray-20 px-4 py-3 text-center text-fg-2">{item.time}</td>
                  <td className="whitespace-nowrap border-r border-gray-20 px-4 py-3 text-center text-fg-2">{item.location}</td>
                  <td className="px-4 py-3 text-fg-2">
                    <ul className="space-y-0.5">
                      {item.detail.map((d) => (
                        <li key={d}>· {d}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
