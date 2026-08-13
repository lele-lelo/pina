import { TGameMetadata, TRomEntry } from "@/types/rom";

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
        entries: TRomEntry[];
        gameMetadata: TGameMetadata[];
      }>;
    };
  }
}
