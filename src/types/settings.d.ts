export type TThemeColor =
  | "aqua"
  | "black"
  | "blue"
  | "green"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "white"
  | "yellow";

export type TThemeColorOption = {
  value: TThemeColor;
  label: string;
  default?: boolean;
  showFn?: () => boolean;
};
