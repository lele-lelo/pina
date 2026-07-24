import type { TThemeColor } from "@/types/settings";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  // Refs
  const themeColor = ref<TThemeColor>("yellow");

  // Functions
  async function setThemeColor(newThemeColor: TThemeColor) {
    document.body.classList.remove(`body--theme-${themeColor.value}`);
    themeColor.value = newThemeColor;
    await window.appConfig.set("general.colorTheme", newThemeColor);
    document.body.classList.add(`body--theme-${themeColor.value}`);
  }

  // Hooks
  async function initStore() {
    themeColor.value =
      (await window.appConfig.get<TThemeColor>("general.colorTheme")) ||
      "yellow";
    await setThemeColor(themeColor.value);
  }

  return { themeColor, setThemeColor, initStore };
});
