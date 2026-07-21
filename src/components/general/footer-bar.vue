<script setup lang="ts">
import { Dark } from "quasar";
import { computed, ref } from "vue";

// Types
type TNavigationOption = {
  label: string;
  color: string;
  icon: string;
  clickFn?: () => void | Promise<void>;
};

// Refs
const navigationOptions = computed<TNavigationOption[]>(() => {
  return [
    {
      label: "Charger une ROM",
      icon: "mdi-upload",
      color: "blue"
    },
    {
      label: "Ajouter un répertoire",
      icon: "mdi-folder-plus",
      color: "green"
    },
    {
      label: "Emulation",
      icon: "mdi-gamepad-square",
      color: Dark.isActive ? "yellow" : "pink"
    },
    {
      label: "Multijoueurs",
      icon: "mdi-account-group",
      color: "orange"
    },
    {
      label: "Paramètres",
      icon: "mdi-cog",
      color: "grey"
    },
    {
      label: "Système",
      icon: "mdi-power",
      color: "red",
      clickFn() {
        window.windowControls.close();
      }
    }
  ];
});
</script>

<template>
  <q-footer class="transparent row justify-center">
    <div class="q-ma-sm rounded-borders q-gutter-x-sm">
      <q-btn
        v-for="(option, i) in navigationOptions"
        :key="i"
        size="lg"
        dense
        :icon="option.icon"
        :color="option.color"
        :disable="!option.clickFn"
        @click="option.clickFn"
      >
        <q-tooltip :class="`bg-${option.color}`">
          {{ option.label }} {{ !option.clickFn ? "(Non implementé)" : "" }}
        </q-tooltip>
      </q-btn>
    </div>
  </q-footer>
</template>
