export const SUMMARIZE_TEXT = "summarize_text";
export const EXPLAIN_CODE = "explain_code";
export const GENERATE_TESTS = "generate_tests";
export const CHANGE_TONE = "change_tone";
export const EXIT = "exit";

export type SelectAnswer =
  | typeof SUMMARIZE_TEXT
  | typeof EXPLAIN_CODE
  | typeof GENERATE_TESTS
  | typeof CHANGE_TONE;
