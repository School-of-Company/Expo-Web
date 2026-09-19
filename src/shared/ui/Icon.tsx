const PATHS = {
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM21 21l-4.3-4.3",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  "chevron-down": "M6 9l6 6 6-6",
  "chevron-right": "m9 6 6 6-6 6",
  "arrow-right": "M5 12h14m0 0-6-6m6 6-6 6",
  check: "M5 13l4 4L19 7",
  "check-circle": "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-4-9 2.5 2.5L16 9",
  "x-circle": "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-3-9h6",
  "external-link": "M14 5h5v5M19 5l-8.5 8.5M8 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2",
  "arrow-up": "M12 19V5m0 0-6 6m6-6 6 6",
  users: "M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  car: "M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13M3 13v4a1 1 0 0 0 1 1h1M3 13h18M21 13v4a1 1 0 0 1-1 1h-1M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4M17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
  clipboard: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2",
  play: "M8 5v14l11-7L8 5z",
  mic: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20",
  "map-pin": "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  trophy: "M8 21h8M12 17v4M17 4h3a1 1 0 0 1 1 1c0 3-2 5-4 5M7 4H4a1 1 0 0 0-1 1c0 3 2 5 4 5M7 4h10v4a5 5 0 0 1-10 0V4z",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z",
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
