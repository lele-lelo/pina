<script setup lang="ts">
import { useUserStore } from "@/stores/user-store";
import type { TRomEntry } from "@/types/rom";
import { Dark } from "quasar";
import { computed } from "vue";
import RegionFlag from "./region-flag.vue";
import GenreBadge from "./genre-badge.vue";

// Types
type TProps = {
  rom: TRomEntry;
};

// Props
const props = defineProps<TProps>();

// Composables
const userStore = useUserStore();

// Computeds
const metadata = computed(() => {
  return userStore.gameMetadatas.find(gm => gm.gameId === props.rom.gameId);
});
</script>

<template>
  <q-list class="column q-gutter-y-sm">
    <div>
      <q-item-label caption>Chemin du fichier : </q-item-label>
      <q-item-label>{{ rom.path }}</q-item-label>
    </div>

    <div class="row q-gutter-x-xl q-gutter-y-sm">
      <div>
        <q-item-label caption>Console : </q-item-label>
        <div style="width: 70px">
          <q-img
            v-if="metadata?.console"
            :src="`/consoles/${metadata?.console}-${Dark.isActive ? 'dark' : 'light'}.svg`"
            fit="contain"
            style="width: 100%; height: 100%"
          />
          <div v-else>-</div>
        </div>
      </div>

      <div>
        <q-item-label caption>Région : </q-item-label>
        <q-item-label>
          <region-flag v-if="metadata?.region" :region="metadata?.region" />
          {{ metadata?.region ?? "-" }}
        </q-item-label>
      </div>

      <div>
        <q-item-label caption>Genre : </q-item-label>
        <q-item-label>
          <genre-badge v-if="metadata?.genre" :genre="metadata.genre" />
          <div v-else>-</div>
        </q-item-label>
      </div>

      <div>
        <q-item-label caption>Editeur : </q-item-label>
        <q-item-label>
          {{ metadata?.publisher ?? "-" }}
        </q-item-label>
      </div>
    </div>
  </q-list>
</template>
