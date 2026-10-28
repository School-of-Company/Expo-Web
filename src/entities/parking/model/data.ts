export const PARKING_DAYS = { sat: "10.31.(토)", sun: "11.1.(일)" } as const;

export interface TempParking {
  name: string;
  address: string;
  /** 주차 가능한 날짜. 비어 있으면 아직 확정되지 않은 곳. */
  days?: (keyof typeof PARKING_DAYS)[];
}

/** 행사 당일 AI교육원 내 주차가 불가해 안내하는 인근 임시 주차장. 주차안내·오시는 길이 함께 쓴다. */
export const TEMP_PARKING: TempParking[] = [
  { name: "문산중학교", address: "북구 대천로 174", days: ["sat", "sun"] },
  { name: "용봉중학교", address: "북구 서하로274번길 33", days: ["sat", "sun"] },
  { name: "오정초등학교", address: "북구 대천로 55", days: ["sat"] },
  { name: "문우초등학교", address: "북구 능안로 7", days: ["sat", "sun"] },
  { name: "문흥중학교", address: "북구 능안로 2", days: ["sun"] },
  { name: "우산중학교", address: "북구 신촌로 22", days: ["sat", "sun"] },
  { name: "문정초등학교", address: "북구 대천로169번길 7", days: ["sat"] },
  { name: "문정여자고등학교", address: "북구 능안로30번길 33", days: ["sat", "sun"] },
  { name: "교육연수원", address: "북구 능안로30번길 5", days: ["sat", "sun"] },
];
