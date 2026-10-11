import { EVENT_DATES, timeline } from "@/entities/schedule/model/data";
import Icon from "@/shared/ui/Icon";

const groups = EVENT_DATES.map((date) => ({ date, items: timeline.filter((t) => t.date === date) }));

export default function TimelineSection() {
  return (
    // 좌측 메뉴 유무에 따라 같은 화면 폭에서도 쓸 수 있는 폭이 달라서, 화면 폭이 아니라 이 영역 폭을 기준으로 카드/표를 전환한다.
    <div className="@container">
      {/* 좁은 폭: 가로 스크롤 없이 한 번에 읽히도록 일자별 카드 목록으로 보여준다. */}
      <div className="flex flex-col gap-6 @min-[48rem]:hidden">
        {groups.map(({ date, items }) => (
          <section key={date}>
            <h3 className="rounded-medium bg-bg-subtle px-4 py-2 text-body-s font-bold text-fg-1">{date}</h3>
            <ul className="mt-3 flex flex-col gap-3">
              {items.map((item) => (
                <li key={`${item.time}-${item.title}`} className="rounded-large border border-border-default bg-bg-canvas p-4">
                  <p className="text-body-xs font-semibold tabular-nums text-primary-50">{item.time}</p>
                  <p className="mt-1 text-body-s font-bold text-fg-1">{item.title}</p>
                  <p className="mt-1 flex items-center gap-1 text-body-xs text-fg-3">
                    <Icon name="map-pin" className="h-3.5 w-3.5 shrink-0" />
                    {item.location}
                  </p>
                  {item.detail.length > 0 && (
                    <ul className="mt-2 space-y-0.5 border-t border-gray-20 pt-2 text-body-xs text-fg-2">
                      {item.detail.map((d) => (
                        <li key={d}>· {d}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
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
