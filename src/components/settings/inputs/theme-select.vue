<script setup lang="ts">
import { useUserStore } from "@/stores/user-store";
import { TOption, TTheme } from "@/types/settings";
import { THEME_OPTIONS } from "@/utils/constants/settings";
import { computed } from "vue";

// Composables
const userStore = useUserStore();

// Computeds
const currentThemeOption = computed(() => {
  return THEME_OPTIONS.find(to => to.value === userStore.theme);
});
</script>

<template>
  <q-select
    :model-value="currentThemeOption"
    filled
    dense
    autofocus
    label="Thème"
    color="primary"
    :options="THEME_OPTIONS"
    @update:model-value="
      (newTheme: TOption<TTheme>) => userStore.setTheme(newTheme.value)
    "
  >
    <template #prepend>
      <q-icon :name="currentThemeOption?.icon" color="primary" />
    </template>

    <template #option="scope">
      <q-item v-bind="scope.itemProps" dense>
        <q-item-section side>
          <q-icon
            :name="scope.opt.icon"
            :color="
              scope.opt.value === currentThemeOption?.value ? 'primary' : ''
            "
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
