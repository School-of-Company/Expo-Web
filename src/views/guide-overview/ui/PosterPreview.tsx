// TODO: 행사 포스터 이미지가 확정되면 플레이스홀더를 next/image로 교체한다.
export default function PosterPreview() {
  return (
    <div className="w-full shrink-0 sm:w-72 lg:self-start">
      <div className="flex aspect-[210/297] w-full items-center justify-center rounded-xlarge border border-dashed border-border-default bg-bg-subtle px-4 text-center text-body-s text-fg-3">
        행사 포스터 준비중
      </div>
    </div>
  );
}
