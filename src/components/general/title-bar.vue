<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import AppIcon from "./app-icon.vue";

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
    <q-bar class="col transparent">
      <app-icon />

      <div>Pina</div>
      <q-space />

      <q-btn dense flat icon="minimize" @click="minimize" />
      <q-btn dense flat icon="crop_square" @click="maximize" />
      <q-btn dense flat icon="close" @click="close" />
    </q-bar>
  </q-header>
</template>

<style lang="scss" scoped>
.titlebar {
  -webkit-app-region: drag;
}

.titlebar button {
  -webkit-app-region: no-drag;
}
</style>
