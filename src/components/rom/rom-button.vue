<script setup lang="ts">
import { useUserStore } from "@/stores/user-store";
import { TRomEntry } from "@/types/rom";
import { romHelper } from "@/utils/helpers/romHelper";
import { Dark } from "quasar";
import { computed, ref } from "vue";
import RegionFlag from "./region-flag.vue";

// Types
type TProps = {
  rom: TRomEntry;
};

// Props
const props = defineProps<TProps>();

// Models
const model = defineModel<string>();

// Composables
const userStore = useUserStore();

// Computeds
const metadata = computed(() => {
  return userStore.gameMetadatas.find(gm => gm.gameId === props.rom.gameId);
});

// Functions
function onClick() {
  if (model.value === props.rom.entryId) {
    model.value = "";
  } else {
    model.value = props.rom.entryId;
  }
}
</script>

<template>
  <q-item
    dense
    clickable
    class="rom-item items-center rounded-borders"
    active-class="bg-primary "
    :active="model === rom.entryId"
    @click="onClick"
  >
    <div avatar class="rom-item__cover row justify-center q-pa-sm items-center">
      <q-img
        v-if="rom.gameId"
        :src="romHelper.getCoverUrl(rom.gameId)"
        fit="contain"
        style="width: 100%; height: 100%"
      />
      <q-icon v-else size="md" name="error" color="red" />
    </div>

    <q-item-section class="column justify-evenly full-height">
      <q-item-label class="text-bold ellipsis">
        {{ rom.name }}
      </q-item-label>

      <q-item-label v-if="metadata" caption class="ellipsis">{{
        metadata.name
      }}</q-item-label>
      <q-item-label v-else caption class="text-red"
        >Jeu non trouvé</q-item-label
      >
    </q-item-section>

    <q-item-section side class="column justify-evenly full-height">
      <div class="rom-item__console">
        <q-img
          v-if="metadata?.console"
          :src="`/consoles/${metadata?.console}-${Dark.isActive ? 'dark' : 'light'}.svg`"
          fit="contain"
          style="width: 100%; height: 100%"
        />
      </div>

      <region-flag v-if="metadata?.region" :region="metadata?.region" />
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped>
.rom-item {
  height: 100px;
  overflow: hidden;

  &:hover {
    color: var(--q-primary);
  }

  &__cover {
    width: 100px;
    height: 100px;
  }

  &__console {
    width: 75px;
  }
}
</style>
