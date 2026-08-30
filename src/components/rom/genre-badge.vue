<script setup lang="ts">
import { romHelper } from "@/utils/helpers/romHelper";
import { computed } from "vue";

// Types
type TProps = {
  genre: string;
};

// Props
const props = defineProps<TProps>();

// Computeds
const genreInfo = computed(() => {
  return romHelper.getGenreInfo(props.genre);
});
</script>

<template>
  <q-badge :color="genreInfo.color">
    <q-icon :name="genreInfo.icon" size="xs" class="q-pr-sm" />
    <div>
      {{ genre }}
    </div>
  </q-badge>
</template>
