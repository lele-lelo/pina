import type { TThemeColor } from "@/types/settings";
import Store from "electron-store";

export interface IStoreConfig {
  settings: {
    colorTheme: TThemeColor;
  };
}

export const store = new Store<IStoreConfig>({
  defaults: {
    settings: {
      colorTheme: "yellow"
    }
  }
});

console.log("Store path : " + store.path);
