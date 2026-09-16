<script setup lang="ts">
import { TIgdbGame } from "@/types/rom";
import { QSelect, useDialogPluginComponent } from "quasar";
import { ref, toRaw } from "vue";
import { useUserStore } from "@/stores/user-store.js";

// Types
type TProps = {
  romId: string;
  gameId: string;
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
const game = ref<TIgdbGame>();
const options = ref<TIgdbGame[]>([]);

// Functions
async function onFilter(
  input: string,
  update: (callbackFn: () => void) => void
) {
  const games = await window.romActions.searchGame(input);

  update(() => {
    options.value = games.map(g => {
      return {
        id: g.id,
        name: g.name,
        summary: g.summary || "",
        storyline: g.storyline || "",
        genres: g.genres || [],
        cover: g.cover
      };
    });
  });
}

async function selectGame() {
  if (game.value?.id) {
    const igdbData = JSON.parse(JSON.stringify(toRaw(game.value))) as TIgdbGame;
    const res = await window.romActions.updateEntryGame(
      props.romId,
      props.gameId,
      igdbData
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
          outlined
          use-input
          color="primary"
          autofocus
          :input-debounce="1000"
          class="full-width"
          emit-value
          :options="options"
          option-label="name"
          @filter="onFilter"
        >
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
          :disable="!game?.id"
          @click="selectGame"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
