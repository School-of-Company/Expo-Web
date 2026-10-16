"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Developer, DeveloperProject } from "@/entities/developer/model/data";

/** 프로젝트별 대표색. 값은 styles/theme.css의 --dev-project-* 토큰에 있다. */
const PROJECT_COLORS = ["var(--dev-project-1)", "var(--dev-project-2)", "var(--dev-project-3)"];

type ToneStyle = CSSProperties & { "--tone": string };

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** 0에서 목표값까지 숫자가 차오르는 효과. 동작 줄이기 설정이면 바로 목표값을 보여준다. */
function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const duration = prefersReducedMotion() ? 0 : 900;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = duration ? Math.min(1, (now - start) / duration) : 1;
      setShown(Math.round(value * (1 - (1 - t) ** 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span className="tabular-nums">{shown}</span>;
}

function GithubMark({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={className}>
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  );
}

interface CardProps {
  developer: Developer;
  projectName: string;
  color: string;
  dimmed: boolean;
  order: number;
}

function DeveloperCard({ developer, projectName, color, dimmed, order }: CardProps) {
  const { name, role, github, takeaway } = developer;
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  // 화면에 들어올 때 한 번만 아래에서 떠오르게 한다.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 마우스 위치를 CSS 변수로 넘겨 카드 위에 프로젝트 색 빛이 따라다니게 한다.
  const handlePointerMove = (e: React.PointerEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <li
      ref={ref}
      onPointerMove={handlePointerMove}
      style={{ "--tone": color, transitionDelay: visible ? "0ms" : `${(order % 3) * 80}ms` } as ToneStyle}
      className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-dev-card border border-dev-line bg-dev-surface shadow-dev-card transition-[opacity,translate,filter,scale,box-shadow] duration-500 ease-dev-out motion-reduce:transition-none hover:shadow-dev-card-hover ${
        !visible
          ? "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
          : dimmed
            ? "translate-y-0 scale-[0.97] opacity-25 grayscale"
            : "translate-y-0 opacity-100"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(280px circle at var(--x) var(--y), color-mix(in oklch, var(--tone) 12%, transparent), transparent 70%)" }}
      />

      <div className="relative p-5">
        <p className="break-keep text-dev-quote font-semibold text-dev-ink">
          <span aria-hidden className="mr-1 text-[var(--tone)]">
            &ldquo;
          </span>
          {takeaway}
          <span aria-hidden className="ml-1 text-[var(--tone)]">
            &rdquo;
          </span>
        </p>

        <div className="mt-4 flex items-center gap-2 border-t border-dev-line pt-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-dev-meta">
              <span className="font-bold text-dev-ink">{name}</span>
              <span className="text-dev-ink-3"> · {role}</span>
            </p>
            <p className="mt-0.5 flex items-start gap-1.5 text-dev-caption text-dev-ink-3">
              <span aria-hidden className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--tone)]" />
              <span className="break-keep">{projectName}</span>
            </p>
          </div>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} 깃허브 프로필 (새 창)`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-dev-ink-3 transition-colors duration-150 ease-dev-out hover:bg-dev-surface-muted hover:text-dev-ink"
            >
              <GithubMark className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

/**
 * 모든 프로젝트의 소감을 한 목록으로 이어 보여준다.
 * 위쪽 필터로 프로젝트를 고르면 목록을 나누지 않고 다른 프로젝트 카드만 흐리게 눌러 둔다.
 */
export default function DeveloperBoard({ projects }: { projects: DeveloperProject[] }) {
  const [focused, setFocused] = useState<string | null>(null);

  const cards = projects.flatMap((project, projectIndex) =>
    project.members.map((developer, i) => ({
      // 이름이 겹칠 수 있어(예: 닉네임 미기재) 순번을 함께 쓴다.
      key: `${project.key}-${i}`,
      projectKey: project.key,
      developer,
      projectName: project.name,
      color: PROJECT_COLORS[projectIndex % PROJECT_COLORS.length],
    })),
  );

  const stats = [
    { label: "참여 개발자", value: cards.length, unit: "명" },
    { label: "프로젝트", value: projects.length, unit: "개" },
  ];

  return (
    <>
      <div className="relative overflow-hidden rounded-dev-panel bg-dev-hero px-6 py-10 text-dev-ink-inverse sm:px-10 sm:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-dev-project-1 opacity-40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-dev-project-3 opacity-25 blur-3xl"
        />

        <div className="relative">
          <p className="text-dev-eyebrow font-semibold uppercase text-dev-hero-ink-3">Behind the Expo</p>
          <h1 className="mt-3 break-keep text-dev-display-sm font-bold sm:text-dev-display">
            만든 이들의 이야기
          </h1>
          <p className="mt-3 max-w-xl break-keep text-dev-body text-dev-hero-ink-2">
            광주소프트웨어마이스터고등학교 학생 개발자들이 빈 화면에서 시작해 박람회의 모든 순간을 함께 만들었습니다. 개발을 마치며 남긴 한마디를 모았습니다.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-dev-hero-line pt-6 sm:max-w-xs">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-dev-caption font-medium text-dev-hero-ink-3 sm:text-dev-meta">{s.label}</dt>
                <dd className="mt-1 text-dev-stat-sm font-bold sm:text-dev-stat">
                  <CountUp value={s.value} />
                  <span className="ml-0.5 text-dev-body font-semibold text-dev-hero-ink-2">{s.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div role="group" aria-label="프로젝트로 강조하기" className="mt-8 flex flex-wrap gap-2">
        <FilterChip active={focused === null} onClick={() => setFocused(null)}>
          전체 <span className="tabular-nums opacity-60">{cards.length}</span>
        </FilterChip>
        {projects.map((p, i) => (
          <FilterChip
            key={p.key}
            active={focused === p.key}
            color={PROJECT_COLORS[i % PROJECT_COLORS.length]}
            onClick={() => setFocused(focused === p.key ? null : p.key)}
          >
            <span className="break-keep text-left">{p.name}</span>
            <span className="tabular-nums opacity-60">{p.members.length}</span>
          </FilterChip>
        ))}
      </div>

      <ul className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {cards.map(({ key, projectKey, ...card }, i) => (
          <DeveloperCard key={key} {...card} order={i} dimmed={focused !== null && focused !== projectKey} />
        ))}
      </ul>
    </>
  );
}

function FilterChip({
  active,
  color,
  onClick,
  children,
}: {
  active: boolean;
  color?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      style={color ? ({ "--tone": color } as ToneStyle) : undefined}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-dev-label font-semibold transition-all duration-200 ease-dev-out active:scale-95 ${
        active
          ? "border-dev-ink bg-dev-ink text-dev-ink-inverse shadow-dev-chip"
          : "border-dev-line-strong bg-dev-surface text-dev-ink-2 hover:border-dev-ink-3 hover:text-dev-ink"
      }`}
    >
      {color && <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-[var(--tone)]" />}
      {children}
    </button>
  );
}
