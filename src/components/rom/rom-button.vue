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
const romInfo = computed(() => {
  return userStore.getRom(props.rom.entryId);
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
        v-if="romInfo?.igdbData?.id"
        :src="romHelper.getCoverUrl(romInfo.igdbData.id)"
        fit="contain"
        style="width: 100%; height: 100%"
      />
      <q-icon v-else size="md" name="error" color="red" />
    </div>

    <q-item-section class="column justify-evenly full-height">
      <q-item-label class="text-bold ellipsis">
        {{ rom.name }}
      </q-item-label>

      <q-item-label v-if="romInfo?.gameMetadata" caption class="ellipsis">{{
        romInfo?.gameMetadata.name
      }}</q-item-label>
      <q-item-label v-else caption class="text-red"
        >Jeu non trouvé</q-item-label
      >
    </q-item-section>

    <q-item-section side class="column justify-evenly full-height">
      <div class="rom-item__console">
        <q-img
          v-if="romInfo?.gameMetadata?.console"
          :src="`/consoles/${romInfo?.gameMetadata?.console}-${Dark.isActive ? 'dark' : 'light'}.svg`"
          fit="contain"
          style="width: 100%; height: 100%"
        />
      </div>

      <region-flag v-if="romInfo?.gameMetadata?.region" :region="romInfo?.gameMetadata?.region" />
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
