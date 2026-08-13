import { readFileSync, writeFileSync } from "fs";
import path from "path";

export type TMergedEntry = {
  name: string;
  region: string;
  crc: string;
  publisher?: string | undefined;
  genre?: string | undefined;
};

function parseGameBlocks(content: string) {
  const blocks: string[] = [];
  const gameRegex = /game \(([\s\S]*?)\n\)/g;
  let match: RegExpExecArray | null;
  while ((match = gameRegex.exec(content)) !== null) {
    if (match[1]) {
      blocks.push(match[1]);
    }
  }
  return blocks;
}

function extractRomField(block: string, field: string): string | undefined {
  const romLineMatch = block.match(/rom \((.*)\)/);
  if (!romLineMatch) return undefined;
  return romLineMatch[1]
    ?.match(new RegExp(`${field}\\s+([0-9A-Fa-f]+|"[^"]*")`))?.[1]
    ?.replace(/"/g, "");
}

function extractGameField(block: string, field: string): string | undefined {
  return block.match(new RegExp(`^\\s*${field}\\s+"([^"]*)"`, "m"))?.[1];
}

function buildMergedDat(consoleName: string) {
  const base = "src-electron/vendor/dat";

  const noIntroContent = readFileSync(
    path.join(base, `${consoleName}-no-intro.dat`),
    "utf-8"
  );
  const genreContent = readFileSync(
    path.join(base, `${consoleName}-genre.dat`),
    "utf-8"
  );
  const publisherContent = readFileSync(
    path.join(base, `${consoleName}-publisher.dat`),
    "utf-8"
  );

  // Index genre/publisher par CRC
  const genreMap = new Map<string, string>();
  for (const block of parseGameBlocks(genreContent)) {
    const crc = extractRomField(block, "crc")?.toLowerCase();
    const genre = extractGameField(block, "genre");
    if (crc && genre) genreMap.set(crc, genre);
  }

  const publisherMap = new Map<string, string>();
  for (const block of parseGameBlocks(publisherContent)) {
    const crc = extractRomField(block, "crc")?.toLowerCase();
    const publisher = extractGameField(block, "publisher");
    if (crc && publisher) publisherMap.set(crc, publisher);
  }

  // Merge sur la base no-intro
  const merged: TMergedEntry[] = [];
  for (const block of parseGameBlocks(noIntroContent)) {
    const name = extractGameField(block, "name");
    const region = extractGameField(block, "region");
    const romLineMatch = block.match(/rom \((.*)\)/);
    if (!name || !romLineMatch) continue;

    const romBlock = romLineMatch[1];
    const crc = romBlock?.match(/crc\s+([0-9A-Fa-f]+)/)?.[1]?.toLowerCase();
    const size = romBlock?.match(/size\s+(\d+)/)?.[1];

    if (!crc || !size) continue;

    merged.push({
      name,
      region: region ?? "",
      crc,
      publisher: publisherMap.get(crc),
      genre: genreMap.get(crc)
    });
  }

  writeFileSync(
    `src-electron/vendor/dat/${consoleName}.json`,
    JSON.stringify(merged)
  );

  console.log(`✅ ${consoleName}.json généré avec ${merged.length} entrées`);
}

buildMergedDat("gba");
