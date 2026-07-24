import type { TThemeColor } from "@/types/settings";
import Store from "electron-store";

export interface IStoreConfig {
  general: {
    colorTheme: TThemeColor;
  };
}

export const store = new Store<IStoreConfig>({
  defaults: {
    general: {
      colorTheme: "yellow"
    }
  }
});
