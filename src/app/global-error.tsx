"use client";

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "6rem 1rem" }}>
        <title>일시적인 오류가 발생했습니다</title>
        <h1>일시적인 오류가 발생했습니다</h1>
        <p>잠시 후 다시 시도해 주세요.</p>
        <button type="button" onClick={() => retry()} style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", cursor: "pointer" }}>
          다시 시도
        </button>
      </body>
    </html>
  );
}
