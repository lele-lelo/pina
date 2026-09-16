import type { TGameMetadata, TIgdbGame, TRomEntry } from "@/types/rom";
import { store } from "../electron-store";
import { lookupGbaByCrc } from "./dat-lookup";
import { downloadCover } from "./cover-fetcher";

export async function loadGameMetadata(gameId: string) {
  const allMetadata = store.get("library.gameMetadata", []) as TGameMetadata[];
  let metadata = allMetadata.find(m => m.gameId === gameId);
  if (!metadata) {
    const datEntry = lookupGbaByCrc(gameId);

    if (datEntry) {
      metadata = {
        gameId,
        name: datEntry?.name,
        console: "gba",
        region: datEntry?.region
      };

      store.set("library.gameMetadata", [...allMetadata, metadata]);
    } else {
      return false;
    }
  }

  return true;
}

export async function updateEntryGame(
  entryId: string,
  gameId: string,
  igdbData: TIgdbGame
) {
  const gameMetadatas = store.get(
    "library.gameMetadata",
    []
  ) as TGameMetadata[];
  const gameMetadata = gameMetadatas.find(m => m.gameId === gameId);

  if (gameMetadata) {
    const entries = store.get("library.entries", []) as TRomEntry[];

    const index = entries.findIndex(e => e.entryId === entryId);
    if (index !== -1) {
      entries[index] = { ...(entries[index] as TRomEntry), gameId: gameId };
      store.set("library.entries", entries);
    }

    const metadataIndex = gameMetadatas.findIndex(m => m.gameId === gameId);
    if (metadataIndex !== -1) {
      gameMetadatas[metadataIndex] = {
        ...(gameMetadatas[metadataIndex] as TGameMetadata),
        igdbId: igdbData.id
      };
      store.set("library.gameMetadata", gameMetadatas);
    }

    const igdbDatas = store.get("library.igdbDatas", []) as TIgdbGame[];
    const isIgdbInStore = !!igdbDatas.find(igdb => igdb.id === igdbData.id);

    if (!isIgdbInStore) {
      igdbDatas.push(igdbData);
      store.set("library.igdbDatas", igdbDatas);

      if (igdbData.cover?.image_id) {
        await downloadCover(igdbData.id.toString(), igdbData.cover?.image_id);
      }
    }
  }
}
