import { app } from "electron";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";
import { pipeline } from "stream/promises";

/** Correspondance console <-> Répertoire du répo */
const CONSOLE_REPO_MAP: Record<string, string> = {
  gba: "Nintendo_-_Game_Boy_Advance"
};

/** Fonction qui remplace les caractères interdit pour la requête
 * @param name Nom du jeu
 *
 * @returns Chaine assainie
 */
function sanitizeForLibretroThumbnails(name: string): string {
  return name.replace(/[&*/:`<>?|]/g, "_");
}

/** Fonction qui construit l'url de téléchargement de la cover
 * @param consoleId Identifiant de la console
 * @param officialName Nom du jeu
 *
 * @returns Url de téléchargemnt de la cover
 */
function buildThumbnailUrl(
  consoleId: string,
  officialName: string
): string | null {
  const repo = CONSOLE_REPO_MAP[consoleId];
  if (!repo) return null;

  const sanitized = sanitizeForLibretroThumbnails(officialName);
  const encoded = encodeURIComponent(sanitized);

  console.log(
    `https://raw.githubusercontent.com/libretro-thumbnails/${repo}/master/Named_Boxarts/${encoded}.png`
  );
  return `https://raw.githubusercontent.com/libretro-thumbnails/${repo}/master/Named_Boxarts/${encoded}.png`;
}

/** Fonction qui télécharge la cover au besoin, puis la stock sur la machine
 * @param gameId Identifiant du jeu
 * @param consoleId Identifiant de la console
 * @param officialName Nom du jeu
 *
 * @returns Chemin vers la cover
 */
export async function downloadCover(
  gameId: string,
  consoleId: string,
  officialName: string
): Promise<string | null> {
  const url = buildThumbnailUrl(consoleId, officialName);
  if (!url) return null;

  const coversDir = path.join(app.getPath("userData"), "covers");
  mkdirSync(coversDir, { recursive: true });

  const destPath = path.join(coversDir, `${gameId}.png`);

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
