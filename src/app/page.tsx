import JsonLd from "@/shared/ui/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/shared/config/site";
import HomePage from "@/views/home/ui/HomePage";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  startDate: "2026-10-31",
  endDate: "2026-11-01",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  inLanguage: "ko",
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  location: {
    "@type": "Place",
    name: "전남광주통합특별시교육청AI교육원",
    address: {
      "@type": "PostalAddress",
      streetAddress: "능안로30번길 7",
      addressLocality: "북구",
      addressRegion: "전남광주통합특별시",
      addressCountry: "KR",
    },
  },
  organizer: { "@type": "Organization", name: "전남광주통합특별시교육청AI교육원", url: SITE_URL },
};

export default function Page() {
  return (
    <>
      <JsonLd data={eventJsonLd} />
      <HomePage />
    </>
  );
}
