<script setup lang="ts">
import { Dialog } from "quasar";
import { computed } from "vue";
import SettingsDialog from "../settings/settings-dialog.vue";
import { TButton } from "@/types/global.js";
import { useUserStore } from "@/stores/user-store.js";
import GameSelectDialog from "../rom/game-select-dialog.vue";
import { stringify } from "querystring";

// Composables
const userStore = useUserStore();

// Refs
const navigationOptions = computed<TButton[]>(() => {
  return [
    {
      label: "Charger une ROM",
      icon: "mdi-upload",
      color: "blue",
      async clickFn() {
        const res = await window.romActions.addFile();
        userStore.roms = res.library.entries;
        userStore.gameMetadatas = res.library.gameMetadata;

        const newEntry = res.library.entries.find(
          e => e.entryId === res.newEntryId
        );

        if (!newEntry?.gameId) {
          Dialog.create({
            component: GameSelectDialog,
            componentProps: {
              romId: res.newEntryId
            }
          });
        }
      }
    },
    {
      label: "Ajouter un répertoire",
      icon: "mdi-folder-plus",
      color: "green"
    },
    {
      label: "Multijoueurs",
      icon: "mdi-account-group",
      color: "orange"
    },
    {
      label: "Paramètres",
      icon: "mdi-cog",
      color: "grey",
      clickFn() {
        Dialog.create({
          component: SettingsDialog
        });
      }
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
