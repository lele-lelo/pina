<script setup lang="ts">
import RomInfoList from "@/components/rom/rom-info-list.vue";
import RomItem from "@/components/rom/rom-item.vue";
import { useUserStore } from "@/stores/user-store";
import type { TButton } from "@/types/global";

// Composables
const userStore = useUserStore();

// Consts
const ACTIONS: TButton[] = [
  {
    label: "Supprimer la rom",
    color: "red",
    icon: "close"
  }
];
</script>

<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      v-for="(rom, i) in userStore.roms"
      :key="i"
      group="roms"
      dense
      expand-separator
    >
      <template #header> <rom-item :rom="rom" /> </template>

      <q-card flat class="transparent">
        <q-card-section class="row no-wrap q-gutter-x-md justify-between">
          <div>
            <rom-info-list :rom="rom" />
          </div>

          <div class="column items-end col-auto">
            <q-btn
              v-for="(action, i) in ACTIONS"
              :key="i"
              dense
              class="q-mb-sm"
              :color="action.color"
              :icon="action.icon"
              @click="action.clickFn"
            >
              <q-tooltip :class="`bg-${action.color}-6`">{{
                action.label
              }}</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>
