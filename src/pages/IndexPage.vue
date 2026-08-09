<script setup lang="ts">
import RomButton from "@/components/rom/rom-button.vue";
import { useUserStore } from "@/stores/user-store";

// Composables
const userStore = useUserStore();
</script>

<template>
  <q-page class="flex q-pa-sm">
    <q-list class="col">
      <rom-button v-for="(rom, i) in userStore.roms" :key="i" :rom="rom" />
    </q-list>
  </q-page>
</template>
