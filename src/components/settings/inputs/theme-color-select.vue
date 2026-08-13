<script setup lang="ts">
import AppIcon from "@/components/general/app-icon.vue";
import { useUserStore } from "@/stores/user-store";
import { TOption, TThemeColor } from "@/types/settings";
import { THEME_COLOR_OPTIONS } from "@/utils/constants/settings";
import { computed } from "vue";

// Composables
const userStore = useUserStore();

// Computeds
const currentThemeOption = computed(() => {
  if (userStore.isThemeColorRandom) {
    return THEME_COLOR_OPTIONS.find(tco => tco.value === "random");
  }
  return THEME_COLOR_OPTIONS.find(tco => tco.value === userStore.themeColor);
});
</script>

<template>
  <q-select
    :model-value="currentThemeOption"
    filled
    dense
    label="Couleur"
    color="primary"
    :options="
      THEME_COLOR_OPTIONS.sort((a, b) => a.label.localeCompare(b.label))
    "
    @update:model-value="
      (newTheme: TOption<TThemeColor>) =>
        userStore.setThemeColor(newTheme.value)
    "
  >
    <template #prepend>
      <q-icon v-if="currentThemeOption?.value === 'random'" name="help" />
      <app-icon v-else />
    </template>

    <template #option="scope">
      <q-item v-bind="scope.itemProps" dense>
        <q-item-section side>
          <q-icon v-if="scope.opt.value === 'random'" name="help" />
          <app-icon v-else :theme-color="scope.opt.value" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
