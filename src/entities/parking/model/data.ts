export interface TempParking {
  name: string;
  address: string;
}

/** 행사 당일 AI교육원 내 주차가 불가해 안내하는 인근 임시 주차장. 주차안내·오시는 길이 함께 쓴다. */
export const TEMP_PARKING: TempParking[] = [
  { name: "문산초등학교", address: "북구 문산로 66" },
  { name: "문산중학교", address: "북구 대천로 174" },
  { name: "용봉중학교", address: "북구 서하로274번길 33" },
  { name: "오정초등학교", address: "북구 대천로 55" },
  { name: "문우초등학교", address: "북구 능안로 7" },
  { name: "문흥중학교", address: "북구 능안로 2" },
  { name: "우산중학교", address: "북구 신촌로 22" },
  { name: "문정초등학교", address: "북구 대천로169번길 7" },
  { name: "문정여자고등학교", address: "북구 능안로30번길 33" },
  { name: "교육연수원", address: "북구 능안로30번길 5" },
];
