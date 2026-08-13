<script setup lang="ts">
import { type Component, computed, ref } from "vue";
import { QTabs, useDialogPluginComponent } from "quasar";
import InterfaceForm from "./forms/interface-form.vue";
import RomsForm from "./forms/roms-form.vue";

// Types
type TOptionTabGroup = {
  name: string;
  tabs: TOptionTab[];
};

type TOptionTab = {
  name: string;
  icon: string;
  content?: Component;
};

// Emits
defineEmits([...useDialogPluginComponent.emits]);

// Composables
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();

// Consts
const TABS: TOptionTabGroup[] = [
  {
    name: "Général",
    tabs: [
      { name: "Roms", icon: "mdi-zip-disk", content: RomsForm },
      { name: "Interface", icon: "mdi-monitor-shimmer", content: InterfaceForm }
    ]
  }
];

// Refs
const tab = ref(TABS[0]?.tabs[0]?.name);
const tabsRef = ref<QTabs>();

// Computeds
const allTabs = computed(() => {
  return TABS.map(tabGroup => tabGroup.tabs).flat();
});

// Functions
function onWheel(e: WheelEvent) {
  e.preventDefault();
  const el = tabsRef.value?.$el.querySelector(
    ".q-tabs__content"
  ) as HTMLElement;
  if (el) {
    el.scrollTop += e.deltaY;
  }
}
</script>

<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    backdrop-filter="blur(10px)"
    full-height
    full-width
  >
    <div class="column">
      <div class="row justify-between items-center">
        <div class="text-h6">Paramètres</div>

        <q-btn flat icon="close" @click="onDialogCancel" square dense />
      </div>

      <q-separator />

      <div class="row col">
        <q-tabs
          ref="tabsRef"
          v-model="tab"
          vertical
          dense
          indicator-color="transparent"
          active-color="primary"
          active-class="text-bold"
          @wheel="onWheel"
        >
          <div
            v-for="(tabGroup, tgIndex) in TABS"
            :key="tgIndex"
            class="q-mb-md"
          >
            <div class="text-bold">{{ tabGroup.name }}</div>
            <q-separator />
            <q-tab
              v-for="(tabOption, i) in tabGroup.tabs"
              :key="i"
              :name="tabOption.name"
              no-caps
              class="column"
            >
              <div
                class="justify-start full-width row items-center q-gutter-x-sm"
              >
                <q-icon size="xs" :name="tabOption.icon" />

                <div>
                  {{ tabOption.name }}
                </div>
              </div>
            </q-tab>
          </div>
        </q-tabs>

        <q-separator vertical />

        <q-tab-panels v-model="tab" animated vertical class="col transparent">
          <q-tab-panel
            v-for="(tabOption, i) in allTabs"
            :key="i"
            :name="tabOption.name"
          >
            <div class="text-h6 text-primary">
              <q-icon :name="tabOption.icon" />
              {{ tabOption.name }}
            </div>
            <component v-if="!!tabOption.content" :is="tabOption.content" />
            <div v-else>Non implémenté</div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-dialog>
</template>
