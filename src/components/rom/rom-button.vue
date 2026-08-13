<script setup lang="ts">
import { useUserStore } from "@/stores/user-store";
import { TRomEntry } from "@/types/rom";
import { romHelper } from "@/utils/helpers/romHelper";
import { Dark } from "quasar";
import { computed, ref } from "vue";

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
    <q-item-section avatar class="rom-item__cover">
      <q-img
        :src="romHelper.getCoverUrl(rom.gameId)"
        fit="contain"
        style="width: 100%; height: 100%"
      />
    </q-item-section>

    <q-item-section class="column justify-evenly full-height">
      <q-item-label class="text-bold ellipsis">
        {{ rom.name }}
      </q-item-label>

      <q-item-label class="ellipsis" caption>
        {{ metadata?.name }}
      </q-item-label>
    </q-item-section>

    <q-item-section side class="column justify-evenly full-height">
      <div class="rom-item__console">
        <q-img
          :src="`/consoles/${metadata?.console}-${Dark.isActive ? 'dark' : 'light'}.svg`"
          fit="contain"
          style="width: 100%; height: 100%"
        />
      </div>

      <div class="fi fi-fr"></div>
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
