<script setup lang="ts">
import TitleBar from "@/components/general/title-bar.vue";
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <title-bar />

    <q-page-container>
      <router-view class="bg-content" />
    </q-page-container>
  </q-layout>
</template>
