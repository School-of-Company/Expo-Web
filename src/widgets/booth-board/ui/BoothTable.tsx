import type { Booth } from "@/entities/booth/model/data";
import Badge from "@/shared/ui/Badge";

/**
 * 부스 목록. 학생마당·교사마당이 같은 마크업을 쓰므로 공용으로 추출했다.
 *
 * 좁은 폭에서는 가로 스크롤 없이 읽히도록 부스별 카드로, 넓은 폭에서는 표로 보여준다.
 * 전환 기준은 화면 폭이 아니라 이 영역의 폭이다.
 *
 * 표에서는 셀 텍스트가 인접 셀로 넘치던 문제(#20)를 막기 위해 각 셀에 break-words를 준다.
 * 부스번호 열은 "C02"가 "C0/2"로 쪼개지지 않을 만큼 폭을 잡아 둔다.
 * 연번은 데이터에 두지 않고 목록 순서로 매긴다. 부스번호가 아직 없으면 칸을 비워 두고,
 * 프로그램 분야가 있는 목록에서만 분야 열을 더한다.
 */
export default function BoothTable({ booths, caption, nameLabel = "부스 이름" }: { booths: Booth[]; caption: string; nameLabel?: string }) {
  const hasField = booths.some((b) => b.field);

  return (
    <div className="@container">
      <ul aria-label={caption} className="flex flex-col gap-3 @min-[48rem]:hidden">
        {booths.map((b, i) => (
          <li key={i} className="rounded-large border border-border-default bg-bg-canvas p-4">
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-body-xs font-semibold text-fg-3">{i + 1}</span>
              {b.no && <Badge variant="solid-pastel">{b.no}</Badge>}
              <p className="min-w-0 break-words text-body-s font-bold text-fg-1">{b.name}</p>
            </div>
            {b.field && <p className="mt-1 text-body-xs font-semibold text-fg-3">{b.field}</p>}
            <p className="mt-2 break-words text-body-s text-fg-2">{b.title}</p>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto rounded-xlarge border border-border-default @min-[48rem]:block">
        <table className="w-full table-fixed border-collapse text-left text-body-s">
          <caption className="sr-only">{caption}</caption>
          {hasField ? (
            <colgroup>
              <col className="w-[7%]" />
              <col className="w-[10%]" />
              <col className="w-[22%]" />
              <col className="w-[16%]" />
              <col className="w-[45%]" />
            </colgroup>
          ) : (
            <colgroup>
              <col className="w-[8%]" />
              <col className="w-[12%]" />
              <col className="w-[28%]" />
              <col className="w-[52%]" />
            </colgroup>
          )}
          <thead>
            <tr className="border-b-2 border-fg-1 bg-bg-canvas text-fg-1">
              <th scope="col" className="h-12 border-r border-border-default px-4 text-center font-bold">
                연번
              </th>
              <th scope="col" className="h-12 border-r border-border-default px-4 text-center font-bold">
                부스번호
              </th>
              <th scope="col" className="h-12 border-r border-border-default px-4 text-center font-bold">
                {nameLabel}
              </th>
              {hasField && (
                <th scope="col" className="h-12 border-r border-border-default px-4 text-center font-bold">
                  프로그램 분야
                </th>
              )}
              <th scope="col" className="h-12 px-4 text-center font-bold">
                프로그램 제목
              </th>
            </tr>
          </thead>
          <tbody>
            {booths.map((b, i) => (
              <tr key={i} className="border-t border-gray-20">
                <td className="border-r border-gray-20 px-4 py-3 text-center text-fg-3">{i + 1}</td>
                <td className="break-words border-r border-gray-20 bg-bg-subtle px-4 py-3 text-center font-bold text-fg-1">
                  {b.no}
                </td>
                <td className="break-words border-r border-gray-20 px-4 py-3 text-center text-fg-2">{b.name}</td>
                {hasField && <td className="break-words border-r border-gray-20 px-4 py-3 text-center text-fg-3">{b.field}</td>}
                <td className="break-words px-4 py-3 text-center text-fg-2">{b.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
