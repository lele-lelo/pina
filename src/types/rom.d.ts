export type TRomEntry = {
  entryId: string;
  gameId?: string | null;
  path: string;
  name: string;
};

export type TGameMetadata = {
  gameId: string;
  name: string;
  console: string;
  region?: string | undefined;
  igdbId?: number;
};

export type TIgdbGame = {
  id: string;
  name: string;
  summary?: string;
  storyline?: string;
  firest_release_date?: number;
  cover?: { image_id: string } | undefined;
  genres?: TGenre[];
  platforms?: { name: string }[];
  alternative_names?: { name: string }[];
};

export type TGenre = {
  id: number
  name: string
}
