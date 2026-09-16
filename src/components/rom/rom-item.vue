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
const romInfo = computed(() => {
  return userStore.getRom(props.rom.entryId);
});
</script>

<template>
  <div dense class="col row q-gutter-x-sm">
    <div class="row justify-center" style="width: 60px">
      <q-img
        v-if="romInfo?.igdbData?.id"
        :src="romHelper.getCoverUrl(romInfo.igdbData.id)"
        fit="contain"
        style="width: 60px; height: 60px"
      />
      <q-icon v-else size="md" name="error" color="red" />
    </div>

    <q-item-section>
      <q-item-label>{{ rom.name }}</q-item-label>
      <q-item-label v-if="romInfo?.gameMetadata" caption>{{ romInfo?.gameMetadata.name }}</q-item-label>
      <q-item-label v-else caption class="text-red"
        >Jeu non trouvé</q-item-label
      >
    </q-item-section>
  </div>
</template>
