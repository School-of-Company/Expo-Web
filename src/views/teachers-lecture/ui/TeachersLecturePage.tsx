import SectionPage from "@/widgets/section-page/ui/SectionPage";
import ProgramInfoPanel from "@/shared/ui/ProgramInfoPanel";
import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";

const applyNotice = (
  <>
    사전 신청: <strong className="font-bold text-fg-1">10.26.(월) 08:30</strong>부터 홈페이지에서 선착순 접수
    <br />
    ※ <strong className="font-bold text-fg-1">선착순 300명 사전 마감</strong>되며, 잔여석에 한해 당일 현장 선착순 입장이 가능합니다.
  </>
);

export default function TeachersLecturePage() {
  return (
    <SectionPage
      title="기조 강연"
      desc="10.31.(토) 오전 11시 진행되는 기조 강연입니다. 선착순 300명 참여 가능합니다."
      showNav={false}
    >
      <h2 className="text-heading-s font-bold text-fg-1">기조 강연</h2>

      <ProgramInfoPanel
        schedules={[{ label: "강연일시", value: "10.31.(토) 오전 11:00" }]}
        facts={[
          { label: "대상", value: "학생·교사·일반 시민 (선착순 300명)" },
          { label: "장소", value: "AI교육원 3층 대강당" },
        ]}
        notes={[
          { label: "내용", text: "“AI 시대, 살아남기를 넘어 번영하기: 핵심 역량과 확장된 AI 리터러시”" },
          { label: "운영방식", text: "선착순 300명, 사전신청 권장" },
          { label: "신청안내", text: applyNotice },
        ]}
        cta={{
          href: EXTERNAL_APPLY_LINKS.teacherLecture,
          label: "기조 강연 사전 신청 및 조회",
          external: true,
          notice: <p className="text-body-s leading-relaxed text-fg-2">{applyNotice}</p>,
          noticeTitle: "기조 강연 사전 신청 안내",
        }}
      />
    </SectionPage>
  );
}
