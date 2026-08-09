<script setup lang="ts">
import { TRomEntry } from "@/types/rom";
import { romHelper } from "@/utils/helpers/romHelper";

// Types
type TProps = {
  rom: TRomEntry;
};

// Props
defineProps<TProps>();
</script>

<template>
  <q-item dense clickable class="rom-item items-center">
    <q-item-section avatar class="rom-item__cover">
      <q-img
        :src="romHelper.getCoverUrl(rom.gameId)"
        fit="contain"
        style="width: 100%; height: 100%"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-bold ellipsis">
        {{ rom.name }}
      </q-item-label>
    </q-item-section>

    <q-item-section side class="rom-item__console">
      <q-img
        src="/consoles/gba.svg"
        fit="contain"
        style="width: 100%; height: 100%"
      />
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped>
.rom-item {
  height: 100px;
  overflow: hidden;

  &__cover {
    width: 100px;
    height: 100px;
  }

  &__console {
    width: 75px;
    height: 75px;
  }
}
</style>
