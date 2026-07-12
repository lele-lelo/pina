<script setup lang="ts">
import { useUserStore } from "@/stores/user-store";
import { TThemeColor } from "@/types/settings";
import { THEME_COLOR_OPTIONS } from "@/utils/constants/settings";
import { onMounted, onUnmounted } from "vue";

// Composables
const userStore = useUserStore();

// Computeds
const themeColorOptions = THEME_COLOR_OPTIONS.filter(
  c => c.showFn === undefined || c.showFn()
).map(c => {
  return {
    value: c.value,
    label: c.default ? `${c.label} (défaut)` : c.label
  };
});

// Functions
function minimize() {
  window.windowControls.minimize();
}

function maximize() {
  window.windowControls.maximize();
}

function close() {
  window.windowControls.close();
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "F11") {
    event.preventDefault();
    window.windowControls.fullscreen();
  }
}

// Hooks
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <q-header class="titlebar bg-primary column no-wrap">
    <q-bar class="col">
      <q-icon
        class="pixel-art"
        :name="`img:/icons/${userStore.themeColor} pineapple.png`"
      />

      <div>Pina</div>
      <q-space />

      <q-btn dense flat icon="palette">
        <q-menu class="shadow-0">
          <q-card bordered flat>
            <q-card-section>
              <q-option-group
                :model-value="userStore.themeColor"
                :options="themeColorOptions"
                type="radio"
                @update:model-value="
                  (newValue: TThemeColor) => {
                    userStore.setThemeColor(newValue);
                  }
                "
              >
              </q-option-group>
            </q-card-section>
          </q-card>
        </q-menu>
      </q-btn>

      <q-separator vertical inset color="primary" />

      <q-btn dense flat icon="minimize" @click="minimize" />
      <q-btn dense flat icon="crop_square" @click="maximize" />
      <q-btn dense flat icon="close" @click="close" />
    </q-bar>

    <div class="q-gutter-md q-px-sm">
      <q-btn dense flat label="Fichier" no-caps />
      <q-btn dense flat label="Configuration" no-caps />
    </div>
  </q-header>
</template>

<style lang="scss" scoped>
.titlebar {
  -webkit-app-region: drag;
}

.titlebar button {
  -webkit-app-region: no-drag;
}

.pixel-art {
  image-rendering: crisp-edges;
  height: 32px;
  width: auto;
}
</style>
