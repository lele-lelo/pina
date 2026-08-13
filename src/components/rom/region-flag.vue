<script setup lang="ts">
import { romHelper } from "@/utils/helpers/romHelper";

// Types
type TProps = {
  region: string;
};

// Props
defineProps<TProps>();
</script>

<template>
  <div :class="`fi fi-${romHelper.getRegionInfo(region)?.class}`"></div>
</template>
