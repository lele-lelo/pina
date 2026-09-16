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
const romInfo = computed(() => {
  return userStore.getRom(props.rom.entryId);
});
</script>

<template>
  <q-list class="column q-gutter-y-sm">
    <div>
      <q-item-label caption>Chemin du fichier : </q-item-label>
      <q-item-label>{{ rom.path }}</q-item-label>
    </div>

    <div class="row q-gutter-x-xl">
      <div>
        <q-item-label caption>Console : </q-item-label>
        <div style="width: 70px">
          <q-img
            v-if="romInfo?.gameMetadata?.console"
            :src="`/consoles/${romInfo.gameMetadata?.console}-${Dark.isActive ? 'dark' : 'light'}.svg`"
            fit="contain"
            style="width: 100%; height: 100%"
          />
          <div v-else>-</div>
        </div>
      </div>

      <div>
        <q-item-label caption>Région : </q-item-label>
        <q-item-label>
          <region-flag v-if="romInfo?.gameMetadata?.region" :region="romInfo.gameMetadata?.region" />
          {{ romInfo?.gameMetadata?.region ?? "-" }}
        </q-item-label>
      </div>

      <div>
        <q-item-label caption>Date de sortie : </q-item-label>
        <q-item-label>
          {{ romInfo?.igdbData?.firest_release_date ?? "-" }}
        </q-item-label>
      </div>
    </div>

    <div>
      <q-item-label caption>Genres : </q-item-label>
      <q-item-label>
        <span v-if="romInfo?.igdbData?.genres && romInfo?.igdbData?.genres?.length > 0" class="q-gutter-x-sm">
          <genre-badge v-for="genre in romInfo?.igdbData?.genres" :genre="genre" :key="genre.id" />
        </span>
      </q-item-label>
    </div>

    <!-- <pre>{{ romInfo }}</pre> -->
  </q-list>
</template>
