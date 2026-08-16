<script setup lang="ts">
import { TGameMetadata } from "@/types/rom";
import { useDialogPluginComponent } from "quasar";
import { ref } from "vue";
import RegionFlag from "./region-flag.vue";
import { useUserStore } from "@/stores/user-store.js";

// Types
type TProps = {
  romId: string;
};

// Props
const props = defineProps<TProps>();

// Emits
defineEmits([...useDialogPluginComponent.emits]);

// Composables
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const userStore = useUserStore();

// Refs
const game = ref<TGameMetadata>();
const options = ref<TGameMetadata[]>([]);

// Functions
async function onFilter(
  input: string,
  update: (callbackFn: () => void) => void
) {
  const games = await window.romActions.searchGame(input);

  update(() => {
    options.value = games.map(g => {
      return {
        gameId: g.gameId,
        name: g.name,
        region: g.region,
        publisher: g.publisher,
        console: "gba",
        hasCover: true
      };
    });
  });
}

async function selectGame() {
  if (game.value?.gameId) {
    const res = await window.romActions.updateEntryGame(
      props.romId,
      game.value.gameId
    );
    userStore.roms = res.entries;
    userStore.gameMetadatas = res.gameMetadata;
    onDialogOK();
  }
}
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card flat bordered class="full-width">
      <q-card-section class="row text-h6 bg-primary justify-center"
        >Sélectionner un jeu</q-card-section
      >

      <q-card-section class="column items-center justify-center">
        <q-select
          v-model="game"
          filled
          use-input
          color="primary"
          autofocus
          :input-debounce="1000"
          class="full-width"
          emit-value
          :options="options"
          @filter="onFilter"
        >
          <template #selected-item>
            <q-item dense class="full-width q-px-none">
              <q-item-section>
                <q-item-label>
                  {{ game?.name }}
                </q-item-label>

                <q-item-label v-if="game?.region" caption lines="2">
                  <region-flag :region="game.region" />
                  {{ game.region }}
                </q-item-label>

                <q-item-label v-if="game?.publisher" caption lines="3">
                  {{ game.publisher }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <template #option="{ opt, toggleOption }">
            <q-item
              clickable
              :active="game?.gameId === opt.gameId"
              :disable="game?.gameId === opt.gameId"
              @click="() => toggleOption(opt)"
            >
              <q-item-section>
                <q-item-label> {{ opt.name }} </q-item-label>

                <q-item-label v-if="opt.region" caption lines="2">
                  <region-flag :region="opt.region" />
                  {{ opt.region }}
                </q-item-label>

                <q-item-label v-if="opt.publisher" caption lines="3">
                  {{ opt.publisher }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <template #no-option>
            <q-item>
              <q-item-section>
                <q-item-label caption>
                  Pas de jeu trouvé pour cette recherche
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          color="grey"
          label="Annuler"
          no-caps
          @click="onDialogCancel"
        />

        <q-btn
          flat
          color="primary"
          label="Selectionner"
          no-caps
          :disable="!game?.gameId"
          @click="selectGame"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
