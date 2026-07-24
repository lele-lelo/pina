import type { TTheme, TThemeColor } from "@/types/settings";
import Store from "electron-store";

export interface IStoreConfig {
  general: {
    theme: TTheme;
    colorTheme: TThemeColor;
  };
}

export const store = new Store<IStoreConfig>({
  defaults: {
    general: {
      theme: "auto",
      colorTheme: "yellow"
    }
  }
});
