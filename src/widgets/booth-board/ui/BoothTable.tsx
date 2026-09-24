import type { Booth } from "@/entities/booth/model/data";

/**
 * 부스 목록 표. 학생마당·교사마당이 같은 마크업을 쓰므로 공용으로 추출했다.
 *
 * 셀 텍스트가 인접 셀로 넘치던 문제(#20)를 막기 위해 각 셀에 break-words를 준다.
 * 표 자체는 min-w로 최소 폭을 지키고 좁은 화면에서는 가로 스크롤한다.
 */
export default function BoothTable({ booths, caption }: { booths: Booth[]; caption: string }) {
  return (
    <div className="scroll-shadow-x overflow-x-auto rounded-xlarge border border-border-default">
      <table className="w-full min-w-[640px] table-fixed border-collapse text-left text-body-s">
        <caption className="sr-only">{caption}</caption>
        <colgroup>
          <col className="w-[10%]" />
          <col className="w-[20%]" />
          <col className="w-[12%]" />
          <col className="w-[16%]" />
          <col className="w-[42%]" />
        </colgroup>
        <thead>
          <tr className="border-b-2 border-secondary-70 bg-bg-canvas text-fg-1">
            <th scope="col" className="h-12 border-r border-border-default px-4 text-center font-bold">
              부스번호
            </th>
            <th scope="col" className="h-12 border-r border-border-default px-4 text-center font-bold">
              부스 이름
            </th>
            <th scope="col" className="h-12 border-r border-border-default px-4 text-center font-bold">
              유형
            </th>
            <th scope="col" className="h-12 border-r border-border-default px-4 text-center font-bold">
              참여대상
            </th>
            <th scope="col" className="h-12 px-4 text-center font-bold">
              프로그램 제목
            </th>
          </tr>
        </thead>
        <tbody>
          {booths.map((b) => (
            <tr key={b.no} className="border-t border-gray-20">
              <td className="break-words border-r border-gray-20 bg-primary-10 px-4 py-3 text-center font-bold text-fg-1">
                {b.no}
              </td>
              <td className="break-words border-r border-gray-20 px-4 py-3 text-center text-fg-2">{b.name}</td>
              <td className="break-words border-r border-gray-20 px-4 py-3 text-center text-fg-2">{b.type}</td>
              <td className="break-words border-r border-gray-20 px-4 py-3 text-center text-fg-2">{b.audience}</td>
              <td className="break-words px-4 py-3 text-center text-fg-2">{b.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
