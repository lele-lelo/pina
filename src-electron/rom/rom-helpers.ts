import type { TGameMetadata, TRomEntry } from "@/types/rom";
import { store } from "../electron-store";
import { downloadCover } from "./cover-fetcher";
import { lookupGbaByCrc } from "./dat-lookup";

export async function loadGameMetadata(gameId: string) {
  const allMetadata = store.get("library.gameMetadata", []) as TGameMetadata[];
  let metadata = allMetadata.find(m => m.gameId === gameId);
  if (!metadata) {
    const datEntry = lookupGbaByCrc(gameId);

    const coverPath = await downloadCover(gameId, "gba", datEntry?.name ?? "");

    if (datEntry) {
      metadata = {
        gameId,
        name: datEntry?.name,
        console: "gba",
        region: datEntry?.region,
        genre: datEntry?.genre,
        publisher: datEntry?.publisher,
        hasCover: !!coverPath
      };

      store.set("library.gameMetadata", [...allMetadata, metadata]);
    } else {
      return false;
    }
  }

  return true;
}

export async function updateEntryGame(entryId: string, gameId: string) {
  const gameFound = await loadGameMetadata(gameId);

  if (gameFound) {
    const entries = store.get("library.entries", []) as TRomEntry[];

    const index = entries.findIndex(e => e.entryId === entryId);
    if (index !== -1) {
      entries[index] = { ...(entries[index] as TRomEntry), gameId: gameId };
      store.set("library.entries", entries);
    }
  }
}
