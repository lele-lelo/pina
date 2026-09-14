import { TGameMetadata, TIgdbGame, TRomEntry } from "@/types/rom";

export {};

declare global {
  interface Window {
    windowControls: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      fullscreen: () => void;
    };
    appConfig: {
      get: <T>(key: string) => Promise<T>;
      set: (key: string, value: unknown) => Promise<boolean>;
    };
    romActions: {
      addFile: () => Promise<{
        library: {
          entries: TRomEntry[];
          gameMetadata: TGameMetadata[];
        };
        newEntryId: string;
      }>;
      searchGame: (query: string) => Promise<TIgdbGame[]>;
      updateEntryGame: (
        entryId: string,
        gameId: string
      ) => Promise<{ entries: TRomEntry[]; gameMetadata: TGameMetadata[] }>;
    };
  }
}
