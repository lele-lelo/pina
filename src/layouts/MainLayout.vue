<script setup lang="ts">
import FooterBar from "@/components/general/footer-bar.vue";
import TitleBar from "@/components/general/title-bar.vue";
</script>

<template>
  <q-layout view="lHh Lpr lFf " class="bg-content">
    <title-bar />

    <q-page-container>
      <router-view />
    </q-page-container>

    <footer-bar />
  </q-layout>
</template>
