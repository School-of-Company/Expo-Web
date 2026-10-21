/** 포스터 옆에 두는 행사 소개. 화면 폭과 관계없이 정해 둔 자리에서 줄을 바꾸고, 나머지는 어절 단위로 흐르게 둔다. */

function Sparkle({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z" fill="currentColor" />
    </svg>
  );
}

export default function EventIntro() {
  return (
    <section
      aria-labelledby="event-intro-title"
      className="relative flex min-w-0 flex-1 flex-col justify-center overflow-hidden rounded-xlarge border border-border-default bg-bg-canvas p-6 sm:p-10 xl:py-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.93_0.09_85/0.7),oklch(0.95_0.05_60/0.35)_45%,transparent_70%)]"
      />
      <Sparkle className="absolute right-12 top-8 h-10 w-10 text-[oklch(0.84_0.14_85)] sm:right-16 sm:top-10 sm:h-12 sm:w-12" />
      <Sparkle className="absolute right-6 top-5 h-3 w-3 text-accent-50 sm:right-8 sm:top-6" />
      <Sparkle className="absolute right-8 top-20 h-3.5 w-3.5 text-success sm:right-10 sm:top-24" />

      <div className="relative">
        <h3 id="event-intro-title" className="break-keep pr-14 text-heading-xs font-extrabold text-primary-50 sm:pr-20 sm:text-heading-s">
          학생과 교사, 배움의 동반자로
          <br />
          미래교육을 함께 그리다
        </h3>

        <div aria-hidden className="mt-5 h-1 w-16 rounded-pill bg-gradient-to-r from-[oklch(0.84_0.14_85)] to-accent-50 sm:mt-6 sm:w-20 xl:mt-5" />

        <div className="mt-5 space-y-3 break-keep text-body-xs font-medium leading-loose text-fg-2 sm:mt-6 sm:text-body-s xl:mt-5 xl:leading-relaxed">
          <p>
            올해 AI미래교육박람회는
            <br />
            학생 중심의 AI·SW 체험한마당과
            <br />
            교원 중심의 미래교육박람회를 하나로 합쳐 운영합니다.
          </p>
          <p>
            학생들은 AI·SW를 직접 체험하며 미래 사회의 주인공으로 자라나고, 선생님들은 새로운 기술을 수업에 담아 더 나은 수업을
            만들어 갑니다.
          </p>
        </div>

        <p className="mt-4 break-keep text-body-xs font-bold text-primary-50 sm:mt-5 sm:text-body-s">
          함께 배우고 성장하는 AI·디지털 미래교육의 현장에 여러분을 초대합니다.
        </p>
      </div>
    </section>
  );
}
