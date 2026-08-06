import { getVendorPath } from "../vendor-path";
import { parseDat, TDatEntry } from "./dat-parser";

let gbaDatCache: ReturnType<typeof parseDat> | null = null;

function getGbaDat() {
  if (!gbaDatCache) {
    const datPath = getVendorPath("dat", "gba.dat");
    gbaDatCache = parseDat(datPath);
  }
  return gbaDatCache;
}

export function lookupGbaByCrc(crc: string): TDatEntry | undefined {
  const dat = getGbaDat();
  return dat.find(entry => entry.crc.toLowerCase() === crc.toLowerCase());
}
