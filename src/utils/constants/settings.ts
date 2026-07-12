import { TThemeColorOption } from "@/types/settings";
import { Dark } from "quasar";

export const THEME_COLOR_OPTIONS: TThemeColorOption[] = [
  {
    value: "aqua",
    label: "Bleu ciel"
  },
  {
    value: "black",
    label: "Noir",
    showFn() {
      return !Dark.isActive || true;
    }
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
    label: "Blanc",
    showFn() {
      return Dark.isActive || true;
    }
  },
  {
    value: "yellow",
    label: "Jaune",
    default: true
  }
];
