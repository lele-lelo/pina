import CRC32 from "crc-32";
import { readFileSync, statSync } from "fs";

const HASH_SIZE_LIMIT_BYTES = 200 * 1024 * 1024;

export function computeRomId(filePath: string) {
  const { size } = statSync(filePath);

  if (size > HASH_SIZE_LIMIT_BYTES) {
    const pathHash = CRC32.str(filePath).toString(16);
    return pathHash;
  }

  const buffer = readFileSync(filePath);
  const contentHash = (CRC32.buf(buffer) >>> 0).toString(16).padStart(8, "0");
  return contentHash;
}
