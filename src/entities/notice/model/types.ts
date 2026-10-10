export interface Notice {
  id: string;
  title: string;
  /** "2026.08.20" */
  date: string;
  /** 문단 단위 */
  content: string[];
}
