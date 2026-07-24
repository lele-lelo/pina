export type TOption<T> = {
  value: T;
  label: string;
  icon?: string;
};

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

export type TTheme = "light" | "dark" | "auto";
