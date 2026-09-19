import PageHero from "@/shared/ui/PageHero";
import { LocalNav } from "@/widgets/local-nav";
import { ExternalApplyPanel } from "@/widgets/external-apply";
import { studentsNavItems } from "@/shared/config/students-nav";
import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";
import { booths } from "@/entities/booth/model/data";

export default function StudentsPage() {
  return (
    <div>
      <PageHero
        title="체험 부스 안내"
        desc="AI·SW 한마당 - 체험 부스부터 골든벨, AI교육원 탐방까지 학생들을 위한 프로그램을 확인하세요."
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        <LocalNav title="학생마당 (AI·SW교육)" items={studentsNavItems} />

        <div className="min-w-0 flex-1 space-y-10">
          <div>
            <h2 className="text-heading-s font-bold text-fg-1">체험 부스 안내</h2>

            <div className="mt-4 overflow-x-auto rounded-xlarge border border-border-default">
              <table className="w-full min-w-[640px] table-fixed border-collapse text-left text-body-s">
                <colgroup>
                  <col className="w-[10%]" />
                  <col className="w-[20%]" />
                  <col className="w-[12%]" />
                  <col className="w-[16%]" />
                  <col className="w-[42%]" />
                </colgroup>
                <thead>
                  <tr className="border-b-2 border-secondary-70 bg-bg-canvas text-fg-1">
                    <th className="h-12 border-r border-border-default px-4 text-center font-bold">부스번호</th>
                    <th className="h-12 border-r border-border-default px-4 text-center font-bold">부스 이름</th>
                    <th className="h-12 border-r border-border-default px-4 text-center font-bold">유형</th>
                    <th className="h-12 border-r border-border-default px-4 text-center font-bold">참여대상</th>
                    <th className="h-12 px-4 text-center font-bold">프로그램 제목</th>
                  </tr>
                </thead>
                <tbody>
                  {booths.map((b) => (
                    <tr key={b.no} className="border-t border-gray-20">
                      <td className="border-r border-gray-20 bg-primary-10 px-4 py-3 text-center font-bold text-fg-1">
                        {b.no}
                      </td>
                      <td className="border-r border-gray-20 px-4 py-3 text-center text-fg-2">{b.name}</td>
                      <td className="border-r border-gray-20 px-4 py-3 text-center text-fg-2">{b.type}</td>
                      <td className="border-r border-gray-20 px-4 py-3 text-center text-fg-2">{b.audience}</td>
                      <td className="px-4 py-3 text-center text-fg-2">{b.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ExternalApplyPanel
            href={EXTERNAL_APPLY_LINKS.register}
            label="사전등록 하러가기"
            title="학생 사전등록"
            tagline="AI·SW 한마당, 사전등록하고 더 편하게 즐기세요"
            body={
              "체험 부스와 골든벨, AI교육원 탐방까지 한 번에 신청할 수 있습니다.\n사전등록 시 현장 대기 시간을 줄일 수 있습니다."
            }
          />
        </div>
      </div>
    </div>
  );
}
