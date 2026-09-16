import type { TIgdbGame } from "@/types/rom";
import { getIgdbToken } from "./igdb-auth";
import { GAME_TYPES } from "./constants/game-types";

export async function searchIgdbGames(query: string): Promise<TIgdbGame[]> {
  const token = await getIgdbToken();
  const clientId = process.env.IGDB_CLIENT_ID!;

  const acceptedGameTypes = ["Main Game", "Remake", "Remaster", "Expanded Game"];
  const acceptedGameTypesIds = GAME_TYPES.filter(gt =>
    acceptedGameTypes.includes(gt.type)
  ).map(gt => gt.id);

  const escapedQuery = query.replace(/"/g, '\\"');
  const fields = `
    fields name, summary, storyline, first_release_date, cover.image_id, genres.name, game_type.type, platforms.name, alternative_names.name;
  `;
  const where = `
    where game_type = (${acceptedGameTypesIds.join(",")}) & platforms = (24)
  `;

  const requests = [
    `
      search "${escapedQuery}";
      ${fields}
      ${where};
      limit 10;
    `,
    `
      ${fields}
      ${where} & alternative_names.name ~ *"${escapedQuery}"*;
    limit 10;
    `
  ];

  const responses = await Promise.all(
    requests.map(body =>
      fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain"
        },
        body
      })
    )
  );

  for (const response of responses) {
    if (!response.ok) {
      throw new Error(`Erreur IGDB : ${response.status}`);
    }
  }

  const results = await Promise.all(
    responses.map(response => response.json() as Promise<TIgdbGame[]>)
  );

  return [...new Map(results.flat().map(game => [game.id, game])).values()];
}
