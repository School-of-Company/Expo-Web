import { timeline } from "@/entities/schedule/model/data";
import JsonLd from "@/shared/ui/JsonLd";
import { HOST_NAME, ORGANIZER_REF, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/shared/config/site";
import HomePage from "@/views/home/ui/HomePage";

/** "10.31(토)" + "09:30" → "2026-10-31T09:30:00+09:00" */
function toIsoDateTime(date: string, time: string) {
  const [month, day] = date.replace(/\(.\)/, "").split(".");
  return `2026-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${time}:00+09:00`;
}

const location = {
  "@type": "Place",
  name: HOST_NAME,
  address: {
    "@type": "PostalAddress",
    streetAddress: "능안로30번길 7",
    addressLocality: "북구",
    addressRegion: "전남광주통합특별시",
    addressCountry: "KR",
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  "@id": `${SITE_URL}/#event`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  startDate: "2026-10-31T09:30:00+09:00",
  endDate: "2026-11-01T16:30:00+09:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  inLanguage: "ko",
  url: SITE_URL,
  image: [`${SITE_URL}/opengraph-image.png`, `${SITE_URL}/poster.png`],
  location,
  organizer: ORGANIZER_REF,
  audience: { "@type": "EducationalAudience", educationalRole: ["student", "teacher", "parent"] },
  // 세부 프로그램을 함께 실어 AI 검색이 "골든벨은 언제?" 같은 질문에 바로 답할 수 있게 한다.
  subEvent: timeline.map((item) => {
    const [start, end] = item.time.split("~");
    return {
      "@type": "Event",
      name: item.title,
      description: [item.location, ...item.detail].join(" · "),
      startDate: toIsoDateTime(item.date, start),
      endDate: toIsoDateTime(item.date, end),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { ...location, name: `${HOST_NAME} ${item.location}` },
    };
  }),
};

export default function Page() {
  return (
    <>
      <JsonLd data={eventJsonLd} />
      <HomePage />
    </>
  );
}
