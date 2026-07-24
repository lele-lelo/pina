<script setup lang="ts">
import ThemeColorSelect from "../inputs/theme-color-select.vue";
import ThemeSelect from "../inputs/theme-select.vue";
</script>

<template>
  <div class="row q-gutter-x-sm">
    <theme-select />
    <theme-color-select class="col" />
  </div>
</template>
