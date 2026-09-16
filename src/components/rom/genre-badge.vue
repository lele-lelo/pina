<script setup lang="ts">
import { TGenre } from "@/types/rom";
import { romHelper } from "@/utils/helpers/romHelper";
import { computed } from "vue";

// Types
type TProps = {
  genre: TGenre;
};

// Props
const props = defineProps<TProps>();

// Computeds
const genreInfo = computed(() => {
  return romHelper.getGenreInfo(props.genre.id);
});
</script>

<template>
  <q-badge :color="genreInfo.color">
    <q-icon :name="genreInfo.icon" size="xs" class="q-pr-sm" />
    <div>
      {{ genre.name }}
    </div>
  </q-badge>
</template>
