const BOOTH_COLORS: Record<string, string> = {
  E: "#8dc953",
  M: "#f99b25",
  H: "#664fa6",
  S: "#f349a3",
  D: "#3aaccc",
  A: "#a4cc39",
  B: "#f6861f",
  C: "#00c0f3",
};

export const boothColor = (no: string): string | undefined => BOOTH_COLORS[no.charAt(0)];
