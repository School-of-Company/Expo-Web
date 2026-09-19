const PATHS = {
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM21 21l-4.3-4.3",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  home: "M4 11.5 12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9",
  download: "M12 4v11m0 0-4-4m4 4 4-4M5 19h14",
  "chevron-down": "M6 9l6 6 6-6",
  "chevron-right": "m9 6 6 6-6 6",
  "arrow-right": "M5 12h14m0 0-6-6m6 6-6 6",
  check: "M5 13l4 4L19 7",
  "check-circle": "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-4-9 2.5 2.5L16 9",
  "x-circle": "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-3-9h6",
  users: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 14c3.3 0 6 2.7 6 6",
  car: "M5 16h14M6 16l1.5-5h9L18 16M6 16v3H4v-3m14 0v3h2v-3M8 19v1M16 19v1M9 11h6",
  clipboard: "M9 5h6a1 1 0 0 1 1 1v1H8V6a1 1 0 0 1 1-1ZM6 8h12v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8Zm3 5h6m-6 4h6",
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm-6-3a6 6 0 0 0 12 0M12 18v3",
  trophy: "M8 4h8v4a4 4 0 0 1-8 0V4Zm0 1H5v2a3 3 0 0 0 3 2.8M16 5h3v2a3 3 0 0 1-3 2.8M10 16h4M12 12v4m-3 5h6l-1-3h-4l-1 3Z",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z",
  book: "M4 6a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2V6Zm16 0a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2V6Z",
  "map-pin": "M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Zm0-8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  phone: "M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 9.5 9.5 0 0 0 3 .48 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A16 16 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.04.17 2.06.48 3a1 1 0 0 1-.24 1L6.6 10.8Z",
  play: "M8 5.5v13l11-6.5-11-6.5Z",
  "external-link": "M14 5h5v5M19 5l-8.5 8.5M8 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2",
  "arrow-up": "M12 19V5m0 0-6 6m6-6 6 6",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
