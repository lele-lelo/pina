import { readFileSync } from "fs";

export type TDatEntry = {
  name: string;
  region?: string | undefined;
  size: number;
  crc: string;
  md5: string;
  sha1: string;
  serial: string;
};

export function parseDat(filePath: string): TDatEntry[] {
  const content = readFileSync(filePath, "utf-8");
  const entries: TDatEntry[] = [];

  const gameRegex = /game \(([\s\S]*?)\n\)/g;
  let gameMatch: RegExpExecArray | null;

  while ((gameMatch = gameRegex.exec(content)) !== null) {
    const gameBlock = gameMatch[1];

    const gameName = gameBlock?.match(/^\s*name\s+"([^"]+)"/m)?.[1];
    const region = gameBlock?.match(/^\s*region\s+"([^"]*)"/m)?.[1];

    const romLineMatch = gameBlock?.match(/rom \((.*)\)/);

    if (romLineMatch) {
      const romBlock = romLineMatch[1];

      const size = romBlock?.match(/size\s+(\d+)/)?.[1];
      const crc = romBlock?.match(/crc\s+([0-9A-Fa-f]+)/)?.[1];
      const md5 = romBlock?.match(/md5\s+([0-9A-Fa-f]+)/)?.[1];
      const sha1 = romBlock?.match(/sha1\s+([0-9A-Fa-f]+)/)?.[1];
      const serial = romBlock?.match(/serial\s+"([^"]*)"/)?.[1];

      if (gameName && size && crc) {
        entries.push({
          name: gameName,
          size: parseInt(size, 10),
          crc: crc.toLowerCase(),
          md5: md5?.toLowerCase() ?? "",
          sha1: sha1?.toLowerCase() ?? "",
          serial: serial ?? "",
          region: region ?? ""
        });
      }
    }
  }

  return entries;
}
