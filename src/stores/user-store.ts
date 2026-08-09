import { TRomEntry } from "@/types/rom";
import { TTheme, type TThemeColor } from "@/types/settings";
import { defineStore } from "pinia";
import { Dark } from "quasar";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  // Refs
  /** Theme de l'application
   * @default auto
   * @example auto, light, dark
   */
  const theme = ref<TTheme>("auto");

  /** Couleur de l'application
   * @default yellow
   * @example red, blue, yellow
   */
  const themeColor = ref<TThemeColor>("yellow");

  /** Liste des roms
   * @default []
   */
  const roms = ref<TRomEntry[]>([]);

  // Functions
  /** Fonctions qui met à jour le theme
   * @param newTheme Nouveau theme
   */
  async function setTheme(newTheme: TTheme) {
    theme.value = newTheme;
    Dark.set(theme.value === "auto" ? "auto" : theme.value === "dark");
    await window.appConfig.set("general.theme", newTheme);
  }

  /** Fonctions qui met à jour la couleur
   * @param newThemeColor Nouvelle couleur
   */
  async function setThemeColor(newThemeColor: TThemeColor) {
    document.body.classList.remove(`body--theme-${themeColor.value}`);
    themeColor.value = newThemeColor;
    await window.appConfig.set("general.colorTheme", newThemeColor);
    document.body.classList.add(`body--theme-${themeColor.value}`);
  }

  // Hooks
  /** Fonction qui initialise le store */
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

    // Roms
    roms.value =
      (await window.appConfig.get<TRomEntry[]>("library.entries")) || [];
  }

  return { theme, themeColor, roms, setTheme, setThemeColor, initStore };
});
