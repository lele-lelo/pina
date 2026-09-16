import { TGameMetadata, TIgdbGame, TRomEntry } from "@/types/rom";
import { TTheme, type TThemeColor } from "@/types/settings";
import { THEME_COLOR_OPTIONS } from "@/utils/constants/settings";
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

  const isThemeColorRandom = ref(false);

  /** Liste des roms
   * @default []
   */
  const roms = ref<TRomEntry[]>([]);

  const gameMetadatas = ref<TGameMetadata[]>([]);

  const igdbDatas = ref<TIgdbGame[]>([])

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
    await window.appConfig.set("general.colorTheme", newThemeColor);
    isThemeColorRandom.value = false;

    if (newThemeColor === "random") {
      const options = THEME_COLOR_OPTIONS.map(tco => tco.value).filter(
        tco => tco !== "random"
      );
      newThemeColor = options[
        Math.floor(Math.random() * options.length)
      ] as TThemeColor;
      isThemeColorRandom.value = true;
    }

    document.body.classList.remove(`body--theme-${themeColor.value}`);
    themeColor.value = newThemeColor;
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

    // Metadata
    gameMetadatas.value =
      (await window.appConfig.get<TGameMetadata[]>("library.gameMetadata")) ||
      [];

    // IgdbDatas
    igdbDatas.value = (await window.appConfig.get<TIgdbGame[]>('library.igdbDatas')) || []
  }

  function getRom(romId: string) {
    const rom = roms.value.find(r => r.entryId === romId)

    if(rom) {
      const gameMetadata = gameMetadatas.value.find(gm => gm.gameId === rom.gameId)
      const igdbData = igdbDatas.value.find(igdb => igdb.id === gameMetadata?.igdbId)

      return {...rom, gameMetadata, igdbData}
    }
  }

  return {
    theme,
    themeColor,
    isThemeColorRandom,
    roms,
    gameMetadatas,
    igdbDatas,
    setTheme,
    setThemeColor,
    initStore,
    getRom
  };
});
