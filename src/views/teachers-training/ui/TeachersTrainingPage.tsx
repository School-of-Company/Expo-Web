import SectionPage from "@/widgets/section-page/ui/SectionPage";
import Badge from "@/shared/ui/Badge";
import Button from "@/shared/ui/Button";
import BrandMark from "@/shared/ui/logos/BrandMark";
import { trainingPrograms } from "@/entities/training-program/model/data";

export default function TeachersTrainingPage() {
  return (
    <SectionPage
      title="교사 연수"
      desc="삼성·구글·애플과 함께 2030 미래교실을 경험하고, 내 수업에 새로운 가능성을 더해 보세요!"
    >
      <h2 className="text-heading-s font-bold text-fg-1">교사 연수</h2>

      {/* 회사별로 한 줄씩. 일시·장소를 각 회사 안에서 함께 보여준다. */}
      <ul className="mt-4 flex flex-col gap-3">
        {trainingPrograms.map((p) => (
          <li
            key={p.id}
            className="flex gap-4 rounded-large border border-border-default bg-bg-canvas p-5"
          >
            <BrandMark brand={p.brand} className="h-9 w-9 shrink-0" />

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-heading-xxs font-bold text-fg-1">{p.title}</h3>
                <Badge variant="solid-pastel">{p.place}</Badge>
              </div>
              <p className="text-body-s font-semibold text-fg-1">{p.time}</p>
              <p className="break-words text-body-s text-fg-2">{p.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-col gap-3 rounded-large border border-border-default bg-bg-canvas p-5">
        <div className="flex items-start gap-3">
          <Badge variant="outlined-tertiary" className="mt-0.5 shrink-0">
            대상
          </Badge>
          <p className="text-body-s text-fg-2">현직 교원 (1인당 최대 2개 세션 신청)</p>
        </div>
        <div className="flex items-start gap-3">
          <Badge variant="outlined-tertiary" className="mt-0.5 shrink-0">
            운영방식
          </Badge>
          <p className="text-body-s text-fg-2">
            세션별 정원 한정 사전신청제로 운영되며, 연수 소개는 샘플로 확정 내용은 추후 안내됩니다.
          </p>
        </div>
      </div>

      <Button href="/apply/training" size="l" fullWidth className="mt-3">
        연수 사전 신청 및 조회
        <span aria-hidden="true">→</span>
      </Button>
    </SectionPage>
  );
}
