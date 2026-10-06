import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "2026 전남광주통합특별시교육청 AI미래교육박람회";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 한글 폰트 파일이 없어 텍스트 대신 로고(행사명 포함 이미지)로 구성한다.
export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"), "base64");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
        <img src={`data:image/png;base64,${logo}`} width={1000} height={293} alt="" />
      </div>
    ),
    size,
  );
}
