import type { TThemeColor } from "@/types/settings";
import { THEME_COLOR_OPTIONS } from "@/utils/constants/settings";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  // Refs
  const themeColor = ref<TThemeColor>(
    (THEME_COLOR_OPTIONS.find(c => c.default) || THEME_COLOR_OPTIONS[0]!)?.value
  );

  // Functions
  function setThemeColor(newThemeColor: TThemeColor) {
    document.body.classList.remove(`body--theme-${themeColor.value}`);
    themeColor.value = newThemeColor;
    document.body.classList.add(`body--theme-${themeColor.value}`);
  }

  setThemeColor(themeColor.value);
  return { themeColor, setThemeColor };
});
