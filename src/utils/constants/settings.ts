import { TOption, TTheme, TThemeColor } from "@/types/settings";

export const THEME_OPTIONS: TOption<TTheme>[] = [
  {
    value: "auto",
    label: "Système",
    icon: "mdi-theme-light-dark"
  },
  {
    value: "light",
    label: "Clair",
    icon: "mdi-weather-sunny"
  },
  {
    value: "dark",
    label: "Sombre",
    icon: "mdi-weather-night"
  }
];

export const THEME_COLOR_OPTIONS: TOption<TThemeColor>[] = [
  {
    value: "aqua",
    label: "Bleu ciel"
  },
  {
    value: "black",
    label: "Noir"
  },
  {
    value: "blue",
    label: "Bleu"
  },
  {
    value: "green",
    label: "Vert"
  },
  {
    value: "orange",
    label: "Orange"
  },
  {
    value: "pink",
    label: "Rose"
  },
  {
    value: "purple",
    label: "Violet"
  },
  {
    value: "red",
    label: "Rouge"
  },
  {
    value: "white",
    label: "Blanc"
  },
  {
    value: "yellow",
    label: "Jaune"
  }
];
