export interface Booth {
  no: string;
  name: string;
  type: string;
  audience: string;
  title: string;
}

export const booths: Booth[] = [
  { no: "C01", name: "부스 이름 A", type: "체험", audience: "전체", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "C02", name: "부스 이름 B", type: "전시,체험", audience: "초,중,고,성인", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "C03", name: "부스 이름 C", type: "체험", audience: "초,중,고,성인", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "C04", name: "부스 이름 D", type: "전시,체험", audience: "전체", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "C05", name: "부스 이름 E", type: "체험", audience: "전체", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "C06", name: "부스 이름 F", type: "체험", audience: "초,중", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "C07", name: "부스 이름 G", type: "전시,체험", audience: "전체", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "C08", name: "부스 이름 H", type: "체험", audience: "초,중,고", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "C09", name: "부스 이름 I", type: "전시,체험", audience: "초,중,고,성인", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "C10", name: "부스 이름 J", type: "체험", audience: "성인", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "특별프로그램", name: "특별 부스 이름", type: "체험", audience: "초,중,고,성인", title: "프로그램 제목 예시 텍스트입니다" },
];

export const teacherBooths: Booth[] = [
  { no: "T01", name: "부스 이름 A", type: "전시", audience: "교원", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "T02", name: "부스 이름 B", type: "전시,체험", audience: "교원", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "T03", name: "부스 이름 C", type: "상담", audience: "교원", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "T04", name: "부스 이름 D", type: "체험", audience: "교원", title: "프로그램 제목 예시 텍스트입니다" },
  { no: "T05", name: "부스 이름 E", type: "전시,체험", audience: "교원", title: "프로그램 제목 예시 텍스트입니다" },
];
