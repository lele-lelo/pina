<script setup lang="ts">
import { useUserStore } from "@/stores/user-store";
import { TThemeColor } from "@/types/settings";

// Types
type TProps = {
  themeColor?: TThemeColor;
};

// Props
defineProps<TProps>();

// Composables
const userStore = useUserStore();
</script>

<template>
  <q-icon
    class="pixel-art"
    :name="`img:/icons/${themeColor || userStore.themeColor} pineapple.png`"
  />
</template>
