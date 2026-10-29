import SectionPage from "@/widgets/section-page/ui/SectionPage";
import Badge from "@/shared/ui/Badge";
import ApplyCtaButton from "@/shared/ui/ApplyCtaButton";
import Icon from "@/shared/ui/Icon";
import BrandMark from "@/shared/ui/logos/BrandMark";
import { trainingPrograms } from "@/entities/training-program/model/data";
import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";

const applyNotice = (
  <>
    사전 신청 기간: <strong className="font-bold text-fg-1">2026.10.23.(금) 09:00 ~ 2026.10.29.(목) 17:00</strong>까지
    <br />
    ※ 선착순 사전 마감되며, 잔여석에 한해 당일 연수 장소에서 현장 등록이 가능합니다.
  </>
);

export default function TeachersTrainingPage() {
  return (
    <SectionPage
      title="교사 연수"
      desc="삼성·구글·애플과 함께 2030 미래교실을 경험하고, 내 수업에 새로운 가능성을 더해 보세요!"
    >
      <h2 className="text-heading-s font-bold text-fg-1">교사 연수</h2>

      {/* 행사 일정표와 같은 형식. 좌측 메뉴 유무에 따라 쓸 수 있는 폭이 달라 이 영역 폭을 기준으로 카드/표를 전환한다. */}
      <div className="mt-4 @container">
        {/* 좁은 폭: 회사별로 묶어 회차를 카드로 보여준다. */}
        <div className="flex flex-col gap-6 @min-[48rem]:hidden">
          {trainingPrograms.map((p) => (
            <section key={p.id}>
              <h3 className="flex items-center gap-3 rounded-medium bg-bg-subtle px-4 py-2 text-body-s font-bold text-fg-1">
                {p.brand && (
                  <span className="flex h-10 w-16 shrink-0 items-center justify-center overflow-hidden">
                    <BrandMark brand={p.brand} className="origin-center scale-[0.66]" />
                  </span>
                )}
                {p.title}
                <span className="ml-auto flex items-center gap-1 text-body-xs font-semibold text-fg-3">
                  <Icon name="map-pin" className="h-3.5 w-3.5 shrink-0" />
                  {p.place}
                </span>
              </h3>
              <ul className="mt-3 flex flex-col gap-3">
                {p.sessions.map((s) => (
                  <li key={s.round} className="rounded-large border border-border-default bg-bg-canvas p-4">
                    <p className="text-body-xs font-semibold tabular-nums text-primary-50">
                      {s.round}회차 · {s.date} {s.time}
                    </p>
                    <p className="mt-1 break-keep text-body-s font-bold text-fg-1">{s.title}</p>
                    {p.instructor && <p className="mt-1 break-keep text-body-xs text-fg-3">강사 {p.instructor}</p>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-xlarge border border-border-default @min-[48rem]:block">
          <table className="w-full border-collapse text-left text-body-s">
            <caption className="sr-only">교사 연수 회차별 일정</caption>
            <thead>
              <tr className="border-b-2 border-fg-1 bg-bg-canvas text-fg-1">
                <th scope="col" className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">구분</th>
                <th scope="col" className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">회차</th>
                <th scope="col" className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">일자</th>
                <th scope="col" className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">시간</th>
                <th scope="col" className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">장소</th>
                <th scope="col" className="h-12 w-full px-4 text-center font-bold">연수 주제</th>
              </tr>
            </thead>
            <tbody>
              {trainingPrograms.map((p, programIndex) =>
                p.sessions.map((s, i) => (
                  <tr
                    key={`${p.id}-${s.round}`}
                    className={i === 0 && programIndex > 0 ? "border-t-2 border-gray-40" : "border-t border-gray-20"}
                  >
                    {i === 0 && (
                      <th
                        scope="rowgroup"
                        rowSpan={p.sessions.length}
                        className="whitespace-nowrap border-r border-gray-20 bg-bg-subtle px-4 py-3 text-center font-bold text-fg-1"
                      >
                        <span className="flex flex-col items-center gap-2">
                          {p.brand && <BrandMark brand={p.brand} />}
                          {p.title}
                        </span>
                      </th>
                    )}
                    <td className="whitespace-nowrap border-r border-gray-20 px-4 py-3 text-center font-semibold text-fg-1">{s.round}회차</td>
                    <td className="whitespace-nowrap border-r border-gray-20 px-4 py-3 text-center text-fg-2">{s.date}</td>
                    <td className="whitespace-nowrap border-r border-gray-20 px-4 py-3 text-center tabular-nums text-fg-2">{s.time}</td>
                    {i === 0 && (
                      <td rowSpan={p.sessions.length} className="whitespace-nowrap border-r border-gray-20 px-4 py-3 text-center text-fg-2">
                        {p.place}
                      </td>
                    )}
                    <td className="break-keep px-4 py-3 text-fg-1">
                      {s.title}
                      {p.instructor && <span className="mt-1 block text-body-xs text-fg-3">강사 {p.instructor}</span>}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 rounded-large border border-border-default bg-bg-canvas p-5">
        <div className="flex items-start gap-3">
          <Badge variant="outlined-tertiary" className="mt-0.5 shrink-0">
            대상
          </Badge>
          <p className="text-body-s text-fg-2">현직 교원 및 예비교원</p>
        </div>
        <div className="flex items-start gap-3">
          <Badge variant="outlined-tertiary" className="mt-0.5 shrink-0">
            운영방식
          </Badge>
          <p className="text-body-s text-fg-2">
            각 세션은 <strong className="font-bold text-fg-1">정원 제한에 따라 사전 신청제로 운영</strong>됩니다.
            <br />
            단, <strong className="font-bold text-fg-1">잔여석이 있는 세션에 한해 현장 신청이 가능</strong>합니다.
          </p>
        </div>
      </div>

      <ApplyCtaButton
        href={EXTERNAL_APPLY_LINKS.teacherTraining}
        label="연수 사전 신청 및 조회"
        noticeTitle="연수 사전 신청 안내"
        notice={<p className="text-body-s leading-relaxed text-fg-2">{applyNotice}</p>}
        opensAt="2026-10-23T09:00:00+09:00"
        closesAt="2026-10-29T17:00:00+09:00"
      />
    </SectionPage>
  );
}
