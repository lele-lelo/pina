export type TRomEntry = {
  entryId: string;
  gameId: string;
  path: string;
  name: string;
};

export type TGameMetadata = {
  gameId: string;
  name: string;
  console: string;
  hasCover: boolean;
  region?: string | undefined;
  description?: string;
  genre?: string;
  publisher?: string;
};
