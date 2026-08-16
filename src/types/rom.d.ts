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
