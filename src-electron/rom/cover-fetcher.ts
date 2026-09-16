import { app } from "electron";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";
import { pipeline } from "stream/promises";

function buildThumbnailUrl(imageId: string): string | null {
  return `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.png`;
}

export async function downloadCover(
  igdbGameId: string,
  imageId: string
): Promise<string | null> {
  const url = buildThumbnailUrl(imageId);
  if (!url) return null;

  const coversDir = path.join(app.getPath("userData"), "covers");
  mkdirSync(coversDir, { recursive: true });

  const destPath = path.join(coversDir, `${igdbGameId}.png`);

  // Déjà en cache ? On ne re-télécharge pas.
  if (existsSync(destPath)) {
    return destPath;
  }

  try {
    const response = await fetch(url);

    if (!response.ok || !response.body) {
      return null; // jaquette non trouvée pour ce jeu (404 fréquent, pas une erreur bloquante)
    }

    const fileStream = createWriteStream(destPath);
    await pipeline(
      response.body as unknown as NodeJS.ReadableStream,
      fileStream
    );

    return destPath;
  } catch (err) {
    console.error("Échec téléchargement jaquette :", err);
    return null;
  }
}
