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

  const romRegex = /rom \((.*)\)/g;
  let match: RegExpExecArray | null;

  while ((match = romRegex.exec(content)) !== null) {
    const block = match[1];

    if (block) {
      const name = block.match(/name\s+"([^"]+)"/)?.[1];
      const region = block.match(/region\s+"([^"]+)"/)?.[1];
      const size = block.match(/size\s+(\d+)/)?.[1];
      const crc = block.match(/crc\s+([0-9A-Fa-f]+)/)?.[1];
      const md5 = block.match(/md5\s+([0-9A-Fa-f]+)/)?.[1];
      const sha1 = block.match(/sha1\s+([0-9A-Fa-f]+)/)?.[1];
      const serial = block.match(/serial\s+"([^"]*)"/)?.[1];

      if (name && size && crc) {
        entries.push({
          name,
          region,
          size: parseInt(size, 10),
          crc: crc.toLowerCase(),
          md5: md5?.toLowerCase() ?? "",
          sha1: sha1?.toLowerCase() ?? "",
          serial: serial ?? ""
        });
      }
    }
  }

  console.log(entries.length);
  console.log(entries[0]);

  return entries;
}
