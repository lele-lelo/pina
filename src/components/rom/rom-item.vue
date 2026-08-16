<script setup lang="ts">
import { useUserStore } from "@/stores/user-store";
import { TRomEntry } from "@/types/rom";
import { romHelper } from "@/utils/helpers/romHelper";
import { computed } from "vue";

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
  <div dense class="col row q-gutter-x-sm">
    <div class="row justify-center" style="width: 60px">
      <q-img
        v-if="rom.gameId"
        :src="romHelper.getCoverUrl(rom.gameId)"
        fit="contain"
        style="width: 60px; height: 60px"
      />
      <q-icon v-else size="md" name="error" color="red" />
    </div>

    <q-item-section>
      <q-item-label>{{ rom.name }}</q-item-label>
      <q-item-label v-if="metadata" caption>{{ metadata.name }}</q-item-label>
      <q-item-label v-else caption class="text-red"
        >Jeu non trouvé</q-item-label
      >
    </q-item-section>
  </div>
</template>
