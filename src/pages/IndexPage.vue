<script setup lang="ts">
import { useUserStore } from "@/stores/user-store";
import { romHelper } from "@/utils/helpers/romHelper";

// Composables
const userStore = useUserStore();
</script>

<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <pre v-for="(rom, i) in userStore.roms" :key="i">{{ rom }}
        <pre>{{ romHelper.getCoverUrl(rom.gameId)}}</pre>
        <q-img :src="romHelper.getCoverUrl(rom.gameId)" />
      </pre>
    </div>
  </q-page>
</template>
