<script setup lang="ts">
import { useUserStore } from "@/stores/user-store";
import { TThemeColorOption } from "@/types/settings";
import { THEME_COLOR_OPTIONS } from "@/utils/constants/settings";
import { computed } from "vue";

// Composables
const userStore = useUserStore();

// Computeds
const currentThemeOption = computed(() => {
  return THEME_COLOR_OPTIONS.find(tco => tco.value === userStore.themeColor);
});
</script>

<template>
  <div>
    <q-select
      :model-value="currentThemeOption"
      filled
      dense
      autofocus
      label="Thème"
      class="col-auto"
      color="primary"
      :options="
        THEME_COLOR_OPTIONS.sort((a, b) => a.label.localeCompare(b.label))
      "
      @update:model-value="
        (newTheme: TThemeColorOption) => userStore.setThemeColor(newTheme.value)
      "
    >
      <template #prepend>
        <q-icon
          class="pixel-art"
          :name="`img:/icons/${userStore.themeColor} pineapple.png`"
        />
      </template>

      <template #option="scope">
        <q-item v-bind="scope.itemProps" dense>
          <q-item-section side>
            <q-icon
              class="pixel-art"
              :name="`img:/icons/${scope.opt.value} pineapple.png`"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
