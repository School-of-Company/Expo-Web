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
