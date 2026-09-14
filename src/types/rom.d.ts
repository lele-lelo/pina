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
  hasCover: boolean;
  region?: string | undefined;
  genre?: string | undefined;
  publisher?: string | undefined;
};

export type TIgdbGame = {
  id: number;
  name: string;
  summary?: string;
  firest_release_date?: number;
  cover?: { image_id: string };
  genres?: { name: string }[];
  platforms?: { name: string }[];
  alternative_names?: { name: string }[];
};
