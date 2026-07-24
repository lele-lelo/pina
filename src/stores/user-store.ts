import { TTheme, type TThemeColor } from "@/types/settings";
import { defineStore } from "pinia";
import { Dark } from "quasar";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  // Refs
  const theme = ref<TTheme>("auto");
  const themeColor = ref<TThemeColor>("yellow");

  // Functions
  async function setTheme(newTheme: TTheme) {
    theme.value = newTheme;
    Dark.set(theme.value === "auto" ? "auto" : theme.value === "dark");
    await window.appConfig.set("general.theme", newTheme);
  }

  async function setThemeColor(newThemeColor: TThemeColor) {
    document.body.classList.remove(`body--theme-${themeColor.value}`);
    themeColor.value = newThemeColor;
    await window.appConfig.set("general.colorTheme", newThemeColor);
    document.body.classList.add(`body--theme-${themeColor.value}`);
  }

  // Hooks
  async function initStore() {
    // Theme
    theme.value =
      (await window.appConfig.get<TTheme>("general.theme")) || "auto";
    await setTheme(theme.value);

    // ThemeColor
    themeColor.value =
      (await window.appConfig.get<TThemeColor>("general.colorTheme")) ||
      "yellow";
    await setThemeColor(themeColor.value);
  }

  return { theme, themeColor, setTheme, setThemeColor, initStore };
});
