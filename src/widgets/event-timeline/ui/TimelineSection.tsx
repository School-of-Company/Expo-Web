import { timeline } from "@/entities/schedule/model/data";

const DATES = ["10.31(토)", "11.1(일)"] as const;

export default function TimelineSection() {
  return (
    <div className="overflow-x-auto rounded-xlarge border border-border-default">
      <table className="w-full min-w-[640px] table-fixed border-collapse text-left text-body-s">
        <colgroup>
          <col className="w-[10%]" />
          <col className="w-[22%]" />
          <col className="w-[14%]" />
          <col className="w-[12%]" />
          <col className="w-[42%]" />
        </colgroup>
        <thead>
          <tr className="border-b-2 border-secondary-70 bg-bg-canvas text-fg-1">
            <th className="h-12 border-r border-border-default px-4 text-center font-bold">일자</th>
            <th className="h-12 border-r border-border-default px-4 text-center font-bold">구분</th>
            <th className="h-12 border-r border-border-default px-4 text-center font-bold">시간</th>
            <th className="h-12 border-r border-border-default px-4 text-center font-bold">장소</th>
            <th className="h-12 px-4 text-center font-bold">주요내용</th>
          </tr>
        </thead>
        <tbody>
          {DATES.map((date) => {
            const items = timeline.filter((t) => t.date === date);

            return items.map((item, i) => (
              <tr key={`${date}-${item.time}-${item.title}`} className="border-t border-gray-20">
                {i === 0 && (
                  <td rowSpan={items.length} className="border-r border-gray-20 bg-primary-10 px-4 py-3 text-center font-bold text-fg-1">
                    {date}
                  </td>
                )}
                <td className="border-r border-gray-20 px-4 py-3 text-center font-semibold text-fg-1">{item.title}</td>
                <td className="border-r border-gray-20 px-4 py-3 text-center text-fg-2">{item.time}</td>
                <td className="border-r border-gray-20 px-4 py-3 text-center text-fg-2">{item.location}</td>
                <td className="px-4 py-3 text-fg-2">
                  <ul className="space-y-0.5">
                    {item.detail.map((d) => (
                      <li key={d}>· {d}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}
